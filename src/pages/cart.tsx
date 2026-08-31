import { useLocation } from 'wouter';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/components/CartProvider';
import { useAuth } from '@/hooks/useAuth';
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft, Store } from 'lucide-react';

export default function Cart() {
  const [, navigate] = useLocation();
  const { items, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
  const { isAuthenticated, openLoginModal } = useAuth();

  const handleCheckout = () => {
    if (!isAuthenticated) {
      openLoginModal();
      return;
    }
    // Checkout integration coming soon
    alert('Checkout will be available soon! This is a demo marketplace.');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Shopping Cart</h1>
          <Button variant="ghost" size="sm" onClick={() => navigate('/marketplace')}>
            <ArrowLeft className="h-4 w-4 mr-2" /> Continue Shopping
          </Button>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">Browse the marketplace to find something you love.</p>
            <Button className="bg-blue-600 hover:bg-blue-600 text-slate-900" onClick={() => navigate('/marketplace')}>
              Browse Marketplace
            </Button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <Card key={item.productId}>
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="w-20 h-20 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ShoppingBag className="h-6 w-6 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold truncate">{item.name}</h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Store className="h-3 w-3" /> {item.vendorName}
                      </p>
                      <p className="text-blue-600 font-bold mt-1">${item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center border rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        className="p-2 hover:bg-muted"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="px-3 font-medium text-sm">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        className="p-2 hover:bg-muted"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <span className="font-bold w-20 text-right">${(item.price * item.quantity).toFixed(2)}</span>
                    <Button size="sm" variant="ghost" onClick={() => removeFromCart(item.productId)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
              <Button variant="outline" onClick={clearCart} className="text-red-500">
                <Trash2 className="h-4 w-4 mr-2" /> Clear Cart
              </Button>
            </div>

            {/* Order Summary */}
            <div>
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-lg font-bold">Order Summary</h3>
                  <Separator />
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
                      <span>${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Shipping</span>
                      <span className="text-green-500">Free</span>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-600 text-slate-900"
                    size="lg"
                    onClick={handleCheckout}
                  >
                    Proceed to Checkout
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
