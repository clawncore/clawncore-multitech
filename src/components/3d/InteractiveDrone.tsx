import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Cylinder, Sphere } from '@react-three/drei';
import * as THREE from 'three';

// Per-sector drone orientation keyframes
// [rotationX, rotationY, rotationZ, positionX, positionY, positionZ]
const SECTOR_KEYFRAMES: Record<string, [number, number, number, number, number, number]> = {
  scanner:  [ 0.35,  0.0,   0.0,   0.4, -0.3,  0.0],  // Tilt forward – scanning
  camera:   [ 0.1,  -0.4,   0.1,   0.4,  0.0,  0.3],  // Faces lens toward camera
  core:     [-0.1,   0.8,  -0.2,   0.4,  0.5, -0.1],  // Profile to show core
  antenna:  [ 0.15,  3.14,  0.0,   0.4,  0.2, -0.2],  // Rotated backward
  sensors:  [-0.2,   1.2,   0.1,   0.4, -0.1,  0.1],  // Side-angle sensor reveal
};

const SECTOR_IDS = ['scanner', 'camera', 'core', 'antenna', 'sensors'];

const SECTOR_COLORS: Record<string, string> = {
  scanner: '#10b981',
  camera:  '#3b82f6',
  core:    '#2563eb',
  antenna: '#06b6d4',
  sensors: '#f59e0b',
};



interface ScrollDroneProps {
  scrollProgress: number;   // 0 → 1 (full section scroll)
  activeSectorId: string;
}

