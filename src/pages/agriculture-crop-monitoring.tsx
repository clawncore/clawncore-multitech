import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PersistentCTA } from '@/components/PersistentCTA';
import { SEO, ServiceSchema } from '@/components/SEO';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Sprout, TrendingUp, AlertTriangle, BarChart3, CheckCircle } from 'lucide-react';

const features = [
  {
    icon: Sprout,
    title: 'NDVI Analysis',
    description: 'Normalized Difference Vegetation Index maps show crop health across your entire field.',
  },
  {
    icon: TrendingUp,
    title: 'Growth Tracking',
    description: 'Monitor crop development over time with regular drone flights and satellite imagery.',
  },
  {
    icon: AlertTriangle,
    title: 'Stress Alerts',
    description: 'Automatic alerts when crop health indicators drop below optimal thresholds.',
  },
  {
    icon: BarChart3,
    title: 'Yield Prediction',
    description: 'AI-powered yield estimates based on current crop health and historical data.',
  },
];

const benefits = [
  'Detect crop stress 2-3 weeks before visible symptoms',
  'Reduce crop losses through early intervention',
  'Optimize fertilizer and pesticide application',
  'Track crop growth across entire growing season',
  'Make informed harvest timing decisions',
];

export default function AgricultureCropMonitoring() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-cc-darker text-gray-900 dark:text-white">
      <SEO
        title="Crop Health Monitoring"
        description="AI-powered crop health monitoring for Zimbabwean farms. NDVI analysis, growth tracking, stress alerts, and yield prediction."
        keywords={[
          'crop health monitoring Zimbabwe',
          'NDVI crop analysis Africa',
          'precision crop monitoring',
          'crop stress detection',
          'agricultural monitoring system',
        ]}
        ogImage="/og-crop-monitoring.png"
      />
      <ServiceSchema
        name="Crop Health Monitoring"
        description="AI-powered crop health monitoring for Zimbabwean farms - NDVI analysis, growth tracking, stress alerts, and yield prediction."
        url="https://clawncore.com/platforms/smart-agriculture/crop-monitoring"
        serviceType="Crop Health Monitoring"
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
                { name: 'Crop Monitoring', url: '/platforms/smart-agriculture/crop-monitoring' },
              ]}
              className="text-white/70 mb-8"
            />
            <div className="max-w-4xl">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.35em] text-[#a7f3a0]">
                Smart Agriculture Feature
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-6">
                AI-Powered <span className="text-[#a7f3a0]">Crop Health Monitoring</span>
              </h1>
              <p className="text-xl sm:text-2xl text-white/90 leading-relaxed mb-8">
                Detect crop stress earlier with drone imagery and AI-powered analysis to protect your harvest.
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
                How Crop Monitoring Works
              </h2>
              <p className="text-lg text-gray-600 dark:text-slate-300 max-w-2xl mx-auto">
                Regular drone flights and AI analysis keep you informed about your crop health.
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
                Benefits of Crop Monitoring
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
              Start Monitoring Your Crops
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Get early warnings and protect your harvest with AI-powered monitoring.
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
