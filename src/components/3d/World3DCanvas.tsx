/**
 * Revolutionary 3D Canvas Component
 * Apple-level polish with A24 cinematic quality
 * Progressive enhancement with performance optimization
 */

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { useWebGL } from '../../utils/webgl-engine';
import { usePerformanceMonitor } from '../../utils/performance-monitor';
import { useSpatialGestures, type GestureEvent } from '../../utils/spatial-gestures';
import { spatialAudio } from '../../utils/spatial-audio';
import { haptics } from '../../utils/haptics';
import WorldScene, { type InteractionEvent } from '../../utils/world-scene';

interface World3DCanvasProps {
  world: 'disco' | 'nostalgia' | 'rolemodel' | 'elevation';
  audioData?: {
    frequencyData: Uint8Array;
    timeData: Uint8Array;
    bpm: number;
    energy: { bass: number; mids: number; highs: number; total: number };
    onset: boolean;
    pitch: number;
    rms: number;
  };
  className?: string;
  showPerformanceOverlay?: boolean;
  enableInteractions?: boolean;
  onSceneReady?: (scene: WorldScene) => void;
}

// Demo World Scene for testing the foundation
class DemoWorldScene extends WorldScene {
  private cube: THREE.Mesh | null = null;
  private rotationSpeed = 0.01;

  async initializeWorld(): Promise<void> {
    // Create a simple demo cube to test the system
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshPhongMaterial({ 
      color: this.getWorldColor(),
      transparent: true,
      opacity: 0.8
    });
    
    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);
    
    // Add to audio reactive objects
    this.audioReactiveObjects.push(this.cube);
    
    console.log(`${this.config.name} demo world initialized`);
  }

  updateWorld(deltaTime: number, audioData: any): void {
    if (this.cube) {
      // Rotate the cube
      this.cube.rotation.x += this.rotationSpeed;
      this.cube.rotation.y += this.rotationSpeed * 0.7;
      
      // React to audio if available
      if (audioData) {
        const scale = 1 + audioData.energy.total * 0.5;
        this.cube.scale.set(scale, scale, scale);
        
        // Change rotation speed based on BPM
        this.rotationSpeed = 0.01 + (audioData.bpm / 1000);
      }
    }
  }

  handleInteraction(event: InteractionEvent): void {
    if (event.type === 'click' && this.cube) {
      // Trigger haptic feedback
      haptics.trigger({ intensity: 'medium' });
      
      // Play spatial audio
      spatialAudio.ui.buttonClick();
      
      // Animate cube
      this.cube.rotation.z += Math.PI / 4;
    }
  }

  handleAudioEvent(audioData: any): void {
    if (audioData.onset && this.cube) {
      // Flash the cube on beat
      const material = this.cube.material as THREE.MeshPhongMaterial;
      material.emissive.setHex(0x444444);
      
      setTimeout(() => {
        material.emissive.setHex(0x000000);
      }, 100);
    }
  }

  private getWorldColor(): number {
    switch (this.config.name) {
      case 'disco': return 0xf59e0b; // Amber
      case 'nostalgia': return 0xa855f7; // Purple
      case 'rolemodel': return 0xeab308; // Yellow
      case 'elevation': return 0x0ea5e9; // Blue
      default: return 0xffffff;
    }
  }

  dispose(): void {
    if (this.cube) {
      this.scene.remove(this.cube);
      this.cube.geometry.dispose();
      (this.cube.material as THREE.Material).dispose();
    }
  }
}

