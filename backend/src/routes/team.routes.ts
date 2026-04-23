import { Router, Request, Response } from 'express';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticate);

router.get('/dashboard', async (req: Request, res: Response) => {
  try {
    const { db } = req.app.locals;
    if (!db) return res.status(503).json({ message: 'Database not available' });

    const result = await db.query(
      'SELECT data FROM team_dashboard WHERE user_id = $1',
      [(req as any).user.id]
    );
    if (result.rows.length === 0) return res.json(null);
    res.json(result.rows[0].data);
  } catch {
    res.status(500).json({ message: 'Failed to load team dashboard' });
  }
});

router.post('/dashboard', async (req: Request, res: Response) => {
  try {
    const { db } = req.app.locals;
    if (!db) return res.status(503).json({ message: 'Database not available' });

    const userId = (req as any).user.id;
    await db.query(
      `INSERT INTO team_dashboard (user_id, data, updated_at)
       VALUES ($1, $2, NOW())
       ON CONFLICT (user_id) DO UPDATE SET data = $2, updated_at = NOW()`,
      [userId, JSON.stringify(req.body)]
    );
    res.json({ success: true });
  } catch {
    res.status(500).json({ message: 'Failed to save team dashboard' });
  }
});

export default router;
