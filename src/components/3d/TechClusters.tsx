import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Icosahedron, Box, TorusKnot, Sphere, useCursor } from '@react-three/drei';
import * as THREE from 'three';

interface TechClustersProps {
  activeClusterId: string | null;
  onClusterSelect: (id: string) => void;
}

// Positions for the clusters spreading them across the scene
export const CLUSTER_POSITIONS: Record<string, THREE.Vector3> = {
  ai: new THREE.Vector3(0, 0, 0),             // Center
  cybersecurity: new THREE.Vector3(-6, 2, -2), // Top Left
  cloud: new THREE.Vector3(6, 3, -4),         // Top Right
  analytics: new THREE.Vector3(5, -3, 2),     // Bottom Right
  agriculture: new THREE.Vector3(-5, -4, 4),  // Bottom Left
};

export function TechClusters({ activeClusterId, onClusterSelect }: TechClustersProps) {
  const [hovered, setHovered] = useState<string | null>(null);
  useCursor(hovered !== null, 'pointer', 'auto');

  // References for animation
  const aiRef = useRef<THREE.Mesh>(null);
  const cyberRef = useRef<THREE.Group>(null);
  const cloudRef = useRef<THREE.Group>(null);
  const analyticsRef = useRef<THREE.Mesh>(null);
  const agriRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    // AI: Neural twisting
    if (aiRef.current) {
      aiRef.current.rotation.x = t * 0.5;
      aiRef.current.rotation.y = t * 0.8;
    }
    // Cybersecurity: Rotating shields
    if (cyberRef.current) {
      cyberRef.current.rotation.y = t * 0.3;
      cyberRef.current.rotation.z = t * 0.2;
    }
    // Cloud: Synchronized floating
    if (cloudRef.current) {
      cloudRef.current.position.y = CLUSTER_POSITIONS.cloud.y + Math.sin(t) * 0.5;
    }
    // Analytics: Fast spinning data
    if (analyticsRef.current) {
      analyticsRef.current.rotation.y = t * 2;
    }
    // Agriculture: Slow scanning grid
    if (agriRef.current) {
      agriRef.current.rotation.y = Math.sin(t * 0.5) * 0.5;
    }
  });

  const getMaterialProps = (id: string, color: string) => {
    const isHovered = hovered === id;
    const isActive = activeClusterId === id;
    const isDimmed = activeClusterId !== null && activeClusterId !== id;

    return {
      color: color,
      emissive: color,
      emissiveIntensity: isActive ? 3 : isHovered ? 1.5 : 0.5,
      opacity: isDimmed ? 0.2 : 0.9,
      transparent: true,
      wireframe: true,
    };
  };

  const handlePointerOver = (e: any, id: string) => {
    e.stopPropagation();
    setHovered(id);
  };

  const handlePointerOut = (e: any) => {
    e.stopPropagation();
    setHovered(null);
  };

  const handleClick = (e: any, id: string) => {
    e.stopPropagation();
    onClusterSelect(id);
  };

  return (
    <group>
      {/* AI Cluster */}
      <TorusKnot
        ref={aiRef}
        args={[1, 0.3, 100, 16]}
        position={CLUSTER_POSITIONS.ai}
        onPointerOver={(e) => handlePointerOver(e, 'ai')}
        onPointerOut={handlePointerOut}
        onClick={(e) => handleClick(e, 'ai')}
      >
        <meshStandardMaterial {...getMaterialProps('ai', '#60a5fa')} />
        <Sphere args={[0.5]}><meshBasicMaterial color={activeClusterId==='ai'?'#ffffff':'#1e3a8a'} /></Sphere>
      </TorusKnot>

      {/* Cybersecurity Cluster */}
      <group 
        ref={cyberRef} 
        position={CLUSTER_POSITIONS.cybersecurity}
        onPointerOver={(e) => handlePointerOver(e, 'cybersecurity')}
        onPointerOut={handlePointerOut}
        onClick={(e) => handleClick(e, 'cybersecurity')}
      >
        <Icosahedron args={[1.5, 1]}>
          <meshStandardMaterial {...getMaterialProps('cybersecurity', '#2563eb')} />
        </Icosahedron>
        <Icosahedron args={[1.2, 0]}>
          <meshStandardMaterial color="#60a5fa" wireframe transparent opacity={0.3} />
        </Icosahedron>
      </group>

      {/* Cloud Cluster */}
      <group 
        ref={cloudRef} 
        position={CLUSTER_POSITIONS.cloud}
        onPointerOver={(e) => handlePointerOver(e, 'cloud')}
        onPointerOut={handlePointerOut}
        onClick={(e) => handleClick(e, 'cloud')}
      >
        {[-1, 0, 1].map((x) => (
          <Box key={x} args={[0.6, 0.6, 0.6]} position={[x * 1.2, 0, 0]}>
             <meshStandardMaterial {...getMaterialProps('cloud', '#22d3ee')} />
          </Box>
        ))}
      </group>

      {/* Analytics Cluster */}
      <Sphere
        ref={analyticsRef}
        args={[1.2, 32, 32]}
        position={CLUSTER_POSITIONS.analytics}
        onPointerOver={(e) => handlePointerOver(e, 'analytics')}
        onPointerOut={handlePointerOut}
        onClick={(e) => handleClick(e, 'analytics')}
      >
        <meshStandardMaterial {...getMaterialProps('analytics', '#fbbf24')} wireframe={false} roughness={0} metalness={1} />
        {/* Orbital rings */}
        <TorusKnot args={[1.5, 0.02, 64, 8]}><meshBasicMaterial color="#fbbf24" /></TorusKnot>
      </Sphere>

      {/* Agriculture Cluster */}
      <group 
        ref={agriRef} 
        position={CLUSTER_POSITIONS.agriculture}
        onPointerOver={(e) => handlePointerOver(e, 'agriculture')}
        onPointerOut={handlePointerOut}
        onClick={(e) => handleClick(e, 'agriculture')}
      >
        {/* Terrain mapping representation */}
        <Box args={[2.5, 0.2, 2.5]}>
          <meshStandardMaterial {...getMaterialProps('agriculture', '#34d399')} wireframe={false} />
        </Box>
        <gridHelper args={[2.5, 10, '#34d399', '#34d399']} position={[0, 0.11, 0]} />
      </group>

    </group>
  );
}
