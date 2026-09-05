import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'wouter';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import {
  Search, Package, ChevronLeft, ChevronRight, Store, Star,
  Activity, Cloud, Shield, Plane, Leaf, BarChart3, Smartphone,
  Code, Cpu, Users, GraduationCap, ChevronRight as Chevron
} from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  stock: number;
  featured: boolean;
  created_at: string;
  vendors: { shop_name: string } | null;
  categories: { name: string; slug: string } | null;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description?: string;
  product_count?: number;
}

const ITEMS_PER_PAGE = 12;

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Activity, Cloud, Shield, Plane, Leaf, BarChart3, Smartphone,
  Code, Cpu, Users, GraduationCap, Package,
};

const categoryColors: Record<string, string> = {
  'ai-ml': 'from-nvidia-500 to-blue-600',
  'cloud': 'from-cyan-500 to-blue-600',
  'cybersecurity': 'from-green-500 to-emerald-600',
  'drones': 'from-orange-500 to-red-600',
  'agri-tech': 'from-emerald-500 to-green-600',
  'analytics': 'from-yellow-500 to-amber-600',
  'mobile': 'from-pink-500 to-rose-600',
  'software': 'from-blue-500 to-indigo-600',
  'hardware': 'from-slate-500 to-gray-600',
  'consulting': 'from-teal-500 to-cyan-600',
  'courses': 'from-violet-500 to-indigo-600',
};

