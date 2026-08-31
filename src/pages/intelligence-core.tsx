import { useLocation } from 'wouter';
import { ArrowLeft } from 'lucide-react';
import { ClawnAILiveScene } from '../scenes/ClawnAILiveScene';
import { AICommandCenter } from '../components/ui/AICommandCenter';
import { useAIConversation } from '../hooks/useAIConversation';

export default function IntelligenceCorePage() {
  const [, setLocation] = useLocation();
  const aiHook = useAIConversation();

  return (
    <div className="relative w-full h-screen bg-slate-50 overflow-hidden font-sans">
      
      {/* 3D Scene Background */}
      <div className="absolute inset-0 z-0">
        <ClawnAILiveScene status={aiHook.status} />
      </div>

      {/* Navigation Layer */}
      <div className="absolute top-6 left-6 z-30 pointer-events-auto">
        <button 
          onClick={() => setLocation('/')}
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors bg-white/80 backdrop-blur-md shadow-sm px-4 py-2 rounded-full border border-slate-200"
        >
          <ArrowLeft className="w-4 h-4" />
          Exit Command Center
        </button>
      </div>

      {/* Main UI Overlay */}
      <AICommandCenter hook={aiHook} />
      
    </div>
  );
}
