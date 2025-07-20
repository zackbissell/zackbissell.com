import React, { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, ExternalLink, AlertTriangle, Lock } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

export type WorldTheme = 'disco' | 'nostalgia' | 'rolemodel' | 'elevation';

interface MixcloudPlayerProps {
  embedUrl: string;
  title: string;
  artist?: string;
  worldTheme: WorldTheme;
  classificationLevel?: string;
  warningMessage?: string;
  showSecurityOverlay?: boolean;
  onPlaybackStart?: () => void;
  onPlaybackPause?: () => void;
  onAudioPeaks?: (peaks: number[]) => void;
  className?: string;
}

const worldThemeConfigs = {
  disco: {
    primaryColor: 'from-amber-500 to-red-600',
    accentColor: 'text-amber-400',
    backgroundColor: 'bg-black/90',
    borderColor: 'border-amber-500/30',
    glowColor: 'shadow-amber-500/20',
    warningColor: 'bg-red-600/20 border-red-500',
  },
  nostalgia: {
    primaryColor: 'from-purple-500 to-pink-600',
    accentColor: 'text-purple-400',
    backgroundColor: 'bg-purple-950/90',
    borderColor: 'border-purple-500/30',
    glowColor: 'shadow-purple-500/20',
    warningColor: 'bg-purple-600/20 border-purple-500',
  },
  rolemodel: {
    primaryColor: 'from-yellow-500 to-red-600',
    accentColor: 'text-yellow-400',
    backgroundColor: 'bg-zinc-950/90',
    borderColor: 'border-yellow-500/30',
    glowColor: 'shadow-yellow-500/20',
    warningColor: 'bg-yellow-600/20 border-yellow-500',
  },
  elevation: {
    primaryColor: 'from-blue-500 to-amber-600',
    accentColor: 'text-blue-400',
    backgroundColor: 'bg-blue-950/90',
    borderColor: 'border-blue-500/30',
    glowColor: 'shadow-blue-500/20',
    warningColor: 'bg-blue-600/20 border-blue-500',
  },
};

