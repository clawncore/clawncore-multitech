import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X, BrainCircuit, Activity } from 'lucide-react';
import { Button } from './button';

export interface AIModuleData {
  id: string;
  title: string;
  description: string;
  status: string;
  confidence: number;
}

interface IntelligencePanelProps {
  activeModule: AIModuleData | null;
  onClose: () => void;
}

export function IntelligencePanel({ activeModule, onClose }: IntelligencePanelProps) {
  return (
    <AnimatePresence>
      {activeModule && (
        <motion.div
          initial={{ opacity: 0, x: -50, filter: 'blur(20px)' }}
          animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, x: -50, filter: 'blur(20px)' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-4 right-4 top-24 md:left-12 md:right-auto md:top-1/3 w-auto md:w-96 z-30 pointer-events-auto"
        >
          {/* Outer glow aura */}
          <div className="absolute -inset-2 rounded-3xl bg-blue-500/20 blur-xl opacity-50" />
          
          <div className="relative overflow-hidden rounded-3xl border border-blue-200 bg-white backdrop-blur-3xl p-8 shadow-lg shadow-blue-100">
            
            {/* Background Neural Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.03]" 
                 style={{ backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)', backgroundSize: '16px 16px' }} />

            <button 
              onClick={onClose}
              className="absolute top-6 right-6 text-blue-200/50 hover:text-blue-200 transition-colors z-10"
            >
              <X size={20} />
            </button>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="relative z-10"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <BrainCircuit size={20} className="text-blue-400" />
                </div>
                <span className="text-xs font-mono font-medium text-blue-400/80 tracking-widest uppercase">
                  Active Intelligence
                </span>
              </div>
              
              <h3 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight leading-tight">
                {activeModule.title}
              </h3>
              
              <p className="text-blue-100/60 text-sm leading-relaxed mb-8 font-light">
                {activeModule.description}
              </p>

              {/* Live Status Indicators */}
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center border-b border-blue-500/10 pb-3">
                  <div className="flex items-center text-xs font-mono text-blue-200/50">
                    <Activity size={14} className="mr-2 text-green-400" />
                    SYSTEM STATUS
                  </div>
                  <div className="text-sm font-medium text-slate-900">{activeModule.status}</div>
                </div>
                
                <div className="flex justify-between items-center border-b border-blue-500/10 pb-3">
                  <div className="text-xs font-mono text-blue-200/50">
                    PREDICTIVE CONFIDENCE
                  </div>
                  <div className="flex items-center">
                    <div className="text-sm font-medium text-slate-900 mr-3">{activeModule.confidence}%</div>
                    {/* Tiny progress bar */}
                    <div className="w-16 h-1 bg-blue-900/30 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${activeModule.confidence}%` }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="h-full bg-blue-400"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <Button
                className="w-full bg-blue-600/20 hover:bg-blue-500/30 text-blue-50 border border-blue-500/30 h-12 rounded-xl transition-all duration-300 font-medium tracking-wide shadow-[0_0_20px_rgba(59,130,246,0.1)] hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]"
              >
                Access Neural Interface
                <ArrowRight className="ml-2 h-4 w-4 opacity-70" />
              </Button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
