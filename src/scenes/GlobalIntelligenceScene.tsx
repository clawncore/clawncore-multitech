import { Suspense } from 'react';
import { SafeCanvas } from '../components/SafeCanvas';
import { OrbitControls, Stars, Environment } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { EarthGlobe } from '../components/3d/EarthGlobe';
import { IntelligenceNodes } from '../components/3d/IntelligenceNodes';
import { AnalyticsStreams } from '../components/3d/AnalyticsStreams';

import { EcosystemLayer } from '../services/telemetry';

interface GlobalIntelligenceSceneProps {
  activeLayers: EcosystemLayer[];
  onNodeHover: (node: any) => void;
}
export function GlobalIntelligenceScene({ activeLayers, onNodeHover }: GlobalIntelligenceSceneProps) {
  return (
    <SafeCanvas dpr={[1, 2]} gl={{ antialias: true, alpha: true }} camera={{ position: [0, 5, 25], fov: 45 }}>
      
      {/* Orbital controls for user exploration */}
      <OrbitControls 
        enablePan={false}
        minDistance={12}
        maxDistance={40}
        autoRotate={false} // We handle rotation manually on the group to sync nodes
        enableDamping
        dampingFactor={0.05}
      />
      <color attach="background" args={['#f8fafc']} />
      <fog attach="fog" args={['#f8fafc', 40, 60]} />
      <Stars radius={100} depth={50} count={0} factor={4} saturation={0} fade speed={0.5} />
      {/* Cinematic Space Lighting */}
      <ambientLight intensity={0.1} color="#ffffff" />
      <directionalLight position={[20, 10, 10]} intensity={2.5} color="#e0f2fe" />
      <pointLight position={[-20, 0, -20]} intensity={1} color="#38bdf8" distance={50} />
      <Suspense fallback={null}>
        <EarthGlobe />
        <IntelligenceNodes activeLayers={activeLayers} onNodeHover={onNodeHover} />
        <AnalyticsStreams activeLayers={activeLayers} />
        <Environment preset="night" />
      </Suspense>
      <EffectComposer enableNormalPass multisampling={4}>
        <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} intensity={2.5} mipmapBlur />
      </EffectComposer>
    </SafeCanvas>
  );
}
