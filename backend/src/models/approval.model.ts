import pool from '../config/db';

export interface Approval {
  id: string;
  content_id: string;
  reviewed_by: string | null;
  action: 'approved' | 'rejected';
  note: string | null;
  created_at: Date;
}

export async function createApproval(
  contentId: string,
  reviewedBy: string,
  action: 'approved' | 'rejected',
  note?: string
): Promise<Approval> {
  const { rows } = await pool.query<Approval>(
    `INSERT INTO approvals (content_id, reviewed_by, action, note)
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [contentId, reviewedBy, action, note ?? null]
  );
  return rows[0];
}

export async function listApprovalsByContent(contentId: string): Promise<Approval[]> {
  const { rows } = await pool.query<Approval>(
    'SELECT * FROM approvals WHERE content_id = $1 ORDER BY created_at DESC',
    [contentId]
  );
  return rows;
}
