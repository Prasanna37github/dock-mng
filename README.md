# Docky File Manager

A modern file upload and management system built with React and Supabase.

## Features

- 📁 File upload with drag & drop support
- 👥 User-based file organization
- 🔍 Search and filter functionality
- 📊 Admin dashboard with statistics
- 🗑️ File deletion and management
- 📱 Responsive design
- 🔒 Secure file storage with Supabase

## Quick Start

### 1. Setup
```bash
# Run the setup script
./setup.sh

# Or manually install dependencies
npm install
```

### 2. Environment Variables
Create a `.env` file in the root directory:
```env
REACT_APP_SUPABASE_URL=https://mvwgklqgyzeycbvimmtm.supabase.co
REACT_APP_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im12d2drbHFneXpleWNidmltbXRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI3MzAxMDAsImV4cCI6MjA2ODMwNjEwMH0.QlLQ25LdESxCR4hNVfs2GaRjrZTF1Mu6Q9ixf1ULoaA
```

### 3. Supabase Setup
1. Go to your Supabase dashboard
2. Run the SQL from `setup-database.sql` in the SQL editor
3. Create a storage bucket named `file-uploads` and set it to public

### 4. Development
```bash
npm start
```

### 5. Build
```bash
npm run build
```

## Deployment

### Vercel (Recommended)
```bash
npm run deploy:vercel
```

### GitHub Pages
```bash
npm run deploy
```

### Netlify
```bash
npm run deploy:netlify
```

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).

## Admin Access

- **Username**: admin
- **Password**: admin123

## Tech Stack

- **Frontend**: React, Tailwind CSS, Lucide React
- **Backend**: Supabase (PostgreSQL + Storage)
- **Routing**: React Router DOM
- **Deployment**: Vercel, Netlify, GitHub Pages

## File Types Supported

- PDF documents
- Word documents (.doc, .docx)
- Text files (.txt)
- Markdown files (.md)
- Images (.jpg, .png, .gif)
- ZIP archives

## Security Features

- File type validation
- File size limits (100MB max)
- Row Level Security (RLS)
- Environment variable protection
- CORS configuration

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details. 