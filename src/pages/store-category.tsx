import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'wouter';
import { StoreLayout } from '@/components/store/StoreLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { fetchProducts, type StoreProduct } from '@/lib/storeApi';
import { useCart } from '@/components/CartProvider';
import { useToast } from '@/hooks/use-toast';
import { ChevronLeft, ChevronRight, Star, ShoppingCart, Sprout, Package } from 'lucide-react';

const ITEMS_PER_PAGE = 12;

const categoryMeta: Record<string, { title: string; desc: string; image: string }> = {
  drones: { title: 'Agricultural Drones', desc: 'Mapping, spraying, and crop monitoring aircraft', image: 'https://images.unsplash.com/photo-1713952160156-bb59cac789a9?auto=format&fit=crop&w=1200&q=80' },
  seeds: { title: 'Premium Seeds', desc: 'High-yield, disease-resistant seed varieties', image: 'https://images.unsplash.com/photo-1437252611977-07f74518abd7?auto=format&fit=crop&w=1200&q=80' },
  fertilizers: { title: 'Fertilizers & Nutrients', desc: 'Organic and synthetic crop nutrition', image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=1200&q=80' },
  sensors: { title: 'Sensors & Monitoring', desc: 'Soil, weather, and crop health sensors', image: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=1200&q=80' },
  equipment: { title: 'Farm Equipment', desc: 'Machinery and tools for every task', image: 'https://images.unsplash.com/photo-1530267981375-f0de937f5f13?auto=format&fit=crop&w=1200&q=80' },
  irrigation: { title: 'Irrigation Systems', desc: 'Drip, sprinkler, and pump systems', image: 'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&w=1200&q=80' },
};

export default function StoreCategory() {
  const [location, navigate] = useLocation();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [products, setProducts] = useState<StoreProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('featured');
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const category = location.split('/store/category/')[1]?.split('?')[0] || 'drones';
  const meta = categoryMeta[category] || { title: category, desc: '', image: '' };

  const fetchProductsData = useCallback(async () => {
    setLoading(true);
    try {
      const from = (page - 1) * ITEMS_PER_PAGE;
      const { products: data, total } = await fetchProducts({
        category,
        sort: sortBy,
        limit: ITEMS_PER_PAGE,
        offset: from,
      });
      setProducts(data || []);
      setTotalCount(total || 0);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [category, sortBy, page]);

  useEffect(() => { fetchProductsData(); }, [fetchProductsData]);
  useEffect(() => { setPage(1); }, [category, sortBy]);

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  const handleAddToCart = (p: StoreProduct) => {
    addToCart({ productId: p.id, name: p.name, price: Number(p.price), image: p.images?.[0] || '', vendorName: 'ClawnCore Store', stock: p.stock });
    toast({ title: 'Added to cart', description: `"${p.name}" added to your cart` });
  };

  return (
    <StoreLayout>
      {/* Category Header with banner image */}
      <section className="relative py-12 sm:py-16 overflow-hidden">
        <div className="absolute inset-0">
          <img src={meta.image} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-cc-darker via-cc-darker/80 to-cc-darker/40" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center gap-2 text-white/60 text-sm mb-3">
            <span className="cursor-pointer hover:text-white" onClick={() => navigate('/store')}>Store</span>
            <ChevronRight className="h-3 w-3" />
            <span className="text-white">{meta.title}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">{meta.title}</h1>
          <p className="text-white/70 max-w-xl">{meta.desc}</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Sort & Count */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
          <p className="text-muted-foreground">{totalCount} product{totalCount !== 1 ? 's' : ''}</p>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price_low">Price: Low to High</SelectItem>
              <SelectItem value="price_high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Top Rated</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Products */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 dark:bg-white/10 rounded-lg h-48 mb-4" />
                <div className="bg-gray-200 dark:bg-white/10 rounded h-4 w-3/4 mb-2" />
                <div className="bg-gray-200 dark:bg-white/10 rounded h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No products yet</h3>
            <p className="text-muted-foreground">Check back soon for new {category} products.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((p) => {
              const hasDiscount = p.compare_price && p.compare_price > p.price;
              const discountPct = hasDiscount ? Math.round(((p.compare_price! - p.price) / p.compare_price!) * 100) : 0;
              return (
                <Card key={p.id} className="group cursor-pointer hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200 dark:border-white/10 hover:border-nvidia-500/30"
                  onClick={() => navigate(`/store/product/${p.id}`)}>
                  <div className="relative h-48 bg-gray-100 dark:bg-white/5 overflow-hidden">
                    {p.images?.[0] ? (
                      <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center"><Sprout className="h-12 w-12 text-muted-foreground" /></div>
                    )}
                    {p.featured && <Badge className="absolute top-2 left-2 bg-nvidia-500 text-white text-xs"><Star className="h-3 w-3 mr-1" /> Featured</Badge>}
                    {hasDiscount && <Badge className="absolute top-2 right-2 bg-red-500 text-white text-xs">-{discountPct}%</Badge>}
                    {p.stock === 0 && <Badge className="absolute top-2 right-2 bg-gray-500">Out of Stock</Badge>}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-sm line-clamp-1 mb-1">{p.name}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{p.description}</p>
                    <div className="flex items-center gap-1 mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`h-3 w-3 ${i < Math.round(p.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} />
                      ))}
                      <span className="text-xs text-muted-foreground ml-1">({p.review_count})</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-bold text-nvidia-500">${Number(p.price).toFixed(2)}</span>
                        {hasDiscount && <span className="text-sm text-muted-foreground line-through">${Number(p.compare_price).toFixed(2)}</span>}
                      </div>
                      <Button size="sm" className="bg-nvidia-500 hover:bg-nvidia-600 text-black h-8"
                        onClick={(e) => { e.stopPropagation(); handleAddToCart(p); }}
                        disabled={p.stock === 0}>
                        <ShoppingCart className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage(p => p - 1)}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm text-muted-foreground px-4">Page {page} of {totalPages}</span>
            <Button variant="outline" size="sm" disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </StoreLayout>
  );
}
