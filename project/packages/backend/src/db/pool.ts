import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  user: process.env.DB_USER || 'linkuser',
  password: process.env.DB_PASSWORD || 'linkpassword',
  database: process.env.DB_NAME || 'linkdb',
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // close idle clients after 30s
});

// import { pool } from '../db/pool';
// const result = await pool.query('SELECT * FROM users');
