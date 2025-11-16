import React from "react";

import "./App.css";
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Home from "./components/Home"
import Movie from "./components/Movie"

function App() {
  return (
  <Router>
    <div>
      <Route  path="/" exact component={Home}/>
      <Route  path="/movies" component={Movie}/>
    </div>
  </Router>
  );
}

export default App;
