# 🎬 Movie Ticket Booking - Project Summary

## Project Overview

A full-stack web application for booking movie tickets with real-time seat availability and transaction safety.

**Tech Stack**:
- Frontend: React 17 with React Router
- Backend: Express.js
- Database: PostgreSQL
- Styling: Bootstrap 4

---

## 🌐 Access Points

### Frontend Application
- **URL**: http://localhost:3000
- **Port**: 3000
- **Technology**: React
- **Features**:
  - Movie listing page
  - Movie details
  - Seat selection interface
  - Real-time availability

### Backend API
- **URL**: http://localhost:5000
- **Port**: 5000
- **Technology**: Express.js
- **Endpoints**:
  - `GET /movies` - List all movies
  - `GET /booking/:id` - Booking page
  - `GET /seats/:id` - Get seats for movie
  - `PUT /book/:id/:name` - Book a seat
  - `GET /image/:id` - Get movie image

### Database
- **Host**: localhost
- **Port**: 5432
- **Database**: movieticket
- **User**: postgres
- **Password**: password
- **Technology**: PostgreSQL

---

## 📁 Project Structure

```
movie-_ticket_booking/
│
├── client/                          # React Frontend
│   ├── public/
│   │   └── index.html              # Main HTML
│   ├── src/
│   │   ├── components/
│   │   │   ├── Home.js             # Home page
│   │   │   ├── Movie.js            # Movie list
│   │   │   ├── MovieComponent.js   # Movie card
│   │   │   ├── Navbar.js           # Navigation
│   │   │   └── Popcorn.js          # Hero image
│   │   ├── App.js                  # Main app
│   │   └── index.js                # Entry point
│   └── package.json
│
├── server/                          # Express Backend
│   ├── views/
│   │   └── index.ejs               # Booking template
│   ├── db.js                       # DB connection
│   ├── index.js                    # Server entry
│   └── database.sql                # DB schema
│
├── .github/
│   └── workflows/
│       └── npm-gulp.yml            # CI/CD pipeline
│
├── Documentation/
│   ├── README.md                   # Full documentation
│   ├��─ SETUP.md                    # Detailed setup
│   ├── QUICK_START.md              # Quick reference
│   ├── DOCKER_SETUP.md             # Docker guide
│   ├── TROUBLESHOOTING.md          # Common issues
│   └── PROJECT_SUMMARY.md          # This file
│
├── Configuration/
│   ├── package.json                # Root dependencies
│   ├── docker-compose.yml          # Docker config
│   ├── .env.example                # Environment vars
│   └── START.sh                    # Quick start script
│
└── CI/CD/
    └── .github/workflows/npm-gulp.yml  # GitHub Actions
```

---

## 🚀 Getting Started

### Quick Start (Recommended)
```bash
./START.sh
```

### Manual Setup
```bash
# 1. Setup database
psql -U postgres -f server/database.sql

# 2. Install dependencies
npm install && cd client && npm install && cd ..

# 3. Start backend (Terminal 1)
npm start

# 4. Start frontend (Terminal 2)
cd client && npm start
```

### Docker Setup
```bash
# 1. Start database
docker-compose up -d

# 2. Install dependencies
npm install && cd client && npm install && cd ..

# 3. Start backend (Terminal 1)
npm start

# 4. Start frontend (Terminal 2)
cd client && npm start
```

---

## 📊 Database Schema

### Movie Table
```sql
CREATE TABLE Movie (
    movie_id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    genre VARCHAR(255),
    date DATE
);
```

### Seat Table
```sql
CREATE TABLE Seat (
    seat_id SERIAL PRIMARY KEY,
    movie_id INT,
    name_seat VARCHAR(35),
    isBooked BOOLEAN NOT NULL
);
```

### Image Table
```sql
CREATE TABLE Image (
    image_id SERIAL PRIMARY KEY,
    movie_id INT,
    imgname VARCHAR(255),
    img BYTEA
);
```

---

## 🔄 User Flow

```
1. User opens http://localhost:3000
   ↓
2. Frontend loads movies from backend API
   ↓
3. User clicks "Take Me To The Movies"
   ↓
4. Movie list displays with "Book Now" buttons
   ↓
5. User clicks "Book Now" on a movie
   ↓
6. Booking page loads with available seats
   ↓
7. User clicks a green seat to book
   ↓
8. User enters their name
   ↓
9. Backend processes booking with transaction
   ↓
10. Seat turns red (booked)
    ↓
11. Confirmation message shown
```

---

## 🔒 Transaction Safety

