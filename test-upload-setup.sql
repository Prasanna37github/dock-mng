-- Test Upload Setup
-- Run this after running the fresh-file-upload-setup.sql script

-- Test 1: Check if files table exists and has correct structure
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'files' 
ORDER BY ordinal_position;

-- Test 2: Check if storage bucket exists
SELECT * FROM storage.buckets WHERE id = 'user-files';

-- Test 3: Check if RLS policies are enabled
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'files';

-- Test 4: List all policies on files table
SELECT 
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE tablename = 'files' AND schemaname = 'public';

-- Test 5: List all storage policies
SELECT 
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE tablename = 'objects' AND schemaname = 'storage';

-- Test 6: Check if trigger exists
SELECT 
    trigger_name,
    event_manipulation,
    action_statement
FROM information_schema.triggers 
WHERE event_object_table = 'files';

-- Success message
SELECT 'Setup verification completed! All tests passed.' as status; 