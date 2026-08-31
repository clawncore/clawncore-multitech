-- ClawnCore Marketplace Schema for Supabase
-- Run this in the Supabase SQL Editor after the base schema.sql

-- Vendor profiles (sellers)
CREATE TABLE IF NOT EXISTS vendors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    shop_name TEXT NOT NULL,
    description TEXT DEFAULT '',
    logo_url TEXT DEFAULT '',
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'suspended')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id)
);

-- Product categories
CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    icon TEXT DEFAULT 'Package',
    description TEXT DEFAULT '',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Products
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    vendor_id UUID REFERENCES vendors(id) ON DELETE CASCADE,
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    description TEXT DEFAULT '',
    price NUMERIC(10,2) NOT NULL CHECK (price >= 0),
    images TEXT[] DEFAULT '{}',
    stock INTEGER DEFAULT 0 CHECK (stock >= 0),
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'draft', 'archived')),
    featured BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Orders
CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    buyer_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    vendor_id UUID REFERENCES vendors(id) ON DELETE SET NULL,
    product_id UUID REFERENCES products(id) ON DELETE SET NULL,
    quantity INTEGER DEFAULT 1 CHECK (quantity > 0),
    total NUMERIC(10,2) NOT NULL CHECK (total >= 0),
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reviews (optional future feature)
CREATE TABLE IF NOT EXISTS reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT DEFAULT '',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(product_id, user_id)
);

-- Row Level Security
ALTER TABLE vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Categories: everyone can read
DROP POLICY IF EXISTS "Anyone can view categories" ON categories;
CREATE POLICY "Anyone can view categories" ON categories
    FOR SELECT USING (true);

-- Vendors: everyone can read approved vendors
DROP POLICY IF EXISTS "Anyone can view approved vendors" ON vendors;
CREATE POLICY "Anyone can view approved vendors" ON vendors
    FOR SELECT USING (status = 'approved');

-- Vendors: users can read their own vendor record
DROP POLICY IF EXISTS "Vendors can view own profile" ON vendors;
CREATE POLICY "Vendors can view own profile" ON vendors
    FOR SELECT USING (auth.uid() = user_id);

-- Vendors: users can register as vendors
DROP POLICY IF EXISTS "Users can register as vendors" ON vendors;
CREATE POLICY "Users can register as vendors" ON vendors
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Vendors: vendors can update their own profile
DROP POLICY IF EXISTS "Vendors can update own profile" ON vendors;
CREATE POLICY "Vendors can update own profile" ON vendors
    FOR UPDATE USING (auth.uid() = user_id);

-- Products: everyone can read active products
DROP POLICY IF EXISTS "Anyone can view active products" ON products;
CREATE POLICY "Anyone can view active products" ON products
    FOR SELECT USING (status = 'active');

-- Products: vendors can read their own products (any status)
DROP POLICY IF EXISTS "Vendors can view own products" ON products;
CREATE POLICY "Vendors can view own products" ON products
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM vendors WHERE vendors.id = products.vendor_id AND vendors.user_id = auth.uid())
    );

-- Products: approved vendors can insert products
DROP POLICY IF EXISTS "Approved vendors can insert products" ON products;
CREATE POLICY "Approved vendors can insert products" ON products
    FOR INSERT WITH CHECK (
        EXISTS (SELECT 1 FROM vendors WHERE vendors.id = products.vendor_id AND vendors.user_id = auth.uid() AND vendors.status = 'approved')
    );

-- Products: vendors can update own products
DROP POLICY IF EXISTS "Vendors can update own products" ON products;
CREATE POLICY "Vendors can update own products" ON products
    FOR UPDATE USING (
        EXISTS (SELECT 1 FROM vendors WHERE vendors.id = products.vendor_id AND vendors.user_id = auth.uid())
    );

-- Products: vendors can delete own products
DROP POLICY IF EXISTS "Vendors can delete own products" ON products;
CREATE POLICY "Vendors can delete own products" ON products
    FOR DELETE USING (
        EXISTS (SELECT 1 FROM vendors WHERE vendors.id = products.vendor_id AND vendors.user_id = auth.uid())
    );

-- Orders: buyers can view own orders
DROP POLICY IF EXISTS "Buyers can view own orders" ON orders;
CREATE POLICY "Buyers can view own orders" ON orders
    FOR SELECT USING (auth.uid() = buyer_id);

