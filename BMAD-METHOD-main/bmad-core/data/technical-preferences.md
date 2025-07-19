# Technical Preferences - ZackBissell.com Immersive Storytelling Platform

This file defines the preferred technologies, patterns, and standards for developing the ZackBissell.com immersive storytelling platform. These preferences guide BMAD agents in making consistent technology choices across all development stories.

## Technology Stack Preferences

### Frontend Framework & Build Tools
```yaml
Primary Framework:
  - React: 18.3.1+ (Latest stable with concurrent features)
  - TypeScript: 5.5.3+ (Strict mode enabled)
  - Vite: 5.4.1+ (Fast dev server and optimized builds)

Why: React 18's concurrent features enable smooth UX for immersive experiences. TypeScript provides reliability for complex story world state management. Vite offers best-in-class performance for development and production.

Avoid:
  - Create React App (deprecated, slower builds)
  - Webpack without specific optimization needs
  - JavaScript without TypeScript for new components
```

### Styling & Animation
```yaml
Primary Styling:
  - Tailwind CSS: 3.4.11+ (Utility-first with custom design tokens)
  - shadcn/ui components (Radix UI based, fully customizable)
  - CSS Custom Properties for theming system

Animation Framework:
  - Framer Motion: 12.17.0+ (Declarative animations, spring physics)
  - CSS Keyframes for simple effects
  - GPU acceleration for all animations (transform3d, will-change)

Why: Tailwind enables rapid iteration while maintaining consistency. Framer Motion provides cinematic-quality animations essential for story world experiences. shadcn/ui offers accessible components that can be heavily themed.

Avoid:
  - Styled-components or CSS-in-JS libraries (performance impact)
  - jQuery animations (outdated, performance issues)
  - CSS transitions for complex animations (prefer Framer Motion)
```

### State Management & Data Flow
```yaml
Server State:
  - TanStack Query: 5.56.2+ (Caching, background sync, optimistic updates)
  
Form State:
  - React Hook Form: 7.53.0+ (Uncontrolled components, performance optimized)
  
Local State:
  - React built-in hooks (useState, useReducer, useContext)
  - Custom hooks for reusable logic
  - No global state library unless absolutely necessary

Why: TanStack Query handles all server state complexity elegantly. React Hook Form provides best-in-class form handling. Built-in React state management is sufficient for this project scope.

Avoid:
  - Redux/Redux Toolkit (overkill for this project)
  - Zustand or other global state unless specific need identified
  - Uncontrolled third-party state solutions
```

### Audio & Media Integration
```yaml
Audio Platforms:
  - SoundCloud Web Player (primary integration)
  - Mixcloud embeds (secondary)
  - Native HTML5 audio for custom controls

Media Optimization:
  - WebP/AVIF formats for images (with JPEG fallback)
  - Progressive loading with intersection observer
  - CDN delivery for all media assets

Why: SoundCloud provides best API access for DJ mixes. Progressive loading essential for performance on slow connections. Modern image formats significantly reduce bundle sizes.

Avoid:
  - Auto-playing audio without user interaction
  - Large unoptimized images
  - Third-party audio libraries unless specific features needed
```

## Architecture Preferences

### Component Design Patterns
```yaml
Preferred Patterns:
  - Functional components with hooks (no class components)
  - forwardRef for components needing DOM access
  - Compound components for complex UI patterns
  - Custom hooks for reusable logic
  - Props interface definitions with TypeScript

Composition:
  - Prefer composition over inheritance
  - Use children prop and render props for flexibility
  - asChild pattern from Radix UI for component composition
  - Polymorphic components where appropriate

Why: Functional components are the React standard. Composition provides maximum flexibility for story world variations. TypeScript interfaces ensure reliability.

Avoid:
  - Class components for new development
  - Prop drilling (use context or component composition)
  - Overly complex component hierarchies
```

