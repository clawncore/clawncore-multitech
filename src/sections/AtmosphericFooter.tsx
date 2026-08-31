import { Link } from 'wouter';
import { ArrowUpRight, Twitter, Github, Linkedin, Youtube, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const FOOTER_COLS = [
  {
    title: 'Company Information',
    links: [
      { name: 'About Us', href: '#about' },
      { name: 'Vision & Mission', href: '#vision-roadmap' },
      { name: 'Leadership', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Press Kit', href: '#' },
      { name: 'Sustainability', href: '#' },
    ],
  },
  {
    title: 'Products & Technology',
    links: [
      { name: 'ClawnAI Platform', href: '/clawn-ai' },
      { name: 'Drone Systems', href: '/agriculture' },
      { name: 'Cloud Infrastructure', href: '/cloud' },
      { name: 'Cybersecurity Suite', href: '/cybersecurity' },
      { name: 'Machine Learning', href: '/ml' },
      { name: 'Data Analytics', href: '/data-analytics' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { name: 'Technical Documentation', href: '#' },
      { name: 'API Reference', href: '#' },
      { name: 'Case Studies', href: '#' },
      { name: 'System Status', href: '#' },
      { name: 'Partnerships', href: '#' },
      { name: 'GTC AI Conference', href: '#' },
    ],
  },
];

const SOCIAL = [
  { icon: Twitter, href: '#', label: 'Twitter / X' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Youtube, href: '#', label: 'YouTube' },
];

const LEGAL = ['Privacy Policy', 'Terms of Use', 'Cookie Policy', 'Accessibility', 'Security', 'Contact'];

export function AtmosphericFooter() {
  return (
    <footer className="w-full bg-white border-t border-slate-200">

      {/* ── Main Link Grid ──────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10">
          {FOOTER_COLS.map((col, ci) => (
            <motion.div
              key={col.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: ci * 0.1 }}
            >
              <h4 className="text-xs font-bold tracking-widest uppercase text-slate-900 mb-4 sm:mb-5 pb-3 border-b border-slate-200">
                {col.title}
              </h4>
              <ul className="flex flex-col gap-2.5 sm:gap-3">
                {col.links.map((link) => (
                  <li key={link.name}>
                    {link.href.startsWith('/') ? (
                      <Link href={link.href} className="text-slate-500 text-sm hover:text-blue-600 transition-colors flex items-center gap-1 group w-fit">
                        {link.name}
                        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    ) : (
                      <a href={link.href} className="text-slate-500 text-sm hover:text-blue-600 transition-colors flex items-center gap-1 group w-fit">
                        {link.name}
                        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Newsletter + Social ─────────────────────────────────────────── */}
      <div className="border-t border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">

          {/* Newsletter */}
          <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0">
              <Mail className="w-4 h-4 text-blue-600" />
            </div>
            <span className="text-xs sm:text-sm font-medium text-slate-700 whitespace-nowrap">ClawnCore News</span>
            <a
              href="#"
              className="bg-blue-600 hover:bg-blue-700 text-white text-[10px] sm:text-xs font-bold tracking-widest uppercase px-4 sm:px-5 py-2 sm:py-2.5 rounded transition-colors flex-shrink-0"
            >
              Subscribe
            </a>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] sm:text-xs font-mono tracking-widest uppercase text-slate-400 mr-2 sm:mr-3 hidden sm:inline">Follow ClawnCore</span>
            {SOCIAL.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-200 transition-all"
              >
                <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Legal Bottom Bar ────────────────────────────────────────────── */}
      <div className="border-t border-slate-100 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-5 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3">

          {/* Logo + Copyright */}
          <div className="flex items-center gap-2 sm:gap-3 text-center sm:text-left">
            <span className="text-sm font-black tracking-tighter text-slate-800">ClawnCore</span>
            <span className="w-1 h-1 rounded-full bg-slate-300" />
            <span className="text-[10px] sm:text-xs text-slate-400 font-mono">© {new Date().getFullYear()} ClawnCore Multitech</span>
          </div>

          {/* Legal Links */}
          <div className="flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-4 gap-y-1">
            {LEGAL.map((item, i) => (
              <span key={item} className="flex items-center gap-3 sm:gap-4">
                <a href="#" className="text-[10px] sm:text-xs text-slate-400 hover:text-slate-700 transition-colors">{item}</a>
                {i < LEGAL.length - 1 && <span className="w-px h-3 bg-slate-200" />}
              </span>
            ))}
          </div>
        </div>
      </div>

    </footer>
  );
}
