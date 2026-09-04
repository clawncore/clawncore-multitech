import { useState, useEffect } from 'react';
import { useLocation, Link } from 'wouter';
import { StoreLayout } from '@/components/store/StoreLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/lib/supabase';
import { useCart } from '@/components/CartProvider';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import {
  ChevronRight, Star, ShoppingCart, Minus, Plus, Truck,
  Shield, RotateCcw, CheckCircle, Sprout, Package
} from 'lucide-react';

interface StoreProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  compare_price: number | null;
  images: string[];
  category: string;
  subcategory: string;
  stock: number;
  featured: boolean;
  rating: number;
  review_count: number;
  tags: string[];
}

export default function StoreProductDetail() {
  const [location, navigate] = useLocation();
  const productId = location.split('/store/product/')[1]?.split('?')[0] || '';
  const { addToCart } = useCart();
  const { isAuthenticated, openLoginModal } = useAuth();
  const { toast } = useToast();

  const [product, setProduct] = useState<StoreProduct | null>(null);
  const [related, setRelated] = useState<StoreProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const { data } = await supabase.from('store_products').select('*').eq('id', productId).single();
      if (data) {
        setProduct(data as StoreProduct);
        const { data: rel } = await supabase.from('store_products').select('*').eq('status', 'active').eq('category', (data as StoreProduct).category).neq('id', productId).limit(4);
        setRelated((rel as StoreProduct[]) || []);
      }
      setLoading(false);
    };
    if (productId) fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    if (!isAuthenticated) { openLoginModal(); return; }
    if (!product) return;
    for (let i = 0; i < quantity; i++) {
      addToCart({ productId: product.id, name: product.name, price: Number(product.price), image: product.images?.[0] || '', vendorName: 'ClawnCore Store', stock: product.stock });
    }
    setAdded(true);
    toast({ title: 'Added to cart', description: `${quantity}x "${product.name}" added to your cart` });
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) {
    return <StoreLayout><div className="container mx-auto px-4 py-12"><div className="animate-pulse grid lg:grid-cols-2 gap-12"><div className="bg-gray-200 dark:bg-white/10 rounded-xl h-96" /><div><div className="bg-gray-200 dark:bg-white/10 rounded h-8 w-3/4 mb-4" /><div className="bg-gray-200 dark:bg-white/10 rounded h-4 w-1/2 mb-8" /></div></div></div></StoreLayout>;
  }

  if (!product) {
    return <StoreLayout><div className="container mx-auto px-4 py-20 text-center"><Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" /><h2 className="text-xl font-bold mb-2">Product Not Found</h2><Button onClick={() => navigate('/store')}>Back to Store</Button></div></StoreLayout>;
  }

  const hasDiscount = product.compare_price && product.compare_price > product.price;
  const discountPct = hasDiscount ? Math.round(((product.compare_price! - product.price) / product.compare_price!) * 100) : 0;

  return (
    <StoreLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <span className="cursor-pointer hover:text-emerald-600" onClick={() => navigate('/store')}>Store</span>
          <ChevronRight className="h-3 w-3" />
          <span className="cursor-pointer hover:text-emerald-600" onClick={() => navigate(`/store/category/${product.category}`)}>{product.category}</span>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground">{product.name}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Images */}
          <div>
            <div className="relative rounded-xl overflow-hidden bg-gray-100 dark:bg-white/5 aspect-square mb-4">
              {product.images?.[selectedImage] ? (
                <img src={product.images[selectedImage]} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center"><Sprout className="h-24 w-24 text-muted-foreground" /></div>
              )}
              {hasDiscount && <Badge className="absolute top-4 left-4 bg-red-500 text-white">-{discountPct}% OFF</Badge>}
              {product.stock === 0 && <Badge className="absolute top-4 right-4 bg-gray-500">Out of Stock</Badge>}
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, i) => (
                  <button key={i} onClick={() => setSelectedImage(i)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${selectedImage === i ? 'border-emerald-500' : 'border-transparent'}`}>
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <Badge variant="secondary" className="mb-2 capitalize">{product.category}</Badge>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">{product.name}</h1>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < Math.round(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">{product.rating} ({product.review_count} reviews)</span>
            </div>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-bold text-emerald-600">${Number(product.price).toFixed(2)}</span>
              {hasDiscount && (
                <>
                  <span className="text-lg text-muted-foreground line-through">${Number(product.compare_price).toFixed(2)}</span>
                  <Badge className="bg-red-500/10 text-red-500">Save ${(product.compare_price! - product.price).toFixed(2)}</Badge>
                </>
              )}
            </div>

            <p className="text-muted-foreground mb-6">{product.description}</p>

            {/* Stock */}
            <div className="flex items-center gap-2 mb-6">
              {product.stock > 0 ? (
                <>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-green-600">In Stock ({product.stock} available)</span>
                </>
              ) : (
                <span className="text-sm text-red-500">Out of Stock</span>
              )}
            </div>

            {/* Quantity + Add to Cart */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border rounded-lg">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="p-3 hover:bg-gray-100 dark:hover:bg-white/5"><Minus className="h-4 w-4" /></button>
                <span className="px-4 font-medium">{quantity}</span>
                <button onClick={() => setQuantity(q => Math.min(product.stock, q + 1))} className="p-3 hover:bg-gray-100 dark:hover:bg-white/5"><Plus className="h-4 w-4" /></button>
              </div>
              <Button size="lg" className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
                onClick={handleAddToCart} disabled={product.stock === 0 || added}>
                <ShoppingCart className="h-4 w-4 mr-2" />
                {added ? 'Added!' : product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </Button>
            </div>

            {/* Trust */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[
                { icon: Truck, text: 'Free Shipping' },
                { icon: Shield, text: 'Secure Payment' },
                { icon: RotateCcw, text: '30-Day Returns' },
              ].map((t) => (
                <div key={t.text} className="flex flex-col items-center gap-1 p-3 bg-gray-50 dark:bg-white/5 rounded-lg text-center">
                  <t.icon className="h-4 w-4 text-emerald-600" />
                  <span className="text-xs text-muted-foreground">{t.text}</span>
                </div>
              ))}
            </div>

            {/* Tabs */}
            <Tabs defaultValue="description">
              <TabsList>
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="specs">Specifications</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="text-sm text-muted-foreground leading-relaxed">
                {product.description}
              </TabsContent>
              <TabsContent value="specs">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-2 border-b border-gray-100 dark:border-white/5"><span className="text-muted-foreground">Category</span><span className="capitalize">{product.category}</span></div>
                  <div className="flex justify-between py-2 border-b border-gray-100 dark:border-white/5"><span className="text-muted-foreground">Subcategory</span><span>{product.subcategory || 'N/A'}</span></div>
                  <div className="flex justify-between py-2 border-b border-gray-100 dark:border-white/5"><span className="text-muted-foreground">Stock</span><span>{product.stock} units</span></div>
                  {product.tags.length > 0 && (
                    <div className="flex justify-between py-2"><span className="text-muted-foreground">Tags</span><span>{product.tags.join(', ')}</span></div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p) => (
                <Card key={p.id} className="group cursor-pointer hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200 dark:border-white/10 hover:border-emerald-500/30"
                  onClick={() => navigate(`/store/product/${p.id}`)}>
                  <div className="relative h-40 bg-gray-100 dark:bg-white/5 overflow-hidden">
                    {p.images?.[0] ? (
                      <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center"><Sprout className="h-12 w-12 text-muted-foreground" /></div>
                    )}
                  </div>
                  <CardContent className="p-3">
                    <h3 className="font-semibold text-sm line-clamp-1 mb-1">{p.name}</h3>
                    <div className="flex items-center gap-1 mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`h-3 w-3 ${i < Math.round(p.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} />
                      ))}
                    </div>
                    <span className="text-lg font-bold text-emerald-600">${Number(p.price).toFixed(2)}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}
      </div>
    </StoreLayout>
  );
}
