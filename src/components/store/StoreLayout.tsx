import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/components/CartProvider';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { AccountDropdown } from '@/components/AccountDropdown';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Search, ShoppingCart, X, Truck, ArrowRight } from 'lucide-react';
import { Linkedin, Twitter, Github } from 'lucide-react';
import { FaBars } from 'react-icons/fa';
import { SectionDivider } from '@/components/SectionDivider';

const STORE_CATEGORIES = [
  { name: 'Drones', href: '/store/category/drones' },
  { name: 'Seeds', href: '/store/category/seeds' },
  { name: 'Fertilizers', href: '/store/category/fertilizers' },
  { name: 'Sensors', href: '/store/category/sensors' },
  { name: 'Equipment', href: '/store/category/equipment' },
  { name: 'Irrigation', href: '/store/category/irrigation' },
  { name: 'Deals', href: '/store?sort=featured' },
];

function StoreHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const { isAuthenticated, openLoginModal } = useAuth();
  const { cartCount } = useCart();
  const [, navigate] = useLocation();

  useEffect(() => {
    const h = () => setHasScrolled(window.scrollY > 10);
    h();
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchVal.trim()) {
      navigate(`/store?search=${encodeURIComponent(searchVal.trim())}`);
      setSearchOpen(false);
      setSearchVal('');
    }
  };

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      hasScrolled ? 'bg-white dark:bg-cc-dark shadow-md border-b border-white/10' : 'bg-white dark:bg-cc-dark border-b border-white/10'
    }`}>
      {/* Top bar */}
      <div className="bg-nvidia-500 text-black text-center text-xs py-1.5 font-medium">
        <Truck className="inline h-3 w-3 mr-1" /> Free shipping on orders over $50 — Farm smarter with ClawnCore
      </div>

      <div className="container mx-auto flex h-14 md:h-16 items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link href="/store">
          <div className="flex items-center cursor-pointer gap-2.5">
            <div className="w-8 h-8 rounded-md bg-nvidia-500 flex items-center justify-center">
              <span className="text-black font-black text-sm">C</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-tight text-gray-900 dark:text-white leading-none">
                ClawnCore
              </span>
              <span className="text-[10px] text-nvidia-500 font-semibold leading-none mt-0.5">
                AGRI STORE
              </span>
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-1">
          {STORE_CATEGORIES.map((cat) => (
            <Link key={cat.name} href={cat.href}>
              <span className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                cat.name === 'Deals'
                  ? 'text-nvidia-500 hover:bg-nvidia-500/10'
                  : 'text-gray-700 dark:text-white/70 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5'
              }`}>
                {cat.name}
              </span>
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2 text-gray-400 dark:text-white/40 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-colors hidden md:flex"
          >
            <Search className="w-4 h-4" />
          </button>

          <Link href="/store/cart">
            <button className="relative p-2 text-gray-400 dark:text-white/40 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-colors">
              <ShoppingCart className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-nvidia-500 text-black text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
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
              <Button variant="ghost" size="sm" onClick={openLoginModal}
                className="h-9 px-4 text-sm font-medium text-gray-600 dark:text-white/60 hover:text-gray-900 dark:hover:text-white">
                Sign In
              </Button>
            )}
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="flex items-center gap-2 h-9 px-3 text-gray-600 dark:text-white/60">
                <FaBars className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-white dark:bg-cc-dark border-l border-white/10 p-0">
              <div className="flex items-center justify-between p-5 border-b border-white/10">
                <span className="text-lg font-bold text-gray-900 dark:text-white">Store Menu</span>
                <button onClick={() => setIsOpen(false)} className="p-1 text-gray-400 dark:text-white/40 hover:text-gray-900 dark:hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="flex flex-col p-5 gap-1">
                <Link href="/store">
                  <span onClick={() => setIsOpen(false)} className="block py-2.5 px-3 text-sm font-medium text-gray-600 dark:text-white/60 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-colors cursor-pointer">
                    Home
                  </span>
                </Link>
                {STORE_CATEGORIES.map((cat) => (
                  <Link key={cat.name} href={cat.href}>
                    <span onClick={() => setIsOpen(false)} className={`block py-2.5 px-3 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                      cat.name === 'Deals'
                        ? 'text-nvidia-500 hover:bg-nvidia-500/10'
                        : 'text-gray-600 dark:text-white/60 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5'
                    }`}>
                      {cat.name}
                    </span>
                  </Link>
                ))}
                <Link href="/store/orders">
                  <span onClick={() => setIsOpen(false)} className="block py-2.5 px-3 text-sm font-medium text-gray-600 dark:text-white/60 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-colors cursor-pointer">
                    My Orders
                  </span>
                </Link>
                <Link href="/store/cart">
                  <span onClick={() => setIsOpen(false)} className="flex items-center gap-2 py-2.5 px-3 text-sm font-medium text-gray-600 dark:text-white/60 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-colors cursor-pointer">
                    <ShoppingCart className="w-4 h-4" />
                    Cart {cartCount > 0 && `(${cartCount})`}
                  </span>
                </Link>
              </nav>
              <div className="border-t border-white/10 p-5">
                <div className="md:hidden mb-4">
                  {isAuthenticated ? (
                    <Link href="/profile">
                      <span onClick={() => setIsOpen(false)} className="block py-2.5 px-3 text-sm font-medium text-gray-600 dark:text-white/60 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-colors cursor-pointer">
                        My Profile
                      </span>
                    </Link>
                  ) : (
                    <button onClick={() => { setIsOpen(false); openLoginModal(); }}
                      className="w-full py-2.5 px-3 text-left text-sm font-medium text-nvidia-500 hover:bg-nvidia-500/10 rounded-lg transition-colors">
                      Sign In
                    </button>
                  )}
                </div>
                <div className="md:hidden"><ThemeToggle /></div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Search overlay */}
      {searchOpen && (
        <div className="absolute top-full inset-x-0 bg-white dark:bg-cc-dark border-b border-white/10 p-4 sm:p-6">
          <form onSubmit={handleSearch} className="container mx-auto max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-white/30" />
              <input
                type="text"
                placeholder="Search agricultural products..."
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                className="w-full h-12 pl-12 pr-12 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white text-sm placeholder:text-gray-400 dark:placeholder:text-white/30 focus:outline-none focus:border-nvidia-500/50 transition-colors"
                autoFocus
              />
              <button type="button" onClick={() => setSearchOpen(false)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-white/30 hover:text-gray-900 dark:hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      )}
    </header>
  );
}

