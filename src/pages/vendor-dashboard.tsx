import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'wouter';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';
import { Store, Plus, Package, ShoppingBag, Edit, Trash2, X, Check } from 'lucide-react';

interface Vendor {
  id: string;
  user_id: string;
  shop_name: string;
  description: string;
  logo_url: string;
  status: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  stock: number;
  status: string;
  category_id: string;
  categories: { name: string } | null;
}

interface Order {
  id: string;
  quantity: number;
  total: number;
  status: string;
  created_at: string;
  products: { name: string } | null;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

const emptyProduct = { name: '', description: '', price: '', stock: '', category_id: '', images: '' };

export default function VendorDashboard() {
  const [, navigate] = useLocation();
  const { user, isAuthenticated, openLoginModal } = useAuth();
  const { toast } = useToast();
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [productDialog, setProductDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState<string | null>(null);
  const [form, setForm] = useState(emptyProduct);
  const [saving, setSaving] = useState(false);

  // Vendor registration form
  const [regForm, setRegForm] = useState({ shop_name: '', description: '' });
  const [registering, setRegistering] = useState(false);

  const fetchVendor = useCallback(async () => {
    if (!user) return;
    const { data } = await supabase.from('vendors').select('*').eq('user_id', user.id).single();
    setVendor(data as Vendor | null);
    return data;
  }, [user]);

  const fetchProducts = useCallback(async (vendorId: string) => {
    const { data } = await supabase
      .from('products')
      .select('*, categories(name)')
      .eq('vendor_id', vendorId)
      .order('created_at', { ascending: false });
    setProducts((data as Product[]) || []);
  }, []);

  const fetchOrders = useCallback(async (vendorId: string) => {
    const { data } = await supabase
      .from('orders')
      .select('*, products(name)')
      .eq('vendor_id', vendorId)
      .order('created_at', { ascending: false });
    setOrders((data as Order[]) || []);
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
      openLoginModal();
      return;
    }
    supabase.from('categories').select('*').order('name').then(({ data }) => {
      setCategories((data as Category[]) || []);
    });
    fetchVendor().then((v) => {
      if (v) {
        Promise.all([fetchProducts(v.id), fetchOrders(v.id)]).finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    });
  }, [isAuthenticated, navigate, openLoginModal, fetchVendor, fetchProducts, fetchOrders]);

  const handleRegisterVendor = async () => {
    if (!user || !regForm.shop_name.trim()) return;
    setRegistering(true);
    try {
      const { error } = await supabase.from('vendors').insert({
        user_id: user.id,
        shop_name: regForm.shop_name.trim(),
        description: regForm.description.trim(),
      });
      if (error) throw error;
      toast({ title: 'Registered!', description: 'Your vendor application is pending approval.' });
      const v = await fetchVendor();
      if (v) {
        fetchProducts(v.id);
        fetchOrders(v.id);
      }
    } catch (err) {
      toast({ title: 'Error', description: err instanceof Error ? err.message : 'Failed to register', variant: 'destructive' });
    } finally {
      setRegistering(false);
    }
  };

  const openNewProduct = () => {
    setEditingProduct(null);
    setForm(emptyProduct);
    setProductDialog(true);
  };

  const openEditProduct = (p: Product) => {
    setEditingProduct(p.id);
    setForm({
      name: p.name,
      description: p.description,
      price: String(p.price),
      stock: String(p.stock),
      category_id: p.category_id || '',
      images: p.images?.join(', ') || '',
    });
    setProductDialog(true);
  };

  const handleSaveProduct = async () => {
    if (!vendor || !form.name.trim() || !form.price) return;
    setSaving(true);
    try {
      const productData = {
        vendor_id: vendor.id,
        name: form.name.trim(),
        description: form.description.trim(),
        price: parseFloat(form.price),
        stock: parseInt(form.stock || '0', 10),
        category_id: form.category_id || null,
        images: form.images ? form.images.split(',').map(s => s.trim()).filter(Boolean) : [],
      };

      if (editingProduct) {
        const { error } = await supabase.from('products').update(productData).eq('id', editingProduct);
        if (error) throw error;
        toast({ title: 'Updated', description: 'Product updated successfully' });
      } else {
        const { error } = await supabase.from('products').insert(productData);
        if (error) throw error;
        toast({ title: 'Created', description: 'Product listed successfully' });
      }
      setProductDialog(false);
      fetchProducts(vendor.id);
    } catch (err) {
      toast({ title: 'Error', description: err instanceof Error ? err.message : 'Failed to save', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!vendor) return;
    const { error } = await supabase.from('products').delete().eq('id', productId);
    if (error) {
      toast({ title: 'Error', description: 'Failed to delete', variant: 'destructive' });
      return;
    }
    fetchProducts(vendor.id);
  };

  const handleToggleStatus = async (productId: string, currentStatus: string) => {
    if (!vendor) return;
    const newStatus = currentStatus === 'active' ? 'draft' : 'active';
    const { error } = await supabase.from('products').update({ status: newStatus }).eq('id', productId);
    if (!error) fetchProducts(vendor.id);
  };

  const handleOrderStatus = async (orderId: string, status: string) => {
    if (!vendor) return;
    const { error } = await supabase.from('orders').update({ status }).eq('id', orderId);
    if (!error) fetchOrders(vendor.id);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            <div className="bg-muted rounded h-8 w-64" />
            <div className="bg-muted rounded h-64 w-full" />
          </div>
        </div>
      </div>
    );
  }

  // Not a vendor yet — show registration
  if (!vendor) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 max-w-lg">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Store className="mr-2 h-5 w-5" />
                Become a Vendor
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Register your shop on ClawnCore Marketplace. Your application will be reviewed for approval.
              </p>
              <div>
                <Label>Shop Name *</Label>
                <Input
                  value={regForm.shop_name}
                  onChange={(e) => setRegForm(f => ({ ...f, shop_name: e.target.value }))}
                  placeholder="My Awesome Shop"
                />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  value={regForm.description}
                  onChange={(e) => setRegForm(f => ({ ...f, description: e.target.value }))}
                  placeholder="Tell us about your shop..."
                  rows={3}
                />
              </div>
              <Button
                className="w-full bg-blue-600 hover:bg-blue-600 text-slate-900"
                onClick={handleRegisterVendor}
                disabled={!regForm.shop_name.trim() || registering}
              >
                {registering ? 'Registering...' : 'Register as Vendor'}
              </Button>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  // Pending approval
  if (vendor.status === 'pending') {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 max-w-lg text-center">
          <Store className="h-16 w-16 mx-auto text-yellow-500 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Application Under Review</h2>
          <p className="text-muted-foreground">
            Your vendor application for <strong>{vendor.shop_name}</strong> is being reviewed.
            We'll notify you once approved.
          </p>
        </div>
        <Footer />
      </div>
    );
  }

  const statusColor = (s: string) => {
    switch (s) {
      case 'pending': return 'bg-yellow-500';
      case 'confirmed': return 'bg-blue-500';
      case 'shipped': return 'bg-purple-500';
      case 'delivered': return 'bg-green-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">{vendor.shop_name}</h1>
            <p className="text-muted-foreground">Vendor Dashboard</p>
          </div>
          <Button onClick={() => navigate('/marketplace')} variant="outline">
            View Marketplace
          </Button>
        </div>

        <Tabs defaultValue="products">
          <TabsList>
            <TabsTrigger value="products">Products ({products.length})</TabsTrigger>
            <TabsTrigger value="orders">Orders ({orders.length})</TabsTrigger>
            <TabsTrigger value="profile">Shop Profile</TabsTrigger>
          </TabsList>

          {/* Products Tab */}
          <TabsContent value="products">
            <div className="flex justify-end mb-4">
              <Dialog open={productDialog} onOpenChange={setProductDialog}>
                <DialogTrigger asChild>
                  <Button onClick={openNewProduct} className="bg-blue-600 hover:bg-blue-600 text-slate-900">
                    <Plus className="mr-2 h-4 w-4" /> Add Product
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg">
                  <DialogHeader>
                    <DialogTitle>{editingProduct ? 'Edit Product' : 'Add Product'}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Product Name *</Label>
                      <Input value={form.name} onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Product name" />
                    </div>
                    <div>
                      <Label>Description</Label>
                      <Textarea value={form.description} onChange={(e) => setForm(f => ({ ...f, description: e.target.value }))} rows={3} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Price ($) *</Label>
                        <Input type="number" step="0.01" min="0" value={form.price} onChange={(e) => setForm(f => ({ ...f, price: e.target.value }))} />
                      </div>
                      <div>
                        <Label>Stock</Label>
                        <Input type="number" min="0" value={form.stock} onChange={(e) => setForm(f => ({ ...f, stock: e.target.value }))} />
                      </div>
                    </div>
                    <div>
                      <Label>Category</Label>
                      <Select value={form.category_id} onValueChange={(v) => setForm(f => ({ ...f, category_id: v }))}>
                        <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                        <SelectContent>
                          {categories.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Image URLs (comma-separated)</Label>
                      <Input value={form.images} onChange={(e) => setForm(f => ({ ...f, images: e.target.value }))} placeholder="https://..." />
                    </div>
                    <div className="flex gap-2 justify-end">
                      <Button variant="outline" onClick={() => setProductDialog(false)}>Cancel</Button>
                      <Button onClick={handleSaveProduct} disabled={saving || !form.name.trim()}>
                        {saving ? 'Saving...' : 'Save Product'}
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {products.length === 0 ? (
              <div className="text-center py-16">
                <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No products yet. Add your first product!</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {products.map((p) => (
                  <Card key={p.id}>
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                        {p.images?.[0] ? (
                          <img src={p.images[0]} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Package className="h-6 w-6 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold truncate">{p.name}</h3>
                        <p className="text-sm text-muted-foreground">${Number(p.price).toFixed(2)} · {p.stock} in stock</p>
                        {p.categories && <Badge variant="secondary" className="text-xs mt-1">{p.categories.name}</Badge>}
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={p.status === 'active' ? 'default' : 'outline'}>{p.status}</Badge>
                        <Button size="sm" variant="outline" onClick={() => handleToggleStatus(p.id, p.status)}>
                          {p.status === 'active' ? 'Pause' : 'Activate'}
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => openEditProduct(p)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleDeleteProduct(p.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
            {orders.length === 0 ? (
              <div className="text-center py-16">
                <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No orders yet.</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {orders.map((o) => (
                  <Card key={o.id}>
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold">{o.products?.name || 'Unknown Product'}</h3>
                        <p className="text-sm text-muted-foreground">
                          Qty: {o.quantity} · ${Number(o.total).toFixed(2)} · {new Date(o.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <Select value={o.status} onValueChange={(s) => handleOrderStatus(o.id, s)}>
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="confirmed">Confirmed</SelectItem>
                          <SelectItem value="shipped">Shipped</SelectItem>
                          <SelectItem value="delivered">Delivered</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardContent className="p-6 space-y-4">
                <div>
                  <Label>Shop Name</Label>
                  <Input value={vendor.shop_name} disabled />
                </div>
                <div>
                  <Label>Status</Label>
                  <Badge className="ml-2">{vendor.status}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Shop profile editing will be available soon.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
}
