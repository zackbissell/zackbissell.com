import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize2, Settings, Waves, Activity } from 'lucide-react';
import { MixcloudPlayer } from './MixcloudPlayer';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

interface EnhancedAudioPlayerProps {
  embedUrl: string;
  title: string;
  artist?: string;
  worldTheme: 'disco' | 'nostalgia' | 'rolemodel' | 'elevation';
  classificationLevel?: string;
  warningMessage?: string;
  showAdvancedVisualizer?: boolean;
  autoEnhance?: boolean;
}

const worldMotionConfigs = {
  disco: {
    initial: { opacity: 0, rotateX: -15, scale: 0.95 },
    animate: { opacity: 1, rotateX: 0, scale: 1 },
    exit: { opacity: 0, rotateX: 15, scale: 0.95 },
    transition: { 
      type: "spring", 
      stiffness: 200, 
      damping: 20
    },
    whileHover: { scale: 1.02, y: -2 },
  },
  nostalgia: {
    initial: { opacity: 0, y: 30, filter: "blur(5px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    exit: { opacity: 0, y: -30, filter: "blur(5px)" },
    transition: { 
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94]
    },
    whileHover: { y: -3, filter: "brightness(1.05)" },
  },
  rolemodel: {
    initial: { opacity: 0, scale: 0, rotate: -45 },
    animate: { opacity: 1, scale: 1, rotate: 0 },
    exit: { opacity: 0, scale: 0, rotate: 45 },
    transition: { 
      type: "spring",
      stiffness: 150,
      damping: 15
    },
    whileHover: { 
      scale: 1.03, 
      rotate: [0, -1, 1, 0],
      transition: { rotate: { duration: 0.3 } }
    },
  },
  elevation: {
    initial: { opacity: 0, y: 50, rotateX: 20 },
    animate: { opacity: 1, y: 0, rotateX: 0 },
    exit: { opacity: 0, y: -50, rotateX: -20 },
    transition: { 
      type: "spring",
      stiffness: 300,
      damping: 30
    },
    whileHover: { 
      y: -8, 
      rotateX: -3,
      filter: "brightness(1.1)"
    },
  },
};

// Simple CSS-based visualizer component
const CSSVisualizer: React.FC<{ isPlaying: boolean; worldTheme: string }> = ({ isPlaying, worldTheme }) => {
  return (
    <div className="flex items-center justify-center gap-1 h-16">
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          className={`w-1 bg-gradient-to-t ${
            worldTheme === 'disco' ? 'from-amber-500 to-red-500' :
            worldTheme === 'nostalgia' ? 'from-purple-500 to-pink-500' :
            worldTheme === 'rolemodel' ? 'from-yellow-500 to-orange-500' :
            'from-blue-500 to-cyan-500'
          } rounded-full`}
          animate={isPlaying ? {
            height: [8, 32 + Math.random() * 24, 8],
            opacity: [0.5, 1, 0.5],
          } : { height: 8, opacity: 0.3 }}
          transition={{
            duration: 0.5 + Math.random() * 0.5,
            repeat: isPlaying ? Infinity : 0,
            delay: i * 0.1,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

export const EnhancedAudioPlayer: React.FC<EnhancedAudioPlayerProps> = ({
  embedUrl,
  title,
  artist = "Zack Bissell",
  worldTheme,
  classificationLevel,
  warningMessage,
  showAdvancedVisualizer = true,
  autoEnhance = true,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentView, setCurrentView] = useState<'mixcloud' | 'visualizer' | 'immersive'>('mixcloud');
  const [enhancementsEnabled, setEnhancementsEnabled] = useState(autoEnhance);
  const playerRef = useRef<HTMLDivElement>(null);
  
  const motionConfig = worldMotionConfigs[worldTheme];
  
  // Handle playback state changes
  const handlePlaybackStart = useCallback(() => {
    setIsPlaying(true);
  }, []);
  
  const handlePlaybackPause = useCallback(() => {
    setIsPlaying(false);
  }, []);
  
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
      className={`relative overflow-hidden rounded-xl world-${worldTheme}`}
      {...motionConfig}
    >
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
              {classificationLevel || 'ENHANCED AUDIO'}
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
                  <h4 className="text-title3 text-foreground">Audio Visualization</h4>
                  <Badge variant="secondary" className="bg-world-secondary/20 text-world-secondary">
                    <Activity className="w-3 h-3 mr-1" />
                    {isPlaying ? 'Live' : 'Inactive'}
                  </Badge>
                </div>
                
                <CSSVisualizer isPlaying={isPlaying} worldTheme={worldTheme} />
                
                {/* Additional visual elements */}
                <div className="grid grid-cols-3 gap-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="h-16 bg-gradient-to-br from-world-primary/20 to-world-secondary/20 rounded-lg"
                      animate={isPlaying ? {
                        opacity: [0.3, 0.8, 0.3],
                        scale: [1, 1.02, 1],
                      } : {}}
                      transition={{
                        duration: 1 + i * 0.3,
                        repeat: isPlaying ? Infinity : 0,
                        delay: i * 0.2
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
          
          {currentView === 'immersive' && (
            <motion.div
              key="immersive"
              initial={{ opacity: 0, rotateY: -45 }}
              animate={{ opacity: 1, rotateY: 0 }}
              exit={{ opacity: 0, rotateY: 45 }}
              transition={{ duration: 0.5 }}
              className="aspect-video bg-gradient-to-br from-world-primary/20 to-world-secondary/20 border border-world-primary/30 relative overflow-hidden"
            >
              {/* Immersive background effect */}
              <div className="absolute inset-0">
                {Array.from({ length: 20 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full bg-world-primary/30"
                    style={{
                      width: Math.random() * 6 + 2,
                      height: Math.random() * 6 + 2,
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={isPlaying ? {
                      scale: [1, 1.5, 1],
                      opacity: [0.3, 0.8, 0.3],
                      x: [0, Math.random() * 40 - 20],
                      y: [0, Math.random() * 40 - 20],
                    } : {}}
                    transition={{
                      duration: 2 + Math.random() * 2,
                      repeat: isPlaying ? Infinity : 0,
                      delay: Math.random() * 2
                    }}
                  />
                ))}
              </div>
              
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ 
                    scale: isPlaying ? [1, 1.05, 1] : 1,
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
                    {isPlaying ? 'Audio-reactive experience active' : 'Press play to begin journey'}
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
          <span>Status: {isPlaying ? 'Playing' : 'Paused'}</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EnhancedAudioPlayer;