# API Configuration Guide

This document explains how to configure and use the APIs for Pear Media AI.

##📌 Supported APIs

### 1. Google Gemini 1.5 Flash (Recommended for Text & Vision)

**Uses:**
- Text prompt enhancement (NLP)
- Image analysis and style detection
- Fallback image generation

**Why:** Free tier is generous, multimodal capabilities

**Setup:**
1. Visit: https://aistudio.google.com/app/apikey
2. Click "Get API Key"
3. Create a new API key
4. Copy and add to `.env`:
   ```
   REACT_APP_GEMINI_KEY=your_key_here
   ```

**Rate Limits (Free):** 60 requests per minute

**Cost:** FREE (generous limits for small projects)

---

### 2. OpenAI DALL-E 3 (Recommended for Image Generation)

**Uses:**
- High-quality image generation from prompts
- Best results for creative variations

**Why:** Highest quality images, most natural language understanding

**Setup:**
1. Visit: https://platform.openai.com/api-keys
2. Create a new secret key
3. Add credit to your account (requires payment)
4. Copy and add to `.env`:
   ```
   REACT_APP_OPENAI_KEY=your_key_here
   ```

**Rate Limits:** 50 images per minute

**Cost:** $0.080 per image (1024x1024)

---

## 🔄 How APIs Work Together

```
Text Enhancement Flow:
  User Input → GEMINI TEXT API → Enhanced Prompt → DALL-E or GEMINI

Image Analysis Flow:
  Image Upload → GEMINI VISION API → Analysis → Style Generation → DALL-E or GEMINI
```

## 🚨 API Key Security

### DO ✅
- Store keys in `.env` file (local only)
- Add `.env` to `.gitignore` (already done)
- Rotate keys if exposed
- Use environment variables in deployment

### DON'T ❌
- Commit `.env` to GitHub
- Share keys in messages/emails
- Expose keys in frontend code
- Push keys to public repos

---

## 💰 Cost Estimation

### Monthly Budget for Small Usage

| API | Usage | Cost |
|-----|-------|------|
| Gemini | ~1000 uses | FREE |
| DALL-E 3 | 100 images | $8 |
| **Total** | Small project | ~$8/month |

### Cost Optimization Tips

1. **Use Gemini first** (Free tier: 60 req/min)
2. **Implement rate limiting** on frontend
3. **Cache results** to avoid duplicate requests
4. **Use lower quality** for testing (standard vs HD)
5. **Monitor API usage** regularly

---

## 🧪 Testing API Keys

### Test Gemini Key
```bash
curl -X POST \
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=YOUR_KEY" \
  -H "Content-Type: application/json" \
  -d '{"contents":[{"parts":[{"text":"Test"}]}]}'
```

### Test OpenAI Key
```bash
curl https://api.openai.com/v1/models \
  -H "Authorization: Bearer YOUR_KEY"
```

---

## 🔧 API Integration in Code

### Gemini Text API
```javascript
// From src/utils/apiHelpers.js
export const getEnhancedPrompt = async (userInput) => {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEYS.GEMINI}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [
            { text: SYSTEM_PROMPTS.ENHANCE_PROMPT },
            { text: `User input: "${userInput}"` }
          ]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 200,
        },
      })
    }
  );
  // ... error handling
  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
};
```

### OpenAI Image Generation
```javascript
// From src/utils/apiHelpers.js
export const generateImage = async (prompt) => {
  const response = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEYS.OPENAI}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'dall-e-3',
      prompt: prompt,
      n: 1,
      size: '1024x1024',
      quality: 'hd',
    })
  });
  const data = await response.json();
  return data.data[0].url;
};
```

---

## ⚠️ Common API Errors & Solutions

| Error | Cause | Solution |
|-------|-------|----------|
| 401 Unauthorized | Invalid API key | Check `.env`, regenerate key |
| 429 Too Many Requests | Rate limit exceeded | Wait 60s, reduce request frequency |
| 400 Bad Request | Invalid prompt/parameters | Check prompt length, parameters |
| 503 Service Unavailable | API down | Wait, try again later |
| 500 Internal Server Error | API error | Retry after 30 seconds |

---

## 📊 Monitoring API Usage

### Gemini
- Dashboard: https://aistudio.google.com/app/apikey
- Check remaining quota

### OpenAI
- Dashboard: https://platform.openai.com/account/usage/overview
- Monitor monthly spending
- Set usage limits

---

## 🔄 Switching Between APIs

The app automatically handles API failures:

```
Try DALL-E 3 (if key available)
    ↓
If fails → Try Gemini (if key available)
    ↓
If both fail → Return helpful error message
```

To use only one API, just leave the other key empty or comment it out in `.env`.

---

## 🎯 Production Deployment

### Environment Variables in Vercel

1. Go to Project Settings → Environment Variables
2. Add:
   ```
   REACT_APP_GEMINI_KEY = your_production_key
   REACT_APP_OPENAI_KEY = your_production_key
   ```
3. These are automatically injected at build time
4. Never logged or exposed in frontend

### Secrets Management

For large-scale deployments:
- Use Vercel Secrets
- Use GitHub Secrets for CI/CD
- Consider key rotation strategy
- Monitor API usage alerts

---

## 🚀 Adding New APIs

To integrate a new API:

1. Add endpoint to `src/utils/constants.js`
2. Create wrapper function in `src/utils/apiHelpers.js`
3. Add key to `.env.example` and `.env`
4. Update components to use new API
5. Add fallback logic if needed

---

## 📞 Support & Troubleshooting

- **Gemini Issues**: https://ai.google.dev/help
- **OpenAI Issues**: https://community.openai.com
- **Project Issues**: GitHub Issues in repository

---

**Last Updated:** April 16, 2026  
**Status:** ✅ Production Ready
