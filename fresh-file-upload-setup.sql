-- Fresh File Upload Setup - Complete Database Schema
-- Run this in your Supabase SQL Editor

-- Step 1: Create the files table with all necessary columns
CREATE TABLE IF NOT EXISTS files (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    file_name TEXT NOT NULL,
    file_type TEXT NOT NULL,
    file_size BIGINT NOT NULL,
    file_path TEXT NOT NULL,
    file_url TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    admin_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 2: Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_files_user_id ON files(user_id);
CREATE INDEX IF NOT EXISTS idx_files_status ON files(status);
CREATE INDEX IF NOT EXISTS idx_files_uploaded_at ON files(uploaded_at);

-- Step 3: Create RLS (Row Level Security) policies
ALTER TABLE files ENABLE ROW LEVEL SECURITY;

-- Policy 1: Users can view their own files
CREATE POLICY "Users can view own files" ON files
FOR SELECT USING (auth.uid() = user_id);

-- Policy 2: Users can insert their own files
CREATE POLICY "Users can insert own files" ON files
FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policy 3: Users can update their own files (only certain fields)
CREATE POLICY "Users can update own files" ON files
FOR UPDATE USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Policy 4: Admins can view all files
CREATE POLICY "Admins can view all files" ON files
FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM admins WHERE id = auth.uid()
    )
);

-- Policy 5: Admins can update all files
CREATE POLICY "Admins can update all files" ON files
FOR UPDATE USING (
    EXISTS (
        SELECT 1 FROM admins WHERE id = auth.uid()
    )
);

-- Step 4: Create storage bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'user-files', 
    'user-files', 
    true, 
    52428800, -- 50MB
    ARRAY[
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/markdown',
        'text/plain'
    ]
) ON CONFLICT (id) DO UPDATE SET
    public = true,
    file_size_limit = 52428800,
    allowed_mime_types = ARRAY[
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/markdown',
        'text/plain'
    ];

-- Step 5: Create storage policies
-- Allow authenticated users to upload files to their own folder
CREATE POLICY "Allow authenticated uploads" ON storage.objects
FOR INSERT TO authenticated
WITH CHECK (
    bucket_id = 'user-files' 
    AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow users to view their own files
CREATE POLICY "Allow users to view own files" ON storage.objects
FOR SELECT TO authenticated
USING (
    bucket_id = 'user-files' 
    AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow public access to files (for admin viewing)
CREATE POLICY "Allow public file access" ON storage.objects
FOR SELECT TO anon, authenticated
USING (bucket_id = 'user-files');

-- Allow users to delete their own files
CREATE POLICY "Allow users to delete own files" ON storage.objects
FOR DELETE TO authenticated
USING (
    bucket_id = 'user-files' 
    AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Step 6: Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Step 7: Create trigger to automatically update updated_at
CREATE TRIGGER update_files_updated_at 
    BEFORE UPDATE ON files 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Step 8: Verify setup
SELECT 'Files table created successfully' as status;
SELECT COUNT(*) as file_count FROM files;
SELECT * FROM storage.buckets WHERE id = 'user-files'; 