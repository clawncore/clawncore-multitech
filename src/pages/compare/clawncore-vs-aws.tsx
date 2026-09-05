import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PersistentCTA } from '@/components/PersistentCTA';
import { SEO, FAQSchema } from '@/components/SEO';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, ArrowRight, Cloud, Shield, Globe } from 'lucide-react';

const comparisons = [
  { feature: 'Local support team', clawncore: true, aws: false },
  { feature: 'Zimbabwe-optimized infrastructure', clawncore: true, aws: false },
  { feature: 'Integrated ecosystem (6 platforms)', clawncore: true, aws: false },
  { feature: 'Pay in local currency', clawncore: true, aws: false },
  { feature: 'Managed cybersecurity included', clawncore: true, aws: false },
  { feature: 'Onboarding and training', clawncore: true, aws: false },
  { feature: 'Global data centers', clawncore: false, aws: true },
  { feature: 'Largest service catalog', clawncore: false, aws: true },
  { feature: 'Enterprise-grade scale', clawncore: false, aws: true },
  { feature: 'Extensive partner network', clawncore: false, aws: true },
];

const faqs = [
  {
    question: 'Why choose ClawnCore over AWS?',
    answer: 'ClawnCore is designed specifically for Zimbabwean and African businesses. We provide local support, pay-in-local-currency options, and an integrated ecosystem where all 6 platforms work together. AWS is powerful but requires significant technical expertise and charges in USD, which can be expensive for local businesses.',
  },
  {
    question: 'Can I use both ClawnCore and AWS?',
    answer: 'Yes. Some organizations use AWS for specific global workloads while using ClawnCore for their core African operations. We can help you design a hybrid approach that makes sense for your needs.',
  },
  {
    question: 'Is ClawnCore as reliable as AWS?',
    answer: 'ClawnCore provides 99.9% uptime for our cloud infrastructure. While AWS has more global data centers, our infrastructure is optimized for African connectivity and provides better performance for local users.',
  },
  {
    question: 'How does pricing compare?',
    answer: 'ClawnCore typically costs 30-50% less than equivalent AWS setups for Zimbabwean businesses, when you factor in: no currency conversion fees, local support included, integrated security, and simplified management.',
  },
];

