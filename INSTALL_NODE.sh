#!/bin/bash

# Movie Ticket Booking - Node.js Installation Script
# This script installs Node.js using Homebrew

echo "🔧 Movie Ticket Booking - Node.js Installation"
echo "================================================"
echo ""

# Check if Homebrew is installed
if ! command -v brew &> /dev/null; then
    echo "📦 Installing Homebrew..."
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    echo "✅ Homebrew installed"
else
    echo "✅ Homebrew is already installed"
fi

echo ""

# Check if Node.js is already installed
if command -v node &> /dev/null; then
    echo "✅ Node.js is already installed"
    node --version
else
    echo "📦 Installing Node.js..."
    brew install node
    echo "✅ Node.js installed"
fi

echo ""

# Verify installation
echo "🔍 Verifying installation..."
echo ""

if command -v node &> /dev/null; then
    echo "✅ Node.js version:"
    node --version
else
    echo "❌ Node.js not found"
    exit 1
fi

if command -v npm &> /dev/null; then
    echo "✅ npm version:"
    npm --version
else
    echo "❌ npm not found"
    exit 1
fi

echo ""
echo "================================================"
echo "✅ Installation complete!"
echo "================================================"
echo ""
echo "Now you can run:"
echo "  $ ./START.sh"
echo ""
echo "Or manually:"
echo "  Terminal 1: npm start"
echo "  Terminal 2: cd client && npm start"
echo ""
