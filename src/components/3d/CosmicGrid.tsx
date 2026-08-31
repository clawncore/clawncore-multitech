import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';

export function CosmicGrid() {
  const gridRef = useRef<THREE.GridHelper>(null);
  const planetRef = useRef<THREE.Mesh>(null);
  const ringsGroupRef = useRef<THREE.Group>(null);
  const dustRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Dust particles scattered around the scene
  const dustPositions = useMemo(() => {
    const positions = [];
    for (let i = 0; i < 200; i++) {
      positions.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 80,
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 80
        )
      );
    }
    return positions;
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (gridRef.current) {
      gridRef.current.rotation.y = t * 0.02;
    }
    if (planetRef.current) {
      planetRef.current.rotation.y = t * 0.05;
      planetRef.current.rotation.z = t * 0.01;
    }
    if (ringsGroupRef.current) {
      ringsGroupRef.current.rotation.z = t * 0.02;
    }

    // Animate dust particles
    if (dustRef.current) {
      dustPositions.forEach((pos, i) => {
        dummy.position.set(
          pos.x + Math.sin(t * 0.2 + i) * 0.5,
          pos.y + Math.cos(t * 0.15 + i * 2) * 0.3,
          pos.z
        );
        dummy.scale.setScalar(1);
        dummy.updateMatrix();
        dustRef.current!.setMatrixAt(i, dummy.matrix);
      });
      dustRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <>
      {/* Deep stars */}
      <Stars radius={150} depth={60} count={6000} factor={5} saturation={0.1} fade speed={0.3} />

      {/* Ground grid — faint holographic surface */}
      <gridHelper
        ref={gridRef}
        args={[120, 40, '#f59e0b', '#1a1200']}
        position={[0, -8, 0]}
      />

      {/* Distant planetary sphere (cosmic scale) */}
      <mesh ref={planetRef} position={[18, 4, -30]}>
        <sphereGeometry args={[6, 64, 64]} />
        <meshStandardMaterial
          color="#0c1a35"
          emissive="#1e3a5f"
          emissiveIntensity={0.5}
          roughness={0.8}
          wireframe={false}
        />
      </mesh>

      {/* Planetary atmospheric ring */}
      <group ref={ringsGroupRef} position={[18, 4, -30]} rotation={[Math.PI / 4, 0, 0]}>
        <mesh>
          <torusGeometry args={[9, 0.5, 8, 64]} />
          <meshBasicMaterial color="#f59e0b" transparent opacity={0.06} />
        </mesh>
        <mesh>
          <torusGeometry args={[11, 0.3, 8, 64]} />
          <meshBasicMaterial color="#60a5fa" transparent opacity={0.04} />
        </mesh>
      </group>

      {/* Holographic dust field */}
      <instancedMesh ref={dustRef} args={[undefined, undefined, 200]}>
        <sphereGeometry args={[0.04, 4, 4]} />
        <meshBasicMaterial color="#f59e0b" transparent opacity={0.4} />
      </instancedMesh>
    </>
  );
}
