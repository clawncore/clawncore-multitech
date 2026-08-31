import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function InnovationCore() {
  const ringsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (ringsRef.current) {
      const time = state.clock.elapsedTime;
      // Slowly rotate the base rings
      ringsRef.current.children.forEach((ring, idx) => {
        ring.rotation.y = time * (0.2 + idx * 0.1) * (idx % 2 === 0 ? 1 : -1);
      });
    }
  });

  return (
    <group>
      {/* Central Pedestal Base */}
      <mesh position={[0, 0.25, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[3, 3.5, 0.5, 64]} />
        <meshStandardMaterial 
          color="#f8fafc" 
          metalness={0.2} 
          roughness={0.1} 
        />
      </mesh>

      {/* Inner illuminated core */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[2, 2.5, 0.1, 64]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.8} />
      </mesh>

      {/* Rotating protective/containment rings */}
      <group ref={ringsRef} position={[0, 0.6, 0]}>
        {[2.8, 3.0, 3.2].map((radius, idx) => (
          <mesh key={idx} rotation={[-Math.PI / 2, 0, 0]}>
            <torusGeometry args={[radius, 0.02, 16, 100]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.2} />
          </mesh>
        ))}
      </group>
      
      {/* Laboratory Floor Grid */}
      <gridHelper args={[40, 40, '#e2e8f0', '#f1f5f9']} position={[0, 0.01, 0]} />
    </group>
  );
}
