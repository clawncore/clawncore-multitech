// Store API client — calls backend which talks to Supabase
// In dev, Vite proxy handles /api/* → Render. In prod, Vercel rewrite handles it.
// Set VITE_API_URL to override (e.g. for local backend testing).
const API_BASE = import.meta.env.VITE_API_URL || '';

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    credentials: 'include', // send session cookies
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message || `API error ${res.status}`);
  }
  return res.json();
}

// ── Products ──────────────────────────────────────────────────────────────

export interface StoreProduct {
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
  status: string;
  created_at: string;
}

export interface ProductsResponse {
  products: StoreProduct[];
  total: number;
}

export async function fetchProducts(params?: {
  category?: string;
  featured?: boolean;
  sort?: string;
  limit?: number;
  offset?: number;
  search?: string;
}): Promise<ProductsResponse> {
  const qs = new URLSearchParams();
  if (params?.category) qs.set('category', params.category);
  if (params?.featured) qs.set('featured', 'true');
  if (params?.sort) qs.set('sort', params.sort);
  if (params?.limit) qs.set('limit', String(params.limit));
  if (params?.offset) qs.set('offset', String(params.offset));
  if (params?.search) qs.set('search', params.search);
  const q = qs.toString();
  return apiFetch(`/api/store/products${q ? `?${q}` : ''}`);
}

export async function fetchProduct(id: string): Promise<StoreProduct> {
  return apiFetch(`/api/store/products/${id}`);
}

// ── Orders ────────────────────────────────────────────────────────────────

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface OrderShipping {
  name: string;
  email: string;
  phone: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  notes?: string;
}

export interface StoreOrder {
  id: string;
  user_id: string | null;
  items: OrderItem[];
  subtotal: number;
  shipping_cost: number;
  tax: number;
  total: number;
  shipping: OrderShipping;
  payment_method: string;
  status: string;
  created_at: string;
}

export async function createOrder(order: {
  items: OrderItem[];
  subtotal: number;
  shipping_cost: number;
  tax: number;
  total: number;
  shipping: OrderShipping;
  payment_method: string;
}): Promise<{ orderId: string }> {
  return apiFetch('/api/store/orders', {
    method: 'POST',
    body: JSON.stringify(order),
  });
}

export async function fetchOrders(): Promise<StoreOrder[]> {
  const data = await apiFetch<{ orders: StoreOrder[] }>('/api/store/orders');
  return data.orders;
}

export async function fetchOrder(id: string): Promise<StoreOrder> {
  return apiFetch(`/api/store/orders/${id}`);
}
