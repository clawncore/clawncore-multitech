import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Torus, Cylinder, Sphere } from '@react-three/drei';
import * as THREE from 'three';

interface EcosystemPortalProps {
  isFocused: boolean;
}

export function EcosystemPortal({ isFocused }: EcosystemPortalProps) {
  const groupRef = useRef<THREE.Group>(null);
  const ringsRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.InstancedMesh>(null);
  const beamRef = useRef<THREE.Mesh>(null);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 0.5) * 0.2;
    }

    if (ringsRef.current) {
      ringsRef.current.rotation.x = t * 0.1;
      ringsRef.current.rotation.y = t * 0.2;
    }

    if (coreRef.current) {
      const scale = isFocused ? 1.5 + Math.sin(t * 4) * 0.1 : 1 + Math.sin(t * 2) * 0.05;
      coreRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
      
      const mat = coreRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = THREE.MathUtils.lerp(mat.emissiveIntensity, isFocused ? 4 : 1.5, 0.1);
    }

    if (beamRef.current) {
      const mat = beamRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = THREE.MathUtils.lerp(mat.opacity, isFocused ? 0.3 : 0.1, 0.1);
    }

    if (particlesRef.current) {
      for (let i = 0; i < 150; i++) {
        const timeOffset = i * 0.1;
        const radius = isFocused ? 2 + Math.sin(i * 1.3) * 1.5 : 3 + Math.sin(i) * 2;
        const speed = isFocused ? 1.5 : 0.5;
        
        const angle = (i / 150) * Math.PI * 2 + t * speed * 0.2;
        
        // Particles flow upward into the portal when focused
        let yPos;
        if (isFocused) {
          yPos = ((t * speed + timeOffset) % 10) - 5;
        } else {
          yPos = Math.sin(t * 0.5 + timeOffset) * 2;
        }

        dummy.position.set(
          Math.cos(angle) * radius,
          yPos,
          Math.sin(angle) * radius
        );
        
        const scale = isFocused ? 0.04 + Math.sin(t * 5 + i) * 0.02 : 0.03;
        dummy.scale.setScalar(scale);
        dummy.updateMatrix();
        particlesRef.current.setMatrixAt(i, dummy.matrix);
      }
      particlesRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Central Core */}
      <Sphere ref={coreRef} args={[0.5, 32, 32]}>
        <meshStandardMaterial 
          color="#e0f2fe" 
          emissive="#38bdf8" 
          emissiveIntensity={1.5} 
          transparent 
          opacity={0.9} 
        />
      </Sphere>

      {/* Rotating Gateway Rings */}
      <group ref={ringsRef}>
        <Torus args={[2, 0.02, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.4} />
        </Torus>
        <Torus args={[2.5, 0.01, 16, 100]} rotation={[Math.PI / 2, Math.PI / 4, 0]}>
          <meshBasicMaterial color="#60a5fa" transparent opacity={0.3} />
        </Torus>
        <Torus args={[3, 0.005, 16, 100]} rotation={[0, Math.PI / 3, 0]}>
          <meshBasicMaterial color="#2dd4bf" transparent opacity={0.2} />
        </Torus>
      </group>

      {/* Vertical Energy Beam */}
      <Cylinder ref={beamRef} args={[1.5, 1.5, 20, 32, 1, true]}>
        <meshBasicMaterial 
          color="#38bdf8" 
          transparent 
          opacity={0.1} 
          side={THREE.DoubleSide} 
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </Cylinder>

      {/* Energy Particles */}
      <instancedMesh ref={particlesRef} args={[undefined, undefined, 150]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.6} blending={THREE.AdditiveBlending} />
      </instancedMesh>
    </group>
  );
}
