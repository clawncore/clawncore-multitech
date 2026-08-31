import { motion, AnimatePresence } from 'framer-motion';
import { X, Quote } from 'lucide-react';

export interface PhilosophyData {
  id: string;
  pillar: string;
  title: string;
  statement: string;
  detail: string;
  color: string;
}

interface PhilosophyCardProps {
  active: PhilosophyData | null;
  onClose: () => void;
}

export function PhilosophyCard({ active, onClose }: PhilosophyCardProps) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key={active.id}
          initial={{ opacity: 0, scale: 0.94, filter: 'blur(16px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, scale: 0.94, filter: 'blur(16px)' }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-24 left-1/2 -translate-x-1/2 w-[90vw] max-w-xl z-30 pointer-events-auto"
        >
          {/* Ambient glow */}
          <div className="absolute -inset-4 rounded-3xl blur-3xl opacity-15"
               style={{ backgroundColor: active.color }} />

          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white backdrop-blur-3xl p-8">
            {/* Top gradient accent */}
            <div className="absolute top-0 left-0 w-full h-[2px]"
                 style={{ background: `linear-gradient(to right, transparent, ${active.color}, transparent)` }} />

            <button onClick={onClose}
                    className="absolute top-5 right-5 text-slate-700 hover:text-slate-900 transition-colors">
              <X size={18} />
            </button>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {/* Pillar badge */}
              <span className="inline-block text-xs font-mono tracking-[0.3em] uppercase mb-5 px-3 py-1 rounded-full border"
                    style={{ color: active.color, borderColor: `${active.color}30`, backgroundColor: `${active.color}10` }}>
                {active.pillar}
              </span>

              {/* Quote icon + title */}
              <div className="flex items-start gap-3 mb-4">
                <Quote size={20} className="mt-1 shrink-0 opacity-30" style={{ color: active.color }} />
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight leading-tight">
                  {active.title}
                </h3>
              </div>

              {/* Main statement */}
              <p className="text-slate-700 text-lg font-light italic leading-relaxed mb-5 pl-8 border-l-2"
                 style={{ borderColor: `${active.color}40` }}>
                {active.statement}
              </p>

              {/* Supporting detail */}
              <p className="text-slate-500 text-sm font-light leading-relaxed pl-8">
                {active.detail}
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