export default function Marketplace() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('products')
        .select('*, vendors(shop_name), categories(name, slug)', { count: 'exact' })
        .eq('status', 'active');

      if (search) {
        query = query.ilike('name', `%${search}%`);
      }
      if (selectedCategory !== 'all') {
        const { data: cat } = await supabase.from('categories').select('id').eq('slug', selectedCategory).single();
        if (cat) query = query.eq('category_id', cat.id);
      }

      if (sortBy === 'newest') query = query.order('created_at', { ascending: false });
      else if (sortBy === 'price_low') query = query.order('price', { ascending: true });
      else if (sortBy === 'price_high') query = query.order('price', { ascending: false });
      else if (sortBy === 'name') query = query.order('name', { ascending: true });

      const from = (page - 1) * ITEMS_PER_PAGE;
      const to = from + ITEMS_PER_PAGE - 1;
      query = query.range(from, to);

      const { data, count, error } = await query;
      if (error) throw error;
      setProducts((data as Product[]) || []);
      setTotalCount(count || 0);
    } catch (err) {
      console.error('Failed to fetch products:', err);
      toast({ title: 'Error', description: 'Failed to load products', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  }, [search, selectedCategory, sortBy, page, toast]);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await supabase.from('categories').select('*').order('name');
      const cats = (data as Category[]) || [];

      // Get product counts per category
      const counts = await Promise.all(
        cats.map(async (cat) => {
          const { count } = await supabase
            .from('products')
            .select('*', { count: 'exact', head: true })
            .eq('category_id', cat.id)
            .eq('status', 'active');
          return { ...cat, product_count: count || 0 };
        })
      );
      setCategories(counts);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => { setPage(1); }, [search, selectedCategory, sortBy]);

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
  const selectedCatName = categories.find(c => c.slug === selectedCategory)?.name;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative py-14 sm:py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-nvidia-500 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <Badge className="mb-4 bg-white/10 text-white border-white/20 hover:bg-white/20">
            <Store className="h-3 w-3 mr-1" /> Marketplace
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            ClawnCore Marketplace
          </h1>
          <p className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto mb-8">
            Discover products, tools, and solutions from trusted vendors worldwide
          </p>
          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search products, categories, vendors..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12 h-13 text-base bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:bg-white/15 focus:border-white/30"
            />
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 sm:py-12">

        {/* Category Browser — NVIDIA-style visual grid */}
        {!search && selectedCategory === 'all' && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold">Browse by Category</h2>
                <p className="text-muted-foreground text-sm mt-1">Explore products across all our technology verticals</p>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {categories.map((cat) => {
                const Icon = iconMap[cat.icon] || Package;
                const gradient = categoryColors[cat.slug] || 'from-gray-500 to-gray-600';
                return (
                  <button
                    key={cat.slug}
                    onClick={() => setSelectedCategory(cat.slug)}
                    className="group relative overflow-hidden rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 text-left"
                  >
                    <div className={`h-24 bg-gradient-to-br ${gradient} flex items-center justify-center opacity-90 group-hover:opacity-100 transition-opacity`}>
                      <Icon className="h-10 w-10 text-white drop-shadow-lg" />
                    </div>
                    <div className="p-3">
                      <p className="font-semibold text-sm truncate">{cat.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {cat.product_count} product{cat.product_count !== 1 ? 's' : ''}
                      </p>
                    </div>
                    <Chevron className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {/* Active category header + clear button */}
        {selectedCategory !== 'all' && (
          <div className="flex items-center gap-3 mb-6">
            <Button variant="ghost" size="sm" onClick={() => setSelectedCategory('all')}>
              ← All Categories
            </Button>
            <h2 className="text-xl font-bold">{selectedCatName}</h2>
            <Badge variant="secondary">{totalCount} products</Badge>
          </div>
        )}

        {/* Search results header */}
        {search && (
          <div className="flex items-center gap-3 mb-6">
            <Button variant="ghost" size="sm" onClick={() => { setSearch(''); setSelectedCategory('all'); }}>
              ← Clear
            </Button>
            <h2 className="text-xl font-bold">Results for "{search}"</h2>
            <Badge variant="secondary">{totalCount} products</Badge>
          </div>
        )}

        {/* Sort & Results count */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
          {(search || selectedCategory !== 'all') ? null : (
            <p className="text-muted-foreground">
              {totalCount} product{totalCount !== 1 ? 's' : ''} available
            </p>
          )}
          {(search || selectedCategory !== 'all') && <div />}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price_low">Price: Low to High</SelectItem>
              <SelectItem value="price_high">Price: High to Low</SelectItem>
              <SelectItem value="name">Name A-Z</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-muted rounded-lg h-48 mb-4" />
                <div className="bg-muted rounded h-4 w-3/4 mb-2" />
                <div className="bg-muted rounded h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No products found</h3>
            <p className="text-muted-foreground mb-6">
              {search ? 'Try a different search term' : 'Be the first to list a product!'}
            </p>
            {!search && (
              <Button onClick={() => navigate('/vendor/dashboard')}>
                <Store className="mr-2 h-4 w-4" />
                Become a Vendor
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card
                key={product.id}
                className="group cursor-pointer hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200 dark:border-white/10 hover:border-blue-500/30"
                onClick={() => navigate(`/marketplace/product/${product.id}`)}
              >
                <div className="relative h-48 bg-muted overflow-hidden">
                  {product.images?.[0] ? (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-white/5 dark:to-white/10">
                      <Package className="h-12 w-12 text-muted-foreground" />
                    </div>
                  )}
                  {product.featured && (
                    <Badge className="absolute top-2 left-2 bg-yellow-500 text-black">
                      <Star className="h-3 w-3 mr-1" /> Featured
                    </Badge>
                  )}
                  {product.stock === 0 && (
                    <Badge className="absolute top-2 right-2 bg-red-500">Out of Stock</Badge>
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-1 line-clamp-1">{product.name}</h3>
                  {product.categories && (
                    <Badge variant="secondary" className="text-xs mb-2">
                      {product.categories.name}
                    </Badge>
                  )}
                  <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                    {product.description || 'No description'}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-blue-600">
                      ${Number(product.price).toFixed(2)}
                    </span>
                    {product.vendors && (
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Store className="h-3 w-3" />
                        {product.vendors.shop_name}
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <Button
              variant="outline"
              size="sm"
              disabled={page === 1}
              onClick={() => setPage(p => p - 1)}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm text-muted-foreground px-4">
              Page {page} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={page === totalPages}
              onClick={() => setPage(p => p + 1)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Vendor CTA */}
        <div className="mt-16 text-center p-10 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-white/5 dark:to-blue-500/5 rounded-2xl border border-gray-200 dark:border-white/10">
          <Store className="h-12 w-12 mx-auto text-blue-600 mb-4" />
          <h3 className="text-2xl font-bold mb-2">Sell on ClawnCore</h3>
          <p className="text-muted-foreground max-w-lg mx-auto mb-6">
            Join our marketplace and reach customers worldwide. List your products and grow your business.
          </p>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-600 text-white" onClick={() => navigate('/vendor/dashboard')}>
            Start Selling Today
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
