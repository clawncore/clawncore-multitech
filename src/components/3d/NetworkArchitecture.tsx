import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import * as THREE from 'three';

export function NetworkArchitecture() {
  const pointsCount = 150;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const linesGroupRef = useRef<THREE.Group>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Generate random points in a massive sphere for the network nodes
  const points = useMemo(() => {
    const pts = [];
    for (let i = 0; i < pointsCount; i++) {
      const radius = 15 + Math.random() * 20;
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(Math.random() * 2 - 1);
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      
      pts.push(new THREE.Vector3(x, y, z));
    }
    return pts;
  }, []);

  // Create connections between close nodes
  const connections = useMemo(() => {
    const lines = [];
    for (let i = 0; i < pointsCount; i++) {
      for (let j = i + 1; j < pointsCount; j++) {
        const dist = points[i].distanceTo(points[j]);
        if (dist < 10) {
          lines.push([points[i], points[j]]);
        }
      }
    }
    return lines;
  }, [points]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    // Slowly rotate the entire network
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.05;
      meshRef.current.rotation.z = t * 0.02;
    }
    if (linesGroupRef.current) {
      linesGroupRef.current.rotation.y = t * 0.05;
      linesGroupRef.current.rotation.z = t * 0.02;
    }

    // Pulse node sizes slightly
    points.forEach((pos, i) => {
      dummy.position.copy(pos);
      const scale = 1 + Math.sin(t * 2 + i) * 0.5;
      dummy.scale.set(scale, scale, scale);
      dummy.updateMatrix();
      if (meshRef.current) {
        meshRef.current.setMatrixAt(i, dummy.matrix);
      }
    });
    
    if (meshRef.current) {
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* Background Nodes */}
      <instancedMesh ref={meshRef} args={[undefined, undefined, pointsCount]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
      </instancedMesh>

      {/* Network Connections */}
      <group ref={linesGroupRef}>
        {connections.map((pointsArray, i) => (
          <Line
            key={i}
            points={pointsArray}
            color="#3b82f6"
            lineWidth={0.5}
            transparent
            opacity={0.15}
          />
        ))}
      </group>
    </group>
  );
}
