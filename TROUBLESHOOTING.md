# 🔧 Troubleshooting Guide

Common issues and their solutions.

## Database Issues

### PostgreSQL Not Running

**Error**: `Error: connect ECONNREFUSED 127.0.0.1:5432`

**Solution**:
```bash
# macOS
brew services start postgresql

# Windows
# Open Services and start PostgreSQL

# Linux
sudo systemctl start postgresql

# Verify it's running
psql -U postgres -c "SELECT version();"
```

---

### Database "movieticket" Not Found

**Error**: `FATAL: database "movieticket" does not exist`

**Solution**:
```bash
# Create the database
psql -U postgres -f server/database.sql

# Verify it was created
psql -U postgres -d movieticket -c "\dt"
```

---

### Wrong PostgreSQL Password

**Error**: `FATAL: password authentication failed for user "postgres"`

**Solution**:
1. Check your PostgreSQL password in `server/db.js`
2. Default password is `password`
3. To reset PostgreSQL password:
   ```bash
   # macOS/Linux
   sudo -u postgres psql
   ALTER USER postgres WITH PASSWORD 'password';
   \q
   ```

---

### PostgreSQL Connection Timeout

**Error**: `Error: connect ETIMEDOUT`

**Solution**:
```bash
# Check if PostgreSQL is listening on port 5432
netstat -an | grep 5432

# Restart PostgreSQL
brew services restart postgresql  # macOS
sudo systemctl restart postgresql  # Linux

# Or use Docker
docker-compose up -d
```

---

## Port Issues

### Port 3000 Already in Use

**Error**: `Something is already listening on port 3000`

**Solution**:
```bash
# Find and kill the process
lsof -ti:3000 | xargs kill -9

# Or use a different port
cd client
PORT=3001 npm start
```

---

### Port 5000 Already in Use

**Error**: `Error: listen EADDRINUSE: address already in use :::5000`

**Solution**:
```bash
# Find and kill the process
lsof -ti:5000 | xargs kill -9

# Or change the port in server/index.js
# Change: app.listen(5000, ...)
# To: app.listen(5001, ...)
```

---

### Port 5432 Already in Use

**Error**: `Error: listen EADDRINUSE: address already in use :::5432`

**Solution**:
```bash
# Find and kill the process
lsof -ti:5432 | xargs kill -9

# Or use Docker with different port
# In docker-compose.yml, change "5432:5432" to "5433:5432"
docker-compose up -d
```

---

## Frontend Issues

### React App Won't Start

**Error**: `npm ERR! code ENOENT`

**Solution**:
```bash
cd client
rm -rf node_modules package-lock.json
npm install
npm start
```

---

### Module Not Found Errors

**Error**: `Cannot find module 'react-router-dom'`

**Solution**:
```bash
cd client
npm install react-router-dom
npm start
```

---

### Blank Page on localhost:3000

**Possible Causes**:
1. React app didn't compile
2. Backend not running
3. Browser cache issue

**Solution**:
```bash
# Check browser console for errors (F12)
# Hard refresh the page (Ctrl+Shift+R or Cmd+Shift+R)
# Check if backend is running on port 5000
curl http://localhost:5000/movies
# If no response, start backend: npm start
```

---

### Movies Not Loading

**Error**: Movies list is empty

**Possible Causes**:
1. Database has no movies
2. Backend not running
3. CORS issue

**Solution**:
```bash
# Check if backend is running
curl http://localhost:5000/movies

# Add sample movies to database
psql -U postgres -d movieticket
INSERT INTO movie (name, genre, date) VALUES 
('Inception', 'Sci-Fi', '2024-01-15'),
('The Dark Knight', 'Action', '2024-01-20');
\q

# Refresh the page
```

---

## Backend Issues

### Server Won't Start

**Error**: `Error: listen EADDRINUSE`

**Solution**:
```bash
# Kill existing process
lsof -ti:5000 | xargs kill -9

# Start server
npm start
```

---

### Cannot Find Module 'express'

**Error**: `Error: Cannot find module 'express'`

**Solution**:
```bash
npm install
npm start
```

---

### Database Connection Error

**Error**: `Error: connect ECONNREFUSED`

