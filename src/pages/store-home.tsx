import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { StoreLayout } from '@/components/store/StoreLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { supabase } from '@/lib/supabase';
import { useCart } from '@/components/CartProvider';
import { useToast } from '@/hooks/use-toast';
import {
  Plane, Sprout, FlaskConical, Cpu, Wrench, Droplets,
  Star, ShoppingCart, ChevronRight, ArrowRight, TrendingUp, Eye
} from 'lucide-react';

interface StoreProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  compare_price: number | null;
  images: string[];
  category: string;
  stock: number;
  featured: boolean;
  rating: number;
  review_count: number;
}

const categoryCards = [
  { name: 'Drones', slug: 'drones', icon: Plane, color: 'from-blue-500 to-cyan-500', desc: 'Precision aerial solutions' },
  { name: 'Seeds', slug: 'seeds', icon: Sprout, color: 'from-green-500 to-emerald-500', desc: 'Premium quality seeds' },
  { name: 'Fertilizers', slug: 'fertilizers', icon: FlaskConical, color: 'from-amber-500 to-orange-500', desc: 'Boost your yield' },
  { name: 'Sensors', slug: 'sensors', icon: Cpu, color: 'from-purple-500 to-indigo-500', desc: 'Smart farm monitoring' },
  { name: 'Equipment', slug: 'equipment', icon: Wrench, color: 'from-red-500 to-rose-500', desc: 'Farm machinery & tools' },
  { name: 'Irrigation', slug: 'irrigation', icon: Droplets, color: 'from-cyan-500 to-blue-500', desc: 'Water management systems' },
];

export default function StoreHome() {
  const [, navigate] = useLocation();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [featured, setFeatured] = useState<StoreProduct[]>([]);
  const [bestSellers, setBestSellers] = useState<StoreProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [featuredRes, bestRes] = await Promise.all([
        supabase.from('store_products').select('*').eq('status', 'active').eq('featured', true).order('rating', { ascending: false }).limit(6),
        supabase.from('store_products').select('*').eq('status', 'active').order('review_count', { ascending: false }).limit(8),
      ]);
      setFeatured((featuredRes.data as StoreProduct[]) || []);
      setBestSellers((bestRes.data as StoreProduct[]) || []);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleAddToCart = (p: StoreProduct) => {
    addToCart({ productId: p.id, name: p.name, price: Number(p.price), image: p.images?.[0] || '', vendorName: 'ClawnCore Store', stock: p.stock });
    toast({ title: 'Added to cart', description: `"${p.name}" added to your cart` });
  };

  return (
    <StoreLayout>
      {/* Hero */}
      <section className="relative py-16 sm:py-24 bg-gradient-to-br from-emerald-900 via-green-800 to-teal-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-emerald-400 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-green-400 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <Badge className="mb-4 bg-white/10 text-white border-white/20 hover:bg-white/20">
              <Sprout className="h-3 w-3 mr-1" /> Agri Store
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
              Farm Smarter{' '}
              <span className="bg-gradient-to-r from-emerald-300 to-green-300 bg-clip-text text-transparent">
                Grow Better
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-white/70 mb-8 max-w-xl">
              Professional drones, premium seeds, smart sensors, and everything you need for modern precision agriculture.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-white text-emerald-900 hover:bg-white/90" onClick={() => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' })}>
                Browse Categories
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10" onClick={() => navigate('/store?sort=featured')}>
                View Deals
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Categories */}
        <section id="categories" className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Shop by Category</h2>
            <Link href="/store/category/drones">
              <span className="text-sm text-emerald-600 hover:text-emerald-700 font-medium cursor-pointer flex items-center gap-1">
                View All <ChevronRight className="h-4 w-4" />
              </span>
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categoryCards.map((cat) => (
              <Link key={cat.slug} href={`/store/category/${cat.slug}`}>
                <div className="group cursor-pointer rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 overflow-hidden hover:shadow-lg hover:border-emerald-500/30 transition-all duration-300">
                  <div className={`h-20 bg-gradient-to-br ${cat.color} flex items-center justify-center`}>
                    <cat.icon className="h-10 w-10 text-white drop-shadow-lg" />
                  </div>
                  <div className="p-3 text-center">
                    <p className="font-semibold text-sm">{cat.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{cat.desc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Products */}
        {featured.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Featured Products</h2>
              <Badge className="bg-red-500/10 text-red-500 border-red-500/20">
                <TrendingUp className="h-3 w-3 mr-1" /> Hot Deals
              </Badge>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((p) => (
                <ProductCard key={p.id} product={p} onAddToCart={handleAddToCart} onView={() => navigate(`/store/product/${p.id}`)} />
              ))}
            </div>
          </section>
        )}

        {/* Best Sellers */}
        {bestSellers.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Best Sellers</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {bestSellers.map((p) => (
                <ProductCard key={p.id} product={p} onAddToCart={handleAddToCart} onView={() => navigate(`/store/product/${p.id}`)} compact />
              ))}
            </div>
          </section>
        )}

        {loading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 dark:bg-white/10 rounded-lg h-48 mb-4" />
                <div className="bg-gray-200 dark:bg-white/10 rounded h-4 w-3/4 mb-2" />
                <div className="bg-gray-200 dark:bg-white/10 rounded h-4 w-1/2" />
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <section className="text-center p-10 bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-500/5 dark:to-green-500/5 rounded-2xl border border-gray-200 dark:border-white/10">
          <h3 className="text-2xl font-bold mb-2">Need Help Choosing?</h3>
          <p className="text-muted-foreground max-w-lg mx-auto mb-6">
            Our agricultural experts are ready to help you find the right products for your farm.
          </p>
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => navigate('/get-started')}>
            Talk to an Expert
          </Button>
        </section>
      </div>
    </StoreLayout>
  );
}

