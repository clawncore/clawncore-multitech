import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrustScene } from '../scenes/TrustScene';
import { Shield, Brain, Leaf, Cloud, BarChart3, Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

// ── Data ────────────────────────────────────────────────────────────────────

const TESTIMONIALS = [
  {
    id: 'agri',
    category: 'Agriculture Intelligence',
    icon: Leaf,
    color: '#34d399',
    company: 'AgroVision Partners',
    role: 'Chief Operations Officer',
    quote:
      'ClawnCore\'s drone mapping reduced our manual surveying time by 70%. The AI yield predictions have been accurate to within 3% — unprecedented in our sector.',
    stat: { label: 'Yield Improvement', value: '+24%' },
  },
  {
    id: 'cyber',
    category: 'Cybersecurity',
    icon: Shield,
    color: '#2563eb',
    company: 'SecureNet Africa',
    role: 'Director of Infrastructure',
    quote:
      'The behavioral anomaly detection caught a lateral movement attack that our legacy SIEM completely missed. ClawnCore\'s systems operate on a different level of intelligence.',
    stat: { label: 'Threats Neutralized', value: '99.9%' },
  },
  {
    id: 'ai',
    category: 'AI Infrastructure',
    icon: Brain,
    color: '#60a5fa',
    company: 'Nexus Analytics Group',
    role: 'Head of Data Science',
    quote:
      'We onboarded the ClawnAI pipeline in two weeks. Within a month, our predictive models outperformed our in-house solutions built over three years.',
    stat: { label: 'Model Accuracy', value: '94.2%' },
  },
  {
    id: 'cloud',
    category: 'Cloud Systems',
    icon: Cloud,
    color: '#22d3ee',
    company: 'Meridian Financial',
    role: 'VP Technology',
    quote:
      'The distributed nexus handles our peak transaction loads without degradation. Five nines uptime is not a promise — it\'s what we\'ve actually experienced since deployment.',
    stat: { label: 'System Uptime', value: '99.999%' },
  },
  {
    id: 'analytics',
    category: 'Analytics Solutions',
    icon: BarChart3,
    color: '#fbbf24',
    company: 'TeleCom Horizon',
    role: 'Chief Data Officer',
    quote:
      'Processing 840 TB per day in real time was something we thought required three vendors. ClawnCore consolidated everything into a single, intelligent stream.',
    stat: { label: 'Cost Reduction', value: '41%' },
  },
];

const METRICS = [
  { label: 'Client Deployments', value: '50+', color: '#22d3ee' },
  { label: 'System Uptime SLA', value: '99.999%', color: '#34d399' },
  { label: 'Threats Blocked Daily', value: '2.4M+', color: '#2563eb' },
  { label: 'Data Processed / Day', value: '840 TB', color: '#fbbf24' },
];

// ── Animation helpers ────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] },
  }),
};

// ── Main Section ─────────────────────────────────────────────────────────────

