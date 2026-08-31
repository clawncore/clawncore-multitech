import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Torus } from '@react-three/drei';
import * as THREE from 'three';

export function EcosystemPulse() {
  const particlesRef = useRef<THREE.InstancedMesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const PARTICLE_COUNT = 300;

  // Initialize random particle positions
  const particleData = useMemo(() => {
    const data = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      data.push({
        x: (Math.random() - 0.5) * 40,
        y: (Math.random() - 0.5) * 20,
        z: (Math.random() - 0.5) * 40,
        speed: 0.1 + Math.random() * 0.2,
        offset: Math.random() * Math.PI * 2,
      });
    }
    return data;
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Slow, distant ecosystem rings
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = Math.PI / 2 + Math.sin(t * 0.05) * 0.1;
      ring1Ref.current.rotation.z = t * 0.02;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = Math.PI / 2 + Math.cos(t * 0.04) * 0.1;
      ring2Ref.current.rotation.z = -t * 0.015;
    }

    // Drifting atmospheric dust
    if (particlesRef.current) {
      particleData.forEach((pd, i) => {
        // Slow horizontal drift + gentle sine wave vertical bob
        const currentX = pd.x + Math.sin(t * pd.speed + pd.offset) * 2;
        const currentY = pd.y + Math.cos(t * pd.speed * 0.8 + pd.offset) * 1.5;
        const currentZ = pd.z + Math.sin(t * pd.speed * 1.2) * 2;

        dummy.position.set(currentX, currentY, currentZ);
        
        // Pulse size slowly
        const scale = 0.02 + Math.sin(t * 0.5 + pd.offset) * 0.01;
        dummy.scale.setScalar(scale);
        
        dummy.updateMatrix();
        particlesRef.current!.setMatrixAt(i, dummy.matrix);
      });
      particlesRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group position={[0, -5, -15]}>
      {/* Deep distant ecosystem pulse rings */}
      <Torus ref={ring1Ref} args={[15, 0.05, 16, 100]}>
        <meshBasicMaterial color="#0ea5e9" transparent opacity={0.1} fog={true} />
      </Torus>
      <Torus ref={ring2Ref} args={[20, 0.02, 16, 100]}>
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.08} fog={true} />
      </Torus>

      {/* Atmospheric particles */}
      <instancedMesh ref={particlesRef} args={[undefined, undefined, PARTICLE_COUNT]}>
        <sphereGeometry args={[1, 4, 4]} />
        <meshBasicMaterial 
          color="#38bdf8" 
          transparent 
          opacity={0.3} 
          blending={THREE.AdditiveBlending} 
          depthWrite={false}
          fog={true}
        />
      </instancedMesh>
    </group>
  );
}
