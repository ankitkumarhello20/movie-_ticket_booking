import React from "react";

import "./App.css";
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Home from "./components/Home"
import Movie from "./components/Movie"
import Booking from "./components/Booking"
import Login from "./components/Login"
import Signup from "./components/Signup"
import BookingHistory from "./components/BookingHistory"

function App() {
  return (
  <Router>
    <div>
      <Route  path="/" exact component={Home}/>
      <Route  path="/movies" component={Movie}/>
      <Route  path="/booking/:id" component={Booking}/>
      <Route  path="/login" component={Login}/>
      <Route  path="/signup" component={Signup}/>
      <Route  path="/history" component={BookingHistory}/>
    </div>
  </Router>
  );
}

export default App;
