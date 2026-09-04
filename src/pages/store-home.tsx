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
  { name: 'Drones', slug: 'drones' },
  { name: 'Seeds', slug: 'seeds' },
  { name: 'Fertilizers', slug: 'fertilizers' },
  { name: 'Sensors', slug: 'sensors' },
  { name: 'Equipment', slug: 'equipment' },
  { name: 'Irrigation', slug: 'irrigation' },
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
      {/* Hero — clean, product-focused */}
      <section className="relative py-16 sm:py-24 bg-cc-darker overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-nvidia-500 mb-4">ClawnCore Store</p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Agricultural<br />Equipment & Supplies
            </h1>
            <p className="text-lg text-white/60 mb-8 max-w-xl">
              Professional drones, premium seeds, precision sensors, and irrigation systems for modern farming operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-white text-black hover:bg-white/90 font-semibold" onClick={() => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' })}>
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
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {categories.map((cat) => (
              <Link key={cat.slug} href={`/store/category/${cat.slug}`}>
                <div className="group cursor-pointer rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 p-4 text-center hover:border-nvidia-500/50 transition-colors">
                  <p className="font-semibold text-sm text-gray-900 dark:text-white">{cat.name}</p>
                </div>
              </Link>
            ))}
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

        {/* CTA — clean */}
        <section className="text-center p-10 bg-gray-100 dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/10">
          <h3 className="text-2xl font-bold mb-2">Need Help Choosing?</h3>
          <p className="text-muted-foreground max-w-lg mx-auto mb-6">
            Contact our team for product recommendations and bulk order pricing.
          </p>
          <Button className="bg-nvidia-500 hover:bg-nvidia-600 text-black font-semibold" onClick={() => navigate('/get-started')}>
            Contact Sales
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
