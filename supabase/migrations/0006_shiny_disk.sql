/*
  # Add location and service types

  1. New Tables
    - `service_types`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `icon` (text)
  
  2. Changes
    - Add location columns to motoservices
    - Add service type reference to motoservices
    - Add functions for distance calculations
*/

-- Create service types table
CREATE TABLE service_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL
);

-- Add location columns to motoservices
ALTER TABLE motoservices
ADD COLUMN IF NOT EXISTS latitude DECIMAL(10, 8),
ADD COLUMN IF NOT EXISTS longitude DECIMAL(11, 8),
ADD COLUMN IF NOT EXISTS service_type_id UUID REFERENCES service_types(id);

-- Create index for location-based queries
CREATE INDEX IF NOT EXISTS idx_motoservices_location 
ON motoservices (latitude, longitude)
WHERE latitude IS NOT NULL AND longitude IS NOT NULL;

-- Enable RLS
ALTER TABLE service_types ENABLE ROW LEVEL SECURITY;

-- Service types policies
CREATE POLICY "Anyone can read service types"
  ON service_types
  FOR SELECT
  TO authenticated
  USING (true);

-- Insert initial service types
INSERT INTO service_types (name, description, icon) VALUES
  (
    'Package Delivery',
    'Fast and secure delivery of packages and documents',
    'package'
  ),
  (
    'Grocery Shopping',
    'Shopping and delivery of groceries',
    'shopping-cart'
  ),
  (
    'Food Delivery',
    'Hot food delivery from restaurants',
    'utensils'
  );

-- Function to calculate distance in kilometers using the Haversine formula
CREATE OR REPLACE FUNCTION calculate_distance(
  lat1 DECIMAL,
  lon1 DECIMAL,
  lat2 DECIMAL,
  lon2 DECIMAL
) RETURNS DECIMAL AS $$
DECLARE
  R DECIMAL := 6371; -- Earth's radius in kilometers
  dlat DECIMAL;
  dlon DECIMAL;
  a DECIMAL;
  c DECIMAL;
BEGIN
  -- Convert latitude and longitude to radians
  dlat := radians(lat2 - lat1);
  dlon := radians(lon2 - lon1);
  lat1 := radians(lat1);
  lat2 := radians(lat2);

  -- Haversine formula
  a := (sin(dlat/2))^2 + cos(lat1) * cos(lat2) * (sin(dlon/2))^2;
  c := 2 * asin(sqrt(a));
  
  RETURN R * c;
END;
$$ LANGUAGE plpgsql;

-- Function to find nearest available driver
CREATE OR REPLACE FUNCTION find_nearest_driver(
  pickup_lat DECIMAL,
  pickup_lng DECIMAL,
  service_type_id UUID
) RETURNS TABLE (
  id UUID,
  distance DECIMAL,
  eta INTEGER,
  name TEXT,
  avatar_url TEXT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    m.id,
    calculate_distance(pickup_lat, pickup_lng, m.latitude, m.longitude) as distance,
    CEIL(calculate_distance(pickup_lat, pickup_lng, m.latitude, m.longitude) / 30 * 60)::INTEGER as eta,
    m.name,
    m.avatar_url
  FROM motoservices m
  WHERE m.status = 'available'
    AND m.service_type_id = find_nearest_driver.service_type_id
    AND m.latitude IS NOT NULL 
    AND m.longitude IS NOT NULL
  ORDER BY distance ASC
  LIMIT 1;
END;
$$ LANGUAGE plpgsql;