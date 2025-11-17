const Pool = require('pg').Pool;
const os = require('os');

const DB_USER = process.env.DB_USER || process.env.USER || os.userInfo().username;
const DB_PASSWORD = process.env.DB_PASSWORD; // optional
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432;
const DB_NAME = process.env.DB_NAME || 'movieticket';

const config = {
  user: DB_USER,
  host: DB_HOST,
  port: DB_PORT,
  database: DB_NAME,
};

if (DB_PASSWORD) {
  config.password = DB_PASSWORD;
}

const pool = new Pool(config);

module.exports = pool;