#!/bin/bash

echo "🚀 Docky File Manager Setup"
echo "=========================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✅ Node.js is installed"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "🔧 Creating .env file..."
    cat > .env << EOF
REACT_APP_SUPABASE_URL=https://mvwgklqgyzeycbvimmtm.supabase.co
REACT_APP_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im12d2drbHFneXpleWNidmltbXRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI3MzAxMDAsImV4cCI6MjA2ODMwNjEwMH0.QlLQ25LdESxCR4hNVfs2GaRjrZTF1Mu6Q9ixf1ULoaA
EOF
    echo "✅ .env file created"
else
    echo "✅ .env file already exists"
fi

# Test build
echo "🔨 Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful"
else
    echo "❌ Build failed"
    exit 1
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Set up your Supabase database (see DEPLOYMENT.md)"
echo "2. Run 'npm start' to start development server"
echo "3. Deploy using one of the following commands:"
echo "   - npm run deploy:vercel (for Vercel)"
echo "   - npm run deploy (for GitHub Pages)"
echo "   - npm run deploy:netlify (for Netlify)"
echo ""
echo "For detailed instructions, see DEPLOYMENT.md" 