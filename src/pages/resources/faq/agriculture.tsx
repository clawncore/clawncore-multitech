import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PersistentCTA } from '@/components/PersistentCTA';
import { SEO, FAQSchema } from '@/components/SEO';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, Sprout } from 'lucide-react';

const faqs = [
  {
    question: 'What is smart agriculture?',
    answer: 'Smart agriculture (precision farming) uses technology like drones, sensors, AI, and data analytics to help farmers make better decisions. Instead of treating an entire field the same way, precision farming lets you manage each zone based on its specific needs — saving water, fertilizer, and while improving yields.',
  },
  {
    question: 'How do drones help with farming?',
    answer: 'Drones equipped with multi-spectral cameras scan your fields from above to detect crop stress, pest damage, water issues, and soil variation. They can cover hundreds of hectares in a single flight and identify problems 2-3 weeks before they become visible to the human eye.',
  },
  {
    question: 'What is NDVI crop monitoring?',
    answer: 'NDVI (Normalized Difference Vegetation Index) uses light reflected from crops to measure plant health. Healthy plants reflect more near-infrared light. NDVI maps show you which areas of your field are thriving and which need attention, helping you target interventions precisely.',
  },
  {
    question: 'How much does precision farming cost?',
    answer: 'We offer affordable pilot programs starting with a single field scan. Most Zimbabwean farms begin with drone scouting (per-hectare pricing) before expanding to full monitoring packages. The goal is to show measurable ROI before you scale up.',
  },
  {
    question: 'Do I need internet connectivity for farm technology?',
    answer: 'Our systems are designed for areas with intermittent connectivity. Drone data can be collected offline and synced when you have internet. Farm records can be maintained on mobile devices and uploaded later. We optimize for the connectivity realities of rural Zimbabwe.',
  },
  {
    question: 'What crops can be monitored with drones?',
    answer: 'Drone monitoring works for virtually all field crops: maize, tobacco, wheat, soybeans, cotton, sugarcane, and horticultural crops. The technology is crop-agnostic — it measures plant health, not crop type.',
  },
  {
    question: 'How does soil analytics work?',
    answer: 'We analyze soil samples for pH, nutrients (nitrogen, phosphorus, potassium), organic matter, and moisture levels. Results are mapped across your fields to create precise fertilizer recommendations — applying only what each zone needs, reducing waste and cost.',
  },
  {
    question: 'Can farm records help me get a loan?',
    answer: 'Yes. Digital farm records showing field history, inputs, yields, and performance create a professional track record that banks and financing institutions trust. Many farmers use our records to secure better loan terms and insurance coverage.',
  },
  {
    question: 'How does smart water management save water?',
    answer: 'Soil moisture sensors tell you exactly how much water each zone needs. Weather integration prevents irrigation before rain. Zone-based irrigation applies water only where needed. Our clients typically reduce water usage by 25% while maintaining or improving yields.',
  },
  {
    question: 'How do I get started with ClawnCore agriculture?',
    answer: 'Start with a field scan. We visit your farm, conduct drone scouting, and deliver a detailed report showing crop health, stress zones, and recommendations. This pilot helps you see the value before committing to a full system.',
  },
];

export default function FAQAgriculture() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-cc-darker text-gray-900 dark:text-white">
      <SEO
        title="Agriculture FAQ"
        description="Frequently asked questions about smart agriculture, drone scouting, crop monitoring, soil analytics, and precision farming in Zimbabwe."
        keywords={['smart agriculture FAQ', 'precision farming questions', 'drone farming Zimbabwe FAQ', 'crop monitoring FAQ']}
      />
      <FAQSchema faqs={faqs} />

      <Header />

      <main>
        <section className="relative bg-gradient-to-br from-[#0f2318] to-[#1a3d25] py-24 sm:py-32 text-white">
          <div className="container mx-auto px-4 sm:px-6">
            <Breadcrumbs
              items={[
                { name: 'Resources', url: '/resources' },
                { name: 'FAQ', url: '/resources/faq' },
                { name: 'Agriculture', url: '/resources/faq/agriculture' },
              ]}
              className="text-white/70 mb-8"
            />
            <div className="max-w-4xl">
              <Sprout className="h-12 w-12 text-[#a7f3a0] mb-6" />
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-6">
                Smart Agriculture <span className="text-[#a7f3a0]">FAQ</span>
              </h1>
              <p className="text-xl sm:text-2xl text-white/90 leading-relaxed">
                Everything you need to know about precision farming, drone scouting, and agricultural technology in Zimbabwe.
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
                        <ChevronUp className="h-5 w-5 text-[#2f7d32] flex-shrink-0" />
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

        <section className="py-20 sm:py-28 bg-gradient-to-br from-[#2f7d32] to-[#256828] text-white">
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl sm:text-4xl font-black mb-6">Ready to Start Precision Farming?</h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Book a field scan and see what smart agriculture can do for your farm.
            </p>
            <Link href="/get-started">
              <Button className="h-12 px-8 bg-white text-[#2f7d32] hover:bg-gray-100 font-bold">Start Pilot</Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
      <PersistentCTA />
    </div>
  );
}
