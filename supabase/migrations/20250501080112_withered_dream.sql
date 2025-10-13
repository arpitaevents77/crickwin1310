/*
  # Add P2P and UPI seller tables

  1. New Tables
    - p2p_sellers: Stores P2P exchange seller information
    - upi_sellers: Stores UPI payment seller information
*/

-- Create p2p_sellers table
CREATE TABLE IF NOT EXISTS p2p_sellers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  wallet_address text NOT NULL,
  balance decimal(10,2) NOT NULL DEFAULT 0,
  rating decimal(2,1) NOT NULL DEFAULT 0,
  accepted_currencies text[] NOT NULL,
  exchange_rates jsonb NOT NULL,
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create upi_sellers table
CREATE TABLE IF NOT EXISTS upi_sellers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  upi_id text NOT NULL,
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE p2p_sellers ENABLE ROW LEVEL SECURITY;
ALTER TABLE upi_sellers ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view active p2p sellers"
  ON p2p_sellers FOR SELECT
  USING (status = 'active');

CREATE POLICY "Anyone can view active upi sellers"
  ON upi_sellers FOR SELECT
  USING (status = 'active');

CREATE POLICY "Only admins can manage p2p sellers"
  ON p2p_sellers
  USING ((auth.jwt() ->> 'role')::text = 'admin')
  WITH CHECK ((auth.jwt() ->> 'role')::text = 'admin');

CREATE POLICY "Only admins can manage upi sellers"
  ON upi_sellers
  USING ((auth.jwt() ->> 'role')::text = 'admin')
  WITH CHECK ((auth.jwt() ->> 'role')::text = 'admin');

-- Insert sample data
INSERT INTO p2p_sellers (name, wallet_address, balance, rating, accepted_currencies, exchange_rates) VALUES
  (
    'John Doe',
    '0x1234567890abcdef1234567890abcdef12345678',
    50000,
    4.8,
    ARRAY['BNB', 'USDT', 'USDC'],
    '{"BNB": 1000, "USDT": 80, "USDC": 80}'
  ),
  (
    'Alice Smith',
    '0xabcdef1234567890abcdef1234567890abcdef12',
    75000,
    4.9,
    ARRAY['BNB', 'USDT'],
    '{"BNB": 1000, "USDT": 80}'
  );

INSERT INTO upi_sellers (name, upi_id) VALUES
  ('Business Account', 'business@upi'),
  ('Support Account', 'support@upi');