**Solution**:
```bash
# Check PostgreSQL is running
psql -U postgres -c "SELECT 1;"

# Check database exists
psql -U postgres -d movieticket -c "SELECT 1;"

# Check credentials in server/db.js
# Default: user=postgres, password=password, database=movieticket
```

---

## Booking Issues

### Can't Book Seats

**Error**: "Couldn't book! already booked."

**Possible Causes**:
1. Seat is already booked
2. Database transaction failed
3. Backend error

**Solution**:
```bash
# Check seat status
psql -U postgres -d movieticket -c "SELECT * FROM seat WHERE movie_id = 1;"

# Check backend logs for errors
# Look for error messages in terminal where npm start is running

# Try booking a different seat
```

---

### Booking Page Blank

**Error**: Booking page shows no seats

**Possible Causes**:
1. No seats in database for that movie
2. Backend not running
3. Movie ID doesn't exist

**Solution**:
```bash
# Check if seats exist for the movie
psql -U postgres -d movieticket -c "SELECT * FROM seat WHERE movie_id = 1;"

# Add seats if needed
INSERT INTO seat (movie_id, name_seat, isbooked) VALUES 
(1, 'A1', false), (1, 'A2', false), (1, 'A3', false);

# Refresh the page
```

---

## Build Issues

### Build Fails with ESLint Errors

**Error**: `Failed to compile` with ESLint warnings

**Solution**:
```bash
cd client
npm run build -- --no-eslint
# Or fix the ESLint errors shown in the output
```

---

### Build Takes Too Long

**Solution**:
```bash
# Clear cache
cd client
rm -rf node_modules/.cache
npm run build
```

---

## Docker Issues

### Docker Container Won't Start

**Error**: `docker-compose up` fails

**Solution**:
```bash
# Check Docker is running
docker ps

# View logs
docker-compose logs postgres

# Rebuild
docker-compose down -v
docker-compose up -d
```

---

### Can't Connect to Docker Database

**Error**: `Error: connect ECONNREFUSED 127.0.0.1:5432`

**Solution**:
```bash
# Check container is running
docker-compose ps

# Check if database is ready
docker-compose exec postgres pg_isready -U postgres

# Wait a moment and try again (database might still be starting)
sleep 5
npm start
```

---

## Performance Issues

### App is Slow

**Possible Causes**:
1. Too many movies/seats in database
2. Backend not optimized
3. Network latency

**Solution**:
```bash
# Check database query performance
psql -U postgres -d movieticket
EXPLAIN ANALYZE SELECT * FROM movie;
EXPLAIN ANALYZE SELECT * FROM seat WHERE movie_id = 1;
\q

# Add indexes if needed
psql -U postgres -d movieticket
CREATE INDEX idx_seat_movie ON seat(movie_id);
\q
```

---

## Getting Help

If you can't find a solution:

1. **Check the logs**:
   - Frontend: Browser console (F12)
   - Backend: Terminal where `npm start` is running
   - Database: `docker-compose logs postgres`

2. **Verify setup**:
   - PostgreSQL running: `psql -U postgres -c "SELECT 1;"`
   - Database exists: `psql -U postgres -d movieticket -c "\dt"`
   - Backend running: `curl http://localhost:5000/movies`
   - Frontend running: Open http://localhost:3000

3. **Check documentation**:
   - [SETUP.md](SETUP.md) - Detailed setup
   - [README.md](README.md) - Full documentation
   - [QUICK_START.md](QUICK_START.md) - Quick reference

4. **Open an issue** on GitHub with:
   - Error message
   - Steps to reproduce
   - Your environment (OS, Node version, PostgreSQL version)

---

## Quick Fixes Checklist

- [ ] PostgreSQL is running
- [ ] Database "movieticket" exists
- [ ] Backend is running on port 5000
- [ ] Frontend is running on port 3000
- [ ] Database has movies and seats
- [ ] No port conflicts
- [ ] Dependencies installed (`npm install`)
- [ ] Browser cache cleared
- [ ] Firewall not blocking ports

If all checks pass and you still have issues, check the logs!

---

Happy troubleshooting! 🔧
