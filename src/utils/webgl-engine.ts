/**
 * Revolutionary WebGL Engine - Apple Polish + A24 Cinematic Quality
 * Evidence-based 3D foundation with progressive enhancement
 * Performance-first architecture with security validation
 */

import React from 'react';
import * as THREE from 'three';
import { progressiveEnhancement } from './progressive-enhancement';
import { spatialAudio } from './spatial-audio';

interface WebGLCapabilities {
  webGL: boolean;
  webGL2: boolean;
  maxTextureSize: number;
  maxVertexShaderUniforms: number;
  maxFragmentShaderUniforms: number;
  extensions: {
    floatTextures: boolean;
    depthTexture: boolean;
    shaderTextureLOD: boolean;
    standardDerivatives: boolean;
    vertexArrayObject: boolean;
  };
}

interface PerformanceMetrics {
  fps: number;
  frameTime: number;
  drawCalls: number;
  triangles: number;
  memoryUsage: {
    textures: number;
    geometries: number;
    programs: number;
    total: number;
  };
  quality: 'low' | 'medium' | 'high';
}

interface AudioAnalysis {
  frequencyData: Uint8Array;
  timeData: Uint8Array;
  bpm: number;
  energy: {
    bass: number;
    mids: number;
    highs: number;
    total: number;
  };
  onset: boolean;
  pitch: number;
  rms: number;
}

interface WorldConfig {
  name: 'disco' | 'nostalgia' | 'rolemodel' | 'elevation';
  performanceTarget: number; // Target FPS
  memoryBudget: number; // MB
  complexity: 'low' | 'medium' | 'high';
  features: {
    particles: boolean;
    postProcessing: boolean;
    shadows: boolean;
    reflections: boolean;
  };
}

class WebGLEngine {
  private canvas: HTMLCanvasElement | null = null;
  private renderer: THREE.WebGLRenderer | null = null;
  private capabilities: WebGLCapabilities | null = null;
  private metrics: PerformanceMetrics;
  private isInitialized = false;
  private animationFrameId: number | null = null;
  
  // Performance monitoring
  private frameCount = 0;
  private lastPerformanceCheck = 0;
  private frameTimes: number[] = [];
  private qualityLevel: 'low' | 'medium' | 'high' = 'medium';
  
  // Security validation
  private shaderCache = new Map<string, THREE.Shader>();
  private memoryLimit = 200 * 1024 * 1024; // 200MB limit
  private drawCallLimit = 1000;

  constructor() {
    this.metrics = {
      fps: 0,
      frameTime: 0,
      drawCalls: 0,
      triangles: 0,
      memoryUsage: { textures: 0, geometries: 0, programs: 0, total: 0 },
      quality: 'medium'
    };
  }

  /**
   * Initialize WebGL with progressive enhancement
   */
  async initialize(canvas: HTMLCanvasElement): Promise<boolean> {
    if (this.isInitialized) return true;

    this.canvas = canvas;

    try {
      // Assess WebGL capabilities
      this.capabilities = this.assessCapabilities();
      
      if (!this.capabilities.webGL) {
        console.warn('WebGL not supported, falling back to 2D canvas');
        return false;
      }

      // Initialize Three.js renderer with optimal settings
      this.renderer = new THREE.WebGLRenderer({
        canvas: this.canvas,
        antialias: this.qualityLevel !== 'low',
        alpha: true,
        powerPreference: 'high-performance',
        preserveDrawingBuffer: false, // Better performance
        failIfMajorPerformanceCaveat: false,
        logarithmicDepthBuffer: this.capabilities.extensions.depthTexture,
      });

      // Configure renderer for optimal performance
      this.configureRenderer();
      
      // Start performance monitoring
      this.startPerformanceMonitoring();
      
      this.isInitialized = true;
      
      console.log('WebGL Engine initialized successfully:', {
        webGL2: this.capabilities.webGL2,
        maxTextureSize: this.capabilities.maxTextureSize,
        quality: this.qualityLevel
      });
      
      return true;
      
    } catch (error) {
      console.error('WebGL initialization failed:', error);
      return false;
    }
  }

