import { Suspense, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { SafeCanvas } from '../components/SafeCanvas';
import { Environment, PerspectiveCamera, Stars } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { AICoreInteractive } from '../components/3d/AICoreInteractive';
import { NeuralEnvironment } from '../components/3d/NeuralEnvironment';
import * as THREE from 'three';
import { AIStatus } from '../hooks/useAIConversation';

interface ClawnAILiveSceneProps {
  status: AIStatus;
}

function CameraRig({ status }: { status: AIStatus }) {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const target = useRef(new THREE.Vector3(0, 0, 8));

  useFrame((state) => {
    if (!cameraRef.current) return;
    
    // When thinking/responding, move camera slightly closer to core
    const destZ = status !== 'idle' ? 6.5 : 8;
    
    // Mouse parallax
    const destX = state.pointer.x * 2;
    const destY = state.pointer.y * 1;
    
    target.current.lerp(new THREE.Vector3(destX, destY, destZ), 0.03);
    state.camera.position.copy(target.current);
    state.camera.lookAt(0, 0, 0);
  });

  return <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 8]} fov={45} />;
}

export function ClawnAILiveScene({ status }: ClawnAILiveSceneProps) {
  return (
    <SafeCanvas dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
      <CameraRig status={status} />

      <color attach="background" args={['#f1f5f9']} />
      <fogExp2 attach="fog" color="#010410" density={0.035} />
      
      <Stars radius={60} depth={30} count={0} factor={4} saturation={1} fade speed={status !== 'idle' ? 1.5 : 0.5} />

      {/* Cinematic AI Lighting Setup */}
      <ambientLight intensity={0.2} color="#0d1b3e" />
      <directionalLight position={[0, 10, 5]} intensity={1.5} color="#bfdbfe" />
      <pointLight position={[-5, 2, 2]} intensity={2} color="#60a5fa" distance={15} />
      <pointLight position={[5, -2, -2]} intensity={2} color="#60a5fa" distance={15} />

      <Suspense fallback={null}>
        <AICoreInteractive status={status} />
        <NeuralEnvironment status={status} />
        <Environment preset="night" />
      </Suspense>

      <EffectComposer enableNormalPass multisampling={4}>
        <Bloom 
          luminanceThreshold={0.1} 
          luminanceSmoothing={0.9} 
          intensity={status === 'thinking' ? 3.0 : status === 'responding' ? 2.5 : 1.8} 
          mipmapBlur 
        />
      </EffectComposer>
    </SafeCanvas>
  );
}
