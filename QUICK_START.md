# 🚀 Quick Start Guide

Get the Movie Ticket Booking app running in 5 minutes!

## Option 1: Automated (Easiest)

```bash
cd movie-_ticket_booking
./START.sh
```

Done! The app will open at http://localhost:3000

---

## Option 2: Manual (3 Steps)

### Step 1: Setup Database
```bash
# Make sure PostgreSQL is running, then:
psql -U postgres -f server/database.sql
```

### Step 2: Install & Start Backend
```bash
npm install
npm start
# Backend runs on http://localhost:5000
```

### Step 3: Install & Start Frontend (new terminal)
```bash
cd client
npm install
npm start
# Frontend opens at http://localhost:3000
```

---

## Option 3: With Docker (No PostgreSQL Install Needed)

```bash
# Start database in Docker
docker-compose up -d

# Install dependencies
npm install && cd client && npm install && cd ..

# Start backend (terminal 1)
npm start

# Start frontend (terminal 2)
cd client && npm start
```

---

## 🌐 Access Your App

| Component | URL | Purpose |
|-----------|-----|---------|
| **Frontend** | http://localhost:3000 | Browse & book movies |
| **Backend API** | http://localhost:5000 | REST API endpoints |
| **Database** | localhost:5432 | PostgreSQL (psql) |

---

## 📱 What You Can Do

1. **View Movies**: Home page shows all available movies
2. **Browse Movies**: Click "Take Me To The Movies" to see full list
3. **Book Seats**: Click "Book Now" on any movie
4. **Select Seats**: Click green seats to book (red = already booked)
5. **Confirm Booking**: Enter your name and confirm

---

## 🔧 Useful Commands

```bash
# View all movies in database
psql -U postgres -d movieticket -c "SELECT * FROM movie;"

# View all seats
psql -U postgres -d movieticket -c "SELECT * FROM seat;"

# View booked seats
psql -U postgres -d movieticket -c "SELECT * FROM seat WHERE isbooked = true;"

# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Kill process on port 5000
lsof -ti:5000 | xargs kill -9
```

---

## ❌ Troubleshooting

| Problem | Solution |
|---------|----------|
| PostgreSQL not running | `brew services start postgresql` (macOS) |
| Port 3000 in use | `lsof -ti:3000 \| xargs kill -9` |
| Port 5000 in use | `lsof -ti:5000 \| xargs kill -9` |
| Database not found | `psql -U postgres -f server/database.sql` |
| Dependencies error | `rm -rf node_modules && npm install` |

---

## 📚 Full Documentation

- **Setup Guide**: See [SETUP.md](SETUP.md)
- **Docker Guide**: See [DOCKER_SETUP.md](DOCKER_SETUP.md)
- **Full README**: See [README.md](README.md)

---

## 🎯 Next Steps

1. ✅ Get the app running
2. 📝 Add sample movies to database
3. 🎫 Test booking functionality
4. 🚀 Deploy to production

Happy booking! 🎬🍿
