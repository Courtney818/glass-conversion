/*
  # Add custom TikTok handle support

  1. New Tables
    - Add `custom_tiktok_handle` column to existing users table
    - This allows users to set a custom handle different from their OAuth handle

  2. Security
    - Column is nullable (users may not set a custom handle)
    - Users can update their own handle via RLS policies

  3. Changes
    - Add custom_tiktok_handle column to users table
    - Update RLS policies to allow users to update their own profile
*/

-- Add custom_tiktok_handle column to users table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'users' AND column_name = 'custom_tiktok_handle'
  ) THEN
    ALTER TABLE users ADD COLUMN custom_tiktok_handle text;
  END IF;
END $$;

-- Create or update RLS policy for users to update their own profile
DROP POLICY IF EXISTS "Users can update own profile" ON users;

CREATE POLICY "Users can update own profile"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Create or update RLS policy for users to read their own profile
DROP POLICY IF EXISTS "Users can read own profile" ON users;

CREATE POLICY "Users can read own profile"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);