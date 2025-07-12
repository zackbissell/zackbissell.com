# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Vision: Immersive Musical Storytelling Platform

This is **Zack Bissell's revolutionary storytelling DJ site** - a next-generation immersive platform that transforms passive music consumption into active narrative participation. The project pioneers a new paradigm where each DJ mix becomes a complete thematic universe with emotional architecture, interactive storytelling, and cinematic user experiences.

### Core Philosophy: "Sonic Architect Worlds"
- **Every set is a story. Every story is a journey. Every journey is legendary.**
- Transform from DJ portfolio to immersive narrative experience platform
- Each mix = complete "world" with unique visual language, emotional logic, and interactive elements
- Apple HIG precision meets A24 cinematic storytelling meets Brooklyn afterparty vibes

## Development Commands

- **Start development server**: `npm run dev` (uses Vite)
- **Build for production**: `npm run build`
- **Build for development**: `npm run build:dev`
- **Run tests**: `npm test` (uses Jest with React Testing Library)
- **Lint code**: `npm run lint` (uses ESLint)
- **Preview production build**: `npm run preview`

## Technical Architecture

### Core Technology Stack
- **Frontend Framework**: React 18 with TypeScript, built using Vite
- **Routing**: React Router for client-side navigation with animated transitions
- **Styling**: Tailwind CSS with shadcn/ui component library (Apple HIG-inspired design system)
- **Animation**: Framer Motion for cinematic transitions and microinteractions
- **State Management**: TanStack Query for server state, React Hook Form for forms
- **Icons**: Lucide React for consistent iconography
- **Audio Integration**: SoundCloud/Mixcloud embed players with future audio visualization
- **Testing**: Jest with React Testing Library

### Design System Architecture
Following Apple Human Interface Guidelines with custom thematic variations:

#### Global Design Tokens
```typescript
// Color system with world-specific accent palettes
:root {
  --background: 0 0% 100%;           // Pure white primary
  --foreground: 0 0% 9%;             // Near-black text
  --brand-primary: 14 86% 58%;       // Warm amber accent
  --destructive: 0 84% 60%;          // Alert red
  --success: 142 76% 36%;            // Success green
}

// World-specific color overrides
.world-disco { --accent: amber-to-red-gradient; }
.world-nostalgia { --accent: purple-to-pink-gradient; }
.world-elevation { --accent: blue-to-amber-gradient; }
.world-rolemodel { --accent: yellow-to-red-gradient; }
```

#### Typography Scale (Responsive)
```css
.text-large-title { @apply text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight; }
.text-title1 { @apply text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight; }
.text-title2 { @apply text-2xl md:text-3xl font-semibold tracking-tight; }
.text-body-large { @apply text-lg md:text-xl font-normal; }
.text-body { @apply text-base md:text-lg font-normal; }
```

#### Component Library Structure
```typescript
// Reusable UI Components
<Badge icon={AlertTriangle} text="CLASSIFIED MATERIAL" theme="red" />
<AudioPlayerEmbed trackId="..." platform="soundcloud" />
<Modal trigger="emotional-prompt" overlay="backdrop-blur" />
<Tracklist tracks={trackData} worldTheme="disco" />
<NewsletterForm integration="mailchimp" />
<ContactForm handler="booking-inquiry" />
```

### Directory Structure & Organization

