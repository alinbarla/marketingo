/*
  # Add Google Authentication Support
  
  1. Changes
    - Add OAuth provider tracking table
    - Add OAuth account linking table
    - Add necessary indexes
*/

-- Create table to track OAuth providers
CREATE TABLE IF NOT EXISTS oauth_providers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_name TEXT NOT NULL UNIQUE,
  is_enabled BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create table to track OAuth accounts
CREATE TABLE IF NOT EXISTS oauth_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  provider_id UUID NOT NULL REFERENCES oauth_providers(id),
  provider_user_id TEXT NOT NULL,
  access_token TEXT,
  refresh_token TEXT,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(provider_id, provider_user_id)
);

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_oauth_accounts_user_id ON oauth_accounts(user_id);
CREATE INDEX IF NOT EXISTS idx_oauth_accounts_provider_id ON oauth_accounts(provider_id);

-- Enable RLS
ALTER TABLE oauth_providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE oauth_accounts ENABLE ROW LEVEL SECURITY;

-- Add RLS policies
CREATE POLICY "Anyone can read OAuth providers"
  ON oauth_providers
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Only authenticated users can read their OAuth accounts"
  ON oauth_accounts
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Insert Google provider
INSERT INTO oauth_providers (provider_name, is_enabled)
VALUES ('google', true)
ON CONFLICT (provider_name) DO UPDATE
SET is_enabled = true, updated_at = now();