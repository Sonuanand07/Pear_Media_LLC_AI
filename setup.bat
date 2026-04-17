@echo off
REM Pear Media AI - Windows Setup Script
REM Automated setup for development environment

echo.
echo 🍐 Pear Media AI - Windows Setup Script
echo =======================================
echo.

REM Check Node.js version
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js not found. Please install Node.js v18 or higher.
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
echo ✅ Node.js %NODE_VERSION% found
echo.

REM Install dependencies
echo 📦 Installing dependencies...
call npm install
echo.

REM Create .env file if it doesn't exist
if not exist .env (
    echo 🔑 Creating .env file...
    copy .env.example .env
    echo ⚠️  Please edit .env and add your API keys:
    echo    - REACT_APP_GEMINI_KEY
    echo    - REACT_APP_OPENAI_KEY
    echo.
) else (
    echo ✅ .env file already exists
)

echo ✅ Setup complete!
echo.
echo 🚀 To start development:
echo    npm start
echo.
echo 📦 To build for production:
echo    npm run build
echo.
pause
