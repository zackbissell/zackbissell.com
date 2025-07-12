/**
 * A24 Cinematic Controller
 * Revolutionary cinematic framework for immersive storytelling
 * Transforms 3D worlds into film-quality experiences
 */

import * as THREE from 'three';
import { spatialAudio } from '../spatial-audio';
import { haptics } from '../haptics';
import type { AudioAnalysis } from '../webgl-engine';

export type CameraMode = 'static' | 'orbit' | 'track' | 'handheld' | 'dolly' | 'crane' | 'dutch';
export type CinematicMood = 'tense' | 'intimate' | 'chaotic' | 'transcendent' | 'mysterious' | 'emotional';
export type WorldTheme = 'disco' | 'nostalgia' | 'rolemodel' | 'elevation';

interface CameraConfiguration {
  position: THREE.Vector3;
  target: THREE.Vector3;
  fov: number;
  near: number;
  far: number;
  constraints?: {
    minDistance?: number;
    maxDistance?: number;
    minPolarAngle?: number;
    maxPolarAngle?: number;
    enableZoom?: boolean;
    enablePan?: boolean;
    enableRotate?: boolean;
  };
}

interface CinematicShot {
  name: string;
  mode: CameraMode;
  config: CameraConfiguration;
  duration?: number; // seconds, undefined for manual control
  easing?: (t: number) => number;
  audioReactive?: boolean;
  emotionalWeight?: number;
}

interface CameraTransition {
  from: CameraConfiguration;
  to: CameraConfiguration;
  duration: number;
  easing: (t: number) => number;
  onComplete?: () => void;
}

interface CinematicSequence {
  name: string;
  shots: CinematicShot[];
  triggers: {
    audio?: { energy: number; onset: boolean };
    interaction?: string;
    time?: number;
  }[];
}

export class CinematicController {
  private camera: THREE.PerspectiveCamera;
  private scene: THREE.Scene;
  private worldTheme: WorldTheme;
  
  // Camera system
  private currentMode: CameraMode = 'static';
  private currentShot: CinematicShot | null = null;
  private shotSequences: Map<string, CinematicSequence> = new Map();
  
  // Transition system
  private activeTransition: CameraTransition | null = null;
  private transitionProgress = 0;
  private transitionStartTime = 0;
  
  // Camera behavior
  private cameraShake = { intensity: 0, frequency: 0, decay: 0.95 };
  private breathingIntensity = 0;
  private audioReactivity = 1.0;
  private emotionalState: CinematicMood = 'mysterious';
  
  // Performance tracking
  private performanceMode: 'high' | 'medium' | 'low' = 'high';
  private lastFrameTime = 0;
  private smoothCamera = true;
  
  // World-specific configurations
  private worldConfigurations: Map<WorldTheme, CameraConfiguration[]> = new Map();
  
  constructor(
    camera: THREE.PerspectiveCamera,
    scene: THREE.Scene,
    worldTheme: WorldTheme
  ) {
    this.camera = camera;
    this.scene = scene;
    this.worldTheme = worldTheme;
    
    this.initializeWorldConfigurations();
    this.setupCinematicSequences();
    this.setInitialCameraMode();
    
    console.log(`🎬 A24 Cinematic Controller initialized for ${worldTheme}`);
  }

