/*
  # Add notifications and location tracking

  1. New Tables
    - `notifications` - Stores user notifications
    - `driver_locations` - Tracks real-time driver locations
  
  2. Functions
    - `notify_on_arrival` - Checks if driver is within 50m radius
    - `update_driver_location` - Updates driver location and triggers notifications
*/

-- Create notifications table
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  type TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  data JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create driver locations table
CREATE TABLE driver_locations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  driver_id UUID NOT NULL REFERENCES users(id),
  order_id UUID REFERENCES orders(id),
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Add indexes
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_driver_locations_driver_id ON driver_locations(driver_id);
CREATE INDEX idx_driver_locations_order_id ON driver_locations(order_id);

-- Enable RLS
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE driver_locations ENABLE ROW LEVEL SECURITY;

-- Add RLS policies
CREATE POLICY "Users can read their own notifications"
  ON notifications
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Drivers can update their location"
  ON driver_locations
  FOR ALL
  TO authenticated
  USING (auth.uid() = driver_id)
  WITH CHECK (auth.uid() = driver_id);

-- Function to check if driver is within 50m radius
CREATE OR REPLACE FUNCTION notify_on_arrival(
  driver_lat DECIMAL,
  driver_lng DECIMAL,
  destination_lat DECIMAL,
  destination_lng DECIMAL,
  threshold_meters INTEGER DEFAULT 50
) RETURNS BOOLEAN AS $$
DECLARE
  distance_meters DECIMAL;
BEGIN
  -- Convert coordinates to radians
  driver_lat := radians(driver_lat);
  driver_lng := radians(driver_lng);
  destination_lat := radians(destination_lat);
  destination_lng := radians(destination_lng);
  
  -- Calculate distance using Haversine formula
  distance_meters := 2 * 6371000 * asin(sqrt(
    power(sin((destination_lat - driver_lat)/2), 2) +
    cos(driver_lat) * cos(destination_lat) *
    power(sin((destination_lng - driver_lng)/2), 2)
  ));
  
  RETURN distance_meters <= threshold_meters;
END;
$$ LANGUAGE plpgsql;