  /**
   * Assess device WebGL capabilities
   */
  private assessCapabilities(): WebGLCapabilities {
    const testCanvas = document.createElement('canvas');
    const gl = testCanvas.getContext('webgl2') || testCanvas.getContext('webgl');
    
    if (!gl) {
      return {
        webGL: false,
        webGL2: false,
        maxTextureSize: 0,
        maxVertexShaderUniforms: 0,
        maxFragmentShaderUniforms: 0,
        extensions: {
          floatTextures: false,
          depthTexture: false,
          shaderTextureLOD: false,
          standardDerivatives: false,
          vertexArrayObject: false,
        }
      };
    }

    const isWebGL2 = gl instanceof WebGL2RenderingContext;
    
    return {
      webGL: true,
      webGL2: isWebGL2,
      maxTextureSize: gl.getParameter(gl.MAX_TEXTURE_SIZE),
      maxVertexShaderUniforms: gl.getParameter(gl.MAX_VERTEX_UNIFORM_VECTORS),
      maxFragmentShaderUniforms: gl.getParameter(gl.MAX_FRAGMENT_UNIFORM_VECTORS),
      extensions: {
        floatTextures: !!gl.getExtension('OES_texture_float'),
        depthTexture: !!gl.getExtension('WEBGL_depth_texture'),
        shaderTextureLOD: !!gl.getExtension('EXT_shader_texture_lod'),
        standardDerivatives: !!gl.getExtension('OES_standard_derivatives'),
        vertexArrayObject: !!gl.getExtension('OES_vertex_array_object'),
      }
    };
  }

  /**
   * Configure renderer for optimal performance
   */
  private configureRenderer(): void {
    if (!this.renderer) return;

    // Performance optimizations
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.0;
    
    // Shadow configuration based on quality
    if (this.qualityLevel === 'high') {
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    } else if (this.qualityLevel === 'medium') {
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.PCFShadowMap;
    } else {
      this.renderer.shadowMap.enabled = false;
    }

    // Enable extensions if available
    const gl = this.renderer.getContext();
    if (this.capabilities?.extensions.vertexArrayObject) {
      gl.getExtension('OES_vertex_array_object');
    }
  }

  /**
   * Dynamic quality scaling based on performance
   */
  private adjustQuality(targetFPS: number): void {
    const currentFPS = this.metrics.fps;
    const threshold = targetFPS * 0.8; // 80% of target

    if (currentFPS < threshold && this.qualityLevel !== 'low') {
      if (this.qualityLevel === 'high') {
        this.qualityLevel = 'medium';
      } else {
        this.qualityLevel = 'low';
      }
      
      this.reconfigureForQuality();
      console.log(`Quality adjusted to: ${this.qualityLevel} (FPS: ${currentFPS})`);
      
    } else if (currentFPS > targetFPS * 1.2 && this.qualityLevel !== 'high') {
      if (this.qualityLevel === 'low') {
        this.qualityLevel = 'medium';
      } else {
        this.qualityLevel = 'high';
      }
      
      this.reconfigureForQuality();
      console.log(`Quality enhanced to: ${this.qualityLevel} (FPS: ${currentFPS})`);
    }
  }

  /**
   * Reconfigure renderer settings for new quality level
   */
  private reconfigureForQuality(): void {
    if (!this.renderer) return;

    // Update shadow settings
    if (this.qualityLevel === 'high') {
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    } else if (this.qualityLevel === 'medium') {
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.PCFShadowMap;
    } else {
      this.renderer.shadowMap.enabled = false;
    }

    // Update pixel ratio
    const pixelRatio = this.qualityLevel === 'low' ? 1 : Math.min(window.devicePixelRatio, 2);
    this.renderer.setPixelRatio(pixelRatio);
  }

  /**
   * Validate shader before compilation (Security)
   */
  private validateShader(shaderSource: string, type: 'vertex' | 'fragment'): boolean {
    // Basic security validation
    const forbiddenPatterns = [
      /\bgl_FragData\b/,           // Prevent multiple render targets
      /\btexture2DLod\b/,          // May not be supported
      /\bwhile\s*\(/,              // Prevent infinite loops
      /\bfor\s*\([^;]*;[^;]*;[^)]*\)/, // Limit complex loops
    ];

    for (const pattern of forbiddenPatterns) {
      if (pattern.test(shaderSource)) {
        console.warn(`Shader validation failed: forbidden pattern detected in ${type} shader`);
        return false;
      }
    }

    // Check shader length (prevent extremely large shaders)
    if (shaderSource.length > 50000) {
      console.warn(`Shader validation failed: ${type} shader too large (${shaderSource.length} chars)`);
      return false;
    }

    return true;
  }

  /**
   * Monitor memory usage and performance
   */
  private updateMetrics(): void {
    if (!this.renderer) return;

    const info = this.renderer.info;
    
    this.metrics.drawCalls = info.render.calls;
    this.metrics.triangles = info.render.triangles;
    this.metrics.memoryUsage = {
      textures: info.memory.textures,
      geometries: info.memory.geometries,
      programs: info.programs?.length || 0,
      total: (info.memory.textures + info.memory.geometries) * 1024, // Rough estimate
    };

    // Check memory limits
    if (this.metrics.memoryUsage.total > this.memoryLimit) {
      console.warn('Memory usage exceeded limit:', this.metrics.memoryUsage);
      this.optimizeMemoryUsage();
    }

    // Check draw call limits
    if (this.metrics.drawCalls > this.drawCallLimit) {
      console.warn('Draw call limit exceeded:', this.metrics.drawCalls);
    }
  }

