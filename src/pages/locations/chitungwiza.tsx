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
    title: 'Peri-Urban Farming Needs',
    description: 'Small-scale farmers around Chitungwiza need affordable precision agriculture tools to improve yields on limited plots, but most solutions are designed for large commercial operations.',
  },
  {
    title: 'Growing SMEs Needing IT',
    description: 'A rapidly expanding small and medium enterprise sector lacks access to professional IT infrastructure, cybersecurity, and cloud services that larger Harare-based firms take for granted.',
  },
  {
    title: 'Proximity to Harare Competition',
    description: 'Being near Harare means local businesses compete with the capital\'s larger firms, yet operate with smaller budgets and less access to technology talent and services.',
  },
  {
    title: 'Connectivity Growing',
    description: 'Internet penetration is improving but remains inconsistent across the city, creating challenges for businesses that depend on reliable cloud services and digital tools.',
  },
  {
    title: 'Agricultural Tech Needs',
    description: 'The growing peri-urban agricultural sector requires modern crop monitoring, water management, and soil analysis solutions tailored to smaller land parcels and diverse crop types.',
  },
  {
    title: 'Affordability Concerns',
    description: 'Most technology solutions entering the Zimbabwean market are priced for large enterprises, leaving a gap for affordable, scalable options that work for Chitungwiza\'s community of small businesses.',
  },
];

const solutions = [
  {
    icon: Shield,
    title: 'Cybersecurity',
    description: 'Protect your business data and customer information with enterprise-grade security solutions scaled for growing SMEs.',
    href: '/platforms/cybersecurity',
  },
  {
    icon: Cloud,
    title: 'Cloud Infrastructure',
    description: 'Access reliable cloud hosting and computing power without heavy upfront investment in physical infrastructure.',
    href: '/platforms/cloud',
  },
  {
    icon: Sprout,
    title: 'Agriculture Technology',
    description: 'Smart farming tools including drone scouting, crop monitoring, and soil analytics designed for peri-urban operations.',
    href: '/platforms/smart-agriculture',
  },
  {
    icon: BarChart3,
    title: 'Data Analytics',
    description: 'Turn your business data into actionable insights with real-time dashboards and reporting tools.',
    href: '/platforms/data-analytics',
  },
];

const industries = [
  {
    icon: Sprout,
    name: 'Peri-Urban Agriculture',
    description: 'Small-scale vegetable farming, poultry, and horticulture operations serving Harare\'s growing food demand.',
  },
  {
    icon: Building2,
    name: 'Small & Medium Enterprises',
    description: 'Retail shops, service providers, and light manufacturers forming the backbone of the local economy.',
  },
  {
    icon: Wifi,
    name: 'Education',
    description: 'Schools and training centres preparing the next generation with digital skills and modern learning tools.',
  },
  {
    icon: MapPin,
    name: 'Transport & Logistics',
    description: 'Commuter transport services and logistics providers connecting Chitungwiza with Harare and surrounding areas.',
  },
];

