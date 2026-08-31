import { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Torus, Line, useCursor, Text } from '@react-three/drei';
import * as THREE from 'three';
import { ROADMAP_NODES } from '../../sections/VisionRoadmap';

interface FutureTimelineProps {
  activeNodeId: string | null;
  onNodeSelect: (id: string) => void;
}

const NODE_CONFIGS = [
  { id: 'phase1', position: new THREE.Vector3(-9, 0, 0), color: '#60a5fa' },
  { id: 'phase2', position: new THREE.Vector3(-3, 0, 0), color: '#2563eb' },
  { id: 'phase3', position: new THREE.Vector3(3, 0, 0), color: '#f59e0b' },
  { id: 'phase4', position: new THREE.Vector3(9, 0, 0), color: '#34d399' },
];

function TimelineNode({
  config,
  isActive,
  isHovered,
  isDimmed,
  onHover,
  onUnhover,
  onClick,
}: {
  config: typeof NODE_CONFIGS[0];
  isActive: boolean;
  isHovered: boolean;
  isDimmed: boolean;
  onHover: () => void;
  onUnhover: () => void;
  onClick: () => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const data = ROADMAP_NODES[config.id];

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      // Floating pulse
      meshRef.current.position.y = config.position.y + Math.sin(t * 1.5 + config.position.x) * 0.2;
      // Spin when active
      if (isActive || isHovered) {
        meshRef.current.rotation.y += 0.02;
      }
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.5;
    }
  });

  const emissiveIntensity = isActive ? 4 : isHovered ? 2 : 0.8;
  const opacity = isDimmed ? 0.15 : 1;
  const scale = isActive ? 1.4 : isHovered ? 1.2 : 1;

  return (
    <group
      position={config.position}
      onPointerOver={(e) => { e.stopPropagation(); onHover(); }}
      onPointerOut={(e) => { e.stopPropagation(); onUnhover(); }}
      onClick={(e) => { e.stopPropagation(); onClick(); }}
    >
      {/* Core sphere */}
      <Sphere ref={meshRef} args={[0.6, 32, 32]} scale={scale}>
        <meshStandardMaterial
          color={config.color}
          emissive={config.color}
          emissiveIntensity={emissiveIntensity}
          transparent
          opacity={opacity}
          roughness={0.1}
          metalness={0.9}
        />
      </Sphere>

      {/* Holographic orbital ring */}
      <Torus ref={ringRef} args={[1.1, 0.03, 16, 64]} rotation={[Math.PI / 2, 0, 0]}>
        <meshBasicMaterial
          color={config.color}
          transparent
          opacity={isActive || isHovered ? 0.8 : 0.2}
        />
      </Torus>

      {/* Year label above node */}
      <Text
        position={[0, 1.8, 0]}
        fontSize={0.35}
        color={config.color}
        anchorX="center"
        anchorY="middle"
        font={undefined}
        fillOpacity={isDimmed ? 0.1 : 0.9}
      >
        {data.year}
      </Text>

      {/* Phase label below */}
      <Text
        position={[0, -1.6, 0]}
        fontSize={0.22}
        color="#1e293b"
        anchorX="center"
        anchorY="middle"
        font={undefined}
        fillOpacity={isDimmed ? 0.05 : 0.5}
      >
        {data.phase}
      </Text>
    </group>
  );
}

export function FutureTimeline({ activeNodeId, onNodeSelect }: FutureTimelineProps) {
  const [hovered, setHovered] = useState<string | null>(null);
  useCursor(hovered !== null, 'pointer', 'auto');
  const groupRef = useRef<THREE.Group>(null);

  // Build connecting line points between all nodes
  const linePoints = useMemo(
    () => NODE_CONFIGS.map((n) => n.position),
    []
  );

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current && !activeNodeId) {
      // Slow gentle sway when no node is selected
      groupRef.current.rotation.y = Math.sin(t * 0.1) * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Backbone timeline line */}
      <Line
        points={linePoints}
        color="#1e293b"
        lineWidth={1}
        transparent
        opacity={0.12}
      />

      {/* Milestone nodes */}
      {NODE_CONFIGS.map((config) => (
        <TimelineNode
          key={config.id}
          config={config}
          isActive={activeNodeId === config.id}
          isHovered={hovered === config.id}
          isDimmed={activeNodeId !== null && activeNodeId !== config.id}
          onHover={() => setHovered(config.id)}
          onUnhover={() => setHovered(null)}
          onClick={() => onNodeSelect(config.id)}
        />
      ))}
    </group>
  );
}
