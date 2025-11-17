# Docker Setup Guide

This guide explains how to run the Movie Ticket Booking application using Docker and Docker Compose.

## Prerequisites

- **Docker** ([Download](https://www.docker.com/products/docker-desktop))
- **Docker Compose** (included with Docker Desktop)
- **Node.js** v16+ (for running frontend and backend locally)

## Quick Start with Docker

### Step 1: Start PostgreSQL with Docker Compose

```bash
# Start the PostgreSQL database
docker-compose up -d

# Verify it's running
docker-compose ps
```

You should see:
```
NAME                COMMAND                  SERVICE             STATUS
movieticket-db      "docker-entrypoint.s…"   postgres            Up (healthy)
```

### Step 2: Install Dependencies

```bash
# Install root dependencies
npm install

# Install client dependencies
cd client
npm install
cd ..
```

### Step 3: Start Backend

```bash
npm start
# Server will start on http://localhost:5000
```

### Step 4: Start Frontend (in a new terminal)

```bash
cd client
npm start
# React app will open on http://localhost:3000
```

## Docker Commands

### Start Database
```bash
docker-compose up -d
```

### Stop Database
```bash
docker-compose down
```

### View Database Logs
```bash
docker-compose logs postgres
```

### Access Database Shell
```bash
docker-compose exec postgres psql -U postgres -d movieticket
```

### Restart Database
```bash
docker-compose restart
```

### Remove Database (WARNING: Deletes all data)
```bash
docker-compose down -v
```

## Database Access

### From Command Line
```bash
docker-compose exec postgres psql -U postgres -d movieticket
```

### Using psql Locally
```bash
psql -U postgres -h localhost -d movieticket
```

### Connection Details
- **Host**: localhost
- **Port**: 5432
- **User**: postgres
- **Password**: password
- **Database**: movieticket

## Useful Docker Compose Commands

### View running containers
```bash
docker-compose ps
```

### View logs
```bash
docker-compose logs -f postgres
```

### Execute command in container
```bash
docker-compose exec postgres psql -U postgres -d movieticket -c "SELECT * FROM movie;"
```

### Rebuild containers
```bash
docker-compose up -d --build
```

## Troubleshooting

### Port 5432 already in use
```bash
# Find and stop the process
lsof -ti:5432 | xargs kill -9

# Or use a different port in docker-compose.yml
# Change "5432:5432" to "5433:5432"
```

### Database won't start
```bash
# Check logs
docker-compose logs postgres

# Restart
docker-compose restart

# Or rebuild
docker-compose down -v
docker-compose up -d
```

### Can't connect to database
```bash
# Verify container is running
docker-compose ps

# Check if database is healthy
docker-compose exec postgres pg_isready -U postgres
```

### Need to reset database
```bash
# Stop and remove everything
docker-compose down -v

# Start fresh
docker-compose up -d
```

## Full Stack with Docker (Optional)

To run the entire stack in Docker, you would need to create Dockerfiles for the backend and frontend. For now, this setup uses Docker only for the database, which is the most complex part to set up locally.

## Benefits of Docker

- ✅ No need to install PostgreSQL locally
- ✅ Consistent environment across machines
- ✅ Easy to reset database
- ✅ Isolated from system PostgreSQL
- ✅ Easy to manage multiple versions

## Next Steps

After starting the database with Docker Compose:

1. Install dependencies: `npm install && cd client && npm install`
2. Start backend: `npm start`
3. Start frontend: `cd client && npm start`
4. Open http://localhost:3000 in your browser

Enjoy! 🎬
