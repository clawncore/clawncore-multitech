import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Brain, Cloud, BarChart3, Leaf, Plane, Play, ChevronRight } from 'lucide-react';

export const SERVICES = [
  {
    id: 'cybersecurity',
    icon: Shield,
    label: 'SYS.SECURITY',
    title: 'Autonomous Cyber Defense Infrastructure',
    description: 'Quantum-resistant threat intelligence with real-time behavioral analysis across all connected surfaces.',
    color: '#2563eb',
    metrics: [
      { value: '99.9%', label: 'Detection Rate' },
      { value: '24/7', label: 'Active Monitoring' },
      { value: '<1ms', label: 'Response Time' }
    ],
    bgImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1600'
  },
  {
    id: 'ai',
    icon: Brain,
    label: 'SYS.INTELLIGENCE',
    title: 'Distributed Neural Intelligence',
    description: 'Adaptive neural systems that learn from every data point — continuously refining decisions and predictions.',
    color: '#3b82f6',
    metrics: [
      { value: '2.4B+', label: 'Parameters Processed' },
      { value: '0.2ms', label: 'Inference Latency' },
      { value: '100%', label: 'Self-Healing' }
    ],
    bgImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1600'
  },
  {
    id: 'cloud',
    icon: Cloud,
    label: 'SYS.INFRASTRUCTURE',
    title: 'Global Cloud Nexus',
    description: 'Globally distributed, high-availability cloud fabric engineered for mission-critical workloads.',
    color: '#06b6d4',
    metrics: [
      { value: '99.999%', label: 'Uptime SLA' },
      { value: '1.2 Tbps', label: 'Global Bandwidth' },
      { value: '450+', label: 'Edge Nodes' }
    ],
    bgImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1600'
  },
  {
    id: 'analytics',
    icon: BarChart3,
    label: 'SYS.TELEMETRY',
    title: 'Real-Time Telemetry Engine',
    description: 'Ingest and process massive telemetry streams in real time — surfacing intelligence before issues emerge.',
    color: '#0ea5e9',
    metrics: [
      { value: '840 TB', label: 'Processed Daily' },
      { value: 'Live', label: 'Data Streaming' },
      { value: 'Sub-sec', label: 'Data Latency' }
    ],
    bgImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1600'
  },
  {
    id: 'agriculture',
    icon: Leaf,
    label: 'SYS.TERRAIN',
    title: 'Autonomous Agricultural Grid',
    description: 'Drone-powered precision agriculture combining multispectral imaging with AI crop health diagnostics.',
    color: '#10b981',
    metrics: [
      { value: '94.2%', label: 'Yield Accuracy' },
      { value: '25%', label: 'Water Savings' },
      { value: '<1mm', label: 'Robotic Precision' }
    ],
    bgImage: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&q=80&w=1600'
  },
  {
    id: 'drones',
    icon: Plane,
    label: 'SYS.AEROSPACE',
    title: 'Swarm Aerial Intelligence',
    description: 'Coordinated aerial intelligence networks operating with centimeter-level precision across complex environments.',
    color: '#6366f1',
    metrics: [
      { value: '±2cm', label: 'Positional Precision' },
      { value: 'Mach 0.8', label: 'Max Speed' },
      { value: 'Infinite', label: 'Swarm Scalability' }
    ],
    bgImage: 'https://images.unsplash.com/photo-1579820010410-c10411aaaa88?auto=format&fit=crop&q=80&w=1600'
  },
];

const SLIDE_INTERVAL = 6000;

