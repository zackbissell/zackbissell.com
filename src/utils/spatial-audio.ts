/**
 * Spatial Audio UI System
 * 3D positioned interface sounds and immersive audio feedback
 * Apple-level audio design for revolutionary user experiences
 */

import React from 'react';

interface SpatialAudioOptions {
  enabled?: boolean;
  volume?: number;
  worldContext?: 'disco' | 'nostalgia' | 'rolemodel' | 'elevation';
  spatialPositioning?: boolean;
  reverb?: 'none' | 'room' | 'hall' | 'cathedral';
  doppler?: boolean;
}

interface AudioPosition {
  x: number; // -1 (left) to 1 (right)
  y: number; // -1 (down) to 1 (up)
  z: number; // -1 (far) to 1 (near)
}

interface SoundDefinition {
  frequency: number;
  duration: number;
  type: 'sine' | 'square' | 'sawtooth' | 'triangle';
  envelope?: {
    attack: number;
    decay: number;
    sustain: number;
    release: number;
  };
  filter?: {
    type: 'lowpass' | 'highpass' | 'bandpass';
    frequency: number;
    q: number;
  };
}

class SpatialAudioEngine {
  private audioContext: AudioContext | null = null;
  private pannerNodes: Map<string, PannerNode> = new Map();
  private reverbBuffer: AudioBuffer | null = null;
  private isInitialized = false;
  private options: SpatialAudioOptions;

  // Sound library for different interactions
  private sounds: { [key: string]: SoundDefinition } = {
    // Universal UI sounds
    buttonHover: {
      frequency: 800,
      duration: 0.1,
      type: 'sine',
      envelope: { attack: 0.01, decay: 0.05, sustain: 0.3, release: 0.04 },
    },
    buttonClick: {
      frequency: 1200,
      duration: 0.15,
      type: 'triangle',
      envelope: { attack: 0.01, decay: 0.1, sustain: 0.2, release: 0.04 },
    },
    modalOpen: {
      frequency: 600,
      duration: 0.3,
      type: 'sine',
      envelope: { attack: 0.05, decay: 0.15, sustain: 0.5, release: 0.1 },
    },
    modalClose: {
      frequency: 400,
      duration: 0.2,
      type: 'sine',
      envelope: { attack: 0.01, decay: 0.1, sustain: 0.3, release: 0.09 },
    },
    success: {
      frequency: 1000,
      duration: 0.4,
      type: 'triangle',
      envelope: { attack: 0.02, decay: 0.2, sustain: 0.6, release: 0.18 },
    },
    error: {
      frequency: 200,
      duration: 0.5,
      type: 'square',
      envelope: { attack: 0.01, decay: 0.2, sustain: 0.4, release: 0.29 },
      filter: { type: 'lowpass', frequency: 800, q: 2 },
    },

    // Disco Ascension - Government/Glitch sounds
    discoGlitch: {
      frequency: 1500,
      duration: 0.2,
      type: 'square',
      envelope: { attack: 0.001, decay: 0.05, sustain: 0.1, release: 0.149 },
    },
    discoTerminal: {
      frequency: 2000,
      duration: 0.1,
      type: 'sawtooth',
      envelope: { attack: 0.001, decay: 0.02, sustain: 0.3, release: 0.077 },
    },
    discoClassified: {
      frequency: 300,
      duration: 0.8,
      type: 'square',
      envelope: { attack: 0.1, decay: 0.3, sustain: 0.6, release: 0.2 },
      filter: { type: 'bandpass', frequency: 1000, q: 5 },
    },

    // Nostalgia Trap - Emotional sounds
    nostalgiaHeartbeat: {
      frequency: 60,
      duration: 1.0,
      type: 'sine',
      envelope: { attack: 0.1, decay: 0.3, sustain: 0.4, release: 0.6 },
      filter: { type: 'lowpass', frequency: 200, q: 1 },
    },
    nostalgiaTear: {
      frequency: 800,
      duration: 2.0,
      type: 'triangle',
      envelope: { attack: 0.5, decay: 1.0, sustain: 0.3, release: 0.5 },
    },
    nostalgiaMemory: {
      frequency: 1200,
      duration: 0.6,
      type: 'sine',
      envelope: { attack: 0.2, decay: 0.2, sustain: 0.5, release: 0.2 },
    },

    // Role Model - Chaos sounds
    rolemodelChaos: {
      frequency: 2000,
      duration: 0.3,
      type: 'sawtooth',
      envelope: { attack: 0.001, decay: 0.1, sustain: 0.2, release: 0.199 },
    },
    rolemodelCoffee: {
      frequency: 1500,
      duration: 0.4,
      type: 'triangle',
      envelope: { attack: 0.05, decay: 0.15, sustain: 0.6, release: 0.2 },
    },
    rolemodelUnhinged: {
      frequency: 100,
      duration: 1.2,
      type: 'square',
      envelope: { attack: 0.01, decay: 0.5, sustain: 0.3, release: 0.69 },
    },

    // Elevation - Anti-gravity sounds
    elevationFloat: {
      frequency: 1000,
      duration: 1.5,
      type: 'sine',
      envelope: { attack: 0.3, decay: 0.5, sustain: 0.8, release: 0.7 },
    },
    elevationAscend: {
      frequency: 400,
      duration: 2.0,
      type: 'triangle',
      envelope: { attack: 0.5, decay: 0.8, sustain: 0.9, release: 0.7 },
    },
    elevationAntiPurist: {
      frequency: 1800,
      duration: 0.4,
      type: 'sawtooth',
      envelope: { attack: 0.01, decay: 0.15, sustain: 0.3, release: 0.24 },
    },
  };

