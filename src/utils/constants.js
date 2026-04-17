export const SYSTEM_PROMPTS = {
  ENHANCE_PROMPT: `You are an expert prompt engineer specializing in image generation. Your task is to transform simple user requests into detailed, vivid image prompts that will produce high-quality AI-generated images.

Requirements:
- Transform the input into a 50-100 word descriptive masterpiece
- Include specific details about:
  * Lighting (warm, cool, golden hour, ambient, etc.)
  * Camera angle and framing (wide shot, close-up, bird's eye view, etc.)
  * Artistic style (oil painting, digital art, photography, surrealism, etc.)
  * Color palette and mood
  * Composition and foreground/background elements
  
Format: Return ONLY the enhanced prompt, no explanations or prefixes.`,

  ANALYZE_IMAGE: `You are an expert in visual analysis and image understanding. Analyze the provided image and provide a detailed description that includes:

1. Main Subject/Objects - What are the key elements?
2. Visual Style - What artistic style does this represent?
3. Color Palette - Dominant colors and mood
4. Lighting - How is the image lit? What's the light source?
5. Composition - How are elements arranged? What's the focal point?
6. Atmosphere/Mood - The overall feeling the image conveys
7. Technical Details - Resolution, texture, details

Format: Provide insights in a concise, structured way that can be used to generate similar or stylistically varied images.`,
};

export const API_KEYS = {
  GEMINI: process.env.REACT_APP_GEMINI_KEY || '',
  OPENAI: process.env.REACT_APP_OPENAI_KEY || '',
};

export const API_ENDPOINTS = {
  GEMINI_TEXT: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
  GEMINI_VISION: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
  OPENAI_IMAGE: 'https://api.openai.com/v1/images/generations',
};

export const DEFAULT_CONFIG = {
  MAX_IMAGE_SIZE: 5 * 1024 * 1024, // 5MB
  IMAGE_GEN_TIMEOUT: 120000, // 2 minutes
  ANALYSIS_TIMEOUT: 30000, // 30 seconds
};
