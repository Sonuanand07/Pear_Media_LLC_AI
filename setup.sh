#!/bin/bash

# Pear Media AI - Setup Script
# Automated setup for development environment

echo "🍐 Pear Media AI - Setup Script"
echo "================================"
echo ""

# Check Node.js version
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js v18 or higher."
    exit 1
fi

NODE_VERSION=$(node -v)
echo "✅ Node.js $NODE_VERSION found"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install
echo ""

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "🔑 Creating .env file..."
    cp .env.example .env
    echo "⚠️  Please edit .env and add your API keys:"
    echo "   - REACT_APP_GEMINI_KEY"
    echo "   - REACT_APP_OPENAI_KEY"
    echo ""
else
    echo "✅ .env file already exists"
fi

echo "✅ Setup complete!"
echo ""
echo "🚀 To start development:"
echo "   npm start"
echo ""
echo "📦 To build for production:"
echo "   npm run build"
echo ""
