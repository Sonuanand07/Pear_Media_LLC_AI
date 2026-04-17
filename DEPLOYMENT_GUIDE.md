# Pear Media AI - Full Deployment & Testing Guide

This guide walks you through setting up, testing, and deploying the Pear Media AI application.

## Phase 1: Local Development (10 minutes)

### Step 1: Install Dependencies
```bash
cd pearmedia-ai-prototype
npm install
```

### Step 2: Configure API Keys
```bash
# Copy example to .env
cp .env.example .env

# Edit .env file and add your API keys
REACT_APP_GEMINI_KEY=your_key_here
REACT_APP_OPENAI_KEY=your_key_here
```

### Step 3: Run Development Server
```bash
npm start
```

The app will open at http://localhost:3000

### Step 4: Test Workflows

**Test Text Workflow:**
1. Go to "Creative Studio" tab
2. Enter: "A sunset over mountains"
3. Click "Enhance with AI ✨"
4. Wait for enhancement (2-5 seconds)
5. Review the enhanced prompt
6. Click "Generate Image 🎨"
7. Wait for image generation (30-60 seconds)
8. Click "Download" to save

**Test Image Workflow:**
1. Go to "Style Lab" tab
2. Upload a clear image (PNG/JPG, <5MB)
3. Wait for analysis (3-8 seconds)
4. Click different style buttons (Oil Painting, Cyberpunk, etc.)
5. Wait for variations (30-60 seconds each)
6. Download each variation

---

## Phase 2: Production Build (5 minutes)

### Build for Production
```bash
npm run build
```

This creates an optimized `build/` folder ready for deployment.

### Test Production Build Locally
```bash
# Install serve globally (if not already done)
npm install -g serve

# Serve the production build
serve -s build
```

Visit http://localhost:3000 to verify the production build works.

---

## Phase 3: Deploy to Vercel (15 minutes)

### Method A: Via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to staging (for testing)
vercel

# Deploy to production
vercel --prod
```

### Method B: Via GitHub (Recommended)

1. **Create GitHub Repository**
```bash
git init
git add .
git commit -m "Initial commit: Pear Media AI"
git remote add origin https://github.com/yourusername/pearmedia-ai-prototype.git
git push -u origin main
```

2. **Connect to Vercel**
   - Visit https://vercel.com
   - Sign in with GitHub
   - Click "Import Project"
   - Select "pearmedia-ai-prototype" repository
   - Click "Import"

3. **Add Environment Variables**
   - Click "Environment Variables"
   - Add `REACT_APP_GEMINI_KEY` with your Gemini API key
   - Add `REACT_APP_OPENAI_KEY` with your OpenAI API key
   - Click "Save"

4. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete (2-3 minutes)
   - Your live URL will appear!

---

## Phase 4: Verify Deployment (5 minutes)

### Check Deployment Status
```bash
# View deployment info (if using Vercel CLI)
vercel projects ls
vercel deployments ls
```

### Test Live Application
1. Open your Vercel URL in browser
2. Test Text Workflow (same as Step 4 in Phase 1)
3. Test Image Workflow (same as Phase 1)
4. Verify downloads work
5. Check responsive design on mobile

### Share with Others
- Copy your Vercel URL
- Share it on social media or send to stakeholders
- Anyone can now demo the application!

---

## Phase 5: Continuous Deployment (Ongoing)

### Auto-Deploy on Push
Once Vercel is connected to your GitHub repo, deployment is automatic:

```bash
# Make changes locally
git add .
git commit -m "Update feature X"
git push origin main

# Vercel automatically deploys the new version!
```

View deployment logs: https://vercel.com/dashboard

---

## Troubleshooting

### Issue: "API key not found"
```bash
# Make sure .env file exists and has keys
cat .env

# Restart dev server
npm start
```

### Issue: "Cannot find module 'react'"
```bash
# Reinstall dependencies
rm -rf node_modules
npm install
npm start
```

### Issue: "Port 3000 already in use"
```bash
# Kill the process using port 3000
# On Windows:
netstat -ano | findstr :3000
taskkill /PID [PID] /F

# On Mac/Linux:
lsof -ti:3000 | xargs kill -9
```

### Issue: "Build fails on Vercel"
1. Check build logs in Vercel dashboard
2. Verify environment variables are set
3. Try clearing cache: `vercel --prod --force`
4. Check for any errors in `npm run build` locally

---

## Performance Optimization

### Image Optimization
- Already using modern image formats
- Automatic lazy loading in Vercel

### Code Splitting
- React automatically code-splits components
- Only loaded code when needed

### Caching
- Vercel automatically caches static assets
- Set to 1 hour in `vercel.json`

---

## Monitoring

### View Real-time Metrics
```bash
# Via Vercel CLI
vercel analytics
```

### Check Logs
```bash
# View function logs
vercel logs [deployment-url]
```

---

## Final Checklist

- [ ] Local development working (npm start)
- [ ] Production build created (npm run build)
- [ ] GitHub repository created and pushed
- [ ] Vercel project connected
- [ ] Environment variables set in Vercel
- [ ] Deployment successful
- [ ] Text workflow tested on live URL
- [ ] Image workflow tested on live URL
- [ ] Responsive design verified on mobile
- [ ] Shared live URL with team/stakeholders

---

## Quick Links

- **Gemini API**: https://aistudio.google.com/app/apikey
- **OpenAI API**: https://platform.openai.com/api-keys
- **Vercel Dashboard**: https://vercel.com/dashboard
- **GitHub**: https://github.com/new
- **Project Repo**: [Your GitHub URL]
- **Live App**: [Your Vercel URL]

---

**Expected Timeline**: 45 minutes total (10+5+15+5+10)  
**Status**: ✅ Ready for Production  
**Version**: 1.0.0