  /**
   * Initialize world-specific camera configurations
   */
  private initializeWorldConfigurations(): void {
    // Disco Ascension - Government Thriller Aesthetic
    this.worldConfigurations.set('disco', [
      {
        position: new THREE.Vector3(0, 8, 15),
        target: new THREE.Vector3(0, 0, 0),
        fov: 55,
        near: 0.1,
        far: 1000
      },
      {
        position: new THREE.Vector3(12, 6, 8),
        target: new THREE.Vector3(0, 2, 0),
        fov: 35,
        near: 0.1,
        far: 1000
      },
      {
        position: new THREE.Vector3(-8, 12, -8),
        target: new THREE.Vector3(0, 0, 0),
        fov: 75,
        near: 0.1,
        far: 1000
      }
    ]);

    // Nostalgia Trap - Intimate Emotional Cinema
    this.worldConfigurations.set('nostalgia', [
      {
        position: new THREE.Vector3(0, 3, 8),
        target: new THREE.Vector3(0, 2, 0),
        fov: 85,
        near: 0.1,
        far: 1000
      },
      {
        position: new THREE.Vector3(5, 4, 5),
        target: new THREE.Vector3(0, 2, 0),
        fov: 65,
        near: 0.1,
        far: 1000
      },
      {
        position: new THREE.Vector3(-3, 6, 10),
        target: new THREE.Vector3(0, 3, 0),
        fov: 45,
        near: 0.1,
        far: 1000
      }
    ]);

    // Role Model - Industrial Chaos Cinema
    this.worldConfigurations.set('rolemodel', [
      {
        position: new THREE.Vector3(8, 8, 20),
        target: new THREE.Vector3(0, 4, 0),
        fov: 75,
        near: 0.1,
        far: 1000
      },
      {
        position: new THREE.Vector3(-12, 15, 10),
        target: new THREE.Vector3(0, 6, 0),
        fov: 55,
        near: 0.1,
        far: 1000
      },
      {
        position: new THREE.Vector3(6, 2, 12),
        target: new THREE.Vector3(0, 8, 0),
        fov: 95,
        near: 0.1,
        far: 1000
      }
    ]);

    // Elevation - Transcendent Journey Cinema
    this.worldConfigurations.set('elevation', [
      {
        position: new THREE.Vector3(0, 15, 25),
        target: new THREE.Vector3(0, 10, 0),
        fov: 55,
        near: 0.1,
        far: 1000
      },
      {
        position: new THREE.Vector3(0, 25, 15),
        target: new THREE.Vector3(0, 15, 0),
        fov: 45,
        near: 0.1,
        far: 1000
      },
      {
        position: new THREE.Vector3(-10, 35, 20),
        target: new THREE.Vector3(0, 20, 0),
        fov: 65,
        near: 0.1,
        far: 1000
      }
    ]);
  }

  /**
   * Setup cinematic sequences for different narrative moments
   */
  private setupCinematicSequences(): void {
    // Universal establishing sequence
    this.shotSequences.set('establishing', {
      name: 'World Introduction',
      shots: [
        {
          name: 'Wide Establishing',
          mode: 'static',
          config: this.worldConfigurations.get(this.worldTheme)![0],
          duration: 3,
          easing: this.easeInOutCubic
        },
        {
          name: 'Medium Shot',
          mode: 'dolly',
          config: this.worldConfigurations.get(this.worldTheme)![1],
          duration: 2,
          easing: this.easeInOutQuad
        }
      ],
      triggers: []
    });

    // Audio-reactive sequence
    this.shotSequences.set('audio-reactive', {
      name: 'Music Visualization',
      shots: [
        {
          name: 'Beat Response',
          mode: 'handheld',
          config: this.worldConfigurations.get(this.worldTheme)![2],
          audioReactive: true,
          emotionalWeight: 0.8
        }
      ],
      triggers: [
        { audio: { energy: 0.7, onset: true } }
      ]
    });

    // Emotional moments sequence
    this.shotSequences.set('emotional', {
      name: 'Emotional Peaks',
      shots: [
        {
          name: 'Close Emotional',
          mode: 'track',
          config: {
            ...this.worldConfigurations.get(this.worldTheme)![1],
            fov: 35
          },
          duration: 4,
          easing: this.easeInOutSine,
          emotionalWeight: 1.0
        }
      ],
      triggers: []
    });
  }

