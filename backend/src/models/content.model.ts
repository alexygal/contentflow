import pool from '../config/db';

export interface ContentItem {
  id: string;
  user_id: string;
  type: 'script' | 'caption' | 'email' | 'idea' | 'thumbnail';
  title: string;
  body: string;
  platform: string | null;
  status: 'draft' | 'pending' | 'approved' | 'rejected' | 'scheduled' | 'published';
  scheduled_at: Date | null;
  published_at: Date | null;
  created_at: Date;
  updated_at: Date;
}

export async function createContent(userId: string, data: Pick<ContentItem, 'type' | 'title' | 'body' | 'platform'>): Promise<ContentItem> {
  const { rows } = await pool.query<ContentItem>(
    `INSERT INTO content_items (user_id, type, title, body, platform)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [userId, data.type, data.title, data.body, data.platform ?? null]
  );
  return rows[0];
}

export async function listContentByUser(userId: string, status?: string): Promise<ContentItem[]> {
  if (status) {
    const { rows } = await pool.query<ContentItem>(
      'SELECT * FROM content_items WHERE user_id = $1 AND status = $2 ORDER BY created_at DESC',
      [userId, status]
    );
    return rows;
  }
  const { rows } = await pool.query<ContentItem>(
    'SELECT * FROM content_items WHERE user_id = $1 ORDER BY created_at DESC',
    [userId]
  );
  return rows;
}

export async function updateContentStatus(id: string, userId: string, status: ContentItem['status']): Promise<ContentItem | null> {
  const extra = status === 'published' ? ', published_at = NOW()' : '';
  const { rows } = await pool.query<ContentItem>(
    `UPDATE content_items SET status = $1${extra} WHERE id = $2 AND user_id = $3 RETURNING *`,
    [status, id, userId]
  );
  return rows[0] ?? null;
}

export async function deleteContent(id: string, userId: string): Promise<boolean> {
  const { rowCount } = await pool.query(
    'DELETE FROM content_items WHERE id = $1 AND user_id = $2',
    [id, userId]
  );
  return (rowCount ?? 0) > 0;
}
