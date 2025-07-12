import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, AlertTriangle, Zap, TrendingUp, Play, Volume2 } from 'lucide-react';
import { Badge, EmotionalBadge, ChaoticBadge, ClassifiedBadge, AscendingBadge } from './badge';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  variant?: 'default' | 'emotional' | 'classified' | 'chaotic' | 'ascending';
  showCloseButton?: boolean;
  backdropBlur?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

interface EmotionalPromptProps {
  onContinue: (emotionalState: string) => void;
  onSkip?: () => void;
}

interface MoodSelectorProps {
  onMoodSelect: (mood: string) => void;
  moods: Array<{ id: string; label: string; emoji: string; description?: string }>;
  selectedMood?: string;
}

interface ChaosMetricsProps {
  metrics: Array<{ label: string; value: string | number; unit?: string; chaotic?: boolean }>;
}

interface AudioPromptProps {
  onPlay: () => void;
  warning?: string;
  trackTitle?: string;
  artist?: string;
}

const modalVariants = {
  default: 'border-foreground/20 bg-background/80',
  emotional: 'border-nostalgia-primary/30 bg-nostalgia-primary/5 backdrop-blur-xl',
  classified: 'border-disco-danger/30 bg-disco-danger/5 backdrop-blur-xl',
  chaotic: 'border-rolemodel-chaos/30 bg-rolemodel-chaos/5 backdrop-blur-xl',
  ascending: 'border-elevation-primary/30 bg-elevation-primary/5 backdrop-blur-xl',
};

const sizeVariants = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
};

