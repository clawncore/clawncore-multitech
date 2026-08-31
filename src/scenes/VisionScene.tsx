import { Suspense, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { SafeCanvas } from '../components/SafeCanvas';
import { Environment, PerspectiveCamera } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { FutureTimeline } from '../components/3d/FutureTimeline';
import { CosmicGrid } from '../components/3d/CosmicGrid';
import * as THREE from 'three';

interface VisionSceneProps {
  activeNodeId: string | null;
  onNodeSelect: (id: string) => void;
}

// Camera X positions aligned to each phase node
const NODE_CAMERA_X: Record<string, number> = {
  phase1: -9,
  phase2: -3,
  phase3: 3,
  phase4: 9,
};

function CameraRig({ activeNodeId }: { activeNodeId: string | null }) {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const targetPosition = useRef(new THREE.Vector3(0, 1, 16));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((state) => {
    if (!cameraRef.current) return;
    const t = state.clock.getElapsedTime();

    if (activeNodeId && NODE_CAMERA_X[activeNodeId] !== undefined) {
      // Zoom into selected node
      const nx = NODE_CAMERA_X[activeNodeId];
      targetPosition.current.set(nx, 1.5, 7);
      targetLookAt.current.set(nx, 0, 0);
    } else {
      // Default: slow panoramic sweep across the timeline
      const sweep = Math.sin(t * 0.08) * 6;
      targetPosition.current.set(sweep, 1 + Math.sin(t * 0.05) * 1, 16);
      targetLookAt.current.set(sweep * 0.3, 0, 0);
    }

    state.camera.position.lerp(targetPosition.current, 0.04);

    // Smooth look-at interpolation
    const currentLookAt = new THREE.Vector3();
    currentLookAt.lerp(targetLookAt.current, 0.04);
    state.camera.lookAt(currentLookAt);
  });

  return <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 1, 16]} fov={50} />;
}

export function VisionScene({ activeNodeId, onNodeSelect }: VisionSceneProps) {
  return (
    <SafeCanvas dpr={[1, 2]} gl={{ antialias: false, alpha: true }}>
      <CameraRig activeNodeId={activeNodeId} />

      {/* Visionary deep space void */}
      <color attach="background" args={['#f8fafc']} />
      <fogExp2 attach="fog" color="#010205" density={0.018} />

      {/* Cinematic inspirational lighting */}
      <ambientLight intensity={0.3} color="#1a1400" />
      <directionalLight position={[0, 30, 20]} intensity={1.5} color="#fde68a" />
      <pointLight position={[-9, 3, 3]} intensity={2} color="#60a5fa" distance={15} />
      <pointLight position={[9, 3, 3]} intensity={2} color="#34d399" distance={15} />
      <pointLight position={[0, 10, -10]} intensity={1} color="#f59e0b" distance={25} />

      <Suspense fallback={null}>
        {/* Background cosmic environment */}
        <CosmicGrid />

        {/* Interactive roadmap timeline */}
        <FutureTimeline
          activeNodeId={activeNodeId}
          onNodeSelect={onNodeSelect}
        />

        <Environment preset="night" />
      </Suspense>

      {/* Cinematic Bloom — gold-tinted for inspirational feel */}
      <EffectComposer enableNormalPass multisampling={4}>
        <Bloom
          luminanceThreshold={0.15}
          luminanceSmoothing={0.85}
          intensity={2}
          mipmapBlur
        />
      </EffectComposer>
    </SafeCanvas>
  );
}
