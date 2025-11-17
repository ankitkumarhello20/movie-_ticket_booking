# 📚 Movie Ticket Booking - Complete Documentation Index

Welcome! This document guides you to all the resources you need to run and understand the Movie Ticket Booking application.

---

## 🚀 Getting Started (Choose One)

### For the Impatient (5 minutes)
👉 **[QUICK_START.md](QUICK_START.md)** - Get running in 3 steps

### For the Thorough (15 minutes)
👉 **[SETUP.md](SETUP.md)** - Complete setup guide with all details

### For Docker Users
👉 **[DOCKER_SETUP.md](DOCKER_SETUP.md)** - Run database in Docker

### For the Curious
👉 **[README.md](README.md)** - Full project documentation

---

## 📍 Access Your Application

Once running, access these URLs:

| Component | URL | Purpose |
|-----------|-----|---------|
| **Frontend** | http://localhost:3000 | Browse & book movies |
| **Backend API** | http://localhost:5000 | REST API endpoints |
| **Database** | localhost:5432 | PostgreSQL (psql) |

---

## 📖 Documentation Guide

### 1. **[QUICK_START.md](QUICK_START.md)** ⚡
   - **Best for**: Getting started quickly
   - **Time**: 5 minutes
   - **Contains**:
     - 3 setup options (automated, manual, Docker)
     - Quick commands reference
     - Basic troubleshooting

### 2. **[SETUP.md](SETUP.md)** 📋
   - **Best for**: Detailed setup instructions
   - **Time**: 15 minutes
   - **Contains**:
     - Prerequisites
     - Step-by-step installation
     - Database setup
     - Access points
     - Troubleshooting

### 3. **[README.md](README.md)** 📚
   - **Best for**: Complete project understanding
   - **Time**: 20 minutes
   - **Contains**:
     - Project overview
     - Architecture diagram
     - Features
     - API documentation
     - Database schema
     - Development guide

### 4. **[DOCKER_SETUP.md](DOCKER_SETUP.md)** 🐳
   - **Best for**: Docker users
   - **Time**: 10 minutes
   - **Contains**:
     - Docker Compose setup
     - Docker commands
     - Database access via Docker
     - Troubleshooting

### 5. **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)** 🔧
   - **Best for**: Solving problems
   - **Time**: As needed
   - **Contains**:
     - Common issues & solutions
     - Port conflicts
     - Database problems
     - Frontend/backend issues
     - Performance tips

### 6. **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** 📊
   - **Best for**: Project overview
   - **Time**: 10 minutes
   - **Contains**:
     - Project structure
     - Tech stack
     - User flow
     - Database schema
     - Development workflow

### 7. **[INDEX.md](INDEX.md)** 📍
   - **Best for**: Navigation
   - **Time**: 2 minutes
   - **Contains**: This file - your guide to all documentation

---

## 🎯 Quick Navigation by Task

### "I want to run the app"
1. Read: [QUICK_START.md](QUICK_START.md)
2. Run: `./START.sh` or follow manual steps
3. Open: http://localhost:3000

### "I want to understand the project"
1. Read: [README.md](README.md)
2. Read: [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)
3. Explore: Source code in `client/src/` and `server/`

