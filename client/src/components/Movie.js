import React, { Fragment, useEffect, useState } from "react";

import MovieComponent from "./MovieComponent"

const Movie = () => {
  const [movies, setMovies] = useState([]);
  
 

  const getMovies = async () => {
    try {
      const response = await fetch("http://localhost:5000/movies");
      const jsonData = await response.json();

      setMovies(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    getMovies();
  }, []);
  return (
    <Fragment >
    <div style={{backgroundColor:"black"}}>
    <h1 style={{color:"white"  , backgroundColor:"black" , textAlign:"center" , fontFamily:"'Brush Script MT', cursive" , fontSize:"60px"}}>Shows Just For You  🥤🍟 </h1>
    </div>
     
      <div  style={{backgroundColor:"black"}}>
      {movies.map((todo) => (
           

           <MovieComponent name ="Ramneek"  todo={todo} />
           

           
         ))}
       

      </div>
          
         
     
    </Fragment>
  );
};

export default Movie;
