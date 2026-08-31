import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

// Optional: For a production build, you would load high-res Earth textures (albedo, bump, specular, clouds)
// For this cinematic approach, we will use a procedural shader-like material for an advanced holographic look.

export function EarthGlobe() {
  const earthRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (earthRef.current) {
      // Extremely slow rotation
      earthRef.current.rotation.y = t * 0.05;
    }
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y = t * 0.06;
    }
  });

  return (
    <group>
      {/* Base Earth Sphere */}
      <Sphere ref={earthRef} args={[10, 64, 64]}>
        <meshStandardMaterial 
          color="#00183b" 
          emissive="#000a1f"
          emissiveIntensity={0.5}
          roughness={0.7}
          metalness={0.1}
          wireframe={true} // Holographic wireframe look
          transparent
          opacity={0.15}
        />
      </Sphere>

      {/* Solid inner core to prevent seeing right through */}
      <Sphere args={[9.9, 32, 32]}>
        <meshBasicMaterial color="#f8fafc" />
      </Sphere>

      {/* Outer Atmosphere Glow */}
      <Sphere ref={atmosphereRef} args={[10.5, 64, 64]}>
        <meshStandardMaterial 
          color="#38bdf8"
          transparent
          opacity={0.05}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </Sphere>
      
      {/* Intense Rim Light Atmosphere */}
      <Sphere args={[10.8, 64, 64]}>
        <meshBasicMaterial 
          color="#0ea5e9"
          transparent
          opacity={0.02}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </Sphere>
    </group>
  );
}
