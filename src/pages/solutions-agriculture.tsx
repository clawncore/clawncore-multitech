import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PersistentCTA } from '@/components/PersistentCTA';
import { SEO, ServiceSchema } from '@/components/SEO';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Leaf, Map, Droplets, Sprout, Wheat, ShieldCheck, ArrowRight } from 'lucide-react';

const challenges = [
  'Climate variability and unpredictable rainfall patterns',
  'High input costs for fertilizer, chemicals, and water',
  'Limited access to timely crop health information',
  'Pest and disease spread before manual detection',
  'Difficulty tracking yields and seasonal performance',
  'Lack of digital records for financing and insurance',
];

const solutions = [
  {
    icon: Map,
    title: 'Drone Field Scouting',
    description: 'Scan large fields faster than manual walking to identify weak zones, pest damage, and water stress.',
    href: '/platforms/smart-agriculture/drone-scouting',
  },
  {
    icon: Sprout,
    title: 'Crop Health Monitoring',
    description: 'Detect crop stress earlier with drone imagery and AI-powered analysis.',
    href: '/platforms/smart-agriculture/crop-monitoring',
  },
  {
    icon: Droplets,
    title: 'Smart Water Management',
    description: 'Irrigate only where water is needed using moisture readings and weather data.',
    href: '/platforms/smart-agriculture/water-management',
  },
  {
    icon: Leaf,
    title: 'Soil Analytics',
    description: 'Analyze soil conditions to guide fertilizer use, pest control, and planting plans.',
    href: '/platforms/smart-agriculture/soil-analytics',
  },
  {
    icon: Wheat,
    title: 'Farm Records',
    description: 'Track field history, inputs, yields, and performance for better planning.',
    href: '/platforms/smart-agriculture/farm-records',
  },
  {
    icon: ShieldCheck,
    title: 'Data Security',
    description: 'Protect your farm data with secure cloud storage and access controls.',
    href: '/platforms/cybersecurity/data-security',
  },
];

const outcomes = [
  '24% yield improvement target',
  '25% water saving target',
  'Early crop stress alerts',
  'Better harvest decisions',
  'Reduced input waste',
  'Improved financing support',
];

export default function SolutionsAgriculture() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-cc-darker text-gray-900 dark:text-white">
      <SEO
        title="Smart Agriculture Solutions"
        description="Drone-powered precision farming solutions for Zimbabwean farms. Improve yields, reduce waste, and make better harvest decisions with integrated technology."
        keywords={[
          'smart agriculture solutions Zimbabwe',
          'precision farming solutions',
          'drone farming solutions Africa',
          'crop monitoring solutions',
          'agricultural technology solutions',
        ]}
        ogImage="/og-solutions-agriculture.png"
      />
      <ServiceSchema
        name="Smart Agriculture Solutions"
        description="Integrated technology solutions for Zimbabwean farms - drone scouting, crop monitoring, water management, and farm records."
        url="https://clawncore.com/solutions/agriculture"
        serviceType="Agriculture Technology Solutions"
      />

      <Header />

      <main>
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-[#123017] to-[#1a4a1f] py-24 sm:py-32 text-white">
          <div className="container mx-auto px-4 sm:px-6">
            <Breadcrumbs
              items={[
                { name: 'Solutions', url: '/solutions' },
                { name: 'Agriculture', url: '/solutions/agriculture' },
              ]}
              className="text-white/70 mb-8"
            />
            <div className="max-w-4xl">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-6">
                Smart Agriculture Solutions for{' '}
                <span className="text-[#a7f3a0]">Zimbabwe</span>
              </h1>
              <p className="text-xl sm:text-2xl text-white/90 leading-relaxed mb-8">
                Integrated technology solutions helping Zimbabwean farms improve yields, reduce waste, and make better harvest decisions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/get-started">
                  <Button className="h-12 px-8 bg-[#2f7d32] hover:bg-[#256828] text-white font-bold">
                    Start Agriculture Pilot
                  </Button>
                </Link>
                <Link href="/platforms/smart-agriculture">
                  <Button variant="outline" className="h-12 px-8 border-white/30 text-white hover:bg-white/10 font-bold">
                    Learn More
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
                Challenges Zimbabwean Farms Face
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {challenges.map((challenge) => (
                  <div
                    key={challenge}
                    className="flex items-start gap-4 p-6 rounded-2xl bg-white dark:bg-cc-card border border-gray-200 dark:border-white/10"
                  >
                    <div className="w-2 h-2 rounded-full bg-[#2f7d32] mt-2 flex-shrink-0" />
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
                Six integrated platforms working together to help your farm thrive.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {solutions.map((solution) => (
                <Link key={solution.title} href={solution.href}>
                  <div className="group p-6 rounded-2xl border border-gray-200 dark:border-white/10 hover:border-[#2f7d32] transition-colors cursor-pointer h-full">
                    <solution.icon className="h-8 w-8 text-[#2f7d32] mb-4" />
                    <h3 className="text-xl font-bold mb-3 group-hover:text-[#2f7d32] transition-colors">
                      {solution.title}
                    </h3>
                    <p className="text-gray-600 dark:text-slate-400 leading-relaxed mb-4">
                      {solution.description}
                    </p>
                    <span className="inline-flex items-center gap-1 text-[#2f7d32] font-semibold text-sm">
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
                    className="text-center p-6 rounded-2xl bg-[#eef7e8] dark:bg-[#2f7d32]/10"
                  >
                    <p className="text-lg font-bold text-[#2f7d32]">{outcome}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 sm:py-28 bg-gradient-to-br from-[#2f7d32] to-[#256828] text-white">
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl sm:text-4xl font-black mb-6">
              Ready to Transform Your Farm?
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Start with an affordable pilot and see the results for yourself.
            </p>
            <Link href="/get-started">
              <Button className="h-12 px-8 bg-white text-[#2f7d32] hover:bg-gray-100 font-bold">
                Start Agriculture Pilot
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
