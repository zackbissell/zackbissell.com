import React, { useState, useEffect, useRef } from 'react';
import { FrequencyVisualizer, CircularVisualizer, WaveformVisualizer } from 'react-audio-visualizer-pro';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, 
  Zap, 
  AlertTriangle, 
  Radio,
  Waves,
  BarChart3,
  CircuitBoard
} from 'lucide-react';

interface AudioReactiveVisualizerProps {
  audioUrl?: string;
  worldTheme: 'disco' | 'nostalgia' | 'rolemodel' | 'elevation';
  visualizerType?: 'frequency' | 'circular' | 'waveform' | 'conspiracy';
  width?: number;
  height?: number;
  showControls?: boolean;
  onAudioPeaks?: (peaks: number[]) => void;
}

export const AudioReactiveVisualizer: React.FC<AudioReactiveVisualizerProps> = ({
  audioUrl,
  worldTheme,
  visualizerType = 'frequency',
  width = 800,
  height = 200,
  showControls = true,
  onAudioPeaks
}) => {
  const [isActive, setIsActive] = useState(false);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const [frequencyData, setFrequencyData] = useState<Uint8Array | null>(null);
  const [peakLevel, setPeakLevel] = useState(0);
  const animationFrameRef = useRef<number>();

  // World-specific theme configurations
  const getWorldTheme = () => {
    switch (worldTheme) {
      case 'disco':
        return {
          backgroundColor: '#000000',
          gradientColors: ['#FFC107', '#FF5722', '#00FF00'],
          barWidth: 2,
          barSpacing: 1,
          barRadius: 0,
          glowEffect: true,
          conspiracyMode: true
        };
      case 'nostalgia':
        return {
          backgroundColor: '#1a0033',
          gradientColors: ['#8b5cf6', '#ec4899', '#f59e0b'],
          barWidth: 3,
          barSpacing: 2,
          barRadius: 4,
          glowEffect: true,
          conspiracyMode: false
        };
      case 'rolemodel':
        return {
          backgroundColor: '#0f0f0f',
          gradientColors: ['#eab308', '#ef4444', '#f97316'],
          barWidth: 1,
          barSpacing: 0,
          barRadius: 0,
          glowEffect: false,
          conspiracyMode: false
        };
      case 'elevation':
        return {
          backgroundColor: '#001122',
          gradientColors: ['#3b82f6', '#f59e0b', '#06b6d4'],
          barWidth: 4,
          barSpacing: 2,
          barRadius: 6,
          glowEffect: true,
          conspiracyMode: false
        };
      default:
        return {
          backgroundColor: '#000000',
          gradientColors: ['#ffffff'],
          barWidth: 2,
          barSpacing: 1,
          barRadius: 0,
          glowEffect: false,
          conspiracyMode: false
        };
    }
  };

  const theme = getWorldTheme();

  // Audio analysis for reactive effects
  useEffect(() => {
    if (!analyser || !frequencyData) return;

    const analyze = () => {
      analyser.getByteFrequencyData(frequencyData);
      
      // Calculate peak level for reactive effects
      const average = frequencyData.reduce((sum, value) => sum + value, 0) / frequencyData.length;
      setPeakLevel(average / 255);

      // Trigger peak callbacks for conspiracy effects
      if (onAudioPeaks && average > 180) {
        const peaks = Array.from(frequencyData).filter(val => val > 200);
        onAudioPeaks(peaks);
      }

      animationFrameRef.current = requestAnimationFrame(analyze);
    };

    analyze();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [analyser, frequencyData, onAudioPeaks]);

  const initializeAudio = async () => {
    if (!audioUrl) return;

    try {
      const context = new AudioContext();
      const response = await fetch(audioUrl);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await context.decodeAudioData(arrayBuffer);
      
      const source = context.createBufferSource();
      const analyserNode = context.createAnalyser();
      analyserNode.fftSize = 256;
      
      source.buffer = audioBuffer;
      source.connect(analyserNode);
      analyserNode.connect(context.destination);
      
      setAudioContext(context);
      setAnalyser(analyserNode);
      setFrequencyData(new Uint8Array(analyserNode.frequencyBinCount));
      setIsActive(true);
      
      source.start();
    } catch (error) {
      console.error('Audio initialization failed:', error);
    }
  };

  const ConspiracyModeOverlay = () => {
    if (!theme.conspiracyMode || !isActive) return null;

    return (
      <div className="absolute inset-0 pointer-events-none">
        {/* Security scanning lines */}
        <motion.div
          className="absolute inset-0 border-2 border-green-500 opacity-30"
          animate={{
            borderColor: peakLevel > 0.7 ? '#ff0000' : '#00ff00',
          }}
          transition={{ duration: 0.1 }}
        />
        
        {/* Peak warning indicators */}
        <AnimatePresence>
          {peakLevel > 0.8 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute top-2 right-2 bg-red-900/90 border border-red-500 px-2 py-1 rounded text-xs font-mono text-red-200"
            >
              <AlertTriangle className="h-3 w-3 inline mr-1" />
              ANOMALY DETECTED
            </motion.div>
          )}
        </AnimatePresence>

        {/* Frequency scanning overlay */}
        <motion.div
          className="absolute top-0 left-0 w-full h-1 bg-green-400"
          animate={{
            scaleX: peakLevel,
            backgroundColor: peakLevel > 0.6 ? '#ff4444' : '#00ff00'
          }}
          transition={{ duration: 0.1 }}
        />
      </div>
    );
  };

  const renderVisualizer = () => {
    const commonProps = {
      width,
      height,
      backgroundColor: theme.backgroundColor,
      gradientColors: theme.gradientColors,
    };

    switch (visualizerType) {
      case 'frequency':
        return (
          <FrequencyVisualizer
            {...commonProps}
            audioUrl={audioUrl}
            barWidth={theme.barWidth}
            barSpacing={theme.barSpacing}
            barRadius={theme.barRadius}
          />
        );
      
      case 'circular':
        return (
          <CircularVisualizer
            {...commonProps}
            audioUrl={audioUrl}
            animationSpeed={1.5}
            barWidth={theme.barWidth}
          />
        );
      
      case 'waveform':
        return (
          <WaveformVisualizer
            {...commonProps}
            audioUrl={audioUrl}
          />
        );
      
      case 'conspiracy':
        return (
          <div className="relative">
            <FrequencyVisualizer
              {...commonProps}
              audioUrl={audioUrl}
              barWidth={1}
              barSpacing={0}
              barRadius={0}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-50" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/10 to-transparent" />
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="relative">
      {/* Controls */}
      {showControls && (
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={initializeAudio}
              disabled={!audioUrl || isActive}
              className="px-4 py-2 bg-primary hover:bg-primary/80 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded transition-colors"
            >
              {isActive ? 'Active' : 'Initialize Audio Analysis'}
            </button>
            
            <div className="flex items-center gap-2 text-sm">
              <Activity className={`h-4 w-4 ${isActive ? 'text-green-400' : 'text-gray-400'}`} />
              <span className="font-mono">
                {isActive ? 'ANALYZING' : 'STANDBY'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono">PEAK:</span>
            <div className="w-20 h-2 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-green-400 to-red-500"
                animate={{ width: `${peakLevel * 100}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <span className="text-xs font-mono w-8">
              {Math.round(peakLevel * 100)}%
            </span>
          </div>
        </div>
      )}

      {/* Visualizer Container */}
      <div 
        className={`relative rounded-lg overflow-hidden border ${
          theme.conspiracyMode ? 'border-green-500/50' : 'border-gray-600'
        }`}
        style={{ width, height }}
      >
        {audioUrl ? (
          <>
            {renderVisualizer()}
            <ConspiracyModeOverlay />
            
            {/* Glow effect */}
            {theme.glowEffect && isActive && (
              <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/5 pointer-events-none" />
            )}
          </>
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-900 text-gray-400">
            <div className="text-center">
              <Radio className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <div className="text-sm">No audio source</div>
            </div>
          </div>
        )}
      </div>

      {/* World-specific status indicators */}
      {isActive && (
        <div className="mt-2 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-4">
            <span className={`flex items-center gap-1 ${theme.conspiracyMode ? 'text-green-400' : 'text-blue-400'}`}>
              <Waves className="h-3 w-3" />
              FREQ ANALYSIS
            </span>
            {theme.conspiracyMode && (
              <span className="text-amber-400">
                <CircuitBoard className="h-3 w-3 inline mr-1" />
                TEMPORAL MONITOR
              </span>
            )}
          </div>
          
          <div className="text-gray-400">
            {worldTheme.toUpperCase()} MODE
          </div>
        </div>
      )}
    </div>
  );
};

// Preset configurations for different story worlds
export const DiscoAscensionVisualizer: React.FC<Omit<AudioReactiveVisualizerProps, 'worldTheme'>> = (props) => (
  <AudioReactiveVisualizer {...props} worldTheme="disco" visualizerType="conspiracy" />
);

export const NostalgiaTrapVisualizer: React.FC<Omit<AudioReactiveVisualizerProps, 'worldTheme'>> = (props) => (
  <AudioReactiveVisualizer {...props} worldTheme="nostalgia" visualizerType="circular" />
);

export const RoleModelVisualizer: React.FC<Omit<AudioReactiveVisualizerProps, 'worldTheme'>> = (props) => (
  <AudioReactiveVisualizer {...props} worldTheme="rolemodel" visualizerType="frequency" />
);

export const ElevationVisualizer: React.FC<Omit<AudioReactiveVisualizerProps, 'worldTheme'>> = (props) => (
  <AudioReactiveVisualizer {...props} worldTheme="elevation" visualizerType="waveform" />
);

export default AudioReactiveVisualizer;