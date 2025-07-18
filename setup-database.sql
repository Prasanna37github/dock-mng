-- Fresh Database Setup for File Upload System
-- Run this in your Supabase SQL Editor

-- Step 1: Drop all existing tables and policies
DROP TABLE IF EXISTS files CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS admins CASCADE;

-- Drop all storage policies
DROP POLICY IF EXISTS "Allow authenticated uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow users to view own files" ON storage.objects;
DROP POLICY IF EXISTS "Allow public file access" ON storage.objects;
DROP POLICY IF EXISTS "Allow users to delete own files" ON storage.objects;
DROP POLICY IF EXISTS "Allow all operations" ON storage.objects;
DROP POLICY IF EXISTS "Public read access" ON storage.objects;
DROP POLICY IF EXISTS "Allow file viewing" ON storage.objects;
DROP POLICY IF EXISTS "Allow file updates" ON storage.objects;
DROP POLICY IF EXISTS "Allow file deletion" ON storage.objects;

-- Step 2: Create simple file uploads table
CREATE TABLE file_uploads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_name TEXT NOT NULL,
    file_name TEXT NOT NULL,
    file_type TEXT NOT NULL,
    file_size BIGINT NOT NULL,
    file_url TEXT,
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 3: Create indexes for better performance
CREATE INDEX idx_file_uploads_user_name ON file_uploads(user_name);
CREATE INDEX idx_file_uploads_uploaded_at ON file_uploads(uploaded_at);

-- Step 4: Enable RLS (Row Level Security)
ALTER TABLE file_uploads ENABLE ROW LEVEL SECURITY;

-- Step 5: Create RLS policies - allow all operations for simplicity
CREATE POLICY "Allow all operations" ON file_uploads
FOR ALL USING (true) WITH CHECK (true);

-- Step 6: Create storage bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'file-uploads', 
    'file-uploads', 
    true, 
    104857600, -- 100MB
    ARRAY[
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/markdown',
        'text/plain',
        'image/jpeg',
        'image/png',
        'image/gif',
        'application/zip',
        'application/x-zip-compressed'
    ]
) ON CONFLICT (id) DO UPDATE SET
    public = true,
    file_size_limit = 104857600,
    allowed_mime_types = ARRAY[
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/markdown',
        'text/plain',
        'image/jpeg',
        'image/png',
        'image/gif',
        'application/zip',
        'application/x-zip-compressed'
    ];

-- Step 7: Create storage policies - allow all operations
CREATE POLICY "Allow all storage operations" ON storage.objects
FOR ALL TO anon, authenticated
USING (bucket_id = 'file-uploads')
WITH CHECK (bucket_id = 'file-uploads');

-- Step 8: Verify setup
SELECT 'Database setup completed successfully' as status;
SELECT COUNT(*) as file_uploads_count FROM file_uploads;
SELECT * FROM storage.buckets WHERE id = 'file-uploads'; 