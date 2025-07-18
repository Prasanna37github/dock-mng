# Troubleshooting Guide

## File Upload Issues

### 1. Check Browser Console
Open your browser's Developer Tools (F12) and check the Console tab for error messages when uploading files.

### 2. Verify Storage Bucket Setup
Make sure you've run the storage setup script:

1. Go to Supabase Dashboard → SQL Editor
2. Run the contents of `setup-storage-corrected.sql`
3. Verify the bucket was created by running:
   ```sql
   SELECT * FROM storage.buckets WHERE id = 'files';
   ```

### 3. Check Storage Policies
Verify that the storage policies are correctly set up:

1. Go to Supabase Dashboard → Storage → Policies
2. Click on the `files` bucket
3. You should see 5 policies:
   - Allow authenticated uploads
   - Allow users to view own files
   - Allow public file access
   - Allow users to update own files
   - Allow users to delete own files

### 4. Test Storage Bucket Access
Run this test in the SQL Editor to verify storage access:

```sql
-- Test if the bucket exists and is accessible
SELECT * FROM storage.buckets WHERE id = 'files';

-- Test if you can list objects (this should work for authenticated users)
SELECT * FROM storage.objects WHERE bucket_id = 'files' LIMIT 1;
```

### 5. Common Error Messages and Solutions

#### "Bucket not found"
- **Solution**: Run the storage setup script again
- **Check**: Verify bucket name is exactly `files` (lowercase)

#### "Permission denied"
- **Solution**: Check storage policies are correctly configured
- **Check**: Ensure user is authenticated

#### "File type not supported"
- **Solution**: Only upload PDF, Word (.doc, .docx), or Markdown (.md) files
- **Check**: File extension and MIME type

#### "File too large"
- **Solution**: Reduce file size (max 50MB)
- **Check**: Current file size limit in bucket settings

### 6. Manual Storage Bucket Creation
If the SQL script doesn't work, create the bucket manually:

1. Go to Supabase Dashboard → Storage
2. Click "Create a new bucket"
3. Name: `files`
4. Public bucket: ✅ Checked
5. File size limit: `50MB`
6. Click "Create bucket"

Then add policies manually through the UI.

## Admin Setup Issues

### 1. Create Admin User
After a user signs up, make them an admin:

1. Go to Supabase Dashboard → SQL Editor
2. Run the contents of `create-admin.sql`
3. Replace `'your-admin-email@example.com'` with the actual email
4. Execute the script

### 2. Verify Admin Creation
Check if the admin was created successfully:

```sql
SELECT * FROM admins WHERE email = 'your-admin-email@example.com';
```

### 3. Admin Login Process
1. Sign up as a regular user first
2. Make that user an admin using the SQL script above
3. Sign out and sign back in
4. You should now see the admin dashboard

### 4. Admin Dashboard Access
If you can't access the admin dashboard:

1. Check if you're in the admins table
2. Verify your user ID matches in both users and admins tables
3. Try signing out and signing back in

## Database Issues

### 1. Check Table Structure
Verify all tables exist:

```sql
-- Check if tables exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('users', 'admins', 'files');
```

### 2. Check Table Data
Verify data is being inserted correctly:

```sql
-- Check users table
SELECT * FROM users LIMIT 5;

-- Check admins table
SELECT * FROM admins LIMIT 5;

-- Check files table
SELECT * FROM files LIMIT 5;
```

### 3. Row Level Security (RLS)
Make sure RLS is enabled on tables:

```sql
-- Enable RLS on tables if not already enabled
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE files ENABLE ROW LEVEL SECURITY;
```

## Authentication Issues

### 1. Check Auth Status
Verify user authentication:

```javascript
// In browser console
const { data: { user } } = await supabase.auth.getUser();
console.log('Current user:', user);
```

### 2. Check User Session
Verify session is active:

```javascript
// In browser console
const { data: { session } } = await supabase.auth.getSession();
console.log('Current session:', session);
```

## Testing Steps

### 1. Test File Upload
1. Sign in as a regular user
2. Try uploading a small PDF file
3. Check browser console for errors
4. Check Supabase Storage for uploaded file
5. Check files table for database record

### 2. Test Admin Access
1. Create an admin user using the SQL script
2. Sign out and sign back in
3. Verify you see the admin dashboard
4. Test file approval/rejection functionality

### 3. Test File Download
1. Upload a file as a user
2. Try downloading it from the user dashboard
3. Try viewing it from the admin dashboard

## Getting Help

If you're still having issues:

1. **Check the browser console** for detailed error messages
2. **Check the Supabase logs** in the dashboard
3. **Verify all setup steps** were completed correctly
4. **Test with a simple file** (small PDF) first
5. **Check network tab** in browser dev tools for failed requests

## Common Solutions

### Reset Everything
If nothing works, you can reset and start fresh:

1. Delete the storage bucket
2. Drop and recreate all tables
3. Run the setup scripts again
4. Create a new user and admin

### Alternative Storage Setup
If the SQL method doesn't work, use the UI method:

1. Create bucket manually in Storage section
2. Add policies manually in Policies section
3. Test with a simple file upload 