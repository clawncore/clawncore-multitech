import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PersistentCTA } from '@/components/PersistentCTA';
import { SEO, OrganizationSchema } from '@/components/SEO';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Target, Eye, Heart, Users, Globe, Shield, Sprout, Brain, Cloud, ShieldCheck, BarChart3, Cpu } from 'lucide-react';

const values = [
  {
    icon: Target,
    title: 'Practical Focus',
    description: 'We build technology that solves real problems for real organizations. Every feature is designed for practical outcomes, not just impressive demos.',
  },
  {
    icon: Eye,
    title: 'Local Understanding',
    description: 'We understand the unique challenges and opportunities in Zimbabwe and Africa. Our solutions are built for local infrastructure, budgets, and needs.',
  },
  {
    icon: Heart,
    title: 'User Success',
    description: 'Our success is measured by the success of our users. We provide training, support, and ongoing assistance to ensure every organization thrives.',
  },
  {
    icon: Users,
    title: 'Integrated Ecosystem',
    description: 'Six platforms working together seamlessly. Not fragmented point solutions, but a unified technology ecosystem that grows with you.',
  },
  {
    icon: Globe,
    title: 'Africa-First Design',
    description: 'Built for Africa from the start. Not adapted from global solutions, but designed specifically for African infrastructure and needs.',
  },
  {
    icon: Shield,
    title: 'Reliable Partnership',
    description: 'We are committed to long-term partnerships. Our goal is to be your trusted technology partner for years to come.',
  },
];

