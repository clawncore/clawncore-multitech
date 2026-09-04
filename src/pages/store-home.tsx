import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { StoreLayout } from '@/components/store/StoreLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { fetchProducts, type StoreProduct } from '@/lib/storeApi';
import { useCart } from '@/components/CartProvider';
import { useToast } from '@/hooks/use-toast';
import { Star, ShoppingCart, ChevronRight } from 'lucide-react';

const categories = [
  { name: 'Drones', slug: 'drones', image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=400&q=80' },
  { name: 'Seeds', slug: 'seeds', image: 'https://images.unsplash.com/photo-1437252611977-07f74518abd7?auto=format&fit=crop&w=400&q=80' },
  { name: 'Fertilizers', slug: 'fertilizers', image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=400&q=80' },
  { name: 'Sensors', slug: 'sensors', image: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=400&q=80' },
  { name: 'Equipment', slug: 'equipment', image: 'https://images.unsplash.com/photo-1530267981375-f0de937f5f13?auto=format&fit=crop&w=400&q=80' },
  { name: 'Irrigation', slug: 'irrigation', image: 'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&w=400&q=80' },
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
        fetchProducts({ featured: true, limit: 6 }),
        fetchProducts({ limit: 8 }),
      ]);
      setFeatured(featuredRes.products || []);
      setBestSellers(bestRes.products || []);
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
      {/* Hero — with background image */}
      <section className="relative py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1600&q=80" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-cc-darker via-cc-darker/80 to-cc-darker/40" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-nvidia-500 mb-4">ClawnCore Store</p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Agricultural<br />Equipment & Supplies
            </h1>
            <p className="text-lg text-white/70 mb-8 max-w-xl">
              Professional drones, premium seeds, precision sensors, and irrigation systems for modern farming operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-nvidia-500 hover:bg-nvidia-600 text-black font-semibold" onClick={() => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' })}>
                Browse Products
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 font-semibold" onClick={() => navigate('/store?sort=featured')}>
                View Deals
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Categories — clean text grid */}
        <section id="categories" className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Shop by Category</h2>
            <Link href="/store/category/drones">
              <span className="text-sm text-nvidia-500 hover:text-nvidia-600 font-medium cursor-pointer flex items-center gap-1">
                View All <ChevronRight className="h-4 w-4" />
              </span>
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <Link key={cat.slug} href={`/store/category/${cat.slug}`}>
                <div className="group cursor-pointer rounded-xl overflow-hidden border border-gray-200 dark:border-white/10 hover:border-nvidia-500/50 transition-all">
                  <div className="relative h-32 overflow-hidden">
                    <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <p className="absolute bottom-3 left-3 font-semibold text-sm text-white">{cat.name}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Promo Banner */}
        <section className="mb-16 rounded-2xl overflow-hidden relative">
          <img src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=1200&q=80" alt="Farm equipment" className="w-full h-48 sm:h-64 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-cc-darker/90 via-cc-darker/60 to-transparent" />
          <div className="absolute inset-0 flex items-center px-8 sm:px-12">
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-nvidia-500 mb-2">Limited Time</p>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">Season Sale — Up to 25% Off</h3>
              <p className="text-white/60 text-sm mb-4 max-w-md">Stock up on seeds, fertilizers, and irrigation supplies for the upcoming season.</p>
              <Button size="sm" className="bg-nvidia-500 hover:bg-nvidia-600 text-black font-semibold" onClick={() => navigate('/store?sort=featured')}>
                Shop Deals
              </Button>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        {featured.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
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

        {/* CTA — with image */}
        <section className="relative rounded-2xl overflow-hidden">
          <img src="https://images.unsplash.com/photo-1560493676-04071c5f467b?auto=format&fit=crop&w=1200&q=80" alt="Farm landscape" className="w-full h-64 sm:h-80 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-cc-darker/90 to-cc-darker/50" />
          <div className="absolute inset-0 flex items-center justify-center text-center px-6">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">Need Help Choosing?</h3>
              <p className="text-white/60 max-w-lg mx-auto mb-6">
                Contact our team for product recommendations and bulk order pricing.
              </p>
              <Button className="bg-nvidia-500 hover:bg-nvidia-600 text-black font-semibold" onClick={() => navigate('/get-started')}>
                Contact Sales
              </Button>
            </div>
          </div>
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
    <Card className="group cursor-pointer hover:shadow-md transition-all duration-200 overflow-hidden border border-gray-200 dark:border-white/10"
      onClick={onView}>
      <div className={`relative ${compact ? 'h-40' : 'h-48'} bg-gray-100 dark:bg-white/5 overflow-hidden`}>
        {product.images?.[0] ? (
          <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">No image</div>
        )}
        {hasDiscount && (
          <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            -{discountPct}%
          </span>
        )}
        {product.stock === 0 && (
          <span className="absolute top-2 right-2 bg-gray-500 text-white text-xs font-bold px-2 py-1 rounded">Out of Stock</span>
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
            <span className="text-lg font-bold text-gray-900 dark:text-white">${Number(product.price).toFixed(2)}</span>
            {hasDiscount && (
              <span className="text-sm text-muted-foreground line-through">${Number(product.compare_price).toFixed(2)}</span>
            )}
          </div>
          <Button size="sm" className="bg-nvidia-500 hover:bg-nvidia-600 text-black h-8 font-semibold"
            onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
            disabled={product.stock === 0}>
            <ShoppingCart className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
