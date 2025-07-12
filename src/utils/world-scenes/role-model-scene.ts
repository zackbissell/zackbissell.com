/**
 * Role Model World Scene
 * Unhinged Excellence - 300+ track chaos with industrial aesthetics
 * Celebrates spontaneous creative madness and 3AM SoundCloud discoveries
 */

import * as THREE from 'three';
import WorldScene, { type InteractionEvent } from '../world-scene';
import { spatialAudio } from '../spatial-audio';
import { haptics } from '../haptics';
import type { AudioAnalysis } from '../webgl-engine';

interface ChaosParticle {
  mesh: THREE.Mesh;
  velocity: THREE.Vector3;
  angularVelocity: THREE.Vector3;
  energy: number;
  targetEnergy: number;
  chaosType: 'track' | 'coffee' | 'idea' | 'warning';
  lifespan: number;
}

interface IndustrialStructure {
  mesh: THREE.Mesh;
  vibrationIntensity: number;
  warningState: boolean;
  structuralIntegrity: number;
}

interface ChaosMetric {
  name: string;
  value: number;
  maxValue: number;
  warningThreshold: number;
  displayMesh: THREE.Mesh;
}

export class RoleModelScene extends WorldScene {
  // Chaos systems
  private chaosParticles: ChaosParticle[] = [];
  private industrialStructures: IndustrialStructure[] = [];
  private chaosMetrics: ChaosMetric[] = [];
  private explosionField: THREE.Mesh | null = null;
  private warningSystem: THREE.Group | null = null;
  
  // Chaos state
  private chaosLevel = 0.8; // Always high for Role Model
  private coffeeCount = 0;
  private trackCount = 0;
  private maxTrackCount = 300;
  private unhingedIntensity = 1.0;
  private lastExplosion = 0;
  private structuralDamage = 0;
  
  // Colors (Industrial/Chaos theme)
  private readonly colors = {
    primary: new THREE.Color(0xeab308),      // Yellow
    secondary: new THREE.Color(0xdc2626),    // Red
    warning: new THREE.Color(0xf97316),      // Orange
    industrial: new THREE.Color(0x404040),   // Dark gray
    coffee: new THREE.Color(0x92400e),       // Brown
    electricity: new THREE.Color(0x06b6d4),  // Cyan
    danger: new THREE.Color(0xb91c1c),       // Dark red
  };

  constructor() {
    super('rolemodel');
  }

  protected getDefaultCameraConfig() {
    return {
      position: new THREE.Vector3(8, 8, 20),
      target: new THREE.Vector3(0, 0, 0),
      fov: 65,
      near: 0.1,
      far: 1000,
      movementType: 'handheld' as const // Chaotic camera movement
    };
  }

  protected getDefaultLighting() {
    return {
      ambient: {
        color: this.colors.industrial.clone().multiplyScalar(0.3),
        intensity: 0.4
      },
      directional: {
        color: this.colors.warning,
        intensity: 1.5,
        position: new THREE.Vector3(1, 1, 0.5),
        castShadow: this.config.features.shadows
      },
      point: [
        {
          color: this.colors.primary,
          intensity: 2.0,
          position: new THREE.Vector3(0, 10, 0),
          distance: 30,
          decay: 1
        },
        {
          color: this.colors.electricity,
          intensity: 1.5,
          position: new THREE.Vector3(-10, 5, -10),
          distance: 20,
          decay: 2
        },
        {
          color: this.colors.danger,
          intensity: 1.8,
          position: new THREE.Vector3(10, 3, 10),
          distance: 25,
          decay: 1.5
        }
      ]
    };
  }

  async initializeWorld(): Promise<void> {
    // Create industrial chaos structure
    await this.createIndustrialStructure();
    
    // Initialize chaos particle system
    this.createChaosParticles();
    
    // Setup chaos metrics display
    this.createChaosMetrics();
    
    // Create explosion field
    this.createExplosionField();
    
    // Setup warning system
    this.createWarningSystem();
    
    // Initialize chaos state
    this.initializeChaosState();
    
    console.log('Role Model chaos factory initialized ⚡ UNHINGED MODE ACTIVATED');
  }

