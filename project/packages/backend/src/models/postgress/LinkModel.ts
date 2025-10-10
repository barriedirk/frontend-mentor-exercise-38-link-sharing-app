import { pool } from '../../db/pool';

export interface LinkRow {
  id: number;
  user_id: number;
  platform: string;
  url: string;
  position: number;
  created_at: Date;
}

export class LinkModel {
  static async findByUser(userId: number): Promise<LinkRow[]> {
    const result = await pool.query<LinkRow>(
      'SELECT * FROM devlinks_links WHERE user_id = $1 ORDER BY position ASC',
      [userId]
    );
    return result.rows;
  }

  static async replaceLinks(
    userId: number,
    links: { platform: string; url: string; position?: number | undefined }[]
  ) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      await client.query('DELETE FROM devlinks_links WHERE user_id = $1', [
        userId,
      ]);

      for (const link of links) {
        await client.query(
          `INSERT INTO devlinks_links (user_id, platform, url, position) VALUES ($1, $2, $3, $4)`,
          [userId, link.platform, link.url, link.position]
        );
      }

      await client.query('COMMIT');
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  }

  static async create(
    userId: number,
    link: { platform: string; url: string; position?: number }
  ): Promise<LinkRow> {
    const { platform, url, position = 0 } = link;
    const result = await pool.query<LinkRow>(
      `INSERT INTO devlinks_links (user_id, platform, url, position)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [userId, platform, url, position]
    );
    return result.rows[0];
  }

  static async update(
    linkId: number,
    userId: number,
    link: { platform?: string; url?: string; position?: number }
  ): Promise<LinkRow | null> {
    // Only update fields that are provided
    const fields: string[] = [];
    const values: any[] = [];
    let idx = 1;

    if (link.platform !== undefined) {
      fields.push(`platform = $${idx++}`);
      values.push(link.platform);
    }
    if (link.url !== undefined) {
      fields.push(`url = $${idx++}`);
      values.push(link.url);
    }
    if (link.position !== undefined) {
      fields.push(`position = $${idx++}`);
      values.push(link.position);
    }
    if (fields.length === 0) {
      // Nothing to update
      return null;
    }

    // Add user_id and linkId constraints to ensure user owns this link
    values.push(userId);
    values.push(linkId);

    const sql = `UPDATE devlinks_links SET ${fields.join(', ')}
      WHERE user_id = $${idx++} AND id = $${idx}
      RETURNING *`;

    const result = await pool.query<LinkRow>(sql, values);
    if (result.rowCount === 0) return null;
    return result.rows[0];
  }

  static async delete(linkId: number, userId: number): Promise<boolean> {
    const result = await pool.query(
      `DELETE FROM devlinks_links WHERE id = $1 AND user_id = $2`,
      [linkId, userId]
    );

    return (result.rowCount ?? 0) > 0;
  }
}
