import { pool } from '../../db/pool';

export interface UserRow {
  id: number;
  email: string;
  password: string;
  full_name: string | null;
  avatar_url: string | null;
  token_version: number;
  created_at: Date;
}

export class UserModel {
  static async findByEmail(email: string): Promise<UserRow | null> {
    const result = await pool.query<UserRow>(
      `SELECT * FROM devlinks_users WHERE email = $1`,
      [email]
    );

    if (result.rowCount === 0) return null;

    return result.rows[0];
  }

  static async create(user: {
    email: string;
    password: string; // already hashed
    full_name: string;
    avatar_url?: string;
  }): Promise<UserRow> {
    const { email, password, full_name, avatar_url } = user;
    const result = await pool.query<UserRow>(
      `INSERT INTO devlinks_users (email, password, full_name, avatar_url)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [email, password, full_name, avatar_url ?? null]
    );

    return result.rows[0];
  }

  static async incrementTokenVersion(userId: number): Promise<void> {
    await pool.query(
      `UPDATE devlinks_users SET token_version = token_version + 1 WHERE id = $1`,
      [userId]
    );
  }
}
