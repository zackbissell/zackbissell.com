import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence, startOptimizedAppearAnimation } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize2, Settings, Waves } from 'lucide-react';
import { MixcloudPlayer } from './MixcloudPlayer';
import AdvancedAudioVisualizer from './AdvancedAudioVisualizer';
import AudioReactiveParticles from '../immersive/AudioReactiveParticles';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

interface RevolutionaryAudioPlayerProps {
  embedUrl: string;
  title: string;
  artist?: string;
  worldTheme: 'disco' | 'nostalgia' | 'rolemodel' | 'elevation';
  classificationLevel?: string;
  warningMessage?: string;
  showParticles?: boolean;
  showAdvancedVisualizer?: boolean;
  autoEnhance?: boolean;
}

const worldMotionConfigs = {
  disco: {
    initial: { opacity: 0, rotateX: -90, scale: 0.8 },
    animate: { opacity: 1, rotateX: 0, scale: 1 },
    exit: { opacity: 0, rotateX: 90, scale: 0.8 },
    transition: { 
      type: "spring", 
      stiffness: 300, 
      damping: 30,
      mass: 1 
    },
    whileHover: { scale: 1.02, rotateY: 2 },
    whileTap: { scale: 0.98 },
  },
  nostalgia: {
    initial: { opacity: 0, y: 50, filter: "blur(10px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    exit: { opacity: 0, y: -50, filter: "blur(10px)" },
    transition: { 
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94] // Emotional ease curve
    },
    whileHover: { y: -5, filter: "brightness(1.1)" },
  },
  rolemodel: {
    initial: { opacity: 0, scale: 0, rotate: -180 },
    animate: { opacity: 1, scale: 1, rotate: 0 },
    exit: { opacity: 0, scale: 0, rotate: 180 },
    transition: { 
      type: "spring",
      stiffness: 200,
      damping: 20,
      mass: 0.8
    },
    whileHover: { 
      scale: 1.05, 
      rotate: [0, -2, 2, 0],
      transition: { rotate: { duration: 0.5, repeat: Infinity } }
    },
  },
  elevation: {
    initial: { opacity: 0, y: 100, rotateX: 45 },
    animate: { opacity: 1, y: 0, rotateX: 0 },
    exit: { opacity: 0, y: -100, rotateX: -45 },
    transition: { 
      type: "spring",
      stiffness: 400,
      damping: 40,
      mass: 1.2
    },
    whileHover: { 
      y: -10, 
      rotateX: -5,
      filter: "brightness(1.2)"
    },
  },
};

