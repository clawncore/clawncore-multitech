import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { StoreLayout } from '@/components/store/StoreLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { fetchOrders, type StoreOrder } from '@/lib/storeApi';
import { useAuth } from '@/hooks/useAuth';
import { Package, ChevronDown, ChevronUp, Clock, CheckCircle, Truck, MapPin, ShoppingBag } from 'lucide-react';

const statusConfig: Record<string, { color: string; icon: React.FC<{ className?: string }> }> = {
  pending: { color: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20', icon: Clock },
  confirmed: { color: 'bg-blue-500/10 text-blue-600 border-blue-500/20', icon: CheckCircle },
  shipped: { color: 'bg-purple-500/10 text-purple-600 border-purple-500/20', icon: Truck },
  delivered: { color: 'bg-green-500/10 text-green-600 border-green-500/20', icon: CheckCircle },
  cancelled: { color: 'bg-red-500/10 text-red-600 border-red-500/20', icon: Package },
};

const statusSteps = ['pending', 'confirmed', 'shipped', 'delivered'];

export default function StoreOrders() {
  const [, navigate] = useLocation();
  const { isAuthenticated, openLoginModal } = useAuth();
  const [orders, setOrders] = useState<StoreOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) { setLoading(false); return; }
    const loadOrders = async () => {
      const data = await fetchOrders();
      setOrders(data || []);
      setLoading(false);
    };
    loadOrders();
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <StoreLayout>
        <div className="container mx-auto px-4 py-20 text-center">
          <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-xl font-bold mb-2">Sign in to view your orders</h2>
          <p className="text-muted-foreground mb-6">Track your purchases and delivery status.</p>
          <Button className="bg-nvidia-500 hover:bg-nvidia-600 text-black" onClick={openLoginModal}>Sign In</Button>
        </div>
      </StoreLayout>
    );
  }

  return (
    <StoreLayout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">My Orders</h1>

        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="animate-pulse bg-gray-200 dark:bg-white/10 rounded-xl h-32" />
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">No orders yet</h2>
            <p className="text-muted-foreground mb-6">Start shopping to see your orders here.</p>
            <Button className="bg-nvidia-500 hover:bg-nvidia-600 text-black" onClick={() => navigate('/store')}>Browse Store</Button>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const cfg = statusConfig[order.status] || statusConfig.pending;
              const Icon = cfg.icon;
              const isExpanded = expanded === order.id;
              const currentStep = statusSteps.indexOf(order.status);

              return (
                <Card key={order.id} className="border border-gray-200 dark:border-white/10 overflow-hidden">
                  <CardContent className="p-5">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer"
                      onClick={() => setExpanded(isExpanded ? null : order.id)}>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 dark:bg-white/5 rounded-lg overflow-hidden flex-shrink-0">
                          {order.items[0]?.image ? <img src={order.items[0].image} alt="" className="w-full h-full object-cover" /> : <Package className="h-5 w-5 m-auto mt-2.5 text-muted-foreground" />}
                        </div>
                        <div>
                          <p className="font-semibold text-sm">Order #{order.id.slice(0, 8).toUpperCase()}</p>
                          <p className="text-xs text-muted-foreground">{new Date(order.created_at).toLocaleDateString()} · {order.items.length} item{order.items.length !== 1 ? 's' : ''}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className={`text-xs capitalize ${cfg.color}`}>
                          <Icon className="h-3 w-3 mr-1" /> {order.status}
                        </Badge>
                        <span className="font-bold">${Number(order.total).toFixed(2)}</span>
                        {isExpanded ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                      </div>
                    </div>

                    {/* Expanded */}
                    {isExpanded && (
                      <div className="mt-4 pt-4 border-t border-gray-100 dark:border-white/5">
                        {/* Status Timeline */}
                        <div className="flex items-center justify-between mb-6 px-4">
                          {statusSteps.map((s, i) => {
                            const StepIcon = statusConfig[s]?.icon || Clock;
                            return (
                              <div key={s} className="flex flex-col items-center flex-1">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${i <= currentStep ? 'bg-nvidia-500 text-white' : 'bg-gray-200 dark:bg-white/10 text-gray-400'}`}>
                                  <StepIcon className="h-4 w-4" />
                                </div>
                                <span className="text-[10px] text-muted-foreground mt-1 capitalize">{s}</span>
                              </div>
                            );
                          })}
                        </div>

                        {/* Items */}
                        <div className="space-y-2 mb-4">
                          {order.items.map((item, i) => (
                            <div key={i} className="flex items-center gap-3 text-sm">
                              <div className="w-10 h-10 bg-gray-100 dark:bg-white/5 rounded-lg overflow-hidden flex-shrink-0">
                                {item.image ? <img src={item.image} alt="" className="w-full h-full object-cover" /> : null}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium truncate">{item.name}</p>
                                <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                              </div>
                              <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                          ))}
                        </div>

                        <Separator className="my-3" />

                        <div className="grid sm:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="font-semibold mb-1 flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> Shipping</p>
                            <p className="text-muted-foreground">{order.shipping.name}<br />{order.shipping.address1}<br />{order.shipping.city}, {order.shipping.state} {order.shipping.zip}</p>
                          </div>
                          <div>
                            <p className="font-semibold mb-1">Summary</p>
                            <div className="space-y-1 text-muted-foreground">
                              <div className="flex justify-between"><span>Subtotal</span><span>${Number(order.subtotal).toFixed(2)}</span></div>
                              <div className="flex justify-between"><span>Shipping</span><span>{Number(order.shipping_cost) === 0 ? 'FREE' : `$${Number(order.shipping_cost).toFixed(2)}`}</span></div>
                              <div className="flex justify-between"><span>Tax</span><span>${Number(order.tax).toFixed(2)}</span></div>
                              <div className="flex justify-between font-bold text-foreground"><span>Total</span><span>${Number(order.total).toFixed(2)}</span></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </StoreLayout>
  );
}
