# Docky - File Upload System

A clean, simple file upload system where users can enter their name and upload files to Supabase. Features a blue-themed interface with admin authentication.

## Features

- ✅ Simple name input and file upload
- ✅ No authentication required
- ✅ File validation (PDF, Word, Markdown, Text, Images, ZIP)
- ✅ Progress bar during upload
- ✅ View all uploaded files
- ✅ Download and delete files
- ✅ Admin dashboard to manage all files
- ✅ Search and filter functionality
- ✅ File statistics and analytics
- ✅ Responsive design
- ✅ File size limit: 100MB

## Setup Instructions

### 1. Database Setup

Run the SQL script in your Supabase SQL Editor:

```sql
-- Copy and paste the contents of setup-database.sql
```

This will:
- Delete all existing tables and policies
- Create a new `file_uploads` table
- Set up storage bucket with proper policies
- Allow all operations for simplicity

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Application

```bash
npm start
```

The app will open at `http://localhost:3000`

## How to Use

### File Upload Page
1. **Enter your name** in the input field
2. **Select a file** to upload (drag & drop or click to browse)
3. **Click "Upload File"** to upload to Supabase
4. **View uploaded files** in the list below
5. **Download or delete** files as needed

### Admin Dashboard
1. **Navigate to Admin Dashboard** using the top navigation
2. **Login with admin credentials** (Username: `admin`, Password: `admin123`)
3. **View all uploaded files** from all users
4. **Search files** by name or user
5. **Filter by user** to see specific user uploads
6. **Sort files** by various criteria (date, name, size, etc.)
7. **Download or delete** any file
8. **View statistics** including total files, size, users, and today's uploads
9. **Logout** when finished

## Supported File Types

- PDF files (.pdf)
- Word documents (.doc, .docx)
- Markdown files (.md)
- Text files (.txt)
- Images (.jpg, .jpeg, .png, .gif)
- ZIP files (.zip)

## File Size Limit

Maximum file size: **100MB**

## Database Schema

```sql
CREATE TABLE file_uploads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_name TEXT NOT NULL,
    file_name TEXT NOT NULL,
    file_type TEXT NOT NULL,
    file_size BIGINT NOT NULL,
    file_url TEXT,
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Storage

Files are stored in Supabase Storage bucket `file-uploads` with public access for easy downloading.

## Admin Access

- **Username**: `admin`
- **Password**: `admin123`
- **Access**: Admin dashboard with full file management capabilities

## Technologies Used

- React 18
- Supabase (Database & Storage)
- Tailwind CSS
- Lucide React Icons 