import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import * as THREE from 'three';

// Approximate lat/lon → sphere XYZ
function latLonToSphere(lat: number, lon: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
     radius * Math.cos(phi),
     radius * Math.sin(phi) * Math.sin(theta)
  );
}

const CITIES = [
  { lat: 40.7, lon: -74.0 },   // New York
  { lat: 51.5, lon: -0.1 },    // London
  { lat: 48.8, lon: 2.3 },     // Paris
  { lat: 35.6, lon: 139.7 },   // Tokyo
  { lat: 1.3,  lon: 103.8 },   // Singapore
  { lat: -33.8,lon: 151.2 },   // Sydney
  { lat: 28.6, lon: 77.2 },    // Delhi
  { lat: -23.5,lon: -46.6 },   // São Paulo
  { lat: 55.7, lon: 37.6 },    // Moscow
  { lat: 30.0, lon: 31.2 },    // Cairo
  { lat: 6.5,  lon: 3.4 },     // Lagos
  { lat: 19.4, lon: -99.1 },   // Mexico City
];

export function GlobalNetwork() {
  const globeRef = useRef<THREE.Mesh>(null);
  const nodesRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const RADIUS = 4.5;

  const cityPositions = useMemo(
    () => CITIES.map(c => latLonToSphere(c.lat, c.lon, RADIUS)),
    []
  );

  // Connections between nearby cities
  const connections = useMemo(() => {
    const lines: THREE.Vector3[][] = [];
    for (let i = 0; i < cityPositions.length; i++) {
      for (let j = i + 1; j < cityPositions.length; j++) {
        if (cityPositions[i].distanceTo(cityPositions[j]) < 6) {
          lines.push([cityPositions[i], cityPositions[j]]);
        }
      }
    }
    return lines;
  }, [cityPositions]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (globeRef.current) {
      globeRef.current.rotation.y = t * 0.08;
    }

    if (nodesRef.current) {
      cityPositions.forEach((pos, i) => {
        const rotated = pos.clone().applyEuler(new THREE.Euler(0, t * 0.08, 0));
        dummy.position.copy(rotated);
        const pulse = 1 + Math.sin(t * 2 + i * 1.3) * 0.4;
        dummy.scale.setScalar(pulse);
        dummy.updateMatrix();
        nodesRef.current!.setMatrixAt(i, dummy.matrix);
      });
      nodesRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group position={[4, 0, -2]}>
      {/* Globe wireframe */}
      <mesh ref={globeRef}>
        <sphereGeometry args={[RADIUS, 32, 32]} />
        <meshStandardMaterial
          color="#0a1628"
          emissive="#0d2040"
          emissiveIntensity={0.5}
          wireframe={false}
          roughness={0.9}
          metalness={0.1}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Globe wireframe overlay */}
      <mesh>
        <sphereGeometry args={[RADIUS + 0.01, 24, 24]} />
        <meshBasicMaterial color="#0e2a50" wireframe transparent opacity={0.15} />
      </mesh>

      {/* City nodes (instanced) */}
      <instancedMesh ref={nodesRef} args={[undefined, undefined, CITIES.length]}>
        <sphereGeometry args={[0.07, 8, 8]} />
        <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={3} />
      </instancedMesh>

      {/* Connection arcs */}
      {connections.map((pts, i) => (
        <Line key={i} points={pts} color="#22d3ee" lineWidth={0.8} transparent opacity={0.15} />
      ))}
    </group>
  );
}
