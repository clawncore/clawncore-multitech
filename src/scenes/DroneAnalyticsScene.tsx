import { Suspense, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { SafeCanvas } from '../components/SafeCanvas';
import { Environment, PerspectiveCamera, OrbitControls, Sky } from '@react-three/drei';
import * as THREE from 'three';
import { TerrainSystem } from '../components/3d/TerrainSystem';
import { DroneFleet } from '../components/3d/DroneFleet';
import { CropIntelligence } from '../components/3d/CropIntelligence';

interface Props {
  showWireframe: boolean;
  showDrones: boolean;
  showCropData: boolean;
  isScanning: boolean;
}

function CinematicRig({ isScanning }: { isScanning: boolean }) {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  
  useFrame((state) => {
    // If scanning, slowly orbit the camera
    if (isScanning && cameraRef.current) {
      const angle = state.clock.elapsedTime * 0.1;
      const radius = 25;
      cameraRef.current.position.x = Math.sin(angle) * radius;
      cameraRef.current.position.z = Math.cos(angle) * radius;
      cameraRef.current.lookAt(0, 0, 0);
    }
  });

  return (
    <PerspectiveCamera 
      ref={cameraRef} 
      makeDefault 
      position={[0, 15, 25]} 
      fov={45} 
    />
  );
}

export function DroneAnalyticsScene({ showWireframe, showDrones, showCropData, isScanning }: Props) {
  return (
    <SafeCanvas dpr={[1, 2]} gl={{ antialias: true }} shadows>
      <color attach="background" args={['#f8fafc']} />
      <fog attach="fog" args={['#f8fafc', 20, 60]} />
      
      {/* Light Mode Studio Environment */}
      <ambientLight intensity={1.5} color="#ffffff" />
      <directionalLight 
        position={[15, 20, 5]} 
        intensity={2.5} 
        color="#ffffff" 
        castShadow 
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <directionalLight position={[-15, 10, -10]} intensity={1.5} color="#e0f2fe" />

      {/* Very subtle sky gradient to break up plain white */}
      <Sky distance={450000} sunPosition={[15, 20, 5]} inclination={0} azimuth={0.25} />

      <Suspense fallback={null}>
        <group position={[0, -2, 0]}>
          <TerrainSystem showWireframe={showWireframe} isScanning={isScanning} />
          {showCropData && <CropIntelligence />}
          {showDrones && <DroneFleet isScanning={isScanning} />}
        </group>
        
        {/* Subtle reflections */}
        <Environment preset="city" />
      </Suspense>

      <OrbitControls 
        enablePan={false}
        maxPolarAngle={Math.PI / 2 - 0.05} // Prevent going below ground
        minDistance={10}
        maxDistance={40}
        enabled={!isScanning} // Disable manual control during cinematic scan
      />
      <CinematicRig isScanning={isScanning} />
    </SafeCanvas>
  );
}
