#!/usr/bin/env node

/**
 * Pear Media AI - Gemini API Test Script
 * Tests if the Gemini API is working correctly
 */

const https = require('https');
const dotenv = require('dotenv');

// Load .env file
dotenv.config();

// Get Gemini key from environment variables
const GEMINI_KEY = process.env.REACT_APP_GEMINI_KEY;

if (!GEMINI_KEY) {
  console.error('❌ REACT_APP_GEMINI_KEY not found in .env file');
  process.exit(1);
}

console.log('🍐 Pear Media AI - Gemini API Test');
console.log('===================================\n');

const testPrompt = 'A beautiful sunset over mountains';

console.log('Testing Gemini v1beta API (gemini-2.0-flash)...');
console.log('-------------------------------------------');

const geminiEndpoint = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

const requestData = JSON.stringify({
  contents: [{
    parts: [
      { text: 'You are a helpful assistant who transforms text into vivid image prompts.' },
      { text: `Transform this into a detailed image prompt: "${testPrompt}"` }
    ]
  }],
  generationConfig: {
    temperature: 0.7,
    maxOutputTokens: 150,
  },
});

const url = new URL(`${geminiEndpoint}?key=${GEMINI_KEY}`);

const options = {
  hostname: url.hostname,
  path: url.pathname + url.search,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': requestData.length
  }
};

console.log('URL: ' + geminiEndpoint);
console.log('Model: gemini-2.0-flash (Stable & Reliable)');
console.log('Key: ' + GEMINI_KEY.substring(0, 20) + '...');
console.log('');

const req = https.request(options, (res) => {
  console.log(`Status: ${res.statusCode} ${res.statusMessage}`);
  
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    try {
      const json = JSON.parse(data);
      
      if (json.error) {
        console.log('\n❌ API Error:');
        console.log('  Message:', json.error.message);
        console.log('  Code:', json.error.code);
        console.log('  Status:', json.error.status);
      } else if (json.candidates && json.candidates[0] && json.candidates[0].content) {
        console.log('\n✅ SUCCESS! Gemini API is working correctly!\n');
        console.log('-------------------------------------------');
        console.log('\nInput Prompt:');
        console.log(testPrompt);
        console.log('\nEnhanced by Gemini 2.5 Flash:');
        console.log(json.candidates[0].content.parts[0].text);
        console.log('\n-------------------------------------------');
        console.log('\n✨ Your Pear Media AI app is ready to use!');
      } else {
        console.log('\n⚠️  Unexpected response format');
        console.log(JSON.stringify(json, null, 2));
      }
    } catch (err) {
      console.log('\n❌ Response parsing error:');
      console.log(data);
    }
  });
});

req.on('error', (err) => {
  console.log('\n❌ Request failed:', err.message);
});

req.write(requestData);
req.end();
