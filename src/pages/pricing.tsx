import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PersistentCTA } from '@/components/PersistentCTA';
import { SEO, ServiceSchema } from '@/components/SEO';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Check, X, HelpCircle } from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    description: 'Perfect for small farms and SMEs getting started with technology',
    price: 'Custom',
    cta: 'Contact Sales',
    href: '/contact',
    features: [
      'Single platform access',
      'Basic support',
      'Standard dashboard',
      'Email support',
      'Community access',
    ],
    notIncluded: [
      'Multi-platform integration',
      'Priority support',
      'Custom analytics',
      'API access',
      'Dedicated account manager',
    ],
  },
  {
    name: 'Professional',
    description: 'For growing organizations needing multiple platforms',
    price: 'Custom',
    cta: 'Get Started',
    href: '/get-started',
    popular: true,
    features: [
      'Up to 3 platforms',
      'Priority support',
      'Advanced dashboards',
      'Phone & email support',
      'Training sessions',
      'API access',
    ],
    notIncluded: [
      'Unlimited platforms',
      'Dedicated account manager',
      'Custom integrations',
      'On-site support',
    ],
  },
  {
    name: 'Enterprise',
    description: 'For large organizations needing the full ecosystem',
    price: 'Custom',
    cta: 'Contact Sales',
    href: '/contact',
    features: [
      'All 6 platforms',
      'Dedicated account manager',
      'Custom dashboards',
      '24/7 priority support',
      'On-site training',
      'Custom integrations',
      'SLA guarantees',
      'On-site support',
    ],
    notIncluded: [],
  },
];

const faqs = [
  {
    question: 'How is pricing determined?',
    answer: 'Pricing is based on the platforms you need, the scale of your organization, and the level of support required. We provide custom quotes for every customer.',
  },
  {
    question: 'Is there a free trial?',
    answer: 'Yes, we offer pilot programs for most platforms. Contact us to discuss a pilot that fits your needs.',
  },
  {
    question: 'Can I start with one platform and add more later?',
    answer: 'Absolutely. Our modular approach lets you start with what you need and expand as your organization grows.',
  },
  {
    question: 'What support is included?',
    answer: 'All plans include email support. Professional plans include phone support, and Enterprise plans include 24/7 priority support with a dedicated account manager.',
  },
  {
    question: 'Are there setup fees?',
    answer: 'Setup fees vary by platform and complexity. We provide transparent pricing with no hidden costs.',
  },
  {
    question: 'Can I get a custom quote?',
    answer: 'Yes, every organization is different. Contact our sales team for a custom quote tailored to your needs.',
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-cc-darker text-gray-900 dark:text-white">
      <SEO
        title="Pricing"
        description="ClawnCore Multitech pricing - affordable technology solutions for African organizations. Custom pricing for smart agriculture, cybersecurity, cloud, AI, and analytics."
        keywords={[
          'ClawnCore pricing',
          'technology solutions pricing',
          'smart agriculture cost',
          'cybersecurity pricing Zimbabwe',
          'cloud hosting cost Africa',
          'AI solutions pricing',
        ]}
        ogImage="/og-pricing.png"
      />

      <Header />

      <main>
        {/* Hero Section */}
        <section className="py-20 sm:py-28">
          <div className="container mx-auto px-4 sm:px-6">
            <Breadcrumbs items={[{ name: 'Pricing', url: '/pricing' }]} className="mb-8" />

            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-6">
                Simple, Transparent Pricing
              </h1>
              <p className="text-xl text-gray-600 dark:text-slate-300">
                Choose the plan that fits your organization. All plans include core features, with options to scale as you grow.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="pb-20 sm:pb-28">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={`relative rounded-2xl border ${
                    plan.popular
                      ? 'border-nvidia-500 shadow-lg shadow-nvidia-500/20'
                      : 'border-gray-200 dark:border-white/10'
                  } bg-white dark:bg-cc-card p-8`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-nvidia-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                      Most Popular
                    </div>
                  )}

                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-gray-600 dark:text-slate-400 mb-6">
                    {plan.description}
                  </p>

                  <div className="mb-6">
                    <span className="text-4xl font-black">{plan.price}</span>
                    {plan.price !== 'Custom' && (
                      <span className="text-gray-600 dark:text-slate-400">/month</span>
                    )}
                  </div>

                  <Link href={plan.href}>
                    <Button
                      className={`w-full h-12 font-bold ${
                        plan.popular
                          ? 'bg-nvidia-500 hover:bg-nvidia-600 text-white'
                          : 'bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20'
                      }`}
                    >
                      {plan.cta}
                    </Button>
                  </Link>

                  <div className="mt-8">
                    <h4 className="font-bold mb-4">What's included:</h4>
                    <ul className="space-y-3">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {plan.notIncluded.length > 0 && (
                      <>
                        <h4 className="font-bold mt-6 mb-4">Not included:</h4>
                        <ul className="space-y-3">
                          {plan.notIncluded.map((feature) => (
                            <li key={feature} className="flex items-start gap-3 text-gray-500">
                              <X className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Enterprise CTA */}
        <section className="py-20 sm:py-28 bg-white dark:bg-cc-card">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl font-black mb-6">
                Need a Custom Solution?
              </h2>
              <p className="text-lg text-gray-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
                Every organization is unique. Contact our sales team for a custom quote tailored to your specific needs and budget.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button className="h-12 px-8 bg-nvidia-500 hover:bg-nvidia-600 text-white font-bold">
                    Contact Sales
                  </Button>
                </Link>
                <Link href="/get-started">
                  <Button variant="outline" className="h-12 px-8 font-bold">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 sm:py-28">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-black mb-12 text-center">
                Frequently Asked Questions
              </h2>

              <div className="space-y-6">
                {faqs.map((faq) => (
                  <div
                    key={faq.question}
                    className="p-6 rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-cc-card"
                  >
                    <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                      <HelpCircle className="h-5 w-5 text-nvidia-500" />
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 dark:text-slate-400 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 sm:py-28 bg-gradient-to-br from-nvidia-500 to-nvidia-600 text-white">
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl sm:text-4xl font-black mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Join the organizations already using ClawnCore to transform their operations.
            </p>
            <Link href="/get-started">
              <Button className="h-12 px-8 bg-white text-nvidia-600 hover:bg-gray-100 font-bold">
                Start Your Journey
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
