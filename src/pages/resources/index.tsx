import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PersistentCTA } from '@/components/PersistentCTA';
import { SEO } from '@/components/SEO';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Link } from 'wouter';
import { BookOpen, HelpCircle, FileText, ArrowRight, Sprout, Shield, Cloud, Activity } from 'lucide-react';

const guides = [
  {
    icon: Sprout,
    title: 'Smart Agriculture Guide',
    description: 'Comprehensive guide to precision farming, drone scouting, crop monitoring, and agricultural technology for Zimbabwean farms.',
    href: '/resources/guides/smart-agriculture-guide',
    color: '#2f7d32',
  },
  {
    icon: Shield,
    title: 'Cybersecurity Guide',
    description: 'Complete guide to protecting your business from cyber threats — threat detection, data security, and building a security culture.',
    href: '/resources/guides/cybersecurity-guide',
    color: '#0284c7',
  },
  {
    icon: Cloud,
    title: 'Cloud Migration Guide',
    description: 'Practical guide to moving your business to the cloud — planning, choosing providers, security, and cost optimization.',
    href: '/resources/guides/cloud-migration-guide',
    color: '#2563eb',
  },
  {
    icon: Activity,
    title: 'AI Implementation Guide',
    description: 'How to implement artificial intelligence in your organization — from data preparation to deployment and responsible AI use.',
    href: '/resources/guides/ai-implementation',
    color: '#76B900',
  },
];

const faqCategories = [
  {
    icon: HelpCircle,
    title: 'General FAQ',
    description: 'Common questions about ClawnCore, our platforms, pricing, and how to get started.',
    href: '/resources/faq/general',
    count: 10,
  },
  {
    icon: Sprout,
    title: 'Agriculture FAQ',
    description: 'Questions about smart agriculture, drone scouting, crop monitoring, and precision farming.',
    href: '/resources/faq/agriculture',
    count: 10,
  },
  {
    icon: Shield,
    title: 'Cybersecurity FAQ',
    description: 'Questions about cybersecurity, threat detection, data protection, and security best practices.',
    href: '/resources/faq/cybersecurity',
    count: 10,
  },
  {
    icon: Cloud,
    title: 'Cloud FAQ',
    description: 'Questions about cloud computing, migration, hosting, and cloud security.',
    href: '/resources/faq/cloud',
    count: 10,
  },
];

export default function ResourcesIndex() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-cc-darker text-gray-900 dark:text-white">
      <SEO
        title="Resources"
        description="Guides, FAQs, and educational resources from ClawnCore Multitech. Learn about agriculture technology, cybersecurity, cloud computing, and AI for Zimbabwe and Africa."
        keywords={['technology resources Zimbabwe', 'IT guides Africa', 'business technology learning', 'ClawnCore resources']}
        ogImage="/og-resources.png"
      />

      <Header />

      <main>
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-[#0f172a] to-[#1e293b] py-24 sm:py-32 text-white">
          <div className="container mx-auto px-4 sm:px-6">
            <Breadcrumbs
              items={[
                { name: 'Resources', url: '/resources' },
              ]}
              className="text-white/70 mb-8"
            />
            <div className="max-w-4xl">
              <BookOpen className="h-12 w-12 text-nvidia-500 mb-6" />
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-6">
                Learning <span className="text-nvidia-500">Resources</span>
              </h1>
              <p className="text-xl sm:text-2xl text-white/90 leading-relaxed">
                Comprehensive guides, frequently asked questions, and educational content to help you understand and use technology effectively.
              </p>
            </div>
          </div>
        </section>

        {/* Guides */}
        <section className="py-20 sm:py-28">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="h-6 w-6 text-nvidia-500" />
                <h2 className="text-3xl sm:text-4xl font-black">Comprehensive Guides</h2>
              </div>
              <p className="text-lg text-gray-600 dark:text-slate-300 max-w-2xl">
                In-depth guides covering everything you need to know about each technology area.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-8">
              {guides.map((guide) => (
                <Link key={guide.title} href={guide.href}>
                  <div className="group p-6 rounded-2xl bg-white dark:bg-cc-card border border-gray-200 dark:border-white/10 hover:shadow-lg transition-shadow cursor-pointer h-full">
                    <guide.icon className="h-8 w-8 mb-4" style={{ color: guide.color }} />
                    <h3 className="text-xl font-bold mb-3 group-hover:text-nvidia-500 transition-colors">
                      {guide.title}
                    </h3>
                    <p className="text-gray-600 dark:text-slate-400 leading-relaxed mb-4">
                      {guide.description}
                    </p>
                    <span className="inline-flex items-center gap-1 text-nvidia-500 font-semibold text-sm">
                      Read guide <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 sm:py-28 bg-white dark:bg-cc-card">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <HelpCircle className="h-6 w-6 text-nvidia-500" />
                <h2 className="text-3xl sm:text-4xl font-black">Frequently Asked Questions</h2>
              </div>
              <p className="text-lg text-gray-600 dark:text-slate-300 max-w-2xl">
                Quick answers to common questions about our platforms and services.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {faqCategories.map((faq) => (
                <Link key={faq.title} href={faq.href}>
                  <div className="group flex items-start gap-4 p-6 rounded-2xl border border-gray-200 dark:border-white/10 hover:border-nvidia-500 transition-colors cursor-pointer">
                    <faq.icon className="h-6 w-6 text-nvidia-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-bold mb-2 group-hover:text-nvidia-500 transition-colors">
                        {faq.title}
                      </h3>
                      <p className="text-gray-600 dark:text-slate-400 text-sm leading-relaxed">
                        {faq.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Blog CTA */}
        <section className="py-20 sm:py-28">
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <FileText className="h-12 w-12 text-nvidia-500 mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl font-black mb-4">Read Our Blog</h2>
            <p className="text-lg text-gray-600 dark:text-slate-300 max-w-2xl mx-auto mb-8">
              Stay updated with the latest insights, news, and articles on technology for Zimbabwe and Africa.
            </p>
            <Link href="/blog">
              <span className="inline-flex items-center gap-2 h-12 px-8 bg-nvidia-500 hover:bg-nvidia-600 text-white font-bold rounded-lg cursor-pointer transition-colors">
                Visit Blog <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
      <PersistentCTA />
    </div>
  );
}
