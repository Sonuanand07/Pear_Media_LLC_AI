#!/usr/bin/env node

/**
 * Pear Media AI - Build Check Script
 * Verifies the project builds successfully
 */

const { execSync } = require('child_process');
const fs = require('fs');

console.log('\n🔧 Pear Media AI - Build Verification\n');

// Check environment
console.log('1. Checking environment...');
if (!process.env.REACT_APP_GEMINI_KEY && !process.env.REACT_APP_OPENAI_KEY) {
  console.warn('⚠️  No API keys found in environment. Build will proceed but APIs won\'t work.');
}
console.log('✅ Environment check passed\n');

// Check dependencies
console.log('2. Checking dependencies...');
if (!fs.existsSync('node_modules')) {
  console.log('📦 Installing dependencies...');
  execSync('npm install', { stdio: 'inherit' });
}
console.log('✅ Dependencies ready\n');

// Build project
console.log('3. Building project...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Build successful!\n');
} catch (error) {
  console.error('❌ Build failed!\n');
  process.exit(1);
}

console.log('🎉 All checks passed! Project is ready for deployment.\n');
