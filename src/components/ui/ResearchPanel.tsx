import { PROTOTYPES, PrototypeId } from "../../services/prototypes";
import { BrainCircuit, ShieldAlert, Cpu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  activePrototype: PrototypeId;
  isSimulating: boolean;
}

export function ResearchPanel({ activePrototype, isSimulating }: Props) {
  const data = PROTOTYPES[activePrototype];

  return (
    <div className="bg-white/90 backdrop-blur-xl border border-slate-200 shadow-xl rounded-2xl p-6 w-[360px] pointer-events-auto relative overflow-hidden">
      
      {/* Simulation active background pulse */}
      <AnimatePresence>
        {isSimulating && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.1, 0.3, 0.1] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 bg-sky-500 pointer-events-none"
          />
        )}
      </AnimatePresence>

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-6">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-sky-600 uppercase bg-sky-50 px-2 py-1 rounded">
              {data.category}
            </span>
            <h2 className="text-xl font-bold text-slate-900 mt-2">{data.title}</h2>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
            {activePrototype === 'neural' && <BrainCircuit className="w-6 h-6 text-indigo-500" />}
            {activePrototype === 'swarm' && <Cpu className="w-6 h-6 text-sky-500" />}
            {activePrototype === 'quantum' && <ShieldAlert className="w-6 h-6 text-emerald-500" />}
          </div>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed mb-6">
          {data.description}
        </p>

        <div className="grid grid-cols-2 gap-3 mb-6">
          {data.metrics.map((metric, idx) => (
            <div key={idx} className="bg-slate-50 border border-slate-100 p-3 rounded-xl">
              <p className="text-slate-500 text-[9px] font-mono uppercase tracking-widest mb-1">{metric.label}</p>
              <p className="text-sm font-semibold text-slate-900">{metric.value}</p>
            </div>
          ))}
        </div>

        <div className={`p-4 rounded-xl border transition-colors duration-500 ${isSimulating ? 'bg-sky-50 border-sky-200' : 'bg-slate-50 border-slate-200'}`}>
          <div className="flex items-center gap-2 mb-2">
            <div className={`w-2 h-2 rounded-full ${isSimulating ? 'bg-sky-500 animate-pulse' : 'bg-slate-300'}`} />
            <span className={`text-[10px] font-mono tracking-widest uppercase ${isSimulating ? 'text-sky-700' : 'text-slate-500'}`}>
              {isSimulating ? data.status : 'SYSTEM IDLE'}
            </span>
          </div>
          <p className="text-xs text-slate-600 font-mono leading-relaxed">
            {isSimulating ? data.simulationDetails : 'Awaiting input to begin stress test simulation sequence.'}
          </p>
        </div>
      </div>
    </div>
  );
}
