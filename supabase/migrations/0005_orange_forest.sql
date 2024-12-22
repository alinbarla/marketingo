/*
  # Add sample motoservices data

  1. New Data
    - Add sample motoservices with realistic data
    - Include variety of services with different prices and ratings
*/

-- Insert sample motoservices
INSERT INTO motoservices (id, user_id, name, description, avatar_url, rating, status, hourly_rate, reviews_count)
VALUES
  (
    'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    (SELECT id FROM users LIMIT 1),
    'Quick Fix Motorcycles',
    'Professional motorcycle repair and maintenance service. Specializing in emergency repairs and routine maintenance.',
    'https://images.unsplash.com/photo-1558981285-6f0c94958bb6?auto=format&fit=crop&q=80&w=800',
    4.8,
    'available',
    75.00,
    24
  ),
  (
    'a68e0c2d-f3b1-4f2e-b45d-91238a1c6f80',
    (SELECT id FROM users LIMIT 1),
    'Elite Motorcycle Detailing',
    'Premium motorcycle detailing service. We make your bike shine like new with our professional cleaning and polishing services.',
    'https://images.unsplash.com/photo-1615172282427-9a57ef2d142e?auto=format&fit=crop&q=80&w=800',
    4.9,
    'available',
    95.00,
    18
  ),
  (
    'b79f2d3e-c4a2-4d3f-a678-123456789abc',
    (SELECT id FROM users LIMIT 1),
    'Mobile Tire Masters',
    'Specialized in motorcycle tire replacement and repair. We come to you for all your tire needs.',
    'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&q=80&w=800',
    4.7,
    'available',
    65.00,
    32
  );