/**
 * World Entry Button Component
 * Elegant entry point from 2D story pages to 3D immersive experiences
 * Apple-level polish with contextual theming
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Film, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from './button';
import { Badge } from './badge';
import { haptics } from '../../utils/haptics';
import { spatialAudio } from '../../utils/spatial-audio';

interface WorldEntryButtonProps {
  world: 'disco' | 'nostalgia' | 'rolemodel' | 'elevation';
  onClick: () => void;
  variant?: 'default' | 'minimal' | 'hero' | 'floating';
  showPreview?: boolean;
  className?: string;
  disabled?: boolean;
}

const worldConfigs = {
  disco: {
    colors: {
      primary: 'text-amber-400',
      secondary: 'text-red-400', 
      border: 'border-amber-500/30',
      bg: 'bg-gradient-to-r from-amber-500/20 to-red-500/20',
      hover: 'hover:from-amber-500/30 hover:to-red-500/30'
    },
    icon: Eye,
    label: 'Enter Facility',
    subtitle: 'Classified Experience',
    description: 'Step into the conspiracy',
    experience: 'Government thriller with glitch effects'
  },
  nostalgia: {
    colors: {
      primary: 'text-purple-400',
      secondary: 'text-pink-400',
      border: 'border-purple-500/30', 
      bg: 'bg-gradient-to-r from-purple-500/20 to-pink-500/20',
      hover: 'hover:from-purple-500/30 hover:to-pink-500/30'
    },
    icon: Film,
    label: 'Enter Journey',
    subtitle: 'Emotional Experience',
    description: 'Feel the vulnerability',
    experience: 'Intimate emotional cinema with particle physics'
  },
  rolemodel: {
    colors: {
      primary: 'text-yellow-400',
      secondary: 'text-red-400',
      border: 'border-yellow-500/30',
      bg: 'bg-gradient-to-r from-yellow-500/20 to-red-500/20', 
      hover: 'hover:from-yellow-500/30 hover:to-red-500/30'
    },
    icon: Sparkles,
    label: 'Enter Chaos',
    subtitle: 'Unhinged Experience',
    description: 'Witness the madness',
    experience: 'Industrial chaos with 300+ track metrics'
  },
  elevation: {
    colors: {
      primary: 'text-blue-400',
      secondary: 'text-amber-400',
      border: 'border-blue-500/30',
      bg: 'bg-gradient-to-r from-blue-500/20 to-amber-500/20',
      hover: 'hover:from-blue-500/30 hover:to-amber-500/30'
    },
    icon: ArrowRight,
    label: 'Enter Ascension',
    subtitle: 'Transcendent Experience', 
    description: 'Rise above genres',
    experience: 'Anti-gravity genre progression system'
  }
};

export default function WorldEntryButton({
  world,
  onClick,
  variant = 'default',
  showPreview = false,
  className = '',
  disabled = false
}: WorldEntryButtonProps) {
  const config = worldConfigs[world];
  const IconComponent = config.icon;

  const handleClick = () => {
    if (disabled) return;

    // Trigger haptic feedback
    haptics.trigger({ intensity: 'medium' });

    // Play spatial audio for world entry
    spatialAudio.ui.buttonClick();
    
    // Call the actual click handler
    onClick();
  };

  const baseMotionProps = {
    whileHover: disabled ? {} : { scale: 1.02, y: -2 },
    whileTap: disabled ? {} : { scale: 0.98 },
    transition: { duration: 0.2, ease: 'easeOut' }
  };

  // Variant: Hero (large, prominent)
  if (variant === 'hero') {
    return (
      <motion.div
        {...baseMotionProps}
        className={`group ${className}`}
      >
        <Button
          onClick={handleClick}
          disabled={disabled}
          className={`
            relative overflow-hidden h-auto p-8 
            ${config.colors.bg} ${config.colors.hover}
            border ${config.colors.border}
            backdrop-blur-sm transition-all duration-300
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          `}
          variant="outline"
        >
          <div className="flex items-center gap-6">
            <div className={`
              w-16 h-16 rounded-2xl bg-black/20 backdrop-blur-sm 
              flex items-center justify-center
              group-hover:bg-black/30 transition-colors
            `}>
              <IconComponent className={`w-8 h-8 ${config.colors.primary}`} />
            </div>
            
            <div className="text-left">
              <h3 className={`text-2xl font-bold ${config.colors.primary} mb-2`}>
                {config.label}
              </h3>
              <p className={`text-lg ${config.colors.secondary} mb-3`}>
                {config.subtitle}
              </p>
              <p className="text-foreground-secondary text-base">
                {config.description}
              </p>
              
              {showPreview && (
                <Badge 
                  variant="outline" 
                  className={`mt-3 ${config.colors.border} ${config.colors.primary} bg-black/20`}
                >
                  <Film className="w-3 h-3 mr-1" />
                  A24 Cinematic
                </Badge>
              )}
            </div>

            <ArrowRight className={`w-6 h-6 ${config.colors.primary} group-hover:translate-x-1 transition-transform`} />
          </div>

          {/* Animated background effect */}
          <motion.div
            className={`absolute inset-0 ${config.colors.bg} opacity-0 group-hover:opacity-100`}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        </Button>
      </motion.div>
    );
  }

  // Variant: Minimal (small, text-like)
  if (variant === 'minimal') {
    return (
      <motion.div {...baseMotionProps} className={className}>
        <Button
          onClick={handleClick}
          disabled={disabled}
          variant="ghost"
          size="sm"
          className={`
            gap-2 ${config.colors.primary} hover:${config.colors.bg}
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          <IconComponent className="w-4 h-4" />
          {config.label}
          <ArrowRight className="w-3 h-3" />
        </Button>
      </motion.div>
    );
  }

  // Variant: Floating (fixed position overlay)
  if (variant === 'floating') {
    return (
      <motion.div
        {...baseMotionProps}
        className={`fixed bottom-6 right-6 z-40 ${className}`}
      >
        <Button
          onClick={handleClick}
          disabled={disabled}
          className={`
            rounded-full w-16 h-16 p-0 shadow-2xl
            ${config.colors.bg} ${config.colors.hover}
            border ${config.colors.border}
            backdrop-blur-md transition-all duration-300
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
          variant="outline"
        >
          <IconComponent className={`w-6 h-6 ${config.colors.primary}`} />
        </Button>

        {/* Floating tooltip */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileHover={{ opacity: 1, x: 0 }}
          className={`
            absolute right-full mr-4 top-1/2 -translate-y-1/2
            bg-background/95 backdrop-blur-sm border border-foreground/10
            rounded-lg px-3 py-2 text-sm whitespace-nowrap shadow-lg
          `}
        >
          {config.label}
        </motion.div>
      </motion.div>
    );
  }

  // Variant: Default (standard button)
  return (
    <motion.div {...baseMotionProps} className={className}>
      <Button
        onClick={handleClick}
        disabled={disabled}
        className={`
          gap-3 h-auto py-4 px-6
          ${config.colors.bg} ${config.colors.hover}
          border ${config.colors.border}
          backdrop-blur-sm transition-all duration-300
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
        variant="outline"
      >
        <IconComponent className={`w-5 h-5 ${config.colors.primary}`} />
        
        <div className="text-left">
          <div className={`font-semibold ${config.colors.primary}`}>
            {config.label}
          </div>
          <div className={`text-sm ${config.colors.secondary} opacity-80`}>
            {config.subtitle}
          </div>
        </div>

        <ArrowRight className={`w-4 h-4 ${config.colors.primary}`} />

        {showPreview && (
          <Badge 
            variant="outline" 
            className={`ml-2 ${config.colors.border} ${config.colors.primary} bg-black/20`}
          >
            <Film className="w-3 h-3 mr-1" />
            3D
          </Badge>
        )}
      </Button>
    </motion.div>
  );
}