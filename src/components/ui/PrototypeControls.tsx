import { Button } from "@/components/ui/button";
import { PrototypeId } from "../../services/prototypes";
import { Play, Square, BrainCircuit, Cpu, ShieldAlert } from "lucide-react";

interface Props {
  activePrototype: PrototypeId;
  setActivePrototype: (id: PrototypeId) => void;
  isSimulating: boolean;
  setIsSimulating: (v: boolean) => void;
}

export function PrototypeControls({
  activePrototype, setActivePrototype,
  isSimulating, setIsSimulating
}: Props) {
  
  const handleSelect = (id: PrototypeId) => {
    setIsSimulating(false);
    setActivePrototype(id);
  };

  return (
    <div className="bg-white/90 backdrop-blur-xl border border-slate-200 shadow-xl rounded-2xl p-4 flex flex-col gap-3 w-[260px] pointer-events-auto">
      <h3 className="text-slate-900 text-xs font-semibold uppercase tracking-widest px-2 mb-2">Experimental Systems</h3>
      
      <Button 
        variant={activePrototype === 'neural' ? "default" : "outline"}
        className={`justify-start ${activePrototype === 'neural' ? 'bg-indigo-600 hover:bg-indigo-700' : 'text-slate-600 border-slate-200 hover:bg-slate-50'}`}
        onClick={() => handleSelect('neural')}
      >
        <BrainCircuit className="w-4 h-4 mr-3" />
        Neural Mesh
      </Button>

      <Button 
        variant={activePrototype === 'swarm' ? "default" : "outline"}
        className={`justify-start ${activePrototype === 'swarm' ? 'bg-sky-600 hover:bg-sky-700' : 'text-slate-600 border-slate-200 hover:bg-slate-50'}`}
        onClick={() => handleSelect('swarm')}
      >
        <Cpu className="w-4 h-4 mr-3" />
        Micro-Drone Swarm
      </Button>

      <Button 
        variant={activePrototype === 'quantum' ? "default" : "outline"}
        className={`justify-start ${activePrototype === 'quantum' ? 'bg-emerald-600 hover:bg-emerald-700' : 'text-slate-600 border-slate-200 hover:bg-slate-50'}`}
        onClick={() => handleSelect('quantum')}
      >
        <ShieldAlert className="w-4 h-4 mr-3" />
        Quantum Shield
      </Button>

      <div className="h-px bg-slate-100 my-2" />

      <Button 
        className={`w-full ${isSimulating ? 'bg-red-500 hover:bg-red-600' : 'bg-slate-900 hover:bg-slate-800'} text-white shadow-md transition-colors`}
        onClick={() => setIsSimulating(!isSimulating)}
      >
        {isSimulating ? (
          <>
            <Square className="w-4 h-4 mr-2 fill-current" />
            Halt Simulation
          </>
        ) : (
          <>
            <Play className="w-4 h-4 mr-2 fill-current" />
            Run Simulation Sweep
          </>
        )}
      </Button>
    </div>
  );
}
