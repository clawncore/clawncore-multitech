import { useState, useEffect } from 'react';
import { useLocation, useRoute } from 'wouter';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/components/CartProvider';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';
import { ArrowLeft, ShoppingCart, Store, Package, Star, Minus, Plus, Check } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  stock: number;
  featured: boolean;
  created_at: string;
  vendor_id: string;
  categories: { name: string; slug: string } | null;
  vendors: { shop_name: string; description: string; logo_url: string } | null;
}

interface RelatedProduct {
  id: string;
  name: string;
  price: number;
  images: string[];
  vendors: { shop_name: string } | null;
}

export default function ProductDetail() {
  const [, params] = useRoute('/marketplace/product/:productId');
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const { addToCart, items } = useCart();
  const { isAuthenticated, openLoginModal } = useAuth();
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<RelatedProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!params?.productId) return;
    setLoading(true);
    supabase
      .from('products')
      .select('*, vendors(shop_name, description, logo_url), categories(name, slug)')
      .eq('id', params.productId)
      .single()
      .then(async ({ data, error }) => {
        if (error || !data) {
          toast({ title: 'Not found', description: 'Product not found', variant: 'destructive' });
          navigate('/marketplace');
          return;
        }
        setProduct(data as Product);
        setSelectedImage(0);

        // Fetch related products
        if (data.category_id) {
          const { data: rel } = await supabase
            .from('products')
            .select('id, name, price, images, vendors(shop_name)')
            .eq('category_id', data.category_id)
            .eq('status', 'active')
            .neq('id', data.id)
            .limit(4);
          setRelated((rel as RelatedProduct[]) || []);
        }
      })
      .finally(() => setLoading(false));
  }, [params?.productId, navigate, toast]);

  const inCart = items.find(i => i.productId === product?.id);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      openLoginModal();
      return;
    }
    if (!product) return;
    for (let i = 0; i < quantity; i++) {
      addToCart({
        productId: product.id,
        name: product.name,
        price: Number(product.price),
        image: product.images?.[0] || '',
        vendorName: product.vendors?.shop_name || 'Unknown',
        stock: product.stock,
      });
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
    toast({ title: 'Added to cart', description: `${quantity}x ${product.name} added to your cart` });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse grid md:grid-cols-2 gap-8">
            <div className="bg-muted rounded-lg h-96" />
            <div className="space-y-4">
              <div className="bg-muted rounded h-8 w-3/4" />
              <div className="bg-muted rounded h-4 w-1/2" />
              <div className="bg-muted rounded h-20 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button variant="ghost" size="sm" onClick={() => navigate('/marketplace')} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Marketplace
        </Button>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Image Gallery */}
          <div>
            <div className="relative bg-muted rounded-lg overflow-hidden aspect-square mb-4">
              {product.images?.[selectedImage] ? (
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Package className="h-24 w-24 text-muted-foreground" />
                </div>
              )}
              {product.featured && (
                <Badge className="absolute top-4 left-4 bg-yellow-500 text-black">
                  <Star className="h-3 w-3 mr-1" /> Featured
                </Badge>
              )}
            </div>
            {product.images && product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === i ? 'border-blue-600' : 'border-transparent'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            {product.categories && (
              <Badge variant="secondary" className="mb-3">{product.categories.name}</Badge>
            )}
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

            <div className="flex items-center gap-3 mb-4">
              {product.vendors && (
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Store className="h-4 w-4" />
                  {product.vendors.shop_name}
                </span>
              )}
              <Badge variant={product.stock > 0 ? 'default' : 'destructive'}>
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </Badge>
            </div>

            <div className="text-3xl font-bold text-blue-600 mb-6">
              ${Number(product.price).toFixed(2)}
            </div>

            <Separator className="mb-6" />

            <div className="mb-6">
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground whitespace-pre-wrap">
                {product.description || 'No description available.'}
              </p>
            </div>

            {product.stock > 0 && (
              <div className="flex items-center gap-4 mb-6">
                <span className="font-semibold">Quantity:</span>
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="p-2 hover:bg-muted"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                    className="p-2 hover:bg-muted"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <Button
                size="lg"
                className="flex-1 bg-blue-600 hover:bg-blue-600 text-slate-900"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                {added ? (
                  <><Check className="mr-2 h-4 w-4" /> Added!</>
                ) : inCart ? (
                  <><ShoppingCart className="mr-2 h-4 w-4" /> Add More ({inCart.quantity} in cart)</>
                ) : (
                  <><ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart</>
                )}
              </Button>
            </div>

            {/* Vendor Card */}
            {product.vendors && (
              <Card className="mt-6">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                    <Store className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold">{product.vendors.shop_name}</p>
                    <p className="text-sm text-muted-foreground">Vendor on ClawnCore</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map((p) => (
                <Card
                  key={p.id}
                  className="cursor-pointer hover:shadow-lg transition-shadow overflow-hidden"
                  onClick={() => navigate(`/marketplace/product/${p.id}`)}
                >
                  <div className="h-32 bg-muted overflow-hidden">
                    {p.images?.[0] ? (
                      <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package className="h-8 w-8 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <CardContent className="p-3">
                    <h4 className="font-medium text-sm line-clamp-1">{p.name}</h4>
                    <p className="text-blue-600 font-bold mt-1">${Number(p.price).toFixed(2)}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
