import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import * as THREE from 'three';
import { AIStatus } from '../../hooks/useAIConversation';

interface NeuralEnvironmentProps {
  status: AIStatus;
}

export function NeuralEnvironment({ status }: NeuralEnvironmentProps) {
  const particlesRef = useRef<THREE.InstancedMesh>(null);
  const linesGroupRef = useRef<THREE.Group>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Generate random splines radiating from center
  const paths = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const points = [];
      for (let j = 0; j <= 5; j++) {
        const radius = j * 3 + 2;
        // add some noise to the path
        const xNoise = (Math.random() - 0.5) * j;
        const yNoise = (Math.random() - 0.5) * j;
        points.push(new THREE.Vector3(
          Math.cos(angle) * radius + xNoise,
          yNoise,
          Math.sin(angle) * radius
        ));
      }
      arr.push(new THREE.CatmullRomCurve3(points));
    }
    return arr;
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Animate background data particles
    if (particlesRef.current) {
      const speed = status === 'thinking' ? 2.5 : status === 'responding' ? 1.5 : 0.5;
      
      for (let i = 0; i < 200; i++) {
        // Particles orbit the core
        const angle = (i / 200) * Math.PI * 2 + t * speed * 0.1;
        const radius = 5 + Math.sin(i * 13.5) * 3;
        const yOffset = Math.sin(t * speed * 0.5 + i) * 3;

        dummy.position.set(
          Math.cos(angle) * radius,
          yOffset,
          Math.sin(angle) * radius
        );
        
        const scale = status !== 'idle' ? 0.08 + Math.sin(t * 3 + i) * 0.04 : 0.04;
        dummy.scale.setScalar(scale);
        
        dummy.updateMatrix();
        particlesRef.current.setMatrixAt(i, dummy.matrix);
      }
      particlesRef.current.instanceMatrix.needsUpdate = true;
    }

    // Pulse the connection lines if active
    if (linesGroupRef.current) {
      linesGroupRef.current.children.forEach((child, i) => {
        if ((child as any).material) {
          const mat = (child as any).material;
          const targetOpacity = status !== 'idle' ? 0.4 + Math.sin(t * 3 + i) * 0.2 : 0.1;
          mat.opacity = THREE.MathUtils.lerp(mat.opacity, targetOpacity, 0.05);
        }
      });
      linesGroupRef.current.rotation.y = t * 0.05;
    }
  });

  return (
    <group>
      {/* Radiating connection pathways */}
      <group ref={linesGroupRef}>
        {paths.map((path, i) => (
          <Line
            key={i}
            points={path.getPoints(50)}
            color="#22d3ee"
            lineWidth={1.5}
            transparent
            opacity={0.1}
          />
        ))}
      </group>

      {/* Floating data particles */}
      <instancedMesh ref={particlesRef} args={[undefined, undefined, 200]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial 
          color="#2563eb" 
          transparent 
          opacity={0.6} 
          blending={THREE.AdditiveBlending} 
          depthWrite={false}
        />
      </instancedMesh>
    </group>
  );
}
