# Component Architecture & Design System

**Document Type:** Architecture Component  
**Last Updated:** 2025-01-19  
**Target Audience:** Development Agents, UI/UX Team  

## Overview

The component architecture follows a modular "story worlds" pattern where shared components provide consistency while world-specific components enable radical aesthetic departures. This architecture balances Apple HIG precision with brutalist creative expression through a flexible theming system.

## Directory Structure

### Component Organization
```
src/components/
├── global/                    # Shared layout components
│   ├── Navigation.tsx         # Apple-style nav with glassmorphism
│   ├── Footer.tsx             # Newsletter signup & social links
│   └── Layout.tsx             # Main layout wrapper
├── ui/                        # shadcn/ui component library
│   ├── button.tsx             # HIG-compliant button variants
│   ├── modal.tsx              # Accessible modal overlays
│   ├── audio-player.tsx       # Unified audio player
│   ├── badge.tsx              # Warning/label system
│   └── [40+ components]       # Complete design system
└── worlds/                    # World-specific components
    ├── disco-ascension/
    │   ├── HeroDisco.tsx            # Conspiracy-themed hero
    │   ├── IncidentLog.tsx          # Interactive timeline
    │   ├── AudioPlayerDisco.tsx     # Themed player wrapper
    │   └── AlphaThetaCercleLoreBlock.tsx # Easter egg content
    ├── nostalgia-trap/
    │   ├── EmotionalPrompt.tsx      # Pre-listening modal
    │   ├── MoodSelector.tsx         # Interactive emotion tracking
    │   └── ThreeActStructure.tsx    # Glow→Ecstasy→Crash phases
    └── [other worlds]/
```

## Design System Architecture

### Theme System Implementation
```typescript
// Theme Provider Configuration
interface ThemeConfig {
  world?: 'disco' | 'nostalgia' | 'rolemodel' | 'elevation' | null;
  mode: 'light' | 'dark';
  reducedMotion: boolean;
  highContrast: boolean;
}

const ThemeProvider = ({ children, config }: { children: ReactNode; config: ThemeConfig }) => {
  useEffect(() => {
    // Apply world-specific CSS classes
    const rootElement = document.documentElement;
    
    // Clear existing world classes
    rootElement.classList.remove('world-disco', 'world-nostalgia', 'world-rolemodel', 'world-elevation');
    
    // Apply new world class
    if (config.world) {
      rootElement.classList.add(`world-${config.world}`);
    }
    
    // Apply accessibility preferences
    if (config.reducedMotion) {
      rootElement.classList.add('reduced-motion');
    }
    
    if (config.highContrast) {
      rootElement.classList.add('high-contrast');
    }
  }, [config]);

  return (
    <ThemeContext.Provider value={config}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook for accessing theme context
const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
```

