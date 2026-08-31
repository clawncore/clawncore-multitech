import { Suspense, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { SafeCanvas } from '../components/SafeCanvas';
import { Environment, PerspectiveCamera, Stars } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { GlobalNetwork } from '../components/3d/GlobalNetwork';
import * as THREE from 'three';

interface TrustSceneProps {
  activeCardId: string | null;
}

function CameraRig({ activeCardId: _activeCardId }: { activeCardId: string | null }) {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    // Slow stable orbit — enterprise-grade confidence
    const x = Math.sin(t * 0.06) * 2;
    const y = Math.sin(t * 0.04) * 0.8;
    state.camera.position.lerp(new THREE.Vector3(x, y, 14), 0.02);
    state.camera.lookAt(2, 0, 0); // offset toward globe
  });

  return <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 14]} fov={44} />;
}

export function TrustScene({ activeCardId }: TrustSceneProps) {
  return (
    <SafeCanvas dpr={[1, 2]} gl={{ antialias: false, alpha: true }}>
      <CameraRig activeCardId={activeCardId} />

      <color attach="background" args={['#f8fafc']} />
      <fogExp2 attach="fog" color="#000c1a" density={0.02} />
      <Stars radius={100} depth={50} count={4000} factor={4} saturation={0} fade speed={0.3} />

      {/* Professional corporate lighting */}
      <ambientLight intensity={0.3} color="#0a1628" />
      <directionalLight position={[0, 15, 10]} intensity={1.8} color="#e0f2fe" />
      <pointLight position={[-10, 4, 6]} intensity={1.5} color="#22d3ee" distance={25} />
      <pointLight position={[10, -4, 4]} intensity={1} color="#34d399" distance={20} />

      <Suspense fallback={null}>
        <GlobalNetwork />
        <Environment preset="city" />
      </Suspense>

      <EffectComposer enableNormalPass multisampling={4}>
        <Bloom luminanceThreshold={0.25} luminanceSmoothing={0.9} intensity={1.5} mipmapBlur />
      </EffectComposer>
    </SafeCanvas>
  );
}
