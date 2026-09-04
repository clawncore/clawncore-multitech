-- Update product images with better, more specific photos
-- Run this in Supabase SQL Editor

UPDATE store_products SET images = ARRAY['https://images.unsplash.com/photo-1724355574973-1c06f4e6c918?auto=format&fit=crop&w=600&q=80'] WHERE name = 'Scout Pro 200';

UPDATE store_products SET images = ARRAY['https://images.unsplash.com/photo-1437252611977-07f74518abd7?auto=format&fit=crop&w=600&q=80'] WHERE name = 'ClawnSeed Pro Wheat';

-- These products already have good images, no update needed:
-- ClawnAgri X4 Drone (drone in field) ✓
-- ClawnAgri Mini Sprayer (drone spraying) ✓
-- ClawnAgri Heavy Lift (drone on ground) ✓
-- Hybrid Rice Paddy Seeds (rice paddy) ✓
-- Organic Tomato Seeds Pack (tomato seeds tray) ✓
-- ClawnSeed Corn F1 Hybrid (corn cob) ✓
-- Sunflower Seeds (sunflower field) ✓
-- ClawnGrow NPK (garden tools/soil) ✓
-- Organic Compost (soil/plant) ✓
-- Micronutrient Mix (farmland) ✓
-- Slow-Release Urea (green field) ✓
-- Bio-Stimulant Root Plus (green plants) ✓
-- SoilSense Pro 3000 (soil sensor) ✓
-- WeatherStation Agri (weather station) ✓
-- NDVI Crop Health Sensor (sensor device) ✓
-- Water Flow Meter (irrigation pipes) ✓
-- ClawnTill 500 Rotavator (tractor/field) ✓
-- Smart Irrigation Controller (garden) ✓
-- Seed Drill Manual (wheat field) ✓
-- Harvest Pro Conveyor (farming equipment) ✓
-- Drip Irrigation Kit (drip system) ✓
-- Sprinkler System (sprinklers) ✓
-- Submersible Pump Solar (solar panel) ✓
-- Water Tank (water pipes) ✓
