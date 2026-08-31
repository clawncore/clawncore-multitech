import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { CategoryPill } from '@/components/CategoryPill';
import { ArrowRight } from 'lucide-react';

const PLATFORMS = [
  {
    name: 'Smart Agriculture',
    category: 'Agriculture',
    color: '#34d399',
    description: 'Drone-powered precision farming with autonomous crop-health analytics and seasonal intelligence.',
    image: '/drone hero.png',
    href: '/agriculture',
    metrics: [{ label: 'Yield Improvement', value: '+24%' }],
  },
  {
    name: 'Cybersecurity',
    category: 'Security',
    color: '#2563eb',
    description: 'Quantum-resistant threat intelligence with real-time behavioral analysis across all surfaces.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80',
    href: '/cybersecurity',
    metrics: [{ label: 'Detection Rate', value: '99.9%' }],
  },
  {
    name: 'Cloud Infrastructure',
    category: 'Cloud',
    color: '#06b6d4',
    description: 'Globally distributed, high-availability cloud fabric for mission-critical autonomous workloads.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80',
    href: '/cloud',
    metrics: [{ label: 'Uptime SLA', value: '99.999%' }],
  },
  {
    name: 'AI & Machine Learning',
    category: 'Intelligence',
    color: '#76B900',
    description: 'Adaptive neural systems that learn from every data point — refining predictions and decisions.',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=600&q=80',
    href: '/ml',
    metrics: [{ label: 'Inference Latency', value: '0.2ms' }],
  },
  {
    name: 'Data Analytics',
    category: 'Analytics',
    color: '#fbbf24',
    description: 'Turn raw operational data into real-time dashboards, forecasts, and actionable intelligence.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
    href: '/data-analytics',
    metrics: [{ label: 'Data Processed', value: '840 TB/d' }],
  },
  {
    name: 'ClawnAI Platform',
    category: 'Core',
    color: '#76B900',
    description: 'The singular consciousness orchestrating the entire multitech ecosystem autonomously.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=600&q=80',
    href: '/clawn-ai',
    metrics: [{ label: 'Self-Healing', value: '100%' }],
  },
];

export function PlatformOverview() {
  return (
    <section id="platforms" className="relative py-20 sm:py-28 md:py-36 bg-gray-50 dark:bg-cc-darker">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 sm:mb-16"
        >
          <CategoryPill label="Ecosystem" color="#76B900" className="mb-4 sm:mb-5" />
          <h2 className="text-display-lg text-gray-900 dark:text-white mb-4">
            Six Systems.<br />
            <span className="text-nvidia-500">One Platform.</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-slate-300 max-w-2xl leading-relaxed">
            An integrated ecosystem where agriculture, security, cloud, intelligence, analytics, and autonomous orchestration converge into a single unified platform.
          </p>
        </motion.div>

        {/* Platform cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {PLATFORMS.map((platform, index) => (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link href={platform.href}>
                <div className="group block h-full rounded-2xl overflow-hidden bg-white dark:bg-cc-card border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 transition-all duration-500 card-hover-lift cursor-pointer shadow-sm hover:shadow-lg">
                  {/* Image */}
                  <div className="relative h-52 sm:h-60 overflow-hidden">
                    <img
                      src={platform.image}
                      alt={platform.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <CategoryPill label={platform.category} color={platform.color} />
                    </div>
                    {/* Metric badge */}
                    {platform.metrics[0] && (
                      <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/15">
                        <p className="text-xl font-black text-white">{platform.metrics[0].value}</p>
                        <p className="text-[10px] font-mono uppercase tracking-wider text-white/70">{platform.metrics[0].label}</p>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5 sm:p-6">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-nvidia-500 transition-colors">
                      {platform.name}
                    </h3>
                    <p className="text-base text-gray-600 dark:text-slate-300 leading-relaxed mb-4">
                      {platform.description}
                    </p>
                    <div className="flex items-center gap-1.5 text-nvidia-500 text-sm font-semibold group-hover:gap-2.5 transition-all duration-300">
                      Explore
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
