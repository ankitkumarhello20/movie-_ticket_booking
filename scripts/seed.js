const pool = require('../server/db');

async function ensureSchema() {
  // create tables if they don't exist
  await pool.query(`
    CREATE TABLE IF NOT EXISTS movie(
      movie_id SERIAL PRIMARY KEY,
      name VARCHAR(255),
      genre VARCHAR(255),
      date DATE
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS seat(
      seat_id SERIAL PRIMARY KEY,
      movie_id INT,
      name_seat VARCHAR(35),
      isbooked BOOLEAN NOT NULL DEFAULT false,
      name VARCHAR(255)
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS image(
      image_id SERIAL PRIMARY KEY,
      movie_id INT,
      imgname VARCHAR(255),
      img BYTEA
    );
  `);
}

async function seedData() {
  // only seed if no movies
  const { rows } = await pool.query('SELECT count(*)::int AS cnt FROM movie');
  if (rows[0] && rows[0].cnt > 0) {
    console.log('Movies already present, skipping seed.');
    return;
  }

  console.log('Seeding sample movies and seats...');

  const movies = [
    { name: 'The Big Adventure', genre: 'Action', date: '2025-12-01', url: 'https://via.placeholder.com/100' },
    { name: 'Romantic Nights', genre: 'Romance', date: '2025-11-20', url: 'https://via.placeholder.com/100' },
    { name: 'Space Odyssey', genre: 'Sci-Fi', date: '2025-12-10', url: 'https://via.placeholder.com/100' },
    { name: 'Mystery Manor', genre: 'Thriller', date: '2025-12-05', url: 'https://via.placeholder.com/100' },
    { name: 'Comedy Hour', genre: 'Comedy', date: '2025-11-25', url: 'https://via.placeholder.com/100' },
    { name: 'Animated Fun', genre: 'Animation', date: '2025-12-20', url: 'https://via.placeholder.com/100' }
  ];

  for (const m of movies) {
    const r = await pool.query(
      'INSERT INTO movie(name, genre, date, url) VALUES($1,$2,$3,$4) RETURNING movie_id',
      [m.name, m.genre, m.date, m.url]
    );
    const movieId = r.rows[0].movie_id;
    // insert seats (30 seats)
    for (let i = 1; i <= 30; i++) {
      await pool.query('INSERT INTO seat(movie_id, name_seat, isbooked, name) VALUES($1,$2,$3,$4)', [
        movieId,
        `R${Math.ceil(i/6)}-S${(i%6)||6}`,
        false,
        null,
      ]);
    }
  }

  console.log('Seeding complete.');
}

async function attachUrls() {
  // ensure client-facing URL field exists or handle in client with placeholder
  try {
    const hasUrl = await pool.query("SELECT column_name FROM information_schema.columns WHERE table_name='movie' AND column_name='url'");
    if (hasUrl.rows.length === 0) {
      await pool.query("ALTER TABLE movie ADD COLUMN url VARCHAR(500);");
    }
    // set url placeholders
    await pool.query("UPDATE movie SET url = COALESCE(url, 'https://via.placeholder.com/100')");
  } catch (e) {
    console.warn('Could not attach url column: ', e.message || e);
  }
}

async function run() {
  try {
    // If migrations file exists, run it first
    const fs = require('fs');
    const migPath = 'migrations/001_schema.sql';
    if (fs.existsSync(migPath)) {
      const sql = fs.readFileSync(migPath, 'utf8');
      await pool.query(sql);
      console.log('Applied migrations');
    } else {
      await ensureSchema();
    }
    await seedData();
    await attachUrls();
    // create a default test user if not present
    try {
      const r = await pool.query("SELECT count(*)::int AS cnt FROM \"user\" WHERE email=$1", ['test@example.com']);
      if (r.rows[0].cnt === 0) {
        const bcrypt = require('bcryptjs');
        const pw = await bcrypt.hash('password', 10);
        await pool.query('INSERT INTO "user"(email, password, name) VALUES($1,$2,$3)', ['test@example.com', pw, 'Test User']);
        console.log('Created test user: test@example.com / password');
      }
    } catch (e) {
      console.warn('Could not create test user:', e.message || e);
    }
  } catch (err) {
    console.error('Seeding failed:', err);
  } finally {
    pool.end();
  }
}

run();
