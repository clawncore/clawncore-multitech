import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X, Milestone, Zap } from 'lucide-react';
import { Button } from './button';

export interface RoadmapNodeData {
  id: string;
  phase: string;
  title: string;
  description: string;
  year: string;
  color: string;
  initiatives: string[];
}

interface RoadmapCardProps {
  activeNode: RoadmapNodeData | null;
  onClose: () => void;
}

export function RoadmapCard({ activeNode, onClose }: RoadmapCardProps) {
  return (
    <AnimatePresence>
      {activeNode && (
        <motion.div
          initial={{ opacity: 0, y: 40, filter: 'blur(20px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: 40, filter: 'blur(20px)' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-20 left-1/2 -translate-x-1/2 w-[90vw] max-w-2xl z-30 pointer-events-auto"
        >
          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
            {/* Top accent bar */}
            <div
              className="absolute top-0 left-0 w-full h-[2px]"
              style={{ background: `linear-gradient(to right, transparent, ${activeNode.color}, transparent)` }}
            />

            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-slate-700 hover:text-slate-900 transition-colors"
            >
              <X size={18} />
            </button>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.5 }}
            >
              {/* Phase label */}
              <div className="flex items-center gap-2 mb-4">
                <Milestone size={14} style={{ color: activeNode.color }} />
                <span
                  className="text-xs font-mono tracking-[0.25em] uppercase font-medium"
                  style={{ color: activeNode.color }}
                >
                  {activeNode.phase} · {activeNode.year}
                </span>
              </div>

              <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight leading-tight">
                {activeNode.title}
              </h3>

              <p className="text-slate-500 text-sm leading-relaxed mb-6 font-light max-w-lg">
                {activeNode.description}
              </p>

              {/* Initiative Pills */}
              <div className="flex flex-wrap gap-2 mb-8">
                {activeNode.initiatives.map((item, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-mono tracking-wide"
                    style={{ borderColor: `${activeNode.color}40`, color: activeNode.color, backgroundColor: `${activeNode.color}10` }}
                  >
                    <Zap size={10} />
                    {item}
                  </span>
                ))}
              </div>

              <Button className="bg-slate-50 hover:bg-slate-100 text-slate-900 border border-slate-200 rounded-xl transition-all duration-300 h-12 px-6 tracking-wide">
                Explore Initiative
                <ArrowRight className="ml-2 h-4 w-4 opacity-60" />
              </Button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
