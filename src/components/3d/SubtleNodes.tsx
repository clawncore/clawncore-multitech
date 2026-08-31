import { SafeCanvas } from '../SafeCanvas';
import { Torus, Float, Stars } from '@react-three/drei';

function BackgroundNodes() {
  return (
    <>
      <Float speed={1} rotationIntensity={1} floatIntensity={1}>
        <Torus args={[1, 0.2, 16, 32]} position={[-4, 2, -5]} rotation={[Math.PI / 4, Math.PI / 4, 0]} scale={1.5}>
          <meshStandardMaterial color="#2563eb" wireframe opacity={0.3} transparent />
        </Torus>
      </Float>

      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
        <Torus args={[1.5, 0.1, 16, 64]} position={[5, -2, -8]} rotation={[0, Math.PI / 3, 0]} scale={2}>
          <meshStandardMaterial color="#ec4899" wireframe opacity={0.2} transparent />
        </Torus>
      </Float>

      <Float speed={0.8} rotationIntensity={1.5} floatIntensity={0.5}>
        <Torus args={[0.5, 0.15, 16, 16]} position={[-2, -3, -3]} rotation={[Math.PI / 6, 0, Math.PI / 2]} scale={1}>
          <meshStandardMaterial color="#3b82f6" wireframe opacity={0.4} transparent />
        </Torus>
      </Float>
    </>
  );
}

export function SubtleNodes() {
  return (
    <div className="absolute inset-0 z-[-1] pointer-events-none opacity-50">
      <SafeCanvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <BackgroundNodes />
        <Stars radius={50} depth={20} count={1000} factor={2} saturation={0} fade speed={0.5} />
      </SafeCanvas>
    </div>
  );
}
