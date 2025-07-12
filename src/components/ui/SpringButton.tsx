/**
 * Spring Physics Button - Apple-level micro-interactions
 * Revolutionary tactile feedback with cinematic animations
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, useSpring, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { useHapticFeedback } from '../../utils/haptics';
import { useProgressiveEnhancement } from '../../utils/progressive-enhancement';

interface SpringButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'cinematic' | 'world';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  world?: 'disco' | 'nostalgia' | 'rolemodel' | 'elevation';
  hapticIntensity?: 'light' | 'medium' | 'heavy';
  glowEffect?: boolean;
  particleTrail?: boolean;
  soundEffect?: boolean;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  onHover?: () => void;
  className?: string;
}

export default function SpringButton({
  children,
  variant = 'primary',
  size = 'md',
  world,
  hapticIntensity = 'medium',
  glowEffect = false,
  particleTrail = false,
  soundEffect = false,
  disabled = false,
  loading = false,
  onClick,
  onHover,
  className = '',
}: SpringButtonProps) {
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);
  
  const buttonRef = useRef<HTMLButtonElement>(null);
  const haptics = useHapticFeedback();
  const { features } = useProgressiveEnhancement();

  // Spring physics values
  const scale = useSpring(1, { stiffness: 400, damping: 17 });
  const rotateX = useSpring(0, { stiffness: 400, damping: 17 });
  const rotateY = useSpring(0, { stiffness: 400, damping: 17 });
  const glowOpacity = useSpring(0, { stiffness: 300, damping: 20 });
  
  // Mouse position tracking for 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateXTransform = useTransform(mouseY, [-100, 100], [10, -10]);
  const rotateYTransform = useTransform(mouseX, [-100, 100], [-10, 10]);

  // Size variants
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl',
  };

  // Variant styles
  const variantClasses = {
    primary: 'bg-brand-primary text-background font-semibold',
    secondary: 'bg-glass-medium text-foreground border border-glass-border',
    cinematic: 'bg-gradient-to-r from-world-primary to-world-secondary text-background',
    world: `bg-world-glass text-world-primary border border-world-primary/30`,
  };

  // World-specific effects
  const worldClasses = world ? `world-${world}` : '';

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!buttonRef.current) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = event.clientX - centerX;
    const deltaY = event.clientY - centerY;
    
    mouseX.set(deltaX);
    mouseY.set(deltaY);
    
    // Sync spring values with mouse position
    rotateX.set(deltaY * 0.1);
    rotateY.set(deltaX * 0.1);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    scale.set(1.05);
    glowOpacity.set(1);
    
    // Haptic feedback on hover
    if (world) {
      haptics[world]();
    } else {
      haptics.trigger({ intensity: 'light' });
    }
    
    onHover?.();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
    glowOpacity.set(0);
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleMouseDown = () => {
    setIsPressed(true);
    scale.set(0.95);
    
    // Strong haptic feedback on press
    haptics.trigger({ intensity: hapticIntensity });
    
    // Create particle effect if enabled
    if (particleTrail && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const newParticles = Array.from({ length: 8 }, (_, i) => ({
        id: Date.now() + i,
        x: rect.width / 2 + (Math.random() - 0.5) * 40,
        y: rect.height / 2 + (Math.random() - 0.5) * 40,
      }));
      setParticles(prev => [...prev, ...newParticles]);
      
      // Clear particles after animation
      setTimeout(() => {
        setParticles(prev => prev.filter(p => !newParticles.includes(p)));
      }, 1000);
    }
    
    // Play sound effect if enabled
    if (soundEffect && features.audioWorklet) {
      playButtonSound();
    }
  };

  const handleMouseUp = () => {
    setIsPressed(false);
    scale.set(isHovered ? 1.05 : 1);
  };

  const handleClick = () => {
    if (disabled || loading) return;
    
    // Success haptic feedback
    haptics.success();
    onClick?.();
  };

  const playButtonSound = () => {
    // Create a brief, pleasant button sound
    if ('AudioContext' in window) {
      const audioContext = new AudioContext();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
      
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
      
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.1);
    }
  };

  return (
    <div className={`relative inline-block ${worldClasses}`}>
      <motion.button
        ref={buttonRef}
        className={`
          relative overflow-hidden rounded-xl transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-world-primary/50 focus:ring-offset-2
          disabled:opacity-50 disabled:cursor-not-allowed
          ${sizeClasses[size]}
          ${variantClasses[variant]}
          ${glowEffect ? 'cinematic-glow' : ''}
          ${className}
        `}
        style={{
          scale,
          rotateX: features.backdropFilter ? rotateXTransform : 0,
          rotateY: features.backdropFilter ? rotateYTransform : 0,
          transformStyle: 'preserve-3d',
          perspective: '1000px',
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onClick={handleClick}
        disabled={disabled || loading}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      >
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-xl bg-world-primary/20 blur-lg"
          style={{ opacity: glowOpacity }}
          initial={{ opacity: 0 }}
        />
        
        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: '-100%', skew: '-12deg' }}
          animate={{
            x: isHovered ? '100%' : '-100%',
            transition: { duration: 0.6, ease: 'easeInOut' }
          }}
        />
        
        {/* Content */}
        <div className="relative z-10 flex items-center justify-center gap-2">
          {loading && (
            <motion.div
              className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
          )}
          {children}
        </div>
        
        {/* Particle trail */}
        <AnimatePresence>
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute w-1 h-1 bg-world-primary rounded-full pointer-events-none"
              style={{
                left: particle.x,
                top: particle.y,
              }}
              initial={{ scale: 0, opacity: 1 }}
              animate={{
                scale: [0, 1, 0],
                opacity: [1, 1, 0],
                x: [0, (Math.random() - 0.5) * 100],
                y: [0, (Math.random() - 0.5) * 100],
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          ))}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}