export const MixcloudPlayer: React.FC<MixcloudPlayerProps> = ({
  embedUrl,
  title,
  artist = "Zack Bissell",
  worldTheme,
  classificationLevel,
  warningMessage,
  showSecurityOverlay = false,
  onPlaybackStart,
  onPlaybackPause,
  onAudioPeaks,
  className = "",
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(!showSecurityOverlay);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showWarning, setShowWarning] = useState(!!warningMessage);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const audioSimulationRef = useRef<number>();

  const theme = worldThemeConfigs[worldTheme];

  // Simulate audio peaks for visualization since Mixcloud iframe doesn't expose audio data
  const simulateAudioPeaks = useCallback(() => {
    if (!isPlaying || !onAudioPeaks) return;

    const generatePeaks = () => {
      // Generate realistic audio peaks simulation
      const peaks = Array.from({ length: 32 }, (_, i) => {
        const baseFreq = Math.sin(Date.now() * 0.001 + i * 0.2) * 0.5 + 0.5;
        const randomVariation = Math.random() * 0.3;
        const bassBoost = i < 4 ? 1.3 : 1.0;
        return Math.min(1, (baseFreq + randomVariation) * bassBoost);
      });
      
      onAudioPeaks(peaks);
      audioSimulationRef.current = requestAnimationFrame(generatePeaks);
    };

    generatePeaks();
  }, [isPlaying, onAudioPeaks]);

  useEffect(() => {
    if (isPlaying) {
      simulateAudioPeaks();
    } else {
      if (audioSimulationRef.current) {
        cancelAnimationFrame(audioSimulationRef.current);
      }
    }

    return () => {
      if (audioSimulationRef.current) {
        cancelAnimationFrame(audioSimulationRef.current);
      }
    };
  }, [isPlaying, simulateAudioPeaks]);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handleAccessGrant = () => {
    setHasAccess(true);
  };

  const handleWarningDismiss = () => {
    setShowWarning(false);
  };

  const togglePlayback = () => {
    const newPlayState = !isPlaying;
    setIsPlaying(newPlayState);
    
    if (newPlayState) {
      onPlaybackStart?.();
    } else {
      onPlaybackPause?.();
    }
  };

  const openInMixcloud = () => {
    const mixcloudUrl = embedUrl.replace('/widget/iframe/', '/');
    window.open(mixcloudUrl, '_blank');
  };

  if (!hasAccess && showSecurityOverlay) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`relative w-full ${theme.backgroundColor} ${theme.borderColor} border rounded-lg overflow-hidden ${className}`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/50 to-black/80 backdrop-blur-sm" />
        
        <div className="relative z-10 p-8 text-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <Lock className={`mx-auto h-12 w-12 ${theme.accentColor}`} />
            <h3 className="text-xl font-bold text-white">Restricted Access</h3>
            <p className="text-gray-300 max-w-md mx-auto">
              This audio file has been classified. Access requires proper clearance.
            </p>
            {classificationLevel && (
              <Badge variant="destructive" className="mx-auto">
                <AlertTriangle className="w-3 h-3 mr-1" />
                {classificationLevel}
              </Badge>
            )}
            <Button 
              onClick={handleAccessGrant}
              className={`bg-gradient-to-r ${theme.primaryColor} hover:scale-105 transition-transform`}
            >
              Request Access
            </Button>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className={`relative w-full ${className}`}>
      <AnimatePresence>
        {showWarning && warningMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`mb-4 p-4 rounded-lg ${theme.warningColor} border`}
          >
            <div className="flex items-start gap-3">
              <AlertTriangle className={`h-5 w-5 ${theme.accentColor} flex-shrink-0 mt-0.5`} />
              <div className="flex-1">
                <p className="text-white font-medium">Warning</p>
                <p className="text-gray-300 text-sm mt-1">{warningMessage}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleWarningDismiss}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`relative ${theme.backgroundColor} ${theme.borderColor} border rounded-lg overflow-hidden shadow-2xl ${theme.glowColor}`}
      >
        {/* Header */}
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-bold truncate">{title}</h3>
              <p className={`text-sm ${theme.accentColor} truncate`}>{artist}</p>
            </div>
            
            <div className="flex items-center gap-2 ml-4">
              {classificationLevel && (
                <Badge variant="secondary" className="bg-white/10 text-white border-white/20">
                  {classificationLevel}
                </Badge>
              )}
              
              <Button
                variant="ghost"
                size="sm"
                onClick={openInMixcloud}
                className="text-gray-400 hover:text-white"
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Player Container */}
        <div className="relative">
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 flex items-center justify-center bg-black/50 z-10"
            >
              <div className="text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className={`h-8 w-8 border-2 border-transparent ${theme.borderColor} border-t-current rounded-full mx-auto mb-2`}
                />
                <p className="text-white text-sm">Loading secure connection...</p>
              </div>
            </motion.div>
          )}

          <iframe
            ref={iframeRef}
            width="100%"
            height="120"
            src={embedUrl}
            frameBorder="0"
            allow="autoplay"
            onLoad={handleIframeLoad}
            className="block"
            title={`${title} by ${artist}`}
          />
        </div>

        {/* Custom Controls Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={togglePlayback}
                className={`${theme.accentColor} hover:bg-white/10`}
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              
              <div className="flex items-center gap-2">
                <Volume2 className={`h-4 w-4 ${theme.accentColor}`} />
                <div className="w-16 h-1 bg-white/20 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full bg-gradient-to-r ${theme.primaryColor}`}
                    initial={{ width: "70%" }}
                    animate={{ width: isPlaying ? "85%" : "70%" }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
            </div>

            {isPlaying && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-1"
              >
                {Array.from({ length: 4 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className={`w-1 bg-gradient-to-t ${theme.primaryColor} rounded-full`}
                    animate={{
                      height: [4, 16, 4],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};