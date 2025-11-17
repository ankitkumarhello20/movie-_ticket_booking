# Movie Ticket Booking - Setup Guide

This is a full-stack movie ticket booking application with React frontend, Express backend, and PostgreSQL database.

## Architecture

- **Frontend**: React app running on `http://localhost:3000`
- **Backend**: Express server running on `http://localhost:5000`
- **Database**: PostgreSQL running on `localhost:5432`

## Prerequisites

1. **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
2. **PostgreSQL** (v12 or higher) - [Download](https://www.postgresql.org/download/)
3. **Git** - [Download](https://git-scm.com/)

## Installation & Setup

### Step 1: Clone the Repository
```bash
git clone https://github.com/ankitkumarhello20/movie-_ticket_booking.git
cd movie-_ticket_booking
```

### Step 2: Setup PostgreSQL Database

1. **Start PostgreSQL** (if not already running):
   - **macOS**: `brew services start postgresql`
   - **Windows**: Start PostgreSQL from Services or pgAdmin
   - **Linux**: `sudo systemctl start postgresql`

2. **Create the database and tables**:
   ```bash
   psql -U postgres -f server/database.sql
   ```
   
   When prompted for password, enter: `password`

3. **Verify database creation**:
   ```bash
   psql -U postgres -d movieticket -c "\dt"
   ```
   You should see three tables: `seat`, `movie`, `image`

4. **Insert sample data** (optional):
   ```bash
   psql -U postgres -d movieticket
   ```
   Then run:
   ```sql
   INSERT INTO movie (name, genre, date) VALUES 
   ('Inception', 'Sci-Fi', '2024-01-15'),
   ('The Dark Knight', 'Action', '2024-01-20'),
   ('Interstellar', 'Sci-Fi', '2024-01-25');

   INSERT INTO seat (movie_id, name_seat, isbooked) VALUES 
   (1, 'A1', false), (1, 'A2', false), (1, 'A3', false),
   (2, 'B1', false), (2, 'B2', false), (2, 'B3', false),
   (3, 'C1', false), (3, 'C2', false), (3, 'C3', false);
   ```
   Type `\q` to exit psql.

### Step 3: Install Dependencies

**Install root dependencies (server)**:
```bash
npm install
```

**Install client dependencies**:
```bash
cd client
npm install
cd ..
```

### Step 4: Start the Application

You need to run the backend and frontend in separate terminal windows.

**Terminal 1 - Start Backend (Express Server)**:
```bash
npm start
```
You should see: `Server has started on port 5000`

**Terminal 2 - Start Frontend (React App)**:
```bash
cd client
npm start
```
React will automatically open `http://localhost:3000` in your browser.

## Access Points

### Frontend
- **URL**: http://localhost:3000
- **Features**:
  - Home page with movie list
  - Click "Take Me To The Movies" to view all movies
  - Click "Book Now" on any movie to book seats

### Backend API
- **Base URL**: http://localhost:5000
- **Endpoints**:
  - `GET /movies` - Get all movies
  - `GET /image/:id` - Get image for a movie
  - `GET /booking/:id` - Booking page for a movie
  - `GET /seats/:id` - Get all seats for a movie
  - `PUT /book/:id/:name` - Book a seat

### Database
- **Host**: localhost
- **Port**: 5432
- **Database**: movieticket
- **User**: postgres
- **Password**: password

**Access via psql**:
```bash
psql -U postgres -d movieticket
```

**Common queries**:
```sql
-- View all movies
SELECT * FROM movie;

-- View all seats
SELECT * FROM seat;

-- View booked seats
SELECT * FROM seat WHERE isbooked = true;

-- View available seats for a movie
SELECT * FROM seat WHERE movie_id = 1 AND isbooked = false;
```

## Troubleshooting

### Port 3000 already in use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### Port 5000 already in use
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9
```

### PostgreSQL connection error
- Verify PostgreSQL is running: `psql -U postgres -c "SELECT version();"`
- Check credentials in `server/db.js` match your PostgreSQL setup
- Default: user=`postgres`, password=`password`, database=`movieticket`

### Database doesn't exist
```bash
psql -U postgres -f server/database.sql
```

### React app won't start
```bash
cd client
rm -rf node_modules package-lock.json
npm install
npm start
```

## Project Structure

```
movie-_ticket_booking/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── server/                 # Express backend
│   ├── views/
│   │   └── index.ejs       # Booking page template
│   ├── db.js               # Database connection
│   ├── index.js            # Server entry point
│   └── database.sql        # Database schema
├── package.json            # Root dependencies
└── SETUP.md               # This file
```

## Development Workflow

1. **Frontend changes**: Edit files in `client/src/` - React will hot-reload
2. **Backend changes**: Edit files in `server/` - Restart the server with Ctrl+C and `npm start`
3. **Database changes**: Update `server/database.sql` and re-run setup

## Production Build

To create a production build of the frontend:
```bash
cd client
npm run build
```

This creates an optimized build in `client/build/` directory.

## License

This project is open source and available under the MIT License.
