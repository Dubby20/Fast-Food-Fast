import pg from 'pg';

require('dotenv').config();
// dotenv.config();

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});


export default pool;