### Design Token System
```css
/* Base Design Tokens */
:root {
  /* Color System */
  --color-background: 0 0% 100%;
  --color-foreground: 0 0% 9%;
  --color-muted: 0 0% 96%;
  --color-muted-foreground: 0 0% 45%;
  --color-border: 0 0% 89%;
  --color-ring: 14 86% 58%;
  
  /* Brand Colors */
  --color-brand-primary: 14 86% 58%;
  --color-destructive: 0 84% 60%;
  --color-success: 142 76% 36%;
  --color-warning: 43 96% 56%;
  
  /* Typography */
  --font-family-sans: 'Inter', system-ui, sans-serif;
  --font-family-mono: 'SF Mono', 'Monaco', 'Consolas', monospace;
  --font-family-brutalist: 'Inter', 'Helvetica Neue', sans-serif;
  
  /* Spacing Scale (8pt Grid) */
  --spacing-0: 0;
  --spacing-1: 0.25rem;   /* 4px */
  --spacing-2: 0.5rem;    /* 8px */
  --spacing-3: 0.75rem;   /* 12px */
  --spacing-4: 1rem;      /* 16px */
  --spacing-5: 1.25rem;   /* 20px */
  --spacing-6: 1.5rem;    /* 24px */
  --spacing-8: 2rem;      /* 32px */
  --spacing-10: 2.5rem;   /* 40px */
  --spacing-12: 3rem;     /* 48px */
  --spacing-16: 4rem;     /* 64px */
  --spacing-20: 5rem;     /* 80px */
  --spacing-24: 6rem;     /* 96px */
  
  /* Border Radius */
  --radius-none: 0;
  --radius-sm: 0.125rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --radius-xl: 0.75rem;
  --radius-2xl: 1rem;
  --radius-full: 9999px;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
}

/* World-Specific Token Overrides */
.world-disco {
  --color-accent-primary: 22 93% 58%;     /* Amber */
  --color-accent-secondary: 0 84% 60%;    /* Red */
  --color-terminal: 120 100% 50%;         /* Matrix green */
  --gradient-primary: linear-gradient(135deg, hsl(var(--color-accent-primary)), hsl(var(--color-accent-secondary)));
}

.world-nostalgia {
  --color-accent-primary: 271 81% 56%;    /* Purple */
  --color-accent-secondary: 316 70% 68%;  /* Pink */
  --gradient-primary: linear-gradient(135deg, hsl(var(--color-accent-primary)), hsl(var(--color-accent-secondary)));
}

.world-rolemodel {
  --color-accent-primary: 60 91% 58%;     /* Yellow */
  --color-accent-secondary: 0 84% 60%;    /* Red */
  --color-industrial: 0 0% 25%;           /* Dark gray */
  --gradient-primary: linear-gradient(135deg, hsl(var(--color-accent-primary)), hsl(var(--color-accent-secondary)));
}

.world-elevation {
  --color-accent-primary: 221 83% 53%;    /* Blue */
  --color-accent-secondary: 43 96% 56%;   /* Amber */
  --gradient-primary: linear-gradient(135deg, hsl(var(--color-accent-primary)), hsl(var(--color-accent-secondary)));
}
```

## Core Component Patterns

### Layout Components
```typescript
// Layout.tsx - Main application layout
interface LayoutProps {
  children: ReactNode;
  world?: WorldTheme;
  className?: string;
}

const Layout = ({ children, world, className }: LayoutProps) => {
  const { reducedMotion } = useTheme();
  
  return (
    <div className={cn('min-h-screen bg-background text-foreground', className)}>
      <SkipLink href="#main-content">Skip to main content</SkipLink>
      <Navigation world={world} />
      
      <main id="main-content" className="flex-1">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            initial={!reducedMotion ? { opacity: 0, y: 20 } : false}
            animate={{ opacity: 1, y: 0 }}
            exit={!reducedMotion ? { opacity: 0, y: -20 } : false}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
      
      <Footer />
    </div>
  );
};

// Navigation.tsx - World-aware navigation
interface NavigationProps {
  world?: WorldTheme;
}

const Navigation = ({ world }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold bg-gradient-to-r from-brand-primary to-accent-primary bg-clip-text text-transparent">
            Zack Bissell
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Story Worlds</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-6 w-[400px]">
                    <NavigationMenuLink asChild>
                      <Link to="/disco-ascension" className="group grid h-auto w-full items-center justify-start gap-1 rounded-md p-4 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <div className="text-sm font-medium leading-none group-hover:underline">
                          Disco Ascension
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          The classified disco paradox
                        </p>
                      </Link>
                    </NavigationMenuLink>
                    {/* Additional story world links */}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/about" className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                    About
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/booking" className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-brand-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-brand-primary/90">
                    Book Zack
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>
        
        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>
      
      {/* Mobile navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t bg-background/95 backdrop-blur"
          >
            <nav className="container px-4 py-4">
              {/* Mobile navigation items */}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
```

