# 🎬 Movie Ticket Booking System

A full-stack web application for booking movie tickets with real-time seat availability and transaction safety using PostgreSQL.

## 🌟 Features

- **Movie Listing**: Browse available movies with details (name, genre, date)
- **Seat Booking**: Interactive seat selection with real-time availability
- **Race Condition Prevention**: Uses PostgreSQL transactions to prevent double-booking
- **Responsive UI**: Bootstrap-based responsive design
- **RESTful API**: Clean API endpoints for all operations

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (React)                         │
│                   localhost:3000                            │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ • Movie List Page                                    │  │
│  │ • Movie Details                                      │  │
│  │ • Seat Selection & Booking                           │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            ↕ (HTTP/REST)
┌─────────────────────────────────────────────────────────────┐
│                   Backend (Express)                         │
│                   localhost:5000                            │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ • GET /movies - List all movies                      │  │
│  │ • GET /booking/:id - Booking page                    │  │
│  │ • GET /seats/:id - Get seats for movie               │  │
│  │ • PUT /book/:id/:name - Book a seat                  │  │
│  │ • GET /image/:id - Get movie image                   │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            ↕ (SQL)
┌─────────────────────────────────────────────────────────────┐
│              Database (PostgreSQL)                          │
│                 localhost:5432                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Database: movieticket                                │  │
│  │ • movie table - Movie information                    │  │
│  │ • seat table - Seat availability & bookings          │  │
│  │ • image table - Movie poster images                  │  │
│  └──────────────────────────────���───────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## 📋 Prerequisites

