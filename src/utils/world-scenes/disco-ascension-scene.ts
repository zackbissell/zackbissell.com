/**
 * Disco Ascension World Scene
 * Government conspiracy meets disco with Montauk Project inspiration
 * Classified facility aesthetic with glitch effects and terminal data streams
 */

import * as THREE from 'three';
import WorldScene, { type InteractionEvent } from '../world-scene';
import { spatialAudio } from '../spatial-audio';
import { haptics } from '../haptics';
import type { AudioAnalysis } from '../webgl-engine';

interface ClassifiedFragment {
  mesh: THREE.Mesh;
  velocity: THREE.Vector3;
  rotationSpeed: THREE.Vector3;
  opacity: number;
  targetOpacity: number;
  isRedacted: boolean;
}

interface TerminalStream {
  particles: THREE.Points;
  speed: number;
  direction: THREE.Vector3;
  characters: string[];
}

export class DiscoAscensionScene extends WorldScene {
  // Core elements
  private facility: THREE.Group | null = null;
  private classifiedFragments: ClassifiedFragment[] = [];
  private terminalStreams: TerminalStream[] = [];
  private glitchEffect: THREE.Mesh | null = null;
  private energyField: THREE.Mesh | null = null;
  
  // Animation state
  private glitchIntensity = 0;
  private facilityRotation = 0;
  private lastGlitchTime = 0;
  private terminalUpdateTime = 0;
  
  // Colors (Government/Disco theme)
  private readonly colors = {
    primary: new THREE.Color(0xf59e0b),      // Amber
    secondary: new THREE.Color(0xdc2626),    // Red
    warning: new THREE.Color(0xfbbf24),     // Yellow
    classified: new THREE.Color(0x1f2937),   // Dark gray
    terminal: new THREE.Color(0x10b981),     // Green terminal
  };

  constructor() {
    super('disco');
  }

  protected getDefaultCameraConfig() {
    return {
      position: new THREE.Vector3(0, 5, 15),
      target: new THREE.Vector3(0, 0, 0),
      fov: 60,
      near: 0.1,
      far: 1000,
      movementType: 'orbit' as const
    };
  }

  protected getDefaultLighting() {
    return {
      ambient: {
        color: this.colors.warning.clone().multiplyScalar(0.3),
        intensity: 0.3
      },
      directional: {
        color: this.colors.primary,
        intensity: 1.2,
        position: new THREE.Vector3(-1, 1, 1),
        castShadow: this.config.features.shadows
      },
      point: [
        {
          color: this.colors.secondary,
          intensity: 0.8,
          position: new THREE.Vector3(5, 3, 5),
          distance: 20,
          decay: 2
        },
        {
          color: this.colors.terminal,
          intensity: 0.6,
          position: new THREE.Vector3(-5, 2, -3),
          distance: 15,
          decay: 2
        }
      ]
    };
  }

  async initializeWorld(): Promise<void> {
    // Create government facility structure
    await this.createFacilityStructure();
    
    // Add classified document fragments
    this.createClassifiedFragments();
    
    // Create terminal data streams
    this.createTerminalStreams();
    
    // Add energy field
    this.createEnergyField();
    
    // Create glitch effect overlay
    this.createGlitchEffect();
    
    // Setup audio reactive elements
    this.setupAudioReactivity();
    
    console.log('Disco Ascension facility initialized - CLASSIFIED LEVEL ALPHA');
  }