const team = [
  {
    name: 'Leadership Team',
    role: 'ClawnCore Multitech',
    bio: 'A team passionate about leveraging innovation to solve Africa\'s most pressing challenges. Building integrated solutions for agriculture, security, cloud, and intelligence.',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-cc-darker text-gray-900 dark:text-white">
      <SEO
        title="About ClawnCore Multitech"
        description="Learn about ClawnCore Multitech - an integrated technology ecosystem for Africa, providing smart agriculture, cybersecurity, cloud, AI, and analytics solutions for Zimbabwe and beyond."
        keywords={[
          'ClawnCore Multitech',
          'technology company Zimbabwe',
          'Africa technology solutions',
          'integrated technology ecosystem',
          'smart agriculture Zimbabwe',
          'cybersecurity Zimbabwe',
          'cloud hosting Zimbabwe',
        ]}
        ogImage="/og-about.png"
      />
      <OrganizationSchema />

      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative py-24 sm:py-32 overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=2200&q=85"
              alt=""
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-white/40 dark:from-cc-darker/90 dark:via-cc-darker/70 dark:to-cc-darker/40" />
          </div>
          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <Breadcrumbs items={[{ name: 'About', url: '/about' }]} className="mb-8" />

            <div className="max-w-4xl">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-6">
                Building integrated technology for{' '}
                <span className="text-nvidia-500">Africa</span>
              </h1>
              <p className="text-xl sm:text-2xl text-gray-600 dark:text-slate-300 leading-relaxed mb-8">
                ClawnCore Multitech is an integrated technology ecosystem bringing together agriculture, security, cloud, intelligence, and analytics into a single unified platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/get-started">
                  <Button className="h-12 px-8 bg-nvidia-500 hover:bg-nvidia-600 text-white font-bold">
                    Get Started
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" className="h-12 px-8 font-bold">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 sm:py-28">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl font-black mb-6">Our Mission</h2>
                <p className="text-lg text-gray-600 dark:text-slate-300 leading-relaxed mb-6">
                  To make advanced technology accessible, practical, and affordable for African organizations. We believe every farm, business, school, and institution deserves access to integrated technology solutions that work for their reality.
                </p>
                <p className="text-lg text-gray-600 dark:text-slate-300 leading-relaxed">
                  We are not just building software. We are building an ecosystem that helps organizations thrive in the digital age—starting with Zimbabwe and expanding across Africa.
                </p>
              </div>
              <div className="relative">
                <div className="rounded-3xl overflow-hidden bg-gradient-to-br from-nvidia-500/20 to-nvidia-500/5 p-8">
                  <div className="text-center mb-8">
                    <div className="text-6xl sm:text-7xl font-black text-nvidia-500 mb-4">6</div>
                    <div className="text-xl font-bold">Integrated Platforms</div>
                    <div className="text-gray-600 dark:text-slate-400 mt-2">One Unified Ecosystem</div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { name: 'Smart Agriculture', color: '#2f7d32', image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=300&q=80' },
                      { name: 'Cybersecurity', color: '#0284c7', image: 'https://images.unsplash.com/photo-1563986768609-322da13575f2?auto=format&fit=crop&w=300&q=80' },
                      { name: 'Cloud Infrastructure', color: '#2563eb', image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=300&q=80' },
                      { name: 'AI & ML', color: '#6d5dfc', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=300&q=80' },
                      { name: 'Data Analytics', color: '#0ea5e9', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=300&q=80' },
                      { name: 'ClawnAI', color: '#7c3aed', image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=300&q=80' },
                    ].map((platform) => (
                      <div key={platform.name} className="relative rounded-xl overflow-hidden group">
                        <img src={platform.image} alt={platform.name} className="w-full h-24 object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                        <span className="absolute bottom-2 left-2 right-2 text-xs font-bold text-white text-center leading-tight">{platform.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 sm:py-28 bg-white dark:bg-cc-card">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-black mb-4">Our Values</h2>
              <p className="text-lg text-gray-600 dark:text-slate-300 max-w-2xl mx-auto">
                The principles that guide everything we build and do.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="p-6 rounded-2xl border border-gray-200 dark:border-white/10 hover:border-nvidia-500/50 transition-colors"
                >
                  <value.icon className="h-8 w-8 text-nvidia-500 mb-4" />
                  <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-gray-600 dark:text-slate-400 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 sm:py-28">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-black mb-8 text-center">Our Story</h2>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-lg text-gray-600 dark:text-slate-300 leading-relaxed mb-6">
                  ClawnCore Multitech was founded with a simple observation: African organizations need technology that works for their reality. Too many solutions are either too expensive, too complex, or not designed for local conditions.
                </p>
                <p className="text-lg text-gray-600 dark:text-slate-300 leading-relaxed mb-6">
                  We started with smart agriculture—using drones and analytics to help Zimbabwean farmers improve their yields. But we quickly realized that the real opportunity was in integration. Farms need agriculture technology, but they also need cybersecurity, cloud infrastructure, data analytics, and AI.
                </p>
                <p className="text-lg text-gray-600 dark:text-slate-300 leading-relaxed mb-6">
                  So we built an ecosystem. Six platforms working together seamlessly: Smart Agriculture, Cybersecurity, Cloud Infrastructure, AI & Machine Learning, Data Analytics, and ClawnAI—the orchestration layer that ties everything together.
                </p>
                <p className="text-lg text-gray-600 dark:text-slate-300 leading-relaxed">
                  Today, we serve farms, businesses, schools, clinics, and institutions across Zimbabwe. Our goal is to expand across Africa, bringing integrated technology to organizations that need it most.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 sm:py-28 bg-white dark:bg-cc-card">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-black mb-4">Our Team</h2>
              <p className="text-lg text-gray-600 dark:text-slate-300 max-w-2xl mx-auto">
                Meet the team building the future of African technology.
              </p>
            </div>

            <div className="max-w-md mx-auto">
              {team.map((member) => (
                <div
                  key={member.name}
                  className="text-center p-8 rounded-2xl border border-gray-200 dark:border-white/10"
                >
                  <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                    <img
                      src="/ceo.png"
                      alt="Leadership"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-nvidia-500 font-medium mb-4">{member.role}</p>
                  <p className="text-gray-600 dark:text-slate-400 leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 sm:py-28 bg-gradient-to-br from-nvidia-500 to-nvidia-600 text-white">
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6">
              Ready to Transform Your Organization?
            </h2>
            <p className="text-xl sm:text-2xl text-white/90 max-w-3xl mx-auto mb-10">
              Join the organizations already using ClawnCore to thrive in the digital age.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button className="h-14 px-10 bg-white text-nvidia-600 hover:bg-gray-100 font-bold text-lg">
                  Contact Us
                </Button>
              </Link>
              <Link href="/get-started">
                <Button variant="outline" className="h-14 px-10 border-white/30 text-white hover:bg-white/10 font-bold text-lg">
                  Get Started
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
