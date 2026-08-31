import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Props {
  showWireframe: boolean;
  isScanning: boolean;
}

export function TerrainSystem({ showWireframe, isScanning }: Props) {
  const meshRef = useRef<THREE.Mesh>(null);
  const scanLineRef = useRef<THREE.Mesh>(null);

  // Generate a procedural terrain plane
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(40, 40, 128, 128);
    const pos = geo.attributes.position as THREE.BufferAttribute;
    
    // Simple noise simulation using sine/cosine for rolling hills
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      
      // Calculate z (height)
      let z = Math.sin(x * 0.2) * Math.cos(y * 0.2) * 2;
      z += Math.sin(x * 0.5 + y * 0.5) * 0.5;
      
      pos.setZ(i, z);
    }
    
    geo.computeVertexNormals();
    return geo;
  }, []);

  useFrame((state) => {
    if (isScanning && scanLineRef.current) {
      // Sweep the scanline back and forth
      const t = state.clock.elapsedTime;
      scanLineRef.current.position.z = Math.sin(t * 0.5) * 20;
    }
  });

  return (
    <group>
      {/* Base Terrain */}
      <mesh 
        ref={meshRef}
        geometry={geometry} 
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <meshStandardMaterial 
          color="#f8fafc" // White/slate
          roughness={0.8}
          metalness={0.1}
          wireframe={showWireframe}
          wireframeLinewidth={2}
        />
      </mesh>

      {/* Grid Overlay for "Intelligence" feel */}
      <gridHelper args={[40, 40, '#cbd5e1', '#e2e8f0']} position={[0, 0.01, 0]} />

      {/* Scanning Laser Line */}
      {isScanning && (
        <mesh ref={scanLineRef} position={[0, 0.5, 0]}>
          <boxGeometry args={[40, 40, 0.1]} />
          <meshBasicMaterial 
            color="#38bdf8" // Sky blue
            transparent
            opacity={0.1}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      )}
    </group>
  );
}
