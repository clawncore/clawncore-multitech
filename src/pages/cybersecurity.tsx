import { useLocation } from 'wouter';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PersistentCTA } from '@/components/PersistentCTA';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { AlertTriangle, Building2, Eye, FileLock2, LockKeyhole, Network, ShieldCheck } from 'lucide-react';

const history = [
  {
    period: 'Early computer security',
    text: 'Security first focused on protecting individual computers with passwords, physical access control, and basic antivirus tools. The main goal was stopping unauthorized users and simple malware.',
  },
  {
    period: 'Internet-era threats',
    text: 'As businesses, banks, schools, and governments connected to the internet, attackers began using phishing, worms, spyware, and website attacks to steal information and disrupt services.',
  },
  {
    period: 'Cloud and mobile security',
    text: 'Smartphones, online banking, remote work, cloud storage, and digital payments expanded the attack surface. Security had to protect identities, networks, applications, and data across many devices.',
  },
  {
    period: 'Modern cybersecurity',
    text: 'Today cybersecurity combines monitoring, encryption, identity control, backups, threat intelligence, staff training, incident response, and zero-trust principles to protect digital operations in real time.',
  },
];

const practices = [
  {
    icon: Eye,
    title: 'Threat monitoring',
    text: 'Continuous monitoring helps detect suspicious logins, abnormal network traffic, malware behavior, and system misuse before damage spreads.',
  },
  {
    icon: LockKeyhole,
    title: 'Identity protection',
    text: 'Strong passwords, multi-factor authentication, user permissions, and access reviews reduce the risk of stolen accounts being used to enter critical systems.',
  },
  {
    icon: FileLock2,
    title: 'Data protection',
    text: 'Encryption, backups, access control, and secure storage protect customer records, financial data, business documents, school records, and institutional information.',
  },
  {
    icon: Network,
    title: 'Network resilience',
    text: 'Firewalls, segmentation, endpoint security, and response planning help organizations contain attacks and keep essential services running.',
  },
];

const zimbabweNeeds = [
  'More businesses are moving payments, records, customer service, and operations online.',
  'Mobile money, banking platforms, and digital transactions need stronger protection against fraud and phishing.',
  'Schools, clinics, farms, SMEs, and public institutions hold sensitive data that must be protected.',
  'Many organizations need practical cybersecurity training, not just software tools.',
  'Reliable backups and incident response plans are important because ransomware can stop operations completely.',
];

