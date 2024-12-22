/*
  # Initial Schema Setup for Motoservice App

  1. Tables
    - users (extends auth.users)
      - role selection
      - profile information
    - motoservices
      - service provider details
      - availability status
    - orders
      - service requests
      - locations
      - payment info
    - reviews
      - ratings and feedback
    - messages
      - chat functionality
      - payment requests

  2. Security
    - RLS policies for all tables
    - Secure access patterns
*/

-- Create custom types
CREATE TYPE user_role AS ENUM ('user', 'motoservice');
CREATE TYPE order_status AS ENUM ('pending', 'accepted', 'in_progress', 'completed');
CREATE TYPE message_type AS ENUM ('text', 'payment_request');

-- Create users table extending auth.users
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role user_role NOT NULL,
  full_name TEXT NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Create motoservices table
CREATE TABLE motoservices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  avatar_url TEXT NOT NULL,
  rating DECIMAL(3,2) DEFAULT 0 NOT NULL,
  status TEXT DEFAULT 'available' NOT NULL,
  hourly_rate DECIMAL(10,2) NOT NULL,
  reviews_count INTEGER DEFAULT 0 NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  CONSTRAINT status_check CHECK (status IN ('available', 'busy'))
);

-- Create orders table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  motoservice_id UUID NOT NULL REFERENCES motoservices(id),
  status order_status DEFAULT 'pending' NOT NULL,
  pickup_location TEXT NOT NULL,
  dropoff_location TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  completed_at TIMESTAMPTZ,
  CONSTRAINT positive_amount CHECK (amount > 0)
);

-- Create reviews table
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id),
  motoservice_id UUID NOT NULL REFERENCES motoservices(id),
  rating INTEGER NOT NULL,
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  CONSTRAINT rating_range CHECK (rating >= 1 AND rating <= 5)
);

-- Create messages table
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES users(id),
  content TEXT NOT NULL,
  type message_type DEFAULT 'text' NOT NULL,
  amount DECIMAL(10,2),
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE motoservices ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can read their own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Motoservices policies
CREATE POLICY "Anyone can read motoservices"
  ON motoservices
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Motoservice providers can update their own service"
  ON motoservices
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Orders policies
CREATE POLICY "Users can read their own orders"
  ON orders
  FOR SELECT
  TO authenticated
  USING (
    auth.uid() = user_id OR 
    auth.uid() IN (
      SELECT user_id FROM motoservices WHERE id = motoservice_id
    )
  );

CREATE POLICY "Users can create orders"
  ON orders
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Involved parties can update orders"
  ON orders
  FOR UPDATE
  TO authenticated
  USING (
    auth.uid() = user_id OR 
    auth.uid() IN (
      SELECT user_id FROM motoservices WHERE id = motoservice_id
    )
  );

-- Reviews policies
CREATE POLICY "Anyone can read reviews"
  ON reviews
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create reviews for completed orders"
  ON reviews
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = user_id AND
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_id
      AND orders.status = 'completed'
      AND orders.user_id = auth.uid()
    )
  );

-- Messages policies
CREATE POLICY "Involved parties can read messages"
  ON messages
  FOR SELECT
  TO authenticated
  USING (
    auth.uid() IN (
      SELECT user_id FROM orders WHERE id = order_id
      UNION
      SELECT user_id FROM motoservices 
      WHERE id = (SELECT motoservice_id FROM orders WHERE id = order_id)
    )
  );

CREATE POLICY "Involved parties can create messages"
  ON messages
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() IN (
      SELECT user_id FROM orders WHERE id = order_id
      UNION
      SELECT user_id FROM motoservices 
      WHERE id = (SELECT motoservice_id FROM orders WHERE id = order_id)
    )
  );