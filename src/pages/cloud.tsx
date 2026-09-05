import { useLocation } from 'wouter';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PersistentCTA } from '@/components/PersistentCTA';
import { SEO, ServiceSchema } from '@/components/SEO';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { Cloud, Database, Lock, Server, Wifi, Zap } from 'lucide-react';

const history = [
  {
    period: 'On-site servers',
    text: 'Organizations first kept files, applications, and databases on computers inside their own offices. This gave control, but it was expensive to maintain and difficult to scale.',
  },
  {
    period: 'Data centers',
    text: 'Larger companies moved systems into dedicated facilities with stronger power, cooling, networking, and backup infrastructure. This improved reliability but still required major investment.',
  },
  {
    period: 'Public cloud',
    text: 'Cloud platforms made it possible to rent computing power, storage, databases, and software over the internet instead of buying all infrastructure upfront.',
  },
  {
    period: 'Hybrid and edge cloud',
    text: 'Modern cloud infrastructure now combines public cloud, private systems, and edge devices so data can be processed closer to users, farms, branches, factories, and field operations.',
  },
];

const practices = [
  {
    icon: Server,
    title: 'Reliable hosting',
    text: 'Websites, dashboards, apps, and databases need stable hosting so customers, staff, and partners can access services when they need them.',
  },
  {
    icon: Database,
    title: 'Secure data storage',
    text: 'Cloud infrastructure helps organizations store documents, records, system logs, customer data, and backups with better access control.',
  },
  {
    icon: Zap,
    title: 'Scalable operations',
    text: 'Systems can grow as demand increases, so a business does not need to buy expensive servers before it knows its real usage.',
  },
  {
    icon: Lock,
    title: 'Governed access',
    text: 'Identity controls, user permissions, monitoring, and backup policies help teams use cloud systems safely and professionally.',
  },
];

const zimbabweNeeds = [
  'Businesses need reliable websites, email, payment systems, databases, and digital records.',
  'Schools, clinics, farms, SMEs, and institutions need safer storage than one office computer or one flash drive.',
  'Cloud backups reduce the risk of losing records after theft, device failure, fire, or ransomware.',
  'Remote work and branch operations need secure access to the same information from different locations.',
  'Local organizations need cloud systems that match their budget, internet realities, and growth stage.',
];