export default function World3DCanvas({
  world,
  audioData,
  className = '',
  showPerformanceOverlay = false,
  enableInteractions = true,
  onSceneReady,
}: World3DCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<DemoWorldScene | null>(null);
  const animationFrameRef = useRef<number>();
  
  const { isReady, capabilities, engine } = useWebGL(canvasRef.current);
  const { summary, qualitySettings, recentAlerts } = usePerformanceMonitor();
  
  const [isSceneReady, setIsSceneReady] = useState(false);
  const [showFallback, setShowFallback] = useState(false);

  // Handle gestures if interactions are enabled
  const gestureRef = useSpatialGestures(
    {
      enableSwipe: enableInteractions,
      enablePinch: enableInteractions,
      enableHover3D: enableInteractions,
      worldContext: world,
      hapticFeedback: enableInteractions,
    },
    handleGesture
  );

  function handleGesture(gesture: GestureEvent) {
    if (!sceneRef.current) return;

    const interaction: InteractionEvent = {
      type: gesture.type === 'swipe' ? 'scroll' : 'click',
      position: gesture.center ? new THREE.Vector2(gesture.center.x, gesture.center.y) : undefined,
      intensity: gesture.velocity || gesture.scale || 1,
      data: gesture,
    };

    sceneRef.current.handleInteraction(interaction);
  }

  // Initialize scene when WebGL is ready
  useEffect(() => {
    if (!isReady || !canvasRef.current) return;

    const initScene = async () => {
      try {
        sceneRef.current = new DemoWorldScene(world);
        await sceneRef.current.initializeWorld();
        
        setIsSceneReady(true);
        onSceneReady?.(sceneRef.current);
        
        console.log(`${world} 3D scene initialized successfully`);
      } catch (error) {
        console.error('Failed to initialize 3D scene:', error);
        setShowFallback(true);
      }
    };

    initScene();
  }, [isReady, world, onSceneReady]);

  // Animation loop
  useEffect(() => {
    if (!isSceneReady || !sceneRef.current) return;

    const animate = () => {
      if (sceneRef.current) {
        // Update scene with audio data
        sceneRef.current.update(audioData || {
          frequencyData: new Uint8Array(256),
          timeData: new Uint8Array(256),
          bpm: 120,
          energy: { bass: 0, mids: 0, highs: 0, total: 0 },
          onset: false,
          pitch: 440,
          rms: 0,
        });
        
        // Render the scene
        sceneRef.current.render();
      }
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    sceneRef.current.start();
    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (sceneRef.current) {
        sceneRef.current.stop();
      }
    };
  }, [isSceneReady, audioData]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (sceneRef.current && canvasRef.current) {
        const { clientWidth, clientHeight } = canvasRef.current.parentElement || canvasRef.current;
        sceneRef.current.resize(clientWidth, clientHeight);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isSceneReady]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (sceneRef.current) {
        sceneRef.current.dispose();
      }
    };
  }, []);

  // Show fallback if WebGL is not supported
  if (!capabilities?.webGL || showFallback) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`flex items-center justify-center bg-gradient-to-br from-world-primary/10 to-world-secondary/10 rounded-xl border border-world-primary/20 ${className}`}
      >
        <div className="text-center p-8">
          <div className="text-4xl mb-4">🎨</div>
          <h3 className="text-title3 mb-2">2D Experience Mode</h3>
          <p className="text-body text-foreground-secondary">
            3D features unavailable. Enjoying enhanced 2D experience.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className={`relative ${className}`} ref={gestureRef}>
      <motion.canvas
        ref={canvasRef}
        className="w-full h-full rounded-xl"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: isSceneReady ? 1 : 0.5, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          background: `linear-gradient(135deg, 
            hsl(var(--world-primary) / 0.05), 
            hsl(var(--world-secondary) / 0.05)
          )`,
        }}
      />

      {/* Loading overlay */}
      <AnimatePresence>
        {!isSceneReady && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-xl"
          >
            <div className="text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="w-8 h-8 border-2 border-world-primary border-t-transparent rounded-full mx-auto mb-4"
              />
              <p className="text-callout text-foreground-secondary">
                Initializing {world} world...
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Performance overlay */}
      <AnimatePresence>
        {showPerformanceOverlay && isSceneReady && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm rounded-lg p-3 border border-foreground/10"
          >
            <div className="text-caption space-y-1">
              <div className="flex justify-between gap-4">
                <span>FPS:</span>
                <span className={`font-mono ${summary.averageFPS > 30 ? 'text-success' : 'text-destructive'}`}>
                  {summary.averageFPS}
                </span>
              </div>
              <div className="flex justify-between gap-4">
                <span>Memory:</span>
                <span className="font-mono">{summary.memoryUsage}MB</span>
              </div>
              <div className="flex justify-between gap-4">
                <span>Quality:</span>
                <span className="font-mono">{summary.qualityLevel}</span>
              </div>
              {recentAlerts.length > 0 && (
                <div className="text-destructive text-xs mt-2">
                  {recentAlerts.length} alert(s)
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interaction hint */}
      {enableInteractions && isSceneReady && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 2 }}
          className="absolute bottom-4 right-4 text-caption text-foreground-tertiary"
        >
          Click to interact
        </motion.div>
      )}
    </div>
  );
}