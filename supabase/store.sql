-- ClawnCore Agri Store Schema for Supabase
-- Run this in the Supabase SQL Editor

-- Store products (curated agricultural catalog)
CREATE TABLE IF NOT EXISTS store_products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT DEFAULT '',
    price NUMERIC(10,2) NOT NULL CHECK (price >= 0),
    compare_price NUMERIC(10,2),
    images TEXT[] DEFAULT '{}',
    category TEXT NOT NULL,
    subcategory TEXT DEFAULT '',
    stock INTEGER DEFAULT 0 CHECK (stock >= 0),
    featured BOOLEAN DEFAULT false,
    rating NUMERIC(3,2) DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
    review_count INTEGER DEFAULT 0,
    tags TEXT[] DEFAULT '{}',
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'draft', 'archived')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Store orders
CREATE TABLE IF NOT EXISTS store_orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    items JSONB NOT NULL,
    subtotal NUMERIC(10,2) NOT NULL CHECK (subtotal >= 0),
    shipping_cost NUMERIC(10,2) DEFAULT 0,
    tax NUMERIC(10,2) DEFAULT 0,
    total NUMERIC(10,2) NOT NULL CHECK (total >= 0),
    shipping JSONB NOT NULL,
    payment_method TEXT DEFAULT 'cod',
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS
ALTER TABLE store_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE store_orders ENABLE ROW LEVEL SECURITY;

-- Products: anyone can read active
DROP POLICY IF EXISTS "Anyone can view store products" ON store_products;
CREATE POLICY "Anyone can view store products" ON store_products FOR SELECT USING (status = 'active');

-- Orders: users read own orders
DROP POLICY IF EXISTS "Users can view own store orders" ON store_orders;
CREATE POLICY "Users can view own store orders" ON store_orders FOR SELECT USING (auth.uid() = user_id);

-- Orders: authenticated users can insert
DROP POLICY IF EXISTS "Authenticated users can place store orders" ON store_orders;
CREATE POLICY "Authenticated users can place store orders" ON store_orders FOR INSERT WITH CHECK (auth.uid() = user_id);

-- updated_at trigger
DROP TRIGGER IF EXISTS update_store_products_updated_at ON store_products;
CREATE TRIGGER update_store_products_updated_at BEFORE UPDATE ON store_products FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Seed agricultural products
INSERT INTO store_products (name, description, price, compare_price, images, category, subcategory, stock, featured, rating, review_count, tags) VALUES

-- Drones
('ClawnAgri X4 Drone', 'Professional agricultural drone with multispectral camera, 45-min flight time, and AI crop analysis. Covers 50 acres per flight.', 4999.00, 5999.00, ARRAY['https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=600&q=80'], 'drones', 'mapping', 15, true, 4.80, 234, ARRAY['drone', 'multispectral', 'AI', 'mapping']),
('ClawnAgri Mini Sprayer', 'Compact drone sprayer for targeted pesticide and fertilizer application. 10L tank, GPS-guided precision.', 2499.00, 2999.00, ARRAY['https://images.unsplash.com/photo-1579829366248-204fe8413f31?auto=format&fit=crop&w=600&q=80'], 'drones', 'spraying', 22, true, 4.60, 189, ARRAY['drone', 'sprayer', 'precision']),
('Scout Pro 200', 'Lightweight scouting drone for crop monitoring. Real-time video feed, thermal imaging, 30-min flight.', 1899.00, NULL, ARRAY['https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=600&q=80'], 'drones', 'scouting', 30, false, 4.50, 156, ARRAY['drone', 'scouting', 'thermal']),
('ClawnAgri Heavy Lift', 'Industrial drone for heavy payload delivery. 20kg capacity, 60-min flight, autonomous navigation.', 7999.00, 9499.00, ARRAY['https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=600&q=80'], 'drones', 'delivery', 8, true, 4.90, 98, ARRAY['drone', 'heavy-lift', 'autonomous']),

