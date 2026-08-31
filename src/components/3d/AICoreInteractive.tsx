import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Icosahedron, Sphere, Torus } from '@react-three/drei';
import * as THREE from 'three';
import { AIStatus } from '../../hooks/useAIConversation';

interface AICoreProps {
  status: AIStatus;
}

export function AICoreInteractive({ status }: AICoreProps) {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const shell1Ref = useRef<THREE.Mesh>(null);
  const shell2Ref = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (!groupRef.current) return;

    // Base floating motion
    groupRef.current.position.y = Math.sin(t * 0.8) * 0.2;

    // Determine target values based on AI status
    let targetCoreScale = 1.0;
    let targetEmissive = 1.5;
    let ringSpeed = 0.5;
    let shellSpeed = 0.2;

    if (status === 'thinking') {
      targetCoreScale = 0.8 + Math.sin(t * 8) * 0.1; // rapid tight pulsing
      targetEmissive = 3.0;
      ringSpeed = 4.0; // spinning fast to process
      shellSpeed = 1.0;
    } else if (status === 'responding') {
      targetCoreScale = 1.2 + Math.sin(t * 4) * 0.15; // wide rhythmic pulsing
      targetEmissive = 4.5;
      ringSpeed = 1.5;
      shellSpeed = 0.5;
    }

    // Interpolate core values smoothly
    if (coreRef.current) {
      coreRef.current.scale.lerp(new THREE.Vector3(targetCoreScale, targetCoreScale, targetCoreScale), 0.1);
      const mat = coreRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = THREE.MathUtils.lerp(mat.emissiveIntensity, targetEmissive, 0.1);
    }

    // Rotate shells
    if (shell1Ref.current) {
      shell1Ref.current.rotation.x += 0.01 * shellSpeed;
      shell1Ref.current.rotation.y += 0.02 * shellSpeed;
    }
    if (shell2Ref.current) {
      shell2Ref.current.rotation.y -= 0.015 * shellSpeed;
      shell2Ref.current.rotation.z -= 0.01 * shellSpeed;
    }

    // Rotate intelligence ring
    if (ringRef.current) {
      ringRef.current.rotation.x = Math.PI / 2 + Math.sin(t * 0.5) * 0.2;
      ringRef.current.rotation.z += 0.02 * ringSpeed;
      
      const mat = ringRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = THREE.MathUtils.lerp(mat.emissiveIntensity, status !== 'idle' ? 2 : 0.5, 0.1);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Intelligence Core */}
      <Sphere ref={coreRef} args={[1, 64, 64]}>
        <meshStandardMaterial 
          color="#3b82f6" 
          emissive="#60a5fa" 
          emissiveIntensity={1.5}
          roughness={0.1}
          metalness={0.9}
          transparent
          opacity={0.9}
        />
      </Sphere>

      {/* Inner Lattice */}
      <Icosahedron ref={shell1Ref} args={[1.3, 2]}>
        <meshStandardMaterial 
          color="#2563eb" 
          wireframe 
          transparent 
          opacity={0.4}
        />
      </Icosahedron>

      {/* Outer Lattice */}
      <Icosahedron ref={shell2Ref} args={[1.5, 1]}>
        <meshStandardMaterial 
          color="#22d3ee" 
          wireframe 
          transparent 
          opacity={0.2}
        />
      </Icosahedron>

      {/* Orbital Data Ring */}
      <Torus ref={ringRef} args={[2.2, 0.02, 16, 100]}>
        <meshStandardMaterial 
          color="#bfdbfe" 
          emissive="#bfdbfe" 
          emissiveIntensity={0.5} 
          transparent 
          opacity={0.8}
        />
      </Torus>
    </group>
  );
}
