import { useLocation } from 'wouter';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PersistentCTA } from '@/components/PersistentCTA';
import { SEO, ServiceSchema } from '@/components/SEO';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import {
  MapPin,
  Shield,
  Cloud,
  Brain,
  BarChart3,
  ArrowRight,
  Building2,
  Factory,
  Wifi,
} from 'lucide-react';

const challenges = [
  {
    icon: Factory,
    title: 'Industrial digitization',
    text: `Bulawayo's manufacturing heritage is strong, but many factories still rely on manual processes, paper records, and disconnected systems. Modernizing industrial operations without disrupting production is a real challenge.`,
  },
  {
    icon: Wifi,
    title: 'Connectivity gaps',
    text: 'While the city centre has reasonable internet access, some industrial zones and surrounding areas face inconsistent connectivity, making cloud adoption and real-time monitoring difficult for businesses on the outskirts.',
  },
  {
    icon: Building2,
    title: 'Manufacturing modernization',
    text: 'Textile mills, food processing plants, and heavy industry firms need production-line monitoring, supply chain visibility, and quality control systems that integrate with existing equipment without full replacement.',
  },
  {
    icon: Brain,
    title: 'Skills gap',
    text: 'There is growing demand for technology professionals in Bulawayo, but skilled cloud engineers, data analysts, cybersecurity specialists, and AI practitioners remain scarce, especially for industrial applications.',
  },
  {
    icon: Shield,
    title: 'Aging infrastructure',
    text: `Much of Bulawayo's industrial and municipal infrastructure was built decades ago. Upgrading these systems with modern monitoring, sensors, and predictive maintenance requires careful phased implementation.`,
  },
  {
    icon: BarChart3,
    title: 'SME growth needs',
    text: 'Bulawayo has a vibrant small and medium enterprise ecosystem, but many SMEs lack the tools, training, and capital to adopt digital platforms that could help them compete regionally and nationally.',
  },
];

const solutions = [
  {
    title: 'Smart agriculture',
    text: `Drone field scouting, soil analytics, crop health monitoring, and farm management dashboards tailored for Matabeleland's farming conditions and seasonal patterns.`,
    href: '/agriculture',
  },
  {
    title: 'Cybersecurity',
    text: `Threat detection, identity protection, data encryption, and network monitoring to secure Bulawayo's growing digital operations and protect industrial IP.`,
    href: '/cybersecurity',
  },
  {
    title: 'Cloud infrastructure',
    text: 'Hybrid and multi-cloud deployments that give Bulawayo businesses reliable access to computing power, storage, and backup without heavy upfront investment.',
    href: '/cloud',
  },
  {
    title: 'AI and machine learning',
    text: 'Predictive maintenance for manufacturing equipment, demand forecasting, quality inspection, and process optimization powered by industrial data.',
    href: '/ml',
  },
  {
    title: 'Data analytics',
    text: 'Production dashboards, supply chain visibility, workforce analytics, and real-time reporting that help Bulawayo businesses make decisions based on actual data.',
    href: '/data-analytics',
  },
  {
    title: 'Clawn Academy',
    text: `Technology training programmes, certifications, and skills development for Bulawayo's workforce, covering cloud, cybersecurity, data, and AI fundamentals.`,
    href: '/clawn-academy',
  },
];

const industries = [
  {
    icon: Factory,
    title: 'Manufacturing',
    text: 'Textile production, food processing, engineering, and heavy industry firms that need production monitoring, quality control, and supply chain digitization.',
  },
  {
    icon: Building2,
    title: 'Mining',
    text: 'Mining operations in Matabeleland and beyond that benefit from fleet management, environmental monitoring, geological data analytics, and worker safety systems.',
  },
  {
    icon: Brain,
    title: 'Education (NUST)',
    text: 'The National University of Science and Technology and other institutions that need cloud infrastructure, research computing, cybersecurity training, and digital campus solutions.',
  },
  {
    icon: MapPin,
    title: 'Agriculture (Matabeleland)',
    text: 'Livestock operations, crop farms, and irrigation projects across Matabeleland that need drone scouting, water management, soil intelligence, and weather-aware planning.',
  },
  {
    icon: Shield,
    title: 'Healthcare',
    text: 'Clinics, hospitals, and health organisations that need secure patient records, telemedicine platforms, medical data analytics, and reliable cloud backups.',
  },
  {
    icon: BarChart3,
    title: 'SMEs',
    text: 'Retailers, service providers, logistics firms, and startups that need affordable digital tools, e-commerce platforms, accounting systems, and growth strategies.',
  },
];

