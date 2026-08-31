import { useMemo } from 'react';
import * as THREE from 'three';
import { generateMockCropData } from '../../services/terrainData';

export function CropIntelligence() {
  const dataPoints = useMemo(() => generateMockCropData(100), []);

  return (
    <group>
      {dataPoints.map((point, idx) => (
        <group key={idx} position={point.position}>
          {/* Data Pillar */}
          <mesh position={[0, point.healthIndex * 2, 0]}>
            <cylinderGeometry args={[0.1, 0.1, point.healthIndex * 4, 8]} />
            <meshBasicMaterial 
              color={point.pestRisk === 'high' ? '#ef4444' : point.healthIndex > 0.7 ? '#22c55e' : '#eab308'} 
              transparent 
              opacity={0.6}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
          
          {/* Base Marker */}
          <mesh rotation={[-Math.PI/2, 0, 0]} position={[0, 0.05, 0]}>
            <ringGeometry args={[0.15, 0.25, 16]} />
            <meshBasicMaterial color="#94a3b8" />
          </mesh>
        </group>
      ))}
    </group>
  );
}
