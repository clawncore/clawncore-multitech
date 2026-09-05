import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PersistentCTA } from '@/components/PersistentCTA';
import { SEO, ServiceSchema } from '@/components/SEO';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Shield, AlertTriangle, Eye, Activity, CheckCircle } from 'lucide-react';

const features = [
  {
    icon: Eye,
    title: 'Real-Time Monitoring',
    description: 'Continuous monitoring of network traffic, systems, and user activity for suspicious behavior.',
  },
  {
    icon: AlertTriangle,
    title: 'Threat Intelligence',
    description: 'AI-powered threat detection using global intelligence feeds and local behavioral analysis.',
  },
  {
    icon: Activity,
    title: 'Behavioral Analysis',
    description: 'Machine learning models that detect anomalies and unusual patterns in your systems.',
  },
  {
    icon: Shield,
    title: 'Automated Response',
    description: 'Automatic threat containment and response to minimize damage and recovery time.',
  },
];

const threats = [
  'Ransomware and malware attacks',
  'Phishing and social engineering',
  'Insider threats and unauthorized access',
  'DDoS attacks and network intrusions',
  'Data exfiltration attempts',
];

export default function CybersecurityThreatDetection() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-cc-darker text-gray-900 dark:text-white">
      <SEO
        title="Threat Detection"
        description="AI-powered threat detection for Zimbabwean businesses. Real-time monitoring, behavioral analysis, and automated response to protect your systems."
        keywords={[
          'threat detection Zimbabwe',
          'cybersecurity monitoring Africa',
          'AI threat detection',
          'network security monitoring',
          'business threat protection',
        ]}
        ogImage="/og-threat-detection.png"
      />
      <ServiceSchema
        name="Threat Detection"
        description="AI-powered threat detection for Zimbabwean businesses - real-time monitoring, behavioral analysis, and automated response."
        url="https://clawncore.com/platforms/cybersecurity/threat-detection"
        serviceType="Threat Detection"
      />

      <Header />

      <main>
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-[#0f172a] to-[#1e293b] py-24 sm:py-32 text-white">
          <div className="container mx-auto px-4 sm:px-6">
            <Breadcrumbs
              items={[
                { name: 'Platforms', url: '/platforms' },
                { name: 'Cybersecurity', url: '/platforms/cybersecurity' },
                { name: 'Threat Detection', url: '/platforms/cybersecurity/threat-detection' },
              ]}
              className="text-white/70 mb-8"
            />
            <div className="max-w-4xl">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.35em] text-[#38bdf8]">
                Cybersecurity Feature
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-6">
                AI-Powered <span className="text-[#38bdf8]">Threat Detection</span>
              </h1>
              <p className="text-xl sm:text-2xl text-white/90 leading-relaxed mb-8">
                Real-time monitoring, behavioral analysis, and automated response to protect your business from cyber threats.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/get-started">
                  <Button className="h-12 px-8 bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold">
                    Get Protected
                  </Button>
                </Link>
                <Link href="/solutions/business">
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
                How Threat Detection Works
              </h2>
              <p className="text-lg text-gray-600 dark:text-slate-300 max-w-2xl mx-auto">
                Advanced AI monitors your systems 24/7 to detect and respond to threats.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="p-6 rounded-2xl bg-white dark:bg-cc-card border border-gray-200 dark:border-white/10"
                >
                  <feature.icon className="h-8 w-8 text-[#0284c7] mb-4" />
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-slate-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Threats */}
        <section className="py-20 sm:py-28 bg-white dark:bg-cc-card">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-black mb-12 text-center">
                Threats We Detect
              </h2>
              <div className="space-y-4">
                {threats.map((threat) => (
                  <div
                    key={threat}
                    className="flex items-start gap-3 p-4 rounded-xl bg-[#f0f9ff] dark:bg-[#0284c7]/10"
                  >
                    <Shield className="h-5 w-5 text-[#0284c7] mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700 dark:text-slate-300">{threat}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 sm:py-28 bg-gradient-to-br from-[#0284c7] to-[#0369a1] text-white">
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl sm:text-4xl font-black mb-6">
              Protect Your Business Today
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Get AI-powered threat detection for your organization.
            </p>
            <Link href="/get-started">
              <Button className="h-12 px-8 bg-white text-[#0284c7] hover:bg-gray-100 font-bold">
                Get Protected
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