// Base Interactive Modal Component
export function InteractiveModal({
  isOpen,
  onClose,
  children,
  title,
  variant = 'default',
  showCloseButton = true,
  backdropBlur = true,
  size = 'md',
}: ModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className={`absolute inset-0 bg-black/50 ${backdropBlur ? 'backdrop-blur-sm' : ''}`}
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={`relative w-full ${sizeVariants[size]} mx-auto rounded-xl border ${modalVariants[variant]} p-6 shadow-2xl`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            {(title || showCloseButton) && (
              <div className="flex items-center justify-between mb-6">
                {title && (
                  <h2 className="text-title2 font-bold text-foreground">
                    {title}
                  </h2>
                )}
                {showCloseButton && (
                  <button
                    onClick={onClose}
                    className="text-foreground-secondary hover:text-foreground transition-colors p-1 rounded-md hover:bg-foreground/10"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            )}

            {/* Content */}
            <div className="space-y-4">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// Emotional Priming Modal for Nostalgia Trap
export function EmotionalPromptModal({ onContinue, onSkip }: EmotionalPromptProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [emotionalState, setEmotionalState] = useState('');

  const steps = [
    {
      title: "Before You Enter...",
      content: (
        <div className="space-y-4">
          <p className="text-body-large text-foreground-secondary">
            This isn't just a DJ mix. It's an emotional journey through heartbreak, longing, and eventual acceptance.
          </p>
          <div className="bg-nostalgia-primary/10 border border-nostalgia-primary/30 rounded-lg p-4">
            <p className="text-body text-nostalgia-primary/90">
              Think of someone who left you wrecked. Someone whose absence feels like a physical ache. 
              Hold that thought. Feel it in your chest.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Set Your Emotional Context",
      content: (
        <div className="space-y-4">
          <p className="text-body text-foreground-secondary">
            How are you feeling right now? This will help tailor your experience.
          </p>
          <div className="grid grid-cols-1 gap-3">
            {[
              { id: 'missing', label: 'Missing Them 💔', description: 'That ache of absence' },
              { id: 'dancing', label: 'Dancing It Off 💃', description: 'Moving through the pain' },
              { id: 'over-it', label: 'Over It ✨', description: 'Ready to let go' },
              { id: 'confused', label: 'Confused AF 🌀', description: 'Not sure what you feel' },
            ].map((mood) => (
              <button
                key={mood.id}
                onClick={() => setEmotionalState(mood.id)}
                className={`text-left p-4 rounded-lg border transition-all duration-200 ${
                  emotionalState === mood.id
                    ? 'border-nostalgia-primary bg-nostalgia-primary/10 emotion-glow'
                    : 'border-foreground/20 hover:border-nostalgia-primary/50 hover:bg-nostalgia-primary/5'
                }`}
              >
                <div className="font-medium text-foreground">{mood.label}</div>
                <div className="text-sm text-foreground-secondary">{mood.description}</div>
              </button>
            ))}
          </div>
        </div>
      ),
    },
  ];

  const handleContinue = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onContinue(emotionalState);
      setIsOpen(false);
    }
  };

  return (
    <InteractiveModal
      isOpen={isOpen}
      onClose={() => {
        onSkip?.();
        setIsOpen(false);
      }}
      variant="emotional"
      size="lg"
      title={steps[currentStep].title}
    >
      <div className="mb-6">
        <EmotionalBadge size="sm">EMOTIONAL CONTENT WARNING</EmotionalBadge>
      </div>

      {steps[currentStep].content}

      <div className="flex justify-between items-center pt-6">
        <div className="flex space-x-2">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index <= currentStep ? 'bg-nostalgia-primary' : 'bg-foreground/20'
              }`}
            />
          ))}
        </div>

        <div className="flex gap-3">
          {onSkip && (
            <button
              onClick={() => {
                onSkip();
                setIsOpen(false);
              }}
              className="px-4 py-2 text-foreground-secondary hover:text-foreground transition-colors"
            >
              Skip
            </button>
          )}
          <button
            onClick={handleContinue}
            disabled={currentStep === steps.length - 1 && !emotionalState}
            className="px-6 py-2 bg-nostalgia-primary text-white rounded-lg hover:bg-nostalgia-primary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed emotion-pulse"
          >
            {currentStep === steps.length - 1 ? 'Enter the Journey' : 'Continue'}
          </button>
        </div>
      </div>
    </InteractiveModal>
  );
}

// Mood Selector Component
export function MoodSelector({ onMoodSelect, moods, selectedMood }: MoodSelectorProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-title3 font-semibold text-foreground">How are you feeling?</h3>
      <div className="grid grid-cols-2 gap-3">
        {moods.map((mood) => (
          <motion.button
            key={mood.id}
            onClick={() => onMoodSelect(mood.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`p-4 rounded-lg border text-left transition-all duration-200 ${
              selectedMood === mood.id
                ? 'border-nostalgia-primary bg-nostalgia-primary/10 emotion-glow'
                : 'border-foreground/20 hover:border-nostalgia-primary/50'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{mood.emoji}</span>
              <div>
                <div className="font-medium text-foreground">{mood.label}</div>
                {mood.description && (
                  <div className="text-sm text-foreground-secondary">{mood.description}</div>
                )}
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

// Chaos Metrics Dashboard for Role Model
export function ChaosMetricsDashboard({ metrics }: ChaosMetricsProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <ChaoticBadge size="lg">CHAOS METRICS</ChaoticBadge>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-4 rounded-lg border border-rolemodel-chaos/30 bg-rolemodel-chaos/5 ${
              metric.chaotic ? 'chaos-flicker chaos-shake' : ''
            }`}
          >
            <div className="text-sm font-medium text-foreground-secondary">{metric.label}</div>
            <div className="text-2xl font-bold text-rolemodel-chaos flex items-baseline gap-1">
              {metric.value}
              {metric.unit && <span className="text-sm">{metric.unit}</span>}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Audio Prompt for immersive listening
export function AudioPromptModal({ onPlay, warning, trackTitle, artist }: AudioPromptProps) {
  const [isOpen, setIsOpen] = useState(true);

  const handlePlay = () => {
    onPlay();
    setIsOpen(false);
  };

  return (
    <InteractiveModal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      variant="classified"
      size="md"
      title="Audio Experience Ready"
    >
      <div className="space-y-4">
        <div className="text-center">
          <Volume2 className="w-16 h-16 text-disco-primary mx-auto mb-4" />
          {trackTitle && (
            <div className="mb-2">
              <h3 className="text-title3 font-bold text-foreground">{trackTitle}</h3>
              {artist && <p className="text-foreground-secondary">by {artist}</p>}
            </div>
          )}
        </div>

        {warning && (
          <div className="bg-disco-danger/10 border border-disco-danger/30 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-disco-danger flex-shrink-0 mt-0.5" />
              <p className="text-body text-disco-danger/90">{warning}</p>
            </div>
          </div>
        )}

        <div className="text-center pt-4">
          <button
            onClick={handlePlay}
            className="inline-flex items-center gap-2 px-8 py-3 bg-disco-primary text-black rounded-lg hover:bg-disco-primary/80 transition-colors font-semibold"
          >
            <Play className="w-5 h-5" />
            Begin Experience
          </button>
        </div>
      </div>
    </InteractiveModal>
  );
}

export default InteractiveModal;