# Performance Optimization & Monitoring

**Document Type:** Architecture Component  
**Last Updated:** 2025-01-19  
**Target Audience:** Development Agents, Performance Team  

## Overview

This document outlines performance optimization strategies and monitoring systems for ZackBissell.com. The platform must deliver 60fps immersive experiences while maintaining Core Web Vitals "Good" ratings across all story worlds and device types.

## Core Web Vitals Targets

### Performance Benchmarks
```yaml
Primary Metrics:
  First Contentful Paint (FCP): < 1.5s
  Largest Contentful Paint (LCP): < 2.5s
  First Input Delay (FID): < 100ms
  Cumulative Layout Shift (CLS): < 0.1
  
Secondary Metrics:
  Time to Interactive (TTI): < 3.5s
  Total Blocking Time (TBT): < 300ms
  Speed Index: < 2.0s
  
Animation Performance:
  Frame Rate: 60fps sustained
  Animation Jank: < 16.67ms per frame
  GPU Memory Usage: < 100MB
```

### Performance Budget
```yaml
Bundle Sizes (Gzipped):
  Main Bundle: < 300KB
  Vendor Bundle: < 200KB
  Story World Chunks: < 150KB each
  Total Initial Load: < 500KB
  
Resource Limits:
  Images: < 500KB per image
  Fonts: < 100KB total
  Third-party Scripts: < 50KB
  CSS: < 50KB
  
Runtime Performance:
  Main Thread Blocking: < 50ms
  Memory Usage: < 50MB baseline
  Network Requests: < 10 per page
```

## Bundle Optimization Strategy

### Code Splitting Configuration
```typescript
// Vite code splitting configuration
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // React ecosystem
          'react-vendor': ['react', 'react-dom'],
          'react-router': ['react-router-dom'],
          
          // Animation libraries
          'framer-motion': ['framer-motion'],
          
          // UI components
          'ui-components': [
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-toast',
            '@radix-ui/react-navigation-menu'
          ],
          
          // Utilities
          'utils': ['clsx', 'tailwind-merge', 'class-variance-authority'],
          
          // Story worlds (separate chunks)
          'story-disco': ['./src/pages/DiscoAscension'],
          'story-nostalgia': ['./src/pages/NostalgiaTrap'],
          'story-rolemodel': ['./src/pages/RoleModel'],
          
          // Audio features
          'audio-features': [
            './src/components/ui/AudioPlayer',
            './src/utils/spatial-audio',
            './src/utils/progressive-enhancement'
          ]
        }
      }
    },
    
    // Minification and compression
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug']
      },
      mangle: {
        safari10: true
      },
      format: {
        safari10: true
      }
    }
  }
});

// Dynamic imports for story worlds
const loadStoryWorld = async (worldId: string) => {
  const worldModules = {
    'disco-ascension': () => import('../pages/DiscoAscension'),
    'nostalgia-trap': () => import('../pages/NostalgiaTrap'),
    'role-model': () => import('../pages/RoleModel'),
    'voyage': () => import('../pages/Voyage'),
    'brooklyn': () => import('../pages/Brooklyn'),
    'elevation': () => import('../pages/Elevation'),
    'return-to-senders': () => import('../pages/ReturnToSenders')
  };
  
  if (worldModules[worldId]) {
    return await worldModules[worldId]();
  }
  
  throw new Error(`Story world not found: ${worldId}`);
};
```

### Tree Shaking Optimization
```typescript
// Selective imports to enable tree shaking
import { motion, AnimatePresence } from 'framer-motion';
// Instead of: import * as FramerMotion from 'framer-motion';

import { 
  Dialog, 
  DialogContent, 
  DialogTrigger 
} from '@radix-ui/react-dialog';
// Instead of: import * as Dialog from '@radix-ui/react-dialog';

// Utility function tree shaking
export { cn } from './class-utils';
export { formatTime } from './time-utils';
export { debounce } from './performance-utils';
// Instead of: export * from './utils';

// Lodash ES imports
import debounce from 'lodash-es/debounce';
import throttle from 'lodash-es/throttle';
// Instead of: import { debounce, throttle } from 'lodash';
```

## Image Optimization System

