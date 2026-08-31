import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Linkedin, Twitter, Github, ArrowRight } from 'lucide-react';
import { Link } from 'wouter';
import { SectionDivider } from './SectionDivider';

const FOOTER_LINKS = {
  company: {
    title: 'Company',
    links: [
      { name: 'About Us', href: '/#about' },
      { name: 'Vision & Mission', href: '/#vision' },
      { name: 'Careers', href: '/careers' },
      { name: 'News & Blog', href: '/' },
      { name: 'Contact', href: '/#contact' },
    ],
  },
  solutions: {
    title: 'Solutions',
    links: [
      { name: 'Smart Agriculture', href: '/agriculture' },
      { name: 'Cybersecurity', href: '/cybersecurity' },
      { name: 'Cloud Infrastructure', href: '/cloud' },
      { name: 'AI & Machine Learning', href: '/ml' },
      { name: 'Data Analytics', href: '/data-analytics' },
    ],
  },
  resources: {
    title: 'Resources',
    links: [
      { name: 'Documentation', href: '/get-started' },
      { name: 'API Reference', href: '/get-started' },
      { name: 'Case Studies', href: '/#about' },
      { name: 'System Status', href: '/get-started' },
      { name: 'Partnerships', href: '/get-started' },
    ],
  },
  connect: {
    title: 'Connect',
    links: [
      { name: 'Contact Sales', href: '/get-started' },
      { name: 'Request Demo', href: '/get-started' },
      { name: 'Enterprise', href: '/get-started' },
      { name: 'Support', href: '/get-started' },
    ],
  },
};

export function Footer() {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  return (
    <footer className="bg-cc-darker text-white">
      <SectionDivider />

      <div className="container mx-auto px-4 sm:px-6">
        {/* Top section: Newsletter + Featured */}
        <div className="py-12 sm:py-16 flex flex-col lg:flex-row gap-10 lg:gap-16 justify-between border-b border-white/10">
          {/* Newsletter */}
          <div className="max-w-md">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-nvidia-500 mb-3">Newsletter</p>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">Stay ahead of the curve</h3>
            <p className="text-base text-slate-300 mb-5">Get the latest insights on AI, cloud, cybersecurity, and smart agriculture delivered to your inbox.</p>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 h-12 bg-white/5 border-white/15 text-white placeholder:text-white/40 text-base rounded-lg focus:border-nvidia-500/50"
              />
              <Button type="submit" className="h-12 px-6 bg-nvidia-500 hover:bg-nvidia-600 text-black font-bold text-sm rounded-lg">
                <ArrowRight className="w-4 h-4" />
              </Button>
            </form>
          </div>

          {/* Featured product */}
          <div className="max-w-sm">
            <div className="rounded-2xl bg-white/[0.05] border border-white/10 p-6">
              <img src="/drone hero.png" alt="ClawnAI" loading="lazy" className="w-full h-36 object-cover rounded-xl mb-4" />
              <p className="text-xs font-mono text-nvidia-500 uppercase tracking-wider mb-2">Featured Platform</p>
              <h4 className="text-xl font-bold text-white mb-2">ClawnAI Core</h4>
              <p className="text-base text-slate-300 mb-4">Unified intelligence orchestrating every solution across the multitech ecosystem.</p>
              <Link href="/clawn-ai">
                <span className="inline-flex items-center gap-1.5 text-base font-bold text-nvidia-500 hover:text-nvidia-400 cursor-pointer transition-colors">
                  Explore Platform <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Link columns */}
        <div className="py-12 sm:py-16 grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10">
          {Object.entries(FOOTER_LINKS).map(([key, section]) => (
            <div key={key}>
              <h4 className="text-sm font-bold uppercase tracking-wider text-white/60 mb-5">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href}>
                      <span className="text-base text-slate-300 hover:text-white transition-colors cursor-pointer">
                        {link.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="py-6 sm:py-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-md bg-nvidia-500 flex items-center justify-center">
              <span className="text-black font-black text-sm">C</span>
            </div>
            <p className="text-sm text-slate-400">
              © 2025 ClawnCore Multitech Company. All rights reserved.
            </p>
          </div>

          <div className="flex items-center gap-5">
            <div className="flex items-center gap-3">
              {[Linkedin, Twitter, Github].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-lg bg-white/5 hover:bg-nvidia-500/20 flex items-center justify-center text-slate-400 hover:text-nvidia-500 transition-colors">
                  <Icon size={16} />
                </a>
              ))}
            </div>
            <div className="h-4 w-px bg-white/15" />
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-400">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
