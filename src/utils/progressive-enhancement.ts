/**
 * Progressive Enhancement System
 * Bleeding-edge web API detection and graceful fallbacks
 * Ensures Apple-level polish works everywhere while providing enhanced experiences for capable browsers
 */

interface FeatureSupport {
  viewTransitions: boolean;
  containerQueries: boolean;
  backdropFilter: boolean;
  displayP3: boolean;
  webGL: boolean;
  webAssembly: boolean;
  sharedArrayBuffer: boolean;
  webXR: boolean;
  audioWorklet: boolean;
  offscreenCanvas: boolean;
  intersectionObserverV2: boolean;
  cssScrollTimeline: boolean;
  webCodecs: boolean;
  webGPU: boolean;
}

class ProgressiveEnhancement {
  public features: FeatureSupport;
  private performanceLevel: 'low' | 'medium' | 'high' = 'medium';

  constructor() {
    this.features = this.detectFeatures();
    this.performanceLevel = this.assessPerformance();
    this.applyFeatureClasses();
    this.configureBasedOnCapabilities();
  }

  /**
   * Detect bleeding-edge web API support
   */
  private detectFeatures(): FeatureSupport {
    return {
      // View Transitions API
      viewTransitions: 'startViewTransition' in document,

      // Container Queries
      containerQueries: CSS.supports('container-type: inline-size'),

      // Backdrop Filter
      backdropFilter: CSS.supports('backdrop-filter: blur(10px)') || 
                     CSS.supports('-webkit-backdrop-filter: blur(10px)'),

      // P3 Wide Color Gamut
      displayP3: CSS.supports('color: color(display-p3 1 0 0)'),

      // WebGL
      webGL: (() => {
        try {
          const canvas = document.createElement('canvas');
          return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
        } catch {
          return false;
        }
      })(),

      // WebAssembly
      webAssembly: 'WebAssembly' in window,

      // Shared Array Buffer
      sharedArrayBuffer: 'SharedArrayBuffer' in window,

      // WebXR
      webXR: 'xr' in navigator,

      // Audio Worklet
      audioWorklet: 'AudioWorkletNode' in window,

      // Offscreen Canvas
      offscreenCanvas: 'OffscreenCanvas' in window,

      // Intersection Observer V2
      intersectionObserverV2: 'IntersectionObserver' in window && 
                             'isIntersecting' in IntersectionObserverEntry.prototype,

      // CSS Scroll Timeline
      cssScrollTimeline: CSS.supports('animation-timeline: scroll()'),

      // Web Codecs
      webCodecs: 'VideoEncoder' in window,

      // WebGPU
      webGPU: 'gpu' in navigator,
    };
  }

  /**
   * Assess device performance capabilities
   */
  private assessPerformance(): 'low' | 'medium' | 'high' {
    // Basic performance assessment
    const memory = (navigator as any).deviceMemory || 4;
    const cores = navigator.hardwareConcurrency || 4;
    const connection = (navigator as any).connection?.effectiveType || '4g';

    let score = 0;

    // Memory assessment
    if (memory >= 8) score += 3;
    else if (memory >= 4) score += 2;
    else score += 1;

    // CPU cores assessment
    if (cores >= 8) score += 3;
    else if (cores >= 4) score += 2;
    else score += 1;

    // Connection assessment
    if (connection === '4g') score += 2;
    else if (connection === '3g') score += 1;

    if (score >= 7) return 'high';
    if (score >= 4) return 'medium';
    return 'low';
  }

  /**
   * Apply feature detection classes to document
   */
  private applyFeatureClasses(): void {
    const classList = document.documentElement.classList;

    Object.entries(this.features).forEach(([feature, supported]) => {
      if (supported) {
        classList.add(`supports-${feature.replace(/([A-Z])/g, '-$1').toLowerCase()}`);
      } else {
        classList.add(`no-${feature.replace(/([A-Z])/g, '-$1').toLowerCase()}`);
      }
    });

    classList.add(`performance-${this.performanceLevel}`);
  }

  /**
   * Configure experiences based on capabilities
   */
  private configureBasedOnCapabilities(): void {
    // Adjust animation complexity based on performance
    const root = document.documentElement;

    if (this.performanceLevel === 'low') {
      root.style.setProperty('--animation-complexity', '0.5');
      root.style.setProperty('--particle-count', '50');
      root.style.setProperty('--shadow-quality', '1');
    } else if (this.performanceLevel === 'medium') {
      root.style.setProperty('--animation-complexity', '1');
      root.style.setProperty('--particle-count', '200');
      root.style.setProperty('--shadow-quality', '2');
    } else {
      root.style.setProperty('--animation-complexity', '1.5');
      root.style.setProperty('--particle-count', '500');
      root.style.setProperty('--shadow-quality', '3');
    }

    // Configure 3D quality
    if (this.features.webGL && this.performanceLevel === 'high') {
      root.style.setProperty('--webgl-quality', 'high');
    } else if (this.features.webGL) {
      root.style.setProperty('--webgl-quality', 'medium');
    } else {
      root.style.setProperty('--webgl-quality', 'disabled');
    }
  }

