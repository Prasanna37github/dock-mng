# Docky File Manager - Deployment Guide

## Environment Variables

Create a `.env` file in the root directory:

```env
REACT_APP_SUPABASE_URL=https://mvwgklqgyzeycbvimmtm.supabase.co
REACT_APP_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im12d2drbHFneXpleWNidmltbXRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI3MzAxMDAsImV4cCI6MjA2ODMwNjEwMH0.QlLQ25LdESxCR4hNVfs2GaRjrZTF1Mu6Q9ixf1ULoaA
```

## Supabase Setup

### Database Table
Run this SQL in Supabase SQL editor:

```sql
CREATE TABLE file_uploads (
  id SERIAL PRIMARY KEY,
  user_name VARCHAR(255) NOT NULL,
  file_name VARCHAR(255) NOT NULL,
  file_type VARCHAR(100) NOT NULL,
  file_size BIGINT NOT NULL,
  file_url TEXT NOT NULL,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE file_uploads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all operations" ON file_uploads FOR ALL USING (true);
```

### Storage Bucket
1. Create bucket named `file-uploads`
2. Set to public
3. Configure CORS if needed

## Deployment Options

### Vercel (Recommended)
```bash
npm i -g vercel
vercel
```
Set environment variables in Vercel dashboard.

### Netlify
```bash
npm run build
```
Deploy `build` folder and set environment variables.

### GitHub Pages
```bash
npm install --save-dev gh-pages
npm run deploy
```

### Local Development
```bash
npm install
npm start
```

## Security Notes
- Never commit API keys to version control
- Configure CORS in Supabase
- Use HTTPS in production
- Implement proper RLS policies 