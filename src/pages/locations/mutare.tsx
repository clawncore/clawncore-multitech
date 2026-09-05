import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PersistentCTA } from '@/components/PersistentCTA';
import { SEO, ServiceSchema } from '@/components/SEO';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { MapPin, Shield, Cloud, Brain, BarChart3, ArrowRight, Building2, Wifi, Sprout } from 'lucide-react';

const challenges = [
  {
    title: 'Border Trade Digitalization',
    description: 'Mutare sits on the Mozambique border and handles significant cross-border trade, yet many traders and logistics firms still rely on paper-based systems that slow down commerce.',
  },
  {
    title: 'Timber & Agriculture Tech',
    description: 'The Eastern Highlands timber and tea/coffee industries need modern supply chain tracking, quality monitoring, and yield prediction tools that are currently unavailable locally.',
  },
  {
    title: 'Distance from Harare',
    description: 'At nearly 270 kilometres from Harare, Mutare businesses face delays in accessing technical support, hardware procurement, and specialised IT services.',
  },
  {
    title: 'Small Business Growth',
    description: 'A growing number of small businesses and entrepreneurs need affordable digital tools, reliable internet infrastructure, and accessible cloud services to compete.',
  },
  {
    title: 'Infrastructure Gaps',
    description: 'While improving, the digital infrastructure in Mutare still lags behind Harare, creating challenges for businesses that depend on consistent connectivity and cloud access.',
  },
  {
    title: 'Skills Shortage',
    description: 'Finding qualified IT professionals and cybersecurity specialists in the Eastern Highlands is difficult, forcing many businesses to either go without or pay premium rates for Harare-based consultants.',
  },
];

const solutions = [
  {
    icon: Sprout,
    title: 'Agriculture Technology',
    description: 'Drone scouting, crop monitoring, and supply chain tools designed for timber, tea, coffee, and smallholder farming in the Eastern Highlands.',
    href: '/platforms/smart-agriculture',
  },
  {
    icon: Cloud,
    title: 'Cloud Infrastructure',
    description: 'Reliable cloud hosting and computing services that work even in areas with intermittent connectivity, keeping your business running.',
    href: '/platforms/cloud',
  },
  {
    icon: BarChart3,
    title: 'Data Analytics',
    description: 'Real-time dashboards and reporting tools that turn your business data into actionable insights for better decision making.',
    href: '/platforms/data-analytics',
  },
  {
    icon: Shield,
    title: 'Cybersecurity',
    description: 'Enterprise-grade security solutions scaled for Mutare businesses, protecting your data and customer information from threats.',
    href: '/platforms/cybersecurity',
  },
];

const industries = [
  {
    icon: Sprout,
    name: 'Agriculture (Tea, Coffee, Timber)',
    description: 'The Eastern Highlands are Zimbabwe\'s premier tea, coffee, and timber growing region, with operations ranging from smallholder to commercial scale.',
  },
  {
    icon: Building2,
    name: 'Cross-Border Trade',
    description: 'Mutare is the gateway to the Beira corridor, handling significant trade with Mozambique and landlocked neighbouring countries.',
  },
  {
    icon: Wifi,
    name: 'Education',
    description: 'Universities, colleges, and schools preparing students with digital skills and connecting to global knowledge resources.',
  },
  {
    icon: MapPin,
    name: 'Healthcare',
    description: 'Hospitals, clinics, and health organisations serving the Manicaland province with improving but still developing digital health infrastructure.',
  },
];