  private async createIndustrialStructure(): void {
    const factory = new THREE.Group();
    
    // Central chaos reactor
    const reactorGeometry = new THREE.CylinderGeometry(3, 4, 8, 8);
    const reactorMaterial = new THREE.MeshPhongMaterial({
      color: this.colors.industrial,
      emissive: this.colors.warning.clone().multiplyScalar(0.2),
      shininess: 100
    });
    
    const reactor = new THREE.Mesh(reactorGeometry, reactorMaterial);
    reactor.position.y = 4;
    factory.add(reactor);
    
    const reactorStructure: IndustrialStructure = {
      mesh: reactor,
      vibrationIntensity: 0,
      warningState: false,
      structuralIntegrity: 1.0
    };
    this.industrialStructures.push(reactorStructure);
    this.audioReactiveObjects.push(reactor);
    
    // Industrial pipes and supports
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      
      // Support pillars
      const pillarGeometry = new THREE.BoxGeometry(0.8, 12, 0.8);
      const pillarMaterial = new THREE.MeshPhongMaterial({
        color: this.colors.industrial,
        roughness: 0.8
      });
      
      const pillar = new THREE.Mesh(pillarGeometry, pillarMaterial);
      pillar.position.set(
        Math.cos(angle) * 8,
        6,
        Math.sin(angle) * 8
      );
      
      factory.add(pillar);
      
      const pillarStructure: IndustrialStructure = {
        mesh: pillar,
        vibrationIntensity: 0,
        warningState: false,
        structuralIntegrity: 1.0
      };
      this.industrialStructures.push(pillarStructure);
      
      // Connecting pipes
      const pipeGeometry = new THREE.CylinderGeometry(0.3, 0.3, 8, 8);
      const pipeMaterial = new THREE.MeshPhongMaterial({
        color: this.colors.coffee,
        emissive: this.colors.electricity.clone().multiplyScalar(0.1)
      });
      
      const pipe = new THREE.Mesh(pipeGeometry, pipeMaterial);
      pipe.position.set(
        Math.cos(angle) * 6,
        8,
        Math.sin(angle) * 6
      );
      pipe.rotation.z = angle;
      pipe.rotation.x = Math.PI / 2;
      
      factory.add(pipe);
      this.audioReactiveObjects.push(pipe);
    }
    
    // Overhead track counter display
    const displayGeometry = new THREE.PlaneGeometry(6, 2);
    const displayCanvas = this.createChaosDisplay();
    const displayTexture = new THREE.CanvasTexture(displayCanvas);
    const displayMaterial = new THREE.MeshBasicMaterial({
      map: displayTexture,
      transparent: true,
      emissive: this.colors.primary.clone().multiplyScalar(0.3)
    });
    
    const display = new THREE.Mesh(displayGeometry, displayMaterial);
    display.position.set(0, 12, 0);
    display.rotation.x = -Math.PI / 6;
    factory.add(display);
    
