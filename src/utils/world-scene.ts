/**
 * Abstract World Scene Architecture
 * A24 Cinematic Foundation for Revolutionary Story Worlds
 * Evidence-based modular system with performance optimization
 */

import * as THREE from 'three';
import { webglEngine, type WorldConfig, type AudioAnalysis, type PerformanceMetrics } from './webgl-engine';
import { spatialAudio } from './spatial-audio';
import { haptics } from './haptics';

interface InteractionEvent {
  type: 'click' | 'hover' | 'scroll' | 'audio' | 'gesture';
  position?: THREE.Vector2;
  worldPosition?: THREE.Vector3;
  intensity?: number;
  data?: any;
}

interface CinematicCamera {
  position: THREE.Vector3;
  target: THREE.Vector3;
  fov: number;
  near: number;
  far: number;
  movementType: 'static' | 'orbit' | 'track' | 'handheld' | 'dolly' | 'crane';
}

interface WorldLighting {
  ambient: {
    color: THREE.Color;
    intensity: number;
  };
  directional: {
    color: THREE.Color;
    intensity: number;
    position: THREE.Vector3;
    castShadow: boolean;
  };
  point: Array<{
    color: THREE.Color;
    intensity: number;
    position: THREE.Vector3;
    distance: number;
    decay: number;
  }>;
}

interface ParticleSystemConfig {
  count: number;
  size: number;
  color: THREE.Color;
  opacity: number;
  velocity: THREE.Vector3;
  acceleration: THREE.Vector3;
  lifespan: number;
  emissionRate: number;
}

abstract class WorldScene {
  protected scene: THREE.Scene;
  protected camera: THREE.PerspectiveCamera;
  protected renderer: THREE.WebGLRenderer | null = null;
  protected config: WorldConfig;
  protected clock: THREE.Clock;
  
  // A24 Cinematic System
  protected cinematicCamera: CinematicCamera;
  protected cameraController: any = null;
  protected depthOfField: any = null;
  
  // Performance & Quality
  protected performanceMonitor: PerformanceMetrics;
  protected qualityLevel: 'low' | 'medium' | 'high';
  protected frameTarget: number;
  
  // World-specific systems
  protected lighting: WorldLighting;
  protected particleSystems: Map<string, THREE.Points> = new Map();
  protected audioReactiveObjects: THREE.Object3D[] = [];
  protected interactiveObjects: THREE.Object3D[] = new Map();
  
  // Animation and timing
  protected mixers: THREE.AnimationMixer[] = [];
  protected uniformTime: { value: number } = { value: 0 };
  protected isPlaying: boolean = false;
  protected lastFrameTime: number = 0;
  
  constructor(worldName: 'disco' | 'nostalgia' | 'rolemodel' | 'elevation') {
    this.config = webglEngine.getWorldConfig(worldName);
    this.performanceMonitor = webglEngine.getMetrics();
    this.qualityLevel = this.config.complexity;
    this.frameTarget = this.config.performanceTarget;
    
    // Initialize Three.js core
    this.scene = new THREE.Scene();
    this.clock = new THREE.Clock();
    
    // Setup cinematic camera with world-specific settings
    this.cinematicCamera = this.getDefaultCameraConfig();
    this.camera = new THREE.PerspectiveCamera(
      this.cinematicCamera.fov,
      window.innerWidth / window.innerHeight,
      this.cinematicCamera.near,
      this.cinematicCamera.far
    );
    
    // Initialize lighting system
    this.lighting = this.getDefaultLighting();
    
    // Setup scene foundation
    this.initializeFoundation();
  }

  /**
   * Abstract methods - must be implemented by each world
   */
  abstract initializeWorld(): Promise<void>;
  abstract updateWorld(deltaTime: number, audioData: AudioAnalysis): void;
  abstract handleInteraction(event: InteractionEvent): void;
  abstract handleAudioEvent(audioData: AudioAnalysis): void;
  abstract dispose(): void;

  /**
   * Get world-specific camera configuration
   */
  protected getDefaultCameraConfig(): CinematicCamera {
    return {
      position: new THREE.Vector3(0, 0, 10),
      target: new THREE.Vector3(0, 0, 0),
      fov: 75,
      near: 0.1,
      far: 1000,
      movementType: 'orbit'
    };
  }

  /**
   * Get world-specific lighting setup
   */
  protected getDefaultLighting(): WorldLighting {
    return {
      ambient: {
        color: new THREE.Color(0x404040),
        intensity: 0.4
      },
      directional: {
        color: new THREE.Color(0xffffff),
        intensity: 1.0,
        position: new THREE.Vector3(1, 1, 0.5),
        castShadow: this.config.features.shadows
      },
      point: []
    };
  }