### Performance Patterns
```yaml
Optimization Strategies:
  - React.memo for expensive pure components
  - useMemo for expensive calculations
  - useCallback for event handlers passed to children
  - Code splitting with React.lazy and Suspense
  - Intersection Observer for lazy loading

Bundle Management:
  - Route-based code splitting for story worlds
  - Dynamic imports for heavy features
  - Tree shaking for utility libraries
  - Bundle analysis to prevent size regression

Why: Performance is critical for immersive experiences. Code splitting enables fast initial loads. Memoization prevents unnecessary re-renders during complex animations.

Avoid:
  - Premature optimization
  - Over-memoization (profile first)
  - Large third-party libraries without tree shaking
```

### Accessibility Patterns
```yaml
Required Standards:
  - WCAG 2.1 AA compliance
  - Semantic HTML elements
  - Keyboard navigation support
  - Screen reader compatibility
  - Color contrast compliance (4.5:1 minimum)

Implementation:
  - ARIA labels for interactive elements
  - Focus management in modals and story worlds
  - Alternative text for all images
  - Reduced motion preference support
  - High contrast mode support

Why: Accessibility ensures the immersive storytelling experience reaches all users. Required for professional booking credibility.

Avoid:
  - Relying solely on color for information
  - Missing focus indicators
  - Inaccessible custom components
```

## Development Standards

### Code Quality
```yaml
Required Tools:
  - ESLint with React and TypeScript rules
  - Prettier for code formatting
  - Husky for pre-commit hooks
  - TypeScript strict mode
  - Jest + React Testing Library for testing

File Organization:
  - Feature-based directory structure
  - Barrel exports (index.ts files)
  - Consistent naming conventions
  - Clear separation between global and world-specific components

Why: Consistency enables team collaboration and reduces bugs. Testing ensures reliability for complex interactive features.

Avoid:
  - Inconsistent file naming
  - Missing TypeScript types
  - Skipping tests for interactive components
```

### Performance Budgets
```yaml
Bundle Size Limits:
  - Main bundle: < 300KB gzipped
  - Story world chunks: < 150KB each
  - Total initial load: < 500KB gzipped
  - Third-party scripts: < 50KB total

Runtime Performance:
  - 60fps animations (16.67ms per frame)
  - First Contentful Paint: < 1.5s
  - Largest Contentful Paint: < 2.5s
  - Cumulative Layout Shift: < 0.1

Why: Performance budgets prevent regression and ensure smooth experiences across devices.

Avoid:
  - Adding dependencies without bundle size consideration
  - Animations that don't maintain 60fps
  - Layout shifts during loading
```

## Story World Specific Preferences

### Theme System Architecture
```yaml
Theming Approach:
  - CSS Custom Properties for color systems
  - World-specific CSS classes (.world-disco, .world-nostalgia)
  - Tailwind variant modifiers for world theming
  - React Context for theme state management

Visual Hierarchy:
  - Apple HIG principles for core navigation
  - Brutalist departures for story world content
  - Consistent spacing system (8pt grid)
  - Typography scale with responsive modifiers

Why: Flexible theming enables radical aesthetic departures per story world while maintaining consistency in navigation and core features.

Avoid:
  - Inline styles for theming
  - Hardcoded colors in components
  - Inconsistent spacing systems
```

### Interactive Element Patterns
```yaml
Animation Guidelines:
  - Framer Motion for story world interactions
  - CSS transforms for simple hover effects
  - Spring physics for natural feeling animations
  - Respect reduced motion preferences

User Engagement:
  - Progressive disclosure for complex features
  - Clear feedback for user actions
  - Graceful degradation for older devices
  - Touch-friendly targets (44px minimum)

Why: Smooth, purposeful animations create immersive experiences. Progressive disclosure prevents overwhelming users while maintaining depth.

Avoid:
  - Gratuitous animations without purpose
  - Animations that interfere with usability
  - Complex interactions without clear affordances
```

## External Services & APIs