```
src/
├── components/
│   ├── global/              # Shared layout components
│   │   ├── Navigation.tsx   # Apple-style nav with glassmorphism
│   │   ├── Footer.tsx       # Newsletter signup & social links
│   │   └── Layout.tsx       # Main layout wrapper
│   ├── ui/                  # shadcn/ui component library
│   │   ├── button.tsx       # HIG-compliant button variants
│   │   ├── modal.tsx        # Accessible modal overlays
│   │   └── [40+ components] # Complete design system
│   └── worlds/              # World-specific components
│       ├── disco-ascension/
│       │   ├── HeroDisco.tsx           # Conspiracy-themed hero
│       │   ├── IncidentLog.tsx         # Interactive timeline
│       │   ├── AudioPlayerDisco.tsx    # Themed player wrapper
│       │   └── AlphaThetaCercleLoreBlock.tsx # Easter egg content
│       ├── nostalgia-trap/
│       │   ├── EmotionalPrompt.tsx     # Pre-listening modal
│       │   ├── MoodSelector.tsx        # Interactive emotion tracking
│       │   └── ThreeActStructure.tsx   # Glow→Ecstasy→Crash phases
│       └── [other worlds]/
├── pages/                   # Route components
│   ├── Home.tsx            # Portal with featured worlds
│   ├── About.tsx           # Zack's story & credentials
│   ├── DiscoAscension.tsx  # Conspiracy-themed world
│   ├── NostalgiaTrap.tsx   # Emotional vulnerability journey
│   ├── RoleModel.tsx       # Chaotic excellence narrative
│   └── [other worlds]/
├── content/                # Story data & content
│   ├── discoAscensionData.ts    # Incident logs, tracklist, lore
│   ├── nostalgiaTrapData.ts     # Emotional phases, track stories
│   └── [world data files]/
├── lib/                    # Utilities & configurations
│   ├── utils.ts            # Tailwind class helpers
│   └── alerts.ts           # Notification system
└── styles/
    └── index.css           # Global styles & design tokens
```

## World Architecture: Immersive Storytelling Framework

### The "Worlds" System
Each DJ mix becomes a complete thematic universe following this modular architecture:

#### 1. Disco Ascension - "The Classified Disco Paradox"
**Theme**: Government conspiracy meets disco with Montauk Project inspiration
**Visual Language**: High-contrast danger colors (amber/red), glitch effects, classified document aesthetics
**Interactive Elements**:
- `CLASSIFIED MATERIAL` warning banners with animated alerts
- Conspiracy files toggle revealing terminal-style incident reports
- Timeline-synced "anomalous events" during mix playback
- Easter eggs: "Access Denied" alerts, redacted text reveals

**Key Components**:
```typescript
// Hero with government briefing aesthetic
<ClassifiedBanner icon={AlertTriangle} level="EYES ONLY" />
<GradientTitle from="amber" to="red">DISCO ASCENSION</GradientTitle>
<WarningBox theme="classified">
  "Contains anomalous temporal frequencies. Department of Groove Regulation advises caution."
</WarningBox>

// Interactive storytelling
<IncidentTimeline events={grooveSingularityLog} syncWithAudio />
<ConspiracyFiles toggleable restricted />
<DeclaassifiedTracklist redactedEntries />
```

#### 2. Nostalgia Trap - "Emotional Vulnerability Journey"
**Theme**: Heartbreak introspection with guided emotional experience
**Visual Language**: Purple-pink-amber gradients, intimate textures, mood-responsive design
**Interactive Elements**:
- Pre-listening emotional priming modal: "Think of someone who hurt you..."
- Mood selector that changes interface colors/behavior
- Three-act emotional architecture (The Glow → The Ecstasy → The Crash)
- Personalized response system based on user emotional state

**Key Components**:
```typescript
// Emotional priming system
<EmotionalPrompt>
  "Before You Enter... Think of someone who left you wrecked. 
   Hold that thought. Feel it in your chest. Now press play."
</EmotionalPrompt>

// Adaptive interface
<MoodSelector 
  options={["Missing Them 💔", "Dancing It Off 💃", "Over It ✨", "Confused AF 🌀"]}
  onSelect={adaptInterfaceToMood}
/>

// Narrative phases
<ThreeActStructure>
  <Phase icon="💜" title="The Glow" description="Happy reminiscing phase" />
  <Phase icon="🎵" title="The Ecstasy" description="Dizzy high of longing" />
  <Phase icon="⚠️" title="The Crash" description="Painful come-down" />
</ThreeActStructure>
```

#### 3. Role Model - "Unhinged Excellence"
**Theme**: Chaotic creativity celebrating spontaneous 300-track madness
**Visual Language**: Industrial aesthetics, yellow-red chaos palette, legal disclaimer comedy
**Interactive Elements**:
- Chaos metrics dashboard (∞ Cups Coffee, 300+ Tracks, 1 Take)
- Legal disclaimer toggle with humorous fine print
- "Unhinged content" warnings with pulsing alerts
- Producer notes about 3AM SoundCloud discoveries

