import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PersistentCTA } from '@/components/PersistentCTA';
import { SEO, ServiceSchema } from '@/components/SEO';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Shield, Lock, BarChart3, Brain, Database, Cloud, ArrowRight, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

const challenges = [
  'Rising cyber threats targeting financial data and transactions',
  'Regulatory compliance requirements (Data Protection Act, PCI DSS)',
  'Need for real-time fraud detection and prevention',
  'Legacy systems that cannot scale with digital growth',
  'Managing risk across multiple branches and channels',
  'Customer demand for digital banking and payment services',
];

const solutions = [
  {
    icon: Shield,
    title: 'Cybersecurity & Compliance',
    description: 'Protect financial data with enterprise security, meet regulatory requirements, and prevent fraud with AI-powered threat detection.',
    href: '/platforms/cybersecurity',
  },
  {
    icon: Brain,
    title: 'AI Fraud Detection',
    description: 'Machine learning models that detect suspicious transactions, unusual patterns, and potential fraud in real-time.',
    href: '/platforms/ai-machine-learning',
  },
  {
    icon: BarChart3,
    title: 'Financial Analytics',
    description: 'Real-time dashboards for portfolio performance, risk assessment, customer behavior, and operational metrics.',
    href: '/platforms/data-analytics',
  },
  {
    icon: Cloud,
    title: 'Secure Cloud Infrastructure',
    description: 'Reliable, compliant cloud hosting for banking applications, mobile money platforms, and financial systems.',
    href: '/platforms/cloud-infrastructure',
  },
  {
    icon: Lock,
    title: 'Data Encryption',
    description: 'AES-256 encryption for data at rest and in transit. Protect customer records, transactions, and sensitive financial data.',
    href: '/platforms/cybersecurity/data-security',
  },
  {
    icon: Database,
    title: 'Data Management',
    description: 'Centralized, secure data storage with backup, recovery, and access controls for financial records.',
    href: '/platforms/cloud-infrastructure',
  },
];

const stats = [
  { value: '73%', label: 'of African financial institutions experienced cyber attacks in 2025' },
  { value: '$4.3M', label: 'average cost of a financial services data breach' },
  { value: '300%', label: 'increase in digital fraud across Africa since 2023' },
];

export default function IndustryFinance() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-cc-darker text-gray-900 dark:text-white">
      <SEO
        title="Financial Services Technology Solutions"
        description="Cybersecurity, AI fraud detection, and data analytics for Zimbabwean banks, fintechs, microfinance, and insurance companies."
        keywords={['fintech solutions Zimbabwe', 'banking cybersecurity Africa', 'financial services IT', 'fraud detection software', 'bank technology solutions']}
        ogImage="/og-industry-finance.png"
      />
      <ServiceSchema
        name="Financial Services Technology"
        description="Cybersecurity, AI fraud detection, analytics, and cloud infrastructure for Zimbabwean financial institutions."
        url="https://clawncore.com/industries/finance"
        serviceType="Financial Services Technology"
      />

      <Header />

      <main>
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-[#0f172a] to-[#1e293b] py-24 sm:py-32 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-15">
            <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=2200&q=85" alt="" className="h-full w-full object-cover" />
          </div>
          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <Breadcrumbs
              items={[
                { name: 'Industries', url: '/industries' },
                { name: 'Financial Services', url: '/industries/finance' },
              ]}
              className="text-white/70 mb-8"
            />
            <div className="max-w-4xl">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.35em] text-[#38bdf8]">Industry Solutions</p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-6">
                Technology for <span className="text-[#38bdf8]">Financial Services</span>
              </h1>
              <p className="text-xl sm:text-2xl text-white/90 leading-relaxed mb-8">
                Cybersecurity, AI fraud detection, real-time analytics, and secure cloud infrastructure for banks, fintechs, and financial institutions in Zimbabwe.
              </p>
              <Link href="/get-started">
                <Button className="h-12 px-8 bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-white dark:bg-cc-card">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {stats.map((stat) => (
                <div key={stat.value} className="text-center">
                  <p className="text-4xl font-black text-[#0284c7] mb-2">{stat.value}</p>
                  <p className="text-sm text-[#46586b] dark:text-slate-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Challenges */}
        <section className="py-20 sm:py-28">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <div>
                <h2 className="text-3xl sm:text-4xl font-black mb-8">Challenges in Financial Services</h2>
                <div className="grid sm:grid-cols-1 gap-4">
                  {challenges.map((challenge) => (
                    <div
                      key={challenge}
                      className="flex items-start gap-3 p-4 rounded-xl bg-white dark:bg-cc-card border border-gray-200 dark:border-white/10"
                    >
                      <AlertTriangle className="h-5 w-5 text-[#0284c7] mt-0.5 flex-shrink-0" />
                      <p className="text-[#46586b] dark:text-slate-300 text-sm">{challenge}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=85"
                  alt="Financial technology and digital banking"
                  className="w-full h-full min-h-[400px] object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Solutions */}
        <section className="py-20 sm:py-28 bg-white dark:bg-cc-card">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-black mb-4">How ClawnCore Serves Financial Services</h2>
              <p className="text-lg text-gray-600 dark:text-slate-300 max-w-2xl mx-auto">
                Integrated technology solutions designed for the unique needs of financial institutions.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {solutions.map((solution) => (
                <Link key={solution.title} href={solution.href}>
                  <div className="group p-6 rounded-2xl border border-gray-200 dark:border-white/10 hover:border-[#0284c7] transition-colors cursor-pointer h-full">
                    <solution.icon className="h-8 w-8 text-[#0284c7] mb-4" />
                    <h3 className="text-xl font-bold mb-3 group-hover:text-[#0284c7] transition-colors">{solution.title}</h3>
                    <p className="text-gray-600 dark:text-slate-400 leading-relaxed text-sm mb-4">{solution.description}</p>
                    <span className="inline-flex items-center gap-1 text-[#0284c7] font-semibold text-sm">
                      Learn more <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 sm:py-28 bg-gradient-to-br from-[#0284c7] to-[#0369a1] text-white">
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl sm:text-4xl font-black mb-6">Secure Your Financial Operations</h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Get a security assessment and technology roadmap for your financial institution.
            </p>
            <Link href="/get-started">
              <Button className="h-12 px-8 bg-white text-[#0284c7] hover:bg-gray-100 font-bold">Get Started</Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
      <PersistentCTA />
    </div>
  );
}
