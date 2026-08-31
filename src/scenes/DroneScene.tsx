import { Suspense, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { SafeCanvas } from '../components/SafeCanvas';
import { Environment, PerspectiveCamera } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { InteractiveDrone } from '../components/3d/InteractiveDrone';
import * as THREE from 'three';

interface DroneSceneProps {
  scrollProgress: number;   // 0 → 1
  activeSectorId: string;
}

// Sector-specific camera positions
const SECTOR_CAMS: Record<string, THREE.Vector3> = {
  scanner: new THREE.Vector3( 1.2, -1.5, 7.5),   // Low, looking at bottom scanner
  camera:  new THREE.Vector3( 0.8, -0.5, 6.0),   // Close – AI lens focus
  core:    new THREE.Vector3(-1.5,  2.2, 6.8),   // Profile – core shield
  antenna: new THREE.Vector3( 0.5,  2.5, -7.5),  // Back – antenna nexus
  sensors: new THREE.Vector3(-4.0,  0.5, 5.5),   // Side – sensor wings
};

const SECTOR_IDS = ['scanner', 'camera', 'core', 'antenna', 'sensors'];

// Per-sector accent colors for point light tinting
const SECTOR_LIGHT_COLORS: Record<string, string> = {
  scanner: '#10b981',
  camera:  '#3b82f6',
  core:    '#2563eb',
  antenna: '#06b6d4',
  sensors: '#f59e0b',
};

const SECTOR_BG: Record<string, string> = {
  scanner: '#f0fdf4',  // Very light green
  camera:  '#eff6ff',  // Very light blue
  core:    '#eef2ff',  // Very light indigo
  antenna: '#ecfeff',  // Very light cyan
  sensors: '#fffbeb',  // Very light amber
};

function CameraRig({ scrollProgress, activeSectorId: _activeSectorId }: DroneSceneProps) {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const targetColor = useRef(new THREE.Color('#ffffff'));
  const lightRef = useRef<THREE.PointLight>(null);
  const bgRef    = useRef<THREE.Color>(new THREE.Color('#f1f5f9'));

  useFrame((state) => {
    const numSectors = SECTOR_IDS.length;
    const sectorFloat = scrollProgress * (numSectors - 1);
    const fromIdx = Math.max(0, Math.min(numSectors - 2, Math.floor(sectorFloat)));
    const toIdx   = Math.min(numSectors - 1, fromIdx + 1);
    const blend   = sectorFloat - fromIdx;

    const fromId  = SECTOR_IDS[fromIdx];
    const toId    = SECTOR_IDS[toIdx];

    const fromCam = SECTOR_CAMS[fromId];
    const toCam   = SECTOR_CAMS[toId];

    // Interpolate camera position
    const targetCamPos = new THREE.Vector3().lerpVectors(fromCam, toCam, blend);
    state.camera.position.lerp(targetCamPos, 0.04);
    state.camera.lookAt(0, 0.3, 0);

    // Interpolate accent point light color
    if (lightRef.current) {
      const fromLightColor = new THREE.Color(SECTOR_LIGHT_COLORS[fromId]);
      const toLightColor   = new THREE.Color(SECTOR_LIGHT_COLORS[toId]);
      targetColor.current.lerpColors(fromLightColor, toLightColor, blend);
      lightRef.current.color.lerp(targetColor.current, 0.08);
    }

    // Smoothly update background color
    const fromBg = new THREE.Color(SECTOR_BG[fromId]);
    const toBg   = new THREE.Color(SECTOR_BG[toId]);
    bgRef.current.lerpColors(fromBg, toBg, blend);
    if (state.scene.background instanceof THREE.Color) {
      state.scene.background.lerp(bgRef.current, 0.06);
    }
  });

  return (
    <>
      <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 9]} fov={42} />
      <pointLight ref={lightRef} position={[-5, 3, 4]} intensity={4} color="#10b981" distance={20} />
    </>
  );
}

export function DroneScene({ scrollProgress, activeSectorId }: DroneSceneProps) {
  return (
    <SafeCanvas dpr={1} gl={{ antialias: false, alpha: false, powerPreference: 'default' }}>
      <CameraRig scrollProgress={scrollProgress} activeSectorId={activeSectorId} />

      {/* Background – updated dynamically in CameraRig via scene.background */}
      <color attach="background" args={['#f0fdf4']} />

      <ambientLight intensity={0.6} />
      <directionalLight position={[8, 18, 8]} intensity={2.2} color="#ffffff" castShadow />
      <directionalLight position={[-10, 4, -6]} intensity={1.0} color="#e0f2fe" />
      <pointLight position={[10, -8, 10]} intensity={1.2} color="#ffffff" />

      {/* DEBUG CUBE: If you can see this red cube, the canvas works! */}
      <mesh position={[0, 0, 5]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="red" />
      </mesh>

      <Suspense fallback={null}>
        <InteractiveDrone scrollProgress={scrollProgress} activeSectorId={activeSectorId} />
        <Environment preset="sunset" />
      </Suspense>

      <EffectComposer enableNormalPass={false} multisampling={0}>
        <Bloom
          luminanceThreshold={1.1}
          luminanceSmoothing={0.2}
          intensity={1.2}
          mipmapBlur
        />
      </EffectComposer>
    </SafeCanvas>
  );
}
