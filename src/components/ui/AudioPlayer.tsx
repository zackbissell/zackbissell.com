import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, RotateCcw, Maximize2, Clock, Headphones } from 'lucide-react';
import { Badge } from './badge';

interface AudioPlayerProps {
  src?: string;
  title?: string;
  artist?: string;
  duration?: string;
  world?: 'disco' | 'nostalgia' | 'rolemodel' | 'elevation';
  showVisualizer?: boolean;
  incidents?: Array<{ time: string; event: string; details: string }>;
  onTimeUpdate?: (currentTime: number) => void;
  autoplay?: boolean;
  preloadWarning?: string;
}

interface VisualizerProps {
  audioRef: React.RefObject<HTMLAudioElement>;
  world?: string;
  isPlaying: boolean;
}

// Audio visualizer component using Web Audio API
function AudioVisualizer({ audioRef, world = 'disco', isPlaying }: VisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const animationIdRef = useRef<number>();

  const worldColors = {
    disco: {
      primary: '#F59E0B',
      secondary: '#EA580C', 
      accent: '#EF4444',
      background: 'rgba(245, 158, 11, 0.1)'
    },
    nostalgia: {
      primary: '#A855F7',
      secondary: '#EC4899',
      accent: '#F43F5E',
      background: 'rgba(168, 85, 247, 0.1)'
    },
    rolemodel: {
      primary: '#EAB308',
      secondary: '#EA580C',
      accent: '#F97316',
      background: 'rgba(234, 179, 8, 0.1)'
    },
    elevation: {
      primary: '#0EA5E9',
      secondary: '#F59E0B',
      accent: '#00FFFF',
      background: 'rgba(14, 165, 233, 0.1)'
    }
  };

  const colors = worldColors[world as keyof typeof worldColors] || worldColors.disco;

  const initializeAudio = useCallback(() => {
    if (!audioRef.current || !canvasRef.current) return;

    try {
      audioContextRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      
      if (!sourceRef.current) {
        sourceRef.current = audioContextRef.current.createMediaElementSource(audioRef.current);
        sourceRef.current.connect(analyserRef.current);
        analyserRef.current.connect(audioContextRef.current.destination);
      }

      analyserRef.current.fftSize = 256;
    } catch (error) {
      console.warn('Web Audio API not supported:', error);
    }
  }, [audioRef]);

  const draw = useCallback(() => {
    if (!canvasRef.current || !analyserRef.current || !isPlaying) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyserRef.current.getByteFrequencyData(dataArray);

    // Clear canvas
    ctx.fillStyle = colors.background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const barWidth = (canvas.width / bufferLength) * 2.5;
    let barHeight;
    let x = 0;

    // Create gradient
    const gradient = ctx.createLinearGradient(0, canvas.height, 0, 0);
    gradient.addColorStop(0, colors.primary);
    gradient.addColorStop(0.5, colors.secondary);
    gradient.addColorStop(1, colors.accent);

    for (let i = 0; i < bufferLength; i++) {
      barHeight = (dataArray[i] / 255) * canvas.height * 0.8;

      ctx.fillStyle = gradient;
      ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

      // Add glow effect for certain worlds
      if (world === 'nostalgia' || world === 'elevation') {
        ctx.shadowColor = colors.primary;
        ctx.shadowBlur = 10;
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
        ctx.shadowBlur = 0;
      }

      x += barWidth + 1;
    }

    animationIdRef.current = requestAnimationFrame(draw);
  }, [colors, isPlaying, world]);

  useEffect(() => {
    if (isPlaying) {
      initializeAudio();
      if (audioContextRef.current?.state === 'suspended') {
        audioContextRef.current.resume();
      }
      draw();
    } else {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    }

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [isPlaying, initializeAudio, draw]);

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={120}
      className="w-full h-24 rounded-lg bg-background/50 backdrop-blur-sm"
    />
  );
}

