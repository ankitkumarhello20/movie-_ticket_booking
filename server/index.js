const express = require("express")
const app = express()
const bodyParser = require("body-parser");

const cors= require("cors")
const pool = require("./db")
const ejs = require("ejs");

//middleware
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}));



app.get("/movies" , async(req, res)=>
{
    try{

        const allTodos=await pool.query("SELECT * from  movie")
        console.log("Running GET API for movies")
        res.json(allTodos.rows)


    }
    catch(err)
    {
        console.error(err.message)

    }
})

app.get("/image/:id" , async(req, res)=>
{
    try{

        var currId= req.params.id
        const allTodos=await pool.query(` SELECT * from  image WHERE movie_id= ${currId} `)
        res.json(allTodos.rows[0])
        console.log("Runnign GET API for IMAGE"+currId)

    }
    catch(err)
    {
        console.error(err.message)

    }

})

// Code from GIthub For DoubleBooking And Race COndition
//get all seats 

app.get("/booking/:id", (req, res) => {

    console.log("Inside get ooking" , req.params.id)
    // res.sendFile(__dirname + "/index.html");
    res.render('index.ejs' , {ID : req.params.id})
})
app.get("/seats/:id", async (req, res) => {
    const result = await pool.query(`select * from seat WHERE movie_id= ${req.params.id} `);
    console.log("Inside GET SEATS" , result.rows )
    console.log("ID inside params" , req.params.id)
    res.send(result.rows)
})

//book a seat give the seatId and your name
 
app.put("/book/:id/:name", async (req, res) => {
    try{
        const id = req.params.id 
        const name = req.params.name;
 
        const conn = await pool.connect();
        //begin transaction
        await conn.query("BEGIN");
        //getting the row to make sure it is not booked
        const result=await pool.query("SELECT * FROM seat where seat_id = $1 and isbooked = false FOR UPDATE" ,[id] )
        
        
        //if no rows found then the operation should fail can't book
        if (result.rowCount === 0) {
            res.send({"error": "Seat already booked"})
            return;
        } 
        //if we get the row, we are safe to update
        const sqlU= "update seat set isbooked = true, name = $2 where seat_id = $1"
        const updateResult = await conn.query(sqlU,[id, name]);
        
        //end transaction
        await conn.query("COMMIT");
        conn.release();
        res.send(updateResult)
        console.log("Inside PUT API of seats" , updateResult)
    }
    catch(ex){
        console.log(ex)
        res.send(500);
    }
   
    
}) 

 


//Listening To Port 5000
app.listen(5000 , ()=>
{
    console.log("Server has started on port 5000")
})