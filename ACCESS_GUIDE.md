# 🌐 Access Guide - Where to View Everything

This guide shows you exactly where to access the frontend, backend, and database.

---

## 🎯 Quick Links

| Component | URL | Status | Purpose |
|-----------|-----|--------|---------|
| **Frontend** | http://localhost:3000 | ✅ Open in browser | Browse & book movies |
| **Backend API** | http://localhost:5000 | ✅ API endpoint | REST API calls |
| **Database** | localhost:5432 | ✅ psql connection | PostgreSQL database |

---

## 🖥️ Frontend Application

### URL
```
http://localhost:3000
```

### How to Access
1. Open your web browser
2. Type: `http://localhost:3000`
3. Press Enter

### What You'll See
- **Home Page**: Welcome message with popcorn image
- **Navigation Bar**: "Book My Show" header with "Take Me To The Movies" link
- **Movie List**: Click "Take Me To The Movies" to see all movies
- **Book Now Button**: Click to book seats for a movie

### Features
- ✅ View all available movies
- ✅ See movie details (name, genre, date)
- ✅ Click "Book Now" to select seats
- ✅ Real-time seat availability (green = available, red = booked)
- ✅ Enter name and confirm booking

### Example Flow
```
1. Open http://localhost:3000
   ↓
2. Click "Take Me To The Movies"
   ↓
3. See list of movies
   ↓
4. Click "Book Now" on any movie
   ↓
5. Select a green seat
   ↓
6. Enter your name
   ↓
7. Confirm booking
   ↓
8. Seat turns red (booked)
```

---

## 🔌 Backend API

### Base URL
```
http://localhost:5000
```

### API Endpoints

#### 1. Get All Movies
```
GET http://localhost:5000/movies
```

**Response**:
```json
[
  {
    "movie_id": 1,
    "name": "Inception",
    "genre": "Sci-Fi",
    "date": "2024-01-15"
  },
  {
    "movie_id": 2,
    "name": "The Dark Knight",
    "genre": "Action",
    "date": "2024-01-20"
  }
]
```

**Test in Browser**:
```
http://localhost:5000/movies
```

**Test with curl**:
```bash
curl http://localhost:5000/movies
```

---

#### 2. Get Seats for a Movie
```
GET http://localhost:5000/seats/:id
```

**Example**:
```
http://localhost:5000/seats/1
```

**Response**:
```json
[
  {
    "seat_id": 1,
    "movie_id": 1,
    "name_seat": "A1",
    "isbooked": false
  },
  {
    "seat_id": 2,
    "movie_id": 1,
    "name_seat": "A2",
    "isbooked": true
  }
]
```

**Test with curl**:
```bash
curl http://localhost:5000/seats/1
```

---

#### 3. Booking Page
```
GET http://localhost:5000/booking/:id
```

**Example**:
```
http://localhost:5000/booking/1
```

**What You'll See**:
- Interactive seat grid
- Green seats = available
- Red seats = booked
- Click seat to book
- Enter name to confirm

**Test in Browser**:
```
http://localhost:5000/booking/1
```

---

#### 4. Book a Seat
```
PUT http://localhost:5000/book/:id/:name
```

**Example**:
```
http://localhost:5000/book/1/John%20Doe
```

**Response (Success)**:
```json
{
  "command": "UPDATE",
  "rowCount": 1,
  "oid": null,
  "rows": []
}
```

**Response (Already Booked)**:
```json
{
  "error": "Seat already booked"
}
```

**Test with curl**:
```bash
curl -X PUT http://localhost:5000/book/1/John%20Doe
```

---

#### 5. Get Movie Image
```
GET http://localhost:5000/image/:id
```

**Example**:
```
http://localhost:5000/image/1
```

**Test in Browser**:
```
http://localhost:5000/image/1
```

---

## 🗄️ Database

### Connection Details
```
Host:     localhost
Port:     5432
Database: movieticket
User:     postgres
Password: password
```

### How to Access

#### Option 1: Using psql (Command Line)
```bash
psql -U postgres -d movieticket
```

#### Option 2: Using Docker
```bash
docker-compose exec postgres psql -U postgres -d movieticket
```

#### Option 3: Using GUI Tools
- **pgAdmin**: http://localhost:5050 (if configured)
- **DBeaver**: Download and connect
- **VS Code Extension**: PostgreSQL extension

---

### Useful Database Queries

#### View All Movies
```sql
SELECT * FROM movie;
```

**Output**:
```
 movie_id |     name      | genre |    date
----------+---------------+-------+------------
        1 | Inception     | Sci-Fi| 2024-01-15
        2 | The Dark Knight| Action| 2024-01-20
        3 | Interstellar  | Sci-Fi| 2024-01-25
```

#### View All Seats
```sql
SELECT * FROM seat;
```

**Output**:
```
 seat_id | movie_id | name_seat | isbooked
---------+----------+-----------+----------
       1 |        1 | A1        | f
       2 |        1 | A2        | t
       3 |        1 | A3        | f
```

#### View Available Seats for Movie 1
```sql
SELECT * FROM seat WHERE movie_id = 1 AND isbooked = false;
```

