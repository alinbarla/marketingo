/*
  # Fix user table RLS policies

  1. Changes
    - Drop and recreate user policies with proper permissions
    - Add policy for initial user creation after signup
    - Ensure proper access control while maintaining security

  2. Security
    - Maintain row-level security
    - Allow authenticated users to create their initial profile
    - Restrict updates to own data only
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users can read their own data" ON users;
DROP POLICY IF EXISTS "Users can update their own data" ON users;
DROP POLICY IF EXISTS "Users can insert their own data" ON users;

-- Create new policies with proper permissions
CREATE POLICY "Users can read any user data"
  ON users
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create their initial profile"
  ON users
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);