import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PersistentCTA } from '@/components/PersistentCTA';
import { SEO, ServiceSchema } from '@/components/SEO';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Wheat, FileText, TrendingUp, Database, CheckCircle } from 'lucide-react';

const features = [
  {
    icon: FileText,
    title: 'Digital Field Records',
    description: 'Track planting dates, inputs, activities, and observations for every field.',
  },
  {
    icon: TrendingUp,
    title: 'Yield Tracking',
    description: 'Record and compare yields across seasons to identify improvement opportunities.',
  },
  {
    icon: Database,
    title: 'Input Management',
    description: 'Log fertilizer, chemical, and seed applications with cost tracking.',
  },
  {
    icon: Wheat,
    title: 'Season Comparisons',
    description: 'Compare performance across seasons to optimize your farming strategy.',
  },
];

const benefits = [
  'Replace paper records with searchable digital data',
  'Track costs and returns for each field',
  'Support financing and insurance applications',
  'Make data-driven decisions for next season',
  'Maintain compliance with food safety standards',
];

export default function AgricultureFarmRecords() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-cc-darker text-gray-900 dark:text-white">
      <SEO
        title="Farm Records"
        description="Digital farm records for Zimbabwean farms. Track field history, inputs, yields, and performance for better planning and financing."
        keywords={[
          'farm records management Zimbabwe',
          'digital farm records Africa',
          'crop tracking software',
          'farm management records',
          'agricultural record keeping',
        ]}
        ogImage="/og-farm-records.png"
      />
      <ServiceSchema
        name="Farm Records"
        description="Digital farm records for Zimbabwean farms - track field history, inputs, yields, and performance."
        url="https://clawncore.com/platforms/smart-agriculture/farm-records"
        serviceType="Farm Records"
      />

      <Header />

      <main>
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-[#0f2318] to-[#1a3d25] py-24 sm:py-32 text-white">
          <div className="container mx-auto px-4 sm:px-6">
            <Breadcrumbs
              items={[
                { name: 'Platforms', url: '/platforms' },
                { name: 'Smart Agriculture', url: '/platforms/smart-agriculture' },
                { name: 'Farm Records', url: '/platforms/smart-agriculture/farm-records' },
              ]}
              className="text-white/70 mb-8"
            />
            <div className="max-w-4xl">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.35em] text-[#a7f3a0]">
                Smart Agriculture Feature
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-6">
                Digital <span className="text-[#a7f3a0]">Farm Records</span> for Better Decisions
              </h1>
              <p className="text-xl sm:text-2xl text-white/90 leading-relaxed mb-8">
                Track field history, inputs, yields, and performance for better planning and financing.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/get-started">
                  <Button className="h-12 px-8 bg-[#2f7d32] hover:bg-[#256828] text-white font-bold">
                    Start Pilot
                  </Button>
                </Link>
                <Link href="/solutions/agriculture">
                  <Button variant="outline" className="h-12 px-8 border-white/30 text-white hover:bg-white/10 font-bold">
                    See All Solutions
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 sm:py-28">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-black mb-4">
                How Farm Records Work
              </h2>
              <p className="text-lg text-gray-600 dark:text-slate-300 max-w-2xl mx-auto">
                Simple digital tools to track everything happening on your farm.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="p-6 rounded-2xl bg-white dark:bg-cc-card border border-gray-200 dark:border-white/10"
                >
                  <feature.icon className="h-8 w-8 text-[#2f7d32] mb-4" />
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-slate-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 sm:py-28 bg-white dark:bg-cc-card">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-black mb-12 text-center">
                Benefits of Digital Farm Records
              </h2>
              <div className="space-y-4">
                {benefits.map((benefit) => (
                  <div
                    key={benefit}
                    className="flex items-start gap-3 p-4 rounded-xl bg-[#eef7e8] dark:bg-[#2f7d32]/10"
                  >
                    <CheckCircle className="h-5 w-5 text-[#2f7d32] mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700 dark:text-slate-300">{benefit}</p>
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
              Start Recording Your Farm Data
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Replace paper records with searchable digital data.
            </p>
            <Link href="/get-started">
              <Button className="h-12 px-8 bg-white text-[#2f7d32] hover:bg-gray-100 font-bold">
                Start Pilot
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
