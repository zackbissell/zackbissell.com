# Technology Stack & Core Technologies

**Document Type:** Architecture Component  
**Last Updated:** 2025-01-19  
**Target Audience:** Development Agents, Technical Team  

## Overview

ZackBissell.com is built on a modern React ecosystem optimized for high-performance, immersive storytelling experiences. The stack prioritizes animation performance, developer experience, and scalability while maintaining the flexibility needed for creative brutalist departures from conventional design.

## Frontend Framework & Build System

### Core Framework
```yaml
Primary Framework:
  - React: 18.3.1
    - Concurrent features for smooth UX
    - Suspense for code splitting
    - Error boundaries for resilience
    - Hooks-based architecture

TypeScript: 5.5.3
  - Strict mode enabled
  - Path mapping configured
  - Component prop validation
  - Strong typing for reducers and context

Build Tool: Vite 5.4.1
  - Fast HMR for development
  - Optimized production builds
  - ES module support
  - Plugin ecosystem integration
```

### Development & Quality Tools
```yaml
Code Quality:
  - ESLint: 9.9.0 (React hooks, TypeScript rules)
  - Prettier: Auto-formatting for consistency
  - Husky: Git hooks for quality gates
  - lint-staged: Incremental linting

Testing Framework:
  - Jest: 30.0.0 (Unit testing)
  - React Testing Library: 16.3.0 (Component testing)
  - jsdom: Browser environment simulation
  - Coverage reporting enabled
```

## Styling & Animation Architecture

### Styling System
```yaml
Primary Styling: Tailwind CSS 3.4.11
  - Utility-first approach
  - Custom design tokens
  - World-specific theme overrides
  - Responsive design utilities
  - Dark mode support

Component Library: shadcn/ui
  - Accessible primitives via Radix UI
  - Customizable with Tailwind
  - TypeScript definitions included
  - Consistent design language

CSS Processing:
  - PostCSS: 8.4.47 (Autoprefixer, custom plugins)
  - CSS Custom Properties for theming
  - CSS Modules for component isolation
```

### Animation Framework
```yaml
Primary Animation: Framer Motion 12.17.0
  - Declarative animations
  - Layout animations
  - Gesture handling
  - Spring physics
  - SVG animation support
  - Performance optimizations

Custom CSS Animations:
  - GPU-accelerated keyframes
  - transform3d usage for performance
  - Reduced motion media query support
  - 60fps targeting
```

## State Management & Data Flow

### State Architecture
```yaml
Server State: TanStack Query 5.56.2
  - Caching and synchronization
  - Background refetching
  - Optimistic updates
  - Offline support
  - Request deduplication

Form State: React Hook Form 7.53.0
  - Uncontrolled components
  - Validation integration
  - TypeScript support
  - Performance optimization

Local State: React Built-in Hooks
  - useState for component state
  - useReducer for complex state
  - useContext for app-wide state
  - Custom hooks for reusable logic
```

### Routing & Navigation
```yaml
Client-Side Routing: React Router 6.26.2
  - Nested routing support
  - Code splitting integration
  - Programmatic navigation
  - Protected routes
  - Route-based data loading

Navigation Enhancement:
  - Animated page transitions
  - Story world context preservation
  - Breadcrumb support
  - Deep linking capability
```

## UI Component System

### Core UI Library
```yaml
Base Components: Radix UI Primitives
  - Dialog/Modal: @radix-ui/react-dialog
  - Dropdown: @radix-ui/react-dropdown-menu
  - Toast: @radix-ui/react-toast
  - Navigation: @radix-ui/react-navigation-menu
  - Form Controls: Various Radix UI form primitives

Icon System: Lucide React 0.462.0
  - Consistent iconography
  - Tree-shakeable imports
  - Customizable stroke width
  - Accessibility support

Utility Libraries:
  - clsx: Conditional class names
  - tailwind-merge: Class conflict resolution
  - class-variance-authority: Component variants
```

### Design Token System
```css
/* Global Design Tokens */
:root {
  /* Core Brand Colors */
  --background: 0 0% 100%;
  --foreground: 0 0% 9%;
  --brand-primary: 14 86% 58%;
  --destructive: 0 84% 60%;
  --success: 142 76% 36%;
  
  /* Spacing System (8pt grid) */
  --spacing-unit: 0.5rem;
  --spacing-xs: calc(var(--spacing-unit) * 1);
  --spacing-sm: calc(var(--spacing-unit) * 2);
  --spacing-md: calc(var(--spacing-unit) * 3);
  --spacing-lg: calc(var(--spacing-unit) * 4);
  --spacing-xl: calc(var(--spacing-unit) * 6);
  --spacing-2xl: calc(var(--spacing-unit) * 8);
  --spacing-3xl: calc(var(--spacing-unit) * 12);
  
  /* Typography Scale */
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
  --font-size-3xl: 1.875rem;
  --font-size-4xl: 2.25rem;
  --font-size-5xl: 3rem;
}

/* World-Specific Overrides */
.world-disco {
  --accent-primary: 22 93% 58%;
  --accent-secondary: 0 84% 60%;
}

.world-nostalgia {
  --accent-primary: 271 81% 56%;
  --accent-secondary: 316 70% 68%;
}

.world-rolemodel {
  --accent-primary: 60 91% 58%;
  --accent-secondary: 0 84% 60%;
}
```