### Progressive Loading Implementation
```typescript
// Optimized image component with lazy loading
interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  sizes?: string;
  quality?: number;
  placeholder?: 'blur' | 'empty';
}

const OptimizedImage = ({ 
  src, 
  alt, 
  width, 
  height, 
  priority = false,
  sizes = '100vw',
  quality = 85,
  placeholder = 'blur'
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState<string>('');
  const [error, setError] = useState(false);
  
  // Intersection observer for lazy loading
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
    skip: priority
  });
  
  // Generate responsive image sources
  const generateSrcSet = useCallback((baseSrc: string) => {
    const widths = [320, 640, 768, 1024, 1280, 1536, 1920];
    return widths
      .filter(w => w <= width * 2) // Don't generate larger than 2x the display size
      .map(w => `${baseSrc}?w=${w}&q=${quality}&fm=webp ${w}w`)
      .join(', ');
  }, [width, quality]);
  
  // Load image when in view or priority
  useEffect(() => {
    if (priority || inView) {
      const img = new Image();
      
      img.onload = () => {
        setImageSrc(src);
        setIsLoaded(true);
      };
      
      img.onerror = () => {
        setError(true);
      };
      
      img.src = src;
    }
  }, [priority, inView, src]);
  
  if (error) {
    return (
      <div 
        className="flex items-center justify-center bg-muted text-muted-foreground"
        style={{ width, height }}
      >
        Failed to load image
      </div>
    );
  }
  
  return (
    <div 
      ref={ref}
      className="relative overflow-hidden"
      style={{ width, height }}
    >
      {/* Low quality placeholder */}
      {placeholder === 'blur' && !isLoaded && (
        <img
          src={`${src}?w=40&q=10&blur=10`}
          alt=""
          className="absolute inset-0 w-full h-full object-cover scale-110 filter blur-sm"
          style={{
            transition: 'opacity 300ms ease-out',
            opacity: isLoaded ? 0 : 1
          }}
        />
      )}
      
      {/* Main image */}
      {imageSrc && (
        <img
          src={imageSrc}
          srcSet={generateSrcSet(imageSrc)}
          sizes={sizes}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            transition: 'opacity 300ms ease-out',
            opacity: isLoaded ? 1 : 0
          }}
          onLoad={() => setIsLoaded(true)}
        />
      )}
    </div>
  );
};
```

### Image Format Optimization
```typescript
// Image format selection based on browser support
const getOptimalImageFormat = () => {
  // Check for AVIF support
  if (document.createElement('canvas').toDataURL('image/avif').indexOf('data:image/avif') === 0) {
    return 'avif';
  }
  
  // Check for WebP support
  if (document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') === 0) {
    return 'webp';
  }
  
  // Fallback to JPEG
  return 'jpeg';
};

// Dynamic image URL generation
const generateImageUrl = (baseUrl: string, options: ImageOptions) => {
  const { width, height, quality = 85, fit = 'cover' } = options;
  const format = getOptimalImageFormat();
  
  return `${baseUrl}?w=${width}&h=${height}&q=${quality}&fit=${fit}&fm=${format}`;
};
```

## Animation Performance Optimization

### GPU Acceleration Strategies
```css
/* GPU-accelerated animation classes */
.gpu-accelerated {
  will-change: transform, opacity;
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000px;
}

.animate-efficiently {
  /* Use transform and opacity for animations */
  transition: transform 0.3s ease-out, opacity 0.3s ease-out;
}

/* Avoid animating expensive properties */
.avoid-layout-animations {
  /* DON'T animate these properties */
  /* width, height, padding, margin, border-width */
  
  /* DO animate these properties instead */
  /* transform: scale(), opacity, transform: translate() */
}

/* Performance-optimized keyframes */
@keyframes slide-in-optimized {
  from {
    transform: translate3d(0, 100%, 0);
    opacity: 0;
  }
  to {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}

@keyframes fade-in-optimized {
  from {
    opacity: 0;
    transform: translate3d(0, 20px, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}
```

### Framer Motion Optimization
```typescript
// Performance-optimized Framer Motion configuration
const optimizedMotionConfig = {
  // Reduce animation calculations
  layout: false,
  
  // Use transform instead of layout animations
  layoutId: undefined,
  
  // Optimize for 60fps
  transition: {
    type: 'tween',
    ease: 'easeOut',
    duration: 0.3
  }
};

// Optimized animation variants
const performantVariants = {
  hidden: {
    opacity: 0,
    transform: 'translate3d(0, 20px, 0)'
  },
  visible: {
    opacity: 1,
    transform: 'translate3d(0, 0, 0)',
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

// Intersection-based animations
const useScrollAnimation = (threshold = 0.1) => {
  const [ref, inView] = useInView({ 
    threshold, 
    triggerOnce: true,
    rootMargin: '50px 0px'
  });
  
  const { reducedMotion } = useReducedMotion();
  
  return {
    ref,
    animate: inView && !reducedMotion ? 'visible' : 'hidden',
    variants: performantVariants
  };
};

// Debounced scroll handler
const useOptimizedScroll = (callback: (scrollY: number) => void) => {
  const debouncedCallback = useMemo(
    () => debounce(callback, 16), // ~60fps
    [callback]
  );
  
  useEffect(() => {
    const handleScroll = () => {
      debouncedCallback(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      debouncedCallback.cancel();
    };
  }, [debouncedCallback]);
};
```

