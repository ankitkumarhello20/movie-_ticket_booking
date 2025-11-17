import React , {Fragment} from "react"
import { Link } from 'react-router-dom'


// const MovieComponent = (name ) =>
// {
//     return (
// <Fragment>
// <div class="container">
//   <div class="row">
//     <div class="col-sm">
//      {name}
//     </div>
//     <div class="col-sm">
//       <img ></img>
//     </div>
    
//   </div>
// </div>


// </Fragment>
//     )
// }

// export default MovieComponent;

class MovieComponent extends React.Component{ 

    render(){ 
        
        const base = process.env.REACT_APP_API_URL || 'http://localhost:5000';
        var URL = `/booking/${this.props.todo.movie_id}`;
        console.log("URL" , URL)
		return( 
				<Fragment>
                <div className="containter">

                
                <table className="table" style={{backgroundColor:"#F77482" }} >
 
  <tbody>
    <tr>
      <th scope="row" style={{fontSize:"20px"}}>{this.props.todo.movie_id}</th>
      <td  style={{fontSize:"20px"}}>{this.props.todo.name}</td>
      
      <td style={{fontSize:"20px"}}>{this.props.todo.genre}</td>
      <td style={{fontSize:"20px"}}>{this.props.todo.date}</td>
      <td><img width="100px" height="100px" src={this.props.todo.url} alt={this.props.todo.name || 'Movie poster'} /></td>

      <Link className="btn btn-primary" to={URL} role="button" style={{backgroundColor:"#767272"}}>Book Now</Link>
    </tr>
    
    
  </tbody>
</table>
</div>
{/* <div class="container" style={{backgroundColor:"#F77482"}}>
  <div class="row">
    <div class="col-sm">
     {this.props.todo.name}
    </div>
    <div class="col-sm">
      <img  width="50%" height="50%" src ={this.props.todo.url}></img>
    </div>
    
  </div>
</div> */}


</Fragment>
				
			); 
	} 
} 

export default MovieComponent