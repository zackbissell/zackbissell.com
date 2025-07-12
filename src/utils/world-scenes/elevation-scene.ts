/**
 * House Work: Elevation World Scene
 * Genre-boundary challenger with anti-gravity physics and ascending energy
 * Blue-to-amber gradients representing the evolution of house music
 */

import * as THREE from 'three';
import WorldScene, { type InteractionEvent } from '../world-scene';
import { spatialAudio } from '../spatial-audio';
import { haptics } from '../haptics';
import type { AudioAnalysis } from '../webgl-engine';

interface ElevationParticle {
  mesh: THREE.Mesh;
  velocity: THREE.Vector3;
  antigravity: number;
  genre: 'classic' | 'deep' | 'tech' | 'progressive' | 'experimental';
  elevation: number;
  targetElevation: number;
  energy: number;
}

interface GenreLayer {
  mesh: THREE.Mesh;
  height: number;
  genre: string;
  color: THREE.Color;
  particles: ElevationParticle[];
  active: boolean;
}

interface ElevationMeter {
  mesh: THREE.Group;
  level: number;
  maxLevel: number;
  segments: THREE.Mesh[];
}

export class ElevationScene extends WorldScene {
  // Elevation systems
  private elevationParticles: ElevationParticle[] = [];
  private genreLayers: GenreLayer[] = [];
  private elevationMeter: ElevationMeter | null = null;
  private antigravityField: THREE.Mesh | null = null;
  private puristBarrier: THREE.Mesh | null = null;
  
  // Elevation state
  private currentElevation = 0;
  private maxElevation = 100;
  private antigravityStrength = 0.8;
  private genreProgression = 0; // 0-4 (classic to experimental)
  private puristResistance = 0.5;
  private elevationSpeed = 1;
  
  // Multi-act structure
  private currentAct: 'chronological' | 'genre-bending' | 'fuck-purists' = 'chronological';
  private actProgress = 0;
  
  // Colors (Elevation theme)
  private readonly colors = {
    primary: new THREE.Color(0x0ea5e9),      // Blue
    secondary: new THREE.Color(0xf59e0b),    // Amber
    classic: new THREE.Color(0x1e40af),      // Deep blue
    deep: new THREE.Color(0x0891b2),         // Cyan
    tech: new THREE.Color(0x059669),         // Green
    progressive: new THREE.Color(0xd97706),  // Orange
    experimental: new THREE.Color(0xdc2626), // Red
    purist: new THREE.Color(0x6b7280),       // Gray (resistance)
    elevation: new THREE.Color(0xfbbf24),    // Gold
  };

  constructor() {
    super('elevation');
  }

  protected getDefaultCameraConfig() {
    return {
      position: new THREE.Vector3(0, 15, 25),
      target: new THREE.Vector3(0, 10, 0),
      fov: 55,
      near: 0.1,
      far: 1000,
      movementType: 'crane' as const // Ascending camera movement
    };
  }

  protected getDefaultLighting() {
    return {
      ambient: {
        color: this.colors.primary.clone().multiplyScalar(0.4),
        intensity: 0.5
      },
      directional: {
        color: this.colors.secondary,
        intensity: 1.0,
        position: new THREE.Vector3(0, 2, 1),
        castShadow: this.config.features.shadows
      },
      point: [
        {
          color: this.colors.elevation,
          intensity: 1.5,
          position: new THREE.Vector3(0, 20, 0),
          distance: 40,
          decay: 1
        },
        {
          color: this.colors.tech,
          intensity: 0.8,
          position: new THREE.Vector3(-15, 10, -15),
          distance: 25,
          decay: 2
        },
        {
          color: this.colors.progressive,
          intensity: 0.9,
          position: new THREE.Vector3(15, 15, 15),
          distance: 30,
          decay: 1.5
        }
      ]
    };
  }

  async initializeWorld(): Promise<void> {
    // Create genre layer system
    this.createGenreLayers();
    
    // Initialize elevation particles
    this.createElevationParticles();
    
    // Create elevation meter
    this.createElevationMeter();
    
    // Add anti-gravity field
    this.createAntiGravityField();
    
    // Create purist barrier
    this.createPuristBarrier();
    
    // Setup genre progression system
    this.setupGenreProgression();
    
    console.log('House Work: Elevation initialized 🏠 Genre boundaries: CHALLENGED');
  }

