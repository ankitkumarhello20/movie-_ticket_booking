import React, { Fragment } from "react";
import {Link} from 'react-router-dom'

const Navbar = () => {
  return (
    <Fragment >
      <nav     class="navbar navbar-expand-lg fixed-top  navbar-light " style={{backgroundColor:"black"}} >
  <a   style={{color:"white"}}  class="navbar-brand" href="#">Book My Show 😎</a>
  
  

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      
      <Link to="/movies">
    <li class="nav-item active">
        <a  style={{color:"white"}}  class="nav-link" href="#"> Take Me To The Movies <span class="sr-only">(current)</span></a>
      </li>
      </Link> 
      
      
    </ul>
    
  </div>
</nav>

    </Fragment>
  );
};

export default Navbar;
