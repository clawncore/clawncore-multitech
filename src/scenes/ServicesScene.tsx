import { Suspense, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { SafeCanvas } from '../components/SafeCanvas';
import { Environment, PerspectiveCamera, Stars, Grid } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { ServiceModules, SERVICE_CAM_POSITIONS } from '../components/3d/ServiceModules';
import * as THREE from 'three';

interface ServicesSceneProps {
  activeServiceId: string | null;
  onServiceSelect: (id: string) => void;
}

function CameraRig({ activeServiceId }: { activeServiceId: string | null }) {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const targetPos = useRef(new THREE.Vector3(0, 0, 16));

  useFrame((state) => {
    if (!cameraRef.current) return;
    const t = state.clock.getElapsedTime();

    if (activeServiceId && SERVICE_CAM_POSITIONS[activeServiceId]) {
      targetPos.current.copy(SERVICE_CAM_POSITIONS[activeServiceId]);
    } else {
      // Default: gentle slow orbit around the hex ring
      const angle = t * 0.08;
      const radius = 16;
      targetPos.current.set(
        Math.sin(angle) * radius * 0.15,
        Math.sin(t * 0.04) * 1.5,
        radius
      );
    }

    state.camera.position.lerp(targetPos.current, 0.045);
    state.camera.lookAt(0, 0, 0);
  });

  return <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 16]} fov={48} />;
}

export function ServicesScene({ activeServiceId, onServiceSelect }: ServicesSceneProps) {
  return (
    <SafeCanvas dpr={[1, 2]} gl={{ antialias: false, alpha: true }}>
      <CameraRig activeServiceId={activeServiceId} />

      {/* Deep operational void */}
      <color attach="background" args={['#00050f']} />
      <fogExp2 attach="fog" color="#00050f" density={0.022} />
      <Stars radius={80} depth={40} count={0} factor={3} saturation={0} fade speed={0.4} />

      {/* Holographic tech floor */}
      <Grid
        position={[0, -5, 0]}
        args={[80, 80]}
        cellSize={1.5}
        cellThickness={0.4}
        cellColor="#0a1628"
        sectionSize={6}
        sectionThickness={0.8}
        sectionColor="#0e2040"
        fadeDistance={40}
        fadeStrength={1}
      />

      {/* Enterprise-grade lighting */}
      <ambientLight intensity={0.3} color="#0a1628" />
      <directionalLight position={[0, 20, 10]} intensity={1.5} color="#e0f2fe" />
      <pointLight position={[0, 0, 5]} intensity={2} color="#22d3ee" distance={20} />
      <pointLight position={[6, 4, -5]} intensity={1} color="#60a5fa" distance={20} />
      <pointLight position={[-6, -4, -5]} intensity={1} color="#34d399" distance={20} />

      <Suspense fallback={null}>
        <ServiceModules
          activeServiceId={activeServiceId}
          onServiceSelect={onServiceSelect}
        />
        <Environment preset="city" />
      </Suspense>

      <EffectComposer enableNormalPass multisampling={4}>
        <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} intensity={1.8} mipmapBlur />
      </EffectComposer>
    </SafeCanvas>
  );
}