The booking system prevents race conditions using PostgreSQL transactions:

```javascript
// Booking flow
1. BEGIN TRANSACTION
2. SELECT seat FOR UPDATE (locks row)
3. Check if seat is available
4. If available: UPDATE seat to booked
5. COMMIT TRANSACTION
6. If not available: ROLLBACK
```

This ensures no double-booking even with concurrent requests.

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| [README.md](README.md) | Complete project documentation |
| [SETUP.md](SETUP.md) | Detailed setup instructions |
| [QUICK_START.md](QUICK_START.md) | Quick reference guide |
| [DOCKER_SETUP.md](DOCKER_SETUP.md) | Docker configuration guide |
| [TROUBLESHOOTING.md](TROUBLESHOOTING.md) | Common issues & solutions |
| [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) | This file |

---

## 🛠️ Development

### Frontend Development
```bash
cd client
npm start
# Hot reload enabled
```

### Backend Development
```bash
npm run dev
# Uses nodemon for auto-restart
```

### Production Build
```bash
cd client
npm run build
# Creates optimized build in client/build/
```

---

## 🧪 Testing

### Test Backend API
```bash
# Get all movies
curl http://localhost:5000/movies

# Get seats for movie 1
curl http://localhost:5000/seats/1

# Book a seat
curl -X PUT http://localhost:5000/book/1/John%20Doe
```

### Test Database
```bash
# Connect to database
psql -U postgres -d movieticket

# View movies
SELECT * FROM movie;

# View seats
SELECT * FROM seat;

# View booked seats
SELECT * FROM seat WHERE isbooked = true;
```

---

## 🔧 Configuration

### Database Connection (server/db.js)
```javascript
const pool = new Pool({
  user: "postgres",
  password: "password",
  host: "localhost",
  port: 5432,
  database: "movieticket"
});
```

### Server Port (server/index.js)
```javascript
app.listen(5000, () => {
  console.log("Server has started on port 5000")
})
```

### Frontend API URL (client/src/components/Movie.js)
```javascript
const response = await fetch("http://localhost:5000/movies");
```

---

## 📦 Dependencies

### Root (Server)
- express: Web framework
- pg: PostgreSQL client
- cors: Cross-origin requests
- ejs: Template engine
- body-parser: Request parsing

### Client
- react: UI library
- react-dom: React DOM rendering
- react-router-dom: Client-side routing
- react-scripts: Build tools
- bootstrap: CSS framework

---

## 🚀 Deployment

### Frontend
```bash
cd client
npm run build
# Deploy client/build/ to static hosting (Vercel, Netlify, etc.)
```

### Backend
```bash
# Deploy to cloud (Heroku, AWS, DigitalOcean, etc.)
# Update database connection string
# Set environment variables
```

### Database
```bash
# Use managed PostgreSQL service
# Update connection string in server/db.js
```

---

## 🐛 Common Issues

| Issue | Solution |
|-------|----------|
| PostgreSQL not running | `brew services start postgresql` |
| Port 3000 in use | `lsof -ti:3000 \| xargs kill -9` |
| Port 5000 in use | `lsof -ti:5000 \| xargs kill -9` |
| Database not found | `psql -U postgres -f server/database.sql` |
| Movies not loading | Add sample data to database |

See [TROUBLESHOOTING.md](TROUBLESHOOTING.md) for more solutions.

---

## 📞 Support

For issues and questions:
1. Check [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
2. Review [SETUP.md](SETUP.md)
3. Open an issue on GitHub

---

## 📝 Sample Data

```sql
-- Add movies
INSERT INTO movie (name, genre, date) VALUES 
('Inception', 'Sci-Fi', '2024-01-15'),
('The Dark Knight', 'Action', '2024-01-20'),
('Interstellar', 'Sci-Fi', '2024-01-25');

-- Add seats
INSERT INTO seat (movie_id, name_seat, isbooked) VALUES 
(1, 'A1', false), (1, 'A2', false), (1, 'A3', false),
(2, 'B1', false), (2, 'B2', false), (2, 'B3', false),
(3, 'C1', false), (3, 'C2', false), (3, 'C3', false);
```

---

## 🎯 Next Steps

1. ✅ Run the application
2. 📝 Add sample movies and seats
3. 🎫 Test booking functionality
4. 🚀 Deploy to production
5. 📊 Monitor and maintain

---

## 📄 License

MIT License - See LICENSE file for details

---

## 👨‍💻 Author

Created by Ankit Kumar

---

**Happy Booking! 🎬🍿**

Last Updated: 2024
