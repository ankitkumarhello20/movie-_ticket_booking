CREATE DATABASE MovieTicket;

CREATE TABLE Seat(
    seat_id SERIAL PRIMARY KEY  , 
    movie_id INT ,
    name_seat varchar(35),
    isBooked BOOLEAN NOT NULL 

);

CREATE TABLE Movie(
    movie_id SERIAL PRIMARY KEY  , 
    name VARCHAR(255),
    genre VARCHAR(255) , 
    date DATE  

);

CREATE TABLE Image(

    image_id SERIAL PRIMARY KEY , 
    movie_id INT , 
    imgname VARCHAR(255) , 
    img BYTEA 
)