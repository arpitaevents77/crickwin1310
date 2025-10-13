/*
  # Add profile picture URL to users table

  1. Changes
    - Add profile_picture_url column to users table
*/

-- Add profile picture URL column to users table
ALTER TABLE users
ADD COLUMN IF NOT EXISTS profile_picture_url text DEFAULT NULL;

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_users_profile_picture ON users(profile_picture_url);