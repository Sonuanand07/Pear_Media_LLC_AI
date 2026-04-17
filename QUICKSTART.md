# Getting Started with Pear Media AI

Welcome! This quick guide will get you up and running in minutes.

## 📋 Prerequisites

- Node.js v18+ ([Download](https://nodejs.org/))
- npm or yarn (comes with Node.js)
- A text editor (VS Code recommended)
- Free API keys from:
  - Google Gemini: https://aistudio.google.com/app/apikey
  - OpenAI: https://platform.openai.com/api-keys

## ⚡ 5-Minute Setup

### Windows
1. Double-click `setup.bat` in the project folder
2. Edit `.env` file with your API keys
3. Run `npm start`
4. Browser opens automatically at http://localhost:3000

### Mac/Linux
```bash
chmod +x setup.sh
./setup.sh
# Edit .env with your API keys
npm start
```

### Manual Setup (All Platforms)
```bash
npm install
cp .env.example .env
# Edit .env with your API keys
npm start
```

## 🎨 What's Included

- ✨ Creative Studio: Turn text into AI images
- 🎨 Style Lab: Upload images and generate style variations
- 📱 Mobile-responsive design
- 🚀 Production-ready code
- 📦 Ready for deployment to Vercel

## 📁 File Structure

```
pearmedia-ai-prototype/
├── src/
│   ├── components/           ← UI building blocks
│   │   ├── WorkflowText.js
│   │   ├── WorkflowImage.js
│   │   ├── ImageCard.js
│   │   └── Navbar.js
│   ├── utils/
│   │   ├── apiHelpers.js    ← API integration
│   │   └── constants.js     ← Configuration
│   ├── App.js               ← Main app
│   └── index.css            ← Styles
├── .env                      ← Your API keys (LOCAL ONLY!)
├── .env.example              ← Template for .env
├── README.md                 ← Full documentation
└── package.json              ← Dependencies
```

## 🔑 API Keys Setup

### 1. Google Gemini (Free)
- Visit: https://aistudio.google.com/app/apikey
- Click "Get API Key"
- Click "Create API Key in new project"
- Copy the key
- Paste into .env as `REACT_APP_GEMINI_KEY=...`

### 2. OpenAI (Optional, requires credit)
- Visit: https://platform.openai.com/api-keys
- Create new secret key
- Copy the key
- Paste into .env as `REACT_APP_OPENAI_KEY=...`

## 🚀 Running the App

```bash
# Start development server
npm start

# Open http://localhost:3000 in browser
```

The app will automatically reload when you make changes!

## 🧪 Testing Workflows

### Test 1: Text to Image
1. Go to "Creative Studio"
2. Type: "A futuristic robot walking in a city"
3. Click "Enhance with AI ✨"
4. Wait 2-5 seconds
5. Review the enhanced prompt
6. Click "Generate Image 🎨"
7. Wait 30-60 seconds
8. Download the result

### Test 2: Image to Variations
1. Go to "Style Lab"
2. Upload an image (any PNG/JPG under 5MB)
3. Wait 3-8 seconds for analysis
4. Click style buttons (Oil Painting, Cyberpunk, etc.)
5. Wait 30-60 seconds per variation
6. Download results

## 🐛 Quick Troubleshooting

| Problem | Fix |
|---------|-----|
| Blank page | `npm start` again |
| "API key not found" | Add keys to .env, restart |
| "Port 3000 in use" | Close other apps using port 3000 |
| Slow image generation | Normal (30-60s), can be faster with OpenAI |

## 📦 Build for Production

```bash
npm run build
```

Creates optimized `build/` folder ready for deployment.

## 🌐 Deploy to Vercel (Free!)

1. Push code to GitHub
2. Visit vercel.com
3. Click "Import"
4. Select your GitHub repository
5. Add environment variables:
   ```
   REACT_APP_GEMINI_KEY=your_key
   REACT_APP_OPENAI_KEY=your_key
   ```
6. Click "Deploy"

In 2-3 minutes, your app is live! Get a URL like:  
`https://pearmedia-ai-prototype.vercel.app`

## 💡 Pro Tips

- **Specific prompts** = Better images (e.g., "sunset" → "romantic sunset with palm trees")
- **Upload clear images** for better style analysis
- **Check your API quota** if generation fails
- **Downloaded images** are saved to your Downloads folder

## 📚 Learn More

- Full README: [README.md](README.md)
- Deployment Guide: [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)
- React Docs: https://react.dev
- Tailwind CSS: https://tailwindcss.com
- Gemini API: https://ai.google.dev
- OpenAI API: https://platform.openai.com/docs

## ✅ You're Ready!

You now have a production-ready AI application with:
- ✨ Text enhancement and image generation
- 🎨 Image analysis and style variations
- 📱 Beautiful, responsive UI
- 🚀 One-command deployment

Happy creating! 🍐

---

**Questions?** Check the README.md or DEPLOYMENT_GUIDE.md for detailed info.
