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
  Sprout,
  ArrowRight,
  Building2,
  Users,
  Wifi,
} from 'lucide-react';

const challenges = [
  {
    icon: Shield,
    title: 'Cyber Threats Targeting Financial Sector',
    description:
      'Harare\'s financial institutions face increasingly sophisticated cyber attacks, from phishing campaigns targeting bank customers to ransomware threats against payment systems. The growing digital economy has made Zimbabwe\'s financial sector a prime target for both local and international threat actors.',
  },
  {
    icon: Wifi,
    title: 'Load Shedding Affecting IT Infrastructure',
    description:
      'Zimbabwe\'s intermittent power supply creates serious challenges for businesses relying on uptime-critical IT systems. Unplanned outages disrupt cloud services, damage hardware, and cause costly data loss without proper backup and disaster recovery solutions.',
  },
  {
    icon: Building2,
    title: 'Data Compliance and Privacy',
    description:
      'As Zimbabwe modernises its regulatory framework, businesses in Harare must navigate evolving data protection requirements. Organisations need to ensure compliance with local data sovereignty laws while meeting international standards for industries like finance and healthcare.',
  },
  {
    icon: Users,
    title: 'Intense Market Competition',
    description:
      'Harare\'s business landscape is increasingly competitive. Companies that fail to adopt modern technology risk losing market share to more agile competitors who leverage data-driven decision making, automation, and digital customer engagement.',
  },
  {
    icon: ArrowRight,
    title: 'Digital Transformation Pressure',
    description:
      'Global and regional trends are pushing Harare businesses to digitise operations rapidly. Legacy systems, manual processes, and paper-based workflows are becoming unsustainable as customers and partners expect digital-first interactions and real-time service delivery.',
  },
  {
    icon: Brain,
    title: 'Talent Retention and Skills Gap',
    description:
      'Harare faces a brain drain of skilled technology professionals to international markets. Companies struggle to recruit and retain cybersecurity experts, data scientists, and cloud engineers, making it difficult to build and maintain in-house technology capabilities.',
  },
];

const solutions = [
  {
    icon: Shield,
    title: 'Cybersecurity',
    description:
      'Protect your Harare operations with threat detection, incident response, and compliance management tailored for Zimbabwe\'s financial sector and growing digital businesses. We monitor and defend against both local and international cyber threats.',
    link: '/cybersecurity',
  },
  {
    icon: Cloud,
    title: 'Cloud Infrastructure',
    description:
      'Deploy reliable, resilient cloud infrastructure designed to withstand Harare\'s power challenges. Our hybrid cloud solutions keep your business online with automated failover, local data caching, and disaster recovery built in.',
    link: '/cloud',
  },
  {
    icon: Brain,
    title: 'AI & Machine Learning',
    description:
      'Leverage artificial intelligence to automate operations, predict market trends, and deliver personalised customer experiences. Our AI solutions are built for Harare businesses looking to gain a competitive edge through intelligent automation.',
    link: '/ml',
  },
  {
    icon: BarChart3,
    title: 'Data Analytics',
    description:
      'Turn your business data into actionable insights with dashboards, reporting, and predictive analytics. From financial performance to customer behaviour, our analytics platform helps Harare businesses make informed, data-driven decisions.',
    link: '/data-analytics',
  },
  {
    icon: Sprout,
    title: 'Smart Agriculture',
    description:
      'Support the commercial farms and agricultural operations around Harare with drone scouting, crop monitoring, soil analytics, and water management. Our agriculture platform helps farms in Mashonaland and beyond improve yields and reduce costs.',
    link: '/agriculture',
  },
  {
    icon: Users,
    title: 'ClawnAI Orchestration',
    description:
      'Unify your entire technology stack with ClawnAI, the orchestration layer that connects cybersecurity, cloud, AI, analytics, and agriculture into one seamless ecosystem. Built for Harare organisations that need integrated solutions, not fragmented tools.',
    link: '/clawn-ai',
  },
];

