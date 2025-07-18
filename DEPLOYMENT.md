# Deployment Guide for Docky

This guide will help you deploy Docky to Vercel and push the code to your GitHub repository.

## Prerequisites

1. **GitHub Account** - You already have the repository: `https://github.com/Shakeel2k-5/Docky`
2. **Vercel Account** - Sign up at [vercel.com](https://vercel.com)
3. **Node.js** - Make sure you have Node.js installed locally

## Step 1: Initialize Git Repository

```bash
# Initialize git repository (if not already done)
git init

# Add all files to git
git add .

# Create initial commit
git commit -m "Initial commit: Docky file upload system"

# Add your GitHub repository as remote
git remote add origin https://github.com/Shakeel2k-5/Docky.git

# Push to GitHub
git push -u origin main
```

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard

1. **Go to Vercel Dashboard**
   - Visit [vercel.com/dashboard](https://vercel.com/dashboard)
   - Sign in with your account

2. **Import Project**
   - Click "New Project"
   - Select "Import Git Repository"
   - Choose your `Docky` repository
   - Vercel will automatically detect it's a React app

3. **Configure Project**
   - **Framework Preset**: Create React App
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `build` (auto-detected)

4. **Environment Variables** (if needed)
   - No environment variables needed for this project
   - Supabase credentials are already configured in the code

5. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete

### Option B: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow the prompts:
# - Set up and deploy? Y
# - Which scope? Select your account
# - Link to existing project? N
# - Project name: docky (or leave default)
# - Directory: ./ (current directory)
# - Override settings? N
```

## Step 3: Configure Custom Domain (Optional)

1. **In Vercel Dashboard**
   - Go to your project settings
   - Navigate to "Domains"
   - Add your custom domain

2. **Update DNS**
   - Follow Vercel's DNS configuration instructions
   - Point your domain to Vercel's servers

## Step 4: Update GitHub Repository

After deployment, update your repository with any changes:

```bash
# Make any changes to your code
# Then commit and push

git add .
git commit -m "Update for production deployment"
git push origin main
```

## Step 5: Automatic Deployments

Vercel will automatically:
- Deploy when you push to the `main` branch
- Create preview deployments for pull requests
- Update your live site automatically

## Troubleshooting

### Common Issues

1. **Build Fails**
   - Check the build logs in Vercel dashboard
   - Ensure all dependencies are in `package.json`
   - Verify the build command is correct

2. **Environment Variables**
   - If you need to add environment variables later:
   - Go to Vercel Dashboard → Project Settings → Environment Variables

3. **Routing Issues**
   - The `vercel.json` file handles React Router routing
   - All routes should redirect to `index.html`

### Build Commands

```bash
# Test build locally
npm run build

# Start development server
npm start

# Run tests
npm test
```

## File Structure for Deployment

```
Docky/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── FileUpload.js
│   │   └── AdminPage.js
│   ├── lib/
│   │   └── supabase.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── package.json
├── vercel.json
├── .gitignore
├── setup-database.sql
└── README.md
```

## Post-Deployment Checklist

- [ ] Database setup completed in Supabase
- [ ] Storage bucket configured
- [ ] File upload functionality tested
- [ ] Admin login working
- [ ] All routes accessible
- [ ] Mobile responsiveness verified

## Support

If you encounter any issues:
1. Check Vercel build logs
2. Verify Supabase configuration
3. Test locally with `npm start`
4. Check browser console for errors

Your Docky application should now be live and accessible via your Vercel URL! 