  /**
   * Set initial camera mode based on world theme
   */
  private setInitialCameraMode(): void {
    const config = this.worldConfigurations.get(this.worldTheme)![0];
    this.applyCameraConfiguration(config);
    
    switch (this.worldTheme) {
      case 'disco':
        this.currentMode = 'static';
        this.emotionalState = 'tense';
        break;
      case 'nostalgia':
        this.currentMode = 'orbit';
        this.emotionalState = 'intimate';
        break;
      case 'rolemodel':
        this.currentMode = 'handheld';
        this.emotionalState = 'chaotic';
        break;
      case 'elevation':
        this.currentMode = 'crane';
        this.emotionalState = 'transcendent';
        break;
    }
  }

  /**
   * Apply camera configuration with smooth transition
   */
  private applyCameraConfiguration(config: CameraConfiguration): void {
    this.camera.position.copy(config.position);
    this.camera.lookAt(config.target);
    this.camera.fov = config.fov;
    this.camera.near = config.near;
    this.camera.far = config.far;
    this.camera.updateProjectionMatrix();
  }

  /**
   * Start a cinematic sequence
   */
  startSequence(sequenceName: string): void {
    const sequence = this.shotSequences.get(sequenceName);
    if (!sequence) {
      console.warn(`Cinematic sequence '${sequenceName}' not found`);
      return;
    }

    if (sequence.shots.length > 0) {
      this.startShot(sequence.shots[0]);
    }

    console.log(`🎬 Starting cinematic sequence: ${sequence.name}`);
  }

  /**
   * Start a specific shot
   */
  private startShot(shot: CinematicShot): void {
    this.currentShot = shot;
    this.currentMode = shot.mode;

    if (shot.duration) {
      this.transitionToConfiguration(shot.config, shot.duration, shot.easing);
    } else {
      this.applyCameraConfiguration(shot.config);
    }

    // Trigger cinematic audio feedback
    spatialAudio.trigger({
      type: 'cinematic-transition',
      position: { x: 0, y: 0, z: 0 },
      intensity: shot.emotionalWeight || 0.5
    });
  }

  /**
   * Transition camera to new configuration
   */
  private transitionToConfiguration(
    targetConfig: CameraConfiguration,
    duration: number,
    easing?: (t: number) => number
  ): void {
    this.activeTransition = {
      from: {
        position: this.camera.position.clone(),
        target: new THREE.Vector3(), // Will be calculated from current lookAt
        fov: this.camera.fov,
        near: this.camera.near,
        far: this.camera.far
      },
      to: targetConfig,
      duration,
      easing: easing || this.easeInOutQuad
    };

    this.transitionProgress = 0;
    this.transitionStartTime = performance.now();
  }

  /**
   * Update cinematic system
   */
  update(deltaTime: number, audioData?: AudioAnalysis): void {
    const currentTime = performance.now();
    
    // Update active transition
    if (this.activeTransition) {
      this.updateTransition(currentTime);
    }

    // Update camera mode behaviors
    this.updateCameraMode(deltaTime, audioData);

    // Update camera shake
    this.updateCameraShake(deltaTime);

    // Update breathing effect
    this.updateBreathing(deltaTime);

    // Check for sequence triggers
    if (audioData) {
      this.checkSequenceTriggers(audioData);
    }

    this.lastFrameTime = currentTime;
  }

  /**
   * Update camera transition
   */
  private updateTransition(currentTime: number): void {
    if (!this.activeTransition) return;

    const elapsed = currentTime - this.transitionStartTime;
    const progress = Math.min(elapsed / (this.activeTransition.duration * 1000), 1);
    
    this.transitionProgress = this.activeTransition.easing(progress);

    // Interpolate position
    this.camera.position.lerpVectors(
      this.activeTransition.from.position,
      this.activeTransition.to.position,
      this.transitionProgress
    );

    // Interpolate target (lookAt)
    const currentTarget = new THREE.Vector3().lerpVectors(
      this.activeTransition.from.target,
      this.activeTransition.to.target,
      this.transitionProgress
    );
    this.camera.lookAt(currentTarget);

    // Interpolate fov
    this.camera.fov = THREE.MathUtils.lerp(
      this.activeTransition.from.fov,
      this.activeTransition.to.fov,
      this.transitionProgress
    );
    this.camera.updateProjectionMatrix();

    // Complete transition
    if (progress >= 1) {
      this.activeTransition.onComplete?.();
      this.activeTransition = null;
    }
  }

