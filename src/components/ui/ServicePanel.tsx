import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X, Shield, Cpu, Cloud, BarChart3, Leaf, Plane, CheckCircle2 } from 'lucide-react';
import { Button } from './button';

export interface ServiceData {
  id: string;
  icon: 'shield' | 'compute' | 'cloud' | 'chart' | 'leaf' | 'plane';
  label: string;
  title: string;
  description: string;
  color: string;
  features: string[];
  status: string;
}

const ICON_MAP = {
  shield: Shield, compute: Cpu, cloud: Cloud,
  chart: BarChart3, leaf: Leaf, plane: Plane,
};

interface ServicePanelProps {
  activeService: ServiceData | null;
  onClose: () => void;
}

export function ServicePanel({ activeService, onClose }: ServicePanelProps) {
  return (
    <AnimatePresence>
      {activeService && (
        <motion.div
          key={activeService.id}
          initial={{ opacity: 0, x: 60, filter: 'blur(16px)' }}
          animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, x: 60, filter: 'blur(16px)' }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="absolute right-4 top-1/2 -translate-y-1/2 md:right-10 w-[88vw] max-w-sm z-30 pointer-events-auto"
        >
          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg">
            {/* Top accent */}
            <div className="absolute top-0 left-0 w-full h-[2px]"
                 style={{ background: `linear-gradient(to right, transparent, ${activeService.color}, transparent)` }} />

            {/* Subtle animated scan line */}
            <motion.div
              animate={{ top: ['-10%', '110%'] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'linear', repeatDelay: 1 }}
              className="absolute left-0 w-full h-10 pointer-events-none"
              style={{ background: `linear-gradient(to bottom, transparent, ${activeService.color}15, transparent)` }}
            />

            <div className="relative p-7">
              <button onClick={onClose}
                      className="absolute top-5 right-5 text-slate-700 hover:text-slate-900 transition-colors">
                <X size={18} />
              </button>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.55 }}
              >
                {/* Icon + label */}
                <div className="flex items-center gap-3 mb-5">
                  {(() => {
                    const Icon = ICON_MAP[activeService.icon];
                    return (
                      <div className="p-2 rounded-xl border"
                           style={{ borderColor: `${activeService.color}30`, backgroundColor: `${activeService.color}10` }}>
                        <Icon size={18} style={{ color: activeService.color }} />
                      </div>
                    );
                  })()}
                  <span className="text-xs font-mono tracking-[0.25em] uppercase"
                        style={{ color: activeService.color }}>
                    {activeService.label}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight leading-tight">
                  {activeService.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6 font-light">
                  {activeService.description}
                </p>

                {/* Feature list */}
                <ul className="space-y-2 mb-7">
                  {activeService.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-slate-600">
                      <CheckCircle2 size={12} style={{ color: activeService.color }} className="shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* Status badge */}
                <div className="flex items-center justify-between mb-5">
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">System Status</span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full"
                        style={{ color: activeService.color, backgroundColor: `${activeService.color}15`, border: `1px solid ${activeService.color}30` }}>
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse"
                          style={{ backgroundColor: activeService.color }} />
                    {activeService.status}
                  </span>
                </div>

                <Button className="w-full h-11 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-900 transition-all duration-300 tracking-wide">
                  Access Service Architecture
                  <ArrowRight className="ml-2 h-4 w-4 opacity-60" />
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