  /**
   * Initialize scene foundation with performance optimization
   */
  protected initializeFoundation(): void {
    // Setup lighting
    this.setupLighting();
    
    // Configure camera
    this.setupCamera();
    
    // Setup audio reactive system
    this.setupAudioReactivity();
    
    // Initialize performance monitoring
    this.setupPerformanceMonitoring();
    
    console.log(`${this.config.name} world scene initialized:`, {
      quality: this.qualityLevel,
      features: this.config.features,
      memoryBudget: this.config.memoryBudget
    });
  }

  /**
   * Setup world lighting system
   */
  protected setupLighting(): void {
    // Ambient light
    const ambientLight = new THREE.AmbientLight(
      this.lighting.ambient.color,
      this.lighting.ambient.intensity
    );
    this.scene.add(ambientLight);

    // Directional light (sun/key light)
    const directionalLight = new THREE.DirectionalLight(
      this.lighting.directional.color,
      this.lighting.directional.intensity
    );
    directionalLight.position.copy(this.lighting.directional.position);
    directionalLight.castShadow = this.lighting.directional.castShadow;
    
    if (directionalLight.castShadow) {
      directionalLight.shadow.mapSize.width = this.qualityLevel === 'high' ? 2048 : 1024;
      directionalLight.shadow.mapSize.height = this.qualityLevel === 'high' ? 2048 : 1024;
      directionalLight.shadow.camera.near = 0.5;
      directionalLight.shadow.camera.far = 500;
    }
    
    this.scene.add(directionalLight);

    // Point lights
    this.lighting.point.forEach((pointConfig, index) => {
      const pointLight = new THREE.PointLight(
        pointConfig.color,
        pointConfig.intensity,
        pointConfig.distance,
        pointConfig.decay
      );
      pointLight.position.copy(pointConfig.position);
      this.scene.add(pointLight);
    });
  }

  /**
   * Setup cinematic camera system
   */
  protected setupCamera(): void {
    this.camera.position.copy(this.cinematicCamera.position);
    this.camera.lookAt(this.cinematicCamera.target);
    
    // Update camera aspect ratio
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
  }

  /**
   * Setup audio reactivity system
   */
  protected setupAudioReactivity(): void {
    // Audio analysis will be handled by individual worlds
    // This provides the foundation for audio-reactive objects
  }

  /**
   * Setup performance monitoring for this world
   */
  protected setupPerformanceMonitoring(): void {
    // Monitor will be updated in the render loop
    setInterval(() => {
      this.performanceMonitor = webglEngine.getMetrics();
      this.adaptToPerformance();
    }, 1000);
  }

  /**
   * Adapt world complexity based on performance
   */
  protected adaptToPerformance(): void {
    const currentFPS = this.performanceMonitor.fps;
    const target = this.frameTarget;
    
    if (currentFPS < target * 0.8 && this.qualityLevel !== 'low') {
      this.downgradeQuality();
    } else if (currentFPS > target * 1.2 && this.qualityLevel !== 'high') {
      this.upgradeQuality();
    }
  }

  /**
   * Downgrade visual quality for performance
   */
  protected downgradeQuality(): void {
    if (this.qualityLevel === 'high') {
      this.qualityLevel = 'medium';
    } else if (this.qualityLevel === 'medium') {
      this.qualityLevel = 'low';
    }
    
    this.applyQualitySettings();
    console.log(`${this.config.name} quality downgraded to: ${this.qualityLevel}`);
  }

  /**
   * Upgrade visual quality when performance allows
   */
  protected upgradeQuality(): void {
    if (this.qualityLevel === 'low') {
      this.qualityLevel = 'medium';
    } else if (this.qualityLevel === 'medium') {
      this.qualityLevel = 'high';
    }
    
    this.applyQualitySettings();
    console.log(`${this.config.name} quality upgraded to: ${this.qualityLevel}`);
  }

  /**
   * Apply quality settings to scene objects
   */
  protected applyQualitySettings(): void {
    // Update particle counts
    this.particleSystems.forEach((particles, name) => {
      const geometry = particles.geometry as THREE.BufferGeometry;
      const positions = geometry.getAttribute('position');
      
      let newCount = 0;
      switch (this.qualityLevel) {
        case 'low': newCount = Math.floor(positions.count * 0.3); break;
        case 'medium': newCount = Math.floor(positions.count * 0.6); break;
        case 'high': newCount = positions.count; break;
      }
      
      particles.geometry.setDrawRange(0, newCount);
    });
    
    // Update shadow quality
    this.scene.traverse((object) => {
      if (object instanceof THREE.Light && object.castShadow) {
        const mapSize = this.qualityLevel === 'high' ? 2048 : 
                       this.qualityLevel === 'medium' ? 1024 : 512;
        if (object.shadow?.mapSize) {
          object.shadow.mapSize.width = mapSize;
          object.shadow.mapSize.height = mapSize;
        }
      }
    });
  }