  /**
   * Get optimal configuration for world experiences
   */
  public getWorldConfig(world: 'disco' | 'nostalgia' | 'rolemodel' | 'elevation') {
    const baseConfig = {
      animations: this.performanceLevel !== 'low',
      particles: this.performanceLevel === 'high',
      webGL: this.features.webGL && this.performanceLevel !== 'low',
      audioWorklet: this.features.audioWorklet,
      haptics: 'vibrate' in navigator,
    };

    // World-specific overrides
    switch (world) {
      case 'disco':
        return {
          ...baseConfig,
          glitchEffects: this.performanceLevel !== 'low',
          terminalInterface: true,
          particleSystem: this.performanceLevel === 'high',
        };

      case 'nostalgia':
        return {
          ...baseConfig,
          emotionalParticles: this.performanceLevel !== 'low',
          tearDropAnimation: this.performanceLevel === 'high',
          memoryFragments: this.features.webGL,
        };

      case 'rolemodel':
        return {
          ...baseConfig,
          chaosEngine: this.performanceLevel === 'high',
          audioManipulation: this.features.webAssembly,
          particleExplosion: this.features.webGL,
        };

      case 'elevation':
        return {
          ...baseConfig,
          antiGravity: this.performanceLevel !== 'low',
          physicsEngine: this.features.webAssembly,
          genreVisualizer: this.features.webGL,
        };
    }
  }

  /**
   * Dynamically load polyfills for missing features
   */
  public async loadPolyfills(): Promise<void> {
    const polyfills: Promise<any>[] = [];

    // View Transitions polyfill
    if (!this.features.viewTransitions) {
      polyfills.push(
        import('view-transitions-polyfill').catch(() => null)
      );
    }

    // Container Queries polyfill
    if (!this.features.containerQueries) {
      polyfills.push(
        import('container-query-polyfill').catch(() => null)
      );
    }

    // Wait for all polyfills to load
    await Promise.allSettled(polyfills);
  }

  /**
   * Monitor performance and adjust quality dynamically
   */
  public startPerformanceMonitoring(): void {
    let frameCount = 0;
    let lastTime = performance.now();

    const checkPerformance = () => {
      frameCount++;
      const currentTime = performance.now();

      if (currentTime - lastTime >= 1000) {
        const fps = frameCount;
        frameCount = 0;
        lastTime = currentTime;

        // Adjust quality based on FPS
        if (fps < 30 && this.performanceLevel !== 'low') {
          this.degradeQuality();
        } else if (fps > 55 && this.performanceLevel !== 'high') {
          this.enhanceQuality();
        }
      }

      requestAnimationFrame(checkPerformance);
    };

    requestAnimationFrame(checkPerformance);
  }

  private degradeQuality(): void {
    const root = document.documentElement;
    const currentParticles = parseInt(root.style.getPropertyValue('--particle-count') || '200');
    root.style.setProperty('--particle-count', (currentParticles * 0.7).toString());
  }

  private enhanceQuality(): void {
    const root = document.documentElement;
    const currentParticles = parseInt(root.style.getPropertyValue('--particle-count') || '200');
    root.style.setProperty('--particle-count', Math.min(500, currentParticles * 1.2).toString());
  }
}

// Global progressive enhancement instance
export const progressiveEnhancement = new ProgressiveEnhancement();

// React hook for progressive enhancement
export function useProgressiveEnhancement() {
  return {
    features: progressiveEnhancement.features,
    getWorldConfig: progressiveEnhancement.getWorldConfig.bind(progressiveEnhancement),
    loadPolyfills: progressiveEnhancement.loadPolyfills.bind(progressiveEnhancement),
  };
}

// Utility functions for feature detection
export const supports = {
  viewTransitions: () => progressiveEnhancement.features.viewTransitions,
  webGL: () => progressiveEnhancement.features.webGL,
  webAssembly: () => progressiveEnhancement.features.webAssembly,
  displayP3: () => progressiveEnhancement.features.displayP3,
  backdropFilter: () => progressiveEnhancement.features.backdropFilter,
  webXR: () => progressiveEnhancement.features.webXR,
};

// Initialize progressive enhancement
if (typeof window !== 'undefined') {
  // Load polyfills asynchronously
  progressiveEnhancement.loadPolyfills();
  
  // Start performance monitoring in production
  if (process.env.NODE_ENV === 'production') {
    progressiveEnhancement.startPerformanceMonitoring();
  }
}