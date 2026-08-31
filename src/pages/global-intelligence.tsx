import { useState } from 'react';
import { useLocation } from 'wouter';
import { ArrowLeft } from 'lucide-react';
import { GlobalIntelligenceScene } from '../scenes/GlobalIntelligenceScene';
import { EcosystemControls } from '../components/ui/EcosystemControls';
import { EcosystemLayer, IntelligenceNode } from '../services/telemetry';

export default function GlobalIntelligencePage() {
  const [, setLocation] = useLocation();
  
  // All layers visible by default
  const [activeLayers, setActiveLayers] = useState<EcosystemLayer[]>(['ai', 'cloud', 'cyber', 'drone', 'agri']);
  const [hoveredNode, setHoveredNode] = useState<IntelligenceNode | null>(null);

  const toggleLayer = (layer: EcosystemLayer) => {
    setActiveLayers(prev => 
      prev.includes(layer) 
        ? prev.filter(l => l !== layer)
        : [...prev, layer]
    );
  };

  return (
    <div className="relative w-full h-screen bg-slate-50 overflow-hidden font-sans">
      
      {/* 3D Scene Background */}
      <div className="absolute inset-0 z-0">
        <GlobalIntelligenceScene 
          activeLayers={activeLayers} 
          onNodeHover={setHoveredNode} 
        />
      </div>

      {/* Navigation Layer */}
      <div className="absolute top-6 left-6 z-30 pointer-events-auto">
        <button 
          onClick={() => setLocation('/')}
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors bg-white/90 backdrop-blur-md px-4 py-2 rounded-full border border-slate-200"
        >
          <ArrowLeft className="w-4 h-4" />
          Exit Global View
        </button>
      </div>

      {/* Main UI Overlay */}
      <EcosystemControls 
        activeLayers={activeLayers}
        toggleLayer={toggleLayer}
        hoveredNode={hoveredNode}
      />
      
    </div>
  );
}
