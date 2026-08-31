import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useCursor, Icosahedron, Sphere, Box, Torus, TorusKnot } from '@react-three/drei';
import * as THREE from 'three';
import { SERVICES } from '../../sections/ServicesDeepDive';

interface ServiceModulesProps {
  activeServiceId: string | null;
  onServiceSelect: (id: string) => void;
}

// Hexagonal layout — 6 modules arranged in a ring
const MODULE_CONFIGS = [
  { id: 'cybersecurity', position: new THREE.Vector3(0,  3.5, 0) },
  { id: 'ai',           position: new THREE.Vector3(3,  1.75, 0) },
  { id: 'cloud',        position: new THREE.Vector3(3, -1.75, 0) },
  { id: 'analytics',    position: new THREE.Vector3(0, -3.5, 0) },
  { id: 'agriculture',  position: new THREE.Vector3(-3,-1.75, 0) },
  { id: 'drones',       position: new THREE.Vector3(-3, 1.75, 0) },
];

// Camera zoom targets for each service
export const SERVICE_CAM_POSITIONS: Record<string, THREE.Vector3> = {
  cybersecurity: new THREE.Vector3(0,   3.5, 9),
  ai:            new THREE.Vector3(3,   1.75, 9),
  cloud:         new THREE.Vector3(3,  -1.75, 9),
  analytics:     new THREE.Vector3(0,  -3.5, 9),
  agriculture:   new THREE.Vector3(-3, -1.75, 9),
  drones:        new THREE.Vector3(-3,  1.75, 9),
  default:       new THREE.Vector3(0,   0,   16),
};

// Unique geometry per service
function ServiceGeometry({ id, isActive, isHovered }: { id: string; isActive: boolean; isHovered: boolean }) {
  const ref = useRef<any>(null);
  const color = SERVICES[id]?.color ?? '#ffffff';
  const emissiveIntensity = isActive ? 4 : isHovered ? 2 : 0.6;

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.y = t * 0.4;
    ref.current.rotation.x = t * 0.2;
  });

  const mat = (
    <meshStandardMaterial
      color={color}
      emissive={color}
      emissiveIntensity={emissiveIntensity}
      roughness={0.1}
      metalness={0.9}
      wireframe
      transparent
      opacity={0.85}
    />
  );

  switch (id) {
    case 'cybersecurity': return <Icosahedron ref={ref} args={[0.9, 1]}>{mat}</Icosahedron>;
    case 'ai':            return <TorusKnot   ref={ref} args={[0.55, 0.18, 80, 16]}>{mat}</TorusKnot>;
    case 'cloud':         return <Box         ref={ref} args={[1.2, 1.2, 1.2]}>{mat}</Box>;
    case 'analytics':     return <Sphere      ref={ref} args={[0.8, 32, 32]}>{mat}</Sphere>;
    case 'agriculture':   return (
      <group ref={ref}>
        <Box args={[1.6, 0.15, 1.6]}>{mat}</Box>
        <gridHelper args={[1.5, 5, color, color]} position={[0, 0.1, 0]} />
      </group>
    );
    case 'drones':        return <Torus ref={ref} args={[0.7, 0.22, 16, 64]}>{mat}</Torus>;
    default: return null;
  }
}

function SingleModule({
  config,
  isActive,
  isHovered,
  isDimmed,
  onHover,
  onUnhover,
  onClick,
}: {
  config: typeof MODULE_CONFIGS[0];
  isActive: boolean;
  isHovered: boolean;
  isDimmed: boolean;
  onHover: () => void;
  onUnhover: () => void;
  onClick: () => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const color = SERVICES[config.id]?.color ?? '#ffffff';

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    // Floating drift
    groupRef.current.position.y = config.position.y + Math.sin(t * 0.8 + config.position.x) * 0.18;
    // Scale up when active/hovered
    const targetScale = isActive ? 1.35 : isHovered ? 1.15 : 1;
    groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    // Dim
    groupRef.current.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mat = (child as THREE.Mesh).material as THREE.MeshStandardMaterial;
        if (mat && mat.opacity !== undefined) {
          mat.opacity = THREE.MathUtils.lerp(mat.opacity, isDimmed ? 0.1 : 0.85, 0.08);
        }
      }
    });
  });

  return (
    <group
      ref={groupRef}
      position={[config.position.x, config.position.y, config.position.z]}
      onPointerOver={(e) => { e.stopPropagation(); onHover(); }}
      onPointerOut={(e)  => { e.stopPropagation(); onUnhover(); }}
      onClick={(e)       => { e.stopPropagation(); onClick(); }}
    >
      <ServiceGeometry id={config.id} isActive={isActive} isHovered={isHovered} />

      {/* Outer ring halo when active */}
      {(isActive || isHovered) && (
        <Torus args={[1.4, 0.02, 8, 64]} rotation={[Math.PI / 2, 0, 0]}>
          <meshBasicMaterial color={color} transparent opacity={isActive ? 0.7 : 0.35} />
        </Torus>
      )}
    </group>
  );
}

// Central connector hub
function HubCore() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.3;
      ref.current.rotation.z = state.clock.getElapsedTime() * 0.15;
    }
  });
  return (
    <Icosahedron ref={ref} args={[0.5, 2]}>
      <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={2}
        wireframe transparent opacity={0.6} roughness={0.1} metalness={1} />
    </Icosahedron>
  );
}

// Spoke lines from center to each module
function SpokeLines() {
  const center = new THREE.Vector3(0, 0, 0);
  return (
    <>
      {MODULE_CONFIGS.map((cfg) => {
        const points = [center, cfg.position];
        // Use manual line geometry
        const geo = new THREE.BufferGeometry().setFromPoints(points);
        return (
          <primitive key={cfg.id} object={new THREE.Line(
            geo,
            new THREE.LineBasicMaterial({ color: '#22d3ee', transparent: true, opacity: 0.08 })
          )} />
        );
      })}
    </>
  );
}

export function ServiceModules({ activeServiceId, onServiceSelect }: ServiceModulesProps) {
  const [hovered, setHovered] = useState<string | null>(null);
  useCursor(hovered !== null, 'pointer', 'auto');

  return (
    <group>
      <HubCore />
      <SpokeLines />
      {MODULE_CONFIGS.map((config) => (
        <SingleModule
          key={config.id}
          config={config}
          isActive={activeServiceId === config.id}
          isHovered={hovered === config.id}
          isDimmed={activeServiceId !== null && activeServiceId !== config.id}
          onHover={() => setHovered(config.id)}
          onUnhover={() => setHovered(null)}
          onClick={() => onServiceSelect(config.id)}
        />
      ))}
    </group>
  );
}
