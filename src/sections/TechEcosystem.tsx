import { useState } from 'react';
import { motion } from 'framer-motion';
import { HolographicPanel, TechClusterData } from '../components/ui/HolographicPanel';
import { EcosystemScene } from '../scenes/EcosystemScene';

export const TECH_CLUSTERS: Record<string, TechClusterData> = {
  ai: {
    id: 'ai',
    title: 'Neural Core',
    subtitle: 'SYS.ORCHESTRATION',
    description: 'Centralized artificial intelligence orchestration. Processes global telemetry streams to dynamically optimize ecosystem performance.',
    color: '#60a5fa', // Blue
    metrics: [{ label: 'Operations', value: '142.5T/s' }, { label: 'Latency', value: '0.4ms' }]
  },
  cybersecurity: {
    id: 'cybersecurity',
    title: 'Quantum Shield',
    subtitle: 'SYS.SECURITY',
    description: 'Impenetrable multi-layer cryptographic defenses. Constantly analyzing threat vectors across the entire interconnected grid.',
    color: '#2563eb', // Blue (was purple)
    metrics: [{ label: 'Threats Blocked', value: '99.9%' }, { label: 'Encryption', value: 'AES-Q256' }]
  },
  cloud: {
    id: 'cloud',
    title: 'Distributed Nexus',
    subtitle: 'SYS.INFRASTRUCTURE',
    description: 'High-availability global server network ensuring seamless data synchronization and zero-downtime execution environments.',
    color: '#22d3ee', // Cyan
    metrics: [{ label: 'Uptime', value: '99.999%' }, { label: 'Active Nodes', value: '14,204' }]
  },
  analytics: {
    id: 'analytics',
    title: 'Data Stream',
    subtitle: 'SYS.TELEMETRY',
    description: 'Real-time ingestion and processing of massive datasets. Turning raw ecosystem variables into actionable intelligence.',
    color: '#fbbf24', // Amber
    metrics: [{ label: 'Processing', value: '840 TB/d' }, { label: 'Predictive Acc', value: '94.2%' }]
  },
  agriculture: {
    id: 'agriculture',
    title: 'Agri-Grid',
    subtitle: 'SYS.TERRAIN',
    description: 'Precision environmental mapping and crop health monitoring via synchronized drone fleets and terrestrial sensors.',
    color: '#34d399', // Emerald
    metrics: [{ label: 'Area Scanned', value: '1.2M Ha' }, { label: 'Yield Opt.', value: '+24%' }]
  }
};

export function TechEcosystem() {
  const [activeClusterId, setActiveClusterId] = useState<string | null>(null);
  const activeCluster = activeClusterId ? TECH_CLUSTERS[activeClusterId] : null;

  return (
    <section id="technology-ecosystem" className="relative w-full h-[150vh] bg-slate-50 overflow-hidden">
      
      {/* 3D Scene Layer */}
      <div className="sticky top-0 w-full h-screen z-0">
        {/* We delay mounting the heavy scene slightly or rely on Suspense inside the Scene */}
        <EcosystemScene 
          activeClusterId={activeClusterId} 
          onClusterSelect={(id) => setActiveClusterId(id)} 
        />
      </div>

      {/* UI Overlay Layer */}
      <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="container mx-auto px-6 pt-24 md:pt-32 flex justify-end text-right"
        >
          <div className="max-w-2xl bg-white/90 backdrop-blur-lg p-6 rounded-3xl border border-slate-200 shadow-md">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
              The Living Network
            </h2>
            <p className="text-lg text-slate-500 font-light leading-relaxed">
              Beyond individual devices lies the true power of ClawnCore: a massive, 
              interconnected technology ecosystem. Everything synchronizes.
            </p>
          </div>
        </motion.div>

        {/* Info Panel Component */}
        <HolographicPanel 
          activeCluster={activeCluster} 
          onClose={() => setActiveClusterId(null)} 
        />

        {/* Scroll Hint */}
        <div className="pb-12 text-center text-slate-400 text-xs tracking-widest uppercase font-mono">
          System Overview // Scroll to Traverse
        </div>
      </div>
      
    </section>
  );
}
