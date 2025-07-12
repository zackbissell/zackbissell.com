/**
 * Nostalgia Trap World Scene
 * Emotional vulnerability journey with heartbreak introspection
 * Purple-pink-amber gradients with mood-responsive particle physics
 */

import * as THREE from 'three';
import WorldScene, { type InteractionEvent } from '../world-scene';
import { spatialAudio } from '../spatial-audio';
import { haptics } from '../haptics';
import type { AudioAnalysis } from '../webgl-engine';

interface EmotionalParticle {
  mesh: THREE.Mesh;
  velocity: THREE.Vector3;
  emotionalState: 'glow' | 'ecstasy' | 'crash';
  lifespan: number;
  maxLifespan: number;
  intensity: number;
  targetIntensity: number;
}

interface MemoryFragment {
  mesh: THREE.Mesh;
  rotation: THREE.Vector3;
  emotionalWeight: number;
  glowIntensity: number;
  phase: 'forming' | 'stable' | 'fading';
}

interface HeartbeatPulse {
  mesh: THREE.Mesh;
  scale: number;
  targetScale: number;
  pulseRate: number;
  intensity: number;
}

export class NostalgiaTrapScene extends WorldScene {
  // Core emotional elements
  private emotionalParticles: EmotionalParticle[] = [];
  private memoryFragments: MemoryFragment[] = [];
  private heartbeatPulses: HeartbeatPulse[] = [];
  private emotionalField: THREE.Mesh | null = null;
  private tearDrops: THREE.Points | null = null;
  
  // Emotional state tracking
  private currentMood: 'missing' | 'dancing' | 'over_it' | 'confused' = 'missing';
  private emotionalIntensity = 0.5;
  private heartbeatRate = 60; // BPM
  private lastHeartbeat = 0;
  
  // Three-act structure
  private currentAct: 'glow' | 'ecstasy' | 'crash' = 'glow';
  private actTransitionTime = 0;
  private actDuration = 30; // seconds per act
  
  // Colors (Emotional vulnerability theme)
  private readonly colors = {
    primary: new THREE.Color(0xa855f7),      // Purple
    secondary: new THREE.Color(0xec4899),    // Pink
    tertiary: new THREE.Color(0xf59e0b),     // Amber
    heartbreak: new THREE.Color(0xdc2626),   // Red
    healing: new THREE.Color(0x10b981),      // Green
    memory: new THREE.Color(0x6366f1),       // Indigo
    tear: new THREE.Color(0x3b82f6),         // Blue
  };

  constructor() {
    super('nostalgia');
  }

  protected getDefaultCameraConfig() {
    return {
      position: new THREE.Vector3(0, 3, 12),
      target: new THREE.Vector3(0, 0, 0),
      fov: 70,
      near: 0.1,
      far: 1000,
      movementType: 'orbit' as const
    };
  }

  protected getDefaultLighting() {
    return {
      ambient: {
        color: this.colors.primary.clone().multiplyScalar(0.4),
        intensity: 0.6
      },
      directional: {
        color: this.colors.secondary,
        intensity: 0.8,
        position: new THREE.Vector3(1, 1, 0.5),
        castShadow: this.config.features.shadows
      },
      point: [
        {
          color: this.colors.tertiary,
          intensity: 0.7,
          position: new THREE.Vector3(0, 5, 0),
          distance: 20,
          decay: 2
        },
        {
          color: this.colors.memory,
          intensity: 0.5,
          position: new THREE.Vector3(-8, 2, -8),
          distance: 15,
          decay: 2
        }
      ]
    };
  }

  async initializeWorld(): Promise<void> {
    // Create emotional particle system
    this.createEmotionalParticles();
    
    // Add memory fragments
    this.createMemoryFragments();
    
    // Create heartbeat visualization
    this.createHeartbeatPulses();
    
    // Add emotional field background
    this.createEmotionalField();
    
    // Create tear drop effect
    this.createTearDrops();
    
    // Setup mood-responsive elements
    this.setupMoodResponsivity();
    
    console.log('Nostalgia Trap emotional landscape initialized 💜');
  }

