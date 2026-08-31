import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import * as THREE from 'three';
import { GLOBAL_ARCS, GLOBAL_NODES, latLonToSphere, EcosystemLayer } from '../../services/telemetry';

interface AnalyticsStreamsProps {
  activeLayers: EcosystemLayer[];
}

export function AnalyticsStreams({ activeLayers }: AnalyticsStreamsProps) {
  const groupRef = useRef<THREE.Group>(null);

  const activeArcs = useMemo(() => {
    return GLOBAL_ARCS.filter(arc => activeLayers.includes(arc.layer)).map(arc => {
      const startNode = GLOBAL_NODES.find(n => n.id === arc.startNodeId);
      const endNode = GLOBAL_NODES.find(n => n.id === arc.endNodeId);
      
      if (!startNode || !endNode) return null;

      const start = latLonToSphere(startNode.lat, startNode.lon, 10.1);
      const end = latLonToSphere(endNode.lat, endNode.lon, 10.1);
      
      const vStart = new THREE.Vector3(start.x, start.y, start.z);
      const vEnd = new THREE.Vector3(end.x, end.y, end.z);
      
      // Calculate a midpoint that is pushed out from the center of the earth
      const mid = vStart.clone().lerp(vEnd, 0.5);
      const distance = vStart.distanceTo(vEnd);
      mid.normalize().multiplyScalar(10.1 + (distance * 0.2)); // Arc height based on distance

      const curve = new THREE.QuadraticBezierCurve3(vStart, mid, vEnd);
      return {
        id: arc.id,
        points: curve.getPoints(30),
        color: startNode.color
      };
    }).filter(Boolean);
  }, [activeLayers]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      // Must rotate at the exact same speed as EarthGlobe
      groupRef.current.rotation.y = t * 0.05;
      
      // Animate line opacity for a data-flow effect
      groupRef.current.children.forEach((child, i) => {
        if ((child as any).material) {
          const mat = (child as any).material;
          mat.opacity = 0.2 + Math.sin(t * 4 - i) * 0.2;
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      {activeArcs.map((arc: any) => (
        <Line
          key={arc.id}
          points={arc.points}
          color={arc.color}
          lineWidth={2}
          transparent
          opacity={0.4}
        />
      ))}
    </group>
  );
}
