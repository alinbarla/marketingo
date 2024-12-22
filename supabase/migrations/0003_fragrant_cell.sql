/*
  # Add email column to users table

  1. Changes
    - Add email column to users table
    - Make email column required and unique
    - Add index on email column for faster lookups

  2. Security
    - Maintains existing RLS policies
*/

-- Add email column to users table
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS email TEXT NOT NULL;

-- Add unique constraint to email
ALTER TABLE users 
ADD CONSTRAINT users_email_unique UNIQUE (email);

-- Add index for email lookups
CREATE INDEX IF NOT EXISTS users_email_idx ON users (email);