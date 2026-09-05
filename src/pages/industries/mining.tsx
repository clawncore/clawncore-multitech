import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PersistentCTA } from '@/components/PersistentCTA';
import { SEO, ServiceSchema } from '@/components/SEO';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Shield, Brain, BarChart3, Cloud, Database, HardHat, ArrowRight, AlertTriangle, CheckCircle } from 'lucide-react';

const challenges = [
  'Safety monitoring across remote mining operations',
  'Equipment predictive maintenance to avoid costly downtime',
  'Environmental compliance and reporting requirements',
  'Managing operational data from multiple mine sites',
  'Cybersecurity for operational technology (OT) systems',
  'Connecting remote sites with limited connectivity',
];

const solutions = [
  {
    icon: Brain,
    title: 'Predictive Maintenance AI',
    description: 'Machine learning models that predict equipment failures before they happen, reducing unplanned downtime.',
    href: '/platforms/ai-machine-learning',
  },
  {
    icon: BarChart3,
    title: 'Operational Analytics',
    description: 'Real-time dashboards for production metrics, safety KPIs, environmental compliance, and resource tracking.',
    href: '/platforms/data-analytics',
  },
  {
    icon: Shield,
    title: 'OT Security',
    description: 'Protect operational technology systems from cyber threats while maintaining production continuity.',
    href: '/platforms/cybersecurity',
  },
  {
    icon: Cloud,
    title: 'Remote Site Connectivity',
    description: 'Cloud infrastructure designed for remote mining operations with intermittent connectivity.',
    href: '/platforms/cloud-infrastructure',
  },
  {
    icon: Database,
    title: 'Data Management',
    description: 'Centralized storage for geological data, production records, safety reports, and compliance documentation.',
    href: '/platforms/cloud-infrastructure',
  },
  {
    icon: HardHat,
    title: 'Safety Monitoring',
    description: 'IoT integration and analytics for real-time safety monitoring and incident prevention.',
    href: '/platforms/ai-machine-learning',
  },
];

export default function IndustryMining() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-cc-darker text-gray-900 dark:text-white">
      <SEO
        title="Mining Technology Solutions"
        description="Predictive maintenance, operational analytics, and cybersecurity for Zimbabwean mining operations. Technology solutions for mining companies."
        keywords={['mining technology Zimbabwe', 'mining IT solutions Africa', 'predictive maintenance mining', 'mining cybersecurity', 'mining data analytics']}
        ogImage="/og-industry-mining.png"
      />
      <ServiceSchema
        name="Mining Technology Solutions"
        description="Predictive maintenance, operational analytics, cybersecurity, and cloud infrastructure for Zimbabwean mining operations."
        url="https://clawncore.com/industries/mining"
        serviceType="Mining Technology Solutions"
      />

      <Header />

      <main>
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-[#1a1208] to-[#2d200f] py-24 sm:py-32 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-15">
            <img src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=2200&q=85" alt="" className="h-full w-full object-cover" />
          </div>
          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <Breadcrumbs
              items={[
                { name: 'Industries', url: '/industries' },
                { name: 'Mining', url: '/industries/mining' },
              ]}
              className="text-white/70 mb-8"
            />
            <div className="max-w-4xl">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.35em] text-[#fbbf24]">Industry Solutions</p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-6">
                Technology for <span className="text-[#fbbf24]">Mining Operations</span>
              </h1>
              <p className="text-xl sm:text-2xl text-white/90 leading-relaxed mb-8">
                Predictive maintenance, operational analytics, cybersecurity, and cloud infrastructure for Zimbabwean mining companies.
              </p>
              <Link href="/get-started">
                <Button className="h-12 px-8 bg-[#d97706] hover:bg-[#b45309] text-white font-bold">Get Started</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Challenges with image */}
        <section className="py-20 sm:py-28">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=85"
                  alt="Mining operations"
                  className="w-full h-full min-h-[400px] object-cover"
                />
              </div>
              <div>
                <h2 className="text-3xl sm:text-4xl font-black mb-8">Mining Challenges</h2>
                <div className="space-y-3">
                  {challenges.map((challenge) => (
                    <div key={challenge} className="flex items-start gap-3 p-4 rounded-xl bg-white dark:bg-cc-card border border-gray-200 dark:border-white/10">
                      <AlertTriangle className="h-5 w-5 text-[#d97706] mt-0.5 flex-shrink-0" />
                      <p className="text-[#46586b] dark:text-slate-300 text-sm">{challenge}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Solutions */}
        <section className="py-20 sm:py-28 bg-white dark:bg-cc-card">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-black mb-4">How ClawnCore Serves Mining</h2>
              <p className="text-lg text-gray-600 dark:text-slate-300 max-w-2xl mx-auto">Integrated technology for safer, more efficient mining operations.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {solutions.map((solution) => (
                <Link key={solution.title} href={solution.href}>
                  <div className="group p-6 rounded-2xl border border-gray-200 dark:border-white/10 hover:border-[#d97706] transition-colors cursor-pointer h-full">
                    <solution.icon className="h-8 w-8 text-[#d97706] mb-4" />
                    <h3 className="text-xl font-bold mb-3 group-hover:text-[#d97706] transition-colors">{solution.title}</h3>
                    <p className="text-gray-600 dark:text-slate-400 leading-relaxed text-sm mb-4">{solution.description}</p>
                    <span className="inline-flex items-center gap-1 text-[#d97706] font-semibold text-sm">Learn more <ArrowRight className="h-4 w-4" /></span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 sm:py-28 bg-gradient-to-br from-[#d97706] to-[#b45309] text-white">
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl sm:text-4xl font-black mb-6">Optimize Your Mining Operations</h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">Get a technology assessment for your mining operations.</p>
            <Link href="/get-started">
              <Button className="h-12 px-8 bg-white text-[#d97706] hover:bg-gray-100 font-bold">Get Started</Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
      <PersistentCTA />
    </div>
  );
}
