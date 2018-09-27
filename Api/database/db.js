import pg from 'pg';
import dotenv from 'dotenv';
// import migration from './migration.sql';

dotenv.config();

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

// pool.query(migration);
export default pool;