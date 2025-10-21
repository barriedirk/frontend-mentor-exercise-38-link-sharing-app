import { pool } from '../../db/pool';

export interface UserRow {
  id: number;
  email: string;
  password: string;
  first_name: string | null;
  last_name: string | null;
  slug: string | null;
  avatar_url: string | null;
  token_version: number;
  created_at: Date;
}

export class UserModel {
  static async checkEmailAndSlugNotDuplicated(
    email: string,
    slug: string,
    id: number
  ): Promise<UserRow | null> {
    const result = await pool.query<UserRow>(
      `SELECT * FROM devlinks_users WHERE (email = $1 OR slug = $2) and id != $3`,
      [email, slug, id ?? 0]
    );

    if (result.rowCount === 0) return null;

    return result.rows[0];
  }

  static async findByEmail(email: string): Promise<UserRow | null> {
    const result = await pool.query<UserRow>(
      `SELECT * FROM devlinks_users WHERE email = $1`,
      [email]
    );

    if (result.rowCount === 0) return null;

    return result.rows[0];
  }

  static async deleteOne(email: string): Promise<number> {
    const result = await pool.query(
      `DELETE FROM devlinks_users WHERE email = $1`,
      [email]
    );

    return result.rowCount ?? 0;
  }

  static async findBySlug(slug: string): Promise<UserRow | null> {
    const result = await pool.query<UserRow>(
      `SELECT * FROM devlinks_users WHERE slug = $1`,
      [slug]
    );

    if (result.rowCount === 0) return null;

    return result.rows[0];
  }

  static async findById(id: number): Promise<UserRow | null> {
    const result = await pool.query<UserRow>(
      `SELECT email, first_name, last_name, slug, avatar_url, id
       FROM devlinks_users
       WHERE id = $1`,
      [id]
    );

    if (result.rowCount === 0) return null;

    return result.rows[0];
  }

  static async create(user: {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    slug: string;
    avatar_url?: string;
  }): Promise<UserRow> {
    const { email, password, first_name, last_name, slug, avatar_url } = user;
    const result = await pool.query<UserRow>(
      `INSERT INTO devlinks_users (email, password, first_name, last_name, slug, avatar_url)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [email, password, first_name, last_name, slug, avatar_url ?? null]
    );

    return result.rows[0];
  }

  static async update(user: {
    id: number;
    email: string;
    password?: string;
    first_name: string;
    last_name: string;
    slug: string;
    avatar_url?: string | null;
  }): Promise<UserRow> {
    const { id, email, password, first_name, last_name, slug, avatar_url } =
      user;

    const values: any[] = [
      email,
      first_name,
      last_name,
      slug,
      avatar_url ?? null,
    ];
    let query = `
    UPDATE devlinks_users
    SET
      email = $1,
      first_name = $2,
      last_name = $3,
      slug = $4,
      avatar_url = $5
  `;

    if (password) {
      values.push(password);
      query += `, password = $6`;
    }

    values.push(id);
    query += ` WHERE id = $${values.length} RETURNING *`;

    const result = await pool.query<UserRow>(query, values);
    return result.rows[0];
  }

  static async incrementTokenVersion(userId: number): Promise<void> {
    await pool.query(
      `UPDATE devlinks_users SET token_version = token_version + 1 WHERE id = $1`,
      [userId]
    );
  }
}
