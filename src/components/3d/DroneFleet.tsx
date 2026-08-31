import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { generateMockDronePaths } from '../../services/terrainData';

interface Props {
  isScanning: boolean;
}

export function DroneFleet({ isScanning }: Props) {
  const groupRef = useRef<THREE.Group>(null);
  const drones = useMemo(() => generateMockDronePaths(), []);
  const droneRefs = useRef<THREE.Mesh[]>([]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    
    // Animate drones along simple circular paths for demonstration
    drones.forEach((_, idx) => {
      const mesh = droneRefs.current[idx];
      if (mesh) {
        const radius = 8 + idx * 4;
        const speed = 0.5 + idx * 0.2;
        // If scanning, speed up slightly
        const currentSpeed = isScanning ? speed * 1.5 : speed;
        
        mesh.position.x = Math.sin(t * currentSpeed) * radius;
        mesh.position.z = Math.cos(t * currentSpeed) * radius;
        
        // Bob up and down slightly
        mesh.position.y = 5 + Math.sin(t * 2 + idx) * 0.5;
        
        // Look in direction of travel
        const nextX = Math.sin((t + 0.1) * currentSpeed) * radius;
        const nextZ = Math.cos((t + 0.1) * currentSpeed) * radius;
        mesh.lookAt(nextX, mesh.position.y, nextZ);
      }
    });
  });

  return (
    <group ref={groupRef}>
      {drones.map((drone, idx) => (
        <group key={drone.id}>
          {/* Drone Body */}
          <mesh 
            ref={(el) => { if (el) droneRefs.current[idx] = el; }}
            castShadow
          >
            {/* Simple futuristic drone shape placeholder */}
            <boxGeometry args={[0.8, 0.2, 0.8]} />
            <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.2} />
            
            {/* Engine Glow */}
            <mesh position={[0, -0.1, -0.4]}>
              <boxGeometry args={[0.4, 0.1, 0.1]} />
              <meshBasicMaterial color="#38bdf8" />
            </mesh>

            {/* Scanning Frustum (Cone) */}
            {isScanning && (
              <mesh position={[0, -5, 0]} rotation={[-Math.PI/2, 0, 0]}>
                <cylinderGeometry args={[0.1, 4, 10, 32, 1, true]} />
                <meshBasicMaterial 
                  color="#38bdf8" 
                  transparent 
                  opacity={0.15} 
                  blending={THREE.AdditiveBlending}
                  depthWrite={false}
                  side={THREE.DoubleSide}
                />
              </mesh>
            )}
          </mesh>
        </group>
      ))}
    </group>
  );
}
