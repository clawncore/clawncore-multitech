import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Sphere, Icosahedron, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

export function AICore() {
  const innerPlasmaRef = useRef<THREE.Mesh>(null);
  const outerLatticeRef = useRef<THREE.Mesh>(null);
  const { mouse, viewport } = useThree();

  // Smoothing vector for mouse tracking
  const targetRotation = new THREE.Vector2();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Calculate target rotation based on mouse position
    targetRotation.x = (mouse.x * viewport.width) / 10;
    targetRotation.y = (mouse.y * viewport.height) / 10;

    if (innerPlasmaRef.current) {
      // Rotate the plasma organically
      innerPlasmaRef.current.rotation.x = t * 0.2;
      innerPlasmaRef.current.rotation.y = t * 0.3;
    }

    if (outerLatticeRef.current) {
      // Slowly rotate the lattice, but also react to mouse
      outerLatticeRef.current.rotation.y = t * 0.1 + targetRotation.x * 0.05;
      outerLatticeRef.current.rotation.x = t * 0.1 - targetRotation.y * 0.05;
      
      // Slight breathing scale effect
      const scale = 1 + Math.sin(t * 2) * 0.02;
      outerLatticeRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Inner Amorphous Plasma Core */}
      <Sphere ref={innerPlasmaRef} args={[2, 64, 64]}>
        <MeshDistortMaterial 
          color="#1e3a8a" 
          emissive="#3b82f6" 
          emissiveIntensity={2} 
          distort={0.4} 
          speed={2} 
          roughness={0.2} 
          metalness={0.8} 
        />
      </Sphere>

      {/* Outer Holographic Geometric Lattice */}
      <Icosahedron ref={outerLatticeRef} args={[2.8, 2]}>
        <meshPhysicalMaterial 
          color="#60a5fa" 
          emissive="#3b82f6"
          emissiveIntensity={0.5}
          wireframe={true} 
          transparent={true}
          opacity={0.3}
          roughness={0.1}
        />
      </Icosahedron>
      
      {/* Secondary Counter-Rotating Lattice */}
      <Icosahedron args={[3, 1]}>
        <meshPhysicalMaterial 
          color="#60a5fa" 
          emissive="#2563eb"
          emissiveIntensity={0.2}
          wireframe={true} 
          transparent={true}
          opacity={0.1}
        />
      </Icosahedron>
    </group>
  );
}