const industries = [
  {
    icon: Building2,
    title: 'Financial Services',
    description: 'Banks, insurers, microfinance institutions, and fintech startups across Harare rely on our cybersecurity, cloud, and analytics platforms to protect assets, ensure compliance, and drive digital innovation.',
  },
  {
    icon: Users,
    title: 'Mining & Resources',
    description: 'Mining companies and resource extractors in the Harare corridor use our data analytics and cloud solutions to optimise operations, manage supply chains, and meet regulatory reporting requirements.',
  },
  {
    icon: Sprout,
    title: 'Agriculture',
    description: 'Commercial farms and agricultural cooperatives in the Harare peri-urban area and wider Mashonaland provinces leverage our smart agriculture platform for precision farming and crop management.',
  },
  {
    icon: Shield,
    title: 'Healthcare',
    description: 'Hospitals, clinics, and health organisations in Harare use our secure cloud infrastructure and data analytics to manage patient records, streamline operations, and improve health outcomes.',
  },
  {
    icon: Brain,
    title: 'Education',
    description: 'Universities, colleges, and schools in Harare benefit from our cloud and AI solutions to modernise learning management, administrative systems, and research capabilities.',
  },
  {
    icon: BarChart3,
    title: 'Retail & Commerce',
    description: 'Retailers and e-commerce businesses across Harare leverage our data analytics, AI, and cloud platforms to optimise inventory, personalise customer experiences, and scale operations.',
  },
];