// Main AudioPlayer component
export default function AudioPlayer({
  src,
  title = "Untitled Mix",
  artist = "Zack Bissell",
  duration = "00:00",
  world = 'disco',
  showVisualizer = true,
  incidents = [],
  onTimeUpdate,
  autoplay = false,
  preloadWarning,
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showWarning, setShowWarning] = useState(!!preloadWarning);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  const worldClasses = {
    disco: 'world-disco',
    nostalgia: 'world-nostalgia', 
    rolemodel: 'world-rolemodel',
    elevation: 'world-elevation'
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const togglePlayPause = async () => {
    if (!audioRef.current || !src) return;

    setHasUserInteracted(true);
    setShowWarning(false);

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      setIsLoading(true);
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.error('Playback failed:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      setCurrentTime(current);
      onTimeUpdate?.(current);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setTotalDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newTime = percent * totalDuration;
    
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  // Find current incident based on time
  const getCurrentIncident = () => {
    return incidents.find(incident => {
      const [minutes, seconds] = incident.time.split(':').map(Number);
      const incidentTime = minutes * 60 + seconds;
      return Math.abs(currentTime - incidentTime) < 5; // 5 second tolerance
    });
  };

  const currentIncident = getCurrentIncident();

  if (showWarning && preloadWarning) {
    return (
      <div className={`${worldClasses[world]} my-8`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="border border-world-accent/30 bg-world-accent/5 rounded-lg p-6 backdrop-blur-sm"
        >
          <div className="flex items-start gap-3 mb-4">
            <Headphones className="w-6 h-6 text-world-accent flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-title3 font-semibold text-foreground mb-2">
                Immersive Audio Experience Ready
              </h3>
              <p className="text-body text-foreground-secondary mb-4">
                {preloadWarning}
              </p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={() => {
                setShowWarning(false);
                setHasUserInteracted(true);
              }}
              className="px-6 py-2 bg-world-primary text-black rounded-lg hover:bg-world-primary/80 transition-colors font-semibold"
            >
              Continue
            </button>
            <button
              onClick={() => setShowWarning(false)}
              className="px-6 py-2 border border-foreground/20 rounded-lg hover:bg-foreground/10 transition-colors"
            >
              Skip Warning
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`${worldClasses[world]} my-8`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border border-world-primary/30 bg-world-primary/5 rounded-xl p-6 backdrop-blur-sm"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-title3 font-bold text-foreground">{title}</h3>
            <p className="text-subhead text-foreground-secondary">by {artist}</p>
          </div>
          <Badge variant={world as "classified" | "emotional" | "chaotic" | "ascending"} size="sm">
            {duration}
          </Badge>
        </div>

        {/* Visualizer */}
        {showVisualizer && hasUserInteracted && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mb-4 overflow-hidden"
          >
            <AudioVisualizer 
              audioRef={audioRef} 
              world={world} 
              isPlaying={isPlaying} 
            />
          </motion.div>
        )}

        {/* Progress Bar */}
        <div className="mb-4">
          <div 
            className="w-full h-2 bg-foreground/10 rounded-full cursor-pointer overflow-hidden"
            onClick={handleSeek}
          >
            <motion.div
              className="h-full bg-world-primary rounded-full"
              style={{ width: `${(currentTime / totalDuration) * 100}%` }}
              initial={{ width: 0 }}
              animate={{ width: `${(currentTime / totalDuration) * 100}%` }}
            />
          </div>
          <div className="flex justify-between text-caption text-foreground-secondary mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(totalDuration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.button
              onClick={togglePlayPause}
              disabled={!src || isLoading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 bg-world-primary text-black rounded-full flex items-center justify-center hover:bg-world-primary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-black border-t-transparent rounded-full"
                />
              ) : isPlaying ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5 ml-0.5" />
              )}
            </motion.button>

            <button
              onClick={() => {
                if (audioRef.current) {
                  audioRef.current.currentTime = 0;
                  setCurrentTime(0);
                }
              }}
              className="text-foreground-secondary hover:text-foreground transition-colors"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleMute}
              className="text-foreground-secondary hover:text-foreground transition-colors"
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
              className="w-20 accent-world-primary"
            />
          </div>
        </div>

        {/* Current Incident Alert */}
        <AnimatePresence>
          {currentIncident && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 p-3 border border-world-accent/30 bg-world-accent/10 rounded-lg"
            >
              <div className="flex items-center gap-2 mb-1">
                <Clock className="w-4 h-4 text-world-accent" />
                <span className="text-sm font-medium text-world-accent">
                  Anomalous Event Detected
                </span>
              </div>
              <p className="text-sm text-foreground-secondary">
                {currentIncident.event}: {currentIncident.details}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Audio Element */}
        <audio
          ref={audioRef}
          src={src}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => setIsPlaying(false)}
          preload="metadata"
        />
      </motion.div>
    </div>
  );
}

// Preset audio players for different worlds
export const DiscoAudioPlayer = (props: Partial<AudioPlayerProps>) => (
  <AudioPlayer 
    world="disco" 
    preloadWarning="Contains anomalous temporal frequencies. Department of Groove Regulation advises caution."
    {...props} 
  />
);

export const NostalgiaAudioPlayer = (props: Partial<AudioPlayerProps>) => (
  <AudioPlayer 
    world="nostalgia" 
    preloadWarning="This experience is designed to evoke deep emotional responses. Please listen responsibly."
    {...props} 
  />
);

export const ChaosAudioPlayer = (props: Partial<AudioPlayerProps>) => (
  <AudioPlayer 
    world="rolemodel" 
    preloadWarning="Warning: Unhinged content ahead. Side effects may include spontaneous creativity and disregard for musical boundaries."
    {...props} 
  />
);

export const ElevationAudioPlayer = (props: Partial<AudioPlayerProps>) => (
  <AudioPlayer 
    world="elevation" 
    preloadWarning="Prepare for genre-defying ascension. Purists may experience discomfort."
    {...props} 
  />
);