  private async createFacilityStructure(): Promise<void> {
    this.facility = new THREE.Group();
    
    // Central command structure (brutalist architecture)
    const centralGeometry = new THREE.BoxGeometry(8, 4, 8);
    const centralMaterial = new THREE.MeshPhongMaterial({
      color: this.colors.classified,
      transparent: true,
      opacity: 0.8,
      emissive: this.colors.primary.clone().multiplyScalar(0.1)
    });
    
    const centralStructure = new THREE.Mesh(centralGeometry, centralMaterial);
    this.facility.add(centralStructure);
    
    // Antenna/transmission towers
    for (let i = 0; i < 4; i++) {
      const angle = (i / 4) * Math.PI * 2;
      const radius = 12;
      
      const antennaGeometry = new THREE.CylinderGeometry(0.1, 0.3, 15, 8);
      const antennaMaterial = new THREE.MeshPhongMaterial({
        color: this.colors.warning,
        emissive: this.colors.warning.clone().multiplyScalar(0.2)
      });
      
      const antenna = new THREE.Mesh(antennaGeometry, antennaMaterial);
      antenna.position.set(
        Math.cos(angle) * radius,
        7.5,
        Math.sin(angle) * radius
      );
      
      this.facility.add(antenna);
      this.audioReactiveObjects.push(antenna);
    }
    
    // Warning lights
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const radius = 6;
      
      const lightGeometry = new THREE.SphereGeometry(0.3, 8, 8);
      const lightMaterial = new THREE.MeshPhongMaterial({
        color: this.colors.secondary,
        emissive: this.colors.secondary.clone().multiplyScalar(0.8),
        transparent: true,
        opacity: 0.9
      });
      
      const warningLight = new THREE.Mesh(lightGeometry, lightMaterial);
      warningLight.position.set(
        Math.cos(angle) * radius,
        3,
        Math.sin(angle) * radius
      );
      
      this.facility.add(warningLight);
      this.audioReactiveObjects.push(warningLight);
    }
    
