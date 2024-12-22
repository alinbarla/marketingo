/*
  # Add verification fields and sample data

  1. Schema Changes:
    - Add document_url and verified columns to users table
    - Add index for verified status

  2. Data Added:
    - 10 verified driver users with complete profiles
    - 10 motoservice providers with locations
    - Sample reviews for each service
*/

-- Add new columns to users table
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS document_url TEXT,
ADD COLUMN IF NOT EXISTS verified BOOLEAN DEFAULT false;

-- Add index for verified status
CREATE INDEX IF NOT EXISTS idx_users_verified ON users(verified);

-- Create users in auth.users first
DO $$
DECLARE
  auth_uid UUID;
BEGIN
  -- Create auth users
  FOR i IN 1..10 LOOP
    INSERT INTO auth.users (
      id,
      instance_id,
      email,
      encrypted_password,
      email_confirmed_at,
      created_at,
      updated_at,
      raw_app_meta_data,
      raw_user_meta_data
    ) VALUES (
      gen_random_uuid(),
      '00000000-0000-0000-0000-000000000000',
      'driver' || i || '@example.com',
      '$2a$10$abcdefghijklmnopqrstuvwxyzABCDEF', -- Dummy hashed password
      NOW(),
      NOW(),
      NOW(),
      '{"provider":"email","providers":["email"]}',
      '{}'
    ) RETURNING id INTO auth_uid;

    -- Create application user
    INSERT INTO users (id, role, full_name, email, avatar_url, document_url, verified)
    VALUES (
      auth_uid,
      'motoservice',
      CASE i
        WHEN 1 THEN 'Miguel Rodriguez'
        WHEN 2 THEN 'Ana Martinez'
        WHEN 3 THEN 'Carlos Sanchez'
        WHEN 4 THEN 'Sofia Herrera'
        WHEN 5 THEN 'Diego Torres'
        WHEN 6 THEN 'Isabella Ruiz'
        WHEN 7 THEN 'Lucas Morales'
        WHEN 8 THEN 'Valentina Diaz'
        WHEN 9 THEN 'Mateo Flores'
        WHEN 10 THEN 'Camila Vargas'
      END,
      'driver' || i || '@example.com',
      CASE i
        WHEN 1 THEN 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400'
        WHEN 2 THEN 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400'
        WHEN 3 THEN 'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=400'
        WHEN 4 THEN 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400'
        WHEN 5 THEN 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400'
        WHEN 6 THEN 'https://images.unsplash.com/photo-1614644147798-f8c0fc9da7f6?w=400'
        WHEN 7 THEN 'https://images.unsplash.com/photo-1600486913747-55e5470d6f40?w=400'
        WHEN 8 THEN 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400'
        WHEN 9 THEN 'https://images.unsplash.com/photo-1624224971170-2f84fed5eb5e?w=400'
        WHEN 10 THEN 'https://images.unsplash.com/photo-1619895862022-09114b41f16f?w=400'
      END,
      'documents/license' || i || '.pdf',
      true
    );

    -- Create motoservice for each user
    INSERT INTO motoservices (
      id,
      user_id,
      name,
      description,
      avatar_url,
      rating,
      status,
      hourly_rate,
      reviews_count,
      service_type_id,
      latitude,
      longitude
    )
    VALUES (
      gen_random_uuid(),
      auth_uid,
      CASE i
        WHEN 1 THEN 'Express Delivery Pro'
        WHEN 2 THEN 'Grocery Runner'
        WHEN 3 THEN 'Food Express'
        WHEN 4 THEN 'Swift Parcels'
        WHEN 5 THEN 'Market Runner'
        WHEN 6 THEN 'Foodie Delivery'
        WHEN 7 THEN 'Package Pro'
        WHEN 8 THEN 'Grocery Express'
        WHEN 9 THEN 'Food Runner'
        WHEN 10 THEN 'Swift Delivery'
      END,
      CASE i % 3
        WHEN 0 THEN 'Fast and reliable package delivery service'
        WHEN 1 THEN 'Professional grocery shopping and delivery'
        WHEN 2 THEN 'Hot food delivery specialist'
      END,
      CASE i
        WHEN 1 THEN 'https://images.unsplash.com/photo-1617650728468-8581e439c864?w=800'
        WHEN 2 THEN 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=800'
        WHEN 3 THEN 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800'
        WHEN 4 THEN 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800'
        WHEN 5 THEN 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800'
        WHEN 6 THEN 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800'
        WHEN 7 THEN 'https://images.unsplash.com/photo-1568254183919-78a4f43a2877?w=800'
        WHEN 8 THEN 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800'
        WHEN 9 THEN 'https://images.unsplash.com/photo-1576866209830-589e1bfbaa4d?w=800'
        WHEN 10 THEN 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=800'
      END,
      4.5 + random() * 0.5,
      'available',
      50 + (i * 5),
      100 + (i * 10),
      (
        SELECT id FROM service_types 
        WHERE name = CASE i % 3
          WHEN 0 THEN 'Package Delivery'
          WHEN 1 THEN 'Grocery Shopping'
          WHEN 2 THEN 'Food Delivery'
        END
        LIMIT 1
      ),
      19.4326 + (i * 0.001),
      -99.1332 + (i * 0.001)
    );
  END LOOP;
END $$;

-- Add sample reviews
DO $$
DECLARE
  user_id UUID;
  motoservice_id UUID;
  order_id UUID;
BEGIN
  -- Create a sample user if none exists
  INSERT INTO auth.users (
    id,
    instance_id,
    email,
    encrypted_password,
    email_confirmed_at,
    created_at,
    updated_at,
    raw_app_meta_data,
    raw_user_meta_data
  ) VALUES (
    gen_random_uuid(),
    '00000000-0000-0000-0000-000000000000',
    'customer@example.com',
    '$2a$10$abcdefghijklmnopqrstuvwxyzABCDEF',
    NOW(),
    NOW(),
    NOW(),
    '{"provider":"email","providers":["email"]}',
    '{}'
  ) RETURNING id INTO user_id;

  INSERT INTO users (id, role, full_name, email, verified)
  VALUES (user_id, 'user', 'Sample Customer', 'customer@example.com', true);

  -- Create reviews for each motoservice
  FOR motoservice_id IN SELECT id FROM motoservices LOOP
    -- Create a sample order
    INSERT INTO orders (id, user_id, motoservice_id, status, pickup_location, dropoff_location, amount)
    VALUES (gen_random_uuid(), user_id, motoservice_id, 'completed', 'Sample Pickup', 'Sample Dropoff', 50)
    RETURNING id INTO order_id;

    -- Add reviews
    FOR i IN 1..5 LOOP
      INSERT INTO reviews (order_id, user_id, motoservice_id, rating, comment, created_at)
      VALUES (
        order_id,
        user_id,
        motoservice_id,
        floor(random() * 2 + 4),
        CASE floor(random() * 3)
          WHEN 0 THEN 'Excellent service, very professional!'
          WHEN 1 THEN 'Great delivery, on time and friendly.'
          ELSE 'Very satisfied with the service.'
        END,
        NOW() - (random() * interval '30 days')
      );
    END LOOP;
  END LOOP;
END $$;