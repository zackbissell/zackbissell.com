import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  ArrowLeft, 
  Home, 
  Shield, 
  Zap, 
  Eye,
  ExternalLink,
  Briefcase,
  Music
} from 'lucide-react';

type ModeType = 'professional' | 'immersive';
type WorldType = 'disco' | 'nostalgia' | 'rolemodel' | 'elevation';

interface ModeTransitionProps {
  currentMode: ModeType;
  targetMode: ModeType;
  worldContext?: WorldType;
  onTransitionComplete?: () => void;
  children: React.ReactNode;
}

export const ModeTransition: React.FC<ModeTransitionProps> = ({
  currentMode,
  targetMode,
  worldContext,
  onTransitionComplete,
  children
}) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionPhase, setTransitionPhase] = useState<'idle' | 'exit' | 'transform' | 'enter'>('idle');
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (currentMode !== targetMode) {
      performTransition();
    }
  }, [currentMode, targetMode]);

  const performTransition = async () => {
    if (shouldReduceMotion) {
      onTransitionComplete?.();
      return;
    }

    setIsTransitioning(true);
    
    // Phase 1: Exit current mode
    setTransitionPhase('exit');
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Phase 2: Transform interface
    setTransitionPhase('transform');
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Phase 3: Enter new mode
    setTransitionPhase('enter');
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setTransitionPhase('idle');
    setIsTransitioning(false);
    onTransitionComplete?.();
  };

  const getTransitionVariants = () => {
    if (targetMode === 'immersive') {
      return {
        exit: { opacity: 0, scale: 0.95, blur: 10 },
        transform: { 
          opacity: 0, 
          scale: 1.1, 
          blur: 0,
          background: getWorldBackground(worldContext),
          filter: 'hue-rotate(180deg) saturate(1.5)'
        },
        enter: { opacity: 1, scale: 1, blur: 0 }
      };
    } else {
      return {
        exit: { opacity: 0, scale: 1.05, blur: 5 },
        transform: { 
          opacity: 0, 
          scale: 0.95, 
          blur: 0,
          background: '#ffffff',
          filter: 'hue-rotate(0deg) saturate(1)'
        },
        enter: { opacity: 1, scale: 1, blur: 0 }
      };
    }
  };

  const getWorldBackground = (world?: WorldType) => {
    switch (world) {
      case 'disco': return 'linear-gradient(135deg, #000000 0%, #1a0a00 50%, #000000 100%)';
      case 'nostalgia': return 'linear-gradient(135deg, #1a0033 0%, #330066 50%, #1a0033 100%)';
      case 'rolemodel': return 'linear-gradient(135deg, #0f0f0f 0%, #1a1a00 50%, #0f0f0f 100%)';
      case 'elevation': return 'linear-gradient(135deg, #001122 0%, #002244 50%, #001122 100%)';
      default: return '#000000';
    }
  };

  const variants = getTransitionVariants();

  if (shouldReduceMotion) {
    return <div>{children}</div>;
  }

  return (
    <motion.div
      className="relative w-full h-full"
      animate={
        transitionPhase === 'exit' ? variants.exit :
        transitionPhase === 'transform' ? variants.transform :
        transitionPhase === 'enter' ? variants.enter :
        { opacity: 1, scale: 1, blur: 0 }
      }
      transition={{
        duration: transitionPhase === 'transform' ? 0.8 : 0.5,
        ease: "easeInOut"
      }}
    >
      {/* Transition overlay effects */}
      <AnimatePresence>
        {isTransitioning && (
          <>
            {/* Professional to Immersive */}
            {targetMode === 'immersive' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 pointer-events-none"
              >
                {/* Security scanning effect for disco world */}
                {worldContext === 'disco' && (
                  <motion.div
                    className="absolute inset-0"
                    initial={{ background: 'linear-gradient(90deg, transparent 0%, transparent 100%)' }}
                    animate={{ 
                      background: [
                        'linear-gradient(90deg, transparent 0%, transparent 100%)',
                        'linear-gradient(90deg, transparent 0%, rgba(0,255,0,0.1) 50%, transparent 100%)',
                        'linear-gradient(90deg, transparent 0%, transparent 100%)'
                      ]
                    }}
                    transition={{ duration: 2, repeat: 2 }}
                  />
                )}
                
                {/* Grid overlay */}
                <motion.div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.2, 0] }}
                  transition={{ duration: 1.5 }}
                />
              </motion.div>
            )}

            {/* Immersive to Professional */}
            {targetMode === 'professional' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 pointer-events-none"
              >
                {/* Clean, Apple-like transition */}
                <motion.div
                  className="absolute inset-0 bg-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.8, 0] }}
                  transition={{ duration: 1.2 }}
                />
              </motion.div>
            )}
          </>
        )}
      </AnimatePresence>

      {children}
    </motion.div>
  );
};