export const RevolutionaryAudioPlayer: React.FC<RevolutionaryAudioPlayerProps> = ({
  embedUrl,
  title,
  artist = "Zack Bissell",
  worldTheme,
  classificationLevel,
  warningMessage,
  showParticles = true,
  showAdvancedVisualizer = true,
  autoEnhance = true,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentView, setCurrentView] = useState<'mixcloud' | 'visualizer' | 'immersive'>('mixcloud');
  const [audioData, setAudioData] = useState<number[]>([]);
  const [isImmersiveMode, setIsImmersiveMode] = useState(false);
  const [enhancementsEnabled, setEnhancementsEnabled] = useState(autoEnhance);
  const playerRef = useRef<HTMLDivElement>(null);
  
  const motionConfig = worldMotionConfigs[worldTheme];
  
  // Handle audio frequency data updates
  const handleFrequencyData = useCallback((frequencies: number[]) => {
    setAudioData(frequencies);
  }, []);
  
  // Handle playback state changes
  const handlePlaybackStart = useCallback(() => {
    setIsPlaying(true);
  }, []);
  
  const handlePlaybackPause = useCallback(() => {
    setIsPlaying(false);
  }, []);
  
  // Initialize optimized appear animation (MCP best practice)
  useEffect(() => {
    if (playerRef.current && enhancementsEnabled) {
      // Use Framer Motion's optimized appear animation for SSR
      const element = playerRef.current;
      
      startOptimizedAppearAnimation(
        element,
        "opacity",
        [0, 1],
        {
          duration: 800,
          ease: "linear",
        }
      );
      
      startOptimizedAppearAnimation(
        element,
        "transform",
        ["translateY(20px) scale(0.95)", "translateY(0px) scale(1)"],
        {
          duration: 600,
          ease: "easeOut",
        }
      );
    }
  }, [enhancementsEnabled]);
  
  // Toggle immersive mode
  const toggleImmersiveMode = useCallback(() => {
    setIsImmersiveMode(!isImmersiveMode);
  }, [isImmersiveMode]);
  
  // Cycle through different views
  const cycleView = useCallback(() => {
    const views: ('mixcloud' | 'visualizer' | 'immersive')[] = ['mixcloud', 'visualizer', 'immersive'];
    const currentIndex = views.indexOf(currentView);
    const nextIndex = (currentIndex + 1) % views.length;
    setCurrentView(views[nextIndex]);
  }, [currentView]);
  
  return (
    <motion.div
      ref={playerRef}
      className={`relative overflow-hidden rounded-xl ${worldTheme ? `world-${worldTheme}` : ''}`}
      {...motionConfig}
    >
      {/* Background Particles (if enabled) */}
      <AnimatePresence>
        {showParticles && enhancementsEnabled && isPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 pointer-events-none"
          >
            <AudioReactiveParticles
              audioData={audioData}
              worldTheme={worldTheme}
              particleCount={1000}
              intensityMultiplier={1.5}
            />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Enhanced Controls Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="relative z-10 p-4 bg-gradient-to-r from-world-primary/10 to-world-secondary/10 backdrop-blur-sm border-b border-world-primary/20"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="bg-world-primary/20 text-world-primary border-world-primary/30">
              {classificationLevel || 'IMMERSIVE AUDIO'}
            </Badge>
            <div>
              <h3 className="text-title3 font-bold text-foreground">{title}</h3>
              <p className="text-subhead text-foreground-secondary">{artist}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setEnhancementsEnabled(!enhancementsEnabled)}
              className={`${enhancementsEnabled ? 'text-world-primary' : 'text-foreground-tertiary'}`}
            >
              <Settings className="w-4 h-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={cycleView}
              className="text-foreground-secondary hover:text-world-primary"
            >
              <Waves className="w-4 h-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleImmersiveMode}
              className="text-foreground-secondary hover:text-world-primary"
            >
              <Maximize2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </motion.div>
      
      {/* Main Content Area */}
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {currentView === 'mixcloud' && (
            <motion.div
              key="mixcloud"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <MixcloudPlayer
                embedUrl={embedUrl}
                title={title}
                artist={artist}
                worldTheme={worldTheme}
                classificationLevel={classificationLevel}
                warningMessage={warningMessage}
                onPlaybackStart={handlePlaybackStart}
                onPlaybackPause={handlePlaybackPause}
                onAudioPeaks={handleFrequencyData}
              />
            </motion.div>
          )}
          
          {currentView === 'visualizer' && showAdvancedVisualizer && (
            <motion.div
              key="visualizer"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.4 }}
              className="p-6 bg-world-primary/5 border border-world-primary/20"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-title3 text-foreground">Advanced Audio Visualization</h4>
                  <Badge variant="secondary" className="bg-world-secondary/20 text-world-secondary">
                    Real-time Analysis
                  </Badge>
                </div>
                
                <AdvancedAudioVisualizer
                  worldTheme={worldTheme}
                  isPlaying={isPlaying}
                  width={600}
                  height={200}
                  style="bars"
                  sensitivity={1.2}
                  onFrequencyData={handleFrequencyData}
                />
                
                {/* Additional visualizer styles */}
                <div className="grid grid-cols-2 gap-4">
                  <AdvancedAudioVisualizer
                    worldTheme={worldTheme}
                    isPlaying={isPlaying}
                    width={280}
                    height={100}
                    style="wave"
                    sensitivity={0.8}
                  />
                  <AdvancedAudioVisualizer
                    worldTheme={worldTheme}
                    isPlaying={isPlaying}
                    width={280}
                    height={100}
                    style="circular"
                    sensitivity={1.0}
                  />
                </div>
              </div>
            </motion.div>
          )}
          
          {currentView === 'immersive' && (
            <motion.div
              key="immersive"
              initial={{ opacity: 0, rotateY: -90 }}
              animate={{ opacity: 1, rotateY: 0 }}
              exit={{ opacity: 0, rotateY: 90 }}
              transition={{ duration: 0.5 }}
              className="aspect-video bg-gradient-to-br from-world-primary/20 to-world-secondary/20 border border-world-primary/30 relative overflow-hidden"
            >
              <div className="absolute inset-0">
                <AudioReactiveParticles
                  audioData={audioData}
                  worldTheme={worldTheme}
                  particleCount={5000}
                  intensityMultiplier={2.0}
                />
              </div>
              
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ 
                    scale: isPlaying ? [1, 1.1, 1] : 1,
                    opacity: isPlaying ? [0.8, 1, 0.8] : 0.5,
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: isPlaying ? Infinity : 0,
                    ease: "easeInOut"
                  }}
                  className="text-center"
                >
                  <div className="text-6xl mb-4 text-world-primary">
                    {isPlaying ? <Pause /> : <Play />}
                  </div>
                  <p className="text-title2 text-foreground font-bold">
                    Immersive Mode
                  </p>
                  <p className="text-body text-foreground-secondary">
                    {isPlaying ? 'Audio Reactive Experience' : 'Press play to begin journey'}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Status Footer */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="relative z-10 p-3 bg-world-primary/5 border-t border-world-primary/20 text-center"
      >
        <div className="flex items-center justify-center gap-4 text-sm text-foreground-secondary">
          <span>Mode: {currentView.charAt(0).toUpperCase() + currentView.slice(1)}</span>
          <span>•</span>
          <span>Enhancements: {enhancementsEnabled ? 'Enabled' : 'Disabled'}</span>
          <span>•</span>
          <span>Audio Data: {audioData.length > 0 ? 'Active' : 'Inactive'}</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default RevolutionaryAudioPlayer;