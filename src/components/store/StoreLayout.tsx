import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/components/CartProvider';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { AccountDropdown } from '@/components/AccountDropdown';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  Search, ShoppingCart, Leaf, ChevronDown, X, Truck, Shield, RotateCcw, Headphones
} from 'lucide-react';
import { FaBars } from 'react-icons/fa';

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
      hasScrolled ? 'bg-white dark:bg-[#0a0a0f] shadow-md border-b border-gray-200 dark:border-white/10' : 'bg-white dark:bg-[#0a0a0f] border-b border-gray-200 dark:border-white/10'
    }`}>
      {/* Top bar */}
      <div className="bg-emerald-600 text-white text-center text-xs py-1.5 font-medium">
        <Truck className="inline h-3 w-3 mr-1" /> Free shipping on orders over $50 | <Leaf className="inline h-3 w-3 mx-1" /> Farm smarter with ClawnCore
      </div>

      <div className="container mx-auto flex h-14 md:h-16 items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link href="/store">
          <div className="flex items-center cursor-pointer gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center">
              <Leaf className="h-4 w-4 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-tight text-gray-900 dark:text-white leading-none">
                ClawnCore
              </span>
              <span className="text-[10px] text-emerald-600 font-semibold leading-none mt-0.5">
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
                  ? 'text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10'
                  : 'text-gray-700 dark:text-white/80 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10'
              }`}>
                {cat.name}
              </span>
            </Link>
          ))}
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
          <Link href="/store/cart">
            <button className="relative p-2 text-gray-400 dark:text-white/50 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-colors">
              <ShoppingCart className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
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
                className="h-9 px-4 text-sm font-medium text-gray-600 dark:text-white/70 hover:text-gray-900 dark:hover:text-white">
                Sign In
              </Button>
            )}
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="flex items-center gap-2 h-9 px-3 text-gray-600 dark:text-white/70">
                <FaBars className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-white dark:bg-[#0a0a0f] border-l border-gray-200 dark:border-white/10 p-0">
              <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-white/10">
                <span className="text-lg font-bold text-gray-900 dark:text-white">Store Menu</span>
                <button onClick={() => setIsOpen(false)} className="p-1 text-gray-400 dark:text-white/50 hover:text-gray-900 dark:hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="flex flex-col p-5 gap-1">
                <Link href="/store">
                  <span onClick={() => setIsOpen(false)} className="block py-2.5 px-3 text-sm font-medium text-gray-600 dark:text-white/70 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-colors cursor-pointer">
                    Home
                  </span>
                </Link>
                {STORE_CATEGORIES.map((cat) => (
                  <Link key={cat.name} href={cat.href}>
                    <span onClick={() => setIsOpen(false)} className={`block py-2.5 px-3 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                      cat.name === 'Deals'
                        ? 'text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10'
                        : 'text-gray-600 dark:text-white/70 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5'
                    }`}>
                      {cat.name}
                    </span>
                  </Link>
                ))}
                <Link href="/store/orders">
                  <span onClick={() => setIsOpen(false)} className="block py-2.5 px-3 text-sm font-medium text-gray-600 dark:text-white/70 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-colors cursor-pointer">
                    My Orders
                  </span>
                </Link>
                <Link href="/store/cart">
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
                    <button onClick={() => { setIsOpen(false); openLoginModal(); }}
                      className="w-full py-2.5 px-3 text-left text-sm font-medium text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 rounded-lg transition-colors">
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
        <div className="absolute top-full inset-x-0 bg-white dark:bg-[#0a0a0f] border-b border-gray-200 dark:border-white/10 p-4 sm:p-6">
          <form onSubmit={handleSearch} className="container mx-auto max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-white/30" />
              <input
                type="text"
                placeholder="Search agricultural products..."
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                className="w-full h-12 pl-12 pr-12 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white text-sm placeholder:text-gray-400 dark:placeholder:text-white/30 focus:outline-none focus:border-emerald-500/50 transition-colors"
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
    <footer className="bg-gray-900 dark:bg-black text-gray-300">
      {/* Trust badges */}
      <div className="border-b border-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Truck, title: 'Free Shipping', desc: 'On orders over $50' },
              { icon: Shield, title: 'Secure Payment', desc: '100% secure checkout' },
              { icon: RotateCcw, title: 'Easy Returns', desc: '30-day return policy' },
              { icon: Headphones, title: '24/7 Support', desc: 'Expert help anytime' },
            ].map((b) => (
              <div key={b.title} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <b.icon className="h-5 w-5 text-emerald-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{b.title}</p>
                  <p className="text-xs text-gray-400">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center">
                <Leaf className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white">ClawnCore Store</span>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Your trusted source for agricultural technology, seeds, equipment, and precision farming solutions.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Shop</h4>
            <ul className="space-y-2 text-sm">
              {['Drones', 'Seeds', 'Fertilizers', 'Sensors', 'Equipment', 'Irrigation'].map((c) => (
                <li key={c}><Link href={`/store/category/${c.toLowerCase()}`}><span className="hover:text-emerald-400 transition-colors cursor-pointer">{c}</span></Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Account</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/store/orders"><span className="hover:text-emerald-400 transition-colors cursor-pointer">My Orders</span></Link></li>
              <li><Link href="/store/cart"><span className="hover:text-emerald-400 transition-colors cursor-pointer">Cart</span></Link></li>
              <li><Link href="/profile"><span className="hover:text-emerald-400 transition-colors cursor-pointer">Profile</span></Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>clawncore@gmail.com</li>
              <li>+91 8790813536</li>
              <li>Andhra Pradesh, India</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} ClawnCore Technologies. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <StoreHeader />
      <main>{children}</main>
      <StoreFooter />
    </div>
  );
}