  private createEmotionalParticles(): void {
    const particleCount = this.qualityLevel === 'high' ? 80 : 
                         this.qualityLevel === 'medium' ? 40 : 20;
    
    for (let i = 0; i < particleCount; i++) {
      const geometry = new THREE.SphereGeometry(0.1 + Math.random() * 0.2, 8, 8);
      
      // Emotional particle material with glow
      const material = new THREE.MeshPhongMaterial({
        color: this.getEmotionalColor(),
        transparent: true,
        opacity: 0.7,
        emissive: this.getEmotionalColor().multiplyScalar(0.3)
      });
      
      const particle = new THREE.Mesh(geometry, material);
      
      // Random position in emotional space
      particle.position.set(
        (Math.random() - 0.5) * 20,
        Math.random() * 10 - 2,
        (Math.random() - 0.5) * 20
      );
      
      const emotionalParticle: EmotionalParticle = {
        mesh: particle,
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.02,
          Math.random() * 0.01,
          (Math.random() - 0.5) * 0.02
        ),
        emotionalState: this.currentAct,
        lifespan: Math.random() * 10 + 5,
        maxLifespan: Math.random() * 10 + 5,
        intensity: Math.random(),
        targetIntensity: Math.random()
      };
      
      this.emotionalParticles.push(emotionalParticle);
      this.scene.add(particle);
      this.audioReactiveObjects.push(particle);
    }
  }

  private createMemoryFragments(): void {
    const fragmentCount = this.qualityLevel === 'high' ? 12 : 
                         this.qualityLevel === 'medium' ? 8 : 4;
    
    for (let i = 0; i < fragmentCount; i++) {
      // Create memory fragment as translucent photo frame
      const geometry = new THREE.PlaneGeometry(3, 2);
      
      // Create memory texture (gradient with photo frame)
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 171;
      const ctx = canvas.getContext('2d')!;
      
      // Memory gradient background
      const gradient = ctx.createLinearGradient(0, 0, 256, 171);
      gradient.addColorStop(0, '#a855f7');
      gradient.addColorStop(0.5, '#ec4899');
      gradient.addColorStop(1, '#f59e0b');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 256, 171);
      
      // Add photo frame border
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.lineWidth = 8;
      ctx.strokeRect(10, 10, 236, 151);
      
      // Add subtle text
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.font = '12px serif';
      ctx.textAlign = 'center';
      ctx.fillText('a memory we shared...', 128, 90);
      
      const texture = new THREE.CanvasTexture(canvas);
      const material = new THREE.MeshPhongMaterial({
        map: texture,
        transparent: true,
        opacity: 0.6,
        side: THREE.DoubleSide,
        emissive: this.colors.memory.clone().multiplyScalar(0.1)
      });
      
      const fragment = new THREE.Mesh(geometry, material);
      
      // Position memories in a gentle arc
      const angle = (i / fragmentCount) * Math.PI * 2;
      const radius = 8 + Math.random() * 4;
      const height = Math.sin(angle * 3) * 2;
      
      fragment.position.set(
        Math.cos(angle) * radius,
        height + 2,
        Math.sin(angle) * radius
      );
      
      fragment.rotation.y = angle + Math.PI;
      fragment.rotation.x = Math.random() * 0.3 - 0.15;
      
      const memoryFragment: MemoryFragment = {
        mesh: fragment,
        rotation: new THREE.Vector3(
          (Math.random() - 0.5) * 0.005,
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.005
        ),
        emotionalWeight: Math.random(),
        glowIntensity: 0.1,
        phase: 'stable'
      };
      
      this.memoryFragments.push(memoryFragment);
      this.scene.add(fragment);
    }
  }

  private createHeartbeatPulses(): void {
    // Central heart visualization
    const heartGeometry = new THREE.SphereGeometry(1, 16, 16);
    const heartMaterial = new THREE.MeshPhongMaterial({
      color: this.colors.heartbreak,
      transparent: true,
      opacity: 0.8,
      emissive: this.colors.heartbreak.clone().multiplyScalar(0.4)
    });
    
    const heartMesh = new THREE.Mesh(heartGeometry, heartMaterial);
    heartMesh.position.set(0, 2, 0);
    
    const heartPulse: HeartbeatPulse = {
      mesh: heartMesh,
      scale: 1,
      targetScale: 1,
      pulseRate: this.heartbeatRate,
      intensity: 0.5
    };
    
    this.heartbeatPulses.push(heartPulse);
    this.scene.add(heartMesh);
    
    // Create pulse rings around heart
    for (let i = 0; i < 3; i++) {
      const ringGeometry = new THREE.RingGeometry(2 + i * 2, 2.5 + i * 2, 32);
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: this.colors.secondary,
        transparent: true,
        opacity: 0.2,
        side: THREE.DoubleSide
      });
      
      const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
      ringMesh.position.set(0, 2, 0);
      ringMesh.rotation.x = Math.PI / 2;
      
      const ringPulse: HeartbeatPulse = {
        mesh: ringMesh,
        scale: 1,
        targetScale: 1,
        pulseRate: this.heartbeatRate,
        intensity: 0.3 - i * 0.1
      };
      
      this.heartbeatPulses.push(ringPulse);
      this.scene.add(ringMesh);
    }
  }

  private createEmotionalField(): void {
    const geometry = new THREE.SphereGeometry(30, 32, 32);
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: this.uniformTime,
        emotionalIntensity: { value: this.emotionalIntensity },
        mood: { value: 0 }, // 0: missing, 1: dancing, 2: over_it, 3: confused
        primaryColor: { value: this.colors.primary },
        secondaryColor: { value: this.colors.secondary },
        tertiaryColor: { value: this.colors.tertiary }
      },
      vertexShader: `
        uniform float time;
        uniform float emotionalIntensity;
        varying vec3 vPosition;
        varying vec3 vNormal;
        varying vec2 vUv;
        
        void main() {
          vPosition = position;
          vNormal = normal;
          vUv = uv;
          
          vec3 pos = position;
          
          // Gentle emotional breathing
          float breath = sin(time * 0.5) * emotionalIntensity * 0.5;
          pos += normal * breath;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform float emotionalIntensity;
        uniform float mood;
        uniform vec3 primaryColor;
        uniform vec3 secondaryColor;
        uniform vec3 tertiaryColor;
        varying vec3 vPosition;
        varying vec3 vNormal;
        varying vec2 vUv;
        
        void main() {
          // Emotional color mixing based on mood
          vec3 color = mix(primaryColor, secondaryColor, mood * 0.5);
          color = mix(color, tertiaryColor, sin(time * 0.3 + vPosition.y * 0.1) * 0.5 + 0.5);
          
          // Emotional wave patterns
          float wave1 = sin(vUv.x * 20.0 + time * 2.0) * 0.5 + 0.5;
          float wave2 = sin(vUv.y * 15.0 + time * 1.5) * 0.5 + 0.5;
          color += vec3(0.1) * wave1 * wave2 * emotionalIntensity;
          
          // Fresnel for emotional glow
          float fresnel = 1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0)));
          color *= fresnel;
          
          float opacity = 0.05 + emotionalIntensity * 0.15;
          gl_FragColor = vec4(color, opacity);
        }
      `,
      transparent: true,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending
    });
    
    this.emotionalField = new THREE.Mesh(geometry, material);
    this.scene.add(this.emotionalField);
  }

  private createTearDrops(): void {
    const particleCount = this.qualityLevel === 'high' ? 100 : 
                         this.qualityLevel === 'medium' ? 50 : 25;
    
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Random positions
      positions[i3] = (Math.random() - 0.5) * 40;
      positions[i3 + 1] = Math.random() * 20 + 10;
      positions[i3 + 2] = (Math.random() - 0.5) * 40;
      
      // Tear colors (blue to clear)
      const intensity = Math.random() * 0.5 + 0.5;
      colors[i3] = this.colors.tear.r * intensity;
      colors[i3 + 1] = this.colors.tear.g * intensity;
      colors[i3 + 2] = this.colors.tear.b * intensity;
      
      // Sizes
      sizes[i] = Math.random() * 3 + 1;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: this.uniformTime,
        emotionalIntensity: { value: this.emotionalIntensity }
      },
      vertexShader: `
        attribute float size;
        uniform float time;
        uniform float emotionalIntensity;
        varying vec3 vColor;
        varying float vOpacity;
        
        void main() {
          vColor = color;
          
          vec3 pos = position;
          
          // Gentle falling motion with emotional drift
          pos.y -= time * 0.5;
          pos.x += sin(time + position.y * 0.1) * 0.5 * emotionalIntensity;
          
          // Reset tears at top
          if (pos.y < -10.0) {
            pos.y += 30.0;
          }
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z) * emotionalIntensity;
          gl_Position = projectionMatrix * mvPosition;
          
          vOpacity = emotionalIntensity * 0.8;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vOpacity;
        
        void main() {
          // Teardrop shape
          vec2 uv = gl_PointCoord - 0.5;
          float dist = length(uv);
          
          // Teardrop distortion
          uv.y -= smoothstep(0.0, 0.5, dist) * 0.3;
          dist = length(uv);
          
          if (dist > 0.5) discard;
          
          float alpha = (1.0 - dist * 2.0) * vOpacity;
          gl_FragColor = vec4(vColor, alpha);
        }
      `,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    
    this.tearDrops = new THREE.Points(geometry, material);
    this.scene.add(this.tearDrops);
  }

  private setupMoodResponsivity(): void {
    // Listen for mood changes from UI
    window.addEventListener('moodChange', ((event: CustomEvent) => {
      this.setMood(event.detail.mood);
    }) as EventListener);
  }

  private getEmotionalColor(): THREE.Color {
    switch (this.currentAct) {
      case 'glow':
        return this.colors.primary.clone();
      case 'ecstasy':
        return this.colors.secondary.clone();
      case 'crash':
        return this.colors.heartbreak.clone();
      default:
        return this.colors.primary.clone();
    }
  }

  setMood(mood: 'missing' | 'dancing' | 'over_it' | 'confused'): void {
    this.currentMood = mood;
    
    // Update emotional intensity based on mood
    switch (mood) {
      case 'missing':
        this.emotionalIntensity = 0.8;
        this.heartbeatRate = 80;
        break;
      case 'dancing':
        this.emotionalIntensity = 1.0;
        this.heartbeatRate = 120;
        break;
      case 'over_it':
        this.emotionalIntensity = 0.3;
        this.heartbeatRate = 60;
        break;
      case 'confused':
        this.emotionalIntensity = 0.6;
        this.heartbeatRate = 100;
        break;
    }
    
    // Update emotional field
    if (this.emotionalField) {
      const material = this.emotionalField.material as THREE.ShaderMaterial;
      material.uniforms.mood.value = ['missing', 'dancing', 'over_it', 'confused'].indexOf(mood);
      material.uniforms.emotionalIntensity.value = this.emotionalIntensity;
    }
    
    console.log(`Emotional state changed to: ${mood} 💭`);
  }

  setEmotionalAct(act: 'glow' | 'ecstasy' | 'crash'): void {
    this.currentAct = act;
    
    // Update particle colors and behavior
    this.emotionalParticles.forEach((particle) => {
      particle.emotionalState = act;
      const material = particle.mesh.material as THREE.MeshPhongMaterial;
      material.color = this.getEmotionalColor();
      material.emissive = this.getEmotionalColor().multiplyScalar(0.3);
    });
    
    console.log(`Emotional act transition: ${act} 🎭`);
  }

  updateWorld(deltaTime: number, audioData: AudioAnalysis): void {
    const time = this.clock.getElapsedTime();
    
    // Update three-act structure
    this.updateEmotionalActs(time);
    
    // Update emotional particles
    this.updateEmotionalParticles(deltaTime);
    
    // Update memory fragments
    this.updateMemoryFragments(deltaTime);
    
    // Update heartbeat pulses
    this.updateHeartbeatPulses(deltaTime, audioData);
    
    // Update tear drops
    if (this.tearDrops) {
      const material = this.tearDrops.material as THREE.ShaderMaterial;
      material.uniforms.emotionalIntensity.value = this.emotionalIntensity;
    }
    
    // Update emotional field
    if (this.emotionalField) {
      const material = this.emotionalField.material as THREE.ShaderMaterial;
      material.uniforms.emotionalIntensity.value = this.emotionalIntensity;
    }
  }

  private updateEmotionalActs(time: number): void {
    // Auto-progress through emotional acts
    const actTime = time % (this.actDuration * 3);
    
    let newAct: 'glow' | 'ecstasy' | 'crash';
    if (actTime < this.actDuration) {
      newAct = 'glow';
    } else if (actTime < this.actDuration * 2) {
      newAct = 'ecstasy';
    } else {
      newAct = 'crash';
    }
    
    if (newAct !== this.currentAct) {
      this.setEmotionalAct(newAct);
    }
  }

  private updateEmotionalParticles(deltaTime: number): void {
    this.emotionalParticles.forEach((particle) => {
      // Float movement based on emotional state
      particle.mesh.position.add(particle.velocity);
      
      // Emotional state affects movement
      switch (particle.emotionalState) {
        case 'glow':
          particle.velocity.y = Math.abs(particle.velocity.y) * 0.5; // Gentle rise
          break;
        case 'ecstasy':
          particle.velocity.multiplyScalar(1.5); // Energetic movement
          break;
        case 'crash':
          particle.velocity.y -= 0.001; // Slow fall
          break;
      }
      
      // Update intensity
      particle.intensity = THREE.MathUtils.lerp(
        particle.intensity,
        particle.targetIntensity,
        deltaTime * 2
      );
      
      const material = particle.mesh.material as THREE.MeshPhongMaterial;
      material.opacity = particle.intensity * 0.8;
      
      // Boundary check
      if (particle.mesh.position.length() > 25) {
        particle.velocity.multiplyScalar(-0.5);
      }
      
      // Update lifespan
      particle.lifespan -= deltaTime;
      if (particle.lifespan <= 0) {
        particle.lifespan = particle.maxLifespan;
        particle.targetIntensity = Math.random();
      }
    });
  }

  private updateMemoryFragments(deltaTime: number): void {
    this.memoryFragments.forEach((fragment) => {
      // Gentle rotation
      fragment.mesh.rotation.x += fragment.rotation.x;
      fragment.mesh.rotation.y += fragment.rotation.y;
      fragment.mesh.rotation.z += fragment.rotation.z;
      
      // Emotional glow pulsing
      fragment.glowIntensity = 0.1 + Math.sin(this.clock.getElapsedTime() * 2 + fragment.emotionalWeight * 10) * 0.05;
      
      const material = fragment.mesh.material as THREE.MeshPhongMaterial;
      material.emissive.setScalar(fragment.glowIntensity * this.emotionalIntensity);
    });
  }

  private updateHeartbeatPulses(deltaTime: number, audioData: AudioAnalysis): void {
    const time = this.clock.getElapsedTime();
    
    // Sync heartbeat to audio BPM if available, otherwise use emotional rate
    const currentBPM = audioData.bpm > 0 ? audioData.bpm : this.heartbeatRate;
    const beatInterval = 60 / currentBPM;
    
    if (time - this.lastHeartbeat > beatInterval) {
      this.triggerHeartbeat();
      this.lastHeartbeat = time;
    }
    
    // Update pulse animations
    this.heartbeatPulses.forEach((pulse, index) => {
      pulse.scale = THREE.MathUtils.lerp(pulse.scale, pulse.targetScale, deltaTime * 8);
      pulse.mesh.scale.setScalar(pulse.scale);
      
      // Decay pulse
      pulse.targetScale = THREE.MathUtils.lerp(pulse.targetScale, 1, deltaTime * 4);
    });
  }

  private triggerHeartbeat(): void {
    // Trigger heartbeat pulse
    this.heartbeatPulses.forEach((pulse, index) => {
      pulse.targetScale = 1 + pulse.intensity * this.emotionalIntensity;
    });
    
    // Spatial audio heartbeat
    spatialAudio.trigger({
      type: 'heartbeat',
      position: { x: 0, y: 2, z: 0 },
      intensity: this.emotionalIntensity
    });
    
    // Gentle haptic pulse
    if (this.emotionalIntensity > 0.7) {
      haptics.trigger({ intensity: 'light' });
    }
  }

  handleInteraction(event: InteractionEvent): void {
    if (event.type === 'click' && event.worldPosition) {
      // Check if user clicked on memory fragment
      this.memoryFragments.forEach((fragment) => {
        const distance = fragment.mesh.position.distanceTo(event.worldPosition!);
        if (distance < 4) {
          // Intensify memory
          fragment.glowIntensity = 1.0;
          fragment.phase = 'forming';
          
          // Trigger emotional response
          this.emotionalIntensity = Math.min(1.0, this.emotionalIntensity + 0.3);
          
          spatialAudio.ui.memoryChime();
          haptics.trigger({ intensity: 'medium' });
        }
      });
    }
  }

  handleAudioEvent(audioData: AudioAnalysis): void {
    // React to audio energy for emotional intensity
    this.emotionalIntensity = THREE.MathUtils.lerp(
      this.emotionalIntensity,
      audioData.energy.total,
      0.1
    );
    
    // Sync emotional particles to audio
    if (audioData.onset) {
      this.emotionalParticles.forEach((particle) => {
        particle.targetIntensity = Math.random();
      });
      
      // Trigger heartbeat on strong onsets
      if (audioData.energy.total > 0.7) {
        this.triggerHeartbeat();
      }
    }
  }

  dispose(): void {
    // Clean up emotional particles
    this.emotionalParticles.forEach((particle) => {
      this.scene.remove(particle.mesh);
      particle.mesh.geometry.dispose();
      (particle.mesh.material as THREE.Material).dispose();
    });
    
    // Clean up memory fragments
    this.memoryFragments.forEach((fragment) => {
      this.scene.remove(fragment.mesh);
      fragment.mesh.geometry.dispose();
      (fragment.mesh.material as THREE.Material).dispose();
    });
    
    // Clean up heartbeat pulses
    this.heartbeatPulses.forEach((pulse) => {
      this.scene.remove(pulse.mesh);
      pulse.mesh.geometry.dispose();
      (pulse.mesh.material as THREE.Material).dispose();
    });
    
    // Clean up other objects
    if (this.emotionalField) {
      this.scene.remove(this.emotionalField);
      this.emotionalField.geometry.dispose();
      (this.emotionalField.material as THREE.Material).dispose();
    }
    
    if (this.tearDrops) {
      this.scene.remove(this.tearDrops);
      this.tearDrops.geometry.dispose();
      (this.tearDrops.material as THREE.Material).dispose();
    }
    
    console.log('Nostalgia Trap emotional landscape dissolved 💔');
  }
}