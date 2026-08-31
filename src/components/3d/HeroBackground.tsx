import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { SafeCanvas } from '../SafeCanvas';
import { Icosahedron, MeshDistortMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

function FloatingShapes() {
  return (
    <>
      <Float speed={1.5} rotationIntensity={1.5} floatIntensity={2}>
        <Icosahedron args={[1, 1]} position={[-3, 1, -2]} scale={1.5}>
          <MeshDistortMaterial color="#ec4899" distort={0.3} speed={2} roughness={0.2} metalness={0.8} />
        </Icosahedron>
      </Float>

      <Float speed={2} rotationIntensity={2} floatIntensity={2}>
        <Icosahedron args={[1, 1]} position={[3, -1, -3]} scale={1.2}>
          <MeshDistortMaterial color="#2563eb" distort={0.4} speed={1.5} roughness={0.2} metalness={0.8} />
        </Icosahedron>
      </Float>

      <Float speed={1} rotationIntensity={1} floatIntensity={1}>
        <Icosahedron args={[1, 1]} position={[0, 2, -5]} scale={2}>
          <MeshDistortMaterial color="#3b82f6" distort={0.2} speed={1} roughness={0.2} metalness={0.8} />
        </Icosahedron>
      </Float>
    </>
  );
}

function ParticleNetwork() {
  const count = 300;
  const mesh = useRef<THREE.InstancedMesh>(null);
  
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const xFactor = -20 + Math.random() * 40;
      const yFactor = -20 + Math.random() * 40;
      const zFactor = -20 + Math.random() * 40;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
    }
    return temp;
  }, [count]);

  useFrame(() => {
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
      t = particle.t += speed / 2;
      const s = Math.cos(t);

      dummy.position.set(
        xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      );
      dummy.scale.set(s, s, s);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();
      if (mesh.current) {
        mesh.current.setMatrixAt(i, dummy.matrix);
      }
    });
    if (mesh.current) {
      mesh.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
    </instancedMesh>
  );
}

export function HeroBackground() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <SafeCanvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} />
        <directionalLight position={[-10, -10, -10]} intensity={0.5} color="#2563eb" />
        <FloatingShapes />
        <ParticleNetwork />
      </SafeCanvas>
    </div>
  );
}
