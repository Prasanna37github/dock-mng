-- Update Files Table for Simplified Upload
-- Run this in your Supabase SQL Editor

-- Add file_size column to files table
ALTER TABLE files 
ADD COLUMN IF NOT EXISTS file_size BIGINT;

-- Add uploaded_at column if it doesn't exist
ALTER TABLE files 
ADD COLUMN IF NOT EXISTS uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Update existing records to have uploaded_at if they don't have it
UPDATE files 
SET uploaded_at = COALESCE(uploaded_at, NOW()) 
WHERE uploaded_at IS NULL;

-- Verify the table structure
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'files' 
ORDER BY ordinal_position; 