## Memory Management

### Memory Leak Prevention
```typescript
// Cleanup patterns for components
const useCleanupEffect = (cleanup: () => void, deps: DependencyList) => {
  useEffect(() => {
    return cleanup;
  }, deps);
};

// Event listener cleanup
const useEventListener = <T extends keyof WindowEventMap>(
  eventType: T,
  handler: (event: WindowEventMap[T]) => void,
  options?: AddEventListenerOptions
) => {
  useEffect(() => {
    const eventHandler = (event: WindowEventMap[T]) => handler(event);
    
    window.addEventListener(eventType, eventHandler, options);
    
    return () => {
      window.removeEventListener(eventType, eventHandler);
    };
  }, [eventType, handler, options]);
};

// Animation frame cleanup
const useAnimationFrame = (callback: (time: number) => void) => {
  const requestRef = useRef<number>();
  
  useEffect(() => {
    const animate = (time: number) => {
      callback(time);
      requestRef.current = requestAnimationFrame(animate);
    };
    
    requestRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [callback]);
};

// Intersection observer cleanup
const useIntersectionObserver = (
  elementRef: RefObject<Element>,
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
) => {
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;
    
    const observer = new IntersectionObserver(callback, options);
    observer.observe(element);
    
    return () => {
      observer.unobserve(element);
      observer.disconnect();
    };
  }, [elementRef, callback, options]);
};
```

### Resource Management
```typescript
// Audio resource management
const useAudioResource = (src: string) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    audioRef.current = new Audio(src);
    const audio = audioRef.current;
    
    // Preload metadata only
    audio.preload = 'metadata';
    
    return () => {
      if (audio) {
        audio.pause();
        audio.src = '';
        audio.load();
      }
    };
  }, [src]);
  
  const play = useCallback(() => {
    return audioRef.current?.play();
  }, []);
  
  const pause = useCallback(() => {
    audioRef.current?.pause();
  }, []);
  
  return { play, pause, audioRef };
};

// Image resource preloading
const useImagePreloader = (imageSources: string[]) => {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  
  useEffect(() => {
    const preloadImages = imageSources.map(src => {
      return new Promise<string>((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(src);
        img.onerror = reject;
        img.src = src;
      });
    });
    
    Promise.allSettled(preloadImages).then(results => {
      const loaded = new Set(
        results
          .filter(result => result.status === 'fulfilled')
          .map(result => (result as PromiseFulfilledResult<string>).value)
      );
      setLoadedImages(loaded);
    });
  }, [imageSources]);
  
  return loadedImages;
};
```

## Performance Monitoring

### Real User Monitoring (RUM)
```typescript
// Core Web Vitals tracking
const initializeWebVitals = () => {
  import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
    const sendToAnalytics = (metric: any) => {
      // Send to your analytics service
      gtag('event', metric.name, {
        event_category: 'Web Vitals',
        event_label: metric.id,
        value: Math.round(metric.value),
        non_interaction: true,
        custom_map: {
          metric_rating: metric.rating
        }
      });
    };
    
    getCLS(sendToAnalytics);
    getFID(sendToAnalytics);
    getFCP(sendToAnalytics);
    getLCP(sendToAnalytics);
    getTTFB(sendToAnalytics);
  });
};

// Performance observer for custom metrics
const observePerformance = () => {
  if ('PerformanceObserver' in window) {
    // Long tasks monitoring
    const longTaskObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.duration > 50) {
          console.warn('Long task detected:', entry);
          // Send to monitoring service
        }
      }
    });
    
    longTaskObserver.observe({ entryTypes: ['longtask'] });
    
    // Layout shift monitoring
    const layoutShiftObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) {
          console.warn('Layout shift:', entry);
          // Send to monitoring service
        }
      }
    });
    
    layoutShiftObserver.observe({ entryTypes: ['layout-shift'] });
  }
};

// Custom performance marks
const markPerformance = (name: string) => {
  if ('performance' in window && 'mark' in performance) {
    performance.mark(name);
  }
};

const measurePerformance = (name: string, startMark: string, endMark?: string) => {
  if ('performance' in window && 'measure' in performance) {
    try {
      performance.measure(name, startMark, endMark);
      const measure = performance.getEntriesByName(name, 'measure')[0];
      
      // Send measurement to analytics
      gtag('event', 'performance_measure', {
        event_category: 'Performance',
        event_label: name,
        value: Math.round(measure.duration),
        non_interaction: true
      });
    } catch (error) {
      console.warn('Performance measurement failed:', error);
    }
  }
};
```

