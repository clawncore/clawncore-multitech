import { SafeCanvas } from '../SafeCanvas';
import { Stars } from '@react-three/drei';

export function MinimalBackground() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none opacity-30">
      <SafeCanvas camera={{ position: [0, 0, 1] }}>
        <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={0.5} />
      </SafeCanvas>
    </div>
  );
}
