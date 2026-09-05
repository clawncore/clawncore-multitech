import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PersistentCTA } from '@/components/PersistentCTA';
import { SEO, ServiceSchema } from '@/components/SEO';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Droplets, CloudRain, Gauge, Map, CheckCircle } from 'lucide-react';

const features = [
  {
    icon: Gauge,
    title: 'Moisture Sensors',
    description: 'Real-time soil moisture readings to determine exactly when and where to irrigate.',
  },
  {
    icon: CloudRain,
    title: 'Weather Integration',
    description: 'Combine weather forecasts with soil data to optimize irrigation scheduling.',
  },
  {
    icon: Map,
    title: 'Zone-Based Irrigation',
    description: 'Apply water only where needed using field maps that show moisture variation.',
  },
  {
    icon: Droplets,
    title: 'Water Usage Tracking',
    description: 'Monitor water consumption and identify opportunities for conservation.',
  },
];

const outcomes = [
  'Reduce water waste by up to 25%',
  'Improve crop health through optimal irrigation',
  'Lower water costs and energy expenses',
  'Support sustainable farming practices',
  'Make better irrigation decisions with data',
];

export default function AgricultureWaterManagement() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-cc-darker text-gray-900 dark:text-white">
      <SEO
        title="Smart Water Management"
        description="Intelligent water management for Zimbabwean farms. Moisture sensors, weather integration, and zone-based irrigation to optimize water use."
        keywords={[
          'smart water management Zimbabwe',
          'precision irrigation Africa',
          'soil moisture monitoring',
          'water conservation farming',
          'irrigation management system',
        ]}
        ogImage="/og-water-management.png"
      />
      <ServiceSchema
        name="Smart Water Management"
        description="Intelligent water management for Zimbabwean farms - moisture sensors, weather integration, and zone-based irrigation."
        url="https://clawncore.com/platforms/smart-agriculture/water-management"
        serviceType="Smart Water Management"
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
                { name: 'Water Management', url: '/platforms/smart-agriculture/water-management' },
              ]}
              className="text-white/70 mb-8"
            />
            <div className="max-w-4xl">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.35em] text-[#a7f3a0]">
                Smart Agriculture Feature
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-6">
                <span className="text-[#a7f3a0]">Smart Water Management</span> for Farms
              </h1>
              <p className="text-xl sm:text-2xl text-white/90 leading-relaxed mb-8">
                Irrigate only where water is needed using moisture readings and weather data to save water and improve yields.
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
                How Smart Water Management Works
              </h2>
              <p className="text-lg text-gray-600 dark:text-slate-300 max-w-2xl mx-auto">
                Data-driven irrigation that saves water while keeping crops healthy.
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

        {/* Outcomes */}
        <section className="py-20 sm:py-28 bg-white dark:bg-cc-card">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-black mb-12 text-center">
                Expected Outcomes
              </h2>
              <div className="space-y-4">
                {outcomes.map((outcome) => (
                  <div
                    key={outcome}
                    className="flex items-start gap-3 p-4 rounded-xl bg-[#eef7e8] dark:bg-[#2f7d32]/10"
                  >
                    <CheckCircle className="h-5 w-5 text-[#2f7d32] mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700 dark:text-slate-300">{outcome}</p>
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
              Start Saving Water on Your Farm
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Optimize irrigation and improve yields with smart water management.
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
