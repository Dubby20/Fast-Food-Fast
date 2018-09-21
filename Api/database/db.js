import pg from 'pg';
import config from '../config/config';

const client = new pg.Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

client.connect();