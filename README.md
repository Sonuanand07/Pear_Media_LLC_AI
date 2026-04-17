# 🍐 Pear Media AI - Image & Text Generation Prototype

Transform text ideas into vivid images and analyze images to generate style variations using AI. A responsive web application bridging simple user inputs with advanced AI outputs through two powerful workflows.

---

## 📋 Quick Navigation
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Quick Start](#-quick-start)
- [Setup & Configuration](#-setup--configuration)
- [Deployment](#-deployment)
- [API Integration](#-api-integration)

---

## ✨ Features

### Creative Studio (Text Workflow)
- Input creative ideas → AI enhances prompts → Generate professional images
- Real-time editing and approval before generation
- Download results instantly

### Style Lab (Image Workflow)
- Upload images → AI analyzes style/subject → Generate variations
- Multiple style options: Oil Painting, Cyberpunk, Watercolor, Minimalist, Anime, 3D Render
- Batch generation and fullscreen preview

### General Features
- 🎨 Beautiful gradient UI with glassmorphism
- ⚡ Real-time loading indicators
- 📱 Fully responsive design
- 🔐 Secure API key management
- 💾 One-click downloads
- ⚙️ Automatic API fallback

---

## 🛠 Tech Stack

React 18 | Tailwind CSS | Node.js 18+ | Google Gemini | OpenAI DALL-E 3 | Vercel

---

## 🚀 Quick Start

### Prerequisites
- Node.js v18+
- Free API keys from Google Gemini and OpenAI

### 1. Get API Keys

**Google Gemini**: https://aistudio.google.com/app/apikey  
**OpenAI DALL-E**: https://platform.openai.com/api-keys

### 2. Setup

```bash
git clone https://github.com/yourusername/pearmedia-ai-prototype.git
cd pearmedia-ai-prototype
npm install
cp .env.example .env
# Edit .env with your API keys
npm start
```

### 3. Build for Production

```bash
npm run build
```

---

## 🌐 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Visit vercel.com → Import project
3. Add environment variables:
   - `REACT_APP_GEMINI_KEY=your_key`
   - `REACT_APP_OPENAI_KEY=your_key`
4. Deploy!

### Netlify

1. Run: `npm run build`
2. Drag `build/` folder to netlify.com
3. Add environment variables in Site Settings
4. Done!

---

## 📂 Project Structure

```
src/
├── components/
│   ├── WorkflowText.js      ← Text enhancement & image generation
│   ├── WorkflowImage.js     ← Image analysis & style variations
│   ├── ImageCard.js         ← Reusable image display
│   └── Navbar.js            ← Header component
├── utils/
│   ├── apiHelpers.js        ← All API calls
│   └── constants.js         ← Config & prompts
├── App.js                   ← Main component
└── index.css                ← Global styles
```

---

## 🔄 Workflows

### Text → Image
User Input → AI Enhancement (Gemini) → User Approval → Image Generation (DALL-E) → Download

### Image → Variations
Image Upload → AI Analysis (Gemini Vision) → Style Selection → Generate Variations → Download

---

## 🔌 API Integration

| API | Used For | Free Tier |
|-----|----------|-----------|
| Google Gemini 1.5 Flash | Text enhancement & Image analysis | ✅ 60 req/min |
| OpenAI DALL-E 3 | Image generation | ❌ Paid |

**Fallback Logic**: If DALL-E fails, automatically tries Gemini. If both fail, shows helpful error.

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| API key error | Copy `.env.example` → `.env`, add keys, restart |
| Image generation fails | Check API credits, verify key, wait 60s, retry |
| Build fails on Vercel | Clear cache: `vercel --prod --force` |
| Blank page on localhost | `rm -rf node_modules && npm install && npm start` |

---

## 💡 Tips

**Text Workflow:**
- ✅ Be specific: "sunset" → "romantic sunset over ocean"
- ✅ Include mood and lighting
- ❌ Avoid real people, copyrighted characters

**Image Upload:**
- ✅ Use clear, well-lit images
- ✅ Simple compositions = better analysis
- ❌ Avoid dark, blurry images

---

## 📝 Environment Variables

Create `.env` file:
```
REACT_APP_GEMINI_KEY=your_gemini_api_key
REACT_APP_OPENAI_KEY=your_openai_api_key
```

⚠️ Never commit `.env` to GitHub!

---

## 🎯 Performance

| Operation | Time |
|-----------|------|
| Text Enhancement | 2-5s |
| Image Generation | 30-60s |
| Image Analysis | 3-8s |
| Style Variation | 30-60s |

---

## 🔒 Security

- ✅ Keys stored locally only (`.env`)
- ✅ Never exposed in console or network
- ✅ Input validation on all submissions
- ✅ CORS-compliant requests

---

## 📊 Use Cases

- 📢 Marketing teams: Create ad visuals
- 🎬 Content creators: Generate thumbnails & variations
- 🎨 Designers: Rapid prototyping
- 📖 Authors: Visualize story scenes

---

## 📄 License

MIT - Free for personal and commercial use

---

## 🚀 Live Demo

**Deployed Link**: [Your Vercel URL]  
**GitHub Repo**: https://github.com/yourusername/pearmedia-ai-prototype

---

**Status**: ✅ Production Ready | **Version**: 1.0.0 | **Last Updated**: April 16, 2026
