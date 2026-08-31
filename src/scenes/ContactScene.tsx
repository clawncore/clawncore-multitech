import { Suspense, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { SafeCanvas } from '../components/SafeCanvas';
import { Environment, PerspectiveCamera, Stars } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { EcosystemPortal } from '../components/3d/EcosystemPortal';
import * as THREE from 'three';

interface ContactSceneProps {
  isFocused: boolean;
}

function CameraRig({ isFocused }: { isFocused: boolean }) {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const target = useRef(new THREE.Vector3(0, 0, 10));

  useFrame((state) => {
    if (!cameraRef.current) return;
    
    // When focused, zoom in slightly to emphasize connection
    const destZ = isFocused ? 7 : 10;
    
    // Smooth idle drift
    const t = state.clock.getElapsedTime();
    const destX = Math.sin(t * 0.2) * 1.5;
    const destY = Math.cos(t * 0.15) * 0.8;
    
    target.current.lerp(new THREE.Vector3(destX, destY, destZ), 0.03);
    state.camera.position.copy(target.current);
    
    // Add subtle mouse parallax
    state.camera.position.x += (state.pointer.x * 0.5 - state.camera.position.x) * 0.05;
    state.camera.position.y += (state.pointer.y * 0.5 - state.camera.position.y) * 0.05;
    
    state.camera.lookAt(0, 0, 0);
  });

  return <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 10]} fov={50} />;
}

export function ContactScene({ isFocused }: ContactSceneProps) {
  return (
    <SafeCanvas dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
      <CameraRig isFocused={isFocused} />

      {/* Deep, welcoming cosmic void */}
      <color attach="background" args={['#f8fafc']} />
      <fogExp2 attach="fog" color="#01030a" density={0.03} />
      
      <Stars radius={80} depth={40} count={0} factor={3} saturation={0.5} fade speed={0.5} />

      {/* Optimistic cinematic lighting */}
      <ambientLight intensity={0.4} color="#0a1628" />
      <directionalLight position={[0, 10, 5]} intensity={2} color="#e0f2fe" />
      <pointLight position={[-5, 0, 5]} intensity={1.5} color="#38bdf8" distance={20} />
      <pointLight position={[5, -5, -5]} intensity={1} color="#60a5fa" distance={20} />
      <pointLight position={[0, 5, -5]} intensity={0.8} color="#2dd4bf" distance={15} />

      <Suspense fallback={null}>
        <EcosystemPortal isFocused={isFocused} />
        <Environment preset="city" />
      </Suspense>

      <EffectComposer enableNormalPass multisampling={4}>
        <Bloom luminanceThreshold={0.15} luminanceSmoothing={0.9} intensity={2.0} mipmapBlur />
      </EffectComposer>
    </SafeCanvas>
  );
}
