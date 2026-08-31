import { Suspense, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { SafeCanvas } from '../components/SafeCanvas';
import { Environment, PerspectiveCamera, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { TalentNetwork } from '../components/3d/TalentNetwork';
import { DepartmentId } from '../services/careersData';

interface Props {
  hoveredDept: DepartmentId | null;
}

function CameraRig({ hoveredDept }: { hoveredDept: DepartmentId | null }) {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  
  useFrame((state) => {
    if (cameraRef.current) {
      const time = state.clock.elapsedTime;
      // Gentle floating animation
      cameraRef.current.position.y = THREE.MathUtils.lerp(
        cameraRef.current.position.y,
        Math.sin(time * 0.3) * 1,
        0.02
      );
      
      // If hovering, drift slightly toward the network
      const targetZ = hoveredDept ? 8 : 12;
      cameraRef.current.position.z = THREE.MathUtils.lerp(
        cameraRef.current.position.z,
        targetZ,
        0.05
      );
      
      cameraRef.current.lookAt(0, 0, 0);
    }
  });

  return (
    <PerspectiveCamera 
      ref={cameraRef} 
      makeDefault 
      position={[0, 0, 12]} 
      fov={45} 
    />
  );
}

export function CareersScene({ hoveredDept }: Props) {
  return (
    <SafeCanvas dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
      <fog attach="fog" args={['#ffffff', 10, 30]} />
      
      {/* Bright, clean lighting for Light Mode */}
      <ambientLight intensity={2} color="#f8fafc" />
      <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" />
      <directionalLight position={[-10, -10, -5]} intensity={1} color="#e0f2fe" />

      <Suspense fallback={null}>
        <TalentNetwork hoveredDept={hoveredDept} />
        
        {/* Subtle abstract background elements */}
        <mesh position={[0, 0, -15]} scale={30}>
          <planeGeometry />
          <meshBasicMaterial color="#f1f5f9" depthWrite={false} />
        </mesh>
        
        <Environment preset="city" />
      </Suspense>

      <OrbitControls 
        enableZoom={false}
        enablePan={false}
        maxPolarAngle={Math.PI / 2 + 0.2}
        minPolarAngle={Math.PI / 2 - 0.2}
        maxAzimuthAngle={0.2}
        minAzimuthAngle={-0.2}
      />
      <CameraRig hoveredDept={hoveredDept} />
    </SafeCanvas>
  );
}
