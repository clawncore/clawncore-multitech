import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X, Hexagon } from 'lucide-react';
import { Button } from './button';

export interface TechClusterData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  color: string;
  metrics: { label: string; value: string }[];
}

interface HolographicPanelProps {
  activeCluster: TechClusterData | null;
  onClose: () => void;
}

export function HolographicPanel({ activeCluster, onClose }: HolographicPanelProps) {
  return (
    <AnimatePresence>
      {activeCluster && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, filter: 'blur(20px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, scale: 0.95, filter: 'blur(20px)' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-4 right-4 top-24 md:left-12 md:right-auto md:top-1/4 w-auto md:w-96 z-30 pointer-events-auto"
        >
          {/* Holographic Border Effect */}
          <div 
            className="absolute -inset-[1px] rounded-2xl opacity-50 blur-sm"
            style={{ backgroundColor: activeCluster.color }}
          />
          
          <div className="relative overflow-hidden rounded-2xl border border-slate-300 bg-slate-50/80 backdrop-blur-2xl p-6 shadow-2xl">
            {/* Animated scanning line */}
            <motion.div
              animate={{ top: ['-10%', '110%'] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
              className="absolute left-0 w-full h-8 pointer-events-none opacity-20"
              style={{
                background: `linear-gradient(to bottom, transparent, ${activeCluster.color}, transparent)`
              }}
            />

            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-slate-700 hover:text-slate-900 transition-colors"
            >
              <X size={18} />
            </button>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="flex items-center space-x-2 mb-3">
                <Hexagon size={16} style={{ color: activeCluster.color }} />
                <span 
                  className="text-xs font-mono uppercase tracking-widest"
                  style={{ color: activeCluster.color }}
                >
                  {activeCluster.subtitle}
                </span>
              </div>
              
              <h3 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">
                {activeCluster.title}
              </h3>
              
              <p className="text-slate-500 text-sm leading-relaxed mb-6 font-light">
                {activeCluster.description}
              </p>

              {/* Holographic Metrics */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {activeCluster.metrics.map((metric, i) => (
                  <div key={i} className="border-l-2 pl-3" style={{ borderColor: `${activeCluster.color}40` }}>
                    <div className="text-slate-900 text-lg font-mono font-medium">{metric.value}</div>
                    <div className="text-slate-400 text-xs uppercase tracking-wider">{metric.label}</div>
                  </div>
                ))}
              </div>

              <Button
                className="w-full bg-slate-50 hover:bg-slate-100 text-slate-900 border border-slate-300 rounded-lg transition-all duration-300 backdrop-blur-md"
              >
                Access System Architecture
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