function StoreFooter() {
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
            <p className="text-base text-slate-300 mb-5">Get the latest on agricultural tech, precision farming, and new product drops.</p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1 h-12 bg-white/5 border-white/15 text-white placeholder:text-white/40 text-base rounded-lg focus:border-nvidia-500/50"
              />
              <Button className="h-12 px-6 bg-nvidia-500 hover:bg-nvidia-600 text-black font-bold text-sm rounded-lg">
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Quick links */}
          <div className="max-w-sm">
            <div className="rounded-2xl bg-white/[0.05] border border-white/10 p-6">
              <p className="text-xs font-mono text-nvidia-500 uppercase tracking-wider mb-2">Shop Categories</p>
              <h4 className="text-xl font-bold text-white mb-2">Browse the Store</h4>
              <p className="text-base text-slate-300 mb-4">Drones, seeds, fertilizers, sensors, equipment, and irrigation systems.</p>
              <Link href="/store">
                <span className="inline-flex items-center gap-1.5 text-base font-bold text-nvidia-500 hover:text-nvidia-400 cursor-pointer transition-colors">
                  Explore Products <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Link columns */}
        <div className="py-12 sm:py-16 grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10">
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white/60 mb-5">Shop</h4>
            <ul className="space-y-3">
              {['Drones', 'Seeds', 'Fertilizers', 'Sensors', 'Equipment', 'Irrigation'].map((c) => (
                <li key={c}>
                  <Link href={`/store/category/${c.toLowerCase()}`}>
                    <span className="text-base text-slate-300 hover:text-white transition-colors cursor-pointer">{c}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white/60 mb-5">Account</h4>
            <ul className="space-y-3">
              {[
                { name: 'My Orders', href: '/store/orders' },
                { name: 'Cart', href: '/store/cart' },
                { name: 'Profile', href: '/profile' },
              ].map((l) => (
                <li key={l.name}>
                  <Link href={l.href}>
                    <span className="text-base text-slate-300 hover:text-white transition-colors cursor-pointer">{l.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white/60 mb-5">Company</h4>
            <ul className="space-y-3">
              {[
                { name: 'About Us', href: '/#about' },
                { name: 'Main Site', href: '/' },
                { name: 'Marketplace', href: '/marketplace' },
                { name: 'Partnerships', href: '/partnerships' },
              ].map((l) => (
                <li key={l.name}>
                  <Link href={l.href}>
                    <span className="text-base text-slate-300 hover:text-white transition-colors cursor-pointer">{l.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white/60 mb-5">Connect</h4>
            <ul className="space-y-3 text-base text-slate-300">
              <li>clawncore@gmail.com</li>
              <li>+91 8790813536</li>
              <li>Andhra Pradesh, India</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 sm:py-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-md bg-nvidia-500 flex items-center justify-center">
              <span className="text-black font-black text-sm">C</span>
            </div>
            <p className="text-sm text-slate-400">
              &copy; {new Date().getFullYear()} ClawnCore Multitech Company. All rights reserved.
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

export function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-cc-dark">
      <StoreHeader />
      <main>{children}</main>
      <StoreFooter />
    </div>
  );
}