-- Seeds
('ClawnSeed Pro Wheat', 'High-yield dwarf wheat variety. Disease-resistant, drought-tolerant. 15% above average yield. 10kg bag.', 89.00, 109.00, ARRAY['https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80'], 'seeds', 'grains', 500, true, 4.70, 412, ARRAY['wheat', 'high-yield', 'drought-resistant']),
('Hybrid Rice Paddy Seeds', 'Premium hybrid rice seeds. 20% more yield than traditional varieties. Suitable for wet and dry cultivation.', 120.00, NULL, ARRAY['https://images.unsplash.com/photo-1536304993881-460e32c1e1e8?auto=format&fit=crop&w=600&q=80'], 'seeds', 'grains', 400, false, 4.50, 298, ARRAY['rice', 'hybrid', 'high-yield']),
('Organic Tomato Seeds Pack', 'Heirloom organic tomato seeds. 5 varieties: Roma, Cherry, Beefsteak, Early Girl, Celebrity. 500+ seeds total.', 29.00, 39.00, ARRAY['https://images.unsplash.com/photo-1592921870789-04563d55041c?auto=format&fit=crop&w=600&q=80'], 'seeds', 'vegetables', 800, false, 4.40, 567, ARRAY['tomato', 'organic', 'heirloom']),
('ClawnSeed Corn F1 Hybrid', 'Fast-growing sweet corn hybrid. Ready to harvest in 60 days. High sugar content, excellent taste.', 65.00, 75.00, ARRAY['https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=600&q=80'], 'seeds', 'grains', 350, false, 4.30, 234, ARRAY['corn', 'hybrid', 'fast-growing']),
('Sunflower Seeds (Oil Variety)', 'High-oil content sunflower seeds for commercial oil production. 5kg bag, 40%+ oil content.', 45.00, NULL, ARRAY['https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=600&q=80'], 'seeds', 'oilseeds', 250, false, 4.20, 178, ARRAY['sunflower', 'oil', 'commercial']),

-- Fertilizers
('ClawnGrow NPK 20-20-20', 'Balanced NPK fertilizer for all crops. Water-soluble, fast-absorbing. 25kg bag.', 79.00, 95.00, ARRAY['https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=600&q=80'], 'fertilizers', 'npk', 600, true, 4.60, 345, ARRAY['NPK', 'balanced', 'water-soluble']),
('Organic Compost Premium', 'Rich organic compost made from plant-based materials. Improves soil structure and microbial activity. 50kg bag.', 35.00, NULL, ARRAY['https://images.unsplash.com/photo-1585336261022-680e295ce3fe?auto=format&fit=crop&w=600&q=80'], 'fertilizers', 'organic', 450, false, 4.40, 289, ARRAY['organic', 'compost', 'soil']),
('Micronutrient Mix ZMB', 'Zinc, Manganese, Boron micronutrient blend. Corrects deficiencies in cereals and pulses. 5kg box.', 55.00, 65.00, ARRAY['https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=600&q=80'], 'fertilizers', 'micronutrient', 300, false, 4.30, 167, ARRAY['micronutrient', 'zinc', 'manganese']),
('Slow-Release Urea Granules', 'Coated urea for sustained nitrogen release over 60-90 days. Reduces leaching by 40%. 50kg bag.', 68.00, NULL, ARRAY['https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=600&q=80'], 'fertilizers', 'nitrogen', 380, false, 4.10, 201, ARRAY['urea', 'slow-release', 'nitrogen']),
('Bio-Stimulant Root Plus', 'Seaweed-based bio-stimulant that promotes root growth and nutrient uptake. 5L bottle.', 42.00, 52.00, ARRAY['https://images.unsplash.com/photo-1592150621744-aca64f48394a?auto=format&fit=crop&w=600&q=80'], 'fertilizers', 'biostimulant', 200, false, 4.50, 134, ARRAY['bio-stimulant', 'seaweed', 'root-growth']),

