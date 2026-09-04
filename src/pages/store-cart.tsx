import { useLocation } from 'wouter';
import { StoreLayout } from '@/components/store/StoreLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/components/CartProvider';
import { useAuth } from '@/hooks/useAuth';
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft, Truck, Shield, RotateCcw } from 'lucide-react';

export default function StoreCart() {
  const [, navigate] = useLocation();
  const { items, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
  const { isAuthenticated, openLoginModal } = useAuth();

  const shipping = cartTotal >= 50 ? 0 : 9.99;
  const tax = cartTotal * 0.08;
  const total = cartTotal + shipping + tax;

  const handleCheckout = () => {
    if (!isAuthenticated) { openLoginModal(); return; }
    navigate('/store/checkout');
  };

  return (
    <StoreLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Shopping Cart</h1>
          <Button variant="ghost" size="sm" onClick={() => navigate('/store')}>
            <ArrowLeft className="h-4 w-4 mr-2" /> Continue Shopping
          </Button>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">Browse our agricultural products and find what you need.</p>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => navigate('/store')}>
              Browse Store
            </Button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <Card key={item.productId} className="border border-gray-200 dark:border-white/10">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="w-20 h-20 bg-gray-100 dark:bg-white/5 rounded-lg overflow-hidden flex-shrink-0">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center"><ShoppingBag className="h-6 w-6 text-muted-foreground" /></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold truncate">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">{item.vendorName}</p>
                      <p className="text-emerald-600 font-bold mt-1">${item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center border rounded-lg">
                      <button onClick={() => updateQuantity(item.productId, item.quantity - 1)} className="p-2 hover:bg-gray-100 dark:hover:bg-white/5"><Minus className="h-4 w-4" /></button>
                      <span className="px-3 font-medium text-sm">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.productId, item.quantity + 1)} className="p-2 hover:bg-gray-100 dark:hover:bg-white/5"><Plus className="h-4 w-4" /></button>
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
              <Card className="border border-gray-200 dark:border-white/10">
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-lg font-bold">Order Summary</h3>
                  <Separator />
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span>Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span><span>${cartTotal.toFixed(2)}</span></div>
                    <div className="flex justify-between"><span>Shipping</span><span className={shipping === 0 ? 'text-green-500' : ''}>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span></div>
                    <div className="flex justify-between"><span>Tax (8%)</span><span>${tax.toFixed(2)}</span></div>
                  </div>
                  {shipping > 0 && (
                    <p className="text-xs text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 p-2 rounded-lg">
                      Add ${(50 - cartTotal).toFixed(2)} more for free shipping!
                    </p>
                  )}
                  <Separator />
                  <div className="flex justify-between font-bold text-lg"><span>Total</span><span>${total.toFixed(2)}</span></div>
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white" size="lg" onClick={handleCheckout}>
                    Proceed to Checkout
                  </Button>
                </CardContent>
              </Card>

              <div className="mt-4 grid grid-cols-3 gap-2">
                {[
                  { icon: Truck, text: 'Free Shipping $50+' },
                  { icon: Shield, text: 'Secure Payment' },
                  { icon: RotateCcw, text: '30-Day Returns' },
                ].map((t) => (
                  <div key={t.text} className="flex flex-col items-center gap-1 p-2 bg-gray-50 dark:bg-white/5 rounded-lg text-center">
                    <t.icon className="h-3.5 w-3.5 text-emerald-600" />
                    <span className="text-[10px] text-muted-foreground">{t.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </StoreLayout>
  );
}
