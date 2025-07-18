# Supabase Storage Setup Guide

## Fix "Bucket Not Found" Error

The error occurs because the storage bucket `files` doesn't exist in your Supabase project. Follow these steps to create it:

### Step 1: Access Supabase Dashboard

1. Go to [supabase.com](https://supabase.com)
2. Sign in to your account
3. Select your project: `mbimqsesaqajxbrxqqlm`

### Step 2: Create Storage Bucket

1. In your Supabase dashboard, navigate to **Storage** in the left sidebar
2. Click **Create a new bucket**
3. Enter the following details:
   - **Name**: `files`
   - **Public bucket**: ✅ Check this option
   - **File size limit**: `50MB` (or your preferred limit)
4. Click **Create bucket**

### Step 3: Configure Storage Policies

After creating the bucket, you need to set up Row Level Security (RLS) policies:

#### Policy 1: Allow authenticated users to upload files

1. Go to **Storage** → **Policies**
2. Click on the `files` bucket
3. Click **New Policy**
4. Choose **Create a policy from scratch**
5. Configure as follows:
   - **Policy name**: `Allow authenticated uploads`
   - **Allowed operation**: `INSERT`
   - **Target roles**: `authenticated`
   - **Policy definition**:
   ```sql
   (auth.uid()::text = (storage.foldername(name))[1])
   ```
6. Click **Review** then **Save policy**

#### Policy 2: Allow users to view their own files

1. Click **New Policy** again
2. Configure as follows:
   - **Policy name**: `Allow users to view own files`
   - **Allowed operation**: `SELECT`
   - **Target roles**: `authenticated`
   - **Policy definition**:
   ```sql
   (auth.uid()::text = (storage.foldername(name))[1])
   ```
6. Click **Review** then **Save policy**

#### Policy 3: Allow public access to files (for admin viewing)

1. Click **New Policy** again
2. Configure as follows:
   - **Policy name**: `Allow public file access`
   - **Allowed operation**: `SELECT`
   - **Target roles**: `anon, authenticated`
   - **Policy definition**:
   ```sql
   true
   ```
6. Click **Review** then **Save policy**

### Step 4: Alternative - Use SQL to Create Bucket

If the UI method doesn't work, you can create the bucket using SQL:

1. Go to **SQL Editor** in your Supabase dashboard
2. Run this command:

```sql
-- Create the storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('files', 'files', true);

-- Create policies
CREATE POLICY "Allow authenticated uploads" ON storage.objects
FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'files' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Allow users to view own files" ON storage.objects
FOR SELECT TO authenticated
USING (bucket_id = 'files' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Allow public file access" ON storage.objects
FOR SELECT TO anon, authenticated
USING (bucket_id = 'files');
```

### Step 5: Test the Setup

1. Go back to your React app at `http://localhost:3000`
2. Sign up or sign in as a user
3. Try uploading a file
4. The upload should now work without the "bucket not found" error

### Troubleshooting

If you still get errors:

1. **Check bucket name**: Make sure the bucket is named exactly `files` (lowercase)
2. **Check policies**: Ensure all three policies are created correctly
3. **Check authentication**: Make sure you're signed in as an authenticated user
4. **Check file size**: Ensure your file is under the bucket's size limit

### File Upload Flow

The application uploads files with this structure:
- **Bucket**: `files`
- **Path**: `{user_id}/{timestamp}.{extension}`
- **Example**: `123e4567-e89b-12d3-a456-426614174000/1703123456789.pdf`

This ensures each user's files are organized in their own folder and prevents conflicts.

### Security Notes

- Files are stored in user-specific folders for security
- Only authenticated users can upload files
- Users can only access their own files
- Admins can view all files through the public access policy
- File URLs are public but organized by user ID for basic access control 