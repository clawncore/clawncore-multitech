import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X } from 'lucide-react';
import { Button } from './button';

export interface ModuleData {
  id: string;
  title: string;
  description: string;
  color: string;
}

interface InfoPanelProps {
  activeModule: ModuleData | null;
  onClose: () => void;
}

export function InfoPanel({ activeModule, onClose }: InfoPanelProps) {
  return (
    <AnimatePresence>
      {activeModule && (
        <motion.div
          initial={{ opacity: 0, x: 50, filter: 'blur(10px)' }}
          animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, x: 50, filter: 'blur(10px)' }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute right-4 top-24 md:right-12 md:top-1/4 w-80 md:w-96 z-30 pointer-events-auto"
        >
          <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white/90 backdrop-blur-xl shadow-md p-6 shadow-2xl">
            {/* Top Accent Line */}
            <div 
              className="absolute top-0 left-0 w-full h-1"
              style={{ backgroundColor: activeModule.color }}
            />
            
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-slate-700 hover:text-slate-900 transition-colors"
            >
              <X size={18} />
            </button>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <span 
                className="text-xs font-bold uppercase tracking-widest mb-2 block"
                style={{ color: activeModule.color }}
              >
                System Module
              </span>
              <h3 className="text-2xl font-bold text-slate-900 mb-4 leading-tight">
                {activeModule.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">
                {activeModule.description}
              </p>

              <Button
                className="w-full bg-slate-100 hover:bg-white/20 text-slate-900 border border-slate-200 rounded-lg transition-all duration-300"
              >
                Explore Architecture
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