  /**
   * Create particle system with world-specific configuration
   */
  protected createParticleSystem(name: string, config: ParticleSystemConfig): THREE.Points {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(config.count * 3);
    const colors = new Float32Array(config.count * 3);
    const sizes = new Float32Array(config.count);
    
    // Initialize particle data
    for (let i = 0; i < config.count; i++) {
      const i3 = i * 3;
      
      // Random positions
      positions[i3] = (Math.random() - 0.5) * 20;
      positions[i3 + 1] = (Math.random() - 0.5) * 20;
      positions[i3 + 2] = (Math.random() - 0.5) * 20;
      
      // Colors
      colors[i3] = config.color.r;
      colors[i3 + 1] = config.color.g;
      colors[i3 + 2] = config.color.b;
      
      // Sizes
      sizes[i] = config.size * (0.5 + Math.random() * 0.5);
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    
    // Particle material
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: this.uniformTime,
        opacity: { value: config.opacity }
      },
      vertexShader: this.getParticleVertexShader(),
      fragmentShader: this.getParticleFragmentShader(),
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    
    const particles = new THREE.Points(geometry, material);
    this.particleSystems.set(name, particles);
    this.scene.add(particles);
    
    return particles;
  }

  /**
   * Basic particle vertex shader
   */
  protected getParticleVertexShader(): string {
    return `
      attribute float size;
      uniform float time;
      varying vec3 vColor;
      
      void main() {
        vColor = color;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = size * (300.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `;
  }

  /**
   * Basic particle fragment shader
   */
  protected getParticleFragmentShader(): string {
    return `
      uniform float opacity;
      varying vec3 vColor;
      
      void main() {
        float r = distance(gl_PointCoord, vec2(0.5));
        if (r > 0.5) discard;
        
        float alpha = (1.0 - r * 2.0) * opacity;
        gl_FragColor = vec4(vColor, alpha);
      }
    `;
  }

  /**
   * Main update loop - called every frame
   */
  update(audioData: AudioAnalysis): void {
    if (!this.isPlaying) return;
    
    const deltaTime = this.clock.getDelta();
    this.uniformTime.value = this.clock.getElapsedTime();
    
    // Update animation mixers
    this.mixers.forEach(mixer => mixer.update(deltaTime));
    
    // Update world-specific logic
    this.updateWorld(deltaTime, audioData);
    
    // Update audio reactive objects
    this.updateAudioReactiveObjects(audioData);
    
    // Handle audio events
    this.handleAudioEvent(audioData);
  }

  /**
   * Update audio reactive objects
   */
  protected updateAudioReactiveObjects(audioData: AudioAnalysis): void {
    // Base implementation - override in specific worlds
    this.audioReactiveObjects.forEach(object => {
      if (object.userData.audioReactive) {
        const scale = 1 + audioData.energy.total * 0.2;
        object.scale.set(scale, scale, scale);
      }
    });
  }

  /**
   * Render the scene
   */
  render(): void {
    if (!this.renderer) {
      this.renderer = webglEngine.getRenderer();
    }
    
    if (this.renderer) {
      this.renderer.render(this.scene, this.camera);
    }
  }

  /**
   * Handle window resize
   */
  resize(width: number, height: number): void {
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    
    if (this.renderer) {
      this.renderer.setSize(width, height);
    }
  }

  /**
   * Start the world experience
   */
  start(): void {
    this.isPlaying = true;
    this.clock.start();
  }

  /**
   * Stop the world experience
   */
  stop(): void {
    this.isPlaying = false;
    this.clock.stop();
  }

  /**
   * Get scene reference for external access
   */
  getScene(): THREE.Scene {
    return this.scene;
  }

  /**
   * Get camera reference for external access
   */
  getCamera(): THREE.PerspectiveCamera {
    return this.camera;
  }

  /**
   * Get current performance metrics
   */
  getPerformanceMetrics(): PerformanceMetrics {
    return this.performanceMonitor;
  }
}

export default WorldScene;
export type { InteractionEvent, CinematicCamera, WorldLighting, ParticleSystemConfig };