import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PersistentCTA } from '@/components/PersistentCTA';
import { SEO, FAQSchema } from '@/components/SEO';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'What is ClawnCore Multitech?',
    answer: 'ClawnCore Multitech is an integrated technology company serving Zimbabwe and Africa. We provide six connected platforms: Smart Agriculture, Cybersecurity, Cloud Infrastructure, AI & Machine Learning, Data Analytics, and ClawnAI — all designed to work together as one technology ecosystem.',
  },
  {
    question: 'How does ClawnCore differ from other IT companies?',
    answer: 'Unlike companies that offer isolated services, ClawnCore provides an integrated technology ecosystem. Our platforms are designed to work together — your farm data feeds into analytics, which powers AI predictions, all secured by our cybersecurity layer and hosted on our cloud infrastructure. This means better data flow, lower costs, and one team supporting your entire technology stack.',
  },
  {
    question: 'What industries does ClawnCore serve?',
    answer: 'We serve agriculture, business/enterprise, education, and healthcare. Each industry has tailored solutions that address specific challenges: precision farming for agriculture, integrated IT for businesses, cloud school systems for education, and health information systems for healthcare facilities.',
  },
  {
    question: 'How much does ClawnCore cost?',
    answer: 'We offer three pricing tiers: Starter (for small organizations testing our platforms), Professional (for growing organizations needing full platform access), and Enterprise (custom pricing for large organizations). Most clients start with a Starter plan and upgrade as they see results. Contact us for specific pricing.',
  },
  {
    question: 'Do I need technical knowledge to use ClawnCore?',
    answer: 'No. Our platforms are designed for practical use by people who are not technology specialists. We handle the complex infrastructure, security, and AI — you get simple dashboards, clear reports, and tools that work. We also provide training and ongoing support.',
  },
  {
    question: 'What does "integrated technology ecosystem" mean?',
    answer: 'It means all ClawnCore platforms share data securely and work together. For example: drone scouting data feeds into crop monitoring, which informs water management decisions, which are recorded in farm records — all protected by cybersecurity and hosted on cloud infrastructure. One login, one team, one ecosystem.',
  },
  {
    question: 'Where is ClawnCore located?',
    answer: 'ClawnCore Multitech is headquartered in Zimbabwe and serves clients across Africa. Our cloud infrastructure ensures reliable access regardless of your location, and our support team understands local needs and challenges.',
  },
  {
    question: 'How do I get started with ClawnCore?',
    answer: 'Getting started is simple: visit our Get Started page or contact us. We typically begin with a discovery call to understand your needs, then recommend the right platform combination. Most clients can be onboarded within 1-2 weeks.',
  },
  {
    question: 'Is my data safe with ClawnCore?',
    answer: 'Yes. Security is foundational to our platform. We use AES-256 encryption, role-based access controls, regular backups, and enterprise-grade cloud infrastructure. Your data is protected by the same security standards used by major global organizations.',
  },
  {
    question: 'Do you offer support and training?',
    answer: 'Yes. Every plan includes access to our support team. We provide onboarding training, ongoing technical support, and access to learning resources through ClawnAcademy. Enterprise clients get dedicated account management.',
  },
];

export default function FAQGeneral() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-cc-darker text-gray-900 dark:text-white">
      <SEO
        title="Frequently Asked Questions"
        answer="Common questions about ClawnCore Multitech, our integrated technology ecosystem, pricing, security, and how to get started."
        description="Get answers to frequently asked questions about ClawnCore Multitech — our platforms, pricing, security, integrations, and how to get started."
        keywords={['ClawnCore FAQ', 'ClawnCore questions', 'technology company Zimbabwe FAQ', 'IT services FAQ Africa']}
      />
      <FAQSchema faqs={faqs} />

      <Header />

      <main>
        <section className="relative bg-gradient-to-br from-[#0f172a] to-[#1e293b] py-24 sm:py-32 text-white">
          <div className="container mx-auto px-4 sm:px-6">
            <Breadcrumbs
              items={[
                { name: 'Resources', url: '/resources' },
                { name: 'FAQ', url: '/resources/faq' },
                { name: 'General', url: '/resources/faq/general' },
              ]}
              className="text-white/70 mb-8"
            />
            <div className="max-w-4xl">
              <HelpCircle className="h-12 w-12 text-nvidia-500 mb-6" />
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-6">
                Frequently Asked <span className="text-nvidia-500">Questions</span>
              </h1>
              <p className="text-xl sm:text-2xl text-white/90 leading-relaxed">
                Everything you need to know about ClawnCore Multitech and our integrated technology ecosystem.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-28">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-3xl mx-auto">
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="rounded-2xl bg-white dark:bg-cc-card border border-gray-200 dark:border-white/10 overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenIndex(openIndex === index ? null : index)}
                      className="w-full flex items-center justify-between p-6 text-left"
                    >
                      <h3 className="text-lg font-bold pr-4">{faq.question}</h3>
                      {openIndex === index ? (
                        <ChevronUp className="h-5 w-5 text-nvidia-500 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0" />
                      )}
                    </button>
                    {openIndex === index && (
                      <div className="px-6 pb-6">
                        <p className="text-gray-600 dark:text-slate-300 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-28 bg-white dark:bg-cc-card">
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl sm:text-4xl font-black mb-6">Still Have Questions?</h2>
            <p className="text-lg text-gray-600 dark:text-slate-300 max-w-2xl mx-auto mb-8">
              Our team is here to help. Reach out and we'll get back to you within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button className="h-12 px-8 bg-nvidia-500 hover:bg-nvidia-600 text-white font-bold">Contact Us</Button>
              </Link>
              <Link href="/get-started">
                <Button variant="outline" className="h-12 px-8 font-bold">Get Started</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <PersistentCTA />
    </div>
  );
}
