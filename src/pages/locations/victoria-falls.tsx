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
    title: 'Tourism Digitization',
    description: 'The hospitality sector relies heavily on international booking platforms and needs local technology partners to build digital presence, manage reservations, and market to global travellers.',
  },
  {
    title: 'Hospitality Tech Needs',
    description: 'Hotels, lodges, and tour operators need integrated property management, point-of-sale, and customer relationship systems that work reliably in a remote location.',
  },
  {
    title: 'Seasonal Business Patterns',
    description: 'Victoria Falls experiences distinct high and low seasons, making it difficult for businesses to justify year-round investment in technology infrastructure and dedicated IT staff.',
  },
  {
    title: 'Remote Location',
    description: 'Sitected over 1,000 kilometres from Harare, Victoria Falls faces unique logistical challenges for hardware procurement, on-site technical support, and infrastructure maintenance.',
  },
  {
    title: 'International Connectivity',
    description: 'Tourists from around the world expect reliable internet access and digital services, putting pressure on local businesses and infrastructure to maintain international standards.',
  },
  {
    title: 'Wildlife Conservation Technology',
    description: 'The conservation sector surrounding Victoria Falls and the Zambezi basin needs modern monitoring, tracking, and data collection tools to protect biodiversity and manage ecosystems.',
  },
];

const solutions = [
  {
    icon: Cloud,
    title: 'Cloud Infrastructure',
    description: 'Reliable cloud hosting that keeps your hospitality business running 24/7, with data redundancy and disaster recovery built in.',
    href: '/platforms/cloud',
  },
  {
    icon: Brain,
    title: 'AI & Analytics',
    description: 'Predictive analytics for occupancy, dynamic pricing, and customer insights that help tourism businesses maximise revenue.',
    href: '/platforms/ml',
  },
  {
    icon: Shield,
    title: 'Cybersecurity',
    description: 'Protect guest data, payment systems, and business operations with enterprise security scaled for the hospitality industry.',
    href: '/platforms/cybersecurity',
  },
  {
    icon: BarChart3,
    title: 'Data Analytics',
    description: 'Real-time dashboards for occupancy tracking, revenue management, guest satisfaction, and operational performance.',
    href: '/platforms/data-analytics',
  },
];

const industries = [
  {
    icon: Building2,
    name: 'Tourism & Hospitality',
    description: 'Hotels, lodges, safari camps, and tour operators hosting visitors from around the world to experience the Victoria Falls World Heritage Site.',
  },
  {
    icon: Sprout,
    name: 'Wildlife Conservation',
    description: 'Conservation organisations and national parks managing wildlife populations, anti-poaching efforts, and ecosystem monitoring.',
  },
  {
    icon: MapPin,
    name: 'Transport',
    description: 'Airlines, ground transport, and adventure tourism operators connecting visitors to Victoria Falls and surrounding attractions.',
  },
  {
    icon: Wifi,
    name: 'Retail & Services',
    description: 'Shops, restaurants, and service providers serving both the local community and the international tourist market.',
  },
];

