# 🚀 START HERE - Immediate Next Steps

Welcome to Pear Media AI! Here's exactly what to do next.

## ⏱️ Time Estimate: 20 minutes to see the app running

---

## STEP 1: Get Your API Keys (5 minutes)

### Google Gemini (FREE - Recommended First)
1. Go to: https://aistudio.google.com/app/apikey
2. Click the blue "Get API Key" button
3. Click "Create API Key in new project"
4. **COPY** the long key that appears
5. Save it temporarily (you'll need it in Step 3)

### OpenAI DALL-E (OPTIONAL but Recommended)
1. Go to: https://platform.openai.com/api-keys
2. Create a new secret key
3. **Add $5-20 credit** to your account (required for image generation)
4. **COPY** the key
5. Save it temporarily (you'll need it in Step 3)

---

## STEP 2: Navigate to Project Folder

**Windows (PowerShell/Command Prompt):**
```bash
cd "d:\Pear Media LLC Assignment\pearmedia-ai-prototype"
```

**Mac/Linux (Terminal):**
```bash
cd ~/ProjectPath/pearmedia-ai-prototype
```

---

## STEP 3: Create .env File with Your Keys

### Option A: Using Text Editor (Easiest)
1. In the project folder, find `.env.example`
2. Open with any text editor (Notepad, VS Code, etc.)
3. Replace:
   ```
   REACT_APP_GEMINI_KEY=your_gemini_api_key_here
   REACT_APP_OPENAI_KEY=your_openai_api_key_here
   ```
   With your actual keys (from Step 1)
4. Save as `.env` (NEW FILE - not editing .env.example)
5. Make sure file is named exactly `.env` (no .txt at the end)

### Option B: Using Terminal
```bash
# Create .env file
cp .env.example .env

# Edit it (opens in your default editor)
# Windows:
notepad .env

# Mac:
nano .env

# Linux:
vi .env
```

### Verify it worked:
```bash
# Should show your keys (don't share this!)
cat .env
```

---

## STEP 4: Install Dependencies (2 minutes)

```bash
npm install
```

Wait for it to complete (lots of text will scroll).

---

## STEP 5: Start the Development Server (2 minutes)

```bash
npm start
```

#### Expected output:
```
Compiled successfully!

You can now view pear-media-lab in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.xxx.xxx.xxx:3000

Note that the development build is not optimized.
To create a production build, use npm run build.
```

A browser window should open automatically to `http://localhost:3000`

---

## STEP 6: Test the App (5 minutes)

### ✅ Test 1: Creative Studio (Text to Image)

1. You should see a purple gradient background with "🍐 Pear Media AI"
2. Click the **"✨ Creative Studio"** tab (should be selected)
3. In the text box, type:
   ```
   A robot walking through a neon city at night
   ```
4. Click the blue **"Enhance with AI ✨"** button
5. Wait 2-5 seconds
6. You should see an enhanced version of your prompt
7. Click the blue **"Generate Image 🎨"** button
8. Wait 30-60 seconds (image is being generated)
9. You should see an image appear on the right
10. Click **"Download"** to save it

✅ **If this works, the text workflow is working!**

### ✅ Test 2: Style Lab (Image to Variations)

1. Click the **"🎨 Style Lab"** tab
2. Click the upload area or drag an image file
3. Upload any PNG or JPG image (less than 5MB, clear/well-lit works best)
4. Wait 3-8 seconds for analysis
5. You should see analysis text appear
6. Click any style button (e.g., "🎨 Oil Painting")
7. Wait 30-60 seconds
8. An image should appear below
9. Try another style button
10. Click **"Download"** on any image to save it

✅ **If this works, the image workflow is working!**

---

## 🎉 SUCCESS!

If both workflows worked, congratulations! Your local app is running perfectly.

---

## 🌐 Next: Deploy to the Web (30 minutes)

Ready to share your app with others? Follow these steps:

### Deploy to Vercel (FREE, Recommended)

1. **Create GitHub Account** (if you don't have one)
   - Visit: https://github.com/signup
   - Create free account

2. **Create GitHub Repository**
   ```bash
   git init
   git add .
   git commit -m "Pear Media AI - Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/pearmedia-ai-prototype.git
   git push -u origin main
   ```
   
   Need help with git? See `DEPLOYMENT_GUIDE.md`

3. **Deploy on Vercel**
   - Visit: https://vercel.com
   - Click "Sign up" (use GitHub email)
   - Click "Import Project"
   - Connect GitHub
   - Select your repository
   - Click "Import"

4. **Add Environment Variables**
   - In Vercel Dashboard, go to Settings → Environment Variables
   - Add `REACT_APP_GEMINI_KEY` with your key
   - Add `REACT_APP_OPENAI_KEY` with your key
   - Click "Save"

5. **Deploy**
   - Click "Deploy" button
   - Wait 2-3 minutes
   - You get a live URL! (e.g., `https://pearmedia-ai-prototype.vercel.app`)
   - Share with anyone!

---

## 📚 More Documentation

| Document | Purpose |
|----------|---------|
| **README.md** | Full feature list & how to run |
| **QUICKSTART.md** | Another quick start guide |
| **DEPLOYMENT_GUIDE.md** | Detailed deployment steps |
| **API_CONFIG.md** | API setup & configuration |
| **SUMMARY.md** | Project overview |

---

## ❓ Common Issues & Fixes

### Issue: "npm: command not found"
**Fix:** Node.js not installed
- Download from: https://nodejs.org/
- Install with default settings
- Restart terminal/PowerShell
- Try `npm start` again

### Issue: "Port 3000 already in use"
**Fix:** Another app is using port 3000
```bash
# Kill the process using port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID [NUMBER] /F

# Mac/Linux:
lsof -ti:3000 | xargs kill -9
```

### Issue: ".env file not found"
**Fix:** File wasn't created correctly
- Make sure `.env` has NO `.txt` extension
- Check `.env` is in the root directory
- Try: `cp .env.example .env`
- Restart `npm start`

### Issue: "API key not found" error in browser
**Fix:** Keys not in .env
- Edit `.env` file
- Paste your actual API keys (not placeholder text)
- Save file
- Restart `npm start` (press Ctrl+C then run again)

### Issue: Image generation takes too long or fails
**Fix:** API quota or credit issue
- Check OpenAI dashboard for remaining credits
- Check Gemini API quota
- Try again in 60 seconds
- Use a shorter, simpler prompt

### Issue: "Build fails on Vercel"
**Fix:** Common deployment issues
- Check Vercel build logs
- Verify environment variables are set
- Try locally: `npm run build`
- Check for any error messages

---

## 💡 Pro Tips

✅ **Keep .env private!**
- Never share your API keys
- Never commit .env to GitHub
- It's automatically in .gitignore (protected)

✅ **Monitor API costs**
- Gemini: Free (60 requests/minute)
- DALL-E: ~$0.08 per image
- Check usage in your API dashboards

✅ **Better prompts = Better results**
- "sunset" → ❌ Too vague
- "romantic orange and pink sunset over calm ocean with palm tree silhouettes, golden hour lighting, photography style" → ✅ Perfect!

✅ **Clear images = Better variations**
- Upload clear, well-lit images
- Avoid dark, blurry images
- Simple compositions work best

---

## 📞 Still Stuck?

1. Read the full **README.md** file
2. Check **DEPLOYMENT_GUIDE.md** for detailed steps
3. Review **API_CONFIG.md** for API setup help
4. Check browser console for error messages (F12)
5. Verify API keys are correct and have credits

---

## ✅ Final Checklist

- [ ] API keys obtained from Google & OpenAI
- [ ] .env file created in project root
- [ ] npm install completed
- [ ] npm start running without errors
- [ ] Browser opens to http://localhost:3000
- [ ] Creative Studio workflow tested
- [ ] Style Lab workflow tested
- [ ] Ready to deploy to Vercel!

---

## 🎊 You're Ready!

Your Pear Media AI app is:
- ✅ Set up locally
- ✅ Fully functional
- ✅ Ready to demo
- ✅ Ready to deploy

**Next action:** Test the app, then deploy to Vercel!

---

**Questions?** See README.md for full documentation.

**Ready to deploy?** Go to DEPLOYMENT_GUIDE.md

**Start coding!** Run `npm start` NOW! 🚀

---

Made with ❤️  
Pear Media AI - April 16, 2026