-- Sensors
('SoilSense Pro 3000', 'Wireless soil moisture, temperature, and EC sensor. LoRa connectivity, solar-powered, 2km range.', 349.00, 429.00, ARRAY['https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=600&q=80'], 'sensors', 'soil', 120, true, 4.70, 278, ARRAY['sensor', 'soil', 'wireless', 'solar']),
('WeatherStation Agri', 'Complete weather station: wind speed/direction, rainfall, humidity, UV index, barometric pressure. App-connected.', 599.00, 699.00, ARRAY['https://images.unsplash.com/photo-1504297050568-910d24c426d3?auto=format&fit=crop&w=600&q=80'], 'sensors', 'weather', 45, true, 4.80, 189, ARRAY['weather', 'station', 'connected']),
('NDVI Crop Health Sensor', 'Multispectral sensor for NDVI crop health analysis. Mounts on any drone. Real-time vegetation index.', 1299.00, NULL, ARRAY['https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80'], 'sensors', 'spectral', 25, false, 4.60, 98, ARRAY['NDVI', 'multispectral', 'crop-health']),
('Water Flow Meter Digital', 'Digital water flow meter for irrigation management. 1-6 inch pipe compatibility, IoT-ready.', 189.00, 229.00, ARRAY['https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=600&q=80'], 'sensors', 'water', 90, false, 4.30, 145, ARRAY['water', 'flow-meter', 'irrigation']),

-- Equipment
('ClawnTill 500 Rotavator', 'Heavy-duty rotavator for soil preparation. 50cm working width, adjustable depth, PTO-driven.', 1899.00, 2299.00, ARRAY['https://images.unsplash.com/photo-1530267981375-f0de937f5f13?auto=format&fit=crop&w=600&q=80'], 'equipment', 'tillage', 18, true, 4.50, 112, ARRAY['rotavator', 'tillage', 'PTO']),
('Smart Irrigation Controller', 'WiFi-enabled irrigation controller. 16 zones, weather-adaptive scheduling, mobile app control.', 299.00, 379.00, ARRAY['https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=600&q=80'], 'equipment', 'irrigation', 65, false, 4.40, 234, ARRAY['irrigation', 'smart', 'wifi', 'controller']),
('Seed Drill Manual 6-Row', 'Manual seed drill for small to medium farms. 6-row, adjustable spacing, seed rate control.', 449.00, NULL, ARRAY['https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80'], 'equipment', 'planting', 35, false, 4.20, 87, ARRAY['seed-drill', 'manual', 'planting']),
('Harvest Pro Conveyor Belt', 'Portable conveyor belt for crop loading. 8m length, adjustable height, 500kg capacity.', 1199.00, 1399.00, ARRAY['https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=600&q=80'], 'equipment', 'harvesting', 12, false, 4.10, 56, ARRAY['conveyor', 'harvesting', 'portable']),

-- Irrigation
('Drip Irrigation Kit 1 Acre', 'Complete drip irrigation system for 1 acre. Includes mainline, laterals, drippers, filters, and fittings.', 599.00, 749.00, ARRAY['https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&w=600&q=80'], 'irrigation', 'drip', 40, true, 4.70, 312, ARRAY['drip', 'irrigation', 'complete-kit']),
('Sprinkler System Industrial', 'Impact sprinkler system for large-area coverage. 30m radius, adjustable arc, brass construction.', 189.00, NULL, ARRAY['https://images.unsplash.com/photo-1501004318855-fce2ee0ce7e2?auto=format&fit=crop&w=600&q=80'], 'irrigation', 'sprinkler', 75, false, 4.30, 178, ARRAY['sprinkler', 'impact', 'industrial']),
('Submersible Pump Solar 5HP', 'Solar-powered submersible pump. 5HP, 100m head, 10,000L/hr. No electricity needed.', 1499.00, 1799.00, ARRAY['https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=600&q=80'], 'irrigation', 'pumps', 20, true, 4.60, 198, ARRAY['pump', 'solar', 'submersible']),
('Water Tank 5000L Heavy Duty', 'UV-stabilized polyethylene water storage tank. 5000L capacity, food-grade, 10-year warranty.', 349.00, NULL, ARRAY['https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=600&q=80'], 'irrigation', 'storage', 55, false, 4.40, 267, ARRAY['tank', 'storage', 'water']);

-- Update timestamps trigger
DROP TRIGGER IF EXISTS update_store_products_updated_at ON store_products;
CREATE TRIGGER update_store_products_updated_at BEFORE UPDATE ON store_products FOR EACH ROW EXECUTE FUNCTION update_updated_at();