- **Node.js** v16+ ([Download](https://nodejs.org/))
- **PostgreSQL** v12+ ([Download](https://www.postgresql.org/download/))
- **npm** (comes with Node.js)

## 🚀 Quick Start

### Option 1: Automated Setup (Recommended)

```bash
# Clone the repository
git clone https://github.com/ankitkumarhello20/movie-_ticket_booking.git
cd movie-_ticket_booking

# Run the quick start script
./START.sh
```

The script will:
1. Check PostgreSQL is running
2. Create the database if needed
3. Install all dependencies
4. Start both backend and frontend

### Option 2: Manual Setup

**Step 1: Setup Database**
```bash
# Start PostgreSQL (if not running)
# macOS: brew services start postgresql
# Windows: Start from Services
# Linux: sudo systemctl start postgresql

# Create database and tables
psql -U postgres -f server/database.sql
```

**Step 2: Install Dependencies**
```bash
# Install root dependencies
npm install

# Install client dependencies
cd client
npm install
cd ..
```

**Step 3: Start Backend**
```bash
npm start
# Server will start on http://localhost:5000
```

**Step 4: Start Frontend (in a new terminal)**
```bash
cd client
npm start
# React app will open on http://localhost:3000
```

## 🌐 Access Points

### Frontend Application
- **URL**: http://localhost:3000
- **Features**:
  - Home page with welcome message
  - Movie listing page
  - Seat booking interface
  - Real-time seat availability

### Backend API
- **Base URL**: http://localhost:5000
- **Endpoints**:
  - `GET /movies` - Get all movies
  - `GET /booking/:id` - Booking page for movie ID
  - `GET /seats/:id` - Get all seats for movie ID
  - `PUT /book/:id/:name` - Book seat (ID = seat_id, name = passenger name)
  - `GET /image/:id` - Get image for movie ID

### Database Management
- **Connection**: `psql -U postgres -d movieticket`
- **Host**: localhost
- **Port**: 5432
- **User**: postgres
- **Password**: password

**Useful Database Queries**:
```sql
-- View all movies
SELECT * FROM movie;

-- View all seats
SELECT * FROM seat;

-- View booked seats
SELECT * FROM seat WHERE isbooked = true;

-- View available seats for a movie
SELECT * FROM seat WHERE movie_id = 1 AND isbooked = false;

-- View booking details
SELECT seat_id, name, isbooked FROM seat WHERE movie_id = 1;
```

## 📁 Project Structure

```
movie-_ticket_booking/
├── client/                          # React Frontend
│   ├── public/
│   │   ├── index.html              # Main HTML file
│   │   ├── favicon.ico
│   │   └── manifest.json
│   ├── src/
│   │   ├── components/
│   │   │   ├── Home.js             # Home page component
│   │   │   ├── Movie.js            # Movie list component
│   │   │   ├── MovieComponent.js   # Movie card component
│   │   │   ├── Navbar.js           # Navigation bar
│   │   │   └── Popcorn.js          # Popcorn image component
│   │   ├── image/                  # Images
│   │   ├── App.js                  # Main app component
│   │   ├── App.css                 # App styles
│   │   ├── index.js                # React entry point
│   │   └── index.css               # Global styles
│   ├── package.json
│   └── README.md
│
├── server/                          # Express Backend
│   ├── views/
│   │   └── index.ejs               # Booking page template
│   ├── db.js                       # PostgreSQL connection
│   ├── index.js                    # Express server
│   ├── database.sql                # Database schema
│   └── package.json
│
├── .github/
│   └── workflows/
│       └── npm-gulp.yml            # CI/CD pipeline
│
├── package.json                    # Root dependencies
├── SETUP.md                        # Detailed setup guide
├── START.sh                        # Quick start script
└── README.md                       # This file
```

## 🗄️ Database Schema

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

## 🔒 Transaction Safety

The booking system uses PostgreSQL transactions to prevent race conditions:

```javascript
// Transaction flow in PUT /book/:id/:name
1. BEGIN TRANSACTION
2. SELECT seat FOR UPDATE (locks the row)
3. Check if seat is available
4. If available: UPDATE seat to booked
5. COMMIT TRANSACTION
6. If not available: ROLLBACK
```

This ensures that even with concurrent requests, a seat cannot be double-booked.

## 🛠️ Development

### Frontend Development
```bash
cd client
npm start
# Hot reload enabled - changes reflect immediately
```

### Backend Development
```bash
npm run dev
# Uses nodemon for auto-restart on file changes
```

### Build for Production
```bash
cd client
npm run build
# Creates optimized build in client/build/
```

## 🐛 Troubleshooting

### PostgreSQL Connection Error
```bash
# Check if PostgreSQL is running
psql -U postgres -c "SELECT version();"

# If not running:
# macOS: brew services start postgresql
# Windows: Start from Services
# Linux: sudo systemctl start postgresql
```

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Kill process on port 5000
lsof -ti:5000 | xargs kill -9
```

### Database Not Found
```bash
# Recreate database
psql -U postgres -f server/database.sql
```

### Dependencies Issues
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install

cd client
rm -rf node_modules package-lock.json
npm install
```

## 📊 API Examples

### Get All Movies
```bash
curl http://localhost:5000/movies
```

### Get Seats for Movie 1
```bash
curl http://localhost:5000/seats/1
```

### Book a Seat
```bash
curl -X PUT http://localhost:5000/book/1/John%20Doe
```

### Access Booking Page
```
http://localhost:5000/booking/1
```

## ���� CI/CD Pipeline

The project includes GitHub Actions workflow (`.github/workflows/npm-gulp.yml`) that:
- Runs on Node.js 16.x
- Installs dependencies
- Builds the React frontend
- Validates the backend
- Uploads build artifacts

## 📝 Sample Data

To add sample movies and seats:

```sql
-- Insert movies
INSERT INTO movie (name, genre, date) VALUES 
('Inception', 'Sci-Fi', '2024-01-15'),
('The Dark Knight', 'Action', '2024-01-20'),
('Interstellar', 'Sci-Fi', '2024-01-25');

-- Insert seats for each movie
INSERT INTO seat (movie_id, name_seat, isbooked) VALUES 
(1, 'A1', false), (1, 'A2', false), (1, 'A3', false),
(2, 'B1', false), (2, 'B2', false), (2, 'B3', false),
(3, 'C1', false), (3, 'C2', false), (3, 'C3', false);
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

Created by Ankit Kumar

## 📞 Support

For issues and questions, please open an issue on GitHub.

---

**Happy Booking! 🎟️🍿**
