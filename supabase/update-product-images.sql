-- Update drone products with agricultural spraying drone images
-- Run this in Supabase SQL Editor

-- ClawnAgri X4 Drone (mapping) - drone spraying crops in field
UPDATE store_products SET images = ARRAY['https://images.unsplash.com/photo-1713952160156-bb59cac789a9?auto=format&fit=crop&w=600&q=80'] WHERE name = 'ClawnAgri X4 Drone';

-- ClawnAgri Mini Sprayer - engineer controlling spraying drone
UPDATE store_products SET images = ARRAY['https://images.unsplash.com/photo-1713952152768-5f28b8093166?auto=format&fit=crop&w=600&q=80'] WHERE name = 'ClawnAgri Mini Sprayer';

-- Scout Pro 200 - drone spraying crops
UPDATE store_products SET images = ARRAY['https://images.unsplash.com/photo-1713952160156-bb59cac789a9?auto=format&fit=crop&w=600&q=80'] WHERE name = 'Scout Pro 200';

-- ClawnAgri Heavy Lift - engineer controlling spraying drone
UPDATE store_products SET images = ARRAY['https://images.unsplash.com/photo-1713952152768-5f28b8093166?auto=format&fit=crop&w=600&q=80'] WHERE name = 'ClawnAgri Heavy Lift';
