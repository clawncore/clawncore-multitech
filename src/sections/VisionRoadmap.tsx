import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { RoadmapNodeData } from '../components/ui/RoadmapCard';
import { VisionScene } from '../scenes/VisionScene';

export const ROADMAP_NODES: Record<string, RoadmapNodeData> = {
  phase1: {
    id: 'phase1',
    phase: 'PHASE I',
    year: '2025',
    title: 'Foundation Intelligence',
    description:
      'Establishing the core multitech infrastructure: AI orchestration, drone deployment, and cloud-native cybersecurity systems capable of operating as a cohesive ecosystem.',
    color: '#60a5fa',
    initiatives: ['AI Core Deployment', 'Drone Certification', 'Cloud Nexus Setup'],
  },
  phase2: {
    id: 'phase2',
    phase: 'PHASE II',
    year: '2026',
    title: 'Ecosystem Expansion',
    description:
      'Scaling intelligent systems across agriculture, analytics, and autonomous operations. ClawnAI begins real-time adaptation across sectors simultaneously.',
    color: '#0ea5e9', // Sky (was purple)
    initiatives: ['Smart Agriculture Grid', 'Predictive Analytics', 'Multi-Sector Deployment'],
  },
  phase3: {
    id: 'phase3',
    phase: 'PHASE III',
    year: '2027',
    title: 'Global Intelligence Network',
    description:
      'A globally distributed intelligence network where every system synchronizes in real time. ClawnCore becomes the backbone of resilient digital-physical infrastructure.',
    color: '#f59e0b',
    initiatives: ['Global Node Network', 'Edge Computing', 'Cross-Sector AI Fusion'],
  },
  phase4: {
    id: 'phase4',
    phase: 'PHASE IV',
    year: '2028+',
    title: 'Autonomous Future',
    description:
      'Self-governed, self-optimizing ecosystems that evolve without intervention. Human-AI collaboration reaches full integration — ClawnCore becomes infrastructure for civilization.',
    color: '#34d399',
    initiatives: ['Full Autonomy', 'Human-AI Collaboration', 'Civilizational Scale'],
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 1.1, ease: [0.16, 1, 0.3, 1] },
  }),
};

