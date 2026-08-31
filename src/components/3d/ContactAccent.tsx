import { SafeCanvas } from '../SafeCanvas';
import { Float, Box, MeshWobbleMaterial } from '@react-three/drei';

export function ContactAccent() {
  return (
    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 pointer-events-none opacity-20 hidden lg:block">
      <SafeCanvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} />
        <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
          <Box args={[1.5, 1.5, 1.5]} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
            <MeshWobbleMaterial color="#2563eb" wireframe factor={0.5} speed={2} />
          </Box>
        </Float>
      </SafeCanvas>
    </div>
  );
}
