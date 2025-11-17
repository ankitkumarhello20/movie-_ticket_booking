# 🔧 Install Node.js - Complete Guide

Your error shows that Node.js is not installed or not in your PATH. This guide will help you install it.

---

## ❌ Error You're Getting

```
./START.sh: line 38: npm: command not found
```

**Cause**: Node.js and npm are not installed or not accessible.

---

## ✅ Solution: Install Node.js

### Option 1: Using Homebrew (Recommended for macOS)

#### Step 1: Install Homebrew (if not already installed)
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

#### Step 2: Install Node.js
```bash
brew install node
```

#### Step 3: Verify Installation
```bash
node --version
npm --version
```

You should see version numbers like:
```
v16.13.0
8.1.0
```

---

### Option 2: Using nvm (Node Version Manager)

#### Step 1: Install nvm
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
```

#### Step 2: Reload shell
```bash
source ~/.zshrc
# or
source ~/.bash_profile
```

#### Step 3: Install Node.js
```bash
nvm install 16
nvm use 16
```

#### Step 4: Verify Installation
```bash
node --version
npm --version
```

---

### Option 3: Direct Download

1. Go to https://nodejs.org/
2. Download LTS version (v16 or v20)
3. Run the installer
4. Follow the installation wizard
5. Verify:
   ```bash
   node --version
   npm --version
   ```

---

## 🔍 Verify Installation

After installation, run:

```bash
# Check Node.js
node --version

# Check npm
npm --version

# Check npm location
which npm

# Check node location
which node
```

You should see paths like:
```
/usr/local/bin/npm
/usr/local/bin/node
```

---

## 🐛 Troubleshooting

### npm still not found after installation

**Solution 1**: Restart terminal
```bash
# Close terminal and open a new one
```

**Solution 2**: Add to PATH manually
```bash
# Edit ~/.zshrc or ~/.bash_profile
export PATH="/usr/local/bin:$PATH"

# Then reload
source ~/.zshrc
```

**Solution 3**: Check installation
```bash
# Verify Node.js is installed
ls -la /usr/local/bin/node
ls -la /usr/local/bin/npm
```

---

## 📋 Step-by-Step for macOS

### Using Homebrew (Easiest)

```bash
# 1. Install Homebrew (if needed)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 2. Install Node.js
brew install node

# 3. Verify
node --version
npm --version

# 4. Now run the app
cd /Users/ankitkumar/Desktop/GitHub/movie-_ticket_booking
./START.sh
```

---

## ✅ After Installation

Once Node.js is installed, run:

```bash
cd /Users/ankitkumar/Desktop/GitHub/movie-_ticket_booking
./START.sh
```

You should see:
```
✅ PostgreSQL is running
✅ Database exists
Installing root dependencies...
Installing client dependencies...
🚀 Starting servers...
```

---

## 🎯 Quick Checklist

- [ ] Node.js installed: `node --version`
- [ ] npm installed: `npm --version`
- [ ] Both show version numbers
- [ ] Terminal restarted (if needed)
- [ ] Run `./START.sh` again

---

## 📞 Still Having Issues?

### Check Node.js Installation
```bash
# Find where Node.js is installed
which node
which npm

# Check if it's in PATH
echo $PATH
```

### Reinstall Node.js
```bash
# Using Homebrew
brew uninstall node
brew install node

# Or using nvm
nvm uninstall 16
nvm install 16
nvm use 16
```

### Check Shell Configuration
```bash
# For zsh (default on newer macOS)
cat ~/.zshrc | grep PATH

# For bash
cat ~/.bash_profile | grep PATH
```

---

## 🚀 Next Steps

1. Install Node.js using one of the methods above
2. Verify installation: `node --version && npm --version`
3. Run the app: `./START.sh`
4. Open browser: http://localhost:3000

---

## 📚 Resources

- Node.js Official: https://nodejs.org/
- Homebrew: https://brew.sh/
- nvm: https://github.com/nvm-sh/nvm

---

**Once Node.js is installed, everything will work!** ✅
