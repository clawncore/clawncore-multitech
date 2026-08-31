import { useMemo, useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Tube, useCursor } from '@react-three/drei';
import * as THREE from 'three';

interface NeuralStreamsProps {
  activeModuleId: string | null;
  onModuleSelect: (id: string) => void;
}

// Define the interactive neural nodes
const NEURAL_NODES = [
  { id: 'autonomous', position: new THREE.Vector3(-4, 2, 2) },
  { id: 'predictive', position: new THREE.Vector3(4, 3, -1) },
  { id: 'security', position: new THREE.Vector3(-3, -3, 3) },
  { id: 'learning', position: new THREE.Vector3(5, -2, 1) },
];

export function NeuralStreams({ activeModuleId, onModuleSelect }: NeuralStreamsProps) {
  const [hovered, setHovered] = useState<string | null>(null);
  useCursor(hovered !== null, 'pointer', 'auto');
  
  const groupRef = useRef<THREE.Group>(null);

  // Generate smooth splines connecting the core to the nodes
  const paths = useMemo(() => {
    return NEURAL_NODES.map(node => {
      // Create a curved path from center to node
      const points = [];
      const steps = 20;
      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        // Simple easing for a nice curve
        const x = node.position.x * t;
        const y = node.position.y * t + Math.sin(t * Math.PI) * 2; // Curve upwards/downwards
        const z = node.position.z * t;
        points.push(new THREE.Vector3(x, y, z));
      }
      return new THREE.CatmullRomCurve3(points);
    });
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      // Slowly rotate the entire pathway system
      groupRef.current.rotation.y = Math.sin(t * 0.1) * 0.2;
    }
  });

  const getMaterialProps = (id: string) => {
    const isActive = activeModuleId === id;
    const isHovered = hovered === id;
    const isDimmed = activeModuleId !== null && activeModuleId !== id;
    
    return {
      color: isActive || isHovered ? '#60a5fa' : '#1e3a8a',
      emissive: isActive ? '#60a5fa' : isHovered ? '#3b82f6' : '#1e3a8a',
      emissiveIntensity: isActive ? 3 : isHovered ? 2 : 0.5,
      opacity: isDimmed ? 0.2 : 0.8,
      transparent: true,
      roughness: 0.1,
      metalness: 0.8
    };
  };

  return (
    <group ref={groupRef}>
      {/* Render the flowing pathways */}
      {paths.map((path, index) => (
        <Tube key={`path-${index}`} args={[path, 64, 0.05, 8, false]}>
          <meshBasicMaterial 
            color="#3b82f6" 
            transparent 
            opacity={0.15} 
            blending={THREE.AdditiveBlending} 
          />
        </Tube>
      ))}

      {/* Render the interactive nodes at the end of pathways */}
      {NEURAL_NODES.map((node) => (
        <group key={node.id} position={node.position}>
          <Sphere 
            args={[0.6, 32, 32]}
            onPointerOver={(e) => { e.stopPropagation(); setHovered(node.id); }}
            onPointerOut={(e) => { e.stopPropagation(); setHovered(null); }}
            onClick={(e) => { e.stopPropagation(); onModuleSelect(node.id); }}
          >
            <meshStandardMaterial {...getMaterialProps(node.id)} />
          </Sphere>
          
          {/* Inner bright core for nodes */}
          <Sphere args={[0.2, 16, 16]}>
            <meshBasicMaterial color="#ffffff" transparent opacity={activeModuleId === node.id || hovered === node.id ? 1 : 0.2} />
          </Sphere>

          {/* Holographic rings around nodes */}
          <mesh rotation={[Math.PI/2, 0, 0]}>
            <ringGeometry args={[0.8, 0.85, 32]} />
            <meshBasicMaterial 
              color="#60a5fa" 
              side={THREE.DoubleSide} 
              transparent 
              opacity={activeModuleId === node.id ? 0.8 : 0.1} 
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}
