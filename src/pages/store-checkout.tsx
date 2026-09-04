import { useState } from 'react';
import { useLocation } from 'wouter';
import { StoreLayout } from '@/components/store/StoreLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/components/CartProvider';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import {
  CheckCircle, CreditCard, Truck, ClipboardCheck, ArrowLeft, Lock
} from 'lucide-react';

interface ShippingInfo {
  name: string;
  email: string;
  phone: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  notes: string;
}

const steps = [
  { label: 'Shipping', icon: Truck },
  { label: 'Payment', icon: CreditCard },
  { label: 'Review', icon: ClipboardCheck },
];

export default function StoreCheckout() {
  const [, navigate] = useLocation();
  const { items, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();

  const [step, setStep] = useState(1);
  const [shipping, setShipping] = useState<ShippingInfo>({
    name: '', email: user?.email || '', phone: '',
    address1: '', address2: '', city: '', state: '', zip: '', country: 'India', notes: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [cardData, setCardData] = useState({ number: '', expiry: '', cvv: '', name: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const shippingCost = cartTotal >= 50 ? 0 : 9.99;
  const tax = cartTotal * 0.08;
  const total = cartTotal + shippingCost + tax;

  const handleShippingNext = () => {
    if (!shipping.name || !shipping.email || !shipping.address1 || !shipping.city || !shipping.state || !shipping.zip) {
      toast({ title: 'Missing fields', description: 'Please fill in all required shipping fields.', variant: 'destructive' });
      return;
    }
    setStep(2);
  };

  const handlePaymentNext = () => setStep(3);

  const handlePlaceOrder = async () => {
    setIsSubmitting(true);
    try {
      const { data, error } = await supabase.from('store_orders').insert({
        user_id: user?.id,
        items: items.map(i => ({ productId: i.productId, name: i.name, price: i.price, image: i.image, quantity: i.quantity })),
        subtotal: cartTotal,
        shipping_cost: shippingCost,
        tax,
        total,
        shipping,
        payment_method: paymentMethod,
        status: 'pending',
      }).select('id').single();

      if (error) throw error;

      clearCart();
      toast({ title: 'Order placed!', description: 'Your order has been confirmed.' });
      navigate(`/store/order/${data.id}`);
    } catch (err) {
      toast({ title: 'Error', description: err instanceof Error ? err.message : 'Failed to place order.', variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <StoreLayout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h2 className="text-xl font-bold mb-4">Your cart is empty</h2>
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => navigate('/store')}>Browse Store</Button>
        </div>
      </StoreLayout>
    );
  }

  return (
    <StoreLayout>
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Back */}
        <Button variant="ghost" size="sm" className="mb-6" onClick={() => step > 1 ? setStep(step - 1) : navigate('/store/cart')}>
          <ArrowLeft className="h-4 w-4 mr-2" /> {step > 1 ? 'Back' : 'Cart'}
        </Button>

        {/* Progress */}
        <div className="flex items-center justify-center gap-0 mb-10">
          {steps.map((s, i) => (
            <div key={s.label} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                  step > i + 1 ? 'bg-emerald-600 text-white' : step === i + 1 ? 'bg-emerald-600 text-white ring-4 ring-emerald-600/20' : 'bg-gray-200 dark:bg-white/10 text-gray-500'
                }`}>
                  {step > i + 1 ? <CheckCircle className="h-5 w-5" /> : i + 1}
                </div>
                <span className={`text-xs mt-1 font-medium ${step === i + 1 ? 'text-emerald-600' : 'text-muted-foreground'}`}>{s.label}</span>
              </div>
              {i < steps.length - 1 && <div className={`w-20 h-0.5 mx-4 mt-[-16px] ${step > i + 1 ? 'bg-emerald-600' : 'bg-gray-200 dark:bg-white/10'}`} />}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Step 1: Shipping */}
            {step === 1 && (
              <Card className="border border-gray-200 dark:border-white/10">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><Truck className="h-5 w-5 text-emerald-600" /> Shipping Information</h2>
                  <div className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div><Label>Full Name *</Label><Input value={shipping.name} onChange={(e) => setShipping(p => ({ ...p, name: e.target.value }))} placeholder="John Doe" /></div>
                      <div><Label>Email *</Label><Input type="email" value={shipping.email} onChange={(e) => setShipping(p => ({ ...p, email: e.target.value }))} placeholder="john@example.com" /></div>
                    </div>
                    <div><Label>Phone *</Label><Input value={shipping.phone} onChange={(e) => setShipping(p => ({ ...p, phone: e.target.value }))} placeholder="+91 8790813536" /></div>
                    <div><Label>Address Line 1 *</Label><Input value={shipping.address1} onChange={(e) => setShipping(p => ({ ...p, address1: e.target.value }))} placeholder="123 Farm Road" /></div>
                    <div><Label>Address Line 2</Label><Input value={shipping.address2} onChange={(e) => setShipping(p => ({ ...p, address2: e.target.value }))} placeholder="Apt, suite, etc." /></div>
                    <div className="grid sm:grid-cols-3 gap-4">
                      <div><Label>City *</Label><Input value={shipping.city} onChange={(e) => setShipping(p => ({ ...p, city: e.target.value }))} placeholder="Hyderabad" /></div>
                      <div><Label>State *</Label><Input value={shipping.state} onChange={(e) => setShipping(p => ({ ...p, state: e.target.value }))} placeholder="Andhra Pradesh" /></div>
                      <div><Label>ZIP Code *</Label><Input value={shipping.zip} onChange={(e) => setShipping(p => ({ ...p, zip: e.target.value }))} placeholder="500001" /></div>
                    </div>
                    <div><Label>Delivery Notes</Label><Textarea rows={2} value={shipping.notes} onChange={(e) => setShipping(p => ({ ...p, notes: e.target.value }))} placeholder="Gate code, delivery instructions, etc." /></div>
                  </div>
                  <Button className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700 text-white" onClick={handleShippingNext}>Continue to Payment</Button>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
              <Card className="border border-gray-200 dark:border-white/10">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><CreditCard className="h-5 w-5 text-emerald-600" /> Payment Method</h2>
                  <div className="space-y-3 mb-6">
                    {[
                      { id: 'cod', label: 'Cash on Delivery', desc: 'Pay when your order arrives' },
                      { id: 'card', label: 'Credit / Debit Card', desc: 'Secure online payment' },
                      { id: 'upi', label: 'UPI Payment', desc: 'Google Pay, PhonePe, Paytm' },
                    ].map((m) => (
                      <label key={m.id} className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === m.id ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10' : 'border-gray-200 dark:border-white/10 hover:border-gray-300'}`}>
                        <input type="radio" name="payment" value={m.id} checked={paymentMethod === m.id} onChange={() => setPaymentMethod(m.id)} className="accent-emerald-600" />
                        <div>
                          <p className="font-medium">{m.label}</p>
                          <p className="text-sm text-muted-foreground">{m.desc}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                  {paymentMethod === 'card' && (
                    <div className="space-y-4 p-4 bg-gray-50 dark:bg-white/5 rounded-xl mb-6">
                      <div><Label>Card Number</Label><Input placeholder="4242 4242 4242 4242" value={cardData.number} onChange={(e) => setCardData(p => ({ ...p, number: e.target.value }))} /></div>
                      <div className="grid grid-cols-2 gap-4">
                        <div><Label>Expiry</Label><Input placeholder="MM/YY" value={cardData.expiry} onChange={(e) => setCardData(p => ({ ...p, expiry: e.target.value }))} /></div>
                        <div><Label>CVV</Label><Input placeholder="123" value={cardData.cvv} onChange={(e) => setCardData(p => ({ ...p, cvv: e.target.value }))} /></div>
                      </div>
                      <div><Label>Cardholder Name</Label><Input placeholder="John Doe" value={cardData.name} onChange={(e) => setCardData(p => ({ ...p, name: e.target.value }))} /></div>
                      <p className="text-xs text-muted-foreground flex items-center gap-1"><Lock className="h-3 w-3" /> This is a demo store. No real payment is processed.</p>
                    </div>
                  )}
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white" onClick={handlePaymentNext}>Review Order</Button>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Review */}
            {step === 3 && (
              <Card className="border border-gray-200 dark:border-white/10">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><ClipboardCheck className="h-5 w-5 text-emerald-600" /> Review Your Order</h2>

                  {/* Shipping Summary */}
                  <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-xl mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-semibold text-sm">Shipping Address</p>
                      <button onClick={() => setStep(1)} className="text-xs text-emerald-600 hover:underline">Edit</button>
                    </div>
                    <p className="text-sm text-muted-foreground">{shipping.name}<br />{shipping.address1}{shipping.address2 ? `, ${shipping.address2}` : ''}<br />{shipping.city}, {shipping.state} {shipping.zip}<br />{shipping.country}</p>
                  </div>

                  {/* Payment Summary */}
                  <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-xl mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-semibold text-sm">Payment Method</p>
                      <button onClick={() => setStep(2)} className="text-xs text-emerald-600 hover:underline">Edit</button>
                    </div>
                    <p className="text-sm text-muted-foreground capitalize">{paymentMethod === 'cod' ? 'Cash on Delivery' : paymentMethod === 'upi' ? 'UPI Payment' : 'Credit/Debit Card'}</p>
                  </div>

                  {/* Items */}
                  <div className="mb-4">
                    <p className="font-semibold text-sm mb-3">Items ({items.length})</p>
                    <div className="space-y-3">
                      {items.map((item) => (
                        <div key={item.productId} className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gray-100 dark:bg-white/5 rounded-lg overflow-hidden flex-shrink-0">
                            {item.image ? <img src={item.image} alt="" className="w-full h-full object-cover" /> : null}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{item.name}</p>
                            <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                          </div>
                          <span className="text-sm font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white" size="lg" onClick={handlePlaceOrder} disabled={isSubmitting}>
                    <Lock className="h-4 w-4 mr-2" />
                    {isSubmitting ? 'Placing Order...' : `Place Order — $${total.toFixed(2)}`}
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div>
            <Card className="border border-gray-200 dark:border-white/10 sticky top-24">
              <CardContent className="p-6 space-y-4">
                <h3 className="font-bold">Order Summary</h3>
                <Separator />
                <div className="space-y-2 text-sm max-h-40 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.productId} className="flex justify-between">
                      <span className="truncate mr-2">{item.name} x{item.quantity}</span>
                      <span className="font-medium whitespace-nowrap">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <Separator />
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span>Subtotal</span><span>${cartTotal.toFixed(2)}</span></div>
                  <div className="flex justify-between"><span>Shipping</span><span className={shippingCost === 0 ? 'text-green-500 font-medium' : ''}>{shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}</span></div>
                  <div className="flex justify-between"><span>Tax (8%)</span><span>${tax.toFixed(2)}</span></div>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg"><span>Total</span><span>${total.toFixed(2)}</span></div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </StoreLayout>
  );
}
