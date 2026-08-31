import { Suspense, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { SafeCanvas } from '../components/SafeCanvas';
import { Environment, PerspectiveCamera, Stars } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { TechClusters, CLUSTER_POSITIONS } from '../components/3d/TechClusters';
import { NetworkArchitecture } from '../components/3d/NetworkArchitecture';
import * as THREE from 'three';

interface EcosystemSceneProps {
  activeClusterId: string | null;
  onClusterSelect: (id: string) => void;
}

function CameraRig({ activeClusterId }: { activeClusterId: string | null }) {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  
  useFrame((state) => {
    if (!cameraRef.current) return;

    if (activeClusterId) {
      // Zoom into the specific cluster
      const targetPos = CLUSTER_POSITIONS[activeClusterId];
      // Offset slightly so it's not inside the object
      const cameraTarget = new THREE.Vector3(targetPos.x, targetPos.y, targetPos.z + 5);
      
      state.camera.position.lerp(cameraTarget, 0.05);
      
      // Look at the cluster
      const currentLookAt = new THREE.Vector3(0,0,0);
      currentLookAt.lerp(targetPos, 0.05);
      state.camera.lookAt(currentLookAt);
    } else {
      // Default: Slow orbital view of the entire network
      const t = state.clock.getElapsedTime();
      const radius = 18;
      const x = Math.sin(t * 0.1) * radius;
      const z = Math.cos(t * 0.1) * radius;
      const y = Math.sin(t * 0.05) * 5;
      
      const targetCameraPos = new THREE.Vector3(x, y, z);
      state.camera.position.lerp(targetCameraPos, 0.02);
      state.camera.lookAt(0, 0, 0);
    }
  });

  return <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 20]} fov={45} />;
}

export function EcosystemScene({ activeClusterId, onClusterSelect }: EcosystemSceneProps) {
  return (
    <SafeCanvas dpr={[1, 2]} gl={{ antialias: false, alpha: true }}>
      <CameraRig activeClusterId={activeClusterId} />
      
      {/* Volumetric Void */}
      <color attach="background" args={['#f1f5f9']} />
      <fogExp2 attach="fog" color="#02040a" density={0.02} />
      <Stars radius={100} depth={50} count={0} factor={4} saturation={0} fade speed={0.5} />

      {/* Holographic Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[20, 20, 20]} intensity={1} color="#ffffff" />
      <pointLight position={[0, 0, 0]} intensity={2} color="#3b82f6" distance={20} />

      <Suspense fallback={null}>
        {/* Background Network */}
        <NetworkArchitecture />

        {/* Interactive Technology Modules */}
        <TechClusters 
          activeClusterId={activeClusterId} 
          onClusterSelect={onClusterSelect} 
        />
        
        <Environment preset="city" />
      </Suspense>

      {/* Cinematic Glow */}
      <EffectComposer enableNormalPass multisampling={4}>
        <Bloom 
          luminanceThreshold={0.2} 
          luminanceSmoothing={0.9} 
          intensity={2} 
          mipmapBlur 
        />
      </EffectComposer>
    </SafeCanvas>
  );
}