export default function LocationHarare() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-cc-darker text-gray-900 dark:text-white">
      <SEO
        title="Technology Services in Harare"
        description="ClawnCore Multitech provides comprehensive technology services in Harare, Zimbabwe. Cybersecurity, cloud infrastructure, AI, data analytics, and smart agriculture solutions for businesses in the capital city."
        keywords={[
          'technology services Harare',
          'IT solutions Harare',
          'cybersecurity Harare',
          'cloud computing Harare Zimbabwe',
          'artificial intelligence Harare',
          'data analytics Zimbabwe',
          'smart agriculture Zimbabwe',
          'digital transformation Harare',
          'tech company Zimbabwe',
          'business technology Harare',
        ]}
        ogImage="https://images.unsplash.com/photo-1573155218015-4f4e3f5b4c45?auto=format&fit=crop&w=1400&q=85"
      />

      <ServiceSchema
        name="Technology Services in Harare"
        description="ClawnCore Multitech delivers integrated technology services to businesses in Harare, Zimbabwe, including cybersecurity, cloud infrastructure, artificial intelligence, data analytics, and smart agriculture solutions."
        url="https://clawncore.com/locations/harare"
        areaServed="Harare, Zimbabwe"
        serviceType="Technology Services"
      />

      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative py-24 sm:py-32 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1573155218015-4f4e3f5b4c45?auto=format&fit=crop&w=1400&q=85"
              alt="Harare skyline"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-cc-darker/90 via-cc-darker/80 to-cc-darker" />
          </div>

          <div className="relative z-10 container mx-auto px-4 sm:px-6">
            <Breadcrumbs
              items={[
                { name: 'Locations', url: '/locations' },
                { name: 'Harare', url: '/locations/harare' },
              ]}
              className="mb-8"
            />

            <div className="max-w-4xl">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="h-5 w-5 text-[#0284c7]" />
                <span className="text-[#0284c7] font-semibold text-sm uppercase tracking-wider">
                  Harare, Zimbabwe
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-6">
                Technology Services{' '}
                <span className="text-[#0284c7]">in Harare</span>
              </h1>

              <p className="text-xl sm:text-2xl text-gray-600 dark:text-slate-300 leading-relaxed mb-8">
                ClawnCore Multitech delivers integrated technology solutions to businesses across Harare — from cybersecurity and cloud infrastructure to AI, data analytics, and smart agriculture.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/get-started">
                  <Button className="h-12 px-8 bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold">
                    Get Started
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    variant="outline"
                    className="h-12 px-8 font-bold border-[#0284c7] text-[#0284c7] hover:bg-[#0284c7]/10"
                  >
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* About Harare's Technology Landscape */}
        <section className="py-20 sm:py-28">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-black mb-8">
                About Harare's Technology Landscape
              </h2>

              <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
                <div className="lg:col-span-3 space-y-6">
                  <p className="text-lg text-[#46586b] dark:text-slate-300 leading-relaxed">
                    Harare, the capital and largest city of Zimbabwe, stands as the country's primary business and technology hub. With a metropolitan population exceeding 2.4 million, the city drives a significant portion of Zimbabwe's economic activity and serves as the headquarters for most major corporations, financial institutions, and government agencies operating in the country.
                  </p>
                  <p className="text-lg text-[#46586b] dark:text-slate-300 leading-relaxed">
                    The city's economy is anchored by financial services, mining, agriculture, telecommunications, and an emerging technology sector. Major banks, insurance companies, and fintech startups are concentrated in the central business district, making Harare the beating heart of Zimbabwe's digital economy. The telecommunications sector, led by providers like Econet and NetOne, has driven mobile connectivity and created a foundation for digital services.
                  </p>
                  <p className="text-lg text-[#46586b] dark:text-slate-300 leading-relaxed">
                    Harare's technology scene has grown steadily in recent years, supported by a young, educated workforce and increasing internet penetration. Tech hubs, co-working spaces, and startup incubators have emerged across the city, fostering innovation in fintech, agritech, and healthtech. The government's push toward e-government services and digital payment adoption has further accelerated technology uptake across both public and private sectors.
                  </p>
                  <p className="text-lg text-[#46586b] dark:text-slate-300 leading-relaxed">
                    Yet Harare's businesses face unique challenges that require locally aware technology partners. Power supply instability, bandwidth limitations, regulatory evolution, and a competitive talent market mean that generic global solutions often fall short. ClawnCore Multitech was built to address these realities, providing integrated technology services that work for Harare's specific infrastructure and business environment.
                  </p>
                </div>

                <div className="lg:col-span-2">
                  <div className="rounded-3xl overflow-hidden shadow-xl">
                    <img
                      src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=85"
                      alt="Modern business district"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technology Challenges in Harare */}
        <section className="py-20 sm:py-28 bg-white dark:bg-cc-card">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-black mb-4">
                Technology Challenges in Harare
              </h2>
              <p className="text-lg text-[#46586b] dark:text-slate-300 max-w-2xl mx-auto">
                Harare businesses face distinct technology challenges that demand purpose-built solutions. Here are the key issues we address.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {challenges.map((challenge) => (
                <div
                  key={challenge.title}
                  className="p-6 rounded-2xl border border-gray-200 dark:border-white/10 hover:border-[#0284c7]/50 transition-colors"
                >
                  <challenge.icon className="h-8 w-8 text-[#0284c7] mb-4" />
                  <h3 className="text-xl font-bold mb-3">{challenge.title}</h3>
                  <p className="text-[#46586b] dark:text-slate-400 leading-relaxed">
                    {challenge.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How ClawnCore Serves Harare */}
        <section className="py-20 sm:py-28">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-black mb-4">
                How ClawnCore Serves Harare
              </h2>
              <p className="text-lg text-[#46586b] dark:text-slate-300 max-w-2xl mx-auto">
                Our six integrated platforms are designed to address the specific technology needs of businesses in Harare.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {solutions.map((solution) => (
                <Link key={solution.title} href={solution.link}>
                  <div className="h-full p-6 rounded-2xl border border-gray-200 dark:border-white/10 hover:border-[#0284c7]/50 hover:shadow-lg transition-all cursor-pointer group">
                    <solution.icon className="h-8 w-8 text-[#0284c7] mb-4" />
                    <h3 className="text-xl font-bold mb-3 group-hover:text-[#0284c7] transition-colors">
                      {solution.title}
                    </h3>
                    <p className="text-[#46586b] dark:text-slate-400 leading-relaxed mb-4">
                      {solution.description}
                    </p>
                    <span className="inline-flex items-center text-[#0284c7] font-semibold text-sm">
                      Learn more
                      <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-12 rounded-3xl overflow-hidden shadow-xl max-w-3xl mx-auto">
              <img
                src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=85"
                alt="Modern tech workspace"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </section>

        {/* Industries We Serve in Harare */}
        <section className="py-20 sm:py-28 bg-white dark:bg-cc-card">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-black mb-4">
                Industries We Serve in Harare
              </h2>
              <p className="text-lg text-[#46586b] dark:text-slate-300 max-w-2xl mx-auto">
                From financial services to agriculture, we provide tailored technology solutions for every major industry in Harare.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {industries.map((industry) => (
                <div
                  key={industry.title}
                  className="p-6 rounded-2xl border border-gray-200 dark:border-white/10 hover:border-[#0284c7]/50 transition-colors text-center"
                >
                  <industry.icon className="h-10 w-10 text-[#0284c7] mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-3">{industry.title}</h3>
                  <p className="text-[#46586b] dark:text-slate-400 leading-relaxed">
                    {industry.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 sm:py-28 bg-gradient-to-br from-[#0284c7] to-[#0369a1] text-white">
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl sm:text-4xl font-black mb-6">
              Get Started in Harare
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Ready to transform your Harare business with integrated technology solutions? Let's discuss how ClawnCore can help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/get-started">
                <Button className="h-12 px-8 bg-white text-[#0369a1] hover:bg-gray-100 font-bold">
                  Get Started
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  className="h-12 px-8 border-white/30 text-white hover:bg-white/10 font-bold"
                >
                  Contact Sales
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
