import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { StoreLayout } from '@/components/store/StoreLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { fetchOrder, type StoreOrder } from '@/lib/storeApi';
import { CheckCircle, Package, Truck, MapPin, Calendar } from 'lucide-react';

export default function StoreConfirmation() {
  const [location, navigate] = useLocation();
  const orderId = location.split('/store/order/')[1]?.split('?')[0] || '';
  const [order, setOrder] = useState<StoreOrder | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrder = async () => {
      try {
        const data = await fetchOrder(orderId);
        setOrder(data);
      } catch {
        setOrder(null);
      }
      setLoading(false);
    };
    if (orderId) loadOrder();
  }, [orderId]);

  if (loading) {
    return <StoreLayout><div className="container mx-auto px-4 py-20 text-center"><div className="animate-pulse bg-gray-200 dark:bg-white/10 rounded-xl h-64" /></div></StoreLayout>;
  }

  if (!order) {
    return <StoreLayout><div className="container mx-auto px-4 py-20 text-center"><h2 className="text-xl font-bold mb-4">Order not found</h2><Button onClick={() => navigate('/store')}>Back to Store</Button></div></StoreLayout>;
  }

  const estDelivery = new Date(new Date(order.created_at).getTime() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <StoreLayout>
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        {/* Success */}
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-nvidia-100 dark:bg-nvidia-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-nvidia-500" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
          <p className="text-muted-foreground mb-4">Thank you for your purchase. We'll get your order shipped right away.</p>
          <div className="flex items-center justify-center gap-4 text-sm">
            <Badge variant="secondary" className="text-xs">
              <Package className="h-3 w-3 mr-1" /> Order #{order.id.slice(0, 8).toUpperCase()}
            </Badge>
            <span className="text-muted-foreground flex items-center gap-1">
              <Calendar className="h-3 w-3" /> {new Date(order.created_at).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Order Details */}
        <div className="space-y-4">
          {/* Items */}
          <Card className="border border-gray-200 dark:border-white/10">
            <CardContent className="p-6">
              <h3 className="font-bold mb-4">Items Ordered</h3>
              <div className="space-y-3">
                {order.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
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
              <div className="border-t border-gray-100 dark:border-white/5 mt-4 pt-4 space-y-1 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>${Number(order.subtotal).toFixed(2)}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>{Number(order.shipping_cost) === 0 ? 'FREE' : `$${Number(order.shipping_cost).toFixed(2)}`}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Tax</span><span>${Number(order.tax).toFixed(2)}</span></div>
                <div className="flex justify-between font-bold text-base pt-2 border-t border-gray-100 dark:border-white/5"><span>Total</span><span>${Number(order.total).toFixed(2)}</span></div>
              </div>
            </CardContent>
          </Card>

          {/* Shipping & Payment */}
          <div className="grid sm:grid-cols-2 gap-4">
            <Card className="border border-gray-200 dark:border-white/10">
              <CardContent className="p-5">
                <p className="font-semibold text-sm mb-2 flex items-center gap-2"><MapPin className="h-4 w-4 text-nvidia-500" /> Shipping To</p>
                <p className="text-sm text-muted-foreground">{order.shipping.name}<br />{order.shipping.address1}<br />{order.shipping.city}, {order.shipping.state} {order.shipping.zip}<br />{order.shipping.country}</p>
              </CardContent>
            </Card>
            <Card className="border border-gray-200 dark:border-white/10">
              <CardContent className="p-5">
                <p className="font-semibold text-sm mb-2 flex items-center gap-2"><Truck className="h-4 w-4 text-nvidia-500" /> Delivery</p>
                <p className="text-sm text-muted-foreground">Estimated delivery by<br /><span className="font-medium text-foreground">{estDelivery}</span></p>
                <p className="text-xs text-muted-foreground mt-2 capitalize">Payment: {order.payment_method === 'cod' ? 'Cash on Delivery' : order.payment_method}</p>
              </CardContent>
            </Card>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            <Button className="bg-nvidia-500 hover:bg-nvidia-600 text-black" onClick={() => navigate('/store')}>
              Continue Shopping
            </Button>
            <Button variant="outline" onClick={() => navigate('/store/orders')}>
              View All Orders
            </Button>
          </div>
        </div>
      </div>
    </StoreLayout>
  );
}