  /**
   * Update camera mode-specific behaviors
   */
  private updateCameraMode(deltaTime: number, audioData?: AudioAnalysis): void {
    if (!audioData) return;

    switch (this.currentMode) {
      case 'handheld':
        this.updateHandheldMode(deltaTime, audioData);
        break;
      case 'orbit':
        this.updateOrbitMode(deltaTime, audioData);
        break;
      case 'crane':
        this.updateCraneMode(deltaTime, audioData);
        break;
      case 'dolly':
        this.updateDollyMode(deltaTime, audioData);
        break;
      case 'dutch':
        this.updateDutchMode(deltaTime, audioData);
        break;
    }
  }

  /**
   * Handheld camera behavior - chaotic, energetic
   */
  private updateHandheldMode(deltaTime: number, audioData: AudioAnalysis): void {
    const intensity = audioData.energy.total * this.audioReactivity;
    
    this.cameraShake.intensity = intensity * 0.5;
    this.cameraShake.frequency = 2 + intensity * 8;

    // Random micro-movements
    if (Math.random() < intensity * 0.1) {
      const offset = new THREE.Vector3(
        (Math.random() - 0.5) * intensity * 0.2,
        (Math.random() - 0.5) * intensity * 0.1,
        (Math.random() - 0.5) * intensity * 0.2
      );
      this.camera.position.add(offset);
    }
  }

  /**
   * Orbit camera behavior - smooth circular movement
   */
  private updateOrbitMode(deltaTime: number, audioData: AudioAnalysis): void {
    const time = this.lastFrameTime * 0.001;
    const speed = 0.1 + audioData.energy.total * 0.2;
    
    const radius = 10 + Math.sin(time * 0.5) * 2;
    const height = 5 + Math.sin(time * 0.3) * 3;
    
    this.camera.position.x = Math.cos(time * speed) * radius;
    this.camera.position.z = Math.sin(time * speed) * radius;
    this.camera.position.y = height;
    
    this.camera.lookAt(0, 2, 0);
  }

  /**
   * Crane camera behavior - ascending/descending movements
   */
  private updateCraneMode(deltaTime: number, audioData: AudioAnalysis): void {
    const time = this.lastFrameTime * 0.001;
    const energy = audioData.energy.total;
    
    // Elevation-based movement
    const targetHeight = 15 + energy * 10;
    this.camera.position.y = THREE.MathUtils.lerp(
      this.camera.position.y,
      targetHeight,
      deltaTime * 0.5
    );
    
    // Gentle arc movement
    const arcRadius = 20 + energy * 5;
    this.camera.position.x = Math.cos(time * 0.1) * arcRadius;
    this.camera.position.z = Math.sin(time * 0.1) * arcRadius;
    
    this.camera.lookAt(0, 10, 0);
  }

  /**
   * Dolly camera behavior - forward/backward tracking
   */
  private updateDollyMode(deltaTime: number, audioData: AudioAnalysis): void {
    const energy = audioData.energy.total;
    const direction = this.camera.getWorldDirection(new THREE.Vector3());
    
    // Move closer on high energy
    const dollySpeed = energy * 2;
    this.camera.position.add(direction.multiplyScalar(dollySpeed * deltaTime));
    
    // Maintain target focus
    this.camera.lookAt(0, 2, 0);
  }

  /**
   * Dutch angle behavior - tilted cinematography
   */
  private updateDutchMode(deltaTime: number, audioData: AudioAnalysis): void {
    const intensity = audioData.energy.total;
    this.camera.rotation.z = Math.sin(this.lastFrameTime * 0.003) * intensity * 0.2;
  }

