import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AdvancedAudioVisualizerProps {
  audioRef?: React.RefObject<HTMLAudioElement>;
  worldTheme: 'disco' | 'nostalgia' | 'rolemodel' | 'elevation';
  isPlaying: boolean;
  width?: number;
  height?: number;
  style?: 'bars' | 'wave' | 'circular' | 'particle';
  sensitivity?: number;
  onFrequencyData?: (frequencies: number[]) => void;
}

const worldVisualConfigs = {
  disco: {
    colors: ['#F59E0B', '#EA580C', '#EF4444'],
    style: 'bars',
    effects: ['glitch', 'strobe'],
    smoothing: 0.3,
  },
  nostalgia: {
    colors: ['#A855F7', '#EC4899', '#F43F5E'],
    style: 'wave',
    effects: ['glow', 'fade'],
    smoothing: 0.8,
  },
  rolemodel: {
    colors: ['#EAB308', '#EA580C', '#F97316'],
    style: 'particle',
    effects: ['chaos', 'explosion'],
    smoothing: 0.1,
  },
  elevation: {
    colors: ['#0EA5E9', '#F59E0B', '#00FFFF'],
    style: 'circular',
    effects: ['ascend', 'spiral'],
    smoothing: 0.6,
  },
};

export const AdvancedAudioVisualizer: React.FC<AdvancedAudioVisualizerProps> = ({
  audioRef,
  worldTheme,
  isPlaying,
  width = 400,
  height = 120,
  style,
  sensitivity = 1,
  onFrequencyData,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const animationIdRef = useRef<number>();
  const dataArrayRef = useRef<Uint8Array>();
  const [frequencyData, setFrequencyData] = useState<number[]>([]);
  
  const config = worldVisualConfigs[worldTheme];
  const visualStyle = style || config.style;
  
  // Initialize Web Audio API
  const initializeAudio = useCallback(() => {
    if (!audioRef?.current || !canvasRef.current) return;
    
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      
      if (!analyserRef.current) {
        analyserRef.current = audioContextRef.current.createAnalyser();
        analyserRef.current.fftSize = 256;
        analyserRef.current.smoothingTimeConstant = config.smoothing;
        
        if (!sourceRef.current) {
          sourceRef.current = audioContextRef.current.createMediaElementSource(audioRef.current);
          sourceRef.current.connect(analyserRef.current);
          analyserRef.current.connect(audioContextRef.current.destination);
        }
        
        const bufferLength = analyserRef.current.frequencyBinCount;
        dataArrayRef.current = new Uint8Array(bufferLength);
      }
    } catch (error) {
      console.warn('Web Audio API initialization failed:', error);
    }
  }, [audioRef, config.smoothing]);
  
  // Create gradient based on world theme
  const createGradient = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const gradient = ctx.createLinearGradient(0, height, 0, 0);
    config.colors.forEach((color, index) => {
      gradient.addColorStop(index / (config.colors.length - 1), color);
    });
    return gradient;
  };
  
  // Bars visualization
  const drawBars = (ctx: CanvasRenderingContext2D, dataArray: Uint8Array, width: number, height: number) => {
    const barWidth = (width / dataArray.length) * 2.5;
    let barHeight;
    let x = 0;
    
    const gradient = createGradient(ctx, width, height);
    
    for (let i = 0; i < dataArray.length; i++) {
      barHeight = (dataArray[i] / 255) * height * sensitivity;
      
      ctx.fillStyle = gradient;
      ctx.fillRect(x, height - barHeight, barWidth, barHeight);
      
      // Add world-specific effects
      if (config.effects.includes('glitch') && Math.random() > 0.95) {
        ctx.fillStyle = '#FF0080';
        ctx.fillRect(x + Math.random() * 5, height - barHeight, barWidth, barHeight);
      }
      
      if (config.effects.includes('strobe') && dataArray[i] > 200) {
        ctx.shadowBlur = 20;
        ctx.shadowColor = config.colors[0];
        ctx.fillRect(x, height - barHeight, barWidth, barHeight);
        ctx.shadowBlur = 0;
      }
      
      x += barWidth + 1;
    }
  };
  
  // Wave visualization
  const drawWave = (ctx: CanvasRenderingContext2D, dataArray: Uint8Array, width: number, height: number) => {
    ctx.lineWidth = 3;
    ctx.strokeStyle = createGradient(ctx, width, height);
    ctx.beginPath();
    
    const sliceWidth = width / dataArray.length;
    let x = 0;
    
    for (let i = 0; i < dataArray.length; i++) {
      const v = (dataArray[i] / 255) * sensitivity;
      const y = v * height / 2;
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
      
      x += sliceWidth;
    }
    
    ctx.lineTo(width, height / 2);
    ctx.stroke();
    
    // Add glow effect for nostalgia theme
    if (config.effects.includes('glow')) {
      ctx.shadowBlur = 15;
      ctx.shadowColor = config.colors[1];
      ctx.stroke();
      ctx.shadowBlur = 0;
    }
  };
  
  // Circular visualization
  const drawCircular = (ctx: CanvasRenderingContext2D, dataArray: Uint8Array, width: number, height: number) => {
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 4;
    
    ctx.lineWidth = 2;
    
    for (let i = 0; i < dataArray.length; i++) {
      const angle = (i / dataArray.length) * Math.PI * 2;
      const amplitude = (dataArray[i] / 255) * radius * sensitivity;
      
      const x1 = centerX + Math.cos(angle) * radius;
      const y1 = centerY + Math.sin(angle) * radius;
      const x2 = centerX + Math.cos(angle) * (radius + amplitude);
      const y2 = centerY + Math.sin(angle) * (radius + amplitude);
      
      const colorIndex = Math.floor((i / dataArray.length) * config.colors.length);
      ctx.strokeStyle = config.colors[colorIndex] || config.colors[0];
      
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      
      // Add spiral effect for elevation theme
      if (config.effects.includes('spiral')) {
        const spiralRadius = radius + amplitude * 0.5;
        const spiralX = centerX + Math.cos(angle * 3) * spiralRadius;
        const spiralY = centerY + Math.sin(angle * 3) * spiralRadius;
        
        ctx.beginPath();
        ctx.arc(spiralX, spiralY, 2, 0, Math.PI * 2);
        ctx.fillStyle = config.colors[colorIndex] || config.colors[0];
        ctx.fill();
      }
    }
  };
  
  // Particle visualization
  const drawParticle = (ctx: CanvasRenderingContext2D, dataArray: Uint8Array, width: number, height: number) => {
    const particleCount = Math.min(dataArray.length, 50);
    
    for (let i = 0; i < particleCount; i++) {
      const amplitude = dataArray[i] / 255;
      const size = amplitude * 10 * sensitivity;
      
      let x, y;
      
      if (config.effects.includes('chaos')) {
        // Chaotic movement for role model theme
        x = Math.random() * width;
        y = Math.random() * height;
      } else {
        // Organized grid pattern
        x = (i % 10) * (width / 10) + amplitude * 20;
        y = Math.floor(i / 10) * (height / 5) + amplitude * 30;
      }
      
      const colorIndex = Math.floor((i / particleCount) * config.colors.length);
      ctx.fillStyle = config.colors[colorIndex] || config.colors[0];
      
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
      
      // Add explosion effect
      if (config.effects.includes('explosion') && amplitude > 0.8) {
        ctx.shadowBlur = size * 2;
        ctx.shadowColor = config.colors[colorIndex] || config.colors[0];
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }
  };
  
  // Main draw function
  const draw = useCallback(() => {
    if (!canvasRef.current || !analyserRef.current || !dataArrayRef.current || !isPlaying) {
      return;
    }
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    analyserRef.current.getByteFrequencyData(dataArrayRef.current);
    
    // Clear canvas with theme-appropriate background
    ctx.fillStyle = `${config.colors[0]}08`; // Very transparent theme color
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Convert to array for callback
    const frequencies = Array.from(dataArrayRef.current);
    setFrequencyData(frequencies);
    onFrequencyData?.(frequencies);
    
    // Draw based on selected style
    switch (visualStyle) {
      case 'bars':
        drawBars(ctx, dataArrayRef.current, canvas.width, canvas.height);
        break;
      case 'wave':
        drawWave(ctx, dataArrayRef.current, canvas.width, canvas.height);
        break;
      case 'circular':
        drawCircular(ctx, dataArrayRef.current, canvas.width, canvas.height);
        break;
      case 'particle':
        drawParticle(ctx, dataArrayRef.current, canvas.width, canvas.height);
        break;
      default:
        drawBars(ctx, dataArrayRef.current, canvas.width, canvas.height);
    }
    
    animationIdRef.current = requestAnimationFrame(draw);
  }, [isPlaying, visualStyle, sensitivity, config, onFrequencyData]);
  
  // Start/stop animation based on playing state
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
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className={`${worldTheme === 'disco' ? 'world-disco' : ''} ${worldTheme === 'nostalgia' ? 'world-nostalgia' : ''} ${worldTheme === 'rolemodel' ? 'world-rolemodel' : ''} ${worldTheme === 'elevation' ? 'world-elevation' : ''}`}
    >
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="w-full rounded-lg bg-transparent"
        style={{
          filter: config.effects.includes('glow') ? 'drop-shadow(0 0 10px var(--world-primary))' : 'none',
        }}
      />
      
      {/* Frequency data debug display (optional) */}
      {process.env.NODE_ENV === 'development' && frequencyData.length > 0 && (
        <div className="text-xs text-foreground-tertiary mt-2">
          Avg Frequency: {(frequencyData.reduce((a, b) => a + b, 0) / frequencyData.length).toFixed(0)}
        </div>
      )}
    </motion.div>
  );
};

export default AdvancedAudioVisualizer;