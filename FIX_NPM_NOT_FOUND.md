# 🔧 Fix: npm command not found

Your error shows that `npm` is not installed or not in your PATH.

---

## ❌ Error

```
./START.sh: line 38: npm: command not found
```

---

## ✅ Solution

### Quick Fix (Recommended)

Run the installation script:

```bash
cd /Users/ankitkumar/Desktop/GitHub/movie-_ticket_booking
./INSTALL_NODE.sh
```

This will:
1. Install Homebrew (if needed)
2. Install Node.js
3. Verify installation
4. Show next steps

---

## 🔍 Manual Fix

### Step 1: Check if Node.js is installed

```bash
node --version
npm --version
```

If you see version numbers, Node.js is installed but not in PATH. Skip to Step 3.

If you see "command not found", Node.js is not installed. Continue to Step 2.

---

### Step 2: Install Node.js

#### Option A: Using Homebrew (Easiest)

```bash
# Install Homebrew (if not already installed)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js
brew install node

# Verify
node --version
npm --version
```

#### Option B: Using nvm

```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Reload shell
source ~/.zshrc

# Install Node.js
nvm install 16
nvm use 16

# Verify
node --version
npm --version
```

#### Option C: Direct Download

1. Go to https://nodejs.org/
2. Download LTS version
3. Run installer
4. Follow wizard
5. Verify: `node --version`

---

### Step 3: Add to PATH (if needed)

If Node.js is installed but npm still not found:

```bash
# Check where Node.js is installed
which node
which npm

# If empty, add to PATH
# Edit ~/.zshrc (for zsh) or ~/.bash_profile (for bash)
nano ~/.zshrc

# Add this line:
export PATH="/usr/local/bin:$PATH"

# Save and exit (Ctrl+X, then Y, then Enter)

# Reload shell
source ~/.zshrc

# Verify
npm --version
```

---

### Step 4: Restart Terminal

Close and reopen your terminal, then verify:

```bash
node --version
npm --version
```

---

## 🚀 After Installation

Once Node.js is installed:

```bash
cd /Users/ankitkumar/Desktop/GitHub/movie-_ticket_booking
./START.sh
```

---

## 📋 Verification Checklist

Run these commands to verify everything is working:

```bash
# Check Node.js
node --version
# Should show: v16.x.x or v20.x.x

# Check npm
npm --version
# Should show: 8.x.x or higher

# Check locations
which node
# Should show: /usr/local/bin/node

which npm
# Should show: /usr/local/bin/npm
```

---

## 🐛 Troubleshooting

### Still getting "npm: command not found"

**Solution 1**: Restart terminal
```bash
# Close terminal completely
# Open a new terminal window
# Try again
```

**Solution 2**: Check PATH
```bash
echo $PATH
# Should include /usr/local/bin
```

**Solution 3**: Reinstall Node.js
```bash
# Using Homebrew
brew uninstall node
brew install node

# Or using nvm
nvm uninstall 16
nvm install 16
nvm use 16
```

**Solution 4**: Manual PATH fix
```bash
# Edit shell config
nano ~/.zshrc

# Add this line at the end:
export PATH="/usr/local/bin:$PATH"

# Save (Ctrl+X, Y, Enter)
# Reload
source ~/.zshrc
```

---

## 🎯 Quick Steps

1. Run: `./INSTALL_NODE.sh`
2. Wait for installation
3. Verify: `node --version && npm --version`
4. Run: `./START.sh`
5. Open: http://localhost:3000

---

## 📞 Still Having Issues?

### Check Installation
```bash
# Find Node.js
ls -la /usr/local/bin/node
ls -la /usr/local/bin/npm

# Check Homebrew
brew list | grep node
```

### Get Help
```bash
# Show Node.js info
node -v
npm -v
npm config get prefix

# Show PATH
echo $PATH

# Show shell
echo $SHELL
```

---

## ✅ Success Indicators

After successful installation, you should see:

```bash
$ node --version
v16.13.0

$ npm --version
8.1.0

$ which npm
/usr/local/bin/npm

$ which node
/usr/local/bin/node
```

---

## 🚀 Next Steps

1. Install Node.js (use `./INSTALL_NODE.sh`)
2. Verify installation
3. Run `./START.sh`
4. Open http://localhost:3000
5. Enjoy the app!

---

**Once Node.js is installed, everything will work!** ✅
