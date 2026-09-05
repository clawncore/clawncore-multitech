import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PersistentCTA } from '@/components/PersistentCTA';
import { SEO, ServiceSchema } from '@/components/SEO';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Lock, Key, UserCheck, Shield, CheckCircle } from 'lucide-react';

const features = [
  {
    icon: Key,
    title: 'Multi-Factor Authentication',
    description: 'Secure access with multiple verification factors to prevent unauthorized login.',
  },
  {
    icon: UserCheck,
    title: 'Access Control',
    description: 'Role-based permissions ensuring users only access what they need.',
  },
  {
    icon: Lock,
    title: 'Identity Management',
    description: 'Centralized user management with single sign-on and provisioning.',
  },
  {
    icon: Shield,
    title: 'Privileged Access',
    description: 'Special protection for admin accounts and sensitive system access.',
  },
];

const benefits = [
  'Prevent unauthorized access to systems',
  'Meet compliance requirements',
  'Reduce risk of data breaches',
  'Simplify user management',
  'Enable secure remote work',
];

export default function CybersecurityIdentityProtection() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-cc-darker text-gray-900 dark:text-white">
      <SEO
        title="Identity Protection"
        description="Enterprise identity and access management for Zimbabwean businesses. Multi-factor authentication, access control, and privileged access protection."
        keywords={[
          'identity protection Zimbabwe',
          'access management Africa',
          'multi-factor authentication',
          'IAM solutions business',
          'identity security Africa',
        ]}
        ogImage="/og-identity-protection.png"
      />
      <ServiceSchema
        name="Identity Protection"
        description="Enterprise identity and access management for Zimbabwean businesses - MFA, access control, and privileged access protection."
        url="https://clawncore.com/platforms/cybersecurity/identity-protection"
        serviceType="Identity Protection"
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
                { name: 'Identity Protection', url: '/platforms/cybersecurity/identity-protection' },
              ]}
              className="text-white/70 mb-8"
            />
            <div className="max-w-4xl">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.35em] text-[#38bdf8]">
                Cybersecurity Feature
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-6">
                Enterprise <span className="text-[#38bdf8]">Identity Protection</span>
              </h1>
              <p className="text-xl sm:text-2xl text-white/90 leading-relaxed mb-8">
                Multi-factor authentication, access control, and privileged access management to secure your organization.
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
                How Identity Protection Works
              </h2>
              <p className="text-lg text-gray-600 dark:text-slate-300 max-w-2xl mx-auto">
                Comprehensive identity management to secure access to your systems.
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

        {/* Benefits */}
        <section className="py-20 sm:py-28 bg-white dark:bg-cc-card">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-black mb-12 text-center">
                Benefits of Identity Protection
              </h2>
              <div className="space-y-4">
                {benefits.map((benefit) => (
                  <div
                    key={benefit}
                    className="flex items-start gap-3 p-4 rounded-xl bg-[#f0f9ff] dark:bg-[#0284c7]/10"
                  >
                    <CheckCircle className="h-5 w-5 text-[#0284c7] mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700 dark:text-slate-300">{benefit}</p>
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
              Secure Your Organization
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Get enterprise identity protection for your business.
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