  /**
   * Optimize memory usage when limits are exceeded
   */
  private optimizeMemoryUsage(): void {
    if (!this.renderer) return;

    // Clear unused resources
    this.renderer.renderLists.dispose();
    
    // Force garbage collection if available
    if ('gc' in window && typeof window.gc === 'function') {
      window.gc();
    }
    
    // Downgrade quality if still over limit
    if (this.metrics.memoryUsage.total > this.memoryLimit && this.qualityLevel !== 'low') {
      this.qualityLevel = 'low';
      this.reconfigureForQuality();
    }
  }

  /**
   * Start performance monitoring loop
   */
  private startPerformanceMonitoring(): void {
    let lastTime = performance.now();
    let frameCount = 0;

    const monitor = () => {
      const currentTime = performance.now();
      const deltaTime = currentTime - lastTime;
      
      frameCount++;
      this.frameTimes.push(deltaTime);
      
      // Calculate FPS every second
      if (currentTime - this.lastPerformanceCheck >= 1000) {
        this.metrics.fps = Math.round(frameCount * 1000 / (currentTime - this.lastPerformanceCheck));
        this.metrics.frameTime = this.frameTimes.reduce((a, b) => a + b, 0) / this.frameTimes.length;
        
        this.updateMetrics();
        
        frameCount = 0;
        this.frameTimes = [];
        this.lastPerformanceCheck = currentTime;
      }
      
      lastTime = currentTime;
      requestAnimationFrame(monitor);
    };
    
    requestAnimationFrame(monitor);
  }

  /**
   * Get optimal world configuration based on device capabilities
   */
  getWorldConfig(worldName: 'disco' | 'nostalgia' | 'rolemodel' | 'elevation'): WorldConfig {
    const baseConfig: WorldConfig = {
      name: worldName,
      performanceTarget: 60,
      memoryBudget: 150,
      complexity: this.qualityLevel,
      features: {
        particles: this.qualityLevel !== 'low',
        postProcessing: this.qualityLevel === 'high',
        shadows: this.qualityLevel !== 'low',
        reflections: this.qualityLevel === 'high',
      }
    };

    // World-specific adjustments
    switch (worldName) {
      case 'disco':
        return {
          ...baseConfig,
          memoryBudget: 120, // Lower for glitch effects
          features: {
            ...baseConfig.features,
            particles: true, // Always enable for glitch particles
          }
        };
        
      case 'nostalgia':
        return {
          ...baseConfig,
          performanceTarget: 45, // Allow lower FPS for emotional effects
          features: {
            ...baseConfig.features,
            particles: true, // Essential for emotional particles
          }
        };
        
      case 'rolemodel':
        return {
          ...baseConfig,
          memoryBudget: 200, // Higher for chaos effects
          performanceTarget: 45, // Complex particle systems
        };
        
      case 'elevation':
        return {
          ...baseConfig,
          features: {
            ...baseConfig.features,
            reflections: false, // Anti-gravity doesn't need reflections
          }
        };
    }
  }

  /**
   * Get current performance metrics
   */
  getMetrics(): PerformanceMetrics {
    return { ...this.metrics, quality: this.qualityLevel };
  }

  /**
   * Get WebGL capabilities
   */
  getCapabilities(): WebGLCapabilities | null {
    return this.capabilities;
  }

  /**
   * Get renderer instance
   */
  getRenderer(): THREE.WebGLRenderer | null {
    return this.renderer;
  }

  /**
   * Update quality target for adaptive performance
   */
  setTargetFPS(fps: number): void {
    this.adjustQuality(fps);
  }

  /**
   * Clean up resources
   */
  dispose(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }
    
    if (this.renderer) {
      this.renderer.dispose();
    }
    
    this.shaderCache.clear();
    this.isInitialized = false;
  }
}

// Global WebGL engine instance
export const webglEngine = new WebGLEngine();

// React hook for WebGL integration
export function useWebGL(canvas: HTMLCanvasElement | null) {
  const [isReady, setIsReady] = React.useState(false);
  const [capabilities, setCapabilities] = React.useState<WebGLCapabilities | null>(null);

  React.useEffect(() => {
    if (canvas) {
      webglEngine.initialize(canvas).then((success) => {
        setIsReady(success);
        if (success) {
          setCapabilities(webglEngine.getCapabilities());
        }
      });
    }

    return () => {
      webglEngine.dispose();
    };
  }, [canvas]);

  return {
    isReady,
    capabilities,
    engine: webglEngine,
    metrics: webglEngine.getMetrics(),
  };
}

export type { WebGLCapabilities, PerformanceMetrics, AudioAnalysis, WorldConfig };