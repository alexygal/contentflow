import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import pool from '../config/db';
import { listUsers, updateUser } from '../models/user.model';

export async function getStats(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const [usersRes, contentRes, revenueRes] = await Promise.all([
      pool.query('SELECT COUNT(*) AS total, COUNT(*) FILTER (WHERE role=\'admin\') AS admins FROM users'),
      pool.query('SELECT COUNT(*) AS total, COUNT(*) FILTER (WHERE status=\'published\') AS published FROM content_items'),
      pool.query("SELECT COALESCE(SUM(amount_eur),0) AS total FROM invoices WHERE status='paid'"),
    ]);
    res.json({
      users: usersRes.rows[0],
      content: contentRes.rows[0],
      revenue: revenueRes.rows[0],
    });
  } catch (err) { next(err); }
}

export async function getAllUsers(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const limit = Number(req.query.limit ?? 50);
    const offset = Number(req.query.offset ?? 0);
    const users = await listUsers(limit, offset);
    res.json(users);
  } catch (err) { next(err); }
}

export async function suspendUser(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    if (id === req.user!.sub) { res.status(400).json({ error: 'Cannot suspend yourself' }); return; }
    // We use bio field as a simple suspension flag for the mock; a real app adds a `suspended` column
    await pool.query("UPDATE users SET bio = '[SUSPENDED] ' || COALESCE(bio,'') WHERE id = $1", [id]);
    res.json({ message: 'User suspended' });
  } catch (err) { next(err); }
}

export async function getAllInvoices(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const { rows } = await pool.query(
      `SELECT i.*, u.email, u.name FROM invoices i
       JOIN users u ON u.id = i.user_id
       ORDER BY i.created_at DESC LIMIT 100`
    );
    res.json(rows);
  } catch (err) { next(err); }
}

export async function getSystemHealth(_req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    await pool.query('SELECT 1');
    res.json({
      db: 'ok',
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      timestamp: new Date().toISOString(),
    });
  } catch (err) { next(err); }
}