#### 4. House Work: Elevation - "Genre-Boundary Challenger"
**Theme**: Cinematic house journey with anti-purist messaging
**Visual Language**: Ascending visuals, blue-to-amber gradients, elevation metaphors
**Interactive Elements**:
- Multi-act structure (Chronological → Genre-Bending → "Fuck You Purists")
- Audio-reactive elevation meter that rises with energy
- Cultural commentary essays on house music evolution
- Recurring visual actors creating narrative continuity

### Universal World Components

#### Navigation & Layout
```typescript
// World-aware navigation
<Navigation worldContext={currentWorld} glassmorphism />
<WorldLayout theme={worldTheme} backgroundElements>
  <WorldHero />
  <AudioSection />
  <NarrativeContent />
  <InteractiveElements />
  <ShareCTA />
</WorldLayout>
```

#### Audio Integration
```typescript
// Embedded players with world theming
<AudioPlayerEmbed 
  platform="soundcloud"
  trackId={mixData.soundcloudId}
  theme={worldTheme}
  visualizer={audioReactiveElements}
  contextLabel="The Last Known Copy - recovered from Groove Singularity"
/>
```

#### Interactive Storytelling
```typescript
// Modular narrative components
<InteractiveToggle
  trigger="Access Classified Files"
  content={<TerminalInterface />}
  animation="fade-in-from-bottom"
/>

<ScrollSyncedTimeline 
  events={mixEvents}
  audioTimestamps
  visualEffects
/>
```

## Component Design Patterns

### 1. Reusable UI Components
Following Apple HIG with world-specific theming:

```typescript
// Badge system for warnings/labels
interface BadgeProps {
  icon: LucideIcon;
  text: string;
  theme: 'classified' | 'emotional' | 'unhinged' | 'elevation';
  pulse?: boolean;
}

// World-aware cards
interface WorldCardProps {
  children: ReactNode;
  theme?: WorldTheme;
  interactive?: boolean;
  glowEffect?: boolean;
}

// Audio player wrapper
interface AudioPlayerProps {
  trackId: string;
  platform: 'soundcloud' | 'mixcloud';
  worldTheme: WorldTheme;
  contextLabel?: string;
  visualizer?: boolean;
}
```

### 2. Animation Patterns
Using Framer Motion for cinematic experiences:

```typescript
// Page transitions between worlds
const worldTransitions = {
  disco: { from: 'black', effect: 'glitch-static' },
  nostalgia: { from: 'heart-pulse', effect: 'emotional-fade' },
  rolemodel: { from: 'chaos-scatter', effect: 'energy-burst' },
  elevation: { from: 'ascending-bars', effect: 'upward-sweep' }
};

// Scroll-triggered animations
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
>
```

### 3. Accessibility-First Design
All components built with inclusive design:

```typescript
// Screen reader support
<button 
  aria-label="Play Disco Ascension mix"
  aria-describedby="warning-classified-content"
>

// Keyboard navigation
const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') closeModal();
  if (e.key === 'Enter') activateInteraction();
};

// Color contrast compliance
// All text maintains 4.5:1 contrast ratio minimum
// Focus states clearly visible with custom outline styles
```

## Content Management & Data Architecture

### Story Content Structure
```typescript
interface WorldData {
  id: string;
  title: string;
  subtitle: string;
  theme: WorldTheme;
  narrative: {
    hero: HeroContent;
    story: StorySection[];
    interactions: InteractiveElement[];
  };
  audio: {
    soundcloudId: string;
    duration: string;
    tracklist: Track[];
  };
  visuals: {
    coverImage: string;
    backgroundElements: string[];
    colorPalette: ColorPalette;
  };
}

interface Track {
  number: number;
  title: string;
  artist: string;
  timestamp: string;
  appleMusicUrl?: string; // Affiliate linking
  spotifyUrl?: string;
  narrative?: string; // Story context for track
}
```

### MCP Server Integration
Leveraging enabled MCP servers for enhanced functionality:

