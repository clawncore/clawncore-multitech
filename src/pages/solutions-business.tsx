import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PersistentCTA } from '@/components/PersistentCTA';
import { SEO, ServiceSchema } from '@/components/SEO';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Shield, Cloud, Activity, BarChart3, Lock, Server, ArrowRight } from 'lucide-react';

const challenges = [
  'Growing cybersecurity threats and compliance requirements',
  'Unreliable IT infrastructure affecting operations',
  'Difficulty making data-driven decisions',
  'High costs of maintaining separate technology systems',
  'Lack of integrated technology ecosystem',
  'Need for scalable solutions that grow with the business',
];

const solutions = [
  {
    icon: Shield,
    title: 'Cybersecurity',
    description: 'Protect your business with quantum-resistant threat intelligence and real-time behavioral analysis.',
    href: '/platforms/cybersecurity',
  },
  {
    icon: Cloud,
    title: 'Cloud Infrastructure',
    description: 'Reliable, scalable cloud hosting for mission-critical workloads.',
    href: '/platforms/cloud-infrastructure',
  },
  {
    icon: Activity,
    title: 'AI & Machine Learning',
    description: 'Adaptive neural systems that learn from your data to improve decisions.',
    href: '/platforms/ai-machine-learning',
  },
  {
    icon: BarChart3,
    title: 'Data Analytics',
    description: 'Real-time dashboards and forecasts for better business intelligence.',
    href: '/platforms/data-analytics',
  },
  {
    icon: Lock,
    title: 'Data Protection',
    description: 'Secure storage, backups, and access controls for sensitive business data.',
    href: '/platforms/cybersecurity/data-security',
  },
  {
    icon: Server,
    title: 'Scalable Operations',
    description: 'Technology that grows with your business without major upfront investment.',
    href: '/platforms/cloud-infrastructure/scaling',
  },
];

const outcomes = [
  'Reduced security incidents',
  'Improved operational efficiency',
  'Better data-driven decisions',
  'Lower IT costs',
  'Scalable infrastructure',
  'Integrated technology ecosystem',
];

export default function SolutionsBusiness() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-cc-darker text-gray-900 dark:text-white">
      <SEO
        title="Business Technology Solutions"
        description="Integrated technology solutions for Zimbabwean businesses. Cybersecurity, cloud, AI, and analytics to help your business operate securely and intelligently."
        keywords={[
          'business technology solutions Zimbabwe',
          'IT solutions business Africa',
          'cybersecurity business solutions',
          'cloud business solutions',
          'AI business solutions Africa',
        ]}
        ogImage="/og-solutions-business.png"
      />
      <ServiceSchema
        name="Business Technology Solutions"
        description="Integrated technology solutions for Zimbabwean businesses - cybersecurity, cloud, AI, and analytics."
        url="https://clawncore.com/solutions/business"
        serviceType="Business Technology Solutions"
      />

      <Header />

      <main>
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-[#0f172a] to-[#1e293b] py-24 sm:py-32 text-white">
          <div className="container mx-auto px-4 sm:px-6">
            <Breadcrumbs
              items={[
                { name: 'Solutions', url: '/solutions' },
                { name: 'Business', url: '/solutions/business' },
              ]}
              className="text-white/70 mb-8"
            />
            <div className="max-w-4xl">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-6">
                Technology Solutions for{' '}
                <span className="text-nvidia-500">Business</span>
              </h1>
              <p className="text-xl sm:text-2xl text-white/90 leading-relaxed mb-8">
                Integrated cybersecurity, cloud, AI, and analytics solutions to help your business operate securely, reliably, and intelligently.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/get-started">
                  <Button className="h-12 px-8 bg-nvidia-500 hover:bg-nvidia-600 text-white font-bold">
                    Get Started
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button variant="outline" className="h-12 px-8 border-white/30 text-white hover:bg-white/10 font-bold">
                    See Pricing
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Challenges */}
        <section className="py-20 sm:py-28">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-black mb-12">
                Challenges Businesses Face
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {challenges.map((challenge) => (
                  <div
                    key={challenge}
                    className="flex items-start gap-4 p-6 rounded-2xl bg-white dark:bg-cc-card border border-gray-200 dark:border-white/10"
                  >
                    <div className="w-2 h-2 rounded-full bg-nvidia-500 mt-2 flex-shrink-0" />
                    <p className="text-gray-700 dark:text-slate-300">{challenge}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Solutions */}
        <section className="py-20 sm:py-28 bg-white dark:bg-cc-card">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-black mb-4">
                How ClawnCore Solves These Challenges
              </h2>
              <p className="text-lg text-gray-600 dark:text-slate-300 max-w-2xl mx-auto">
                Six integrated platforms working together to help your business thrive.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {solutions.map((solution) => (
                <Link key={solution.title} href={solution.href}>
                  <div className="group p-6 rounded-2xl border border-gray-200 dark:border-white/10 hover:border-nvidia-500 transition-colors cursor-pointer h-full">
                    <solution.icon className="h-8 w-8 text-nvidia-500 mb-4" />
                    <h3 className="text-xl font-bold mb-3 group-hover:text-nvidia-500 transition-colors">
                      {solution.title}
                    </h3>
                    <p className="text-gray-600 dark:text-slate-400 leading-relaxed mb-4">
                      {solution.description}
                    </p>
                    <span className="inline-flex items-center gap-1 text-nvidia-500 font-semibold text-sm">
                      Learn more <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Outcomes */}
        <section className="py-20 sm:py-28">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-black mb-12 text-center">
                Expected Outcomes
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {outcomes.map((outcome) => (
                  <div
                    key={outcome}
                    className="text-center p-6 rounded-2xl bg-nvidia-500/10"
                  >
                    <p className="text-lg font-bold text-nvidia-500">{outcome}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 sm:py-28 bg-gradient-to-br from-nvidia-500 to-nvidia-600 text-white">
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl sm:text-4xl font-black mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Get started with an integrated technology ecosystem built for your business.
            </p>
            <Link href="/get-started">
              <Button className="h-12 px-8 bg-white text-nvidia-600 hover:bg-gray-100 font-bold">
                Get Started
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
      <PersistentCTA />
    </div>
  );
}
