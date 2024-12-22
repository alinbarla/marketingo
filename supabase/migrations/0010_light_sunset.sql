/*
  # Add phone number to users

  1. Changes
    - Add phone_number column to users table
    - Add unique constraint and index for phone lookups
*/

-- Add phone number column
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS phone_number TEXT;

-- Add unique constraint
ALTER TABLE users 
ADD CONSTRAINT users_phone_number_unique UNIQUE (phone_number);

-- Add index for phone lookups
CREATE INDEX IF NOT EXISTS users_phone_number_idx ON users (phone_number);