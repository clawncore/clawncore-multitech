import { Suspense, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { SafeCanvas } from '../components/SafeCanvas';
import { Environment, PerspectiveCamera, Stars } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { AICore } from '../components/3d/AICore';
import { NeuralStreams } from '../components/3d/NeuralStreams';
import * as THREE from 'three';

interface ClawnAISceneProps {
  activeModuleId: string | null;
  onModuleSelect: (id: string) => void;
}

function CameraRig({ activeModuleId }: { activeModuleId: string | null }) {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const targetPos = useRef(new THREE.Vector3(0, 0, 12));
  
  useFrame((state) => {
    if (!cameraRef.current) return;

    // React slightly to mouse for the floating feel
    const pointerX = state.pointer.x * 1;
    const pointerY = state.pointer.y * 1;

    if (activeModuleId) {
      // Zoom in slightly when a module is active
      targetPos.current.set(pointerX, pointerY, 8);
    } else {
      // Default view
      targetPos.current.set(pointerX, pointerY, 12);
    }

    // Smooth camera interpolation
    state.camera.position.lerp(targetPos.current, 0.05);
    
    // Always keep focus near the center core
    const lookAtTarget = new THREE.Vector3(0, 0, 0);
    state.camera.lookAt(lookAtTarget);
  });

  return <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 12]} fov={45} />;
}

export function ClawnAIScene({ activeModuleId, onModuleSelect }: ClawnAISceneProps) {
  return (
    <SafeCanvas dpr={[1, 2]} gl={{ antialias: false, alpha: true }}>
      <CameraRig activeModuleId={activeModuleId} />
      
      {/* Deep Neural Void */}
      <color attach="background" args={['#f1f5f9']} />
      <fogExp2 attach="fog" color="#000103" density={0.03} />
      
      {/* Drifting Synapse Particles (using Stars as a base) */}
      <Stars radius={50} depth={30} count={0} factor={3} saturation={0.5} fade speed={1} />

      {/* Cool, intelligent lighting */}
      <ambientLight intensity={0.2} color="#1e3a8a" />
      <directionalLight position={[10, 20, 10]} intensity={1.5} color="#60a5fa" />
      <pointLight position={[0, 0, 0]} intensity={3} color="#3b82f6" distance={15} />

      <Suspense fallback={null}>
        
        {/* The Central Intelligence Core */}
        <AICore />

        {/* Neural Connections & Nodes */}
        <NeuralStreams 
          activeModuleId={activeModuleId} 
          onModuleSelect={onModuleSelect} 
        />
        
        {/* Environment reflections */}
        <Environment preset="city" />
      </Suspense>

      {/* Cinematic Postprocessing */}
      <EffectComposer enableNormalPass multisampling={4}>
        <Bloom 
          luminanceThreshold={0.1} 
          luminanceSmoothing={0.9} 
          intensity={2.5} 
          mipmapBlur 
        />
      </EffectComposer>
    </SafeCanvas>
  );
}