export default function CloudComputing() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-[#f6f8fb] text-[#111827]">
      <SEO
        title="Cloud Infrastructure"
        description="Globally distributed, high-availability cloud fabric for mission-critical autonomous workloads. Cloud solutions for Zimbabwean organizations."
        keywords={[
          'cloud hosting Zimbabwe',
          'cloud services Africa',
          'business cloud infrastructure',
          'cloud migration services',
          'managed cloud services Africa',
        ]}
        ogImage="/og-cloud.png"
      />
      <ServiceSchema
        name="Cloud Infrastructure"
        description="Globally distributed, high-availability cloud fabric for mission-critical autonomous workloads."
        url="https://clawncore.com/platforms/cloud-infrastructure"
        serviceType="Cloud Infrastructure"
      />

      <Header />
      <main>
        <section className="relative overflow-hidden bg-[#060b14] px-4 sm:px-6 pb-16 sm:pb-20 pt-24 sm:pt-28 text-white md:pb-28 md:pt-36">
          <div className="container relative z-10 mx-auto mb-8">
            <Breadcrumbs
              items={[
                { name: 'Platforms', url: '/platforms' },
                { name: 'Cloud Infrastructure', url: '/platforms/cloud-infrastructure' },
              ]}
              className="text-white/70"
            />
          </div>
          <div className="absolute inset-0 opacity-22">
            <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2200&q=85" alt="Cloud infrastructure network" loading="lazy" className="h-full w-full object-cover" />
          </div>
          <div className="absolute inset-0 bg-[#060b14]/85" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-white/10" />

          <div className="container relative z-10 mx-auto grid gap-8 sm:gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <p className="mb-3 sm:mb-4 text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] sm:tracking-[0.35em] text-[#93c5fd]">Cloud Infrastructure Solution</p>
              <h1 className="mb-4 sm:mb-6 max-w-4xl text-3xl sm:text-5xl font-black tracking-tight md:text-7xl lg:text-[82px]">The digital foundation behind modern organizations.</h1>
              <p className="max-w-2xl text-base sm:text-xl leading-7 sm:leading-8 text-white/90 md:text-2xl">Cloud infrastructure is the online computing layer that stores data, runs applications, hosts systems, protects backups, and connects teams.</p>
              <p className="mt-4 sm:mt-6 max-w-2xl text-sm sm:text-base leading-6 sm:leading-7 text-slate-300">For Zimbabwe, cloud infrastructure can help businesses, farms, schools, clinics, and institutions become more reliable, organized, and resilient without buying heavy server infrastructure upfront.</p>
              <div className="mt-6 sm:mt-9 flex flex-col gap-3 sm:gap-4 sm:flex-row">
                <Button onClick={() => navigate('/get-started')} className="h-11 sm:h-12 rounded-[4px] bg-[#2563eb] px-6 sm:px-8 text-sm font-bold text-white hover:bg-[#1d4ed8]">Plan Cloud Setup</Button>
                <Button onClick={() => navigate('/cybersecurity')} className="h-11 sm:h-12 rounded-[4px] border border-white/25 bg-white/10 px-6 sm:px-8 text-sm font-bold text-white backdrop-blur-md hover:bg-white/20">Secure the Cloud</Button>
              </div>
            </div>

            <div className="rounded-[18px] border border-white/10 bg-[#0d1117] p-3 shadow-2xl">
              <div className="relative overflow-hidden rounded-[16px] bg-black">
                <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1400&q=85" alt="Cloud infrastructure visual" loading="lazy" className="aspect-video w-full object-cover opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#93c5fd]">Infrastructure View</p>
                  <p className="mt-2 max-w-md text-sm leading-6 text-white/85">Hosting, storage, backups, access control, and monitoring in one dependable digital foundation.</p>
                </div>
              </div>
              <div className="grid gap-3 p-4 sm:grid-cols-3">
                <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4"><p className="text-2xl font-black">99.9%</p><p className="text-xs uppercase tracking-widest text-slate-400">Reliability target</p></div>
                <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4"><p className="text-2xl font-black">Backup</p><p className="text-xs uppercase tracking-widest text-slate-400">Recovery planning</p></div>
                <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4"><p className="text-2xl font-black">Scale</p><p className="text-xs uppercase tracking-widest text-slate-400">Grow as needed</p></div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 sm:px-6 py-16 sm:py-20 md:py-28"><div className="container mx-auto grid gap-8 sm:gap-12 lg:grid-cols-[0.8fr_1.2fr]"><div><p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-[#2563eb]">What It Means</p><h2 className="text-2xl sm:text-4xl font-black tracking-tight md:text-6xl">What is cloud infrastructure?</h2></div><div className="space-y-4 sm:space-y-6 text-base sm:text-lg leading-7 sm:leading-8 text-[#4b5563]"><p>Cloud infrastructure is a shared digital environment where organizations can run software, store files, host websites, manage databases, and protect backups over the internet.</p><p>Instead of keeping everything on one office machine, teams can use managed servers, storage, networks, and security tools that are designed for reliability and growth.</p><p>The goal is not just being online. The goal is continuity: your information, applications, and operations should remain accessible, protected, and recoverable.</p></div></div></section>

        <section className="bg-white px-4 sm:px-6 py-16 sm:py-20 md:py-28"><div className="container mx-auto"><div className="mb-8 sm:mb-12 max-w-3xl"><p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-[#2563eb]">History</p><h2 className="text-2xl sm:text-4xl font-black tracking-tight md:text-6xl">How infrastructure moved to the cloud.</h2></div><div className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-4">{history.map((item) => (<div key={item.period} className="rounded-2xl sm:rounded-3xl border border-blue-100 bg-[#f8fbff] p-5 sm:p-6"><h3 className="mb-3 sm:mb-4 text-lg sm:text-xl font-black text-[#102a56]">{item.period}</h3><p className="text-sm leading-6 sm:leading-7 text-[#4b5563]">{item.text}</p></div>))}</div></div></section>

        <section className="px-4 sm:px-6 py-16 sm:py-20 md:py-28"><div className="container mx-auto grid gap-8 sm:gap-12 lg:grid-cols-2 lg:items-center"><div className="overflow-hidden rounded-2xl sm:rounded-[32px] bg-[#060b14] shadow-2xl"><img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1300&q=85" alt="Server infrastructure" loading="lazy" className="h-64 sm:h-full sm:min-h-[420px] w-full object-cover opacity-90" /></div><div><p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-[#2563eb]">Zimbabwe Context</p><h2 className="mb-4 sm:mb-6 text-2xl sm:text-4xl font-black tracking-tight md:text-6xl">Why cloud matters for Zimbabwe.</h2><p className="mb-5 sm:mb-7 text-base sm:text-lg leading-7 sm:leading-8 text-[#4b5563]">Many organizations are becoming digital but still rely on fragile setups: single laptops, unmanaged emails, weak backups, scattered files, and systems that fail when one device is lost or damaged.</p><div className="space-y-2.5 sm:space-y-3">{zimbabweNeeds.map((need) => (<div key={need} className="flex gap-3 rounded-xl sm:rounded-2xl bg-white p-3 sm:p-4 shadow-sm"><Cloud className="mt-1 h-5 w-5 flex-shrink-0 text-[#2563eb]" /><p className="text-sm leading-5 sm:leading-6 text-[#4b5563]">{need}</p></div>))}</div></div></div></section>

        <section className="bg-[#060b14] px-4 sm:px-6 py-16 sm:py-20 text-white md:py-28"><div className="container mx-auto"><div className="mb-8 sm:mb-12 max-w-4xl"><p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-[#93c5fd]">ClawnCore Multitech Role</p><h2 className="mb-4 sm:mb-6 text-2xl sm:text-4xl font-black tracking-tight md:text-6xl">Building reliable digital foundations locally.</h2><p className="text-base sm:text-lg leading-7 sm:leading-8 text-slate-300">ClawnCore helps organizations design practical cloud setups: hosting, databases, email systems, storage, backups, access control, monitoring, and migration from fragile local-only systems.</p></div><div className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-4">{practices.map(({ icon: Icon, title, text }) => (<div key={title} className="rounded-xl sm:rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:p-6"><Icon className="mb-4 sm:mb-5 h-7 w-7 sm:h-8 sm:w-8 text-[#93c5fd]" /><h3 className="mb-2 sm:mb-3 text-lg sm:text-xl font-black">{title}</h3><p className="text-sm leading-6 sm:leading-7 text-slate-400">{text}</p></div>))}</div></div></section>

        <section className="bg-[#eaf2ff] px-4 sm:px-6 py-16 sm:py-20 md:py-28"><div className="container mx-auto grid gap-8 sm:gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-center"><div><p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-[#2563eb]">Real Organization Outcome</p><h2 className="mb-4 sm:mb-6 text-2xl sm:text-4xl font-black tracking-tight md:text-6xl">The result should be stability, access, and recovery.</h2><p className="text-base sm:text-lg leading-7 sm:leading-8 text-[#4b5563]">A cloud project succeeds when people can access the right information securely, backups are tested, systems can grow, and the organization is not stopped by one broken computer or missing file.</p></div><div className="rounded-2xl sm:rounded-[32px] bg-white p-6 sm:p-8 shadow-xl"><Wifi className="mb-4 sm:mb-6 h-8 w-8 sm:h-10 sm:w-10 text-[#2563eb]" /><h3 className="mb-3 sm:mb-4 text-xl sm:text-2xl font-black text-[#102a56]">ClawnCore focus</h3><p className="text-sm sm:text-base leading-6 sm:leading-7 text-[#4b5563]">We make cloud infrastructure understandable and useful for local operations: clear architecture, simple dashboards, secure access, backups, and support for growth.</p><Button onClick={() => navigate('/get-started')} className="mt-5 sm:mt-7 h-11 sm:h-12 rounded-[4px] bg-[#2563eb] px-6 sm:px-8 font-bold text-white hover:bg-[#1d4ed8]">Start with ClawnCore</Button></div></div></section>
      </main>
      <Footer />
      <PersistentCTA />
    </div>
  );
}