    this.scene.add(factory);
  }

  private createChaosDisplay(): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 128;
    const ctx = canvas.getContext('2d')!;
    
    // Industrial display background
    ctx.fillStyle = '#1f1f1f';
    ctx.fillRect(0, 0, 512, 128);
    
    // Warning border
    ctx.strokeStyle = '#eab308';
    ctx.lineWidth = 4;
    ctx.strokeRect(4, 4, 504, 120);
    
    // Text content
    ctx.fillStyle = '#eab308';
    ctx.font = 'bold 20px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('⚠️ UNHINGED CONTENT WARNING ⚠️', 256, 35);
    
    ctx.font = '16px monospace';
    ctx.fillText('TRACKS LOADED: 300+ | COFFEE: ∞ CUPS', 256, 60);
    ctx.fillText('STRUCTURAL INTEGRITY: QUESTIONABLE', 256, 85);
    
    return canvas;
  }

  private createChaosParticles(): void {
    const particleCount = this.qualityLevel === 'high' ? 200 : 
                         this.qualityLevel === 'medium' ? 100 : 50;
    
    for (let i = 0; i < particleCount; i++) {
      const chaosType = ['track', 'coffee', 'idea', 'warning'][Math.floor(Math.random() * 4)] as ChaosParticle['chaosType'];
      
      let geometry: THREE.BufferGeometry;
      let material: THREE.Material;
      
      switch (chaosType) {
        case 'track':
          geometry = new THREE.SphereGeometry(0.2, 8, 8);
          material = new THREE.MeshPhongMaterial({
            color: this.colors.primary,
            emissive: this.colors.primary.clone().multiplyScalar(0.3)
          });
          break;
        case 'coffee':
          geometry = new THREE.CylinderGeometry(0.15, 0.2, 0.4, 8);
          material = new THREE.MeshPhongMaterial({
            color: this.colors.coffee,
            emissive: this.colors.coffee.clone().multiplyScalar(0.2)
          });
          break;
        case 'idea':
          geometry = new THREE.OctahedronGeometry(0.3);
          material = new THREE.MeshPhongMaterial({
            color: this.colors.electricity,
            emissive: this.colors.electricity.clone().multiplyScalar(0.4),
            transparent: true,
            opacity: 0.8
          });
          break;
        case 'warning':
          geometry = new THREE.ConeGeometry(0.2, 0.6, 6);
          material = new THREE.MeshPhongMaterial({
            color: this.colors.danger,
            emissive: this.colors.danger.clone().multiplyScalar(0.5)
          });
          break;
      }
      
      const particle = new THREE.Mesh(geometry, material);
      
      // Chaotic positioning
      particle.position.set(
        (Math.random() - 0.5) * 30,
        Math.random() * 20,
        (Math.random() - 0.5) * 30
      );
      
      const chaosParticle: ChaosParticle = {
        mesh: particle,
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.2,
          (Math.random() - 0.5) * 0.1,
          (Math.random() - 0.5) * 0.2
        ),
        angularVelocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.1,
          (Math.random() - 0.5) * 0.2,
          (Math.random() - 0.5) * 0.1
        ),
        energy: Math.random(),
        targetEnergy: Math.random(),
        chaosType,
        lifespan: Math.random() * 20 + 10
      };
      
      this.chaosParticles.push(chaosParticle);
      this.scene.add(particle);
      this.audioReactiveObjects.push(particle);
    }
  }

  private createChaosMetrics(): void {
    const metrics = [
      { name: 'Tracks', value: 0, maxValue: 300, warningThreshold: 250 },
      { name: 'Coffee', value: 0, maxValue: 100, warningThreshold: 80 },
      { name: 'Chaos', value: 80, maxValue: 100, warningThreshold: 90 },
      { name: 'Sanity', value: 20, maxValue: 100, warningThreshold: 30 }
    ];
    
    metrics.forEach((metric, index) => {
      // Create 3D metric display
      const barGeometry = new THREE.BoxGeometry(0.5, 4, 0.5);
      const barMaterial = new THREE.MeshPhongMaterial({
        color: metric.value > metric.warningThreshold ? this.colors.danger : this.colors.primary,
        emissive: (metric.value > metric.warningThreshold ? this.colors.danger : this.colors.primary).clone().multiplyScalar(0.2)
      });
      
      const barMesh = new THREE.Mesh(barGeometry, barMaterial);
      barMesh.position.set(-10 + index * 3, 6, -15);
      
      const chaosMetric: ChaosMetric = {
        name: metric.name,
        value: metric.value,
        maxValue: metric.maxValue,
        warningThreshold: metric.warningThreshold,
        displayMesh: barMesh
      };
      
      this.chaosMetrics.push(chaosMetric);
      this.scene.add(barMesh);
    });
  }

  private createExplosionField(): void {
    const geometry = new THREE.IcosahedronGeometry(35, 1);
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: this.uniformTime,
        chaosLevel: { value: this.chaosLevel },
        unhingedIntensity: { value: this.unhingedIntensity },
        primaryColor: { value: this.colors.primary },
        secondaryColor: { value: this.colors.secondary },
        dangerColor: { value: this.colors.danger }
      },
      vertexShader: `
        uniform float time;
        uniform float chaosLevel;
        uniform float unhingedIntensity;
        varying vec3 vPosition;
        varying vec3 vNormal;
        
        void main() {
          vPosition = position;
          vNormal = normal;
          
          vec3 pos = position;
          
          // Chaos field distortion
          float chaos1 = sin(pos.x * 0.1 + time * 3.0) * chaosLevel;
          float chaos2 = sin(pos.y * 0.1 + time * 2.5) * chaosLevel;
          float chaos3 = sin(pos.z * 0.1 + time * 3.5) * chaosLevel;
          
          pos += normal * (chaos1 + chaos2 + chaos3) * 0.5 * unhingedIntensity;
          
          // Explosion pulses
          float pulse = sin(time * 10.0) * unhingedIntensity;
          pos += normal * pulse * 0.2;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform float chaosLevel;
        uniform float unhingedIntensity;
        uniform vec3 primaryColor;
        uniform vec3 secondaryColor;
        uniform vec3 dangerColor;
        varying vec3 vPosition;
        varying vec3 vNormal;
        
        void main() {
          // Chaotic color mixing
          vec3 color = mix(primaryColor, secondaryColor, sin(time * 2.0 + vPosition.x * 0.1) * 0.5 + 0.5);
          color = mix(color, dangerColor, chaosLevel * 0.3);
          
          // Industrial grid pattern
          float grid = sin(vPosition.x * 30.0) * sin(vPosition.y * 30.0) * sin(vPosition.z * 30.0);
          color += vec3(0.1) * grid * unhingedIntensity;
          
          // Chaos sparks
          float sparks = fract(sin(dot(vPosition.xy, vec2(12.9898, 78.233))) * 43758.5453);
          if (sparks > 0.98 && unhingedIntensity > 0.7) {
            color += vec3(1.0) * sparks;
          }
          
          // Fresnel explosion glow
          float fresnel = 1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0)));
          color *= fresnel;
          
          float opacity = 0.1 + chaosLevel * unhingedIntensity * 0.3;
          gl_FragColor = vec4(color, opacity);
        }
      `,
      transparent: true,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending
    });
    
    this.explosionField = new THREE.Mesh(geometry, material);
    this.scene.add(this.explosionField);
  }

  private createWarningSystem(): void {
    this.warningSystem = new THREE.Group();
    
    // Create warning lights around the perimeter
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const radius = 20;
      
      const lightGeometry = new THREE.ConeGeometry(0.5, 2, 6);
      const lightMaterial = new THREE.MeshPhongMaterial({
        color: this.colors.danger,
        emissive: this.colors.danger.clone().multiplyScalar(0.8)
      });
      
      const warningLight = new THREE.Mesh(lightGeometry, lightMaterial);
      warningLight.position.set(
        Math.cos(angle) * radius,
        1,
        Math.sin(angle) * radius
      );
      warningLight.lookAt(0, 1, 0);
      
      this.warningSystem.add(warningLight);
    }
    
    this.scene.add(this.warningSystem);
  }

  private initializeChaosState(): void {
    // Start with high chaos values for Role Model
    this.trackCount = 287; // Almost at 300
    this.coffeeCount = 97;  // Way too much coffee
    this.chaosLevel = 0.95; // Maximum chaos
    this.unhingedIntensity = 1.0;
    
    // Update metrics
    this.updateChaosMetrics();
  }

  private updateChaosMetrics(): void {
    const values = [this.trackCount, this.coffeeCount, this.chaosLevel * 100, 20]; // Sanity always low
    
    this.chaosMetrics.forEach((metric, index) => {
      metric.value = values[index];
      
      // Update visual representation
      const scale = metric.value / metric.maxValue;
      metric.displayMesh.scale.y = scale;
      metric.displayMesh.position.y = 2 + scale * 2;
      
      // Change color if over warning threshold
      const material = metric.displayMesh.material as THREE.MeshPhongMaterial;
      if (metric.value > metric.warningThreshold) {
        material.color = this.colors.danger;
        material.emissive = this.colors.danger.clone().multiplyScalar(0.3);
      } else {
        material.color = this.colors.primary;
        material.emissive = this.colors.primary.clone().multiplyScalar(0.2);
      }
    });
  }

  updateWorld(deltaTime: number, audioData: AudioAnalysis): void {
    const time = this.clock.getElapsedTime();
    
    // Update chaos particles
    this.updateChaosParticles(deltaTime);
    
    // Update industrial structures
    this.updateIndustrialStructures(deltaTime, audioData);
    
    // Update explosion field
    if (this.explosionField) {
      const material = this.explosionField.material as THREE.ShaderMaterial;
      material.uniforms.chaosLevel.value = this.chaosLevel;
      material.uniforms.unhingedIntensity.value = this.unhingedIntensity;
    }
    
    // Trigger random chaos events
    if (Math.random() < 0.01 && time - this.lastExplosion > 2) {
      this.triggerChaosExplosion(audioData.energy.total);
      this.lastExplosion = time;
    }
    
    // Update chaos metrics
    this.updateChaosMetrics();
    
    // Camera shake from chaos
    this.applyChaosToCamera();
  }

  private updateChaosParticles(deltaTime: number): void {
    this.chaosParticles.forEach((particle) => {
      // Chaotic movement
      particle.mesh.position.add(particle.velocity);
      particle.mesh.rotation.x += particle.angularVelocity.x;
      particle.mesh.rotation.y += particle.angularVelocity.y;
      particle.mesh.rotation.z += particle.angularVelocity.z;
      
      // Chaos affects velocity
      particle.velocity.multiplyScalar(1 + this.chaosLevel * 0.1);
      
      // Random direction changes
      if (Math.random() < 0.02) {
        particle.velocity.add(new THREE.Vector3(
          (Math.random() - 0.5) * 0.1,
          (Math.random() - 0.5) * 0.05,
          (Math.random() - 0.5) * 0.1
        ));
      }
      
      // Energy pulsing
      particle.energy = THREE.MathUtils.lerp(
        particle.energy,
        particle.targetEnergy,
        deltaTime * 3
      );
      
      const material = particle.mesh.material as THREE.MeshPhongMaterial;
      const scale = 1 + particle.energy * this.unhingedIntensity * 0.5;
      particle.mesh.scale.setScalar(scale);
      
      // Boundary chaos (particles explode outward and reset)
      if (particle.mesh.position.length() > 40) {
        particle.mesh.position.multiplyScalar(0.1);
        particle.velocity.multiplyScalar(0.5);
        this.triggerChaosExplosion(0.5);
      }
      
      // Lifespan management
      particle.lifespan -= deltaTime;
      if (particle.lifespan <= 0) {
        particle.targetEnergy = Math.random();
        particle.lifespan = Math.random() * 20 + 10;
      }
    });
  }

  private updateIndustrialStructures(deltaTime: number, audioData: AudioAnalysis): void {
    this.industrialStructures.forEach((structure) => {
      // Structural vibration from audio
      structure.vibrationIntensity = audioData.energy.total * this.chaosLevel;
      
      // Shake structure
      const shake = structure.vibrationIntensity * 0.1;
      structure.mesh.position.x += (Math.random() - 0.5) * shake;
      structure.mesh.position.z += (Math.random() - 0.5) * shake;
      
      // Structural damage accumulation
      structure.structuralIntegrity -= structure.vibrationIntensity * deltaTime * 0.01;
      structure.structuralIntegrity = Math.max(0.1, structure.structuralIntegrity);
      
      // Visual damage representation
      const material = structure.mesh.material as THREE.MeshPhongMaterial;
      if (structure.structuralIntegrity < 0.5) {
        material.emissive = this.colors.danger.clone().multiplyScalar(0.3);
        structure.warningState = true;
      } else {
        material.emissive = this.colors.warning.clone().multiplyScalar(0.1);
        structure.warningState = false;
      }
    });
  }

  private applyChaosToCamera(): void {
    // Apply chaotic camera movement
    const intensity = this.chaosLevel * this.unhingedIntensity * 0.02;
    this.camera.position.x += (Math.random() - 0.5) * intensity;
    this.camera.position.y += (Math.random() - 0.5) * intensity;
    this.camera.position.z += (Math.random() - 0.5) * intensity;
  }

  private triggerChaosExplosion(intensity: number): void {
    // Increase chaos level
    this.chaosLevel = Math.min(1.0, this.chaosLevel + intensity * 0.1);
    this.unhingedIntensity = Math.min(1.0, this.unhingedIntensity + intensity * 0.2);
    
    // Affect all particles
    this.chaosParticles.forEach((particle) => {
      particle.targetEnergy = Math.random();
      particle.velocity.multiplyScalar(1 + intensity);
    });
    
    // Add more tracks and coffee
    this.trackCount = Math.min(this.maxTrackCount, this.trackCount + Math.floor(Math.random() * 5));
    this.coffeeCount += Math.floor(Math.random() * 3);
    
    // Spatial audio chaos
    spatialAudio.trigger({
      type: 'explosion',
      position: { x: 0, y: 5, z: 0 },
      intensity: intensity
    });
    
    // Strong haptic feedback
    haptics.trigger({ intensity: 'strong' });
    
    console.log(`CHAOS EXPLOSION! Level: ${this.chaosLevel.toFixed(2)} 💥`);
  }

  handleInteraction(event: InteractionEvent): void {
    if (event.type === 'click') {
      // Any click triggers more chaos
      this.triggerChaosExplosion(0.3);
      
      // Add random track or coffee
      if (Math.random() > 0.5) {
        this.trackCount = Math.min(this.maxTrackCount, this.trackCount + 1);
        spatialAudio.ui.trackAdd();
      } else {
        this.coffeeCount += 1;
        spatialAudio.ui.coffeeGulp();
      }
      
      haptics.trigger({ intensity: 'medium' });
    }
  }

  handleAudioEvent(audioData: AudioAnalysis): void {
    // Audio directly affects chaos level
    this.chaosLevel = THREE.MathUtils.lerp(
      this.chaosLevel,
      0.8 + audioData.energy.total * 0.2,
      0.1
    );
    
    // Strong beats trigger explosions
    if (audioData.onset && audioData.energy.total > 0.7) {
      this.triggerChaosExplosion(audioData.energy.total);
    }
    
    // Bass affects structural integrity
    if (audioData.energy.bass > 0.8) {
      this.structuralDamage += 0.01;
      
      this.industrialStructures.forEach((structure) => {
        structure.structuralIntegrity -= 0.005;
      });
    }
    
    // Update warning system
    if (this.warningSystem) {
      const intensity = audioData.energy.total * this.chaosLevel;
      this.warningSystem.children.forEach((light, index) => {
        const material = (light as THREE.Mesh).material as THREE.MeshPhongMaterial;
        material.emissive.setScalar(intensity);
        light.rotation.y += intensity * 0.1;
      });
    }
  }

  dispose(): void {
    // Clean up chaos particles
    this.chaosParticles.forEach((particle) => {
      this.scene.remove(particle.mesh);
      particle.mesh.geometry.dispose();
      (particle.mesh.material as THREE.Material).dispose();
    });
    
    // Clean up industrial structures
    this.industrialStructures.forEach((structure) => {
      this.scene.remove(structure.mesh);
      structure.mesh.geometry.dispose();
      (structure.mesh.material as THREE.Material).dispose();
    });
    
    // Clean up chaos metrics
    this.chaosMetrics.forEach((metric) => {
      this.scene.remove(metric.displayMesh);
      metric.displayMesh.geometry.dispose();
      (metric.displayMesh.material as THREE.Material).dispose();
    });
    
    // Clean up other objects
    if (this.explosionField) {
      this.scene.remove(this.explosionField);
      this.explosionField.geometry.dispose();
      (this.explosionField.material as THREE.Material).dispose();
    }
    
    if (this.warningSystem) {
      this.scene.remove(this.warningSystem);
    }
    
    console.log('Role Model chaos factory decommissioned ⚠️ DANGER LEVEL: MINIMAL');
  }
}