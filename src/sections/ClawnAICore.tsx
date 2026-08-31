import { useState } from 'react';
import { motion } from 'framer-motion';
import { IntelligencePanel, AIModuleData } from '../components/ui/IntelligencePanel';
import { ClawnAIScene } from '../scenes/ClawnAIScene';


export const AI_MODULES: Record<string, AIModuleData> = {
  autonomous: {
    id: 'autonomous',
    title: 'Autonomous Intelligence',
    description: 'Self-governing decision architecture capable of real-time ecosystem adjustments without human intervention.',
    status: 'OPTIMAL',
    confidence: 99.4
  },
  predictive: {
    id: 'predictive',
    title: 'Predictive Analytics',
    description: 'Deep neural networks analyzing historical multi-sector data to forecast trends and preemptive system requirements.',
    status: 'SYNCHRONIZING',
    confidence: 94.8
  },
  security: {
    id: 'security',
    title: 'AI Security Overwatch',
    description: 'Quantum-resistant behavioral monitoring that neutralizes anomalous patterns before they permeate the network.',
    status: 'ACTIVE SCAN',
    confidence: 99.9
  },
  learning: {
    id: 'learning',
    title: 'Adaptive Learning',
    description: 'Continuous ingestion of environmental telemetry, allowing the core to evolve its logic models dynamically.',
    status: 'INGESTING',
    confidence: 96.2
  }
};

export function ClawnAICore() {
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
  const activeModule = activeModuleId ? AI_MODULES[activeModuleId] : null;

  return (
    <section id="clawnai-core" className="relative w-full h-[150vh] bg-white overflow-hidden">
      
      {/* 3D Scene Layer */}
      <div className="sticky top-0 w-full h-screen z-0">
        <ClawnAIScene 
          activeModuleId={activeModuleId} 
          onModuleSelect={(id) => setActiveModuleId(id)} 
        />
      </div>

      {/* UI Overlay Layer */}
      <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="container mx-auto px-4 sm:px-6 pt-20 sm:pt-24 md:pt-32 flex justify-center text-center"
        >
          <div className="max-w-3xl">
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-bold tracking-tighter mb-4 sm:mb-6 text-slate-900">
              Clawn<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">AI</span>
            </h2>
            <p className="text-base sm:text-xl text-slate-500 font-light leading-relaxed max-w-2xl mx-auto">
              The singular consciousness orchestrating the multitech ecosystem.
              Adaptive, predictive, and inherently intelligent.
            </p>
            <p className="text-sm sm:text-base text-slate-400 font-light leading-relaxed max-w-2xl mx-auto mt-3 sm:mt-4">
              From guiding precision irrigation in smart agriculture to securing critical infrastructure,
              ClawnAI is shaping the future by unifying every solution into an autonomously learning
              intelligence that evolves with every sector it serves.
            </p>
            <div className="flex items-center justify-center gap-3 sm:gap-5 mt-5 sm:mt-8">
              <div className="group relative w-14 h-14 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl overflow-hidden border border-green-500/30 shadow-lg">
                <img src="/drone hero.png" alt="Smart Agriculture" loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <span className="absolute bottom-1 sm:bottom-2 left-1 sm:left-2 text-[7px] sm:text-[9px] font-mono uppercase tracking-widest text-white/90">Agriculture</span>
              </div>
              <div className="group relative w-14 h-14 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl overflow-hidden border border-blue-500/30 shadow-lg">
                <img src="/optic hand naturing .png" alt="AI Security" loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <span className="absolute bottom-1 sm:bottom-2 left-1 sm:left-2 text-[7px] sm:text-[9px] font-mono uppercase tracking-widest text-white/90">Security</span>
              </div>
              <div className="group relative w-14 h-14 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl overflow-hidden border border-purple-500/30 shadow-lg">
                <img src="/hero-bg.png" alt="Cloud Infrastructure" loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <span className="absolute bottom-1 sm:bottom-2 left-1 sm:left-2 text-[7px] sm:text-[9px] font-mono uppercase tracking-widest text-white/90">Cloud</span>
              </div>
              <div className="group relative w-14 h-14 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl overflow-hidden border border-amber-500/30 shadow-lg">
                <img src="/african_farmer.png" alt="Data Analytics" loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <span className="absolute bottom-1 sm:bottom-2 left-1 sm:left-2 text-[7px] sm:text-[9px] font-mono uppercase tracking-widest text-white/90">Analytics</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Intelligence Panel Component */}
        <IntelligencePanel 
          activeModule={activeModule} 
          onClose={() => setActiveModuleId(null)} 
        />

        {/* Scroll/Interaction Hint */}
        <div className="pb-16 flex flex-col items-center justify-center pointer-events-auto">
          <motion.div 
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="text-blue-600/60 text-xs tracking-[0.3em] uppercase font-mono"
          >
            Access Neural Nodes
          </motion.div>
        </div>
      </div>
      
    </section>
  );
}