### Performance Budget Monitoring
```typescript
// Bundle size monitoring
const monitorBundleSize = () => {
  if ('navigation' in performance) {
    const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    
    const bundleSize = nav.transferSize;
    const budget = 500 * 1024; // 500KB budget
    
    if (bundleSize > budget) {
      console.warn(`Bundle size (${bundleSize / 1024}KB) exceeds budget (${budget / 1024}KB)`);
      
      // Alert monitoring service
      sendAlert({
        type: 'performance_budget_exceeded',
        metric: 'bundle_size',
        value: bundleSize,
        budget: budget,
        page: window.location.pathname
      });
    }
  }
};

// Runtime performance monitoring
const monitorRuntimePerformance = () => {
  const startTime = performance.now();
  let frameCount = 0;
  let lastTime = startTime;
  
  const measureFPS = () => {
    const currentTime = performance.now();
    frameCount++;
    
    if (currentTime - lastTime >= 1000) {
      const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
      
      if (fps < 55) { // Below 55fps threshold
        console.warn(`Low FPS detected: ${fps}`);
        
        // Send to monitoring
        sendAlert({
          type: 'low_fps',
          value: fps,
          threshold: 55,
          page: window.location.pathname
        });
      }
      
      frameCount = 0;
      lastTime = currentTime;
    }
    
    requestAnimationFrame(measureFPS);
  };
  
  requestAnimationFrame(measureFPS);
};
```

## Network Optimization

### Resource Hints and Preloading
```html
<!-- DNS prefetch for external domains -->
<link rel="dns-prefetch" href="//fonts.googleapis.com">
<link rel="dns-prefetch" href="//www.google-analytics.com">
<link rel="dns-prefetch" href="//w.soundcloud.com">

<!-- Preconnect for critical resources -->
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- Preload critical resources -->
<link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/images/hero-image.webp" as="image">

<!-- Module preload for critical chunks -->
<link rel="modulepreload" href="/assets/vendor-react.js">
<link rel="modulepreload" href="/assets/main.js">
```

### Service Worker for Caching
```typescript
// Service worker registration
const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('SW registered: ', registration);
    } catch (registrationError) {
      console.log('SW registration failed: ', registrationError);
    }
  }
};

// Service worker caching strategy
const CACHE_NAME = 'zackbissell-v1';
const STATIC_ASSETS = [
  '/',
  '/assets/main.css',
  '/assets/main.js',
  '/fonts/inter-var.woff2'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(STATIC_ASSETS))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      })
  );
});
```

## Error Tracking and Performance Alerts

### Error Boundary with Performance Impact
```typescript
class PerformanceErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error with performance context
    const performanceEntry = performance.getEntriesByType('navigation')[0];
    
    const errorReport = {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      
      // Performance context
      loadTime: performanceEntry?.loadEventEnd || 0,
      domInteractive: performanceEntry?.domInteractive || 0,
      
      // User context
      userAgent: navigator.userAgent,
      viewport: `${window.innerWidth}x${window.innerHeight}`,
      connection: (navigator as any).connection?.effectiveType,
      
      // App context
      url: window.location.href,
      timestamp: new Date().toISOString()
    };
    
    // Send to error tracking service
    this.reportError(errorReport);
  }

  reportError = async (errorReport: any) => {
    try {
      await fetch('/api/errors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(errorReport)
      });
    } catch (reportingError) {
      console.error('Failed to report error:', reportingError);
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
            <p className="text-muted-foreground mb-4">
              We're working to fix this issue. Please try refreshing the page.
            </p>
            <Button onClick={() => window.location.reload()}>
              Refresh Page
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
```

---

*This performance optimization strategy ensures ZackBissell.com delivers exceptional user experiences across all devices while maintaining the platform's immersive storytelling capabilities and meeting strict performance budgets.*