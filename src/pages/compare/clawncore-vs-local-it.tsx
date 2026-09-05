import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PersistentCTA } from '@/components/PersistentCTA';
import { SEO, FAQSchema } from '@/components/SEO';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, ArrowRight, Shield, Cloud, Brain, Layers } from 'lucide-react';

const comparisons = [
  { feature: 'Integrated 6-platform ecosystem', clawncore: true, local: false },
  { feature: 'AI-powered analytics and automation', clawncore: true, local: false },
  { feature: 'Enterprise cybersecurity included', clawncore: true, local: false },
  { feature: 'Scalable cloud infrastructure', clawncore: true, local: false },
  { feature: 'Ongoing platform updates and support', clawncore: true, local: false },
  { feature: 'Single dashboard for all services', clawncore: true, local: false },
  { feature: 'Low upfront cost (monthly pricing)', clawncore: true, local: false },
  { feature: 'Established local relationships', clawncore: false, local: true },
  { feature: 'One-time project delivery', clawncore: false, local: true },
];

const faqs = [
  {
    question: 'Why not just hire a local IT company?',
    answer: 'Local IT companies are great for one-off projects and hardware support. But they typically cannot provide: an integrated software ecosystem, AI-powered analytics, enterprise-grade cybersecurity, or scalable cloud infrastructure. ClawnCore fills the gap between what local IT companies offer and what global platforms provide.',
  },
  {
    question: 'Can local IT companies work with ClawnCore?',
    answer: 'Absolutely. Many local IT companies become ClawnCore partners, using our platform as the foundation for their client solutions. This gives them access to enterprise technology while maintaining their client relationships.',
  },
  {
    question: 'What about ongoing support?',
    answer: 'ClawnCore provides continuous platform support, updates, and training. Unlike one-off project delivery from local IT, our support is ongoing and included in your subscription. You also get access to ClawnAcademy for self-service learning.',
  },
];

export default function ClawnCoreVsLocalIT() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-cc-darker text-gray-900 dark:text-white">
      <SEO
        title="ClawnCore vs Local IT Providers: What's the Difference?"
        description="Compare ClawnCore's integrated technology ecosystem with traditional local IT service providers in Zimbabwe. Understand when to use each."
        keywords={['ClawnCore vs local IT', 'IT company comparison Zimbabwe', 'managed services vs local IT', 'technology provider comparison']}
      />
      <FAQSchema faqs={faqs} />

      <Header />

      <main>
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-[#0f172a] to-[#1e293b] py-24 sm:py-32 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <img src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=2200&q=85" alt="" className="h-full w-full object-cover" />
          </div>
          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <Breadcrumbs
              items={[
                { name: 'Compare', url: '/compare' },
                { name: 'ClawnCore vs Local IT', url: '/compare/clawncore-vs-local-it' },
              ]}
              className="text-white/70 mb-8"
            />
            <div className="max-w-4xl">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-6">
                <span className="text-nvidia-500">ClawnCore</span> vs Local IT Providers
              </h1>
              <p className="text-xl sm:text-2xl text-white/90 leading-relaxed">
                Not a replacement — a complement. Here is how ClawnCore's platform differs from traditional local IT service delivery.
              </p>
            </div>
          </div>
        </section>

        {/* Explanation with image */}
        <section className="py-20 sm:py-28">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=85"
                  alt="Technology team collaboration"
                  className="w-full aspect-[4/3] object-cover"
                />
              </div>
              <div>
                <h2 className="text-3xl font-black mb-6">Two Different Models</h2>
                <p className="text-[#46586b] dark:text-slate-300 leading-relaxed mb-4">
                  <strong>Local IT providers</strong> deliver projects: set up your network, build your website, fix your computers, install your software. They are excellent at hands-on technical work and understand local business relationships.
                </p>
                <p className="text-[#46586b] dark:text-slate-300 leading-relaxed mb-4">
                  <strong>ClawnCore</strong> provides a platform: an integrated ecosystem of 6 technology platforms that run continuously — monitoring your security, analyzing your data, hosting your systems, and running AI models. It is software-as-a-service, not project delivery.
                </p>
                <p className="text-[#46586b] dark:text-slate-300 leading-relaxed">
                  The best results come from using both: your local IT partner handles hardware and relationships, while ClawnCore provides the integrated technology platform that powers your operations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-20 sm:py-28 bg-white dark:bg-cc-card">
          <div className="container mx-auto px-4 sm:px-6">
            <h2 className="text-3xl sm:text-4xl font-black mb-12 text-center">Side by Side</h2>
            <div className="max-w-3xl mx-auto overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200 dark:border-white/10">
                    <th className="text-left py-4 px-4 font-bold">Capability</th>
                    <th className="text-center py-4 px-4 font-bold text-nvidia-500">ClawnCore</th>
                    <th className="text-center py-4 px-4 font-bold text-[#64748b]">Local IT</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisons.map((row) => (
                    <tr key={row.feature} className="border-b border-gray-100 dark:border-white/5">
                      <td className="py-4 px-4 text-[#46586b] dark:text-slate-300">{row.feature}</td>
                      <td className="py-4 px-4 text-center">
                        {row.clawncore ? <CheckCircle className="h-5 w-5 text-green-500 mx-auto" /> : <XCircle className="h-5 w-5 text-gray-300 dark:text-slate-600 mx-auto" />}
                      </td>
                      <td className="py-4 px-4 text-center">
                        {row.local ? <CheckCircle className="h-5 w-5 text-green-500 mx-auto" /> : <XCircle className="h-5 w-5 text-gray-300 dark:text-slate-600 mx-auto" />}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 sm:py-28 bg-gradient-to-br from-nvidia-500 to-nvidia-600 text-white">
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl sm:text-4xl font-black mb-6">Combine the Best of Both</h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Use ClawnCore's platform alongside your local IT partner for the complete technology stack.
            </p>
            <Link href="/get-started">
              <Button className="h-12 px-8 bg-white text-nvidia-600 hover:bg-gray-100 font-bold">Get Started</Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
      <PersistentCTA />
    </div>
  );
}
