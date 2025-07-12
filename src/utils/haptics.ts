/**
 * Revolutionary Haptic Feedback System
 * Apple-level tactile interactions for immersive storytelling
 */

interface HapticFeedbackOptions {
  intensity?: 'light' | 'medium' | 'heavy';
  duration?: number;
  pattern?: number[];
}

class HapticEngine {
  private isSupported: boolean = false;
  private vibrationPattern: { [key: string]: number[] } = {
    light: [50],
    medium: [100],
    heavy: [200],
    heartbeat: [100, 50, 100, 50, 200, 100],
    glitch: [25, 25, 25, 25, 25, 100],
    chaos: [50, 25, 100, 25, 150, 25, 200],
    elevation: [25, 50, 75, 100, 125],
  };

  constructor() {
    this.checkSupport();
  }

  private checkSupport(): void {
    this.isSupported = 'vibrate' in navigator;
  }

  /**
   * Trigger haptic feedback with specified intensity
   */
  public trigger(options: HapticFeedbackOptions = {}): void {
    if (!this.isSupported) return;

    const { intensity = 'light', duration, pattern } = options;

    if (pattern) {
      navigator.vibrate(pattern);
    } else if (duration) {
      navigator.vibrate(duration);
    } else {
      navigator.vibrate(this.vibrationPattern[intensity]);
    }
  }

  /**
   * World-specific haptic patterns
   */
  public disco(): void {
    this.trigger({ pattern: this.vibrationPattern.glitch });
  }

  public nostalgia(): void {
    this.trigger({ pattern: this.vibrationPattern.heartbeat });
  }

  public rolemodel(): void {
    this.trigger({ pattern: this.vibrationPattern.chaos });
  }

  public elevation(): void {
    this.trigger({ pattern: this.vibrationPattern.elevation });
  }

  /**
   * Interaction-specific feedback
   */
  public buttonPress(): void {
    this.trigger({ intensity: 'light' });
  }

  public modalOpen(): void {
    this.trigger({ intensity: 'medium' });
  }

  public errorAlert(): void {
    this.trigger({ pattern: [100, 50, 100] });
  }

  public success(): void {
    this.trigger({ pattern: [25, 25, 50] });
  }

  /**
   * Disable all haptic feedback
   */
  public disable(): void {
    this.isSupported = false;
  }

  /**
   * Enable haptic feedback if supported
   */
  public enable(): void {
    this.checkSupport();
  }
}

// Global haptic engine instance
export const haptics = new HapticEngine();

// React hook for haptic feedback
export function useHapticFeedback() {
  return {
    trigger: haptics.trigger.bind(haptics),
    disco: haptics.disco.bind(haptics),
    nostalgia: haptics.nostalgia.bind(haptics),
    rolemodel: haptics.rolemodel.bind(haptics),
    elevation: haptics.elevation.bind(haptics),
    buttonPress: haptics.buttonPress.bind(haptics),
    modalOpen: haptics.modalOpen.bind(haptics),
    errorAlert: haptics.errorAlert.bind(haptics),
    success: haptics.success.bind(haptics),
  };
}

// CSS class integration for automatic haptic feedback
export function addHapticListeners(): void {
  if (typeof document === 'undefined') return;

  // Auto-trigger haptics on interactive elements
  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    
    if (target.classList.contains('haptic-light')) {
      haptics.trigger({ intensity: 'light' });
    } else if (target.classList.contains('haptic-medium')) {
      haptics.trigger({ intensity: 'medium' });
    } else if (target.classList.contains('haptic-heavy')) {
      haptics.trigger({ intensity: 'heavy' });
    }
  });

  // World-specific haptic triggers
  document.addEventListener('mouseenter', (event) => {
    const target = event.target as HTMLElement;
    
    if (target.closest('.world-disco')) {
      haptics.disco();
    } else if (target.closest('.world-nostalgia')) {
      haptics.nostalgia();
    } else if (target.closest('.world-rolemodel')) {
      haptics.rolemodel();
    } else if (target.closest('.world-elevation')) {
      haptics.elevation();
    }
  });
}

// Initialize haptic system
if (typeof window !== 'undefined') {
  // Auto-initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addHapticListeners);
  } else {
    addHapticListeners();
  }
}