export default function Cybersecurity() {
  const [, navigate] = useLocation();
  const { openLoginModal, isAuthenticated } = useAuth();

  const handleWatchDemo = () => {
    if (!isAuthenticated) {
      openLoginModal();
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-[#101827]">
      <Header />

      <main>
        <section className="relative overflow-hidden bg-[#05070b] px-4 sm:px-6 pb-16 sm:pb-20 pt-24 sm:pt-28 text-white md:pb-28 md:pt-36">
          <div className="absolute inset-0 opacity-20">
            <img src="/cyber security heropng" alt="Cybersecurity network" loading="lazy" className="h-full w-full object-cover" />
          </div>
          <div className="absolute inset-0 bg-[#05070b]/85" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-white/10" />

          <div className="container relative z-10 mx-auto grid gap-8 sm:gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <p className="mb-3 sm:mb-4 text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] sm:tracking-[0.35em] text-[#8ab4ff]">
                Cybersecurity Solution
              </p>
              <h1 className="mb-4 sm:mb-6 max-w-4xl text-3xl sm:text-5xl font-black tracking-tight md:text-7xl lg:text-[82px]">
                Protecting the systems people depend on.
              </h1>
              <p className="max-w-2xl text-base sm:text-xl leading-7 sm:leading-8 text-white/90 md:text-2xl">
                Cybersecurity is the practice of protecting computers, networks, applications, accounts, and data from theft, fraud, disruption, and misuse.
              </p>
              <p className="mt-4 sm:mt-6 max-w-2xl text-sm sm:text-base leading-6 sm:leading-7 text-slate-300">
                For Zimbabwe, strong cybersecurity supports banks, mobile money, schools, farms, SMEs, clinics, public institutions, and every organization becoming more digital.
              </p>
              <div className="mt-6 sm:mt-9 flex flex-col gap-3 sm:gap-4 sm:flex-row">
                <Button
                  onClick={() => navigate('/get-started')}
                  className="h-11 sm:h-12 rounded-[4px] bg-[#2563eb] px-6 sm:px-8 text-sm font-bold text-white hover:bg-[#1d4ed8]"
                >
                  Start Security Review
                </Button>
                <Button
                  onClick={handleWatchDemo}
                  className="h-11 sm:h-12 rounded-[4px] border border-white/25 bg-white/10 px-6 sm:px-8 text-sm font-bold text-white backdrop-blur-md hover:bg-white/20"
                >
                  Watch Security Demo
                </Button>
              </div>
            </div>

            <div className="rounded-[18px] border border-white/10 bg-[#0d1117] p-3 shadow-2xl">
              <div className="relative overflow-hidden rounded-[16px] bg-black">
                <img src="/cyber security heropng" alt="Cybersecurity operations interface" loading="lazy" className="aspect-video w-full object-cover opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#8ab4ff]">Security Operations View</p>
                  <p className="mt-2 max-w-md text-sm leading-6 text-white/85">A clean visual layer for monitoring access, threats, backups, and digital infrastructure readiness.</p>
                </div>
              </div>
              <div className="grid gap-3 p-4 sm:grid-cols-3">
                <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-2xl font-black">24/7</p>
                  <p className="text-xs uppercase tracking-widest text-slate-400">Threat awareness</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-2xl font-black">Zero</p>
                  <p className="text-xs uppercase tracking-widest text-slate-400">Trust mindset</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-2xl font-black">Local</p>
                  <p className="text-xs uppercase tracking-widest text-slate-400">Zimbabwe readiness</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 sm:px-6 py-16 sm:py-20 md:py-28">
          <div className="container mx-auto grid gap-8 sm:gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-[#2563eb]">What It Means</p>
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight md:text-6xl">What is cybersecurity?</h2>
            </div>
            <div className="space-y-4 sm:space-y-6 text-base sm:text-lg leading-7 sm:leading-8 text-[#41516b]">
              <p>
                Cybersecurity is not only about hackers. It is about protecting trust. When a business stores customer records, receives payments, uses email, runs a website, connects cameras, manages staff accounts, or keeps files in the cloud, it has digital risk.
              </p>
              <p>
                A cybersecurity system reduces that risk by protecting identities, devices, networks, applications, and data. It also prepares the organization for what to do if something goes wrong, because response time matters.
              </p>
              <p>
                Good cybersecurity combines technology and behavior: secure systems, trained people, clear policies, reliable backups, and constant awareness of new threats.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white px-4 sm:px-6 py-16 sm:py-20 md:py-28">
          <div className="container mx-auto">
            <div className="mb-8 sm:mb-12 max-w-3xl">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-[#2563eb]">History</p>
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight md:text-6xl">How cybersecurity evolved.</h2>
            </div>
            <div className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-4">
              {history.map((item) => (
                <div key={item.period} className="rounded-2xl sm:rounded-3xl border border-sky-100 bg-[#f8fbff] p-5 sm:p-6">
                  <h3 className="mb-3 sm:mb-4 text-lg sm:text-xl font-black text-[#0f2f5f]">{item.period}</h3>
                  <p className="text-sm leading-6 sm:leading-7 text-[#41516b]">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 sm:px-6 py-16 sm:py-20 md:py-28">
          <div className="container mx-auto grid gap-8 sm:gap-12 lg:grid-cols-2 lg:items-center">
            <div className="overflow-hidden rounded-2xl sm:rounded-[32px] bg-[#07111f] shadow-2xl">
              <img src="/cyber security heropng" alt="Cybersecurity infrastructure" loading="lazy" className="h-64 sm:h-full sm:min-h-[420px] w-full object-cover opacity-85" />
            </div>
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-[#2563eb]">Zimbabwe Context</p>
              <h2 className="mb-4 sm:mb-6 text-2xl sm:text-4xl font-black tracking-tight md:text-6xl">Why cybersecurity matters for Zimbabwe.</h2>
              <p className="mb-5 sm:mb-7 text-base sm:text-lg leading-7 sm:leading-8 text-[#41516b]">
                Zimbabwe is becoming more digital every year. Businesses use online payments, cloud files, websites, WhatsApp commerce, mobile banking, school systems, farm records, and connected devices. As digital activity grows, cyber risk grows with it.
              </p>
              <div className="space-y-2.5 sm:space-y-3">
                {zimbabweNeeds.map((need) => (
                  <div key={need} className="flex gap-3 rounded-xl sm:rounded-2xl bg-white p-3 sm:p-4 shadow-sm">
                    <ShieldCheck className="mt-1 h-5 w-5 flex-shrink-0 text-[#2563eb]" />
                    <p className="text-sm leading-5 sm:leading-6 text-[#41516b]">{need}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#05070b] px-4 sm:px-6 py-16 sm:py-20 text-white md:py-28">
          <div className="container mx-auto">
            <div className="mb-8 sm:mb-12 max-w-4xl">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-[#8ab4ff]">ClawnCore Multitech Role</p>
              <h2 className="mb-4 sm:mb-6 text-2xl sm:text-4xl font-black tracking-tight md:text-6xl">Building practical cyber protection for local organizations.</h2>
              <p className="text-base sm:text-lg leading-7 sm:leading-8 text-slate-300">
                ClawnCore Multitech's role is to help Zimbabwean organizations move from reactive security to prepared security. That means assessments, secure cloud setups, staff awareness, endpoint protection, backup planning, incident response, and monitoring that fits the size and reality of the organization.
              </p>
            </div>
            <div className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-4">
              {practices.map(({ icon: Icon, title, text }) => (
                <div key={title} className="rounded-xl sm:rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:p-6">
                  <Icon className="mb-4 sm:mb-5 h-7 w-7 sm:h-8 sm:w-8 text-[#8ab4ff]" />
                  <h3 className="mb-2 sm:mb-3 text-lg sm:text-xl font-black">{title}</h3>
                  <p className="text-sm leading-6 sm:leading-7 text-slate-400">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#eaf2ff] px-4 sm:px-6 py-16 sm:py-20 md:py-28">
          <div className="container mx-auto grid gap-8 sm:gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-[#2563eb]">Real Organization Outcome</p>
              <h2 className="mb-4 sm:mb-6 text-2xl sm:text-4xl font-black tracking-tight md:text-6xl">The result should be confidence, continuity, and trust.</h2>
              <p className="text-base sm:text-lg leading-7 sm:leading-8 text-[#41516b]">
                A cybersecurity project succeeds when an organization knows who has access, where important data lives, what systems are exposed, how backups work, how staff recognize scams, and what steps to take during an incident.
              </p>
            </div>
            <div className="rounded-2xl sm:rounded-[32px] bg-white p-6 sm:p-8 shadow-xl">
              <Building2 className="mb-4 sm:mb-6 h-8 w-8 sm:h-10 sm:w-10 text-[#2563eb]" />
              <h3 className="mb-3 sm:mb-4 text-xl sm:text-2xl font-black text-[#0f2f5f]">ClawnCore focus</h3>
              <p className="text-sm sm:text-base leading-6 sm:leading-7 text-[#41516b]">
                We want cybersecurity in Zimbabwe to be understandable, affordable, and useful: basic protection for small teams, stronger controls for growing companies, and secure infrastructure for institutions handling critical data.
              </p>
              <div className="mt-4 sm:mt-6 rounded-xl sm:rounded-2xl bg-[#f5f7fb] p-3 sm:p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="mt-1 h-5 w-5 flex-shrink-0 text-[#2563eb]" />
                  <p className="text-sm leading-5 sm:leading-6 text-[#41516b]">
                    The goal is not fear. The goal is preparation: protect systems before an attack, and recover quickly if one happens.
                  </p>
                </div>
              </div>
              <Button onClick={() => navigate('/get-started')} className="mt-5 sm:mt-7 h-11 sm:h-12 rounded-[4px] bg-[#2563eb] px-6 sm:px-8 font-bold text-white hover:bg-[#1d4ed8]">
                Start with ClawnCore
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