export default function ClawnCoreVsAWS() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-cc-darker text-gray-900 dark:text-white">
      <SEO
        title="ClawnCore vs AWS: Which is Better for Zimbabwean Businesses?"
        description="Compare ClawnCore and AWS for cloud infrastructure, cybersecurity, and technology services in Zimbabwe. See which platform fits your business needs and budget."
        keywords={['ClawnCore vs AWS', 'AWS alternatives Zimbabwe', 'cloud provider comparison Africa', 'local cloud vs AWS', 'African cloud provider']}
      />
      <FAQSchema faqs={faqs} />

      <Header />

      <main>
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-[#0f172a] to-[#1e293b] py-24 sm:py-32 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2200&q=85" alt="" className="h-full w-full object-cover" />
          </div>
          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <Breadcrumbs
              items={[
                { name: 'Compare', url: '/compare' },
                { name: 'ClawnCore vs AWS', url: '/compare/clawncore-vs-aws' },
              ]}
              className="text-white/70 mb-8"
            />
            <div className="max-w-4xl">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-6">
                <span className="text-nvidia-500">ClawnCore</span> vs AWS
              </h1>
              <p className="text-xl sm:text-2xl text-white/90 leading-relaxed">
                A practical comparison for Zimbabwean businesses choosing between a local integrated ecosystem and a global cloud giant.
              </p>
            </div>
          </div>
        </section>

        {/* Overview with images */}
        <section className="py-20 sm:py-28">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <div>
                <h2 className="text-3xl font-black mb-6">The Short Version</h2>
                <p className="text-[#46586b] dark:text-slate-300 leading-relaxed mb-4">
                  AWS is the world's largest cloud provider with hundreds of services and global reach. ClawnCore is a Zimbabwe-built technology ecosystem with 6 integrated platforms designed specifically for African businesses.
                </p>
                <p className="text-[#46586b] dark:text-slate-300 leading-relaxed mb-4">
                  If you need massive global scale and hundreds of specialized services, AWS is the choice. If you want an integrated platform with local support, local pricing, and everything working together — ClawnCore is built for you.
                </p>
                <p className="text-[#46586b] dark:text-slate-300 leading-relaxed">
                  For most Zimbabwean SMEs, farms, schools, and clinics, ClawnCore provides everything needed at a fraction of the complexity and cost.
                </p>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=85"
                  alt="Cloud infrastructure comparison"
                  className="w-full aspect-[4/3] object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-20 sm:py-28 bg-white dark:bg-cc-card">
          <div className="container mx-auto px-4 sm:px-6">
            <h2 className="text-3xl sm:text-4xl font-black mb-12 text-center">Feature Comparison</h2>
            <div className="max-w-3xl mx-auto overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200 dark:border-white/10">
                    <th className="text-left py-4 px-4 font-bold">Feature</th>
                    <th className="text-center py-4 px-4 font-bold text-nvidia-500">ClawnCore</th>
                    <th className="text-center py-4 px-4 font-bold text-[#ff9900]">AWS</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisons.map((row) => (
                    <tr key={row.feature} className="border-b border-gray-100 dark:border-white/5">
                      <td className="py-4 px-4 text-[#46586b] dark:text-slate-300">{row.feature}</td>
                      <td className="py-4 px-4 text-center">
                        {row.clawncore ? (
                          <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                        ) : (
                          <XCircle className="h-5 w-5 text-gray-300 dark:text-slate-600 mx-auto" />
                        )}
                      </td>
                      <td className="py-4 px-4 text-center">
                        {row.aws ? (
                          <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                        ) : (
                          <XCircle className="h-5 w-5 text-gray-300 dark:text-slate-600 mx-auto" />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* When to choose each */}
        <section className="py-20 sm:py-28">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=85"
                  alt="Local technology team"
                  className="w-full aspect-video object-cover"
                />
                <div className="p-8">
                  <h3 className="text-2xl font-black mb-4 text-nvidia-500">Choose ClawnCore When</h3>
                  <ul className="space-y-2">
                    {['You are a Zimbabwean or African business', 'You want integrated platforms that work together', 'You need local support and training', 'You want to pay in local currency', 'You prefer simplicity over maximum flexibility'].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-[#46586b] dark:text-slate-300">
                        <CheckCircle className="h-5 w-5 text-nvidia-500 mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=85"
                  alt="Global cloud infrastructure"
                  className="w-full aspect-video object-cover"
                />
                <div className="p-8">
                  <h3 className="text-2xl font-black mb-4 text-[#ff9900]">Choose AWS When</h3>
                  <ul className="space-y-2">
                    {['You need global-scale infrastructure', 'You require specialized cloud services', 'Your team has strong AWS expertise', 'You have international customers', 'You need maximum customization'].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-[#46586b] dark:text-slate-300">
                        <CheckCircle className="h-5 w-5 text-[#ff9900] mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 sm:py-28 bg-white dark:bg-cc-card">
          <div className="container mx-auto px-4 sm:px-6">
            <h2 className="text-3xl font-black mb-12 text-center">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="p-6 rounded-2xl border border-gray-200 dark:border-white/10">
                  <h3 className="text-lg font-bold mb-3">{faq.question}</h3>
                  <p className="text-[#46586b] dark:text-slate-300 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 sm:py-28 bg-gradient-to-br from-nvidia-500 to-nvidia-600 text-white">
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl sm:text-4xl font-black mb-6">Ready to Try ClawnCore?</h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Start with a free consultation and see how our integrated platform compares for your specific needs.
            </p>
            <Link href="/get-started">
              <Button className="h-12 px-8 bg-white text-nvidia-600 hover:bg-gray-100 font-bold">Get Started Free</Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
      <PersistentCTA />
    </div>
  );
}