  /**
   * Update camera shake effect
   */
  private updateCameraShake(deltaTime: number): void {
    if (this.cameraShake.intensity > 0.01) {
      const time = this.lastFrameTime * 0.001;
      const shake = new THREE.Vector3(
        Math.sin(time * this.cameraShake.frequency) * this.cameraShake.intensity,
        Math.cos(time * this.cameraShake.frequency * 1.3) * this.cameraShake.intensity * 0.5,
        Math.sin(time * this.cameraShake.frequency * 0.7) * this.cameraShake.intensity
      );
      
      this.camera.position.add(shake);
      this.cameraShake.intensity *= this.cameraShake.decay;
    }
  }

  /**
   * Update breathing effect - subtle organic movement
   */
  private updateBreathing(deltaTime: number): void {
    if (this.breathingIntensity > 0) {
      const time = this.lastFrameTime * 0.001;
      const breath = Math.sin(time * 0.8) * this.breathingIntensity * 0.05;
      
      this.camera.position.y += breath;
      this.camera.rotation.x += breath * 0.01;
    }
  }

  /**
   * Check for sequence triggers based on audio
   */
  private checkSequenceTriggers(audioData: AudioAnalysis): void {
    this.shotSequences.forEach((sequence, name) => {
      sequence.triggers.forEach((trigger) => {
        if (trigger.audio) {
          if (audioData.energy.total >= trigger.audio.energy && 
              audioData.onset === trigger.audio.onset) {
            this.startSequence(name);
          }
        }
      });
    });
  }

  /**
   * Manually switch camera mode
   */
  setCameraMode(mode: CameraMode): void {
    this.currentMode = mode;
    
    // Trigger appropriate haptic feedback
    haptics.trigger({ intensity: 'light' });
    
    console.log(`🎬 Camera mode changed to: ${mode}`);
  }

  /**
   * Set emotional state affecting cinematography
   */
  setEmotionalState(state: CinematicMood): void {
    this.emotionalState = state;
    
    // Adjust camera behavior based on emotion
    switch (state) {
      case 'tense':
        this.breathingIntensity = 0.2;
        this.audioReactivity = 1.2;
        break;
      case 'intimate':
        this.breathingIntensity = 0.8;
        this.audioReactivity = 0.6;
        break;
      case 'chaotic':
        this.breathingIntensity = 0.1;
        this.audioReactivity = 1.5;
        break;
      case 'transcendent':
        this.breathingIntensity = 1.0;
        this.audioReactivity = 0.8;
        break;
    }
  }

  /**
   * Trigger camera shake manually
   */
  triggerShake(intensity: number, duration: number = 1): void {
    this.cameraShake.intensity = Math.max(this.cameraShake.intensity, intensity);
    this.cameraShake.frequency = 5 + intensity * 10;
    
    // Auto-decay
    setTimeout(() => {
      this.cameraShake.intensity *= 0.1;
    }, duration * 1000);
  }

  /**
   * Switch to specific shot configuration
   */
  switchToShot(shotIndex: number): void {
    const configs = this.worldConfigurations.get(this.worldTheme);
    if (configs && configs[shotIndex]) {
      this.transitionToConfiguration(configs[shotIndex], 1.5, this.easeInOutCubic);
    }
  }

  /**
   * Get current cinematic state
   */
  getCinematicState() {
    return {
      mode: this.currentMode,
      emotionalState: this.emotionalState,
      isTransitioning: !!this.activeTransition,
      shakeIntensity: this.cameraShake.intensity,
      breathingIntensity: this.breathingIntensity
    };
  }

  /**
   * Easing functions
   */
  private easeInOutQuad = (t: number): number => {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  };

  private easeInOutCubic = (t: number): number => {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  };

  private easeInOutSine = (t: number): number => {
    return -(Math.cos(Math.PI * t) - 1) / 2;
  };

  /**
   * Cleanup
   */
  dispose(): void {
    this.activeTransition = null;
    this.currentShot = null;
    this.shotSequences.clear();
    
    console.log('🎬 A24 Cinematic Controller disposed');
  }
}