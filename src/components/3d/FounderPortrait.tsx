import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Torus } from '@react-three/drei';
import * as THREE from 'three';

export function FounderPortrait() {
  const presenceRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);
  const auraRef = useRef<THREE.Mesh>(null);
  const particleRef = useRef<THREE.InstancedMesh>(null);
  const dummy = new THREE.Object3D();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Gentle floating presence
    if (presenceRef.current) {
      presenceRef.current.position.y = Math.sin(t * 0.4) * 0.15;
      presenceRef.current.rotation.y = Math.sin(t * 0.15) * 0.12;
    }

    // Counter-rotating orbital rings at different speeds & tilts
    if (ring1Ref.current) ring1Ref.current.rotation.z = t * 0.25;
    if (ring2Ref.current) ring2Ref.current.rotation.x = t * 0.18;
    if (ring3Ref.current) {
      ring3Ref.current.rotation.y = t * 0.12;
      ring3Ref.current.rotation.z = t * 0.08;
    }

    // Breathing aura
    if (auraRef.current) {
      const scale = 1 + Math.sin(t * 1.5) * 0.04;
      auraRef.current.scale.set(scale, scale, scale);
    }

    // Orbit dust particles
    if (particleRef.current) {
      for (let i = 0; i < 80; i++) {
        const angle = (i / 80) * Math.PI * 2 + t * 0.2;
        const radius = 2.2 + Math.sin(i * 1.5) * 0.4;
        const yOffset = Math.sin(i * 0.8 + t * 0.5) * 0.6;
        dummy.position.set(
          Math.cos(angle) * radius,
          yOffset,
          Math.sin(angle) * radius
        );
        dummy.scale.setScalar(0.04 + Math.sin(i + t) * 0.02);
        dummy.updateMatrix();
        particleRef.current.setMatrixAt(i, dummy.matrix);
      }
      particleRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group ref={presenceRef} position={[0, 0, 0]}>
      {/* Central presence core — represents the founder's intelligence */}
      <Sphere args={[0.9, 64, 64]}>
        <meshPhysicalMaterial
          color="#0d1b3e"
          emissive="#1e3a8a"
          emissiveIntensity={1.5}
          roughness={0.1}
          metalness={0.9}
          clearcoat={1}
          clearcoatRoughness={0.05}
          transmission={0.1}
        />
      </Sphere>

      {/* Soft outer aura */}
      <Sphere ref={auraRef} args={[1.05, 32, 32]}>
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.05} />
      </Sphere>

      {/* Orbital ring 1 — identity */}
      <Torus ref={ring1Ref} args={[1.6, 0.025, 16, 128]}>
        <meshStandardMaterial color="#60a5fa" emissive="#60a5fa" emissiveIntensity={1.5}
          transparent opacity={0.7} />
      </Torus>

      {/* Orbital ring 2 — vision, tilted 60° */}
      <group rotation={[Math.PI / 3, 0, 0]}>
        <Torus ref={ring2Ref} args={[1.9, 0.018, 16, 128]}>
          <meshStandardMaterial color="#60a5fa" emissive="#60a5fa" emissiveIntensity={1}
            transparent opacity={0.5} />
        </Torus>
      </group>

      {/* Orbital ring 3 — philosophy, tilted -40° */}
      <group rotation={[-Math.PI / 4.5, Math.PI / 6, 0]}>
        <Torus ref={ring3Ref} args={[2.2, 0.012, 16, 128]}>
          <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={0.8}
            transparent opacity={0.3} />
        </Torus>
      </group>

      {/* Orbiting dust particles */}
      <instancedMesh ref={particleRef} args={[undefined, undefined, 80]}>
        <sphereGeometry args={[1, 4, 4]} />
        <meshBasicMaterial color="#60a5fa" transparent opacity={0.5} />
      </instancedMesh>
    </group>
  );
}