  private createGenreLayers(): void {
    const genres = [
      { name: 'Classic House', color: this.colors.classic, height: 2 },
      { name: 'Deep House', color: this.colors.deep, height: 8 },
      { name: 'Tech House', color: this.colors.tech, height: 14 },
      { name: 'Progressive', color: this.colors.progressive, height: 20 },
      { name: 'Experimental', color: this.colors.experimental, height: 26 }
    ];
    
    genres.forEach((genre, index) => {
      // Create genre platform
      const platformGeometry = new THREE.CylinderGeometry(12, 12, 0.5, 32);
      const platformMaterial = new THREE.MeshPhongMaterial({
        color: genre.color,
        transparent: true,
        opacity: 0.3,
        emissive: genre.color.clone().multiplyScalar(0.1)
      });
      
      const platform = new THREE.Mesh(platformGeometry, platformMaterial);
      platform.position.y = genre.height;
      
      const genreLayer: GenreLayer = {
        mesh: platform,
        height: genre.height,
        genre: genre.name,
        color: genre.color,
        particles: [],
        active: index === 0 // Start with classic house
      };
      
      this.genreLayers.push(genreLayer);
      this.scene.add(platform);
      
      // Add genre label
      this.createGenreLabel(genre.name, genre.height + 1, genre.color);
    });
  }

