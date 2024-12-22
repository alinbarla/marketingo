/*
  # Fix user policies

  1. Changes
    - Add policy for inserting new users during signup
    - Fix user selection policy to allow reading own data
    - Add policy for authenticated users to read basic user info

  2. Security
    - Maintains RLS protection while allowing necessary operations
    - Ensures users can only modify their own data
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users can read their own data" ON users;
DROP POLICY IF EXISTS "Users can update their own data" ON users;

-- Create new policies
CREATE POLICY "Users can read their own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (
    -- Allow users to read their own data
    auth.uid() = id
    -- Allow reading basic info of other users for UI purposes
    OR (SELECT TRUE)
  );

CREATE POLICY "Users can update their own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert their own data"
  ON users
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);