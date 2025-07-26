# 🎵 ZackBissell.com - Revolutionary Immersive Storytelling Platform

**Next-generation immersive platform that transforms passive music consumption into active narrative participation.** Built with cutting-edge technologies and MCP-powered development tools.

## 🌟 Revolutionary Features

### 🎧 **Immersive Audio Experiences**
- **Audio-Reactive Particles**: 5,000+ Three.js particles responding to live audio frequencies
- **Advanced Audio Visualizers**: Real-time frequency analysis with world-specific effects
- **Revolutionary Audio Player**: 3 viewing modes (Mixcloud → Visualizer → Immersive 3D)

### 🌍 **Story Worlds**
Each DJ mix becomes a complete thematic universe:
- **Disco Ascension**: Government conspiracy meets disco with glitch effects
- **Nostalgia Trap**: Emotional vulnerability journey with floating animations
- **Role Model**: Unhinged excellence with chaos movement patterns
- **House Work: Elevation**: Genre-defying ascension with anti-gravity physics

### 🎨 **Advanced Visuals**
- **React Three Fiber**: Immersive 3D environments and particle systems
- **Optimized Framer Motion**: SSR-compatible appear animations with spring physics
- **World-Specific Themes**: Custom motion configs and visual effects per story world
- **Performance Optimized**: Instanced meshes, on-demand rendering, automatic DPR adjustment

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- **Magic MCP Server** (optional but recommended for enhanced development)

### Installation
```bash
# Clone the repository
git clone https://github.com/zackbissell/zackbissell.com.git
cd zackbissell.com

# Install dependencies
npm install

# Start development server
npm run dev
```

### 🪄 Magic MCP Server Setup (Enhanced Development)
For revolutionary development capabilities:

1. **Configure Magic MCP Server**:
   - See `MAGIC_MCP_SETUP.md` for detailed instructions
   - Use provided `claude-mcp-config.json` configuration
   - Requires @21st-dev/magic API key

2. **Enhanced Capabilities**:
   - AI-powered component generation
   - Advanced code optimization
   - Revolutionary design assistance

## 🛠 Development Commands

```bash
# Development
npm run dev          # Start dev server (http://localhost:8080)
npm run build        # Production build
npm run build:dev    # Development build
npm run preview      # Preview production build

# Quality & Testing
npm test            # Run Jest tests
npm run lint        # ESLint code checking
```

## 🏗 Technology Stack

### **Core Framework**
- **Vite** - Lightning-fast build tool
- **React 18** - Modern React with concurrent features
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling

### **Revolutionary Components**
- **React Three Fiber** - 3D rendering and particle systems
- **Framer Motion** - Advanced animations with optimized appear
- **Web Audio API** - Real-time audio analysis and visualization
- **shadcn/ui** - Apple HIG-compliant component library

### **MCP Server Integration**
- **@21st-dev/magic** - Enhanced development capabilities
- **context7** - Cutting-edge library documentation
- **sequential-thinking** - Complex problem solving
- **memory** - Knowledge management
- **puppeteer** - Browser automation

### **Performance Features**
- **Instanced Meshes** - Efficient rendering of 5000+ particles
- **On-demand Rendering** - Battery-optimized frame loops
- **Code Splitting** - Optimized bundle loading
- **SSR-Compatible Animations** - Server-side rendering support

## 📁 Project Structure

```
src/
├── components/
│   ├── audio/                    # Revolutionary audio components
│   │   ├── AdvancedAudioVisualizer.tsx
│   │   ├── RevolutionaryAudioPlayer.tsx
│   │   └── MixcloudPlayer.tsx
│   ├── immersive/               # 3D and immersive components
│   │   └── AudioReactiveParticles.tsx
│   ├── global/                  # Layout and navigation
│   │   ├── WorldNavigation.tsx
│   │   └── Layout.tsx
│   ├── worlds/                  # Story world components
│   │   ├── disco-ascension/
│   │   ├── nostalgia-trap/
│   │   └── rolemodel/
│   └── ui/                      # shadcn/ui components
├── pages/                       # Route components
├── content/                     # Story data and content
├── styles/                      # Global styles and themes
└── utils/                       # Utilities and configurations
```

## 🎭 Story Worlds

### **Disco Ascension** - `!disco-ascension`
- **Theme**: Government conspiracy meets disco
- **Visual**: Glitch effects, classified overlays, amber/red palette
- **Particles**: Temporal distortion with frequency spikes
- **Motion**: Spring physics with glitch reality animations

### **Nostalgia Trap** - `/nostalgia-trap`
- **Theme**: Emotional vulnerability journey
- **Visual**: Purple-pink gradients, glow effects
- **Particles**: Gentle floating with emotional pulses
- **Motion**: Heartbeat animations with memory floating

### **Role Model** - `/role-model`
- **Theme**: Unhinged creative excellence
- **Visual**: Yellow-red chaos palette, explosion effects
- **Particles**: Pure chaos movement with high energy
- **Motion**: Unpredictable transformations and rotations

### **House Work: Elevation** - `/house-work`
- **Theme**: Genre-defying ascension
- **Visual**: Blue-amber gradients, spiral effects
- **Particles**: Anti-gravity with ascending movement
- **Motion**: Floating animations with elevation physics

## 🎯 Performance Optimization

### **Rendering Performance**
- **Instanced Meshes**: Handle 5000+ particles efficiently
- **On-demand Rendering**: Reduces battery usage
- **LOD System**: Distance-based quality adjustment
- **Object Reuse**: Prevents garbage collection overhead

### **Animation Performance**
- **Hardware Acceleration**: GPU-accelerated animations
- **Spring Physics**: Realistic motion with performance optimization
- **Reduced Motion**: Accessibility-compliant animation controls
- **Optimized Appear**: SSR-compatible animations

### **Audio Performance**
- **Web Audio API**: Efficient frequency analysis
- **Cached Assets**: Prevent redundant audio fetches
- **Buffered Rendering**: Smooth visualizations without frame drops

## 🧪 Testing

### **Component Testing**
```bash
npm test -- --testPathPattern=DiscoAscension    # Test specific world
npm test -- --testPathPattern=AudioPlayer       # Test audio components
npm test -- --testPathPattern=Accessibility     # Test accessibility
```

### **Performance Testing**
- **Lighthouse Audits**: Performance, accessibility, best practices
- **Frame Rate Monitoring**: Consistent 60fps target
- **Memory Usage**: Efficient particle system memory management

## 🚀 Deployment

### **Production Build**
```bash
npm run build       # Optimized production build
npm run preview     # Preview production locally
```

### **Performance Targets**
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Bundle Size**: < 500KB gzipped (excluding audio)
- **Particle Performance**: 5000+ particles at 60fps

## 🤝 Development with MCP Servers

This project leverages multiple MCP servers for enhanced development:

### **Available MCP Servers**
- **@21st-dev/magic** - Revolutionary development capabilities
- **context7** - Library documentation and best practices
- **sequential-thinking** - Complex problem-solving assistance
- **memory** - Knowledge graph and requirement management

### **Enhanced Development Workflow**
1. **Research Phase**: Use context7 for cutting-edge library discovery
2. **Planning Phase**: Use sequential-thinking for systematic approach
3. **Implementation Phase**: Use @21st-dev/magic for advanced code generation
4. **Knowledge Management**: Use memory for storing insights and requirements

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

**🎵 Experience the Revolution: Every set is a story. Every story is a journey. Every journey is legendary.**
