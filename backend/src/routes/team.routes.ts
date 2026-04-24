import { Router, Response, NextFunction } from 'express';
import { authenticate, AuthRequest } from '../middleware/auth.middleware';
import pool from '../config/db';

const router = Router();

router.use(authenticate);

router.get('/dashboard', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.sub;
    const { rows } = await pool.query(
      'SELECT data FROM team_dashboard WHERE user_id = $1',
      [userId]
    );
    res.json(rows[0]?.data ?? null);
  } catch (err) { next(err); }
});

router.post('/dashboard', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.sub;
    await pool.query(
      `INSERT INTO team_dashboard (user_id, data, updated_at)
       VALUES ($1, $2, NOW())
       ON CONFLICT (user_id) DO UPDATE SET data = $2, updated_at = NOW()`,
      [userId, JSON.stringify(req.body)]
    );
    res.json({ success: true });
  } catch (err) { next(err); }
});

export default router;