  private createGenreLabel(text: string, height: number, color: THREE.Color): void {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 64;
    const ctx = canvas.getContext('2d')!;
    
    // Label background
    ctx.fillStyle = `rgba(${color.r * 255}, ${color.g * 255}, ${color.b * 255}, 0.8)`;
    ctx.fillRect(0, 0, 256, 64);
    
    // Text
    ctx.fillStyle = 'white';
    ctx.font = 'bold 18px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(text, 128, 40);
    
    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true
    });
    
    const labelGeometry = new THREE.PlaneGeometry(4, 1);
    const label = new THREE.Mesh(labelGeometry, material);
    label.position.set(0, height, 14);
    
    this.scene.add(label);
  }

  private createElevationParticles(): void {
    const particleCount = this.qualityLevel === 'high' ? 150 : 
                         this.qualityLevel === 'medium' ? 75 : 40;
    
    for (let i = 0; i < particleCount; i++) {
      const genres = ['classic', 'deep', 'tech', 'progressive', 'experimental'] as const;
      const genre = genres[Math.floor(Math.random() * genres.length)];
      
      let geometry: THREE.BufferGeometry;
      let color: THREE.Color;
      
      switch (genre) {
        case 'classic':
          geometry = new THREE.SphereGeometry(0.2, 8, 8);
          color = this.colors.classic;
          break;
        case 'deep':
          geometry = new THREE.OctahedronGeometry(0.3);
          color = this.colors.deep;
          break;
        case 'tech':
          geometry = new THREE.BoxGeometry(0.4, 0.4, 0.4);
          color = this.colors.tech;
          break;
        case 'progressive':
          geometry = new THREE.ConeGeometry(0.2, 0.8, 6);
          color = this.colors.progressive;
          break;
        case 'experimental':
          geometry = new THREE.IcosahedronGeometry(0.3);
          color = this.colors.experimental;
          break;
      }
      
      const material = new THREE.MeshPhongMaterial({
        color: color,
        emissive: color.clone().multiplyScalar(0.2),
        transparent: true,
        opacity: 0.8
      });
      
      const particle = new THREE.Mesh(geometry, material);
      
      // Start at ground level
      particle.position.set(
        (Math.random() - 0.5) * 20,
        Math.random() * 2,
        (Math.random() - 0.5) * 20
      );
      
      const elevationParticle: ElevationParticle = {
        mesh: particle,
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.02,
          0.01 + Math.random() * 0.02, // Always rising
          (Math.random() - 0.5) * 0.02
        ),
        antigravity: 0.5 + Math.random() * 0.5,
        genre,
        elevation: 0,
        targetElevation: Math.random() * 30,
        energy: Math.random()
      };
      
      this.elevationParticles.push(elevationParticle);
      this.scene.add(particle);
      this.audioReactiveObjects.push(particle);
    }
  }

  private createElevationMeter(): void {
    const meterGroup = new THREE.Group();
    const segments: THREE.Mesh[] = [];
    
    // Create vertical meter with segments
    for (let i = 0; i < 20; i++) {
      const segmentGeometry = new THREE.BoxGeometry(1, 1, 0.2);
      const intensity = i / 20;
      const color = new THREE.Color().lerpColors(this.colors.primary, this.colors.secondary, intensity);
      
      const segmentMaterial = new THREE.MeshPhongMaterial({
        color: color,
        emissive: color.clone().multiplyScalar(0.1),
        transparent: true,
        opacity: 0.3
      });
      
      const segment = new THREE.Mesh(segmentGeometry, segmentMaterial);
      segment.position.set(18, i * 1.5 + 1, 0);
      
      segments.push(segment);
      meterGroup.add(segment);
    }
    
    // Meter label
    const labelCanvas = document.createElement('canvas');
    labelCanvas.width = 128;
    labelCanvas.height = 32;
    const ctx = labelCanvas.getContext('2d')!;
    
    ctx.fillStyle = '#0ea5e9';
    ctx.fillRect(0, 0, 128, 32);
    ctx.fillStyle = 'white';
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('ELEVATION', 64, 22);
    
    const labelTexture = new THREE.CanvasTexture(labelCanvas);
    const labelMaterial = new THREE.MeshBasicMaterial({
      map: labelTexture,
      transparent: true
    });
    
    const labelGeometry = new THREE.PlaneGeometry(3, 0.75);
    const label = new THREE.Mesh(labelGeometry, labelMaterial);
    label.position.set(18, 32, 0);
    meterGroup.add(label);
    
    this.elevationMeter = {
      mesh: meterGroup,
      level: 0,
      maxLevel: 20,
      segments
    };
    
    this.scene.add(meterGroup);
  }

  private createAntiGravityField(): void {
    const geometry = new THREE.CylinderGeometry(25, 25, 50, 32, 1, true);
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: this.uniformTime,
        elevation: { value: this.currentElevation },
        antigravity: { value: this.antigravityStrength },
        primaryColor: { value: this.colors.primary },
        secondaryColor: { value: this.colors.secondary },
        elevationColor: { value: this.colors.elevation }
      },
      vertexShader: `
        uniform float time;
        uniform float elevation;
        uniform float antigravity;
        varying vec3 vPosition;
        varying vec2 vUv;
        varying float vElevation;
        
        void main() {
          vPosition = position;
          vUv = uv;
          
          vec3 pos = position;
          
          // Anti-gravity wave distortion
          float wave = sin(pos.y * 0.1 + time * 2.0) * antigravity;
          pos.x += wave * 0.5;
          pos.z += wave * 0.5;
          
          // Elevation lift
          vElevation = (pos.y + 25.0) / 50.0;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform float elevation;
        uniform float antigravity;
        uniform vec3 primaryColor;
        uniform vec3 secondaryColor;
        uniform vec3 elevationColor;
        varying vec3 vPosition;
        varying vec2 vUv;
        varying float vElevation;
        
        void main() {
          // Elevation-based color mixing
          vec3 color = mix(primaryColor, secondaryColor, vElevation);
          color = mix(color, elevationColor, elevation / 100.0);
          
          // Anti-gravity streams
          float streams = sin(vUv.x * 30.0 + time * 3.0) * sin(vUv.y * 10.0 + time * 2.0);
          color += vec3(0.1) * streams * antigravity;
          
          // Elevation energy rings
          float rings = sin(vPosition.y * 2.0 + time * 4.0);
          color += elevationColor * rings * 0.2 * (elevation / 100.0);
          
          float opacity = 0.1 + antigravity * 0.2;
          gl_FragColor = vec4(color, opacity);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending
    });
    
    this.antigravityField = new THREE.Mesh(geometry, material);
    this.antigravityField.position.y = 25;
    this.scene.add(this.antigravityField);
  }

  private createPuristBarrier(): void {
    // Create invisible barrier that slows down progression
    const geometry = new THREE.SphereGeometry(30, 16, 16);
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: this.uniformTime,
        resistance: { value: this.puristResistance },
        puristColor: { value: this.colors.purist }
      },
      vertexShader: `
        uniform float time;
        varying vec3 vPosition;
        varying vec3 vNormal;
        
        void main() {
          vPosition = position;
          vNormal = normal;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform float resistance;
        uniform vec3 puristColor;
        varying vec3 vPosition;
        varying vec3 vNormal;
        
        void main() {
          // Purist resistance visualization
          float fresnel = 1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0)));
          vec3 color = puristColor * fresnel;
          
          // Resistance patterns
          float pattern = sin(vPosition.x * 10.0 + time) * sin(vPosition.y * 10.0 + time);
          color += vec3(0.1) * pattern * resistance;
          
          float opacity = resistance * 0.3 * fresnel;
          gl_FragColor = vec4(color, opacity);
        }
      `,
      transparent: true,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending
    });
    
    this.puristBarrier = new THREE.Mesh(geometry, material);
    this.scene.add(this.puristBarrier);
  }

  private setupGenreProgression(): void {
    // Listen for genre progression events
    window.addEventListener('genreProgression', ((event: CustomEvent) => {
      this.progressGenre(event.detail.direction);
    }) as EventListener);
  }

  progressGenre(direction: 'up' | 'down'): void {
    if (direction === 'up' && this.genreProgression < 4) {
      this.genreProgression++;
      this.currentElevation += 20;
    } else if (direction === 'down' && this.genreProgression > 0) {
      this.genreProgression--;
      this.currentElevation -= 20;
    }
    
    // Update active genre layers
    this.genreLayers.forEach((layer, index) => {
      layer.active = index <= this.genreProgression;
      
      const material = layer.mesh.material as THREE.MeshPhongMaterial;
      material.opacity = layer.active ? 0.6 : 0.1;
      material.emissive.multiplyScalar(layer.active ? 2 : 0.5);
    });
    
    // Update anti-gravity strength
    this.antigravityStrength = 0.5 + (this.genreProgression / 4) * 0.5;
    
    console.log(`Genre progression: ${this.genreProgression}/4 - Elevation: ${this.currentElevation}m 🏠`);
  }

  setElevationAct(act: 'chronological' | 'genre-bending' | 'fuck-purists'): void {
    this.currentAct = act;
    
    switch (act) {
      case 'chronological':
        this.puristResistance = 0.8;
        this.elevationSpeed = 1;
        break;
      case 'genre-bending':
        this.puristResistance = 0.5;
        this.elevationSpeed = 1.5;
        break;
      case 'fuck-purists':
        this.puristResistance = 0.1;
        this.elevationSpeed = 3;
        this.triggerPuristBarrierBreakthrough();
        break;
    }
    
    // Update purist barrier
    if (this.puristBarrier) {
      const material = this.puristBarrier.material as THREE.ShaderMaterial;
      material.uniforms.resistance.value = this.puristResistance;
    }
    
    console.log(`Elevation act: ${act} 🎭 Purist resistance: ${this.puristResistance}`);
  }

  private triggerPuristBarrierBreakthrough(): void {
    // Dramatic barrier breakdown effect
    this.currentElevation = this.maxElevation;
    this.antigravityStrength = 1.0;
    
    // All particles get massive elevation boost
    this.elevationParticles.forEach((particle) => {
      particle.targetElevation = 30 + Math.random() * 20;
      particle.velocity.y *= 3;
      particle.antigravity = 1.0;
    });
    
    // Spatial audio breakthrough
    spatialAudio.trigger({
      type: 'breakthrough',
      position: { x: 0, y: 15, z: 0 },
      intensity: 1.0
    });
    
    // Strong haptic feedback
    haptics.trigger({ intensity: 'strong' });
    
    console.log('PURIST BARRIER BREAKTHROUGH! 🚀 Genre boundaries: OBLITERATED');
  }

  updateWorld(deltaTime: number, audioData: AudioAnalysis): void {
    // Update elevation particles
    this.updateElevationParticles(deltaTime);
    
    // Update elevation meter
    this.updateElevationMeter();
    
    // Update anti-gravity field
    if (this.antigravityField) {
      const material = this.antigravityField.material as THREE.ShaderMaterial;
      material.uniforms.elevation.value = this.currentElevation;
      material.uniforms.antigravity.value = this.antigravityStrength;
    }
    
    // Update camera elevation
    this.updateCameraElevation();
    
    // Auto-progress elevation based on audio energy
    if (audioData.energy.total > 0.6) {
      this.currentElevation = Math.min(
        this.maxElevation,
        this.currentElevation + audioData.energy.total * deltaTime * this.elevationSpeed
      );
    }
  }

  private updateElevationParticles(deltaTime: number): void {
    this.elevationParticles.forEach((particle) => {
      // Anti-gravity movement
      particle.velocity.y += particle.antigravity * deltaTime * 0.1;
      particle.mesh.position.add(particle.velocity);
      
      // Elevation progress
      particle.elevation = THREE.MathUtils.lerp(
        particle.elevation,
        particle.targetElevation,
        deltaTime * 0.5
      );
      
      // Purist resistance affects upward movement
      if (particle.mesh.position.y > 15) {
        particle.velocity.y *= (1 - this.puristResistance * 0.1);
      }
      
      // Genre layer interaction
      const currentLayer = this.genreLayers.find(layer => 
        Math.abs(particle.mesh.position.y - layer.height) < 2
      );
      
      if (currentLayer && currentLayer.active) {
        // Particle gets genre boost
        const material = particle.mesh.material as THREE.MeshPhongMaterial;
        material.emissive = currentLayer.color.clone().multiplyScalar(0.3);
        particle.velocity.y += 0.01;
      }
      
      // Boundary management - cycle particles that fall or rise too far
      if (particle.mesh.position.y < -5) {
        particle.mesh.position.y = 0;
        particle.velocity.y = Math.abs(particle.velocity.y);
      } else if (particle.mesh.position.y > 50) {
        particle.mesh.position.y = 45;
        particle.targetElevation = Math.random() * 30;
      }
      
      // Horizontal boundary
      if (particle.mesh.position.length() > 25) {
        particle.velocity.x *= -0.5;
        particle.velocity.z *= -0.5;
      }
    });
  }

  private updateElevationMeter(): void {
    if (!this.elevationMeter) return;
    
    const targetLevel = Math.floor((this.currentElevation / this.maxElevation) * this.elevationMeter.maxLevel);
    
    this.elevationMeter.segments.forEach((segment, index) => {
      const material = segment.material as THREE.MeshPhongMaterial;
      
      if (index < targetLevel) {
        material.opacity = 0.9;
        material.emissive.setScalar(0.3);
      } else {
        material.opacity = 0.2;
        material.emissive.setScalar(0.05);
      }
    });
    
    this.elevationMeter.level = targetLevel;
  }

  private updateCameraElevation(): void {
    // Camera follows elevation progress
    const targetY = 15 + (this.currentElevation / this.maxElevation) * 15;
    this.camera.position.y = THREE.MathUtils.lerp(this.camera.position.y, targetY, 0.02);
    
    // Look at slightly elevated target
    const targetLookY = 10 + (this.currentElevation / this.maxElevation) * 10;
    this.camera.lookAt(0, targetLookY, 0);
  }

  handleInteraction(event: InteractionEvent): void {
    if (event.type === 'click') {
      // Each click progresses genre or breaks barriers
      if (this.currentAct === 'fuck-purists') {
        this.triggerPuristBarrierBreakthrough();
      } else {
        this.progressGenre('up');
      }
      
      // Boost elevation
      this.currentElevation = Math.min(this.maxElevation, this.currentElevation + 5);
      
      spatialAudio.ui.elevationBoost();
      haptics.trigger({ intensity: 'medium' });
    }
  }

  handleAudioEvent(audioData: AudioAnalysis): void {
    // Sync elevation to audio energy
    const energyBoost = audioData.energy.total * 10;
    this.currentElevation = Math.min(this.maxElevation, this.currentElevation + energyBoost * 0.1);
    
    // Beat onsets trigger elevation bursts
    if (audioData.onset) {
      this.elevationParticles.forEach((particle) => {
        particle.velocity.y += audioData.energy.total * 0.02;
        particle.targetElevation += audioData.energy.total * 5;
      });
      
      // Strong beats can break purist resistance
      if (audioData.energy.total > 0.8 && this.puristResistance > 0.3) {
        this.puristResistance = Math.max(0.1, this.puristResistance - 0.1);
        
        if (this.puristBarrier) {
          const material = this.puristBarrier.material as THREE.ShaderMaterial;
          material.uniforms.resistance.value = this.puristResistance;
        }
      }
    }
    
    // Update anti-gravity strength based on audio
    this.antigravityStrength = THREE.MathUtils.lerp(
      this.antigravityStrength,
      0.5 + audioData.energy.total * 0.5,
      0.1
    );
  }

  dispose(): void {
    // Clean up elevation particles
    this.elevationParticles.forEach((particle) => {
      this.scene.remove(particle.mesh);
      particle.mesh.geometry.dispose();
      (particle.mesh.material as THREE.Material).dispose();
    });
    
    // Clean up genre layers
    this.genreLayers.forEach((layer) => {
      this.scene.remove(layer.mesh);
      layer.mesh.geometry.dispose();
      (layer.mesh.material as THREE.Material).dispose();
    });
    
    // Clean up elevation meter
    if (this.elevationMeter) {
      this.scene.remove(this.elevationMeter.mesh);
      this.elevationMeter.segments.forEach((segment) => {
        segment.geometry.dispose();
        (segment.material as THREE.Material).dispose();
      });
    }
    
    // Clean up other objects
    if (this.antigravityField) {
      this.scene.remove(this.antigravityField);
      this.antigravityField.geometry.dispose();
      (this.antigravityField.material as THREE.Material).dispose();
    }
    
    if (this.puristBarrier) {
      this.scene.remove(this.puristBarrier);
      this.puristBarrier.geometry.dispose();
      (this.puristBarrier.material as THREE.Material).dispose();
    }
    
    console.log('House Work: Elevation transcended 🚀 Final elevation: INFINITE');
  }
}