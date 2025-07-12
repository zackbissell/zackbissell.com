/**
 * A24 Cinematic Controls Component
 * Interactive controls for revolutionary cinematic experiences
 * Apple-level polish with film industry precision
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Camera, 
  Eye, 
  Film, 
  Settings, 
  Heart, 
  Zap, 
  TrendingUp,
  Sparkles,
  Volume2
} from 'lucide-react';
import WorldScene, { type CameraMode, type CinematicMood } from '../../utils/world-scene';

interface CinematicState {
  mode: CameraMode;
  emotionalState: CinematicMood;
  isTransitioning: boolean;
  shakeIntensity: number;
  breathingIntensity: number;
}
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Slider } from '../ui/slider';
import { Badge } from '../ui/badge';

interface CinematicControlsProps {
  scene: WorldScene | null;
  isVisible?: boolean;
  onToggle?: () => void;
  className?: string;
}

const cameraModesConfig: Record<CameraMode, { label: string; icon: React.ReactNode; description: string }> = {
  static: { 
    label: 'Static', 
    icon: <Camera className="w-4 h-4" />, 
    description: 'Fixed cinematic shots' 
  },
  orbit: { 
    label: 'Orbit', 
    icon: <Eye className="w-4 h-4" />, 
    description: 'Circular movement' 
  },
  track: { 
    label: 'Track', 
    icon: <TrendingUp className="w-4 h-4" />, 
    description: 'Following movement' 
  },
  handheld: { 
    label: 'Handheld', 
    icon: <Zap className="w-4 h-4" />, 
    description: 'Dynamic shake' 
  },
  dolly: { 
    label: 'Dolly', 
    icon: <Film className="w-4 h-4" />, 
    description: 'Forward/backward' 
  },
  crane: { 
    label: 'Crane', 
    icon: <Sparkles className="w-4 h-4" />, 
    description: 'Ascending shots' 
  },
  dutch: { 
    label: 'Dutch', 
    icon: <Settings className="w-4 h-4" />, 
    description: 'Tilted angles' 
  }
};

const emotionalStatesConfig: Record<CinematicMood, { label: string; icon: React.ReactNode; color: string }> = {
  tense: { label: 'Tense', icon: <Zap className="w-4 h-4" />, color: 'text-orange-500' },
  intimate: { label: 'Intimate', icon: <Heart className="w-4 h-4" />, color: 'text-pink-500' },
  chaotic: { label: 'Chaotic', icon: <Settings className="w-4 h-4" />, color: 'text-red-500' },
  transcendent: { label: 'Transcendent', icon: <Sparkles className="w-4 h-4" />, color: 'text-blue-500' },
  mysterious: { label: 'Mysterious', icon: <Eye className="w-4 h-4" />, color: 'text-purple-500' },
  emotional: { label: 'Emotional', icon: <Volume2 className="w-4 h-4" />, color: 'text-indigo-500' }
};

export default function CinematicControls({
  scene,
  isVisible = false,
  onToggle,
  className = ''
}: CinematicControlsProps) {
  const [currentMode, setCurrentMode] = useState<CameraMode>('static');
  const [currentMood, setCurrentMood] = useState<CinematicMood>('mysterious');
  const [cinematicState, setCinematicState] = useState<CinematicState | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Update cinematic state
  useEffect(() => {
    if (!scene) return;

    const updateState = () => {
      const state = scene.getCinematicState();
      setCinematicState(state);
      
      if (state) {
        setCurrentMode(state.mode);
        setCurrentMood(state.emotionalState);
      }
    };

    updateState();
    const interval = setInterval(updateState, 100);
    return () => clearInterval(interval);
  }, [scene]);

  const handleCameraModeChange = (mode: CameraMode) => {
    if (scene) {
      scene.setCameraMode(mode);
      setCurrentMode(mode);
    }
  };

  const handleEmotionalStateChange = (mood: CinematicMood) => {
    if (scene) {
      scene.setEmotionalState(mood);
      setCurrentMood(mood);
    }
  };

  const handleCameraShake = (intensity: number) => {
    if (scene) {
      scene.triggerCameraShake(intensity / 100, 2);
    }
  };

  const startSequence = (sequenceName: string) => {
    if (scene) {
      scene.startCinematicSequence(sequenceName);
    }
  };

  const switchShot = (shotIndex: number) => {
    if (scene) {
      scene.switchToShot(shotIndex);
    }
  };

  if (!isVisible) {
    return (
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={onToggle}
        className={`fixed bottom-6 right-6 bg-background/90 backdrop-blur-sm border border-foreground/10 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 ${className}`}
      >
        <Film className="w-6 h-6 text-foreground" />
      </motion.button>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 400 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 400 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className={`fixed top-6 right-6 w-80 max-h-[80vh] overflow-y-auto z-50 ${className}`}
      >
        <Card className="bg-background/95 backdrop-blur-md border-foreground/10 shadow-2xl">
          <CardContent className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-world-primary/20 to-world-secondary/20 flex items-center justify-center">
                  <Film className="w-5 h-5 text-world-primary" />
                </div>
                <div>
                  <h3 className="text-title3 font-semibold">A24 Cinematic</h3>
                  <p className="text-caption text-foreground-secondary">Film-quality controls</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggle}
                className="rounded-full w-8 h-8 p-0"
              >
                ×
              </Button>
            </div>

            {/* Current State Display */}
            {cinematicState && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-foreground/5 rounded-lg p-4 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-callout text-foreground-secondary">Current Mode</span>
                  <Badge variant="secondary" className="gap-1">
                    {cameraModesConfig[currentMode].icon}
                    {cameraModesConfig[currentMode].label}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-callout text-foreground-secondary">Emotional State</span>
                  <Badge variant="outline" className={`gap-1 ${emotionalStatesConfig[currentMood].color}`}>
                    {emotionalStatesConfig[currentMood].icon}
                    {emotionalStatesConfig[currentMood].label}
                  </Badge>
                </div>
                {cinematicState.isTransitioning && (
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-world-primary rounded-full animate-pulse" />
                    <span className="text-caption text-world-primary">Transitioning...</span>
                  </div>
                )}
              </motion.div>
            )}

            {/* Camera Modes */}
            <div className="space-y-3">
              <h4 className="text-callout font-medium text-foreground-secondary uppercase tracking-wide">
                Camera Modes
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(cameraModesConfig).map(([mode, config]) => (
                  <Button
                    key={mode}
                    variant={currentMode === mode ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleCameraModeChange(mode as CameraMode)}
                    className="flex items-center gap-2 h-auto p-3 flex-col"
                  >
                    {config.icon}
                    <div className="text-center">
                      <div className="text-xs font-medium">{config.label}</div>
                      <div className="text-xs opacity-70">{config.description}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>

            {/* Emotional States */}
            <div className="space-y-3">
              <h4 className="text-callout font-medium text-foreground-secondary uppercase tracking-wide">
                Emotional State
              </h4>
              <div className="grid grid-cols-3 gap-2">
                {Object.entries(emotionalStatesConfig).map(([mood, config]) => (
                  <Button
                    key={mood}
                    variant={currentMood === mood ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleEmotionalStateChange(mood as CinematicMood)}
                    className={`flex items-center gap-1 h-auto p-2 ${
                      currentMood === mood ? '' : config.color
                    }`}
                  >
                    {config.icon}
                    <span className="text-xs">{config.label}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Cinematic Sequences */}
            <div className="space-y-3">
              <h4 className="text-callout font-medium text-foreground-secondary uppercase tracking-wide">
                Sequences
              </h4>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => startSequence('establishing')}
                  className="w-full justify-start gap-2"
                >
                  <Eye className="w-4 h-4" />
                  Establishing Shot
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => startSequence('audio-reactive')}
                  className="w-full justify-start gap-2"
                >
                  <Volume2 className="w-4 h-4" />
                  Audio Reactive
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => startSequence('emotional')}
                  className="w-full justify-start gap-2"
                >
                  <Heart className="w-4 h-4" />
                  Emotional Peak
                </Button>
              </div>
            </div>

            {/* Quick Shots */}
            <div className="space-y-3">
              <h4 className="text-callout font-medium text-foreground-secondary uppercase tracking-wide">
                Quick Shots
              </h4>
              <div className="grid grid-cols-3 gap-2">
                {[0, 1, 2].map((shotIndex) => (
                  <Button
                    key={shotIndex}
                    variant="outline"
                    size="sm"
                    onClick={() => switchShot(shotIndex)}
                    className="h-auto p-3"
                  >
                    <div className="text-center">
                      <div className="text-sm font-medium">Shot {shotIndex + 1}</div>
                      <div className="text-xs opacity-70">
                        {shotIndex === 0 ? 'Wide' : shotIndex === 1 ? 'Medium' : 'Close'}
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>

            {/* Advanced Controls */}
            <motion.div
              initial={false}
              animate={{ height: showAdvanced ? 'auto' : 0 }}
              className="overflow-hidden"
            >
              <div className="space-y-4 pt-2">
                <h4 className="text-callout font-medium text-foreground-secondary uppercase tracking-wide">
                  Camera Shake
                </h4>
                <div className="space-y-2">
                  <Slider
                    min={[0]}
                    max={[100]}
                    step={[5]}
                    onValueCommit={(value) => handleCameraShake(value[0])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-foreground-secondary">
                    <span>Gentle</span>
                    <span>Intense</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="w-full justify-center gap-2 text-foreground-secondary"
            >
              <Settings className="w-4 h-4" />
              {showAdvanced ? 'Hide' : 'Show'} Advanced
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}