### Preferred Services
```yaml
Analytics:
  - Privacy-focused analytics (no personal data collection)
  - Performance monitoring for Core Web Vitals
  - Error tracking with context preservation

Media Delivery:
  - CDN for image and video assets
  - Image optimization service (WebP/AVIF conversion)
  - Progressive image loading

Email & Communication:
  - Simple contact form with server validation
  - Newsletter signup with double opt-in
  - GDPR-compliant data handling

Why: Privacy-first approach builds trust. CDN delivery ensures global performance. Simple communication tools avoid complexity.

Avoid:
  - Tracking without explicit user consent
  - Complex CMS systems (content is primarily code-managed)
  - Multiple analytics providers
```

### Third-Party Integration Guidelines
```yaml
Integration Standards:
  - Minimize third-party JavaScript
  - Use official embed codes when available
  - Implement loading states for external content
  - Provide fallbacks for failed loads

Security Considerations:
  - Content Security Policy compliance
  - No third-party scripts without audit
  - Input validation for all external data
  - Secure headers for all responses

Why: Third-party scripts can significantly impact performance and security. Minimizing dependencies reduces attack surface and improves reliability.

Avoid:
  - Unnecessary third-party libraries
  - Unaudited external scripts
  - Missing fallbacks for external services
```

## Mobile & Device Considerations

### Responsive Design
```yaml
Breakpoint Strategy:
  - Mobile-first approach
  - Tailwind's default breakpoints (sm: 640px, md: 768px, lg: 1024px, xl: 1280px)
  - Touch-first interaction design
  - Progressive enhancement for desktop

Performance on Mobile:
  - Aggressive image optimization
  - Reduced animation complexity on slower devices
  - Battery-conscious animation strategies
  - Network-aware loading patterns

Why: Mobile traffic dominates. Touch-first design ensures usability across devices. Performance optimization critical for mobile experience.

Avoid:
  - Desktop-first responsive design
  - Hover-dependent interactions without touch alternatives
  - Battery-draining animations on mobile
```

## Deployment & Infrastructure

### Build & Deployment
```yaml
Preferred Hosting:
  - Static site deployment (Vercel, Netlify, or similar)
  - CDN for global performance
  - Automatic deployments from main branch
  - Preview deployments for PRs

Environment Management:
  - Environment variables for configuration
  - Separate staging and production environments
  - Automated testing in CI/CD pipeline
  - Performance regression testing

Why: Static deployment offers best performance and security. Automated pipelines prevent human error. Performance monitoring prevents regression.

Avoid:
  - Complex server-side infrastructure
  - Manual deployment processes
  - Missing environment separation
```

## Lessons Learned & Evolution

### Performance Insights
- Framer Motion layout animations can cause performance issues; prefer transform-based animations
- Intersection Observer is essential for smooth scroll-triggered animations
- Bundle size has more impact than runtime performance for perceived speed
- GPU acceleration (transform3d) is critical for smooth story world transitions

### Development Workflow
- TypeScript strict mode catches issues early in complex story world state management
- Component composition provides better flexibility than prop-heavy components
- Custom hooks enable reusable story world logic patterns
- Comprehensive error boundaries prevent story world crashes from affecting navigation

### User Experience Discoveries
- Reduced motion preferences are critical for accessibility
- Progressive disclosure works better than overwhelming initial interfaces
- Audio preloading improves story world entry experience
- Clear visual hierarchy helps users navigate between story worlds

## Future Exploration

### Next Enhancement Opportunities
- WebGL for advanced story world visual effects
- Service Worker for offline story world caching
- Web Audio API for custom audio visualization
- WebVR/WebXR for immersive story world experiences

### Technology Monitoring
- Keep watching React concurrent features evolution
- Monitor Framer Motion performance improvements
- Evaluate emerging image formats (JPEG XL, etc.)
- Track Web Platform APIs for media and animation

---

*These technical preferences ensure consistent, high-quality development of the ZackBissell.com immersive storytelling platform while maintaining flexibility for creative expression and future enhancement.*