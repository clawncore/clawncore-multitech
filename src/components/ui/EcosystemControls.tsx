import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Network, Cloud, Shield, Leaf, Info } from 'lucide-react';
import { EcosystemLayer, IntelligenceNode } from '../../services/telemetry';

interface EcosystemControlsProps {
  activeLayers: EcosystemLayer[];
  toggleLayer: (layer: EcosystemLayer) => void;
  hoveredNode: IntelligenceNode | null;
}

const LAYER_CONFIG = [
  { id: 'ai' as EcosystemLayer, label: 'AI Infrastructure', icon: Brain, color: '#60a5fa' },
  { id: 'cloud' as EcosystemLayer, label: 'Cloud Nexus', icon: Cloud, color: '#2dd4bf' },
  { id: 'cyber' as EcosystemLayer, label: 'Cybersecurity Mesh', icon: Shield, color: '#60a5fa' },
  { id: 'drone' as EcosystemLayer, label: 'Drone Operations', icon: Network, color: '#f472b6' },
  { id: 'agri' as EcosystemLayer, label: 'Smart Agriculture', icon: Leaf, color: '#4ade80' },
];

export function EcosystemControls({ activeLayers, toggleLayer, hoveredNode }: EcosystemControlsProps) {
  return (
    <div className="absolute inset-0 pointer-events-none z-10 p-6 md:p-10 flex flex-col justify-between">
      
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="pointer-events-auto">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight mb-1">Global Intelligence Map</h1>
        <p className="text-xs font-mono text-slate-500 uppercase tracking-widest flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          Planetary Orchestration
        </p>
      </motion.div>

      {/* Main Content Area */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 flex-1 mb-8">
        
        {/* Layer Controls (Left) */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }} 
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col gap-3 pointer-events-auto w-full md:w-auto"
        >
          {LAYER_CONFIG.map((layer) => {
            const isActive = activeLayers.includes(layer.id);
            return (
              <button
                key={layer.id}
                onClick={() => toggleLayer(layer.id)}
                className={`flex items-center gap-3 px-5 py-3 rounded-xl border backdrop-blur-xl transition-all ${
                  isActive 
                    ? 'bg-black/60 border-slate-300' 
                    : 'bg-white/80 border-slate-100 opacity-50 hover:opacity-100'
                }`}
              >
                <layer.icon className="w-4 h-4" style={{ color: isActive ? layer.color : '#71717a' }} />
                <span className={`text-sm font-medium ${isActive ? 'text-slate-900' : 'text-slate-500'}`}>
                  {layer.label}
                </span>
                {isActive && (
                  <div className="ml-auto w-2 h-2 rounded-full shadow-[0_0_10px_currentColor]" style={{ backgroundColor: layer.color, color: layer.color }} />
                )}
              </button>
            );
          })}
        </motion.div>

        {/* Region Info Panel (Right) */}
        <div className="w-full md:w-[320px] pointer-events-none">
          <AnimatePresence mode="wait">
            {hoveredNode ? (
              <motion.div
                key={hoveredNode.id}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-white backdrop-blur-2xl shadow-lg border border-slate-200 rounded-2xl p-6 pointer-events-auto"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: hoveredNode.color }} />
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">
                    {hoveredNode.layer.toUpperCase()} NODE
                  </span>
                </div>
                
                <h3 className="text-lg font-bold text-slate-900 mb-2 leading-tight">
                  {hoveredNode.name}
                </h3>
                
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div>
                    <div className="text-[10px] font-mono text-slate-400 mb-1">LATITUDE</div>
                    <div className="text-sm text-slate-600">{hoveredNode.lat.toFixed(4)}</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-slate-400 mb-1">LONGITUDE</div>
                    <div className="text-sm text-slate-600">{hoveredNode.lon.toFixed(4)}</div>
                  </div>
                  <div className="col-span-2 mt-2">
                    <div className="text-[10px] font-mono text-slate-400 mb-1">SYSTEM STATUS</div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: hoveredNode.status === 'active' ? '#4ade80' : '#fbbf24' }} />
                      <span className="text-sm capitalize text-slate-900">{hoveredNode.status}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-3 text-slate-400 text-sm font-light justify-end"
              >
                <Info className="w-4 h-4" />
                <span>Hover over active nodes for telemetry</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
      </div>
    </div>
  );
}