export default function LocationVictoriaFalls() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-cc-darker text-gray-900 dark:text-white">
      <SEO
        title="Technology Services in Victoria Falls"
        description="ClawnCore Multitech delivers integrated technology solutions to Victoria Falls - cloud, AI analytics, cybersecurity, and data solutions for Zimbabwe's tourism capital."
        keywords={[
          'technology services Victoria Falls',
          'IT solutions Victoria Falls Zimbabwe',
          'tourism technology Zimbabwe',
          'hospitality tech Victoria Falls',
          'cloud services Victoria Falls',
          'cybersecurity Victoria Falls',
          'wildlife conservation technology',
        ]}
        ogImage="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1400&q=85"
      />
      <ServiceSchema
        name="Technology Services in Victoria Falls"
        description="Integrated technology solutions for Victoria Falls - cloud infrastructure, AI analytics, cybersecurity, and data solutions for tourism and conservation."
        url="https://clawncore.com/locations/victoria-falls"
        serviceType="Technology Services"
        areaServed="Victoria Falls, Zimbabwe"
      />

      <Header />

      <main>
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-[#7c2d12] to-[#ea580c] py-24 sm:py-32 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <img
              src="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1400&q=85"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <Breadcrumbs
              items={[
                { name: 'Locations', url: '/locations' },
                { name: 'Victoria Falls', url: '/locations/victoria-falls' },
              ]}
              className="text-white/70 mb-8"
            />
            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-6">
                <MapPin className="w-6 h-6 text-orange-300" />
                <span className="text-sm font-bold uppercase tracking-wider text-orange-300">Matabeleland North</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-6">
                Technology Services in{' '}
                <span className="text-orange-300">Victoria Falls</span>
              </h1>
              <p className="text-xl sm:text-2xl text-white/90 leading-relaxed mb-8">
                Integrated technology solutions for Zimbabwe's tourism capital — powering hospitality, conservation, and enterprise near the World Heritage Site.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/get-started">
                  <Button className="h-12 px-8 bg-white text-[#ea580c] hover:bg-orange-50 font-bold">
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

        {/* About Victoria Falls */}
        <section className="py-20 sm:py-28">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#ea580c] mb-4 block">About Victoria Falls</span>
                <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-6 text-gray-900 dark:text-white">
                  Zimbabwe's Tourism Capital
                </h2>
                <div className="space-y-5 text-[#46586b] dark:text-slate-300 leading-relaxed">
                  <p>
                    Victoria Falls, known locally as Mosi-oa-Tunya or "The Smoke That Thunders," is one of the Seven Natural Wonders of the World and a UNESCO World Heritage Site. The town of Victoria Falls sits on the southern bank of the Zambezi River, directly across from Zambia, and serves as the adventure tourism capital of Zimbabwe and one of Africa's premier travel destinations.
                  </p>
                  <p>
                    The hospitality industry is the lifeblood of Victoria Falls. Hundreds of hotels, lodges, safari camps, and guest houses host hundreds of thousands of international visitors each year. These businesses range from world-class five-star properties to charming boutique lodges and budget-friendly backpacker hostels. What they all share is a need for reliable technology — from property management and booking systems to guest Wi-Fi and payment processing.
                  </p>
                  <p>
                    Beyond tourism, Victoria Falls is a hub for wildlife conservation. The surrounding national parks and private conservancies are home to elephants, lions, buffalo, and hundreds of bird species. Conservation organisations working in this region need modern technology for anti-poaching monitoring, wildlife tracking, habitat management, and research data collection.
                  </p>
                  <p>
                    The town's remote location — over 1,000 kilometres from Harare — presents both challenges and opportunities. While physical infrastructure delivery can be slower, cloud-based technology solutions are perfectly suited to this environment. ClawnCore Multitech provides the digital infrastructure that Victoria Falls businesses need, without requiring extensive on-site hardware or dedicated IT teams.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=800&q=85"
                    alt="Victoria Falls, Zimbabwe"
                    className="w-full h-[400px] object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-[#ea580c] text-white rounded-xl p-4 shadow-xl">
                  <p className="text-sm font-bold">World Heritage Site</p>
                  <p className="text-xs text-white/80">Seven Natural Wonders</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Challenges */}
        <section className="py-20 sm:py-28 bg-white dark:bg-cc-dark">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <span className="text-xs font-bold uppercase tracking-wider text-[#ea580c] mb-4 block">Challenges</span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-6 text-gray-900 dark:text-white">
                Technology Challenges in Victoria Falls
              </h2>
              <p className="text-lg text-[#46586b] dark:text-slate-300 max-w-2xl mx-auto">
                A world-class destination demands world-class technology. Here are the key challenges facing Victoria Falls businesses.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {challenges.map((challenge) => (
                <div
                  key={challenge.title}
                  className="bg-gray-50 dark:bg-cc-darker rounded-xl p-6 border border-gray-200 dark:border-white/5 hover:border-[#ea580c]/30 transition-colors"
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
              <span className="text-xs font-bold uppercase tracking-wider text-[#ea580c] mb-4 block">Solutions</span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-6 text-gray-900 dark:text-white">
                How ClawnCore Helps Victoria Falls
              </h2>
              <p className="text-lg text-[#46586b] dark:text-slate-300 max-w-2xl mx-auto">
                Our cloud-first approach is ideal for remote locations. We deliver enterprise technology that works anywhere, anytime.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              {solutions.map((solution) => {
                const Icon = solution.icon;
                return (
                  <Link key={solution.title} href={solution.href}>
                    <div className="group bg-white dark:bg-cc-darker rounded-xl p-8 border border-gray-200 dark:border-white/5 hover:border-[#ea580c]/30 hover:shadow-lg transition-all cursor-pointer h-full">
                      <div className="w-12 h-12 rounded-xl bg-[#ea580c]/10 flex items-center justify-center mb-5 group-hover:bg-[#ea580c] group-hover:text-white transition-colors">
                        <Icon className="w-6 h-6 text-[#ea580c] group-hover:text-white transition-colors" />
                      </div>
                      <h3 className="text-xl font-black mb-3 text-gray-900 dark:text-white">{solution.title}</h3>
                      <p className="text-sm text-[#46586b] dark:text-slate-300 leading-relaxed mb-4">{solution.description}</p>
                      <span className="inline-flex items-center gap-2 text-sm font-bold text-[#ea580c] group-hover:gap-3 transition-all">
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
              <span className="text-xs font-bold uppercase tracking-wider text-[#ea580c] mb-4 block">Industries</span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-6 text-gray-900 dark:text-white">
                Industries We Serve in Victoria Falls
              </h2>
              <p className="text-lg text-[#46586b] dark:text-slate-300 max-w-2xl mx-auto">
                From five-star lodges to conservation teams, we deliver technology solutions for every sector in Victoria Falls.
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
                    <div className="w-12 h-12 rounded-full bg-[#ea580c]/10 flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-[#ea580c]" />
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
        <section className="py-20 sm:py-28 bg-gradient-to-br from-[#7c2d12] to-[#ea580c] text-white">
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-6">
              Ready to Elevate Your Victoria Falls Business?
            </h2>
            <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
              Whether you run a hotel, manage a safari camp, or lead conservation efforts, ClawnCore has the technology to take your operations to the next level.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/get-started">
                <Button className="h-12 px-8 bg-white text-[#ea580c] hover:bg-orange-50 font-bold">
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
