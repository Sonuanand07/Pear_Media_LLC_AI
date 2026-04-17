#!/usr/bin/env node

const https = require('https');
const dotenv = require('dotenv');

// Load .env file
dotenv.config();

const GEMINI_KEY = process.env.REACT_APP_GEMINI_KEY;

console.log('🍐 Pear Media AI - List Available Models\n');

// Test different API versions
const endpoints = [
  'https://generativelanguage.googleapis.com/v1/models',
  'https://generativelanguage.googleapis.com/v1beta/models',
];

endpoints.forEach(endpoint => {
  console.log(`\nTesting: ${endpoint}`);
  console.log('-------------------------------------------');
  
  const url = new URL(`${endpoint}?key=${GEMINI_KEY}`);
  
  const options = {
    hostname: url.hostname,
    path: url.pathname + url.search,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const req = https.request(options, (res) => {
    console.log(`Status: ${res.statusCode}`);
    
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      try {
        const json = JSON.parse(data);
        
        if (json.models) {
          console.log(`\nFound ${json.models.length} models:`);
          json.models.forEach(model => {
            if (model.name.includes('flash') || model.name.includes('pro')) {
              console.log(`  ✓ ${model.name}`);
            }
          });
        } else if (json.error) {
          console.log('Error:', json.error.message);
        } else {
          console.log('Response:', JSON.stringify(json, null, 2).substring(0, 300));
        }
      } catch (err) {
        console.log('Parse error:', err.message);
      }
    });
  });

  req.on('error', err => console.log('Request error:', err.message));
  req.end();
});
