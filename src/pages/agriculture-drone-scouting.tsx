import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PersistentCTA } from '@/components/PersistentCTA';
import { SEO, ServiceSchema } from '@/components/SEO';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Map, Scan, AlertTriangle, CheckCircle, ArrowRight } from 'lucide-react';

const features = [
  {
    icon: Scan,
    title: 'Multi-Spectral Imaging',
    description: 'Capture detailed field data across multiple light spectrums to detect issues invisible to the naked eye.',
  },
  {
    icon: Map,
    title: 'Field Mapping',
    description: 'Create detailed maps showing soil variation, crop health zones, and drainage patterns.',
  },
  {
    icon: AlertTriangle,
    title: 'Early Stress Detection',
    description: 'Identify pest infestations, disease outbreaks, and nutrient deficiencies before they spread.',
  },
  {
    icon: CheckCircle,
    title: 'GPS-Tagged Reports',
    description: 'Every observation is geotagged for precise field management and follow-up actions.',
  },
];

const useCases = [
  'Large commercial farms covering 500+ hectares',
  'Crop monitoring across multiple fields',
  'Early detection of pest and disease outbreaks',
  'Soil variation mapping for precision input application',
  'Pre-harvest yield estimation',
  'Post-planting crop establishment assessment',
];

export default function AgricultureDroneScouting() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-cc-darker text-gray-900 dark:text-white">
      <SEO
        title="Drone Field Scouting"
        description="AI-powered drone field scouting for Zimbabwean farms. Detect crop stress, pest damage, and water issues early with multi-spectral imaging and field mapping."
        keywords={[
          'drone field scouting Zimbabwe',
          'agricultural drone surveying',
          'crop scouting drone Africa',
          'precision agriculture drones',
          'field mapping drone service',
        ]}
        ogImage="/og-drone-scouting.png"
      />
      <ServiceSchema
        name="Drone Field Scouting"
        description="AI-powered drone field scouting for Zimbabwean farms - detect crop stress, pest damage, and water issues early."
        url="https://clawncore.com/platforms/smart-agriculture/drone-scouting"
        serviceType="Drone Field Scouting"
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
                { name: 'Drone Scouting', url: '/platforms/smart-agriculture/drone-scouting' },
              ]}
              className="text-white/70 mb-8"
            />
            <div className="max-w-4xl">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.35em] text-[#a7f3a0]">
                Smart Agriculture Feature
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-6">
                AI-Powered <span className="text-[#a7f3a0]">Drone Field Scouting</span>
              </h1>
              <p className="text-xl sm:text-2xl text-white/90 leading-relaxed mb-8">
                Scan large fields faster than manual walking to identify weak zones, pest damage, and water stress before they affect your harvest.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/get-started">
                  <Button className="h-12 px-8 bg-[#2f7d32] hover:bg-[#256828] text-white font-bold">
                    Start Pilot
                  </Button>
                </Link>
                <Link href="/solutions/agriculture">
                  <Button variant="outline" className="h-12 px-8 border-white/30 text-white hover:bg-white/10 font-bold">
                    See All Agriculture Solutions
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
                How Drone Scouting Works
              </h2>
              <p className="text-lg text-gray-600 dark:text-slate-300 max-w-2xl mx-auto">
                Drones equipped with advanced sensors scan your fields and provide actionable insights.
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

        {/* Use Cases */}
        <section className="py-20 sm:py-28 bg-white dark:bg-cc-card">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-black mb-12 text-center">
                When to Use Drone Scouting
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {useCases.map((useCase) => (
                  <div
                    key={useCase}
                    className="flex items-start gap-3 p-4 rounded-xl bg-[#eef7e8] dark:bg-[#2f7d32]/10"
                  >
                    <CheckCircle className="h-5 w-5 text-[#2f7d32] mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700 dark:text-slate-300">{useCase}</p>
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
              Start Drone Scouting on Your Farm
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Book a field scan and get your first scouting report within days.
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