interface NavigationTransitionProps {
  mode: ModeType;
  worldContext?: WorldType;
  className?: string;
}

export const NavigationTransition: React.FC<NavigationTransitionProps> = ({
  mode,
  worldContext,
  className = ""
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isExiting, setIsExiting] = useState(false);

  const handleNavigation = async (to: string, targetMode: ModeType) => {
    if (mode !== targetMode) {
      setIsExiting(true);
      
      // Wait for exit animation
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Navigate
      navigate(to);
    } else {
      navigate(to);
    }
  };

  const getModeIcon = () => {
    return mode === 'professional' ? <Briefcase className="h-4 w-4" /> : <Music className="h-4 w-4" />;
  };

  const getModeLabel = () => {
    return mode === 'professional' ? 'Professional Mode' : 'Immersive Experience';
  };

  return (
    <motion.div
      className={`fixed top-4 left-4 z-40 ${className}`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: isExiting ? 0 : 1, x: isExiting ? -20 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-3">
        {/* Mode indicator */}
        <div className={`px-3 py-2 rounded-lg border backdrop-blur-sm ${
          mode === 'professional' 
            ? 'bg-white/90 border-gray-200 text-gray-800'
            : 'bg-black/80 border-amber-500/50 text-amber-200'
        }`}>
          <div className="flex items-center gap-2 text-sm font-medium">
            {getModeIcon()}
            <span>{getModeLabel()}</span>
          </div>
        </div>

        {/* Navigation controls */}
        {mode === 'immersive' && (
          <motion.button
            onClick={() => handleNavigation('/', 'professional')}
            className="p-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg backdrop-blur-sm transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Return to Professional Mode"
          >
            <Home className="h-4 w-4 text-white" />
          </motion.button>
        )}

        {mode === 'professional' && worldContext && (
          <motion.button
            onClick={() => handleNavigation(`/${worldContext}-ascension`, 'immersive')}
            className="p-2 bg-primary/10 hover:bg-primary/20 border border-primary/20 rounded-lg backdrop-blur-sm transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Enter Immersive Experience"
          >
            <ExternalLink className="h-4 w-4 text-primary" />
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

interface WorldEntryTransitionProps {
  worldType: WorldType;
  onEnter: () => void;
  children: React.ReactNode;
}

export const WorldEntryTransition: React.FC<WorldEntryTransitionProps> = ({
  worldType,
  onEnter,
  children
}) => {
  const [isEntering, setIsEntering] = useState(false);

  const handleEnter = async () => {
    setIsEntering(true);
    
    // Show entry sequence
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onEnter();
    setIsEntering(false);
  };

  const getWorldEntryEffect = () => {
    switch (worldType) {
      case 'disco':
        return {
          background: 'radial-gradient(circle at center, rgba(255, 193, 7, 0.2) 0%, rgba(0, 0, 0, 0.9) 70%)',
          overlay: 'ACCESSING CLASSIFIED FREQUENCY DATABASE...'
        };
      case 'nostalgia':
        return {
          background: 'radial-gradient(circle at center, rgba(139, 92, 246, 0.2) 0%, rgba(26, 0, 51, 0.9) 70%)',
          overlay: 'ENTERING EMOTIONAL VULNERABILITY MODE...'
        };
      case 'rolemodel':
        return {
          background: 'radial-gradient(circle at center, rgba(234, 179, 8, 0.2) 0%, rgba(15, 15, 15, 0.9) 70%)',
          overlay: 'INITIALIZING CHAOS PROTOCOLS...'
        };
      case 'elevation':
        return {
          background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.2) 0%, rgba(0, 17, 34, 0.9) 70%)',
          overlay: 'ELEVATION SEQUENCE INITIATED...'
        };
      default:
        return {
          background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.1) 0%, rgba(0, 0, 0, 0.9) 70%)',
          overlay: 'ENTERING IMMERSIVE MODE...'
        };
    }
  };

  const effect = getWorldEntryEffect();

  return (
    <div className="relative">
      <div onClick={handleEnter}>
        {children}
      </div>

      <AnimatePresence>
        {isEntering && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ background: effect.background }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center text-white"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 border-4 border-white border-t-transparent rounded-full mx-auto mb-4"
              />
              <div className="font-mono text-lg">{effect.overlay}</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ModeTransition;