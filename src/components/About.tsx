import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

const CARDS = [
  {
    category: 'Agriculture | AI',
    title: 'Autonomous Drone Grid',
    description:
      'Our drone swarms scan 2,450 acres in real-time, identifying crop deficiencies and triggering robotic precision care — increasing yields by up to 40%.',
    image: '/drone hero.png',
  },
  {
    category: 'Cybersecurity | Infrastructure',
    title: 'Quantum-Resilient Security',
    description:
      'A zero-trust mesh encrypted with post-quantum cryptography. Every node is monitored, and threats are isolated in under 2 milliseconds.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80',
  },
  {
    category: 'AI | Machine Learning',
    title: 'Distributed Neural Intelligence',
    description:
      'ClawnAI processes 2.4 billion parameters per inference cycle — continuously learning from field data to make smarter decisions autonomously.',
    image: '/optic hand naturing .png',
  },
  {
    category: 'Cloud | Infrastructure',
    title: 'Global Cloud Nexus',
    description:
      'A cloud-native telemetry layer orchestrating terabytes of concurrent data streams across 450+ decentralized edge nodes with 99.999% uptime.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80',
  },
  {
    category: 'Aerospace | Autonomous',
    title: 'Swarm Aerial Intelligence',
    description:
      'Coordinated aerial networks operating at Mach 0.8 with ±2cm positional precision across complex urban and agricultural environments.',
    image: 'https://images.unsplash.com/photo-1579820010410-c10411aaaa88?auto=format&fit=crop&w=600&q=80',
  },
];

export function About() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir === 'right' ? 340 : -340, behavior: 'smooth' });
    }
  };

  return (
    <section id="about" className="w-full bg-white dark:bg-cc-dark border-t border-gray-200 dark:border-white/5 py-14 sm:py-20 md:py-28 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">

        {/* ── NVIDIA-style Layout: Left text + Right scrolling cards ── */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

          {/* Left: Static Text Block */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:w-[340px] flex-shrink-0"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-gray-900 dark:text-white mb-4 sm:mb-5 leading-tight">
              About ClawnCore
            </h2>
            <p className="text-gray-500 dark:text-slate-400 font-light leading-relaxed text-sm sm:text-base mb-6 sm:mb-8">
              Founded in 2025, ClawnCore Multitech is building the intelligent infrastructure
              that powers the next era of autonomous civilization — across agriculture, defence,
              cloud and cybersecurity.
            </p>
            <a href="#vision-roadmap" className="inline-flex items-center gap-2 text-nvidia-500 hover:text-nvidia-400 text-sm font-semibold transition-colors group">
              Our Vision & Roadmap
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            {/* Nav Arrows — NVIDIA style */}
            <div className="flex items-center gap-2 mt-10">
              <button
                onClick={() => scroll('left')}
                className="w-9 h-9 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-400 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white hover:border-nvidia-500/50 transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll('right')}
                className="w-9 h-9 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-400 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white hover:border-nvidia-500/50 transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>

          {/* Right: Horizontally Scrolling Cards */}
          <div className="flex-1 min-w-0 relative">
            {/* Fade edge */}
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white dark:from-cc-dark to-transparent z-10 pointer-events-none" />
            
            <div
              ref={scrollRef}
              className="flex gap-5 overflow-x-auto pb-4 scroll-smooth"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {CARDS.map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="flex-shrink-0 w-64 sm:w-72 border border-gray-100 dark:border-white/5 rounded-xl sm:rounded-2xl overflow-hidden hover:shadow-lg hover:border-gray-200 dark:hover:border-white/10 bg-white dark:bg-cc-card transition-all duration-300 group cursor-pointer"
                >
                  {/* Card Image */}
                  <div className="relative h-36 sm:h-44 overflow-hidden bg-gray-100 dark:bg-slate-900">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                  </div>

                  {/* Card Content */}
                  <div className="p-4 sm:p-6">
                    <p className="text-[9px] sm:text-[10px] font-mono tracking-widest uppercase text-nvidia-500 font-bold mb-1.5 sm:mb-2">
                      {card.category}
                    </p>
                    <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white mb-1.5 sm:mb-2 leading-snug">
                      {card.title}
                    </h3>
                    <p className="text-gray-500 dark:text-slate-400 text-xs sm:text-sm font-light leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