  constructor(options: SpatialAudioOptions = {}) {
    this.options = {
      enabled: true,
      volume: 0.3,
      spatialPositioning: true,
      reverb: 'room',
      doppler: false,
      ...options,
    };
  }

  async initialize(): Promise<void> {
    if (this.isInitialized || !this.options.enabled) return;

    try {
      this.audioContext = new (window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext)();
      
      // Create reverb impulse response
      await this.createReverbBuffer();
      
      this.isInitialized = true;
    } catch (error) {
      console.warn('Spatial audio not supported:', error);
      this.options.enabled = false;
    }
  }

  private async createReverbBuffer(): Promise<void> {
    if (!this.audioContext) return;

    const length = this.audioContext.sampleRate * 2; // 2 seconds of reverb
    this.reverbBuffer = this.audioContext.createBuffer(2, length, this.audioContext.sampleRate);

    for (let channel = 0; channel < 2; channel++) {
      const channelData = this.reverbBuffer.getChannelData(channel);
      for (let i = 0; i < length; i++) {
        const decay = Math.pow(1 - i / length, 2);
        channelData[i] = (Math.random() * 2 - 1) * decay * 0.1;
      }
    }
  }

  async play(
    soundName: keyof typeof this.sounds | string,
    position?: AudioPosition,
    customSound?: SoundDefinition
  ): Promise<void> {
    if (!this.options.enabled || !this.audioContext) return;

    if (this.audioContext.state === 'suspended') {
      await this.audioContext.resume();
    }

    const sound = customSound || this.sounds[soundName];
    if (!sound) return;

    const startTime = this.audioContext.currentTime;
    const endTime = startTime + sound.duration;

    // Create oscillator
    const oscillator = this.audioContext.createOscillator();
    oscillator.type = sound.type;
    oscillator.frequency.setValueAtTime(sound.frequency, startTime);

    // Create gain envelope
    const gainNode = this.audioContext.createGain();
    if (sound.envelope) {
      const { attack, decay, sustain, release } = sound.envelope;
      const sustainTime = sound.duration - attack - decay - release;
      
      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(this.options.volume!, startTime + attack);
      gainNode.gain.linearRampToValueAtTime(this.options.volume! * sustain, startTime + attack + decay);
      gainNode.gain.setValueAtTime(this.options.volume! * sustain, startTime + attack + decay + sustainTime);
      gainNode.gain.linearRampToValueAtTime(0, endTime);
    } else {
      gainNode.gain.setValueAtTime(this.options.volume!, startTime);
      gainNode.gain.linearRampToValueAtTime(0, endTime);
    }

    // Create filter if specified
    let filterNode: BiquadFilterNode | null = null;
    if (sound.filter) {
      filterNode = this.audioContext.createBiquadFilter();
      filterNode.type = sound.filter.type;
      filterNode.frequency.setValueAtTime(sound.filter.frequency, startTime);
      filterNode.Q.setValueAtTime(sound.filter.q, startTime);
    }

    // Create spatial panner if position is specified
    let pannerNode: PannerNode | null = null;
    if (position && this.options.spatialPositioning) {
      pannerNode = this.audioContext.createPanner();
      pannerNode.panningModel = 'HRTF';
      pannerNode.distanceModel = 'inverse';
      pannerNode.setPosition(position.x, position.y, position.z);
      
      if (this.options.doppler) {
        pannerNode.dopplerFactor = 1;
      }
    }

    // Create reverb if enabled
    let reverbNode: ConvolverNode | null = null;
    let reverbGain: GainNode | null = null;
    if (this.options.reverb !== 'none' && this.reverbBuffer) {
      reverbNode = this.audioContext.createConvolver();
      reverbNode.buffer = this.reverbBuffer;
      reverbGain = this.audioContext.createGain();
      reverbGain.gain.value = 0.3; // Mix level for reverb
    }

    // Connect audio graph
    oscillator.connect(gainNode);
    
    if (filterNode) {
      gainNode.connect(filterNode);
      filterNode.connect(pannerNode || this.audioContext.destination);
    } else {
      gainNode.connect(pannerNode || this.audioContext.destination);
    }

    if (pannerNode) {
      pannerNode.connect(this.audioContext.destination);
      
      // Also connect to reverb if available
      if (reverbNode && reverbGain) {
        pannerNode.connect(reverbGain);
        reverbGain.connect(reverbNode);
        reverbNode.connect(this.audioContext.destination);
      }
    }

    // Start and stop oscillator
    oscillator.start(startTime);
    oscillator.stop(endTime);
  }