function ProductCard({ product, onAddToCart, onView, compact }: {
  product: StoreProduct;
  onAddToCart: (p: StoreProduct) => void;
  onView: () => void;
  compact?: boolean;
}) {
  const hasDiscount = product.compare_price && product.compare_price > product.price;
  const discountPct = hasDiscount ? Math.round(((product.compare_price! - product.price) / product.compare_price!) * 100) : 0;

  return (
    <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200 dark:border-white/10 hover:border-emerald-500/30"
      onClick={onView}>
      <div className={`relative ${compact ? 'h-40' : 'h-48'} bg-gray-100 dark:bg-white/5 overflow-hidden`}>
        {product.images?.[0] ? (
          <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Sprout className="h-12 w-12 text-muted-foreground" />
          </div>
        )}
        {product.featured && (
          <Badge className="absolute top-2 left-2 bg-emerald-600 text-white text-xs">
            <Star className="h-3 w-3 mr-1" /> Featured
          </Badge>
        )}
        {hasDiscount && (
          <Badge className="absolute top-2 right-2 bg-red-500 text-white text-xs">
            -{discountPct}%
          </Badge>
        )}
        {product.stock === 0 && (
          <Badge className="absolute top-2 right-2 bg-gray-500">Out of Stock</Badge>
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-sm line-clamp-1 mb-1">{product.name}</h3>
        {!compact && (
          <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{product.description}</p>
        )}
        <div className="flex items-center gap-1 mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`h-3 w-3 ${i < Math.round(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} />
          ))}
          <span className="text-xs text-muted-foreground ml-1">({product.review_count})</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-emerald-600">${Number(product.price).toFixed(2)}</span>
            {hasDiscount && (
              <span className="text-sm text-muted-foreground line-through">${Number(product.compare_price).toFixed(2)}</span>
            )}
          </div>
          <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white h-8"
            onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
            disabled={product.stock === 0}>
            <ShoppingCart className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
