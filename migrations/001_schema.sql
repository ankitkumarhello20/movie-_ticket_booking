-- Migration: create schema for movieticket app

CREATE TABLE IF NOT EXISTS movie(
  movie_id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  genre VARCHAR(255),
  date DATE,
  url VARCHAR(500)
);

CREATE TABLE IF NOT EXISTS seat(
  seat_id SERIAL PRIMARY KEY,
  movie_id INT REFERENCES movie(movie_id) ON DELETE CASCADE,
  name_seat VARCHAR(35),
  isbooked BOOLEAN NOT NULL DEFAULT false,
  name VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS image(
  image_id SERIAL PRIMARY KEY,
  movie_id INT REFERENCES movie(movie_id) ON DELETE CASCADE,
  imgname VARCHAR(255),
  img BYTEA
);

-- Users and bookings
CREATE TABLE IF NOT EXISTS "user" (
  user_id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS booking (
  booking_id SERIAL PRIMARY KEY,
  user_id INT REFERENCES "user"(user_id) ON DELETE CASCADE,
  seat_id INT REFERENCES seat(seat_id) ON DELETE CASCADE,
  movie_id INT REFERENCES movie(movie_id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT now()
);