- **context7**: Enhanced context management for story content
- **sequential**: Workflow management for complex world development  
- **@21st-dev/magic**: Advanced development tooling
- **puppeteer**: Web automation for testing interactive elements
- **linear**: Project management integration

## Performance & Optimization Strategy

### Code Splitting & Lazy Loading
```typescript
// Route-based code splitting
const DiscoAscension = lazy(() => import('./pages/DiscoAscension'));
const NostalgiaTrap = lazy(() => import('./pages/NostalgiaTrap'));

// Component-level lazy loading
const AudioVisualizer = lazy(() => import('./components/AudioVisualizer'));

// Image optimization
<img 
  src={worldData.coverImage} 
  loading="lazy"
  sizes="(max-width: 768px) 100vw, 50vw"
  alt={`${worldData.title} cover artwork`}
/>
```

### Animation Performance
```typescript
// GPU-accelerated animations
.animate-pulse-gpu {
  animation: pulse-gpu 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  will-change: transform;
  transform: translateZ(0);
}

// Reduced motion support
@media (prefers-reduced-motion: reduce) {
  .animate-pulse-gpu {
    animation: none;
  }
}
```

## Testing Strategy

### Component Testing
```bash
# Test individual worlds
npm test -- --testPathPattern=DiscoAscension
npm test -- --testPathPattern=NostalgiaTrap

# Test interactive elements
npm test -- --testPathPattern=MoodSelector
npm test -- --testPathPattern=AudioPlayer

# Accessibility testing
npm test -- --testPathPattern=AccessibilityCompliance
```

### User Experience Testing
- Cross-browser compatibility (Chrome, Firefox, Safari)
- Mobile responsiveness across device sizes
- Accessibility compliance with screen readers
- Performance optimization (Lighthouse audits)
- Audio player functionality across platforms

## Deployment & Environment

### Build Configuration
```bash
# Development with hot reloading
npm run dev

# Production build with optimizations
npm run build

# Preview production build locally
npm run preview
```

### Environment Variables
```env
VITE_SOUNDCLOUD_CLIENT_ID=your_client_id
VITE_MIXCLOUD_API_KEY=your_api_key
VITE_NEWSLETTER_API_URL=your_signup_endpoint
VITE_CONTACT_FORM_ENDPOINT=your_form_handler
VITE_AFFILIATE_ID=your_partnerize_id
```

## Future Enhancement Roadmap

### Phase 2 Features
- **Audio-reactive visualizations**: Real-time canvas animations synced to mix audio
- **Advanced Framer Motion transitions**: World-specific entry/exit animations
- **Community features**: User story sharing and emotional journey discussion
- **VR/AR integration**: Immersive world experiences in virtual reality
- **AI personalization**: Adaptive content based on user emotional responses

### Scalability Considerations
- **New world template system**: Rapid deployment of additional mix worlds
- **CMS integration**: Content management for non-technical updates
- **API development**: Headless architecture for multi-platform experiences
- **Analytics integration**: User journey tracking and engagement metrics

## Key Commands for Development

```bash
# Start development
npm run dev

# Create new world (custom script)
npm run create-world -- --name "world-name" --theme "theme-color"

# Run full test suite
npm test

# Build for production
npm run build

# Lint and fix code
npm run lint --fix

# Type checking
npx tsc --noEmit

# Bundle analysis
npm run build && npx vite-bundle-analyzer
```

## Accessibility Standards & Requirements

This project follows WCAG 2.1 AA standards and Apple's accessibility guidelines:

- **Color contrast**: Minimum 4.5:1 ratio for all text
- **Keyboard navigation**: Full site accessible via keyboard
- **Screen reader support**: Semantic HTML with ARIA labels
- **Focus management**: Clear focus indicators and logical tab order
- **Motion sensitivity**: Respect for `prefers-reduced-motion`
- **Text scaling**: Support for 200% zoom without horizontal scrolling

## Performance Targets

- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Time to Interactive**: < 3.5s
- **Bundle size**: < 500KB gzipped (excluding audio embeds)

---

**This platform represents a paradigm shift in digital music presentation, transforming passive consumption into active narrative participation through immersive storytelling technology and emotional architecture.**