#### View Booked Seats
```sql
SELECT * FROM seat WHERE isbooked = true;
```

#### View Booking Details
```sql
SELECT seat_id, name_seat, isbooked FROM seat WHERE movie_id = 1;
```

#### Add a Movie
```sql
INSERT INTO movie (name, genre, date) VALUES 
('Avatar', 'Sci-Fi', '2024-02-01');
```

#### Add Seats for a Movie
```sql
INSERT INTO seat (movie_id, name_seat, isbooked) VALUES 
(1, 'A1', false),
(1, 'A2', false),
(1, 'A3', false);
```

#### Update a Seat (Book it)
```sql
UPDATE seat SET isbooked = true WHERE seat_id = 1;
```

#### Delete a Movie
```sql
DELETE FROM movie WHERE movie_id = 1;
```

---

## 📊 Complete Access Map

```
┌─────────────────────────────────────────────────────────────┐
│                    YOUR APPLICATION                         │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ FRONTEND (React)                                            │
│ http://localhost:3000                                       │
│                                                             │
│ • Home page with movie list                                │
│ • Movie details                                            │
│ • Seat selection interface                                 │
│ • Real-time availability                                   │
└─────────────────────────────────────────────────────────────┘
                            ↕
                      (HTTP Requests)
                            ↕
┌─────────────────────────────────────────────────────────────┐
│ BACKEND API (Express)                                       │
│ http://localhost:5000                                       │
│                                                             │
│ • GET /movies - List all movies                            │
│ • GET /seats/:id - Get seats for movie                     │
│ • GET /booking/:id - Booking page                          │
│ • PUT /book/:id/:name - Book a seat                        │
│ • GET /image/:id - Get movie image                         │
└───────────────────���─────────────────────────────────────────┘
                            ↕
                      (SQL Queries)
                            ↕
┌─────────────────────────────────────────────────────────────┐
│ DATABASE (PostgreSQL)                                       │
│ localhost:5432                                              │
│                                                             │
│ • movie table - Movie information                          │
│ • seat table - Seat availability & bookings                │
│ • image table - Movie poster images                        │
│                                                             │
│ Connect: psql -U postgres -d movieticket                   │
└─────────────────────────────────────────────────────────────┘
```

---

## 🧪 Testing Everything

### Test 1: Frontend is Running
```
Open: http://localhost:3000
Expected: See home page with movie list
```

### Test 2: Backend is Running
```
Open: http://localhost:5000/movies
Expected: See JSON array of movies
```

### Test 3: Database is Running
```bash
psql -U postgres -d movieticket -c "SELECT * FROM movie;"
Expected: See list of movies
```

### Test 4: Complete Flow
```
1. Open http://localhost:3000
2. Click "Take Me To The Movies"
3. Click "Book Now" on a movie
4. Click a green seat
5. Enter your name
6. Confirm booking
7. Seat should turn red
```

---

## 🔍 Debugging Access Issues

### Frontend Not Loading
```bash
# Check if React is running
curl http://localhost:3000

# Check if port 3000 is in use
lsof -ti:3000

# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Restart frontend
cd client && npm start
```

### Backend Not Responding
```bash
# Check if Express is running
curl http://localhost:5000/movies

# Check if port 5000 is in use
lsof -ti:5000

# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Restart backend
npm start
```

### Database Not Accessible
```bash
# Check if PostgreSQL is running
psql -U postgres -c "SELECT 1;"

# Check if database exists
psql -U postgres -d movieticket -c "\dt"

# Recreate database if needed
psql -U postgres -f server/database.sql
```

---

## 📱 Mobile Access

### From Same Computer
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

### From Another Computer on Network
Replace `localhost` with your computer's IP address:

```
Frontend: http://YOUR_IP:3000
Backend: http://YOUR_IP:5000
```

**Find your IP**:
```bash
# macOS/Linux
ifconfig | grep "inet "

# Windows
ipconfig
```

---

## 🎯 Quick Reference

| What | Where | How |
|------|-------|-----|
| View app | http://localhost:3000 | Open in browser |
| Test API | http://localhost:5000/movies | Open in browser or curl |
| Access DB | localhost:5432 | `psql -U postgres -d movieticket` |
| Book seat | http://localhost:5000/booking/1 | Open in browser |
| View seats | http://localhost:5000/seats/1 | Open in browser or curl |

---

## ✅ Checklist

- [ ] Frontend loads at http://localhost:3000
- [ ] Backend responds at http://localhost:5000/movies
- [ ] Database accessible via psql
- [ ] Can view movies in frontend
- [ ] Can click "Take Me To The Movies"
- [ ] Can click "Book Now" on a movie
- [ ] Can see seat grid
- [ ] Can book a seat
- [ ] Seat turns red after booking

---

## 🎉 You're Ready!

All access points are now clear. Start exploring:

1. **Frontend**: http://localhost:3000
2. **Backend**: http://localhost:5000
3. **Database**: `psql -U postgres -d movieticket`

Happy booking! 🎬🍿
