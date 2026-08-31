import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Brain, Cloud, BarChart3, Leaf, ArrowRight } from 'lucide-react';
import { CategoryPill } from '@/components/CategoryPill';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';

const SYSTEMS = [
  {
    id: 'cybersecurity',
    icon: Shield,
    category: 'SYS.SECURITY',
    title: 'Autonomous Cyber Defense',
    description: 'Quantum-resistant threat intelligence with real-time behavioral analysis across all connected surfaces.',
    color: '#2563eb',
    metrics: [
      { value: '99.9%', label: 'Detection Rate' },
      { value: '24/7', label: 'Active Monitoring' },
      { value: '<1ms', label: 'Response Time' },
    ],
    bgImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1600',
    href: '/cybersecurity',
  },
  {
    id: 'ai',
    icon: Brain,
    category: 'SYS.INTELLIGENCE',
    title: 'Distributed Neural Intelligence',
    description: 'Adaptive neural systems that learn from every data point — continuously refining decisions and predictions.',
    color: '#76B900',
    metrics: [
      { value: '2.4B+', label: 'Parameters' },
      { value: '0.2ms', label: 'Inference Latency' },
      { value: '100%', label: 'Self-Healing' },
    ],
    bgImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1600',
    href: '/ml',
  },
  {
    id: 'cloud',
    icon: Cloud,
    category: 'SYS.INFRASTRUCTURE',
    title: 'Global Cloud Nexus',
    description: 'Globally distributed, high-availability cloud fabric engineered for mission-critical autonomous workloads.',
    color: '#06b6d4',
    metrics: [
      { value: '99.999%', label: 'Uptime SLA' },
      { value: '1.2 Tbps', label: 'Bandwidth' },
      { value: '450+', label: 'Edge Nodes' },
    ],
    bgImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1600',
    href: '/cloud',
  },
  {
    id: 'analytics',
    icon: BarChart3,
    category: 'SYS.TELEMETRY',
    title: 'Real-Time Telemetry Engine',
    description: 'Ingest and process massive telemetry streams in real time — surfacing intelligence before issues emerge.',
    color: '#fbbf24',
    metrics: [
      { value: '840 TB', label: 'Processed Daily' },
      { value: 'Live', label: 'Data Streaming' },
      { value: 'Sub-sec', label: 'Data Latency' },
    ],
    bgImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1600',
    href: '/data-analytics',
  },
  {
    id: 'agriculture',
    icon: Leaf,
    category: 'SYS.TERRAIN',
    title: 'Precision Agri-Grid',
    description: 'Precision environmental mapping and crop health monitoring via synchronized drone fleets and terrestrial sensors.',
    color: '#34d399',
    metrics: [
      { value: '1.2M Ha', label: 'Area Scanned' },
      { value: '+24%', label: 'Yield Optimization' },
      { value: 'Real-time', label: 'Field Monitoring' },
    ],
    bgImage: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&q=80&w=1600',
    href: '/agriculture',
  },
];

export function SystemsShowcase() {
  const [, navigate] = useLocation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const active = SYSTEMS[activeIndex];

  // Auto-cycle
  useEffect(() => {
    setProgress(0);
    const duration = 6000;
    const interval = 50;
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveIndex((i) => (i + 1) % SYSTEMS.length);
          return 0;
        }
        return prev + (interval / duration) * 100;
      });
    }, interval);
    return () => clearInterval(timer);
  }, [activeIndex]);

  return (
    <section className="relative py-20 sm:py-28 md:py-36 bg-gray-50 dark:bg-cc-dark text-gray-900 dark:text-white overflow-hidden">
      {/* Background image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <img src={active.bgImage} alt="" loading="lazy" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gray-50/80 dark:bg-cc-dark/80" />
        </motion.div>
      </AnimatePresence>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-start">
          {/* Left: Active system info */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-nvidia-500 mb-4">
                ClawnCore Multitech Role
              </p>
              <h2 className="text-display-lg text-gray-900 dark:text-white mb-4">
                Six Systems.{' '}
                <span className="text-nvidia-500">One Intelligence.</span>
              </h2>
              <p className="text-base sm:text-lg text-gray-500 dark:text-slate-400 max-w-xl leading-relaxed">
                Each system operates autonomously while sharing intelligence across the unified ClawnAI orchestration layer.
              </p>
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5 }}
              >
                <CategoryPill label={active.category} color={active.color} className="mb-4" />

                <div className="flex items-center gap-3 mb-4">
                  <active.icon className="w-8 h-8" style={{ color: active.color }} />
                  <h3 className="text-2xl sm:text-3xl font-bold">{active.title}</h3>
                </div>

                <p className="text-gray-500 dark:text-slate-400 leading-relaxed mb-8 max-w-lg">
                  {active.description}
                </p>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {active.metrics.map((m) => (
                    <div key={m.label} className="p-4 rounded-xl bg-gray-100 dark:bg-white/[0.03] border border-gray-200 dark:border-white/5">
                      <p className="text-xl sm:text-2xl font-black">{m.value}</p>
                      <p className="text-[10px] font-mono uppercase tracking-wider text-gray-400 dark:text-slate-500 mt-1">{m.label}</p>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={() => navigate(active.href)}
                  className="bg-nvidia-500 hover:bg-nvidia-600 text-black font-bold h-11 px-6 rounded-lg text-sm"
                >
                  Explore {active.title.split(' ').slice(-1)[0]}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: Thumbnail strip selector */}
          <div className="flex flex-col gap-3">
            {SYSTEMS.map((system, index) => (
              <button
                key={system.id}
                onClick={() => { setActiveIndex(index); setProgress(0); }}
                className={`group flex items-center gap-4 p-3 sm:p-4 rounded-xl transition-all duration-300 text-left ${
                  index === activeIndex
                    ? 'bg-gray-100 dark:bg-white/[0.06] border border-gray-200 dark:border-white/10'
                    : 'bg-gray-50 dark:bg-white/[0.02] border border-transparent hover:bg-gray-100 dark:hover:bg-white/[0.04] hover:border-gray-200 dark:hover:border-white/5'
                }`}
              >
                {/* Progress bar on active */}
                <div className="relative w-16 sm:w-20 h-16 sm:h-20 rounded-xl overflow-hidden flex-shrink-0">
                  <img src={system.bgImage} alt={system.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  {index === activeIndex && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10">
                      <div className="h-full bg-nvidia-500 transition-all duration-75" style={{ width: `${progress}%` }} />
                    </div>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <system.icon className="w-3.5 h-3.5 flex-shrink-0" style={{ color: system.color }} />
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 truncate">
                      {system.category}
                    </span>
                  </div>
                  <p className={`text-sm font-bold truncate transition-colors ${
                    index === activeIndex ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-slate-400 group-hover:text-gray-900 dark:group-hover:text-white'
                  }`}>
                    {system.title}
                  </p>
                </div>

                <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all ${
                  index === activeIndex ? 'bg-nvidia-500 shadow-[0_0_8px_rgba(118,185,0,0.6)]' : 'bg-gray-300 dark:bg-slate-600'
                }`} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