### "I'm having problems"
1. Check: [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
2. Verify: All prerequisites are installed
3. Check: All ports are available

### "I want to use Docker"
1. Read: [DOCKER_SETUP.md](DOCKER_SETUP.md)
2. Run: `docker-compose up -d`
3. Continue with normal setup

### "I want detailed setup instructions"
1. Read: [SETUP.md](SETUP.md)
2. Follow: Step-by-step instructions
3. Verify: Each step completes successfully

---

## 🌐 Application URLs

### Frontend
```
http://localhost:3000
```
- Home page with movie list
- Movie details
- Seat booking interface

### Backend API
```
http://localhost:5000
```

**Endpoints**:
- `GET /movies` - Get all movies
- `GET /booking/:id` - Booking page
- `GET /seats/:id` - Get seats for movie
- `PUT /book/:id/:name` - Book a seat
- `GET /image/:id` - Get movie image

### Database
```
Host: localhost
Port: 5432
Database: movieticket
User: postgres
Password: password
```

**Connect via**:
```bash
psql -U postgres -d movieticket
```

---

## 📁 Project Structure

```
movie-_ticket_booking/
├── 📄 Documentation
│   ├── INDEX.md                 ← You are here
│   ├── QUICK_START.md           ← Start here
│   ├── SETUP.md                 ← Detailed setup
│   ├── README.md                ← Full docs
│   ├── DOCKER_SETUP.md          ← Docker guide
│   ├── TROUBLESHOOTING.md       ← Problem solving
│   └── PROJECT_SUMMARY.md       ← Overview
│
├── 🚀 Quick Start
│   ├── START.sh                 ← Run this!
│   ├── package.json             ← Root dependencies
│   └── docker-compose.yml       ← Docker config
│
├── 💻 Frontend (React)
│   └── client/
│       ├── src/
│       │   ├── components/      ← React components
│       │   ├── App.js
│       │   └── index.js
│       └── package.json
│
├── 🔧 Backend (Express)
│   └── server/
│       ├── index.js             ← Server entry
│       ├── db.js                ← DB connection
│       ├── database.sql         ← DB schema
│       └── views/
│           └── index.ejs        ← Booking page
│
└── 🔄 CI/CD
    └── .github/workflows/
        └── npm-gulp.yml         ← GitHub Actions
```

---

## ⚡ Quick Commands

### Setup
```bash
# Automated setup
./START.sh

# Manual setup
npm install && cd client && npm install && cd ..
psql -U postgres -f server/database.sql
```

### Running
```bash
# Start backend (Terminal 1)
npm start

# Start frontend (Terminal 2)
cd client && npm start
```

### Database
```bash
# Connect to database
psql -U postgres -d movieticket

# View movies
SELECT * FROM movie;

# View seats
SELECT * FROM seat;

# Add sample movie
INSERT INTO movie (name, genre, date) VALUES ('Inception', 'Sci-Fi', '2024-01-15');
```

### Troubleshooting
```bash
# Kill port 3000
lsof -ti:3000 | xargs kill -9

# Kill port 5000
lsof -ti:5000 | xargs kill -9

# Start PostgreSQL (macOS)
brew services start postgresql

# Check PostgreSQL
psql -U postgres -c "SELECT version();"
```

---

## 🎓 Learning Path

### Beginner
1. Read [QUICK_START.md](QUICK_START.md)
2. Run `./START.sh`
3. Use the application
4. Read [README.md](README.md)

### Intermediate
1. Read [SETUP.md](SETUP.md)
2. Understand the architecture
3. Explore source code
4. Read [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)

### Advanced
1. Read [README.md](README.md) completely
2. Study database schema
3. Review API endpoints
4. Explore transaction safety implementation
5. Consider deployment options

---

## 🆘 Need Help?

### Step 1: Check Documentation
- [QUICK_START.md](QUICK_START.md) - Quick reference
- [TROUBLESHOOTING.md](TROUBLESHOOTING.md) - Common issues
- [SETUP.md](SETUP.md) - Detailed instructions

### Step 2: Verify Setup
```bash
# Check PostgreSQL
psql -U postgres -c "SELECT 1;"

# Check database
psql -U postgres -d movieticket -c "\dt"

# Check backend
curl http://localhost:5000/movies

# Check frontend
# Open http://localhost:3000 in browser
```

### Step 3: Check Logs
- **Frontend**: Browser console (F12)
- **Backend**: Terminal where `npm start` runs
- **Database**: `docker-compose logs postgres` (if using Docker)

### Step 4: Open Issue
If still stuck, open an issue on GitHub with:
- Error message
- Steps to reproduce
- Your environment (OS, Node version, PostgreSQL version)

---

## 📊 Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Frontend | React | 17.0.2 |
| Frontend Router | React Router | 5.3.4 |
| Frontend Build | react-scripts | 4.0.3 |
| Backend | Express | 4.17.1 |
| Database | PostgreSQL | 12+ |
| Database Client | pg | 8.6.0 |
| Styling | Bootstrap | 4.0.0 |
| Runtime | Node.js | 16+ |

---

## 🎯 Next Steps

1. **Get Started**: Follow [QUICK_START.md](QUICK_START.md)
2. **Run App**: Execute `./START.sh`
3. **Explore**: Open http://localhost:3000
4. **Learn**: Read [README.md](README.md)
5. **Develop**: Make changes and test
6. **Deploy**: Follow deployment guide in [README.md](README.md)

---

## 📞 Support Resources

| Resource | Purpose |
|----------|---------|
| [QUICK_START.md](QUICK_START.md) | Get running fast |
| [SETUP.md](SETUP.md) | Detailed setup |
| [README.md](README.md) | Complete documentation |
| [TROUBLESHOOTING.md](TROUBLESHOOTING.md) | Problem solving |
| [DOCKER_SETUP.md](DOCKER_SETUP.md) | Docker guide |
| [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) | Project overview |

---

## 🎬 Ready to Start?

### Option 1: Fastest Way
```bash
./START.sh
```

### Option 2: Step by Step
See [QUICK_START.md](QUICK_START.md)

### Option 3: Detailed Setup
See [SETUP.md](SETUP.md)

---

## 📝 Document Versions

- **Last Updated**: 2024
- **Project Version**: 1.0.0
- **Node Version**: 16+
- **PostgreSQL Version**: 12+

---

## 🎉 You're All Set!

Pick a documentation file above and get started. Happy booking! 🎬🍿

---

**Questions?** Check [TROUBLESHOOTING.md](TROUBLESHOOTING.md)

**Want to learn more?** Read [README.md](README.md)

**Ready to run?** Execute `./START.sh`