export default function LocationMutare() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-cc-darker text-gray-900 dark:text-white">
      <SEO
        title="Technology Services in Mutare"
        description="ClawnCore Multitech delivers integrated technology solutions to Mutare - agriculture tech for tea, coffee and timber, cloud, cybersecurity, and data analytics for the Eastern Highlands."
        keywords={[
          'technology services Mutare',
          'IT solutions Mutare Zimbabwe',
          'agriculture technology Eastern Highlands',
          'cybersecurity Mutare',
          'cloud services Mutare',
          'cross-border trade technology',
        ]}
        ogImage="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1400&q=85"
      />
      <ServiceSchema
        name="Technology Services in Mutare"
        description="Integrated technology solutions for Mutare and the Eastern Highlands - agriculture technology, cloud infrastructure, data analytics, and cybersecurity."
        url="https://clawncore.com/locations/mutare"
        serviceType="Technology Services"
        areaServed="Mutare, Zimbabwe"
      />

      <Header />

      <main>
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-[#14532d] to-[#16a34a] py-24 sm:py-32 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <img
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1400&q=85"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <Breadcrumbs
              items={[
                { name: 'Locations', url: '/locations' },
                { name: 'Mutare', url: '/locations/mutare' },
              ]}
              className="text-white/70 mb-8"
            />
            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-6">
                <MapPin className="w-6 h-6 text-green-300" />
                <span className="text-sm font-bold uppercase tracking-wider text-green-300">Eastern Highlands</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-6">
                Technology Services in{' '}
                <span className="text-green-300">Mutare</span>
              </h1>
              <p className="text-xl sm:text-2xl text-white/90 leading-relaxed mb-8">
                Integrated technology solutions for Zimbabwe's gateway to the Mozambique corridor — powering agriculture, trade, and enterprise in the Eastern Highlands.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/get-started">
                  <Button className="h-12 px-8 bg-white text-[#16a34a] hover:bg-green-50 font-bold">
                    Get Started
                  </Button>
                </Link>
                <Link href="/platforms">
                  <Button variant="outline" className="h-12 px-8 border-white/30 text-white hover:bg-white/10 font-bold">
                    View Platforms
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* About Mutare */}
        <section className="py-20 sm:py-28">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#16a34a] mb-4 block">About Mutare</span>
                <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-6 text-gray-900 dark:text-white">
                  Gateway to the Eastern Highlands
                </h2>
                <div className="space-y-5 text-[#46586b] dark:text-slate-300 leading-relaxed">
                  <p>
                    Mutare is the capital of Manicaland province and Zimbabwe's third largest city by metropolitan population. Nestled in the Eastern Highlands along the border with Mozambique, it serves as the country's primary gateway to the port of Beira via the Beira Corridor. The city's strategic location makes it a critical hub for cross-border trade and logistics.
                  </p>
                  <p>
                    The Eastern Highlands surrounding Mutare are Zimbabwe's premier agricultural region for high-value crops. Tea estates, coffee plantations, and timber operations thrive in the cool, misty highlands, producing some of the country's finest export products. These operations range from large commercial estates to smallholder cooperatives, all of which benefit from modern agricultural technology.
                  </p>
                  <p>
                    Mutare has a proud history as a centre of commerce and industry. The city's business community includes established manufacturers, traders, and service providers who have long served as the economic engine of eastern Zimbabwe. Today, a new generation of entrepreneurs is emerging, bringing digital innovation to traditional industries.
                  </p>
                  <p>
                    Despite its importance, Mutare faces unique technology challenges. Its distance from Harare — nearly 270 kilometres — means that businesses often wait longer for technical support and pay more for delivery of equipment. ClawnCore Multitech bridges this gap by providing locally accessible, cloud-first technology solutions that work reliably in the Eastern Highlands environment.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=85"
                    alt="Mutare, Eastern Highlands"
                    className="w-full h-[400px] object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-[#16a34a] text-white rounded-xl p-4 shadow-xl">
                  <p className="text-sm font-bold">Manicaland Capital</p>
                  <p className="text-xs text-white/80">Gateway to Mozambique</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Challenges */}
        <section className="py-20 sm:py-28 bg-white dark:bg-cc-dark">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <span className="text-xs font-bold uppercase tracking-wider text-[#16a34a] mb-4 block">Challenges</span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-6 text-gray-900 dark:text-white">
                Technology Challenges in Mutare
              </h2>
              <p className="text-lg text-[#46586b] dark:text-slate-300 max-w-2xl mx-auto">
                The Eastern Highlands face distinct technology challenges shaped by geography, industry, and distance from the capital.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {challenges.map((challenge) => (
                <div
                  key={challenge.title}
                  className="bg-gray-50 dark:bg-cc-darker rounded-xl p-6 border border-gray-200 dark:border-white/5 hover:border-[#16a34a]/30 transition-colors"
                >
                  <h3 className="text-lg font-black mb-3 text-gray-900 dark:text-white">{challenge.title}</h3>
                  <p className="text-sm text-[#46586b] dark:text-slate-300 leading-relaxed">{challenge.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Solutions */}
        <section className="py-20 sm:py-28">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <span className="text-xs font-bold uppercase tracking-wider text-[#16a34a] mb-4 block">Solutions</span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-6 text-gray-900 dark:text-white">
                How ClawnCore Helps Mutare
              </h2>
              <p className="text-lg text-[#46586b] dark:text-slate-300 max-w-2xl mx-auto">
                Our integrated platform brings enterprise-grade technology to the Eastern Highlands — accessible, affordable, and built for local conditions.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              {solutions.map((solution) => {
                const Icon = solution.icon;
                return (
                  <Link key={solution.title} href={solution.href}>
                    <div className="group bg-white dark:bg-cc-darker rounded-xl p-8 border border-gray-200 dark:border-white/5 hover:border-[#16a34a]/30 hover:shadow-lg transition-all cursor-pointer h-full">
                      <div className="w-12 h-12 rounded-xl bg-[#16a34a]/10 flex items-center justify-center mb-5 group-hover:bg-[#16a34a] group-hover:text-white transition-colors">
                        <Icon className="w-6 h-6 text-[#16a34a] group-hover:text-white transition-colors" />
                      </div>
                      <h3 className="text-xl font-black mb-3 text-gray-900 dark:text-white">{solution.title}</h3>
                      <p className="text-sm text-[#46586b] dark:text-slate-300 leading-relaxed mb-4">{solution.description}</p>
                      <span className="inline-flex items-center gap-2 text-sm font-bold text-[#16a34a] group-hover:gap-3 transition-all">
                        Learn More <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Industries */}
        <section className="py-20 sm:py-28 bg-white dark:bg-cc-dark">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <span className="text-xs font-bold uppercase tracking-wider text-[#16a34a] mb-4 block">Industries</span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-6 text-gray-900 dark:text-white">
                Industries We Serve in Mutare
              </h2>
              <p className="text-lg text-[#46586b] dark:text-slate-300 max-w-2xl mx-auto">
                From highland tea estates to cross-border logistics, we deliver technology solutions for every sector in the Eastern Highlands.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {industries.map((industry) => {
                const Icon = industry.icon;
                return (
                  <div
                    key={industry.name}
                    className="bg-gray-50 dark:bg-cc-darker rounded-xl p-6 border border-gray-200 dark:border-white/5 text-center"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#16a34a]/10 flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-[#16a34a]" />
                    </div>
                    <h3 className="text-lg font-black mb-2 text-gray-900 dark:text-white">{industry.name}</h3>
                    <p className="text-sm text-[#46586b] dark:text-slate-300 leading-relaxed">{industry.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 sm:py-28 bg-gradient-to-br from-[#14532d] to-[#16a34a] text-white">
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-6">
              Ready to Transform Your Mutare Business?
            </h2>
            <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
              Whether you manage a tea estate, run a cross-border trading operation, or lead a growing enterprise, ClawnCore has the technology to elevate your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/get-started">
                <Button className="h-12 px-8 bg-white text-[#16a34a] hover:bg-green-50 font-bold">
                  Get Started Today
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="h-12 px-8 border-white/30 text-white hover:bg-white/10 font-bold">
                  Contact Our Team
                </Button>
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