## Audio & Media Integration

### Audio Platforms
```yaml
Supported Platforms:
  - SoundCloud: Web player embeds
  - Mixcloud: Web player embeds
  - Future: Spotify Web Playback SDK
  - Future: Apple Music Web API

Integration Features:
  - Responsive embeds
  - Custom controls overlay
  - Progress tracking
  - Volume control
  - Full-screen mode
```

### Media Optimization
```yaml
Image Processing:
  - WebP/AVIF format support
  - Responsive image generation
  - Lazy loading implementation
  - Progressive loading strategy
  - CDN integration ready

Video Integration:
  - YouTube embed optimization
  - Vimeo integration support
  - Custom video controls
  - Thumbnail generation
  - Accessibility captions
```

## Development Environment

### Package Management
```yaml
Package Manager: npm (included with Node.js)
  - lockfile validation
  - Security audit integration
  - Scripts for common tasks
  - Development vs production dependencies

Node.js Version: 18+ LTS
  - ES module support
  - Performance optimizations
  - Security updates
  - Long-term support guarantee
```

### Development Scripts
```bash
# Development
npm run dev              # Start development server
npm run dev:debug        # Development with debug logging

# Building
npm run build            # Production build
npm run build:dev        # Development build with source maps
npm run preview          # Preview production build locally

# Testing
npm test                 # Run test suite
npm run test:watch       # Watch mode for testing
npm run test:coverage    # Generate coverage report

# Code Quality
npm run lint             # ESLint checking
npm run lint:fix         # Auto-fix linting issues
npm run type-check       # TypeScript validation
```

## Environment Configuration

### Development Environment
```bash
# Environment Variables
VITE_APP_NAME=ZackBissell.com
VITE_APP_VERSION=1.0.0
VITE_BUILD_TIME=auto-generated

# Optional Integrations
VITE_SOUNDCLOUD_CLIENT_ID=your_client_id
VITE_MIXCLOUD_API_KEY=your_api_key
VITE_ANALYTICS_ID=your_analytics_id

# Development Only
VITE_DEBUG_MODE=true
VITE_MOCK_API=true
```

### Production Configuration
```bash
# Production Environment
NODE_ENV=production
VITE_APP_ENV=production

# Performance Monitoring
VITE_SENTRY_DSN=your_sentry_dsn
VITE_PERFORMANCE_MONITORING=true

# CDN Configuration
VITE_CDN_URL=https://cdn.zackbissell.com
VITE_ASSETS_URL=https://assets.zackbissell.com
```

## Browser Support Matrix

### Primary Support (Full Feature Set)
```yaml
Desktop Browsers:
  - Chrome: 90+ (Latest 2 major versions)
  - Firefox: 88+ (Latest 2 major versions)  
  - Safari: 14+ (Latest 2 major versions)
  - Edge: 90+ (Chromium-based versions)

Mobile Browsers:
  - iOS Safari: 14+
  - Chrome Mobile: 90+
  - Samsung Internet: 13+
  - Firefox Mobile: 88+
```

### Progressive Enhancement (Core Features)
```yaml
Legacy Support:
  - IE 11: Not supported (redirect to modern browser notice)
  - Older Chrome/Firefox: Graceful degradation
  - Reduced animation on slower devices
  - Fallback fonts for better compatibility
```

## Performance Targets

### Core Web Vitals
```yaml
Performance Benchmarks:
  - First Contentful Paint: < 1.5s
  - Largest Contentful Paint: < 2.5s
  - First Input Delay: < 100ms
  - Cumulative Layout Shift: < 0.1

Bundle Size Targets:
  - Main bundle: < 300KB gzipped
  - Vendor bundle: < 200KB gzipped
  - Total initial load: < 500KB gzipped
  - Story world chunks: < 150KB each
```

### Animation Performance
```yaml
Animation Standards:
  - 60fps target for all animations
  - GPU acceleration for transforms
  - Intersection Observer for scroll animations
  - RequestAnimationFrame for smooth updates
  - Reduced motion preference support
```

## Security Considerations

### Content Security Policy
```yaml
CSP Configuration:
  - default-src: 'self'
  - script-src: 'self' 'unsafe-inline' (dev only)
  - style-src: 'self' 'unsafe-inline' fonts.googleapis.com
  - img-src: 'self' data: https:
  - font-src: 'self' fonts.gstatic.com
  - frame-src: w.soundcloud.com www.mixcloud.com
```

### Data Privacy
```yaml
Privacy Standards:
  - No tracking without consent
  - Local storage encryption for sensitive data
  - GDPR compliance ready
  - Analytics anonymization
  - Cookie consent management
```

---

*This technology stack provides the robust, performant foundation needed for ZackBissell.com's immersive storytelling platform while maintaining the flexibility for creative expression and future enhancement.*