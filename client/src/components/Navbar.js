import React, { Fragment } from "react";
import {Link} from 'react-router-dom'

const Navbar = () => {
  return (
    <Fragment >
      <nav className="navbar navbar-expand-lg fixed-top navbar-light" style={{backgroundColor:"black"}} >
  <Link style={{color:"white"}} className="navbar-brand" to="/">Book My Show 😎</Link>
  
  

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      
      <li className="nav-item active">
        <Link style={{color:"white"}} className="nav-link" to="/movies"> Take Me To The Movies <span className="sr-only">(current)</span></Link>
      </li> 
      
      
    </ul>
    
  </div>
</nav>

    </Fragment>
  );
};

export default Navbar;
