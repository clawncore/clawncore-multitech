import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PersistentCTA } from '@/components/PersistentCTA';
import { SEO, ServiceSchema } from '@/components/SEO';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Heart, Cpu, Cloud, Database, Shield, Activity, ArrowRight } from 'lucide-react';

const challenges = [
  'Limited access to modern healthcare technology',
  'Paper-based patient records and reporting',
  'Lack of data for disease surveillance and planning',
  'Security concerns with sensitive patient data',
  'Difficulty connecting rural clinics to central systems',
  'Need for affordable, reliable health IT solutions',
];

const solutions = [
  {
    icon: Cloud,
    title: 'Cloud Health Records',
    description: 'Secure, accessible patient records across clinics, hospitals, and health centers.',
    href: '/platforms/cloud-infrastructure',
  },
  {
    icon: Cpu,
    title: 'AI Diagnostics Support',
    description: 'AI-powered tools to assist healthcare workers with preliminary assessments.',
    href: '/platforms/ai-machine-learning',
  },
  {
    icon: Database,
    title: 'Health Data Analytics',
    description: 'Track disease patterns, patient outcomes, and resource allocation.',
    href: '/platforms/data-analytics',
  },
  {
    icon: Shield,
    title: 'Data Security',
    description: 'Protect sensitive patient information with enterprise-grade security.',
    href: '/platforms/cybersecurity/data-security',
  },
  {
    icon: Activity,
    title: 'Patient Monitoring',
    description: 'Remote patient monitoring tools for rural and underserved areas.',
    href: '/platforms/ai-machine-learning',
  },
  {
    icon: Heart,
    title: 'Health Information Systems',
    description: 'Integrated systems for patient management, billing, and reporting.',
    href: '/platforms/cloud-infrastructure',
  },
];

const outcomes = [
  'Improved patient care quality',
  'Better disease surveillance',
  'Reduced administrative burden',
  'Secure patient records',
  'Data-driven health planning',
  'Connected rural health facilities',
];

export default function SolutionsHealthcare() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-cc-darker text-gray-900 dark:text-white">
      <SEO
        title="Healthcare Technology Solutions"
        description="Technology solutions for Zimbabwean healthcare facilities. Cloud health records, AI diagnostics, and data analytics for better patient outcomes."
        keywords={[
          'healthcare technology solutions Zimbabwe',
          'health information systems Africa',
          'medical records software',
          'hospital management system',
          'health IT solutions Africa',
        ]}
        ogImage="/og-solutions-healthcare.png"
      />
      <ServiceSchema
        name="Healthcare Technology Solutions"
        description="Technology solutions for Zimbabwean healthcare - cloud records, AI diagnostics, health analytics, and data security."
        url="https://clawncore.com/solutions/healthcare"
        serviceType="Healthcare Technology Solutions"
      />

      <Header />

      <main>
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-[#0f172a] to-[#1e3a5f] py-24 sm:py-32 text-white">
          <div className="container mx-auto px-4 sm:px-6">
            <Breadcrumbs
              items={[
                { name: 'Solutions', url: '/solutions' },
                { name: 'Healthcare', url: '/solutions/healthcare' },
              ]}
              className="text-white/70 mb-8"
            />
            <div className="max-w-4xl">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-6">
                Technology Solutions for{' '}
                <span className="text-[#f87171]">Healthcare</span>
              </h1>
              <p className="text-xl sm:text-2xl text-white/90 leading-relaxed mb-8">
                Cloud health records, AI diagnostics support, and data analytics for Zimbabwean clinics, hospitals, and health centers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/get-started">
                  <Button className="h-12 px-8 bg-[#dc2626] hover:bg-[#b91c1c] text-white font-bold">
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
                Challenges Healthcare Facilities Face
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {challenges.map((challenge) => (
                  <div
                    key={challenge}
                    className="flex items-start gap-4 p-6 rounded-2xl bg-white dark:bg-cc-card border border-gray-200 dark:border-white/10"
                  >
                    <div className="w-2 h-2 rounded-full bg-[#dc2626] mt-2 flex-shrink-0" />
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
                Technology designed for Zimbabwean healthcare facilities.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {solutions.map((solution) => (
                <Link key={solution.title} href={solution.href}>
                  <div className="group p-6 rounded-2xl border border-gray-200 dark:border-white/10 hover:border-[#dc2626] transition-colors cursor-pointer h-full">
                    <solution.icon className="h-8 w-8 text-[#dc2626] mb-4" />
                    <h3 className="text-xl font-bold mb-3 group-hover:text-[#dc2626] transition-colors">
                      {solution.title}
                    </h3>
                    <p className="text-gray-600 dark:text-slate-400 leading-relaxed mb-4">
                      {solution.description}
                    </p>
                    <span className="inline-flex items-center gap-1 text-[#dc2626] font-semibold text-sm">
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
                    className="text-center p-6 rounded-2xl bg-[#dc2626]/10"
                  >
                    <p className="text-lg font-bold text-[#dc2626]">{outcome}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 sm:py-28 bg-gradient-to-br from-[#dc2626] to-[#b91c1c] text-white">
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl sm:text-4xl font-black mb-6">
              Ready to Modernize Your Healthcare Facility?
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Get started with health IT designed for Zimbabwean healthcare.
            </p>
            <Link href="/get-started">
              <Button className="h-12 px-8 bg-white text-[#dc2626] hover:bg-gray-100 font-bold">
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
