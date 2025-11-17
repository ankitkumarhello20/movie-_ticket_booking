const express = require("express")
const path = require('path')
const app = express()
const bodyParser = require("body-parser");

const cors= require("cors")
const pool = require("./db")
const bcrypt = require('bcryptjs');
const { generateToken, verifyToken } = require('./auth');
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

// Auth: signup & login
app.post('/auth/signup', async (req, res) => {
    try {
        const { email, password, name } = req.body;
        if (!email || !password) return res.status(400).json({ error: 'email and password required' });
        const hash = await bcrypt.hash(password, 10);
        const result = await pool.query('INSERT INTO "user"(email, password, name) VALUES($1,$2,$3) RETURNING user_id, email, name', [email, hash, name]);
        const user = result.rows[0];
        const token = generateToken(user);
        res.json({ token, user });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'failed' });
    }
});

app.post('/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ error: 'email and password required' });
        const r = await pool.query('SELECT user_id, email, password, name FROM "user" WHERE email=$1', [email]);
        if (r.rows.length === 0) return res.status(401).json({ error: 'invalid' });
        const u = r.rows[0];
        const ok = await bcrypt.compare(password, u.password);
        if (!ok) return res.status(401).json({ error: 'invalid' });
        const user = { user_id: u.user_id, email: u.email, name: u.name };
        const token = generateToken(user);
        res.json({ token, user });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'failed' });
    }
});

// Get current user's bookings
app.get('/user/bookings', verifyToken, async (req, res) => {
    try {
        const userId = req.user.user_id;
        const r = await pool.query('SELECT b.booking_id, b.created_at, b.movie_id, b.seat_id, m.name as movie_name FROM booking b JOIN movie m ON b.movie_id = m.movie_id WHERE b.user_id=$1 ORDER BY b.created_at DESC', [userId]);
        res.json(r.rows);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'failed' });
    }
});

// Health check
app.get('/health', async (req, res) => {
    try {
        await pool.query('SELECT 1');
        res.json({ ok: true });
    } catch (e) {
        res.status(500).json({ ok: false, error: e.message });
    }
});

// Admin CRUD endpoints for movies
app.post('/admin/movies', async (req, res) => {
    try {
        const { name, genre, date, url } = req.body;
        const result = await pool.query('INSERT INTO movie(name, genre, date, url) VALUES($1,$2,$3,$4) RETURNING *', [name, genre, date, url]);
        res.json(result.rows[0]);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'failed' });
    }
});

app.put('/admin/movies/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { name, genre, date, url } = req.body;
        const result = await pool.query('UPDATE movie SET name=$1, genre=$2, date=$3, url=$4 WHERE movie_id=$5 RETURNING *', [name, genre, date, url, id]);
        res.json(result.rows[0]);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'failed' });
    }
});

app.delete('/admin/movies/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await pool.query('DELETE FROM movie WHERE movie_id=$1', [id]);
        res.json({ ok: true });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'failed' });
    }
});

// Root: serve frontend in production or redirect to FRONTEND_URL in dev
app.get('/', (req, res) => {
    if (process.env.NODE_ENV === 'production') {
        return res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
    }
    const frontend = process.env.FRONTEND_URL || 'http://localhost:3000';
    return res.redirect(frontend);
});

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
 
// legacy booking endpoint (keeps old behavior)
app.put("/book/:id/:name", async (req, res) => {
    try{
        const id = req.params.id 
        const name = req.params.name;
 
        const conn = await pool.connect();
        //begin transaction
        await conn.query("BEGIN");
        //getting the row to make sure it is not booked
        const result=await conn.query("SELECT * FROM seat where seat_id = $1 and isbooked = false FOR UPDATE" ,[id] )
        
        
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

// New protected booking endpoint: POST /book (body: { seat_id })
app.post('/book', verifyToken, async (req, res) => {
    try {
        const userId = req.user.user_id;
        const seatId = req.body.seat_id;
        if (!seatId) return res.status(400).json({ error: 'seat_id required' });

        const conn = await pool.connect();
        try {
            await conn.query('BEGIN');
            const result = await conn.query('SELECT * FROM seat WHERE seat_id = $1 AND isbooked = false FOR UPDATE', [seatId]);
            if (result.rowCount === 0) {
                await conn.query('ROLLBACK');
                return res.status(409).json({ error: 'already_booked' });
            }
            // mark seat booked
            await conn.query('UPDATE seat SET isbooked = true WHERE seat_id = $1', [seatId]);
            // get movie id for seat
            const s = result.rows[0];
            const movieId = s.movie_id;
            // create booking record
            await conn.query('INSERT INTO booking(user_id, seat_id, movie_id) VALUES($1,$2,$3)', [userId, seatId, movieId]);
            await conn.query('COMMIT');
            res.json({ ok: true, seat_id: seatId });
        } catch (e) {
            await conn.query('ROLLBACK');
            throw e;
        } finally {
            conn.release();
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'failed' });
    }
});

 


// If in production, serve the React build
if (process.env.NODE_ENV === 'production') {
    const buildPath = path.join(__dirname, '..', 'client', 'build');
    app.use(express.static(buildPath));
    // fallback to index.html for SPA routes
    app.get('*', (req, res) => {
        // avoid overriding API routes
        if (req.path.startsWith('/api') || req.path.startsWith('/movies') || req.path.startsWith('/seats') || req.path.startsWith('/book') || req.path.startsWith('/image') || req.path.startsWith('/admin')) {
            return res.status(404).json({ error: 'Not found' });
        }
        res.sendFile(path.join(buildPath, 'index.html'));
    });
}

// Start server on port 5000 with error handling
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
});

// Handle errors like EADDRINUSE gracefully
server.on('error', (err) => {
    if (err && err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. If you have another server running, stop it or set a different PORT environment variable.`);
        console.error('Example: PORT=5001 node server/index.js');
        process.exit(1);
    }
    console.error('Server error:', err);
    process.exit(1);
});

// Handle unexpected errors to avoid uncaught exceptions
process.on('unhandledRejection', (reason) => {
    console.error('Unhandled Rejection at:', reason);
});
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception thrown:', err);
    process.exit(1);
});