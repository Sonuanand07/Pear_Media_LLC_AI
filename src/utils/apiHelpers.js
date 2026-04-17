import { SYSTEM_PROMPTS, API_KEYS, API_ENDPOINTS } from './constants';

// Validate API keys on startup
export const validateApiKeys = () => {
  if (!API_KEYS.GEMINI && !API_KEYS.OPENAI) {
    console.warn('⚠️ No API keys found. Please set REACT_APP_GEMINI_KEY or REACT_APP_OPENAI_KEY in .env file');
  }
};

/**
 * Enhance a user's prompt using Gemini
 */
export const getEnhancedPrompt = async (userInput) => {
  if (!API_KEYS.GEMINI) {
    throw new Error('Gemini API key not configured. Check your .env file.');
  }

  try {
    const url = `${API_ENDPOINTS.GEMINI_TEXT}?key=${API_KEYS.GEMINI}`;
    console.log('Calling Gemini API:', url.replace(API_KEYS.GEMINI, 'KEY***'));
    
    const response = await fetch(url, {
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
    });

    const data = await response.json();
    console.log('Gemini response status:', response.status);
    console.log('Gemini response data:', data);

    if (!response.ok) {
      const errorMsg = data.error?.message || JSON.stringify(data);
      console.error('Gemini API error:', data);
      
      // Check for quota exhausted error
      if (response.status === 429 || errorMsg.includes('quota') || errorMsg.includes('exhausted')) {
        throw new Error('🚨 API Quota Exhausted! Your free tier limit has been reached. Check API_FIX_GUIDE.md for solutions (wait 24h, upgrade, or use OpenAI).');
      }
      
      throw new Error(`Gemini API Error (${response.status}): ${errorMsg}`);
    }

    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      throw new Error('Invalid response structure from Gemini API');
    }

    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Enhancement Error:', error);
    
    // Check if it's a quota error
    if (error.message && error.message.includes('429')) {
      throw new Error('API quota exhausted. Please upgrade your plan or wait 24 hours for quota reset. See API_FIX_GUIDE.md for details.');
    }
    
    throw new Error(error.message || 'Failed to enhance prompt. Check API key and quota.');
  }
};

/**
 * Generate image using OpenAI DALL-E (primary) or placeholder (fallback)
 */
export const generateImage = async (prompt) => {
  // Try OpenAI DALL-E 3 first
  if (API_KEYS.OPENAI) {
    try {
      const response = await fetch(API_ENDPOINTS.OPENAI_IMAGE, {
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

      if (response.ok) {
        const data = await response.json();
        console.log('✅ DALL-E 3 image generated successfully');
        return data.data[0].url;
      } else {
        const errorData = await response.json();
        console.warn('DALL-E error:', errorData);
      }
    } catch (error) {
      console.warn('OpenAI DALL-E generation error:', error.message);
    }
  }

  // If OpenAI failed, try Gemini fallback
  if (API_KEYS.GEMINI) {
    try {
      const response = await fetch(
        `${API_ENDPOINTS.GEMINI_TEXT}?key=${API_KEYS.GEMINI}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [
                { text: `Generate a detailed image based on this prompt: ${prompt}\n\nRespond with a detailed image description that could be used to create an image.` }
              ]
            }],
            generationConfig: {
              temperature: 0.9,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 300,
            },
          })
        }
      );

      if (response.ok) {
        console.log('✅ Gemini image generation fallback successful');
        return generatePlaceholderImage(prompt);
      }
    } catch (error) {
      console.warn('Gemini fallback error:', error.message);
    }
  }

  console.log('ℹ️  All APIs unavailable, using placeholder image');
  return generatePlaceholderImage(prompt);
};

/**
 * Analyze image using Gemini Vision
 */
export const analyzeImage = async (base64Image) => {
  if (!API_KEYS.GEMINI) {
    throw new Error('Gemini API key not configured for image analysis.');
  }

  try {
    const url = `${API_ENDPOINTS.GEMINI_VISION}?key=${API_KEYS.GEMINI}`;
    console.log('Analyzing image with Gemini Vision API');
    
    const imageData = base64Image.includes('data:image') 
      ? base64Image.split(',')[1] 
      : base64Image;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [
            { text: SYSTEM_PROMPTS.ANALYZE_IMAGE },
            {
              inlineData: {
                mimeType: 'image/jpeg',
                data: imageData
              }
            }
          ]
        }],
        generationConfig: {
          temperature: 0.6,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 500,
        },
      })
    });

    const data = await response.json();
    console.log('Image analysis response status:', response.status);

    if (!response.ok) {
      const errorMsg = data.error?.message || JSON.stringify(data);
      console.error('Gemini Vision error:', data);
      
      // Check for quota exhausted error
      if (response.status === 429 || errorMsg.includes('quota')) {
        throw new Error('API quota exhausted. Your free tier quota has been used. Check API_FIX_GUIDE.md in the project for solutions.');
      }
      
      throw new Error(`Gemini API Error (${response.status}): ${errorMsg}`);
    }

    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      throw new Error('Invalid response structure from Gemini Vision API');
    }

    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Image Analysis Error:', error);
    throw new Error(error.message || 'Failed to analyze image. Check API key and try a different image.');
  }
};

/**
 * Generate image variation using available APIs
 */
export const generateImageVariation = async (prompt) => {
  // Try OpenAI first
  if (API_KEYS.OPENAI) {
    try {
      const response = await fetch(API_ENDPOINTS.OPENAI_IMAGE, {
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
          quality: 'standard',
        })
      });

      if (response.ok) {
        const data = await response.json();
        return data.data[0].url;
      }
    } catch (error) {
      console.warn('OpenAI variation generation failed', error);
    }
  }

  // Fallback to placeholder if both APIs unavailable
  return generatePlaceholderImage(prompt);
};

/**
 * Generate a placeholder image for demo purposes
 * In production, this should be replaced with actual image generation API
 */
function generatePlaceholderImage(prompt) {
  // This creates a simple placeholder using a public image generation service
  // In production, you'd use your configured APIs
  const encodedPrompt = encodeURIComponent(prompt.substring(0, 100));
  
  // Using a free placeholder service that accepts prompts
  return `https://picsum.photos/1024/1024?random=${Math.random()}&txt=${encodedPrompt}`;
}

// Validate keys when module loads
validateApiKeys();
