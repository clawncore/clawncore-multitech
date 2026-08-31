import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { GLOBAL_NODES, latLonToSphere, EcosystemLayer } from '../../services/telemetry';

interface IntelligenceNodesProps {
  activeLayers: EcosystemLayer[];
  onNodeHover: (node: any | null) => void;
}

export function IntelligenceNodes({ activeLayers, onNodeHover }: IntelligenceNodesProps) {
  const groupRef = useRef<THREE.Group>(null);
  
  // Filter nodes based on active UI layers
  const visibleNodes = useMemo(() => {
    return GLOBAL_NODES.filter(node => activeLayers.includes(node.layer));
  }, [activeLayers]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      // Must rotate at the exact same speed as EarthGlobe
      groupRef.current.rotation.y = t * 0.05;
      
      // Animate scale/pulse of nodes
      groupRef.current.children.forEach((mesh, i) => {
        const baseScale = 0.15;
        const pulse = Math.sin(t * 3 + i) * 0.05;
        mesh.scale.setScalar(baseScale + pulse);
      });
    }
  });

  return (
    <group ref={groupRef}>
      {visibleNodes.map((node) => {
        const { x, y, z } = latLonToSphere(node.lat, node.lon, 10.1); // slightly above earth surface (10)
        
        return (
          <mesh 
            key={node.id} 
            position={[x, y, z]}
            onPointerOver={(e) => {
              e.stopPropagation();
              onNodeHover(node);
              document.body.style.cursor = 'pointer';
            }}
            onPointerOut={(e) => {
              e.stopPropagation();
              onNodeHover(null);
              document.body.style.cursor = 'auto';
            }}
          >
            <sphereGeometry args={[1, 16, 16]} />
            <meshBasicMaterial 
              color={node.color} 
              transparent 
              opacity={0.8}
            />
            {/* Outer glow ring */}
            <mesh>
              <ringGeometry args={[1.5, 2, 32]} />
              <meshBasicMaterial 
                color={node.color}
                transparent
                opacity={0.3}
                side={THREE.DoubleSide}
              />
            </mesh>
          </mesh>
        );
      })}
    </group>
  );
}
