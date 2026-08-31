import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Octahedron, Sphere, useCursor } from '@react-three/drei';
import * as THREE from 'three';
import { PHILOSOPHY_NODES } from '../../sections/FounderExperience';

interface PhilosophyNodesProps {
  activeNodeId: string | null;
  onNodeSelect: (id: string) => void;
}

// 4 philosophy nodes arranged in an arc/diamond around the portrait
const NODE_CONFIGS = [
  { id: 'purpose',      position: new THREE.Vector3(-5, 2,  0) },
  { id: 'intelligence', position: new THREE.Vector3(-2, 4,  -2) },
  { id: 'scale',        position: new THREE.Vector3( 2, 4,  -2) },
  { id: 'humanity',     position: new THREE.Vector3( 5, 2,  0) },
];

// Camera close-up per node
export const PHILOSOPHY_CAM: Record<string, THREE.Vector3> = {
  purpose:      new THREE.Vector3(-5, 2, 7),
  intelligence: new THREE.Vector3(-2, 4, 7),
  scale:        new THREE.Vector3( 2, 4, 7),
  humanity:     new THREE.Vector3( 5, 2, 7),
  default:      new THREE.Vector3( 0, 0, 11),
};

function PhilosophyPillar({
  config, isActive, isHovered, isDimmed,
  onHover, onUnhover, onClick
}: {
  config: typeof NODE_CONFIGS[0];
  isActive: boolean; isHovered: boolean; isDimmed: boolean;
  onHover: () => void; onUnhover: () => void; onClick: () => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const gemRef = useRef<THREE.Mesh>(null);
  const data = PHILOSOPHY_NODES[config.id];
  const color = data.color;

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      // Float
      groupRef.current.position.y = config.position.y + Math.sin(t * 0.7 + config.position.x) * 0.2;
      // Scale
      const targetScale = isActive ? 1.3 : isHovered ? 1.12 : 1;
      groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
    if (gemRef.current) {
      // Spin gently; faster when active
      gemRef.current.rotation.y += isActive ? 0.025 : 0.008;
      gemRef.current.rotation.x += 0.004;
    }
  });

  const emissiveIntensity = isActive ? 4 : isHovered ? 2 : 0.6;
  const opacity = isDimmed ? 0.12 : 0.9;

  return (
    <group
      ref={groupRef}
      position={config.position}
      onPointerOver={(e) => { e.stopPropagation(); onHover(); }}
      onPointerOut={(e)  => { e.stopPropagation(); onUnhover(); }}
      onClick={(e)       => { e.stopPropagation(); onClick(); }}
    >
      {/* Octahedron gem — each philosophy */}
      <Octahedron ref={gemRef} args={[0.55, 0]}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={emissiveIntensity}
          transparent opacity={opacity}
          roughness={0.05}
          metalness={1}
        />
      </Octahedron>

      {/* Inner bright core */}
      <Sphere args={[0.18, 16, 16]}>
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={isActive || isHovered ? 0.9 : 0.15}
        />
      </Sphere>

      {/* Connection line downward to portrait level */}
      {(isActive || isHovered) && (
        <primitive object={new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(
              -config.position.x,
              -config.position.y,
              -config.position.z
            ).multiplyScalar(0.85)
          ]),
          new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.25 })
        )} />
      )}
    </group>
  );
}

export function PhilosophyNodes({ activeNodeId, onNodeSelect }: PhilosophyNodesProps) {
  const [hovered, setHovered] = useState<string | null>(null);
  useCursor(hovered !== null, 'pointer', 'auto');

  return (
    <group>
      {NODE_CONFIGS.map((config) => (
        <PhilosophyPillar
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
