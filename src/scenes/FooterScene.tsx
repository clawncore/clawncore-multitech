import { Suspense, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { SafeCanvas } from '../components/SafeCanvas';
import { PerspectiveCamera, Stars } from '@react-three/drei';
import { EcosystemPulse } from '../components/3d/EcosystemPulse';
import * as THREE from 'three';

function CameraRig() {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  useFrame((state) => {
    if (!cameraRef.current) return;
    const t = state.clock.getElapsedTime();
    
    // Extremely slow, calming cinematic drift
    const destX = Math.sin(t * 0.05) * 0.5;
    const destY = Math.cos(t * 0.03) * 0.3;
    
    state.camera.position.lerp(new THREE.Vector3(destX, destY, 10), 0.01);
    state.camera.lookAt(0, -2, -10);
  });

  return <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 10]} fov={45} />;
}

export function FooterScene() {
  return (
    <SafeCanvas dpr={[1, 2]} gl={{ antialias: false, alpha: true }}>
      <CameraRig />

      {/* Deep, infinite void feeling */}
      <color attach="background" args={['#f8fafc']} />
      
      {/* Heavy fog creates distance and fades objects out smoothly */}
      <fog attach="fog" args={['#f8fafc', 30, 30]} />
      
      <Stars radius={50} depth={20} count={0} factor={2} saturation={0} fade speed={0.2} />

      <Suspense fallback={null}>
        <EcosystemPulse />
      </Suspense>

      {/* No heavy post-processing needed here, just clean and calm rendering */}
    </SafeCanvas>
  );
}