export default function LocationChitungwiza() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-cc-darker text-gray-900 dark:text-white">
      <SEO
        title="Technology Services in Chitungwiza"
        description="ClawnCore Multitech brings integrated technology solutions to Chitungwiza - cybersecurity, cloud, agriculture tech, and data analytics for Zimbabwe's growing peri-urban hub."
        keywords={[
          'technology services Chitungwiza',
          'IT solutions Chitungwiza Zimbabwe',
          'cybersecurity Chitungwiza',
          'cloud services Chitungwiza',
          'agriculture technology Chitungwiza',
          'SME technology solutions Zimbabwe',
        ]}
        ogImage="https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1400&q=85"
      />
      <ServiceSchema
        name="Technology Services in Chitungwiza"
        description="Integrated technology solutions for Chitungwiza businesses - cybersecurity, cloud infrastructure, agriculture technology, and data analytics."
        url="https://clawncore.com/locations/chitungwiza"
        serviceType="Technology Services"
        areaServed="Chitungwiza, Zimbabwe"
      />

      <Header />

      <main>
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-[#0c4a6e] to-[#0284c7] py-24 sm:py-32 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <img
              src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1400&q=85"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <Breadcrumbs
              items={[
                { name: 'Locations', url: '/locations' },
                { name: 'Chitungwiza', url: '/locations/chitungwiza' },
              ]}
              className="text-white/70 mb-8"
            />
            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-6">
                <MapPin className="w-6 h-6 text-sky-300" />
                <span className="text-sm font-bold uppercase tracking-wider text-sky-300">Zimbabwe</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-6">
                Technology Services in{' '}
                <span className="text-sky-300">Chitungwiza</span>
              </h1>
              <p className="text-xl sm:text-2xl text-white/90 leading-relaxed mb-8">
                Integrated technology solutions for Zimbabwe's third largest city — empowering peri-urban agriculture, growing SMEs, and community development.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/get-started">
                  <Button className="h-12 px-8 bg-white text-[#0284c7] hover:bg-sky-50 font-bold">
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

        {/* About Chitungwiza */}
        <section className="py-20 sm:py-28">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#0284c7] mb-4 block">About Chitungwiza</span>
                <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-6 text-gray-900 dark:text-white">
                  Zimbabwe's Growing Peri-Urban Hub
                </h2>
                <div className="space-y-5 text-[#46586b] dark:text-slate-300 leading-relaxed">
                  <p>
                    Chitungwiza is Zimbabwe's third largest city and one of the country's most dynamic peri-urban centres. Situated just 30 kilometres south of Harare along the main highway, the town has grown from a modest residential settlement into a vibrant city with over 1.5 million residents. Its proximity to the capital makes it both a dormitory town and an economic hub in its own right.
                  </p>
                  <p>
                    The city is home to a thriving community of small and medium enterprises that form the backbone of the local economy. From retail shops and service providers to light manufacturers and agricultural producers, Chitungwiza's business community is entrepreneurial and ambitious. However, many of these businesses lack access to the technology infrastructure that their Harare-based competitors enjoy.
                  </p>
                  <p>
                    Peri-urban agriculture is a defining feature of Chitungwiza's economy. Thousands of small-scale farmers cultivate vegetables, raise poultry, and manage horticulture operations on modest plots of land. These farmers serve Harare's growing food demand but often operate without modern crop monitoring, water management, or soil analysis tools. This is where technology can make a transformative difference.
                  </p>
                  <p>
                    With internet connectivity steadily improving and a young, digitally curious population, Chitungwiza represents a significant opportunity for technology adoption. Businesses here do not need enterprise-scale solutions — they need smart, affordable, and locally relevant technology that grows with them. That is exactly what ClawnCore Multitech delivers.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=800&q=85"
                    alt="Chitungwiza, Zimbabwe"
                    className="w-full h-[400px] object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-[#0284c7] text-white rounded-xl p-4 shadow-xl">
                  <p className="text-sm font-bold">Third Largest City</p>
                  <p className="text-xs text-white/80">Population: ~1.5 million</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Challenges */}
        <section className="py-20 sm:py-28 bg-white dark:bg-cc-dark">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0284c7] mb-4 block">Challenges</span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-6 text-gray-900 dark:text-white">
                Technology Challenges in Chitungwiza
              </h2>
              <p className="text-lg text-[#46586b] dark:text-slate-300 max-w-2xl mx-auto">
                Growing cities face growing pains. Here are the key technology challenges facing Chitungwiza's businesses and communities.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {challenges.map((challenge) => (
                <div
                  key={challenge.title}
                  className="bg-gray-50 dark:bg-cc-darker rounded-xl p-6 border border-gray-200 dark:border-white/5 hover:border-[#0284c7]/30 transition-colors"
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
              <span className="text-xs font-bold uppercase tracking-wider text-[#0284c7] mb-4 block">Solutions</span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-6 text-gray-900 dark:text-white">
                How ClawnCore Helps Chitungwiza
              </h2>
              <p className="text-lg text-[#46586b] dark:text-slate-300 max-w-2xl mx-auto">
                Our integrated technology ecosystem is designed to meet the specific needs of Chitungwiza's businesses and agricultural community.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              {solutions.map((solution) => {
                const Icon = solution.icon;
                return (
                  <Link key={solution.title} href={solution.href}>
                    <div className="group bg-white dark:bg-cc-darker rounded-xl p-8 border border-gray-200 dark:border-white/5 hover:border-[#0284c7]/30 hover:shadow-lg transition-all cursor-pointer h-full">
                      <div className="w-12 h-12 rounded-xl bg-[#0284c7]/10 flex items-center justify-center mb-5 group-hover:bg-[#0284c7] group-hover:text-white transition-colors">
                        <Icon className="w-6 h-6 text-[#0284c7] group-hover:text-white transition-colors" />
                      </div>
                      <h3 className="text-xl font-black mb-3 text-gray-900 dark:text-white">{solution.title}</h3>
                      <p className="text-sm text-[#46586b] dark:text-slate-300 leading-relaxed mb-4">{solution.description}</p>
                      <span className="inline-flex items-center gap-2 text-sm font-bold text-[#0284c7] group-hover:gap-3 transition-all">
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
              <span className="text-xs font-bold uppercase tracking-wider text-[#0284c7] mb-4 block">Industries</span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-6 text-gray-900 dark:text-white">
                Industries We Serve in Chitungwiza
              </h2>
              <p className="text-lg text-[#46586b] dark:text-slate-300 max-w-2xl mx-auto">
                From peri-urban farms to growing businesses, we deliver technology solutions for every sector in Chitungwiza.
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
                    <div className="w-12 h-12 rounded-full bg-[#0284c7]/10 flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-[#0284c7]" />
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
        <section className="py-20 sm:py-28 bg-gradient-to-br from-[#0c4a6e] to-[#0284c7] text-white">
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-6">
              Ready to Transform Your Chitungwiza Business?
            </h2>
            <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
              Whether you run a peri-urban farm, an SME, or a community organisation, ClawnCore has the technology solutions to help you grow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/get-started">
                <Button className="h-12 px-8 bg-white text-[#0284c7] hover:bg-sky-50 font-bold">
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
