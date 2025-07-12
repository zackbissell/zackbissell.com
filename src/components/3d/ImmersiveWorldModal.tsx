/**
 * Immersive World Modal
 * Seamless transition from 2D story pages to 3D cinematic experiences
 * Apple-level polish with A24 cinematic quality
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize2, Volume2, Settings, Eye, Film } from 'lucide-react';
import World3DCanvas from './World3DCanvas';
import CinematicControls from './CinematicControls';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { haptics } from '../../utils/haptics';
import { spatialAudio } from '../../utils/spatial-audio';

interface ImmersiveWorldModalProps {
  world: 'disco' | 'nostalgia' | 'rolemodel' | 'elevation';
  isOpen: boolean;
  onClose: () => void;
  worldTitle: string;
  worldSubtitle: string;
  storyContext?: string;
  audioUrl?: string;
}

const worldThemes = {
  disco: {
    gradient: 'from-amber-500/20 via-red-500/20 to-amber-500/20',
    borderColor: 'border-amber-500/30',
    textColor: 'text-amber-400',
    backgroundColor: 'bg-gradient-to-br from-gray-900 via-black to-gray-900'
  },
  nostalgia: {
    gradient: 'from-purple-500/20 via-pink-500/20 to-amber-500/20',
    borderColor: 'border-purple-500/30',
    textColor: 'text-purple-400',
    backgroundColor: 'bg-gradient-to-br from-purple-900/50 via-black to-pink-900/50'
  },
  rolemodel: {
    gradient: 'from-yellow-500/20 via-red-500/20 to-yellow-500/20',
    borderColor: 'border-yellow-500/30',
    textColor: 'text-yellow-400',
    backgroundColor: 'bg-gradient-to-br from-yellow-900/30 via-black to-red-900/30'
  },
  elevation: {
    gradient: 'from-blue-500/20 via-amber-500/20 to-blue-500/20',
    borderColor: 'border-blue-500/30',
    textColor: 'text-blue-400',
    backgroundColor: 'bg-gradient-to-br from-blue-900/50 via-black to-amber-900/30'
  }
};

const worldDescriptions = {
  disco: "Enter the classified facility. Government conspiracy meets disco. Reality is not what it seems.",
  nostalgia: "Dive into emotional vulnerability. Feel the heartbreak, embrace the journey. This is your story.",
  rolemodel: "Witness unhinged creative excellence. 300+ tracks, infinite coffee, one take. Chaos is beautiful.",
  elevation: "Transcend genre boundaries. Rise above the purists. House music evolution awaits."
};

export default function ImmersiveWorldModal({
  world,
  isOpen,
  onClose,
  worldTitle,
  worldSubtitle,
  storyContext,
  audioUrl
}: ImmersiveWorldModalProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [showIntro, setShowIntro] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showCinematicControls, setShowCinematicControls] = useState(false);
  const [hasEnteredExperience, setHasEnteredExperience] = useState(false);
  
  const modalRef = useRef<HTMLDivElement>(null);
  const worldTheme = worldThemes[world];

  // Handle escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  // Handle fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Initialize world experience
  useEffect(() => {
    if (isOpen && showIntro) {
      // Trigger opening audio
      spatialAudio.trigger({
        type: 'world-entrance',
        position: { x: 0, y: 0, z: 0 },
        intensity: 0.8
      });

      // Gentle haptic feedback for world entry
      haptics.trigger({ intensity: 'light' });

      // Auto-hide intro after delay
      const timer = setTimeout(() => {
        setShowIntro(false);
        setIsLoading(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isOpen, showIntro]);

  const handleClose = () => {
    // Trigger closing audio
    spatialAudio.trigger({
      type: 'world-exit',
      position: { x: 0, y: 0, z: 0 },
      intensity: 0.5
    });

    haptics.trigger({ intensity: 'light' });
    onClose();
  };

  const handleEnterExperience = () => {
    setShowIntro(false);
    setIsLoading(false);
    setHasEnteredExperience(true);

    // Cinematic entrance haptic
    haptics.trigger({ intensity: 'medium' });

    // Spatial audio for experience start
    spatialAudio.trigger({
      type: 'experience-start',
      position: { x: 0, y: 0, z: 0 },
      intensity: 1.0
    });
  };

  const toggleFullscreen = async () => {
    if (!modalRef.current) return;

    try {
      if (!isFullscreen) {
        await modalRef.current.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.warn('Fullscreen not supported:', error);
    }
  };

  const handleSkipIntro = () => {
    setShowIntro(false);
    setIsLoading(false);
    setHasEnteredExperience(true);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        ref={modalRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed inset-0 z-50 flex items-center justify-center ${worldTheme.backgroundColor}`}
        style={{
          background: isFullscreen 
            ? `linear-gradient(135deg, rgba(0,0,0,0.95), rgba(0,0,0,0.98))` 
            : undefined
        }}
      >
        {/* Background overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={handleClose}
        />

        {/* Main modal content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className={`relative w-full h-full max-w-7xl max-h-screen mx-4 ${
            isFullscreen ? 'max-w-none max-h-none mx-0' : 'my-4'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Controls */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="absolute top-6 left-6 right-6 z-20 flex items-center justify-between"
          >
            {/* World Info */}
            <div className="flex items-center gap-4">
              <Badge 
                variant="outline" 
                className={`${worldTheme.borderColor} ${worldTheme.textColor} bg-black/50 backdrop-blur-sm px-3 py-1`}
              >
                <Eye className="w-4 h-4 mr-2" />
                {world.toUpperCase()} WORLD
              </Badge>
              <div className="text-white">
                <h2 className="text-lg font-semibold">{worldTitle}</h2>
                <p className="text-sm opacity-70">{worldSubtitle}</p>
              </div>
            </div>

            {/* Action Controls */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowCinematicControls(!showCinematicControls)}
                className="bg-black/30 backdrop-blur-sm border border-white/10 text-white hover:bg-white/10"
              >
                <Film className="w-4 h-4" />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleFullscreen}
                className="bg-black/30 backdrop-blur-sm border border-white/10 text-white hover:bg-white/10"
              >
                <Maximize2 className="w-4 h-4" />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClose}
                className="bg-black/30 backdrop-blur-sm border border-white/10 text-white hover:bg-white/10"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>

          {/* Intro Sequence */}
          <AnimatePresence>
            {showIntro && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 z-10 flex items-center justify-center"
              >
                <div className={`text-center max-w-2xl mx-8 p-8 rounded-2xl border ${worldTheme.borderColor} ${worldTheme.backgroundColor} backdrop-blur-xl`}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                  >
                    <div className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br ${worldTheme.gradient} flex items-center justify-center`}>
                      <Film className={`w-8 h-8 ${worldTheme.textColor}`} />
                    </div>
                    
                    <h1 className="text-4xl font-bold text-white mb-4">{worldTitle}</h1>
                    <h2 className={`text-xl ${worldTheme.textColor} mb-6`}>{worldSubtitle}</h2>
                    
                    <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                      {worldDescriptions[world]}
                    </p>

                    {storyContext && (
                      <Card className="bg-black/30 border-white/10 p-4 mb-8">
                        <p className="text-sm text-gray-400 italic">
                          "{storyContext}"
                        </p>
                      </Card>
                    )}

                    <div className="flex gap-4 justify-center">
                      <Button
                        onClick={handleEnterExperience}
                        className={`bg-gradient-to-r ${worldTheme.gradient} border-0 text-white font-semibold px-8 py-3 text-lg hover:scale-105 transition-transform`}
                      >
                        Enter Experience
                      </Button>
                      
                      <Button
                        variant="outline"
                        onClick={handleSkipIntro}
                        className="border-white/20 text-white hover:bg-white/10"
                      >
                        Skip Intro
                      </Button>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 3D World Experience */}
          <AnimatePresence>
            {!showIntro && (
              <motion.div
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="w-full h-full rounded-2xl overflow-hidden border border-white/10"
              >
                <World3DCanvas
                  world={world}
                  audioData={undefined} // Will be connected in future phase
                  enableInteractions={true}
                  showPerformanceOverlay={false}
                  className="w-full h-full"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Loading State */}
          <AnimatePresence>
            {isLoading && !showIntro && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-10 flex items-center justify-center bg-black/50 backdrop-blur-sm rounded-2xl"
              >
                <div className="text-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    className={`w-12 h-12 border-2 ${worldTheme.borderColor} border-t-transparent rounded-full mx-auto mb-4`}
                  />
                  <p className="text-white text-lg">Initializing {world} experience...</p>
                  <p className="text-gray-400 text-sm mt-2">Preparing cinematic systems</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom Experience Info */}
          <AnimatePresence>
            {!showIntro && !isLoading && hasEnteredExperience && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="absolute bottom-6 left-6 right-6 z-20"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Badge variant="outline" className="bg-black/50 backdrop-blur-sm border-white/20 text-white">
                      <Volume2 className="w-3 h-3 mr-1" />
                      Audio Reactive
                    </Badge>
                    <Badge variant="outline" className="bg-black/50 backdrop-blur-sm border-white/20 text-white">
                      <Settings className="w-3 h-3 mr-1" />
                      A24 Cinematic
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-gray-400">
                    Press <kbd className="bg-white/10 px-2 py-1 rounded text-xs">ESC</kbd> to exit
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Cinematic Controls (overlay) */}
        {showCinematicControls && !showIntro && (
          <div className="absolute inset-0 z-30 pointer-events-none">
            <div className="pointer-events-auto">
              <CinematicControls
                scene={null} // Will be connected via ref in future iteration
                isVisible={showCinematicControls}
                onToggle={() => setShowCinematicControls(!showCinematicControls)}
              />
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}