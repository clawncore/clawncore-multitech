import { Suspense, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { SafeCanvas } from '../components/SafeCanvas';
import { Environment, PerspectiveCamera, Stars } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { FounderPortrait } from '../components/3d/FounderPortrait';
import { PhilosophyNodes, PHILOSOPHY_CAM } from '../components/3d/PhilosophyNodes';
import * as THREE from 'three';

interface FounderSceneProps {
  activeNodeId: string | null;
  onNodeSelect: (id: string) => void;
}

function CameraRig({ activeNodeId }: { activeNodeId: string | null }) {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const target = useRef(new THREE.Vector3(0, 0, 11));
  const lookTarget = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((state) => {
    if (!cameraRef.current) return;
    const destPos = activeNodeId ? PHILOSOPHY_CAM[activeNodeId] : PHILOSOPHY_CAM.default;
    target.current.lerp(destPos, 0.04);

    if (!activeNodeId) {
      // Soft mouse parallax when idle
      target.current.x = THREE.MathUtils.lerp(target.current.x, state.pointer.x * 1.5, 0.03);
      target.current.y = THREE.MathUtils.lerp(target.current.y, state.pointer.y * 0.8, 0.03);
    }

    state.camera.position.lerp(target.current, 0.05);

    const lookDest = activeNodeId
      ? new THREE.Vector3(
          PHILOSOPHY_CAM[activeNodeId].x * 0.5,
          PHILOSOPHY_CAM[activeNodeId].y * 0.5 - 1,
          0
        )
      : new THREE.Vector3(0, 0, 0);
    lookTarget.current.lerp(lookDest, 0.05);
    state.camera.lookAt(lookTarget.current);
  });

  return <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 11]} fov={42} />;
}

export function FounderScene({ activeNodeId, onNodeSelect }: FounderSceneProps) {
  return (
    <SafeCanvas dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
      <CameraRig activeNodeId={activeNodeId} />

      {/* Intimate deep atmosphere */}
      <color attach="background" args={['#010208']} />
      <fogExp2 attach="fog" color="#010208" density={0.025} />
      <Stars radius={60} depth={30} count={0} factor={3} saturation={0} fade speed={0.3} />

      {/* Cinematic Leadership Lighting */}
      {/* Key light — cool intellectual blue from above */}
      <directionalLight position={[0, 12, 8]} intensity={1.8} color="#bfdbfe" />
      {/* Warm accent rim from below-left — human warmth */}
      <pointLight position={[-8, -4, 4]} intensity={1.5} color="#f59e0b" distance={18} />
      {/* Cool rim from right — technology edge */}
      <pointLight position={[8, 2, -2]} intensity={1.2} color="#60a5fa" distance={15} />
      {/* Ambient base */}
      <ambientLight intensity={0.25} color="#0a0f2e" />
      {/* Fill — soft blue for depth */}
      <pointLight position={[0, -8, 4]} intensity={0.8} color="#7c3aed" distance={20} />

      <Suspense fallback={null}>
        {/* Holographic founder presence */}
        <FounderPortrait />

        {/* 4 interactive philosophy nodes */}
        <PhilosophyNodes
          activeNodeId={activeNodeId}
          onNodeSelect={onNodeSelect}
        />

        <Environment preset="city" />
      </Suspense>

      {/* Soft restrained Bloom — intimate not explosive */}
      <EffectComposer enableNormalPass multisampling={4}>
        <Bloom
          luminanceThreshold={0.3}
          luminanceSmoothing={0.9}
          intensity={1.4}
          mipmapBlur
        />
      </EffectComposer>
    </SafeCanvas>
  );
}
