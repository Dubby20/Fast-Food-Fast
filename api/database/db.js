import pg from 'pg';
// import dotenv from 'dotenv';
// import migration from './migration.sql';

require('dotenv').config();

// if (process.env.NODE_ENV === 'DEVELOPMENT') {

  // else if (process.env.NODE_ENV === 'PRODUCTION') {
    const pool = new pg.Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: true
    });

  // } else {process.env.NODE_ENV === 'TEST'

  // }
// }
// pool.query(migration);
export default pool;