  // Convenience methods for world-specific sounds
  disco = {
    glitch: (position?: AudioPosition) => this.play('discoGlitch', position),
    terminal: (position?: AudioPosition) => this.play('discoTerminal', position),
    classified: (position?: AudioPosition) => this.play('discoClassified', position),
  };

  nostalgia = {
    heartbeat: (position?: AudioPosition) => this.play('nostalgiaHeartbeat', position),
    tear: (position?: AudioPosition) => this.play('nostalgiaTear', position),
    memory: (position?: AudioPosition) => this.play('nostalgiaMemory', position),
  };

  rolemodel = {
    chaos: (position?: AudioPosition) => this.play('rolemodelChaos', position),
    coffee: (position?: AudioPosition) => this.play('rolemodelCoffee', position),
    unhinged: (position?: AudioPosition) => this.play('rolemodelUnhinged', position),
  };

  elevation = {
    float: (position?: AudioPosition) => this.play('elevationFloat', position),
    ascend: (position?: AudioPosition) => this.play('elevationAscend', position),
    antiPurist: (position?: AudioPosition) => this.play('elevationAntiPurist', position),
  };

  // UI interaction sounds
  ui = {
    buttonHover: (position?: AudioPosition) => this.play('buttonHover', position),
    buttonClick: (position?: AudioPosition) => this.play('buttonClick', position),
    modalOpen: (position?: AudioPosition) => this.play('modalOpen', position),
    modalClose: (position?: AudioPosition) => this.play('modalClose', position),
    success: (position?: AudioPosition) => this.play('success', position),
    error: (position?: AudioPosition) => this.play('error', position),
  };

  setVolume(volume: number): void {
    this.options.volume = Math.max(0, Math.min(1, volume));
  }

  enable(): void {
    this.options.enabled = true;
    this.initialize();
  }

  disable(): void {
    this.options.enabled = false;
  }

  destroy(): void {
    if (this.audioContext) {
      this.audioContext.close();
    }
    this.pannerNodes.clear();
  }
}

// Global spatial audio instance
export const spatialAudio = new SpatialAudioEngine();

// React hook for spatial audio
export function useSpatialAudio(options?: SpatialAudioOptions) {
  const audioEngine = new SpatialAudioEngine(options);
  
  React.useEffect(() => {
    audioEngine.initialize();
    return () => audioEngine.destroy();
  }, []);

  return audioEngine;
}

// Utility function to calculate position from element
export function getElementPosition(element: HTMLElement): AudioPosition {
  const rect = element.getBoundingClientRect();
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  
  const x = (rect.left + rect.width / 2 - centerX) / centerX;
  const y = (centerY - rect.top - rect.height / 2) / centerY;
  const z = 0; // Default to center depth
  
  return { x: Math.max(-1, Math.min(1, x)), y: Math.max(-1, Math.min(1, y)), z };
}

// Auto-initialize spatial audio
if (typeof window !== 'undefined') {
  spatialAudio.initialize();
}

export type { SpatialAudioOptions, AudioPosition, SoundDefinition };