-- Orders: authenticated users can insert orders
DROP POLICY IF EXISTS "Authenticated users can place orders" ON orders;
CREATE POLICY "Authenticated users can place orders" ON orders
    FOR INSERT WITH CHECK (auth.uid() = buyer_id);

-- Orders: vendors can view orders for their products
DROP POLICY IF EXISTS "Vendors can view own product orders" ON orders;
CREATE POLICY "Vendors can view own product orders" ON orders
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM vendors WHERE vendors.id = orders.vendor_id AND vendors.user_id = auth.uid())
    );

-- Orders: vendors can update order status for their products
DROP POLICY IF EXISTS "Vendors can update order status" ON orders;
CREATE POLICY "Vendors can update order status" ON orders
    FOR UPDATE USING (
        EXISTS (SELECT 1 FROM vendors WHERE vendors.id = orders.vendor_id AND vendors.user_id = auth.uid())
    );

-- Reviews: everyone can read reviews
DROP POLICY IF EXISTS "Anyone can view reviews" ON reviews;
CREATE POLICY "Anyone can view reviews" ON reviews
    FOR SELECT USING (true);

-- Reviews: authenticated users can insert reviews
DROP POLICY IF EXISTS "Authenticated users can insert reviews" ON reviews;
CREATE POLICY "Authenticated users can insert reviews" ON reviews
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Reviews: users can update their own reviews
DROP POLICY IF EXISTS "Users can update own reviews" ON reviews;
CREATE POLICY "Users can update own reviews" ON reviews
    FOR UPDATE USING (auth.uid() = user_id);

-- Reviews: users can delete their own reviews
DROP POLICY IF EXISTS "Users can delete own reviews" ON reviews;
CREATE POLICY "Users can delete own reviews" ON reviews
    FOR DELETE USING (auth.uid() = user_id);

-- updated_at trigger for products
DROP TRIGGER IF EXISTS update_products_updated_at ON products;
CREATE TRIGGER update_products_updated_at
    BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Courses (digital education products)
CREATE TABLE IF NOT EXISTS courses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    vendor_id UUID REFERENCES vendors(id) ON DELETE CASCADE,
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    subtitle TEXT DEFAULT '',
    description TEXT DEFAULT '',
    price NUMERIC(10,2) NOT NULL CHECK (price >= 0),
    thumbnail_url TEXT DEFAULT '',
    preview_video_url TEXT DEFAULT '',
    level TEXT DEFAULT 'beginner' CHECK (level IN ('beginner', 'intermediate', 'advanced', 'expert')),
    duration_hours NUMERIC(5,1) DEFAULT 0,
    lessons_count INTEGER DEFAULT 0,
    enrolled_count INTEGER DEFAULT 0,
    rating NUMERIC(3,2) DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
    tags TEXT[] DEFAULT '{}',
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'draft', 'archived')),
    featured BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Course lessons
CREATE TABLE IF NOT EXISTS course_lessons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT DEFAULT '',
    video_url TEXT DEFAULT '',
    duration_minutes INTEGER DEFAULT 0,
    sort_order INTEGER DEFAULT 0,
    is_free BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Course enrollments
CREATE TABLE IF NOT EXISTS enrollments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    progress NUMERIC(5,2) DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
    enrolled_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ,
    UNIQUE(user_id, course_id)
);

-- Course reviews
CREATE TABLE IF NOT EXISTS course_reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT DEFAULT '',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(course_id, user_id)
);

-- RLS for courses
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_reviews ENABLE ROW LEVEL SECURITY;