export default function LocationBulawayo() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-cc-darker text-gray-900 dark:text-white">
      <SEO
        title="Technology Services in Bulawayo"
        description="ClawnCore Multitech delivers technology services in Bulawayo — cloud infrastructure, cybersecurity, AI, data analytics, smart agriculture, and IT training for Zimbabwe's industrial capital."
        keywords={[
          'technology services Bulawayo',
          'IT solutions Bulawayo',
          'cloud computing Bulawayo',
          'cybersecurity Bulawayo Zimbabwe',
          'manufacturing technology Bulawayo',
          'smart agriculture Matabeleland',
          'data analytics Bulawayo',
          'AI solutions Bulawayo',
          'IT company Bulawayo',
          'digital transformation Bulawayo',
        ]}
        canonical="https://clawncore.com/locations/bulawayo"
        ogImage="https://images.unsplash.com/photo-1590005024862-6b67679a29fb?auto=format&fit=crop&w=1400&q=85"
      />
      <ServiceSchema
        name="Technology Services in Bulawayo"
        description="Cloud, cybersecurity, AI, data analytics, smart agriculture, and IT training for businesses and institutions in Bulawayo, Zimbabwe."
        url="https://clawncore.com/locations/bulawayo"
        areaServed="Bulawayo"
        serviceType="Technology Services"
      />

      <Header />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-[#0c1a2e] px-4 sm:px-6 pb-16 sm:pb-20 pt-24 sm:pt-28 text-white md:pb-28 md:pt-36">
          <div className="container relative z-10 mx-auto mb-8">
            <Breadcrumbs
              items={[
                { name: 'Locations', url: '/locations' },
                { name: 'Bulawayo', url: '/locations/bulawayo' },
              ]}
              className="text-white/70"
            />
          </div>
          <div className="absolute inset-0 opacity-25">
            <img
              src="https://images.unsplash.com/photo-1590005024862-6b67679a29fb?auto=format&fit=crop&w=1400&q=85"
              alt="Bulawayo cityscape"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-[#0c1a2e] via-[#14304d]/90 to-[#06101c]" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-gray-50 dark:from-cc-darker to-transparent" />

          <div className="container relative z-10 mx-auto grid gap-8 sm:gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <p className="mb-3 sm:mb-4 text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] sm:tracking-[0.35em] text-[#38bdf8]">
                ClawnCore Multitech — Bulawayo
              </p>
              <h1 className="mb-4 sm:mb-6 max-w-4xl text-3xl sm:text-5xl font-black tracking-tight md:text-7xl lg:text-[76px]">
                Technology services for{' '}
                <span className="text-[#0284c7]">Zimbabwe's</span> industrial capital.
              </h1>
              <p className="max-w-2xl text-base sm:text-xl leading-7 sm:leading-8 text-white/90 md:text-2xl">
                Cloud, cybersecurity, AI, data analytics, smart agriculture, and training solutions built for Bulawayo's manufacturing, mining, and education sectors.
              </p>
              <p className="mt-4 sm:mt-6 max-w-2xl text-sm sm:text-base leading-6 sm:leading-7 text-sky-50/80">
                From the National University of Science and Technology to Bulawayo's industrial sites and Matabeleland farms, we deliver practical technology that strengthens operations and drives growth.
              </p>
              <div className="mt-6 sm:mt-9 flex flex-col gap-3 sm:gap-4 sm:flex-row">
                <Button
                  onClick={() => navigate('/get-started')}
                  className="h-11 sm:h-12 rounded-[4px] bg-[#0284c7] px-6 sm:px-8 text-sm font-bold text-white hover:bg-[#0369a1]"
                >
                  Get Started in Bulawayo
                </Button>
                <Button
                  onClick={() => navigate('/about')}
                  className="h-11 sm:h-12 rounded-[4px] border border-white/25 bg-white/10 px-6 sm:px-8 text-sm font-bold text-white backdrop-blur-md hover:bg-white/20"
                >
                  Learn About ClawnCore
                </Button>
              </div>
            </div>

            <div className="rounded-[28px] border border-white/20 bg-white/10 p-3 shadow-2xl backdrop-blur-md">
              <div className="overflow-hidden rounded-[22px] bg-black">
                <img
                  src="https://images.unsplash.com/photo-1590005024862-6b67679a29fb?auto=format&fit=crop&w=1400&q=85"
                  alt="Bulawayo skyline at dusk"
                  className="aspect-video w-full object-cover"
                />
              </div>
              <div className="grid gap-3 p-4 sm:grid-cols-3">
                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-2xl font-black">2nd</p>
                  <p className="text-xs uppercase tracking-widest text-sky-100/80">Largest city in Zimbabwe</p>
                </div>
                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-2xl font-black">1893</p>
                  <p className="text-xs uppercase tracking-widest text-sky-100/80">City founded</p>
                </div>
                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-2xl font-black">NUST</p>
                  <p className="text-xs uppercase tracking-widest text-sky-100/80">National University of Science</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Bulawayo */}
        <section className="px-4 sm:px-6 py-16 sm:py-20 md:py-28">
          <div className="container mx-auto grid gap-8 sm:gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-[#0284c7]">
                About Bulawayo
              </p>
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight md:text-6xl">
                Zimbabwe's industrial heart.
              </h2>
            </div>
            <div className="space-y-4 sm:space-y-6 text-base sm:text-lg leading-7 sm:leading-8 text-gray-600 dark:text-slate-300">
              <p>
                Bulawayo is Zimbabwe's second largest city and its historical industrial centre. Known as the "City of Kings," it was established in 1893 and grew rapidly as a hub for manufacturing, heavy engineering, and railway development. For much of the twentieth century, Bulawayo's factories, steelworks, and textile mills drove the national economy, earning the city a reputation as the engine room of Zimbabwean industry.
              </p>
              <p>
                Today Bulawayo is home to a diverse mix of enterprises — from large-scale manufacturing plants and food processing facilities to mining support companies, logistics operators, and a growing number of small and medium enterprises. The city's Bulawayo Industrial Sites and surrounding areas continue to host some of the country's most significant production operations, even as the economy shifts from pure manufacturing toward services and technology.
              </p>
              <p>
                Education is a defining feature of Bulawayo's identity. The National University of Science and Technology (NUST), one of Zimbabwe's leading tertiary institutions, anchors a growing ecosystem of technology research, engineering graduates, and innovation. Bulawayo also has a strong rugby and sporting culture — the Bulawayo Athletic Club and Hartsfield Rugby Grounds have been central to Zimbabwean sport for decades, reflecting the city's tradition of disciplined teamwork and community pride.
              </p>
              <p>
                The transition from industrial centre to technology-enabled services economy presents both challenges and opportunities. Bulawayo's businesses need digital tools that respect their operational reality — manufacturing lines that cannot afford downtime, farms managing arid conditions across Matabeleland, schools training the next generation of engineers, and SMEs competing in an increasingly digital marketplace. This is precisely the environment where practical, well-implemented technology makes the biggest difference.
              </p>
            </div>
          </div>
        </section>

        {/* About Bulawayo — Image */}
        <section className="bg-white dark:bg-[#0f172a] px-4 sm:px-6 py-16 sm:py-20 md:py-28">
          <div className="container mx-auto grid gap-8 sm:gap-12 lg:grid-cols-2 lg:items-center">
            <div className="overflow-hidden rounded-2xl sm:rounded-[32px] shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=800&q=85"
                alt="Industrial area representing Bulawayo's manufacturing heritage"
                loading="lazy"
                className="h-64 sm:h-full sm:min-h-[420px] w-full object-cover"
              />
            </div>
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-[#0284c7]">
                Industrial Heritage, Modern Ambition
              </p>
              <h2 className="mb-4 sm:mb-6 text-2xl sm:text-4xl font-black tracking-tight md:text-6xl">
                A city built on making things.
              </h2>
              <p className="mb-5 sm:mb-7 text-base sm:text-lg leading-7 sm:leading-8 text-gray-600 dark:text-slate-300">
                Bulawayo was founded on industry and production. From steel to textiles, food processing to engineering, the city has always been about building, creating, and delivering. That industrial mindset — practical, results-driven, focused on efficiency — is exactly the foundation technology solutions need to succeed.
              </p>
              <div className="space-y-2.5 sm:space-y-3">
                <div className="flex gap-3 rounded-xl sm:rounded-2xl bg-gray-50 dark:bg-white/5 p-3 sm:p-4">
                  <Building2 className="mt-1 h-5 w-5 flex-shrink-0 text-[#0284c7]" />
                  <p className="text-sm leading-5 sm:leading-6 text-gray-600 dark:text-slate-300">
                    Bulawayo hosts Zimbabwe's largest concentration of manufacturing and industrial facilities.
                  </p>
                </div>
                <div className="flex gap-3 rounded-xl sm:rounded-2xl bg-gray-50 dark:bg-white/5 p-3 sm:p-4">
                  <Factory className="mt-1 h-5 w-5 flex-shrink-0 text-[#0284c7]" />
                  <p className="text-sm leading-5 sm:leading-6 text-gray-600 dark:text-slate-300">
                    The city's industrial sites employ tens of thousands of workers across diverse sectors.
                  </p>
                </div>
                <div className="flex gap-3 rounded-xl sm:rounded-2xl bg-gray-50 dark:bg-white/5 p-3 sm:p-4">
                  <Brain className="mt-1 h-5 w-5 flex-shrink-0 text-[#0284c7]" />
                  <p className="text-sm leading-5 sm:leading-6 text-gray-600 dark:text-slate-300">
                    NUST produces engineers, scientists, and technologists who are shaping Zimbabwe's digital future.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technology Challenges */}
        <section className="px-4 sm:px-6 py-16 sm:py-20 md:py-28">
          <div className="container mx-auto">
            <div className="mb-8 sm:mb-12 max-w-3xl">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-[#0284c7]">
                Technology Challenges
              </p>
              <h2 className="mb-4 sm:mb-6 text-2xl sm:text-4xl font-black tracking-tight md:text-6xl">
                Bulawayo faces specific technology hurdles.
              </h2>
              <p className="text-base sm:text-lg leading-7 sm:leading-8 text-gray-600 dark:text-slate-300">
                Bulawayo's transition from industrial powerhouse to technology-enabled economy brings real challenges that require local understanding, not generic solutions.
              </p>
            </div>
            <div className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
              {challenges.map(({ icon: Icon, title, text }) => (
                <div
                  key={title}
                  className="rounded-2xl sm:rounded-3xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 p-5 sm:p-6"
                >
                  <Icon className="mb-4 sm:mb-5 h-7 w-7 sm:h-8 sm:w-8 text-[#0284c7]" />
                  <h3 className="mb-2 sm:mb-3 text-lg sm:text-xl font-black text-gray-900 dark:text-white">
                    {title}
                  </h3>
                  <p className="text-sm leading-6 sm:leading-7 text-gray-600 dark:text-slate-300">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How ClawnCore Serves Bulawayo */}
        <section className="bg-[#0c1a2e] px-4 sm:px-6 py-16 sm:py-20 text-white md:py-28">
          <div className="container mx-auto grid gap-8 sm:gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="mb-8 sm:mb-12 max-w-4xl">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-[#38bdf8]">
                  How ClawnCore Serves Bulawayo
                </p>
                <h2 className="mb-4 sm:mb-6 text-2xl sm:text-4xl font-black tracking-tight md:text-6xl">
                  Technology solutions built for Bulawayo's industries.
                </h2>
                <p className="text-base sm:text-lg leading-7 sm:leading-8 text-sky-50/80">
                  We deliver practical technology solutions that respect Bulawayo's industrial reality — manufacturing lines that need uptime, farms managing arid conditions, institutions training future engineers, and SMEs growing into new markets.
                </p>
              </div>
              <div className="grid gap-4 sm:gap-5 sm:grid-cols-2">
                {solutions.map(({ title, text, href }) => (
                  <Link key={title} href={href}>
                    <div className="group rounded-2xl sm:rounded-3xl border border-white/10 bg-white/10 p-5 sm:p-6 backdrop-blur-md cursor-pointer transition-all hover:border-[#0284c7]/40 hover:bg-white/15">
                      <h3 className="mb-2 sm:mb-3 text-lg sm:text-xl font-black">{title}</h3>
                      <p className="text-sm leading-6 sm:leading-7 text-sky-50/75 mb-3">{text}</p>
                      <span className="inline-flex items-center gap-1 text-sm font-bold text-[#38bdf8] group-hover:text-[#7dd3fc] transition-colors">
                        Learn more <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl sm:rounded-[32px] shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=85"
                alt="Technology and manufacturing in Bulawayo"
                loading="lazy"
                className="h-64 sm:h-full sm:min-h-[420px] w-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Industries */}
        <section className="bg-white dark:bg-[#0f172a] px-4 sm:px-6 py-16 sm:py-20 md:py-28">
          <div className="container mx-auto">
            <div className="mb-8 sm:mb-12 max-w-3xl">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-[#0284c7]">
                Industries We Serve
              </p>
              <h2 className="mb-4 sm:mb-6 text-2xl sm:text-4xl font-black tracking-tight md:text-6xl">
                Sectors that power Bulawayo.
              </h2>
              <p className="text-base sm:text-lg leading-7 sm:leading-8 text-gray-600 dark:text-slate-300">
                Each industry in Bulawayo has distinct needs shaped by local conditions, workforce capabilities, and operational realities. We design solutions for each one.
              </p>
            </div>
            <div className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
              {industries.map(({ icon: Icon, title, text }) => (
                <div
                  key={title}
                  className="rounded-2xl sm:rounded-3xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-5 sm:p-6"
                >
                  <Icon className="mb-4 sm:mb-5 h-7 w-7 sm:h-8 sm:w-8 text-[#0284c7]" />
                  <h3 className="mb-2 sm:mb-3 text-lg sm:text-xl font-black text-gray-900 dark:text-white">
                    {title}
                  </h3>
                  <p className="text-sm leading-6 sm:leading-7 text-gray-600 dark:text-slate-300">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#0c1a2e] px-4 sm:px-6 py-16 sm:py-20 md:py-28 text-white">
          <div className="container mx-auto grid gap-8 sm:gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-[#38bdf8]">
                Ready to Start?
              </p>
              <h2 className="mb-4 sm:mb-6 text-2xl sm:text-4xl font-black tracking-tight md:text-6xl">
                Bring technology that fits Bulawayo.
              </h2>
              <p className="text-base sm:text-lg leading-7 sm:leading-8 text-sky-50/80">
                Whether you are a manufacturer modernising production, a university deploying research infrastructure, a farm adopting drone scouting, or an SME going digital — we build the solution for your reality.
              </p>
            </div>
            <div className="rounded-2xl sm:rounded-[32px] bg-white/[0.07] border border-white/10 p-6 sm:p-8">
              <MapPin className="mb-4 sm:mb-6 h-8 w-8 sm:h-10 sm:w-10 text-[#38bdf8]" />
              <h3 className="mb-3 sm:mb-4 text-xl sm:text-2xl font-black text-white">
                ClawnCore in Bulawayo
              </h3>
              <p className="text-sm sm:text-base leading-6 sm:leading-7 text-sky-50/70 mb-5 sm:mb-7">
                We work with Bulawayo businesses, institutions, farms, and SMEs to deploy technology that strengthens operations, reduces costs, and drives growth. Start with a consultation to understand what matters most.
              </p>
              <Button
                onClick={() => navigate('/get-started')}
                className="h-11 sm:h-12 rounded-[4px] bg-[#0284c7] px-6 sm:px-8 font-bold text-white hover:bg-[#0369a1]"
              >
                Start with ClawnCore
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <PersistentCTA />
    </div>
  );
}