### UI Component Library Patterns
```typescript
// Button Component with Variants
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'world';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean;
  world?: WorldTheme;
}

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "underline-offset-4 hover:underline text-primary",
        world: "bg-gradient-to-r from-accent-primary to-accent-secondary text-white hover:opacity-90"
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-3 rounded-md",
        lg: "h-11 px-8 rounded-md",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, world, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        data-world={world}
        {...props}
      />
    );
  }
);

// Audio Player Component with World Theming
interface AudioPlayerProps {
  src: string;
  title: string;
  artist?: string;
  world?: WorldTheme;
  incidents?: IncidentData[];
  onTimeUpdate?: (currentTime: number) => void;
}

const AudioPlayer = ({ src, title, artist, world, incidents, onTimeUpdate }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      setCurrentTime(current);
      onTimeUpdate?.(current);
    }
  };
  
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };
  
  return (
    <div className={cn(
      "audio-player p-6 rounded-lg border",
      world && `world-${world}-theme`
    )}>
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={() => {
          if (audioRef.current) {
            setDuration(audioRef.current.duration);
          }
        }}
        onEnded={() => setIsPlaying(false)}
      />
      
      <div className="flex items-center space-x-4">
        <Button
          onClick={togglePlayPause}
          size="icon"
          variant={world ? "world" : "default"}
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
        
        <div className="flex-1">
          <h3 className="font-semibold">{title}</h3>
          {artist && <p className="text-sm text-muted-foreground">{artist}</p>}
        </div>
        
        <div className="text-sm text-muted-foreground">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
      </div>
      
      <div className="mt-4">
        <Slider
          value={[currentTime]}
          max={duration}
          step={1}
          onValueChange={(value) => {
            if (audioRef.current) {
              audioRef.current.currentTime = value[0];
              setCurrentTime(value[0]);
            }
          }}
          className="w-full"
        />
      </div>
      
      {/* Incident markers for story worlds */}
      {incidents && (
        <div className="mt-4 space-y-2">
          {incidents.map((incident, index) => (
            <motion.div
              key={index}
              animate={{
                opacity: currentTime >= incident.startTime && currentTime <= incident.endTime ? 1 : 0.6,
                scale: currentTime >= incident.startTime && currentTime <= incident.endTime ? 1.05 : 1
              }}
              className="text-sm p-2 rounded bg-muted"
            >
              <div className="font-medium">{incident.title}</div>
              <div className="text-muted-foreground">{incident.description}</div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
```

### World-Specific Component Patterns
```typescript
// World Hero Component Template
interface WorldHeroProps {
  title: string;
  subtitle: string;
  description: string;
  world: WorldTheme;
  backgroundImage?: string;
  actions?: React.ReactNode;
  children?: React.ReactNode;
}

const WorldHero = ({ title, subtitle, description, world, backgroundImage, actions, children }: WorldHeroProps) => {
  const { reducedMotion } = useTheme();
  
  return (
    <section className={cn(
      "relative min-h-screen flex items-center justify-center text-center",
      `world-${world}-hero`
    )}>
      {backgroundImage && (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>
      )}
      
      <div className="relative z-10 container px-4">
        <motion.div
          initial={!reducedMotion ? { opacity: 0, y: 50 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h1 className="text-large-title font-bold mb-6 bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">
            {title}
          </h1>
          
          <h2 className="text-title2 text-muted-foreground mb-8 max-w-3xl mx-auto">
            {subtitle}
          </h2>
          
          <p className="text-body-large text-foreground/80 mb-12 max-w-2xl mx-auto">
            {description}
          </p>
          
          {actions && (
            <motion.div
              initial={!reducedMotion ? { opacity: 0, y: 20 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              {actions}
            </motion.div>
          )}
        </motion.div>
        
        {children}
      </div>
    </section>
  );
};

// Interactive Element Template
interface InteractiveElementProps {
  trigger: React.ReactNode;
  content: React.ReactNode;
  world?: WorldTheme;
  animation?: 'fade' | 'slide' | 'scale';
  position?: 'center' | 'bottom' | 'top';
}

const InteractiveElement = ({ trigger, content, world, animation = 'fade', position = 'center' }: InteractiveElementProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { reducedMotion } = useTheme();
  
  const animations = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 }
    },
    slide: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 20 }
    },
    scale: {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.95 }
    }
  };
  
  return (
    <>
      <div onClick={() => setIsOpen(true)}>
        {trigger}
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className={cn(
              "max-w-4xl",
              world && `world-${world}-modal`,
              position === 'bottom' && 'top-auto bottom-4',
              position === 'top' && 'bottom-auto top-4'
            )}>
              <motion.div
                {...(reducedMotion ? {} : animations[animation])}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                {content}
              </motion.div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  );
};
```