export function ClientTrust() {
  const [active, setActive] = useState(0);
  const testimonial = TESTIMONIALS[active];
  const Icon = testimonial.icon;

  const prev = () => setActive((p) => (p - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setActive((p) => (p + 1) % TESTIMONIALS.length);

  return (
    <section id="client-trust" className="relative w-full bg-white overflow-hidden">

      {/* ── 3D Globe Background ── */}
      <div className="absolute inset-0 z-0 h-full">
        <TrustScene activeCardId={testimonial.id} />
      </div>

      {/* Gradient fade left so text is readable against globe */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#000c1a] via-[#000c1a]/70 to-transparent pointer-events-none" />

      {/* ── UI Content ── */}
      <div className="relative z-10 container mx-auto px-6 py-28 md:py-36 flex flex-col gap-24">

        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="max-w-xl"
        >
          <motion.p custom={0} variants={fadeUp}
            className="text-xs font-mono tracking-[0.35em] text-cyan-400/60 uppercase mb-4">
            Client Confidence · Global Operations
          </motion.p>
          <motion.h2 custom={1} variants={fadeUp}
            className="text-5xl md:text-6xl font-bold tracking-tighter text-slate-900 mb-5"
            style={{ textShadow: '0 0 40px rgba(34,211,238,0.1)' }}>
            Trusted by<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-green-400">
              Forward-Thinking
            </span><br />
            Organizations.
          </motion.h2>
          <motion.p custom={2} variants={fadeUp}
            className="text-base text-slate-500 font-light leading-relaxed max-w-md">
            From precision agriculture to enterprise cybersecurity, ClawnCore
            systems operate at mission-critical scale across global deployments.
          </motion.p>
        </motion.div>

        {/* Enterprise Metrics Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {METRICS.map((m, i) => (
            <div key={i}
              className="relative overflow-hidden rounded-2xl border border-slate-100 bg-white/80 backdrop-blur-xl shadow-sm p-5">
              <div className="absolute top-0 left-0 w-full h-[2px]"
                style={{ background: `linear-gradient(to right, transparent, ${m.color}, transparent)` }} />
              <div className="text-3xl font-bold text-slate-900 mb-1 tracking-tight" style={{ textShadow: `0 0 20px ${m.color}60` }}>
                {m.value}
              </div>
              <div className="text-xs font-mono text-slate-400 uppercase tracking-widest">{m.label}</div>
              {/* Pulsing dot */}
              <div className="absolute top-4 right-4 w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: m.color }} />
            </div>
          ))}
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white/90 backdrop-blur-2xl shadow-lg p-8 shadow-2xl"
            >
              {/* Top colour accent */}
              <div className="absolute top-0 left-0 w-full h-[2px]"
                style={{ background: `linear-gradient(to right, transparent, ${testimonial.color}, transparent)` }} />

              {/* Category badge */}
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-xl border"
                  style={{ borderColor: `${testimonial.color}30`, backgroundColor: `${testimonial.color}10` }}>
                  <Icon size={16} style={{ color: testimonial.color }} />
                </div>
                <span className="text-xs font-mono tracking-widest uppercase"
                  style={{ color: testimonial.color }}>
                  {testimonial.category}
                </span>
              </div>

              {/* Quote */}
              <div className="relative pl-6 mb-6 border-l-2" style={{ borderColor: `${testimonial.color}40` }}>
                <Quote size={16} className="absolute -left-2 top-0 opacity-40" style={{ color: testimonial.color }} />
                <p className="text-slate-700 text-lg font-light italic leading-relaxed">
                  {testimonial.quote}
                </p>
              </div>

              {/* Author + stat */}
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <div className="text-slate-900 font-semibold text-sm">{testimonial.company}</div>
                  <div className="text-slate-400 text-xs font-mono tracking-wide">{testimonial.role}</div>
                </div>
                <div className="text-right border border-slate-200 rounded-xl px-4 py-2 bg-black/20">
                  <div className="text-xl font-bold text-slate-900" style={{ color: testimonial.color }}>
                    {testimonial.stat.value}
                  </div>
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                    {testimonial.stat.label}
                  </div>
                </div>
              </div>

              {/* Star rating */}
              <div className="flex gap-1 mt-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} className="fill-current" style={{ color: testimonial.color }} />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center gap-4 mt-6">
            <button onClick={prev}
              className="w-10 h-10 rounded-full border border-slate-200 bg-black/30 backdrop-blur-md flex items-center justify-center text-slate-700 hover:text-slate-900 hover:border-white/30 transition-all">
              <ChevronLeft size={18} />
            </button>

            {/* Dots */}
            <div className="flex gap-2 flex-1 items-center">
              {TESTIMONIALS.map((t, i) => (
                <button key={t.id} onClick={() => setActive(i)}
                  className="h-1 rounded-full transition-all duration-300"
                  style={{
                    width: i === active ? 24 : 8,
                    backgroundColor: i === active ? testimonial.color : '#ffffff20',
                  }} />
              ))}
            </div>

            <button onClick={next}
              className="w-10 h-10 rounded-full border border-slate-200 bg-black/30 backdrop-blur-md flex items-center justify-center text-slate-700 hover:text-slate-900 hover:border-white/30 transition-all">
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Pagination label */}
          <p className="text-xs font-mono text-slate-400 mt-3 tracking-widest">
            {String(active + 1).padStart(2, '0')} / {String(TESTIMONIALS.length).padStart(2, '0')}
          </p>
        </div>

      </div>
    </section>
  );
}