export function InteractiveDrone({ scrollProgress, activeSectorId }: ScrollDroneProps) {
  const groupRef   = useRef<THREE.Group>(null);
  const scannerRef = useRef<THREE.Mesh>(null);
  const scanRingRef = useRef<THREE.Mesh>(null);
  const coreMat    = useRef<THREE.MeshStandardMaterial>(null);
  const antennaTip = useRef<THREE.Mesh>(null);
  const sensor1Mat = useRef<THREE.MeshStandardMaterial>(null);
  const sensor2Mat = useRef<THREE.MeshStandardMaterial>(null);
  const cameraLens = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();

    // --- Determine interpolation between two sector keyframes ---
    const numSectors = SECTOR_IDS.length;
    const sectorFloat = scrollProgress * (numSectors - 1);
    const fromIdx = Math.max(0, Math.min(numSectors - 2, Math.floor(sectorFloat)));
    const toIdx   = Math.min(numSectors - 1, fromIdx + 1);
    const blend   = sectorFloat - fromIdx;

    const fromId  = SECTOR_IDS[fromIdx];
    const toId    = SECTOR_IDS[toIdx];
    const from    = SECTOR_KEYFRAMES[fromId];
    const to      = SECTOR_KEYFRAMES[toId];

    // Smooth lerp toward target rotation
    const targetRX = THREE.MathUtils.lerp(from[0], to[0], blend);
    const targetRY = THREE.MathUtils.lerp(from[1], to[1], blend);
    const targetRZ = THREE.MathUtils.lerp(from[2], to[2], blend);

    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRX, 0.06);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRY, 0.06);
    groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetRZ, 0.06);

    // Floating bob on top of any scroll-driven position
    groupRef.current.position.y = THREE.MathUtils.lerp(
      THREE.MathUtils.lerp(from[4], to[4], blend),
      THREE.MathUtils.lerp(from[4], to[4], blend) + Math.sin(t * 0.7) * 0.18,
      0.9
    );

    // --- Sector-specific component micro-animations ---
    const isScanner = activeSectorId === 'scanner';
    const isCamera  = activeSectorId === 'camera';
    const isCore    = activeSectorId === 'core';
    const isAntenna = activeSectorId === 'antenna';
    const isSensors = activeSectorId === 'sensors';

    const activeColor = new THREE.Color(SECTOR_COLORS[activeSectorId] ?? '#3b82f6');
    const dimColor    = new THREE.Color('#1e293b');

    // Scanner laser grid – pulsing downward
    if (scannerRef.current) {
      const mat = (scannerRef.current as any).material as THREE.MeshStandardMaterial;
      mat.emissive.lerp(isScanner ? activeColor : dimColor, 0.12);
      mat.emissiveIntensity = THREE.MathUtils.lerp(mat.emissiveIntensity, isScanner ? (1.5 + Math.sin(t * 5) * 0.5) : 0, 0.1);
    }
    if (scanRingRef.current) {
      scanRingRef.current.scale.setScalar(isScanner ? (1 + Math.sin(t * 4) * 0.06) : 1);
    }

    // Camera lens glow
    if (cameraLens.current) {
      const mat = (cameraLens.current as any).material as THREE.MeshBasicMaterial;
      mat.color.lerp(isCamera ? activeColor : dimColor, 0.1);
    }

    // Core shield ring
    if (coreMat.current) {
      coreMat.current.emissive.lerp(isCore ? activeColor : dimColor, 0.1);
      coreMat.current.emissiveIntensity = THREE.MathUtils.lerp(coreMat.current.emissiveIntensity, isCore ? (2 + Math.sin(t * 6) * 0.5) : 0, 0.1);
    }

    // Antenna tip signal pulse
    if (antennaTip.current) {
      const mat = (antennaTip.current as any).material as THREE.MeshBasicMaterial;
      mat.color.lerp(isAntenna ? activeColor : dimColor, 0.1);
      antennaTip.current.scale.setScalar(isAntenna ? (1 + Math.sin(t * 8) * 0.3) : 1);
    }

    // Sensor wing glow
    if (sensor1Mat.current && sensor2Mat.current) {
      sensor1Mat.current.emissive.lerp(isSensors ? activeColor : dimColor, 0.1);
      sensor2Mat.current.emissive.lerp(isSensors ? activeColor : dimColor, 0.1);
      sensor1Mat.current.emissiveIntensity = THREE.MathUtils.lerp(sensor1Mat.current.emissiveIntensity, isSensors ? 1.5 : 0, 0.1);
      sensor2Mat.current.emissiveIntensity = THREE.MathUtils.lerp(sensor2Mat.current.emissiveIntensity, isSensors ? 1.5 : 0, 0.1);
    }
  });

  return (
    <group ref={groupRef} scale={1.5}>

      {/* ── Central Chassis ── */}
      <Box args={[2, 0.5, 2]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#0f172a" roughness={0.4} metalness={0.85} />
      </Box>

      {/* ── Arm rails ── */}
      {[[-1, 0, -1], [1, 0, -1], [-1, 0, 1], [1, 0, 1]].map(([x, y, z], i) => (
        <Box key={i} args={[0.12, 0.12, 1.6]} position={[x, y as number, z]}>
          <meshStandardMaterial color="#1e293b" metalness={0.9} roughness={0.2} />
        </Box>
      ))}

      {/* ── Propeller discs ── */}
      {[[-1.5, 0.2, -1.5], [1.5, 0.2, -1.5], [-1.5, 0.2, 1.5], [1.5, 0.2, 1.5]].map(([x, y, z], i) => (
        <group key={`prop-${i}`} position={[x, y as number, z]}>
          <Cylinder args={[0.55, 0.55, 0.06, 32]}>
            <meshStandardMaterial color="#0ea5e9" transparent opacity={0.35} metalness={1} roughness={0.0} />
          </Cylinder>
          <Cylinder args={[0.1, 0.1, 0.1, 16]}>
            <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.2} />
          </Cylinder>
        </group>
      ))}

      {/* ── CORE (Cybersecurity) – Center Top ── */}
      <Cylinder args={[0.8, 0.8, 0.6, 32]} position={[0, 0.45, 0]}>
        <meshStandardMaterial ref={coreMat} color="#1e293b" emissive="#2563eb" emissiveIntensity={0} roughness={0.15} metalness={0.9} />
        {/* Glowing shield ring */}
        <Cylinder args={[0.9, 0.9, 0.08, 64]} position={[0, 0.3, 0]}>
          <meshBasicMaterial color="#2563eb" transparent opacity={0.5} />
        </Cylinder>
      </Cylinder>

      {/* ── CAMERA (AI Vision) – Front Underbelly ── */}
      <group position={[0, -0.38, 0.85]}>
        <Sphere args={[0.32, 32, 32]}>
          <meshPhysicalMaterial color="#0f172a" clearcoat={1} transmission={0.4} roughness={0.05} metalness={0.5} />
        </Sphere>
        {/* Lens */}
        <Sphere ref={cameraLens} args={[0.16, 16, 16]} position={[0, 0, 0.24]}>
          <meshBasicMaterial color="#1e293b" />
        </Sphere>
        {/* Iris ring */}
        <Cylinder args={[0.2, 0.2, 0.04, 32]} position={[0, 0, 0.2]} rotation={[Math.PI / 2, 0, 0]}>
          <meshBasicMaterial color="#60a5fa" transparent opacity={0.6} />
        </Cylinder>
      </group>

      {/* ── ANTENNA (Cloud Nexus) – Back Top ── */}
      <group position={[0, 0.55, -0.85]}>
        <Cylinder args={[0.04, 0.04, 1.1, 16]} position={[0, 0.55, 0]}>
          <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.2} />
        </Cylinder>
        {/* Signal tip */}
        <Sphere ref={antennaTip} args={[0.1, 16, 16]} position={[0, 1.15, 0]}>
          <meshBasicMaterial color="#1e293b" />
        </Sphere>
        {/* Concentric wave rings */}
        {[0.3, 0.5, 0.7].map((r, i) => (
          <Cylinder key={i} args={[r, r, 0.015, 32]} position={[0, 1.1, 0]} rotation={[0, 0, 0]}>
            <meshBasicMaterial color="#06b6d4" transparent opacity={0.15 - i * 0.04} />
          </Cylinder>
        ))}
      </group>

      {/* ── SENSORS (Analytics) – Side Wings ── */}
      {[-1.25, 1.25].map((x, i) => (
        <group key={`sensor-${i}`} position={[x, 0, 0]}>
          <Box args={[0.85, 0.18, 0.85]}>
            <meshStandardMaterial
              ref={i === 0 ? sensor1Mat : sensor2Mat}
              color="#1e293b"
              emissive="#f59e0b"
              emissiveIntensity={0}
              roughness={0.2}
              metalness={0.8}
            />
          </Box>
          {/* Sensor node indicator */}
          <Sphere args={[0.1, 16, 16]} position={[0, 0.2, 0]}>
            <meshBasicMaterial color="#f59e0b" transparent opacity={0.6} />
          </Sphere>
        </group>
      ))}

      {/* ── SCANNER (Agriculture) – Bottom Array ── */}
      <group position={[0, -0.32, -0.2]}>
        <Box ref={scannerRef} args={[1.5, 0.1, 1.5]}>
          <meshStandardMaterial color="#1e293b" emissive="#10b981" emissiveIntensity={0} roughness={0.2} metalness={0.8} />
        </Box>
        {/* Scanner sweep ring */}
        <Cylinder ref={scanRingRef} args={[0.8, 0.8, 0.02, 48]} position={[0, -0.08, 0]}>
          <meshBasicMaterial color="#10b981" transparent opacity={0.4} />
        </Cylinder>
        {/* Grid lattice */}
        <gridHelper args={[1.4, 6, '#10b981', '#0f2e1e']} position={[0, -0.06, 0]} />
      </group>

    </group>
  );
}
