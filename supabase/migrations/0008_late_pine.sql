/*
  # Add online status for motoservices

  1. Schema Changes:
    - Add online_status column to motoservices table
    - Add index for online status lookups
    - Update find_nearest_driver function to consider online status

  2. Changes:
    - Only online drivers can be assigned to services
    - Default status is offline
*/

-- Add online status column
ALTER TABLE motoservices
ADD COLUMN IF NOT EXISTS online_status BOOLEAN DEFAULT false;

-- Add index for online status lookups
CREATE INDEX IF NOT EXISTS idx_motoservices_online_status 
ON motoservices(online_status) 
WHERE online_status = true;

-- Update find_nearest_driver function to consider online status
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
    AND m.online_status = true
    AND m.service_type_id = find_nearest_driver.service_type_id
    AND m.latitude IS NOT NULL 
    AND m.longitude IS NOT NULL
  ORDER BY distance ASC
  LIMIT 1;
END;
$$ LANGUAGE plpgsql;