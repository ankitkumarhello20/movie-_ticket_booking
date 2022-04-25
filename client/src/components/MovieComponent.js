import React , {Fragment} from "react"


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
        
        var URL=`http://localhost:5000/booking/${this.props.todo.movie_id}`
        console.log("URL" , URL)
		return( 
				<Fragment>
                <div className="containter">

                
                <table class="table" style={{backgroundColor:"#F77482" }} >
 
  <tbody>
    <tr>
      <th scope="row" style={{fontSize:"20px"}}>{this.props.todo.movie_id}</th>
      <td  style={{fontSize:"20px"}}>{this.props.todo.name}</td>
      
      <td style={{fontSize:"20px"}}>{this.props.todo.genre}</td>
      <td style={{fontSize:"20px"}}>{this.props.todo.date}</td>
      <td><img  width="100px"  height="100px" src={this.props.todo.url}></img></td>

      <a class="btn btn-primary" href={URL} role="button" style={{backgroundColor:"#767272"}}>Book Now</a>
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