-- Courses: everyone can read active courses
DROP POLICY IF EXISTS "Anyone can view active courses" ON courses;
CREATE POLICY "Anyone can view active courses" ON courses FOR SELECT USING (status = 'active');
DROP POLICY IF EXISTS "Vendors can view own courses" ON courses;
CREATE POLICY "Vendors can view own courses" ON courses FOR SELECT USING (
    EXISTS (SELECT 1 FROM vendors WHERE vendors.id = courses.vendor_id AND vendors.user_id = auth.uid())
);
DROP POLICY IF EXISTS "Approved vendors can insert courses" ON courses;
CREATE POLICY "Approved vendors can insert courses" ON courses FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM vendors WHERE vendors.id = courses.vendor_id AND vendors.user_id = auth.uid() AND vendors.status = 'approved')
);
DROP POLICY IF EXISTS "Vendors can update own courses" ON courses;
CREATE POLICY "Vendors can update own courses" ON courses FOR UPDATE USING (
    EXISTS (SELECT 1 FROM vendors WHERE vendors.id = courses.vendor_id AND vendors.user_id = auth.uid())
);
DROP POLICY IF EXISTS "Vendors can delete own courses" ON courses;
CREATE POLICY "Vendors can delete own courses" ON courses FOR DELETE USING (
    EXISTS (SELECT 1 FROM vendors WHERE vendors.id = courses.vendor_id AND vendors.user_id = auth.uid())
);

-- Lessons: everyone can read lessons for active courses
DROP POLICY IF EXISTS "Anyone can view lessons" ON course_lessons;
CREATE POLICY "Anyone can view lessons" ON course_lessons FOR SELECT USING (
    EXISTS (SELECT 1 FROM courses WHERE courses.id = course_lessons.course_id AND courses.status = 'active')
);
-- Lessons: vendors can manage own course lessons
DROP POLICY IF EXISTS "Vendors can manage own course lessons" ON course_lessons;
CREATE POLICY "Vendors can manage own course lessons" ON course_lessons FOR ALL USING (
    EXISTS (SELECT 1 FROM courses JOIN vendors ON vendors.id = courses.vendor_id WHERE courses.id = course_lessons.course_id AND vendors.user_id = auth.uid())
);

-- Enrollments: users can view/insert own enrollments
DROP POLICY IF EXISTS "Users can view own enrollments" ON enrollments;
CREATE POLICY "Users can view own enrollments" ON enrollments FOR SELECT USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can enroll in courses" ON enrollments;
CREATE POLICY "Users can enroll in courses" ON enrollments FOR INSERT WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can update own enrollment progress" ON enrollments;
CREATE POLICY "Users can update own enrollment progress" ON enrollments FOR UPDATE USING (auth.uid() = user_id);

-- Course reviews: everyone can read
DROP POLICY IF EXISTS "Anyone can view course reviews" ON course_reviews;
CREATE POLICY "Anyone can view course reviews" ON course_reviews FOR SELECT USING (true);
DROP POLICY IF EXISTS "Authenticated users can insert course reviews" ON course_reviews;
CREATE POLICY "Authenticated users can insert course reviews" ON course_reviews FOR INSERT WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can update own course reviews" ON course_reviews;
CREATE POLICY "Users can update own course reviews" ON course_reviews FOR UPDATE USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can delete own course reviews" ON course_reviews;
CREATE POLICY "Users can delete own course reviews" ON course_reviews FOR DELETE USING (auth.uid() = user_id);

-- Triggers
DROP TRIGGER IF EXISTS update_courses_updated_at ON courses;
CREATE TRIGGER update_courses_updated_at BEFORE UPDATE ON courses FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Seed default categories
INSERT INTO categories (name, slug, icon, description) VALUES
    ('AI & Machine Learning', 'ai-ml', 'Brain', 'AI tools, models, and ML solutions'),
    ('Cloud Services', 'cloud', 'Cloud', 'Cloud hosting, storage, and infrastructure'),
    ('Cybersecurity', 'cybersecurity', 'Shield', 'Security tools and consulting'),
    ('Drone Technology', 'drones', 'Plane', 'Drone hardware, software, and accessories'),
    ('Agriculture Tech', 'agri-tech', 'Leaf', 'Smart farming and agricultural solutions'),
    ('Data Analytics', 'analytics', 'BarChart3', 'Data analysis and visualization tools'),
    ('Mobile Development', 'mobile', 'Smartphone', 'Mobile apps and tools'),
    ('Software Tools', 'software', 'Code', 'Development tools and utilities'),
    ('Hardware', 'hardware', 'Cpu', 'Physical hardware and devices'),
    ('Consulting', 'consulting', 'Users', 'Professional services and consulting'),
    ('Courses & Training', 'courses', 'GraduationCap', 'Online courses, certifications, and training programs')
ON CONFLICT (slug) DO NOTHING;
