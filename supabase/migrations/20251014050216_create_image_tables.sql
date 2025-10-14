/*
  # Create Image Tables for UI Elements

  1. New Tables
    - `sign_in_image`
      - `id` (uuid, primary key)
      - `image_url` (text) - URL for the sign-in page image
      - `is_active` (boolean) - Whether this image is currently active
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `hero_image`
      - `id` (uuid, primary key)
      - `image_url` (text) - URL for the hero section image
      - `title` (text) - Optional title for the hero section
      - `subtitle` (text) - Optional subtitle for the hero section
      - `is_active` (boolean) - Whether this image is currently active
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Allow public read access (for displaying images)
    - Restrict write access to authenticated admin users (using JWT role check)

  3. Initial Data
    - Insert default images for both tables
*/

-- Create sign_in_image table
CREATE TABLE IF NOT EXISTS sign_in_image (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url text NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create hero_image table
CREATE TABLE IF NOT EXISTS hero_image (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url text NOT NULL,
  title text,
  subtitle text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE sign_in_image ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_image ENABLE ROW LEVEL SECURITY;

-- Policies for sign_in_image
CREATE POLICY "Anyone can view sign-in images"
  ON sign_in_image FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Only admins can insert sign-in images"
  ON sign_in_image FOR INSERT
  TO authenticated
  WITH CHECK ((auth.jwt() ->> 'role')::text = 'admin');

CREATE POLICY "Only admins can update sign-in images"
  ON sign_in_image FOR UPDATE
  TO authenticated
  USING ((auth.jwt() ->> 'role')::text = 'admin')
  WITH CHECK ((auth.jwt() ->> 'role')::text = 'admin');

CREATE POLICY "Only admins can delete sign-in images"
  ON sign_in_image FOR DELETE
  TO authenticated
  USING ((auth.jwt() ->> 'role')::text = 'admin');

-- Policies for hero_image
CREATE POLICY "Anyone can view hero images"
  ON hero_image FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Only admins can insert hero images"
  ON hero_image FOR INSERT
  TO authenticated
  WITH CHECK ((auth.jwt() ->> 'role')::text = 'admin');

CREATE POLICY "Only admins can update hero images"
  ON hero_image FOR UPDATE
  TO authenticated
  USING ((auth.jwt() ->> 'role')::text = 'admin')
  WITH CHECK ((auth.jwt() ->> 'role')::text = 'admin');

CREATE POLICY "Only admins can delete hero images"
  ON hero_image FOR DELETE
  TO authenticated
  USING ((auth.jwt() ->> 'role')::text = 'admin');

-- Insert default images
INSERT INTO sign_in_image (image_url, is_active)
VALUES ('https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&h=1000&fit=crop', true);

INSERT INTO hero_image (image_url, title, subtitle, is_active)
VALUES (
  'https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?w=1200&h=800&fit=crop',
  'Welcome to Cricket Betting',
  'Experience the thrill of live cricket betting',
  true
);