    this.scene.add(this.facility);
  }

  private createClassifiedFragments(): void {
    const fragmentCount = this.qualityLevel === 'high' ? 50 : 
                         this.qualityLevel === 'medium' ? 25 : 12;
    
    for (let i = 0; i < fragmentCount; i++) {
      const geometry = new THREE.PlaneGeometry(2, 1.5);
      
      // Create classified document texture
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 192;
      const ctx = canvas.getContext('2d')!;
      
      // Document background
      ctx.fillStyle = '#f5f5f5';
      ctx.fillRect(0, 0, 256, 192);
      
      // Classified header
      ctx.fillStyle = '#dc2626';
      ctx.fillRect(0, 0, 256, 30);
      ctx.fillStyle = 'white';
      ctx.font = '14px monospace';
      ctx.fillText('CLASSIFIED - EYES ONLY', 10, 20);
      
      // Redacted content
      ctx.fillStyle = '#000000';
      for (let line = 0; line < 8; line++) {
        const y = 50 + line * 18;
        const isRedacted = Math.random() > 0.3;
        
        if (isRedacted) {
          ctx.fillRect(10, y - 8, 180 + Math.random() * 60, 12);
        } else {
          ctx.font = '10px monospace';
          ctx.fillText('GROOVE SINGULARITY EVENT DETECTED', 10, y);
        }
      }
      
      const texture = new THREE.CanvasTexture(canvas);
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 0.8,
        side: THREE.DoubleSide
      });
      
      const fragment = new THREE.Mesh(geometry, material);
      
      // Random position around facility
      const angle = Math.random() * Math.PI * 2;
      const radius = 8 + Math.random() * 12;
      const height = -2 + Math.random() * 15;
      
      fragment.position.set(
        Math.cos(angle) * radius,
        height,
        Math.sin(angle) * radius
      );
      
      fragment.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      
      const classifiedFragment: ClassifiedFragment = {
        mesh: fragment,
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.02
        ),
        rotationSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.02
        ),
        opacity: 0.8,
        targetOpacity: 0.8,
        isRedacted: Math.random() > 0.7
      };
      
      this.classifiedFragments.push(classifiedFragment);
      this.scene.add(fragment);
    }
  }

  private createTerminalStreams(): void {
    const streamCount = this.qualityLevel === 'high' ? 6 : 
                       this.qualityLevel === 'medium' ? 4 : 2;
    
    for (let i = 0; i < streamCount; i++) {
      const particleCount = 100;
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);
      
      // Initialize terminal characters
      const characters = [];
      for (let j = 0; j < particleCount; j++) {
        characters.push(String.fromCharCode(33 + Math.floor(Math.random() * 94)));
      }
      
      for (let j = 0; j < particleCount; j++) {
        const j3 = j * 3;
        
        // Vertical stream positioning
        positions[j3] = (Math.random() - 0.5) * 30;     // x
        positions[j3 + 1] = Math.random() * 20 - 5;     // y
        positions[j3 + 2] = (Math.random() - 0.5) * 30; // z
        
        // Terminal green color with fade
        const intensity = Math.random();
        colors[j3] = this.colors.terminal.r * intensity;
        colors[j3 + 1] = this.colors.terminal.g * intensity;
        colors[j3 + 2] = this.colors.terminal.b * intensity;
      }
      
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      
      const material = new THREE.PointsMaterial({
        size: 2,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
      });
      
      const particles = new THREE.Points(geometry, material);
      
      const stream: TerminalStream = {
        particles,
        speed: 0.1 + Math.random() * 0.1,
        direction: new THREE.Vector3(0, -1, 0),
        characters
      };
      
      this.terminalStreams.push(stream);
      this.scene.add(particles);
    }
  }

  private createEnergyField(): void {
    const geometry = new THREE.SphereGeometry(25, 32, 32);
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: this.uniformTime,
        glitchIntensity: { value: 0 },
        primaryColor: { value: this.colors.primary },
        secondaryColor: { value: this.colors.secondary }
      },
      vertexShader: `
        uniform float time;
        uniform float glitchIntensity;
        varying vec3 vPosition;
        varying vec3 vNormal;
        
        void main() {
          vPosition = position;
          vNormal = normal;
          
          vec3 pos = position;
          
          // Energy field distortion
          float wave = sin(pos.y * 0.1 + time * 2.0) * 0.5;
          pos += normal * wave * 0.3;
          
          // Glitch displacement
          if (glitchIntensity > 0.5) {
            pos += normal * sin(time * 50.0) * glitchIntensity * 0.2;
          }
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform float glitchIntensity;
        uniform vec3 primaryColor;
        uniform vec3 secondaryColor;
        varying vec3 vPosition;
        varying vec3 vNormal;
        
        void main() {
          vec3 color = mix(primaryColor, secondaryColor, sin(time + vPosition.y * 0.1) * 0.5 + 0.5);
          
          // Energy grid pattern
          float grid = sin(vPosition.x * 10.0) * sin(vPosition.z * 10.0);
          color += vec3(0.1) * grid;
          
          // Fresnel glow
          float fresnel = 1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0));
          color *= fresnel;
          
          float opacity = 0.1 + glitchIntensity * 0.3;
          gl_FragColor = vec4(color, opacity);
        }
      `,
      transparent: true,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending
    });
    
    this.energyField = new THREE.Mesh(geometry, material);
    this.scene.add(this.energyField);
  }

  private createGlitchEffect(): void {
    // Will be used for full-screen post-processing glitch
    console.log('Glitch effect system initialized');
  }

  private setupAudioReactivity(): void {
    // Already added objects to audioReactiveObjects array
    console.log(`Audio reactive objects: ${this.audioReactiveObjects.length}`);
  }

  updateWorld(deltaTime: number, audioData: AudioAnalysis): void {
    const time = this.clock.getElapsedTime();
    
    // Update facility rotation
    if (this.facility) {
      this.facilityRotation += deltaTime * 0.1;
      this.facility.rotation.y = this.facilityRotation;
    }
    
    // Update classified fragments
    this.updateClassifiedFragments(deltaTime);
    
    // Update terminal streams
    this.updateTerminalStreams(deltaTime);
    
    // Update energy field
    if (this.energyField) {
      const material = this.energyField.material as THREE.ShaderMaterial;
      material.uniforms.glitchIntensity.value = this.glitchIntensity;
    }
    
    // Audio-reactive glitch effect
    if (audioData.energy.total > 0.7 && time - this.lastGlitchTime > 0.1) {
      this.triggerGlitch(audioData.energy.total);
      this.lastGlitchTime = time;
    }
    
    // Decay glitch intensity
    this.glitchIntensity *= 0.95;
  }

  private updateClassifiedFragments(deltaTime: number): void {
    this.classifiedFragments.forEach((fragment) => {
      // Float movement
      fragment.mesh.position.add(fragment.velocity);
      fragment.mesh.rotation.x += fragment.rotationSpeed.x;
      fragment.mesh.rotation.y += fragment.rotationSpeed.y;
      fragment.mesh.rotation.z += fragment.rotationSpeed.z;
      
      // Boundary check - keep fragments in area
      if (fragment.mesh.position.length() > 25) {
        fragment.velocity.multiplyScalar(-0.1);
      }
      
      // Update opacity
      const material = fragment.mesh.material as THREE.MeshBasicMaterial;
      fragment.opacity = THREE.MathUtils.lerp(
        fragment.opacity,
        fragment.targetOpacity,
        deltaTime * 2
      );
      material.opacity = fragment.opacity;
    });
  }

  private updateTerminalStreams(deltaTime: number): void {
    this.terminalStreams.forEach((stream) => {
      const positions = stream.particles.geometry.getAttribute('position');
      const colors = stream.particles.geometry.getAttribute('color');
      
      for (let i = 0; i < positions.count; i++) {
        const i3 = i * 3;
        
        // Move particles down
        positions.array[i3 + 1] -= stream.speed;
        
        // Reset particles at top when they reach bottom
        if (positions.array[i3 + 1] < -10) {
          positions.array[i3 + 1] = 15;
          positions.array[i3] = (Math.random() - 0.5) * 30;
          positions.array[i3 + 2] = (Math.random() - 0.5) * 30;
          
          // Update character and color
          const intensity = Math.random();
          colors.array[i3] = this.colors.terminal.r * intensity;
          colors.array[i3 + 1] = this.colors.terminal.g * intensity;
          colors.array[i3 + 2] = this.colors.terminal.b * intensity;
        }
      }
      
      positions.needsUpdate = true;
      colors.needsUpdate = true;
    });
  }

  private triggerGlitch(intensity: number): void {
    this.glitchIntensity = Math.min(1.0, intensity);
    
    // Flash classified fragments
    this.classifiedFragments.forEach((fragment) => {
      if (Math.random() < intensity) {
        fragment.targetOpacity = Math.random() > 0.5 ? 0.1 : 1.0;
      }
    });
    
    // Spatial audio feedback
    spatialAudio.trigger({
      type: 'glitch',
      position: { x: 0, y: 0, z: 0 },
      intensity: intensity
    });
    
    // Haptic feedback
    haptics.trigger({ intensity: 'medium' });
  }

  handleInteraction(event: InteractionEvent): void {
    if (event.type === 'click' && event.worldPosition) {
      // Check if user clicked on classified fragment
      this.classifiedFragments.forEach((fragment) => {
        const distance = fragment.mesh.position.distanceTo(event.worldPosition!);
        if (distance < 3) {
          // "Declassify" the fragment temporarily
          fragment.targetOpacity = 1.0;
          
          // Trigger security alert
          this.triggerGlitch(0.8);
          
          spatialAudio.ui.warningAlert();
          haptics.trigger({ intensity: 'strong' });
        }
      });
    }
  }

  handleAudioEvent(audioData: AudioAnalysis): void {
    // React to beat onsets
    if (audioData.onset) {
      this.triggerGlitch(audioData.energy.total * 0.5);
    }
    
    // Sync warning lights to bass
    this.audioReactiveObjects.forEach((object, index) => {
      if (object.userData.audioReactive !== false) {
        const bassIntensity = audioData.energy.bass;
        const scale = 1 + bassIntensity * 0.3;
        object.scale.set(scale, scale, scale);
        
        // Flash emissive on strong bass
        if (bassIntensity > 0.7) {
          const material = (object as THREE.Mesh).material as THREE.MeshPhongMaterial;
          if (material.emissive) {
            material.emissive.multiplyScalar(1 + bassIntensity);
          }
        }
      }
    });
  }

  dispose(): void {
    // Clean up classified fragments
    this.classifiedFragments.forEach((fragment) => {
      this.scene.remove(fragment.mesh);
      fragment.mesh.geometry.dispose();
      (fragment.mesh.material as THREE.Material).dispose();
    });
    
    // Clean up terminal streams
    this.terminalStreams.forEach((stream) => {
      this.scene.remove(stream.particles);
      stream.particles.geometry.dispose();
      (stream.particles.material as THREE.Material).dispose();
    });
    
    // Clean up other objects
    if (this.facility) {
      this.scene.remove(this.facility);
    }
    
    if (this.energyField) {
      this.scene.remove(this.energyField);
      this.energyField.geometry.dispose();
      (this.energyField.material as THREE.Material).dispose();
    }
    
    console.log('Disco Ascension facility secured and disposed');
  }
}