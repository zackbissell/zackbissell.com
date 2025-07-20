import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { InstancedMesh, Object3D, Vector3, Color } from 'three';
import * as THREE from 'three';

interface AudioReactiveParticlesProps {
  audioData?: number[];
  worldTheme: 'disco' | 'nostalgia' | 'rolemodel' | 'elevation';
  particleCount?: number;
  intensityMultiplier?: number;
}

const worldConfigs = {
  disco: {
    colors: ['#F59E0B', '#EA580C', '#EF4444'],
    shape: 'sphere',
    movement: 'glitch',
  },
  nostalgia: {
    colors: ['#A855F7', '#EC4899', '#F43F5E'],
    shape: 'heart',
    movement: 'float',
  },
  rolemodel: {
    colors: ['#EAB308', '#EA580C', '#F97316'],
    shape: 'cube',
    movement: 'chaos',
  },
  elevation: {
    colors: ['#0EA5E9', '#F59E0B', '#00FFFF'],
    shape: 'tetrahedron',
    movement: 'ascend',
  },
};

function Particles({ 
  audioData = [], 
  worldTheme, 
  particleCount = 5000,
  intensityMultiplier = 1 
}: AudioReactiveParticlesProps) {
  const meshRef = useRef<InstancedMesh>(null);
  const { viewport } = useThree();
  const config = worldConfigs[worldTheme];
  
  // Pre-allocate objects for performance (MCP best practice)
  const temp = useMemo(() => new Object3D(), []);
  const tempColor = useMemo(() => new Color(), []);
  const tempVector = useMemo(() => new Vector3(), []);
  
  // Initialize particle positions and colors
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const colorArray = config.colors.map(color => new Color(color));
    
    for (let i = 0; i < particleCount; i++) {
      // Random positions within viewport
      positions[i * 3] = (Math.random() - 0.5) * viewport.width * 2;
      positions[i * 3 + 1] = (Math.random() - 0.5) * viewport.height * 2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      
      // Random colors from theme palette
      const color = colorArray[Math.floor(Math.random() * colorArray.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    
    return [positions, colors];
  }, [particleCount, viewport, config.colors]);
  
  // Initialize instances on mount
  useEffect(() => {
    if (!meshRef.current) return;
    
    for (let i = 0; i < particleCount; i++) {
      temp.position.set(
        positions[i * 3],
        positions[i * 3 + 1], 
        positions[i * 3 + 2]
      );
      temp.scale.setScalar(0.02);
      temp.updateMatrix();
      meshRef.current.setMatrixAt(i, temp.matrix);
    }
    
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [positions, particleCount, temp]);
  
  // Audio-reactive animation
  useFrame((state, delta) => {
    if (!meshRef.current || !audioData.length) return;
    
    const time = state.clock.elapsedTime;
    const averageFreq = audioData.reduce((a, b) => a + b, 0) / audioData.length;
    const intensity = averageFreq * intensityMultiplier;
    
    for (let i = 0; i < particleCount; i++) {
      // Get frequency for this particle (spread across spectrum)
      const freqIndex = Math.floor((i / particleCount) * audioData.length);
      const freq = audioData[freqIndex] || 0;
      const scaledFreq = freq * intensityMultiplier;
      
      // Base position
      const baseX = positions[i * 3];
      const baseY = positions[i * 3 + 1];
      const baseZ = positions[i * 3 + 2];
      
      // World-specific movement patterns
      switch (config.movement) {
        case 'glitch':
          // Disco: Glitch effects with frequency spikes
          tempVector.set(
            baseX + Math.sin(time * 10 + i) * scaledFreq * 0.5,
            baseY + Math.cos(time * 8 + i) * scaledFreq * 0.3,
            baseZ + Math.sin(time * 6 + i) * scaledFreq * 0.2
          );
          break;
          
        case 'float':
          // Nostalgia: Gentle floating with emotional pulses
          tempVector.set(
            baseX + Math.sin(time * 2 + i * 0.1) * 0.2,
            baseY + Math.cos(time * 1.5 + i * 0.1) * 0.3 + scaledFreq * 0.5,
            baseZ + Math.sin(time * 1 + i * 0.1) * 0.1
          );
          break;
          
        case 'chaos':
          // Role Model: Pure chaos with high energy
          tempVector.set(
            baseX + (Math.random() - 0.5) * scaledFreq * 2,
            baseY + (Math.random() - 0.5) * scaledFreq * 2,
            baseZ + (Math.random() - 0.5) * scaledFreq * 1
          );
          break;
          
        case 'ascend':
          // Elevation: Upward movement with frequency lift
          tempVector.set(
            baseX + Math.sin(time + i * 0.05) * 0.1,
            baseY + time * 0.1 + scaledFreq * 1.5,
            baseZ + Math.cos(time + i * 0.05) * 0.1
          );
          // Reset particles that go too high
          if (tempVector.y > viewport.height) {
            tempVector.y = -viewport.height;
          }
          break;
          
        default:
          tempVector.set(baseX, baseY, baseZ);
      }
      
      // Scale based on frequency
      const scale = 0.02 + scaledFreq * 0.05;
      
      temp.position.copy(tempVector);
      temp.scale.setScalar(scale);
      temp.updateMatrix();
      
      meshRef.current.setMatrixAt(i, temp.matrix);
    }
    
    meshRef.current.instanceMatrix.needsUpdate = true;
  });
  
  // Get geometry based on world theme
  const getGeometry = () => {
    switch (config.shape) {
      case 'sphere':
        return <sphereGeometry args={[1, 8, 8]} />;
      case 'cube':
        return <boxGeometry args={[1, 1, 1]} />;
      case 'tetrahedron':
        return <tetrahedronGeometry args={[1]} />;
      case 'heart':
      default:
        return <sphereGeometry args={[1, 6, 6]} />;
    }
  };
  
  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, particleCount]}>
      {getGeometry()}
      <meshBasicMaterial
        vertexColors
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </instancedMesh>
  );
}

export const AudioReactiveParticles: React.FC<AudioReactiveParticlesProps> = (props) => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
        frameloop="demand" // MCP best practice: on-demand rendering
      >
        <Particles {...props} />
      </Canvas>
    </div>
  );
};

export default AudioReactiveParticles;