#!/usr/bin/env bash

# Movie Ticket Booking - Robust Quick Start Script
# Starts backend and frontend, creates DB if missing, frees port 5000 if occupied.

set -euo pipefail

echo "🎬 Movie Ticket Booking - Starting Application"
echo "================================================"
echo ""

# Helper: check command exists
command_exists() { command -v "$1" >/dev/null 2>&1; }

# Check for node/npm
if ! command_exists node || ! command_exists npm; then
    echo "Node.js or npm not found. Attempting to run './INSTALL_NODE.sh' if present..."
    if [ -x "./INSTALL_NODE.sh" ]; then
        ./INSTALL_NODE.sh
        # reload path in case INSTALL_NODE.sh modified shell files
        export PATH="$HOME/.nvm/versions/node/$(cat .nvmrc 2>/dev/null || echo '')/bin:$PATH"
    else
        echo "No INSTALL_NODE.sh found or not executable. Please install Node.js (Homebrew, nvm, or installer) and re-run this script." >&2
        exit 1
    fi
fi

# Ensure an appropriate Node version for the frontend (react-scripts@4)
# If system Node is too new (>=19), download a portable Node 16 into .local/node16 and use it for the rest of this script.
node_major=0
if command_exists node; then
    node_major=$(node -v 2>/dev/null | sed 's/^v\([0-9]*\).*$/\1/' || echo 0)
fi

USE_PORTABLE_NODE=0
if [ "${node_major}" -eq 0 ] || [ "${node_major}" -ge 19 ] || [ "${node_major}" -lt 16 ]; then
    USE_PORTABLE_NODE=1
fi

if [ "${USE_PORTABLE_NODE}" -eq 1 ]; then
    echo "Installing portable Node 16 runtime for this project (cached in .local/node16)..."
    mkdir -p .local
    NODE_VER="16.20.2"
    UNAME_S=$(uname -s)
    UNAME_M=$(uname -m)
    if [ "${UNAME_S}" = "Darwin" ]; then
        PLATFORM="darwin"
    else
        PLATFORM="linux"
    fi
    if [ "${UNAME_M}" = "arm64" ] || [ "${UNAME_M}" = "aarch64" ]; then
        ARCH="arm64"
    else
        ARCH="x64"
    fi
    TAR_NAME="node-v${NODE_VER}-${PLATFORM}-${ARCH}.tar.gz"
    DEST_DIR=".local/node16"
    if [ ! -x "${DEST_DIR}/bin/node" ]; then
        echo "Downloading https://nodejs.org/dist/v${NODE_VER}/${TAR_NAME} ..."
        curl -fsSL "https://nodejs.org/dist/v${NODE_VER}/${TAR_NAME}" -o ".local/${TAR_NAME}" || { echo "Download failed" >&2; exit 1; }
        mkdir -p "${DEST_DIR}"
        tar -xzf ".local/${TAR_NAME}" -C .local
        # move extracted folder to .local/node16
        EXTRACTED_DIR=$(tar -tzf .local/${TAR_NAME} | head -1 | cut -f1 -d"/")
        rm -rf "${DEST_DIR}"
        mv ".local/${EXTRACTED_DIR}" "${DEST_DIR}"
        rm -f ".local/${TAR_NAME}"
    fi
    # Prepend portable node bin to PATH for this script only
    export PATH="$(pwd)/${DEST_DIR}/bin:${PATH}"
    echo "Using portable node: $(which node) $(node -v)"
fi

# Check for psql
if ! command_exists psql; then
    echo "❌ 'psql' not found. Please install PostgreSQL (client) and ensure 'psql' is in PATH."
    echo "macOS (Homebrew): brew install postgresql"
    exit 1
fi

echo "Checking PostgreSQL availability..."
# Try to connect to movieticket DB as current user
if psql -d movieticket -c "SELECT 1" >/dev/null 2>&1; then
    echo "✅ Database 'movieticket' exists"
else
    echo "⚠️  Database 'movieticket' not found. Attempting to create..."
    # Try createdb (uses current user)
    if command_exists createdb; then
        if createdb movieticket >/dev/null 2>&1; then
            echo "✅ Created database 'movieticket' (owner: $(whoami))"
            # try to load schema if file exists
            if [ -f "server/database.sql" ]; then
                echo "Loading schema from server/database.sql"
                psql -d movieticket -f server/database.sql || true
            fi
        else
            echo "Could not create database 'movieticket' automatically. Please create it manually and re-run this script." >&2
            exit 1
        fi
    else
        echo "'createdb' not available. Please create database 'movieticket' manually." >&2
        exit 1
    fi
fi

# Run seed script to ensure sample data/tables exist (if available)
if [ -x "scripts/seed.js" ] || [ -f "scripts/seed.js" ]; then
    echo "Running seed script to ensure tables and sample data..."
    (node scripts/seed.js) || echo "Seed script failed (continuing)"
fi

echo ""
echo "Installing dependencies if missing..."
# Install root deps
if [ ! -d "node_modules" ]; then
    echo "Installing root dependencies..."
    npm install
fi

# Install client deps
if [ -d "client" ] && [ ! -d "client/node_modules" ]; then
    echo "Installing client dependencies..."
    (cd client && npm install)
fi

echo ""
echo "================================================"
echo "🚀 Starting servers..."
echo "================================================"
echo ""
echo "Backend will start on: http://localhost:5000"
echo "Frontend will start on: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop the servers"
echo ""


# Find a free backend port (start at 5000, try next ports)
BASE_PORT=5000
BACKEND_PORT=0
for p in $(seq ${BASE_PORT} $((BASE_PORT+10))); do
    if ! lsof -i tcp:"${p}" -sTCP:LISTEN -t >/dev/null 2>&1; then
        BACKEND_PORT=${p}
        break
    fi
done

if [ "${BACKEND_PORT}" -eq 0 ]; then
    echo "No free port found in range ${BASE_PORT}-${BASE_PORT+10}. Please free a port and retry." >&2
    exit 1
fi

if [ "${BACKEND_PORT}" -ne "${BASE_PORT}" ]; then
    echo "Port ${BASE_PORT} is in use. Will start backend on fallback port ${BACKEND_PORT}."
fi

# Start backend using selected port
(cd server && PORT=${BACKEND_PORT} NODE_ENV=development node index.js) &
BACKEND_PID=$!
echo "Started backend on port ${BACKEND_PORT} (PID: ${BACKEND_PID})"

# Start frontend and pass backend URL via REACT_APP_API_URL
if [ -d "client" ]; then
    echo "Starting frontend with REACT_APP_API_URL=http://localhost:${BACKEND_PORT}"
    (cd client && REACT_APP_API_URL="http://localhost:${BACKEND_PORT}" npm start) &
    FRONTEND_PID=$!
    echo "Started frontend (PID: ${FRONTEND_PID})"
else
    echo "No client directory found; skipping frontend start"
    FRONTEND_PID=0
fi

# Cleanup on exit
cleanup() {
    echo "\nStopping servers..."
    if kill -0 "${FRONTEND_PID}" >/dev/null 2>&1; then
        kill "${FRONTEND_PID}" || true
    fi
    if kill -0 "${BACKEND_PID}" >/dev/null 2>&1; then
        kill "${BACKEND_PID}" || true
    fi
    exit 0
}

trap cleanup INT TERM EXIT

# Wait for child processes
wait