export function VisionRoadmap() {
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);

  return (
    <section
      id="vision-roadmap"
      className="relative w-full bg-white dark:bg-cc-dark py-24 md:py-32 overflow-hidden"
    >
      {/* Subtle Sophistication Layer (Grid) */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_10%,transparent_100%)] pointer-events-none z-0" />

      {/* 3D Scene Background (If WebGL works) */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <VisionScene
          activeNodeId={activeNodeId}
          onNodeSelect={(id) => setActiveNodeId(id)}
        />
      </div>

      <div className="relative z-10 flex flex-col gap-12">

        {/* Section Header — centered text */}
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-120px' }}
            className="flex flex-col items-center"
          >
            <motion.p
              custom={0}
              variants={fadeUp}
              className="text-xs font-mono tracking-[0.35em] text-blue-400 uppercase mb-4 font-semibold"
            >
              Strategic Evolution · ClawnCore Vision
            </motion.p>

            <motion.h2
              custom={1}
              variants={fadeUp}
              className="text-3xl sm:text-5xl md:text-7xl font-black tracking-tighter text-gray-900 dark:text-white mb-6"
            >
              Built for the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-400 to-cyan-400">
                Next Century
              </span>
            </motion.h2>

            <motion.p
              custom={2}
              variants={fadeUp}
              className="text-lg text-gray-500 dark:text-slate-400 font-light max-w-2xl leading-relaxed mb-8"
            >
              ClawnCore is not just a product. We are building the operating system for the future of intelligent civilization.
              Four phases. One unstoppable trajectory.
            </motion.p>
          </motion.div>
        </div>

        {/* CEO Message + Video — small avatar, text, play button */}
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

            {/* Left: Small CEO pic + message */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-start gap-5"
            >
              {/* Small CEO avatar */}
              <div className="shrink-0 w-28 h-28 sm:w-36 sm:h-36 lg:w-40 lg:h-40 rounded-2xl overflow-hidden shadow-xl border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-slate-900">
                <img
                  src="/ceo.png"
                  alt="CEO"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              {/* Message text */}
              <div className="flex-1">
                <p className="text-xs font-mono tracking-[0.35em] text-blue-400 uppercase mb-3 font-semibold">Message From Our CEO</p>
                <p className="text-xl sm:text-2xl md:text-[28px] text-gray-700 dark:text-slate-200 font-medium leading-relaxed italic mb-4">
                  "At ClawnCore, we are not just building technology — we are architecting the intelligence backbone of tomorrow. From autonomous drone systems to predictive AI, every solution we create is designed to scale across continents and adapt in real time."
                </p>
                <p className="text-base sm:text-lg text-gray-500 dark:text-slate-400 font-light leading-relaxed">
                  Our mission is clear: engineer the infrastructure that empowers humanity to thrive in a complex, interconnected world. We started with a vision — and every day, we move closer to making it reality.
                </p>
              </div>
            </motion.div>

            {/* Right: Video thumbnail with play button */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full aspect-video rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border border-gray-200 dark:border-white/10 group pointer-events-auto bg-gray-100 dark:bg-slate-900"
            >
              {activeNodeId === 'playing-video' ? (
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/RB961uA_7bE?autoplay=1"
                  title="CEO Vision"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0"
                />
              ) : (
                <div
                  className="absolute inset-0 cursor-pointer"
                  onClick={() => setActiveNodeId('playing-video')}
                >
                  <img src="/ceo.png" alt="CEO Vision" className="absolute inset-0 w-full h-full object-cover object-center" />
                  <div className="absolute inset-0 bg-slate-900/60" />

                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    {/* Big red pulsing play button */}
                    <div className="relative w-24 h-24 flex items-center justify-center">
                      <div className="absolute inset-0 bg-red-600 rounded-full animate-pulse shadow-[0_0_40px_rgba(239,68,68,0.6)]" style={{ animationDuration: '1.5s' }} />
                      <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-20" style={{ animationDuration: '1.5s' }} />
                      <Play className="w-10 h-10 text-white ml-1.5 relative z-10" />
                    </div>
                    <p className="text-white mt-6 text-lg font-semibold tracking-wide drop-shadow-md">
                      Watch CEO's Vision
                    </p>
                    <p className="text-white/50 text-sm mt-1 drop-shadow-md">
                      04:25
                    </p>
                  </div>
                </div>
              )}
            </motion.div>

          </div>
        </div>

        {/* Mission + Vision Floating Quotes */}
        <div className="container mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-center md:justify-between gap-4 sm:gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full md:max-w-md bg-gray-50 dark:bg-white/5 backdrop-blur-sm border border-gray-200 dark:border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.1)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.3)] hover:border-gray-300 dark:hover:border-white/20 transition-all duration-500"
          >
            <p className="text-xs font-mono text-blue-400 tracking-widest uppercase mb-3 sm:mb-4 font-semibold">Our Mission</p>
            <p className="text-gray-600 dark:text-slate-300 font-light text-base sm:text-lg leading-relaxed italic">
              "To engineer the intelligent infrastructure that empowers humanity to thrive in a complex, interconnected world."
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full md:max-w-md bg-gray-50 dark:bg-white/5 backdrop-blur-sm border border-gray-200 dark:border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.1)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.3)] hover:border-gray-300 dark:hover:border-white/20 transition-all duration-500 md:text-right"
          >
            <p className="text-xs font-mono text-blue-400 tracking-widest uppercase mb-3 sm:mb-4 font-semibold">Our Vision</p>
            <p className="text-gray-600 dark:text-slate-300 font-light text-base sm:text-lg leading-relaxed italic">
              "A future where autonomous, AI-driven systems silently power every layer of human civilization."
            </p>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