export function ServicesDeepDive() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SERVICES.length);
    }, SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, []);

  const activeService = SERVICES[current];
  const Icon = activeService.icon;

  return (
    <section id="services-deep-dive" className="relative w-full bg-slate-50 py-24 md:py-32 overflow-hidden">
      
      {/* Subtle Engineering Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_10%,transparent_100%)] pointer-events-none z-0" />

      <div className="container relative z-10 mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">

          {/* Left: Sticky Text Content */}
          <div className="lg:w-1/2 flex-shrink-0">
            
            {/* System Status Line */}
            <div className="flex items-center gap-3 mb-8">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] font-mono tracking-[0.2em] text-slate-500 font-semibold uppercase">
                System Status • All Networks Operational
              </span>
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7 }}
              className="text-5xl md:text-6xl font-black tracking-tighter text-slate-900 mb-6 leading-[1.05]"
            >
              Six Systems.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-500">
                One Platform.
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
              className="text-lg text-slate-600 font-light leading-relaxed mb-12 max-w-md"
            >
              An integrated intelligence ecosystem engineered to power secure, autonomous, and scalable infrastructure across critical industries.
            </motion.p>

            {/* Active Service Details (animated) */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4 }}
                className="mb-12"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${activeService.color}15`, color: activeService.color }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono tracking-widest uppercase font-semibold text-slate-400">
                    {activeService.label}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">{activeService.title}</h3>
                <p className="text-slate-600 font-light leading-relaxed text-base mb-8 max-w-md">{activeService.description}</p>
                
                {/* Horizontal Metrics Row */}
                <div className="flex flex-wrap gap-8">
                  {activeService.metrics.map((metric, idx) => (
                    <div key={idx} className="flex flex-col gap-1 border-l-2 pl-4" style={{ borderColor: `${activeService.color}30` }}>
                      <span className="text-2xl md:text-3xl font-black text-slate-900">{metric.value}</span>
                      <span className="text-[10px] text-slate-500 font-mono font-semibold uppercase tracking-widest">{metric.label}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <button className="relative overflow-hidden bg-slate-900 text-white px-8 py-3.5 rounded-full text-sm font-semibold transition-all duration-300 shadow-[0_4px_14px_0_rgb(0,0,0,0.2)] hover:shadow-[0_6px_20px_rgba(15,23,42,0.3)] hover:-translate-y-0.5 group">
                <span className="relative z-10 flex items-center gap-2">Initialize System <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
              </button>
              <button className="bg-white border border-slate-200 text-slate-600 px-8 py-3.5 rounded-full text-sm font-semibold transition-all duration-300 hover:border-slate-300 hover:text-slate-900 hover:bg-slate-50 hover:shadow-sm">
                Technical Specs
              </button>
            </motion.div>

            {/* Progress Nodes (Ecosystem Nodes) */}
            <div className="flex gap-3 items-center">
              {SERVICES.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => setCurrent(i)}
                  className="relative h-1.5 rounded-full overflow-hidden transition-all duration-500"
                  style={{ width: i === current ? '3rem' : '0.75rem', backgroundColor: i === current ? activeService.color : '#e2e8f0' }}
                >
                  {i === current && (
                    <motion.div
                      className="absolute inset-0 origin-left"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: SLIDE_INTERVAL / 1000, ease: 'linear' }}
                      style={{ backgroundColor: activeService.color, opacity: 0.6 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Right: Living System Visualizer */}
          <div className="lg:w-1/2 flex flex-col gap-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService.id}
                initial={{ opacity: 0, scale: 0.97, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.02, y: -20 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-slate-200 group cursor-pointer"
              >
                {/* Dark Base */}
                <div className="absolute inset-0 bg-slate-900 transition-transform duration-[10s] group-hover:scale-105" />
                
                {/* Dynamic Image Context */}
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay transition-transform duration-[10s] ease-out group-hover:scale-110" 
                  style={{ backgroundImage: `url(${activeService.bgImage})` }} 
                />

                {/* Living System Telemetry Elements */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/90 via-slate-900/40 to-transparent" />
                  
                  {/* Subtle Scan Line */}
                  <motion.div 
                    animate={{ y: ['0%', '100%', '0%'] }} 
                    transition={{ duration: 6, ease: "linear", repeat: Infinity }}
                    className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" 
                  />

                  {/* Active Node Indicator */}
                  <div className="absolute top-6 right-6 flex items-center gap-2 bg-slate-900/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                    <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: activeService.color, boxShadow: `0 0 8px ${activeService.color}` }} />
                    <span className="text-[9px] font-mono tracking-widest text-white/80 uppercase">SYS.LIVE</span>
                  </div>
                </div>

                {/* Play Button & Label */}
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/10 group-hover:bg-slate-900/30 transition-colors duration-500">
                  <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 shadow-xl group-hover:scale-110 group-hover:bg-white/20 transition-all duration-300">
                    <Play className="w-6 h-6 text-white ml-1" />
                  </div>
                  <p className="text-white mt-5 font-semibold tracking-wide drop-shadow-md transform transition-transform duration-300 group-hover:-translate-y-1">System Architecture Briefing</p>
                </div>

                {/* Bottom Left Context Label */}
                <div className="absolute bottom-6 left-6">
                  <span
                    className="text-[10px] font-mono tracking-widest uppercase font-bold px-4 py-2 rounded-lg backdrop-blur-md border border-white/10 shadow-lg"
                    style={{ backgroundColor: `${activeService.color}20`, color: '#fff' }}
                  >
                    {activeService.label}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Labeled Thumbnail Navigation Strip */}
            <div className="grid grid-cols-5 gap-3 mt-4">
              {SERVICES.filter((_, i) => i !== current).map((s) => {
                const ThumbIcon = s.icon;
                return (
                  <button
                    key={s.id}
                    onClick={() => setCurrent(SERVICES.indexOf(s))}
                    className="flex flex-col items-center gap-2.5 group"
                  >
                    <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-slate-200/80 shadow-sm group-hover:border-slate-300 group-hover:shadow-md transition-all duration-300">
                      <div className="absolute inset-0 bg-slate-800" />
                      <div className="absolute inset-0 opacity-20 group-hover:opacity-40 mix-blend-overlay transition-opacity duration-300" style={{ backgroundColor: s.color }} />
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <ThumbIcon className="w-5 h-5 text-white/70 group-hover:text-white transition-all duration-300 group-hover:scale-110" />
                      </div>
                    </div>
                    <span className="text-[9px] font-semibold tracking-wider text-slate-400 uppercase group-hover:text-slate-800 transition-colors">
                      {s.label.replace('SYS.', '')}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

