import { Pool } from 'pg';
import { getJWTValues } from '../utils/utils';

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = getJWTValues();

export const pool = new Pool({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // close idle clients after 30s
});

// example:
// import { pool } from '../db/pool';
// const result = await pool.query('SELECT * FROM users');
