import { useState } from 'react';
import { motion } from 'framer-motion';
import { PhilosophyCard, PhilosophyData } from '../components/ui/PhilosophyCard';
import { FounderScene } from '../scenes/FounderScene';

export const PHILOSOPHY_NODES: Record<string, PhilosophyData> = {
  purpose: {
    id: 'purpose',
    pillar: 'CORE PRINCIPLE',
    color: '#60a5fa',
    title: 'Technology With Purpose',
    statement: '"Every system we build must ultimately serve a human need — or it should not exist."',
    detail: 'ClawnCore was founded on the belief that advanced technology has no value unless it solves real problems at meaningful scale. Every product decision starts and ends with impact.',
  },
  intelligence: {
    id: 'intelligence',
    pillar: 'DESIGN PHILOSOPHY',
    color: '#2563eb',
    title: 'Intelligence by Design',
    statement: '"The future belongs to systems that learn, adapt, and operate without being told what to do next."',
    detail: 'Autonomy is not a feature — it is the foundation. Our systems are architected from day one to function intelligently, reducing human overhead while increasing precision and reliability.',
  },
  scale: {
    id: 'scale',
    pillar: 'GROWTH THINKING',
    color: '#34d399',
    title: 'Build for Civilization Scale',
    statement: '"If your infrastructure cannot serve a billion people, it is not infrastructure — it is a prototype."',
    detail: 'We do not build for today\'s market. ClawnCore\'s architecture is designed to scale to civilizational requirements — across nations, sectors, and generations.',
  },
  humanity: {
    id: 'humanity',
    pillar: 'LONG-TERM VISION',
    color: '#fbbf24',
    title: 'Human + Machine Alignment',
    statement: '"The measure of great technology is how effortlessly it makes human lives more capable."',
    detail: 'We reject the notion of technology replacing humanity. ClawnCore exists to augment human intelligence — making individuals, organizations, and governments more capable than they could ever be alone.',
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.12, duration: 1.1, ease: [0.16, 1, 0.3, 1] },
  }),
};

export function FounderExperience() {
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);
  const activeNode = activeNodeId ? PHILOSOPHY_NODES[activeNodeId] : null;

  return (
    <section id="founder-experience" className="relative w-full h-[150vh] bg-slate-50 overflow-hidden">

      {/* 3D Scene */}
      <div className="sticky top-0 w-full h-screen z-0">
        <FounderScene
          activeNodeId={activeNodeId}
          onNodeSelect={(id) => setActiveNodeId(id)}
        />
      </div>

      {/* UI Overlay */}
      <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between">

        {/* Founder Identity Block — top left */}
        <div className="container mx-auto px-6 pt-24 md:pt-28 flex items-start gap-10 flex-wrap">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="max-w-lg"
          >
            <motion.p custom={0} variants={fadeUp}
              className="text-xs font-mono tracking-[0.35em] text-blue-300/60 uppercase mb-4">
              Leadership · ClawnCore Multitech
            </motion.p>

            <motion.h2 custom={1} variants={fadeUp}
              className="text-5xl md:text-6xl font-bold tracking-tighter text-slate-900 mb-5 leading-none"
              style={{ textShadow: '0 0 50px rgba(96,165,250,0.12)' }}>
              Guided by<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600">
                Visionary Intent.
              </span>
            </motion.h2>

            <motion.p custom={2} variants={fadeUp}
              className="text-base text-slate-500 font-light leading-relaxed max-w-md">
              The technology is only as powerful as the vision directing it.
              ClawnCore is built on four core leadership philosophies — click any node to explore the thinking behind the ecosystem.
            </motion.p>
          </motion.div>

          {/* Founder identity card — top right */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="ml-auto bg-black/20 backdrop-blur-xl border border-white/8 rounded-2xl p-6 min-w-[220px]"
          >
            {/* Avatar placeholder with cinematic ring */}
            <div className="relative w-16 h-16 mb-4 mx-auto">
              <div className="absolute inset-0 rounded-full border-2 border-blue-400/40 animate-spin"
                   style={{ animationDuration: '8s' }} />
              <div className="absolute inset-1 rounded-full bg-gradient-to-br from-blue-500/30 to-cyan-500/30 backdrop-blur-sm border border-slate-200 flex items-center justify-center">
                <span className="text-2xl font-bold text-slate-700">C</span>
              </div>
            </div>
            <div className="text-center">
              <div className="text-slate-900 font-semibold tracking-tight text-sm mb-0.5">ClawnCore Leadership</div>
              <div className="text-slate-400 text-xs font-mono tracking-wider">Founder & Chief Architect</div>
              <div className="mt-3 text-[10px] font-mono text-blue-400/60 tracking-widest uppercase">
                ■ Building the Future
              </div>
            </div>
          </motion.div>
        </div>

        {/* Philosophy card overlay (bottom center) */}
        <PhilosophyCard active={activeNode} onClose={() => setActiveNodeId(null)} />

        {/* Bottom interaction hint */}
        <div className="absolute bottom-8 w-full flex justify-center">
          <motion.p
            animate={{ opacity: [0.2, 0.6, 0.2] }}
            transition={{ repeat: Infinity, duration: 3.5 }}
            className="text-xs font-mono tracking-[0.3em] text-blue-400/30 uppercase">
            Select a leadership principle
          </motion.p>
        </div>
      </div>
    </section>
  );
}