## Animation Patterns

### Performance-Optimized Animations
```typescript
// GPU-Accelerated Animation Hook
const useGPUAnimation = () => {
  const { reducedMotion } = useTheme();
  
  const animateElement = (element: HTMLElement, keyframes: Keyframe[], options?: KeyframeAnimationOptions) => {
    if (reducedMotion) return;
    
    // Ensure GPU acceleration
    element.style.willChange = 'transform, opacity';
    
    const animation = element.animate(keyframes, {
      duration: 300,
      easing: 'ease-out',
      fill: 'forwards',
      ...options
    });
    
    animation.addEventListener('finish', () => {
      element.style.willChange = 'auto';
    });
    
    return animation;
  };
  
  return { animateElement };
};

// Scroll-Triggered Animation Hook
const useScrollAnimation = (threshold = 0.1) => {
  const { reducedMotion } = useTheme();
  const [ref, inView] = useInView({ threshold, triggerOnce: true });
  
  const scrollVariants = {
    hidden: reducedMotion ? {} : { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: [0.25, 0.1, 0.25, 1] 
      }
    }
  };
  
  return { ref, inView, scrollVariants };
};
```

### World-Specific Animation Effects
```css
/* Disco Ascension Animations */
.world-disco .glitch-text {
  animation: vhs-glitch 0.3s infinite;
}

@keyframes vhs-glitch {
  0% { transform: translate3d(0, 0, 0); filter: hue-rotate(0deg); }
  20% { transform: translate3d(-2px, 1px, 0); filter: hue-rotate(90deg); }
  40% { transform: translate3d(2px, -1px, 0); filter: hue-rotate(180deg); }
  60% { transform: translate3d(-1px, 2px, 0); filter: hue-rotate(270deg); }
  80% { transform: translate3d(1px, -2px, 0); filter: hue-rotate(360deg); }
  100% { transform: translate3d(0, 0, 0); filter: hue-rotate(0deg); }
}

/* Nostalgia Trap Animations */
.world-nostalgia .emotional-transition {
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.world-nostalgia .phase-glow {
  background: radial-gradient(circle, rgba(168, 85, 247, 0.2) 0%, transparent 70%);
  animation: gentle-pulse 3s ease-in-out infinite;
}

@keyframes gentle-pulse {
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.05); }
}

/* Role Model Animations */
.world-rolemodel .chaos-element {
  animation: chaos-shake 0.5s ease-in-out infinite alternate;
}

@keyframes chaos-shake {
  0% { transform: translate3d(-1px, -1px, 0) rotate(0deg); }
  25% { transform: translate3d(1px, 1px, 0) rotate(0.5deg); }
  50% { transform: translate3d(-1px, 1px, 0) rotate(-0.5deg); }
  75% { transform: translate3d(1px, -1px, 0) rotate(0.5deg); }
  100% { transform: translate3d(-1px, -1px, 0) rotate(0deg); }
}
```

## Accessibility Patterns

### Focus Management
```typescript
// Focus Trap Hook
const useFocusTrap = (isActive: boolean) => {
  const containerRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    if (!isActive || !containerRef.current) return;
    
    const container = containerRef.current;
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
    
    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };
    
    container.addEventListener('keydown', handleTabKey);
    firstElement?.focus();
    
    return () => {
      container.removeEventListener('keydown', handleTabKey);
    };
  }, [isActive]);
  
  return containerRef;
};

// Screen Reader Announcements
const useLiveRegion = () => {
  const announce = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', priority);
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    liveRegion.textContent = message;
    
    document.body.appendChild(liveRegion);
    
    setTimeout(() => {
      document.body.removeChild(liveRegion);
    }, 1000);
  };
  
  return { announce };
};
```

---

*This component architecture provides the flexible, performant foundation needed to implement both Apple HIG precision and brutalist creative expression while maintaining accessibility and consistency across all story worlds.*