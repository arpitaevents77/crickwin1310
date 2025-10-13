/*
  # Add Game Scores

  1. Changes
    - Add score fields to games table
    - Add indexes for better query performance
*/

-- Add score columns to games table
ALTER TABLE games
ADD COLUMN IF NOT EXISTS teama_score integer DEFAULT NULL,
ADD COLUMN IF NOT EXISTS teamb_score integer DEFAULT NULL,
ADD COLUMN IF NOT EXISTS team_score integer DEFAULT NULL;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_games_winning_team ON games(winning_team);
CREATE INDEX IF NOT EXISTS idx_games_teama_score ON games(teama_score);
CREATE INDEX IF NOT EXISTS idx_games_teamb_score ON games(teamb_score);
CREATE INDEX IF NOT EXISTS idx_games_team_score ON games(team_score);