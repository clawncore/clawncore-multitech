import { Suspense, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { SafeCanvas } from '../components/SafeCanvas';
import { Environment, PerspectiveCamera, OrbitControls, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { InnovationCore } from '../components/3d/InnovationCore';
import { PrototypeModules } from '../components/3d/PrototypeModules';
import { PrototypeId } from '../services/prototypes';

interface Props {
  activePrototype: PrototypeId;
  isSimulating: boolean;
}

function CinematicRig({ isSimulating }: { isSimulating: boolean }) {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const target = new THREE.Vector3(0, 2, 0);
  
  useFrame((state) => {
    if (cameraRef.current) {
      if (isSimulating) {
        // Slow cinematic orbit when simulating
        const angle = state.clock.elapsedTime * 0.2;
        cameraRef.current.position.x = Math.sin(angle) * 12;
        cameraRef.current.position.z = Math.cos(angle) * 12;
        cameraRef.current.position.y = 5 + Math.sin(state.clock.elapsedTime * 0.5) * 2;
        cameraRef.current.lookAt(target);
      } else {
        // Subtle floating movement when idle
        const time = state.clock.elapsedTime;
        cameraRef.current.position.y = THREE.MathUtils.lerp(
          cameraRef.current.position.y,
          5 + Math.sin(time * 0.5) * 0.5,
          0.05
        );
        cameraRef.current.lookAt(target);
      }
    }
  });

  return (
    <PerspectiveCamera 
      ref={cameraRef} 
      makeDefault 
      position={[0, 5, 12]} 
      fov={45} 
    />
  );
}

export function InnovationLabScene({ activePrototype, isSimulating }: Props) {
  return (
    <SafeCanvas dpr={[1, 2]} gl={{ antialias: true }} shadows>
      <color attach="background" args={['#ffffff']} />
      <fog attach="fog" args={['#ffffff', 10, 40]} />
      
      {/* Pristine Laboratory Lighting */}
      <ambientLight intensity={1.5} color="#f8fafc" />
      <directionalLight 
        position={[5, 15, 5]} 
        intensity={2} 
        color="#ffffff" 
        castShadow 
        shadow-bias={-0.0001}
      />
      <spotLight 
        position={[0, 15, 0]} 
        angle={0.3} 
        penumbra={1} 
        intensity={3} 
        color="#e0f2fe" 
        castShadow 
      />

      <Suspense fallback={null}>
        <group position={[0, -2, 0]}>
          <InnovationCore />
          <PrototypeModules activePrototype={activePrototype} isSimulating={isSimulating} />
          
          {/* Ground Reflection/Shadow */}
          <ContactShadows 
            position={[0, 0, 0]} 
            opacity={0.5} 
            scale={20} 
            blur={2} 
            far={10} 
            color="#94a3b8" 
          />
        </group>
        
        {/* Studio environment for clean reflections */}
        <Environment preset="studio" />
      </Suspense>

      <OrbitControls 
        enablePan={false}
        maxPolarAngle={Math.PI / 2 - 0.1} // Prevent going below floor
        minDistance={5}
        maxDistance={20}
        enabled={!isSimulating} // Disable manual control during cinematic simulation
      />
      <CinematicRig isSimulating={isSimulating} />
    </SafeCanvas>
  );
}
