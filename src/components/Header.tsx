import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/components/CartProvider';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { AccountDropdown } from '@/components/AccountDropdown';
import { ChevronDown, Search, X, ShoppingCart } from 'lucide-react';
import { FaBars } from 'react-icons/fa';

const PLATFORMS = [
  { name: 'Smart Agriculture', tagline: 'Precision farming', href: '/agriculture', image: '/drone hero.png', color: '#34d399' },
  { name: 'Cybersecurity', tagline: 'Zero-trust defense', href: '/cybersecurity', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=400&q=70', color: '#2563eb' },
  { name: 'Cloud Infrastructure', tagline: 'Global nexus', href: '/cloud', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=400&q=70', color: '#06b6d4' },
  { name: 'Data & Analytics', tagline: 'Intelligence platform', href: '/ml', image: '/optic hand naturing .png', color: '#76B900' },
  { name: 'Data Analytics', tagline: 'Real-time insights', href: '/data-analytics', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=70', color: '#fbbf24' },
  { name: 'ClawnAI Platform', tagline: 'Orchestration core', href: '/clawn-ai', image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=400&q=70', color: '#76B900' },
];

const SOLUTIONS = [
  { name: 'Smart Agriculture', desc: 'Drone-powered precision farming', href: '/agriculture' },
  { name: 'Infrastructure Security', desc: 'Quantum-resistant threat defense', href: '/cybersecurity' },
  { name: 'Cloud Migration', desc: 'Distributed high-availability systems', href: '/cloud' },
  { name: 'AI Automation', desc: 'Automation and data tools', href: '/ml' },
  { name: 'Data Intelligence', desc: 'Real-time analytics dashboards', href: '/data-analytics' },
  { name: 'Marketplace', desc: 'Multi-vendor product marketplace', href: '/marketplace' },
  { name: 'Clawn Academy', desc: 'Courses, certifications, and training', href: '/clawn-academy' },
  { name: 'ClawnAI Core', desc: 'Unified platform management', href: '/clawn-ai' },
  { name: 'Partner Programme', desc: 'Grow together with ClawnCore', href: '/partnerships' },
  { name: 'Agri Store', desc: 'Agricultural products & equipment', href: '/store' },
];

const RESOURCES = [
  { name: 'Documentation', href: '/get-started' },
  { name: 'Case Studies', href: '/#about' },
  { name: 'API Reference', href: '/get-started' },
  { name: 'System Status', href: '/get-started' },
  { name: 'Partnerships', href: '/get-started' },
  { name: 'Contact Sales', href: '/get-started' },
];

const fullNavigation = [
  { name: 'Home', href: '#home', type: 'scroll' },
  { name: 'About', href: '#about', type: 'scroll' },
  { name: 'Marketplace', href: '/marketplace', type: 'route' },
  { name: 'Clawn Academy', href: '/clawn-academy', type: 'route' },
  { name: 'Agriculture', href: '/agriculture', type: 'route' },
  { name: 'Cloud Infrastructure', href: '/cloud', type: 'route' },
  { name: 'Cybersecurity', href: '/cybersecurity', type: 'route' },
  { name: 'Machine Learning', href: '/ml', type: 'route' },
  { name: 'Data Analytics', href: '/data-analytics', type: 'route' },
  { name: 'ClawnAI Platform', href: '/clawn-ai', type: 'route' },
  { name: 'Partnerships', href: '/partnerships', type: 'route' },
  { name: 'Careers', href: '/careers', type: 'route' },
];

export function Header() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const { isAuthenticated, openLoginModal } = useAuth();
  const { cartCount } = useCart();
  const megaRef = useRef<HTMLDivElement>(null);

  const darkRoutes = ['/', '/agriculture', '/cloud', '/cybersecurity', '/ml', '/data-analytics', '/clawn-ai'];
  const isTransparent = darkRoutes.includes(location) && !megaOpen && !hasScrolled;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (megaRef.current && !megaRef.current.contains(e.target as Node)) {
        setMegaOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    const updateHeaderState = () => setHasScrolled(window.scrollY > 24);
    updateHeaderState();
    window.addEventListener('scroll', updateHeaderState, { passive: true });
    return () => window.removeEventListener('scroll', updateHeaderState);
  }, [location]);

  useEffect(() => {
    setMegaOpen(false);
    setSearchOpen(false);
  }, [location]);

  const handleNavigation = (item: any) => {
    if (item.type === 'scroll') {
      setTimeout(() => {
        const el = document.querySelector(item.href);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
    setIsOpen(false);
  };

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        megaOpen
          ? 'bg-white dark:bg-[#0a0a0f] backdrop-blur-2xl border-b border-gray-200 dark:border-white/10 text-gray-900 dark:text-white shadow-lg shadow-black/5 dark:shadow-black/20'
          : isTransparent
          ? 'bg-transparent text-white'
          : 'bg-white/95 dark:bg-[#0a0a0f]/95 backdrop-blur-xl border-b border-gray-200 dark:border-white/10 text-gray-900 dark:text-white'
      }`}
    >
      <div className="container mx-auto flex h-14 md:h-16 lg:h-[72px] items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center cursor-pointer gap-2">
            <div className="w-8 h-8 rounded-lg bg-nvidia-500 flex items-center justify-center">
              <span className="text-black font-black text-sm">C</span>
            </div>
            <span className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
              ClawnCore
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav ref={megaRef} className="hidden lg:flex items-center space-x-1 relative">
          {/* Solutions mega trigger */}
          <button
            onClick={() => setMegaOpen((v) => !v)}
            className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
              megaOpen ? 'text-nvidia-500 bg-nvidia-500/10' : 'text-gray-700 dark:text-white/80 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10'
            }`}
          >
            Solutions
            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${megaOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Direct links */}
          {[
            { name: 'Technology', href: '/cybersecurity' },
            { name: 'Research', href: '/data-analytics' },
            { name: 'Marketplace', href: '/marketplace' },
            { name: 'Academy', href: '/clawn-academy' },
            { name: 'Agri Store', href: '/store' },
            { name: 'Company', href: '/#about' },
          ].map((item) => (
            <Link key={item.name} href={item.href}>
              <span className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-white/80 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg transition-colors cursor-pointer">
                {item.name}
              </span>
            </Link>
          ))}

          {/* NVIDIA-style Mega Menu */}
          {megaOpen && (
            <div className="absolute top-[calc(100%+0.75rem)] left-1/2 -translate-x-1/2 w-[900px] bg-white dark:bg-[#0a0a0f] backdrop-blur-2xl border border-gray-200 dark:border-white/10 rounded-2xl shadow-2xl shadow-black/20 dark:shadow-black/50 overflow-hidden">
              <div className="grid grid-cols-3 gap-0">
                {/* Column 1: Platforms with images */}
                <div className="p-6 border-r border-gray-100 dark:border-white/5">
                  <p className="text-[10px] font-mono tracking-[0.25em] uppercase text-nvidia-500 font-semibold mb-5">
                    Platforms
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {PLATFORMS.map((p) => (
                      <Link key={p.name} href={p.href}>
                        <div onClick={() => setMegaOpen(false)} className="group cursor-pointer">
                          <div className="w-full h-20 rounded-xl overflow-hidden bg-gray-100 dark:bg-white/5 mb-2 border border-gray-200 dark:border-white/10 group-hover:border-nvidia-500/30 transition-colors">
                            <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                          </div>
                          <p className="text-xs font-semibold text-gray-900 dark:text-white leading-tight">{p.name}</p>
                          <p className="text-[10px] text-gray-500 dark:text-white/40 mt-0.5">{p.tagline}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Column 2: Solutions */}
                <div className="p-6 border-r border-gray-100 dark:border-white/5">
                  <p className="text-[10px] font-mono tracking-[0.25em] uppercase text-slate-500 font-semibold mb-5">
                    Enterprise Solutions
                  </p>
                  <div className="space-y-1">
                    {SOLUTIONS.map((s) => (
                      <Link key={s.name} href={s.href}>
                        <div onClick={() => setMegaOpen(false)} className="group p-2.5 rounded-lg hover:bg-white/5 dark:hover:bg-white/5 cursor-pointer transition-colors">
                          <p className="text-sm font-medium text-gray-800 dark:text-white/90 group-hover:text-nvidia-500 transition-colors">{s.name}</p>
                          <p className="text-[11px] text-gray-500 dark:text-white/35 mt-0.5">{s.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Column 3: Resources + Featured */}
                <div className="p-6">
                  <p className="text-[10px] font-mono tracking-[0.25em] uppercase text-slate-500 font-semibold mb-5">
                    Resources
                  </p>
                  <div className="space-y-1 mb-6">
                    {RESOURCES.map((r) => (
                      <Link key={r.name} href={r.href}>
                        <div onClick={() => setMegaOpen(false)} className="group p-2 rounded-lg hover:bg-white/5 cursor-pointer transition-colors">
                          <p className="text-sm text-gray-500 dark:text-white/60 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">{r.name}</p>
                        </div>
                      </Link>
                    ))}
                  </div>

                  {/* Featured card */}
                  <div className="rounded-xl bg-nvidia-500/10 border border-nvidia-500/20 p-4">
                    <p className="text-[10px] font-mono text-nvidia-500 uppercase tracking-wider mb-2">Featured</p>
                    <p className="text-sm font-bold text-gray-900 dark:text-white mb-1">ClawnAI Core</p>
                    <p className="text-xs text-gray-500 dark:text-white/50 mb-3">Complete platform management for all ClawnCore services.</p>
                    <Link href="/clawn-ai">
                      <button onClick={() => setMegaOpen(false)} className="text-xs font-bold text-nvidia-500 hover:text-nvidia-400 transition-colors">
                        Explore Platform →
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Search */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2 text-gray-400 dark:text-white/50 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-colors hidden md:flex"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Cart */}
          <Link href="/cart">
            <button className="relative p-2 text-gray-400 dark:text-white/50 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-colors hidden md:flex">
              <ShoppingCart className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </button>
          </Link>

          <div className="hidden md:flex items-center gap-2">
            <ThemeToggle />
            {isAuthenticated ? (
              <AccountDropdown />
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={openLoginModal}
                className="h-9 px-4 text-sm font-medium text-gray-600 dark:text-white/70 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5"
              >
                Sign In
              </Button>
            )}
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-2 h-9 px-3 text-gray-600 dark:text-white/70 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5"
              >
                <FaBars className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[340px] bg-white dark:bg-[#0a0a0f] backdrop-blur-2xl border-l border-gray-200 dark:border-white/10 p-0">
              <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-white/10">
                <span className="text-lg font-bold text-gray-900 dark:text-white">Menu</span>
                <button onClick={() => setIsOpen(false)} className="p-1 text-gray-400 dark:text-white/50 hover:text-gray-900 dark:hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex flex-col p-5 gap-1">
                {fullNavigation.map((item) => (
                  item.type === 'route' ? (
                    <Link key={item.name} href={item.href}>
                      <span onClick={() => setIsOpen(false)} className="block py-2.5 px-3 text-sm font-medium text-gray-600 dark:text-white/70 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-colors cursor-pointer">
                        {item.name}
                      </span>
                    </Link>
                  ) : (
                    <button
                      key={item.name}
                      onClick={() => handleNavigation(item)}
                      className="text-left py-2.5 px-3 text-sm font-medium text-gray-600 dark:text-white/70 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-colors"
                    >
                      {item.name}
                    </button>
                  )
                ))}
                <Link href="/cart">
                  <span onClick={() => setIsOpen(false)} className="flex items-center gap-2 py-2.5 px-3 text-sm font-medium text-gray-600 dark:text-white/70 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-colors cursor-pointer">
                    <ShoppingCart className="w-4 h-4" />
                    Cart {cartCount > 0 && `(${cartCount})`}
                  </span>
                </Link>
              </nav>

              <div className="border-t border-gray-200 dark:border-white/10 p-5">
                <div className="md:hidden mb-4">
                  {isAuthenticated ? (
                    <Link href="/profile">
                      <span onClick={() => setIsOpen(false)} className="block py-2.5 px-3 text-sm font-medium text-gray-600 dark:text-white/70 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-colors cursor-pointer">
                        My Profile
                      </span>
                    </Link>
                  ) : (
                    <button
                      onClick={() => { setIsOpen(false); openLoginModal(); }}
                      className="w-full py-2.5 px-3 text-left text-sm font-medium text-nvidia-500 hover:bg-nvidia-500/10 rounded-lg transition-colors"
                    >
                      Sign In
                    </button>
                  )}
                </div>
                <div className="md:hidden">
                  <ThemeToggle />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Search overlay */}
      {searchOpen && (
        <div className="absolute top-full inset-x-0 bg-white dark:bg-[#0a0a0f] backdrop-blur-2xl border-b border-gray-200 dark:border-white/10 p-4 sm:p-6">
          <div className="container mx-auto max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-white/30" />
              <input
                type="text"
                placeholder="Search solutions, documentation..."
                className="w-full h-12 pl-12 pr-12 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white text-sm placeholder:text-gray-400 dark:placeholder:text-white/30 focus:outline-none focus:border-nvidia-500/50 transition-colors"
                autoFocus
              />
              <button onClick={() => setSearchOpen(false)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-white/30 hover:text-gray-900 dark:hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
