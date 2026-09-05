import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PersistentCTA } from '@/components/PersistentCTA';
import { SEO, ServiceSchema } from '@/components/SEO';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { GraduationCap, Activity, Cloud, Database, Shield, Wifi, ArrowRight } from 'lucide-react';

const challenges = [
  'Limited access to modern learning tools and resources',
  'Poor internet connectivity in rural areas',
  'Lack of data-driven insights on student performance',
  'Difficulty managing school operations digitally',
  'Security concerns with student and staff data',
  'Need for affordable, scalable technology solutions',
];

const solutions = [
  {
    icon: Activity,
    title: 'AI-Powered Learning',
    description: 'Personalized learning tools and intelligent tutoring systems adapted to Zimbabwean curricula.',
    href: '/platforms/ai-machine-learning',
  },
  {
    icon: Cloud,
    title: 'Cloud School Systems',
    description: 'Manage student records, grades, attendance, and administration from anywhere.',
    href: '/platforms/cloud-infrastructure',
  },
  {
    icon: Database,
    title: 'Student Data Analytics',
    description: 'Track performance, identify at-risk students, and improve teaching outcomes.',
    href: '/platforms/data-analytics',
  },
  {
    icon: Shield,
    title: 'Data Security',
    description: 'Protect sensitive student records, staff data, and institutional information.',
    href: '/platforms/cybersecurity/data-security',
  },
  {
    icon: Wifi,
    title: 'Connectivity Solutions',
    description: 'Reliable cloud infrastructure designed for areas with intermittent connectivity.',
    href: '/platforms/cloud-infrastructure',
  },
  {
    icon: GraduationCap,
    title: 'Digital Records',
    description: 'Digitize certificates, transcripts, and institutional records for easy access.',
    href: '/platforms/cloud-infrastructure',
  },
];

const outcomes = [
  'Improved student learning outcomes',
  'Better teacher effectiveness',
  'Reduced administrative burden',
  'Secure digital records',
  'Data-driven school management',
  'Scalable education technology',
];

export default function SolutionsEducation() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-cc-darker text-gray-900 dark:text-white">
      <SEO
        title="Education Technology Solutions"
        description="Technology solutions for Zimbabwean schools, universities, and training institutions. Cloud systems, AI learning tools, and data analytics for education."
        keywords={[
          'education technology solutions Zimbabwe',
          'school management software Africa',
          'EdTech solutions Africa',
          'student management system',
          'school cloud solutions',
        ]}
        ogImage="/og-solutions-education.png"
      />
      <ServiceSchema
        name="Education Technology Solutions"
        description="Technology solutions for Zimbabwean schools - cloud systems, AI learning tools, student analytics, and digital records."
        url="https://clawncore.com/solutions/education"
        serviceType="Education Technology Solutions"
      />

      <Header />

      <main>
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-[#1a1040] to-[#2d1b69] py-24 sm:py-32 text-white">
          <div className="container mx-auto px-4 sm:px-6">
            <Breadcrumbs
              items={[
                { name: 'Solutions', url: '/solutions' },
                { name: 'Education', url: '/solutions/education' },
              ]}
              className="text-white/70 mb-8"
            />
            <div className="max-w-4xl">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-6">
                Technology Solutions for{' '}
                <span className="text-[#a78bfa]">Education</span>
              </h1>
              <p className="text-xl sm:text-2xl text-white/90 leading-relaxed mb-8">
                Cloud systems, AI learning tools, and data analytics for Zimbabwean schools, universities, and training institutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/get-started">
                  <Button className="h-12 px-8 bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-bold">
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
                Challenges Education Institutions Face
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {challenges.map((challenge) => (
                  <div
                    key={challenge}
                    className="flex items-start gap-4 p-6 rounded-2xl bg-white dark:bg-cc-card border border-gray-200 dark:border-white/10"
                  >
                    <div className="w-2 h-2 rounded-full bg-[#7c3aed] mt-2 flex-shrink-0" />
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
                Technology designed for Zimbabwean educational institutions.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {solutions.map((solution) => (
                <Link key={solution.title} href={solution.href}>
                  <div className="group p-6 rounded-2xl border border-gray-200 dark:border-white/10 hover:border-[#7c3aed] transition-colors cursor-pointer h-full">
                    <solution.icon className="h-8 w-8 text-[#7c3aed] mb-4" />
                    <h3 className="text-xl font-bold mb-3 group-hover:text-[#7c3aed] transition-colors">
                      {solution.title}
                    </h3>
                    <p className="text-gray-600 dark:text-slate-400 leading-relaxed mb-4">
                      {solution.description}
                    </p>
                    <span className="inline-flex items-center gap-1 text-[#7c3aed] font-semibold text-sm">
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
                    className="text-center p-6 rounded-2xl bg-[#7c3aed]/10"
                  >
                    <p className="text-lg font-bold text-[#7c3aed]">{outcome}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 sm:py-28 bg-gradient-to-br from-[#7c3aed] to-[#6d28d9] text-white">
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl sm:text-4xl font-black mb-6">
              Ready to Modernize Your Institution?
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Get started with education technology designed for Zimbabwean schools.
            </p>
            <Link href="/get-started">
              <Button className="h-12 px-8 bg-white text-[#7c3aed] hover:bg-gray-100 font-bold">
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
