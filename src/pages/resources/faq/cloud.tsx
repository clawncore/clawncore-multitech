import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PersistentCTA } from '@/components/PersistentCTA';
import { SEO, FAQSchema } from '@/components/SEO';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, Cloud } from 'lucide-react';

const faqs = [
  {
    question: 'What is cloud infrastructure?',
    answer: 'Cloud infrastructure is online computing that lets you run software, store data, host websites, and manage backups over the internet instead of on office computers. Think of it as renting reliable, secure computing power that scales with your needs — no expensive servers required upfront.',
  },
  {
    question: 'Why should my business move to the cloud?',
    answer: 'Cloud computing offers: reliability (99.9% uptime), security (enterprise-grade encryption), scalability (grow as needed), cost savings (pay for what you use), accessibility (access from anywhere), and disaster recovery (automatic backups). Most Zimbabwean businesses still rely on fragile setups that fail when one device breaks.',
  },
  {
    question: 'Is cloud computing safe?',
    answer: 'Yes — when done properly. Cloud providers invest billions in security. We add additional layers: encryption at rest and in transit, access controls, monitoring, and regular audits. Your data is actually safer in properly managed cloud infrastructure than on an office laptop or USB drive.',
  },
  {
    question: 'What can I move to the cloud?',
    answer: 'Almost everything: email, documents, databases, websites, applications, customer records, financial data, backups, and file storage. We help you assess what to move first for maximum impact and minimal disruption.',
  },
  {
    question: 'How much does cloud hosting cost?',
    answer: 'Costs vary by usage. A small business website might cost $20-50/month. A full business suite with email, storage, and applications might cost $50-200/month. Enterprise workloads are priced by actual usage. The key benefit is predictable costs that scale with your business.',
  },
  {
    question: 'What internet speed do I need for cloud services?',
    answer: 'Basic cloud services (email, documents, light applications) work with any internet connection, including mobile data. Heavy workloads (large databases, video processing) benefit from faster connections. Our systems are optimized for the connectivity realities of Zimbabwe, with offline-first design where possible.',
  },
  {
    question: 'What happens to my data if the internet goes down?',
    answer: 'Your data remains safe in the cloud. Many of our tools work offline and sync when connectivity returns. We design for the reality of intermittent internet access in Zimbabwe. Critical data is cached locally on your devices so you can continue working.',
  },
  {
    question: 'Can I keep some data on my own servers?',
    answer: 'Yes. We support hybrid cloud setups where sensitive data stays on your premises while other workloads run in the cloud. This gives you the reliability and scalability of cloud with the control of on-premises for specific data.',
  },
  {
    question: 'How long does cloud migration take?',
    answer: 'A simple website migration can be done in a few days. A full business migration (email, databases, applications, files) typically takes 2-6 weeks depending on complexity. We use a phased approach to minimize disruption to your operations.',
  },
  {
    question: 'Do I need IT staff to manage cloud infrastructure?',
    answer: 'Not necessarily. Our managed cloud services handle infrastructure management, security, backups, and monitoring. You focus on your business. We provide a simple dashboard for visibility and support for any issues.',
  },
];

export default function FAQCloud() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-cc-darker text-gray-900 dark:text-white">
      <SEO
        title="Cloud Infrastructure FAQ"
        description="Frequently asked questions about cloud computing, cloud migration, hosting, and cloud security for Zimbabwean businesses."
        keywords={['cloud computing FAQ', 'cloud migration questions', 'cloud hosting Africa FAQ', 'business cloud FAQ']}
      />
      <FAQSchema faqs={faqs} />

      <Header />

      <main>
        <section className="relative bg-gradient-to-br from-[#060b14] to-[#0c1929] py-24 sm:py-32 text-white">
          <div className="container mx-auto px-4 sm:px-6">
            <Breadcrumbs
              items={[
                { name: 'Resources', url: '/resources' },
                { name: 'FAQ', url: '/resources/faq' },
                { name: 'Cloud', url: '/resources/faq/cloud' },
              ]}
              className="text-white/70 mb-8"
            />
            <div className="max-w-4xl">
              <Cloud className="h-12 w-12 text-[#93c5fd] mb-6" />
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-6">
                Cloud Infrastructure <span className="text-[#93c5fd]">FAQ</span>
              </h1>
              <p className="text-xl sm:text-2xl text-white/90 leading-relaxed">
                Everything you need to know about cloud computing, migration, and hosting for your business.
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
                        <ChevronUp className="h-5 w-5 text-[#2563eb] flex-shrink-0" />
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

        <section className="py-20 sm:py-28 bg-gradient-to-br from-[#2563eb] to-[#1d4ed8] text-white">
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl sm:text-4xl font-black mb-6">Ready to Move to the Cloud?</h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Get a free cloud readiness assessment for your business.
            </p>
            <Link href="/get-started">
              <Button className="h-12 px-8 bg-white text-[#2563eb] hover:bg-gray-100 font-bold">Plan Cloud Setup</Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
      <PersistentCTA />
    </div>
  );
}
