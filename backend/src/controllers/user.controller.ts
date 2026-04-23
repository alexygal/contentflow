import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { findById, updateUser } from '../models/user.model';

export async function getMe(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const user = await findById(req.user!.sub);
    if (!user) { res.status(404).json({ error: 'User not found' }); return; }
    res.json(user);
  } catch (err) { next(err); }
}

export async function updateMe(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const { name, bio, website } = req.body;
    const updated = await updateUser(req.user!.sub, { name, bio, website });
    res.json(updated);
  } catch (err) { next(err); }
}

export async function getBrandSettings(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const { rows } = await (await import('../config/db')).default.query(
      'SELECT * FROM brand_settings WHERE user_id = $1',
      [req.user!.sub]
    );
    res.json(rows[0] ?? {});
  } catch (err) { next(err); }
}

export async function upsertBrandSettings(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const db = (await import('../config/db')).default;
    const {
      channel_name, niche, tone_of_voice, platforms, primary_color, secondary_color,
      brand_profile,
    } = req.body;

    // brand_profile is the full JSON from the comprehensive form (50+ fields).
    // Legacy fields kept for backward compat; brand_profile wins when present.
    const effectiveName    = brand_profile?.brandName    ?? channel_name;
    const effectiveNiche   = brand_profile?.primaryTopic ?? niche;
    const effectiveTone    = brand_profile?.primaryTone  ?? tone_of_voice;
    const effectivePrimary = brand_profile?.primaryColor ?? primary_color;
    const effectiveSecond  = brand_profile?.secondaryColor ?? secondary_color;
    const effectivePlats   = brand_profile?.preferredPlatforms ?? platforms;

    const { rows } = await db.query(
      `INSERT INTO brand_settings
         (user_id, channel_name, niche, tone_of_voice, platforms, primary_color, secondary_color, brand_profile_data)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
       ON CONFLICT (user_id) DO UPDATE SET
         channel_name=$2, niche=$3, tone_of_voice=$4, platforms=$5,
         primary_color=$6, secondary_color=$7, brand_profile_data=$8, updated_at=NOW()
       RETURNING *`,
      [req.user!.sub, effectiveName, effectiveNiche, effectiveTone,
       effectivePlats, effectivePrimary, effectiveSecond,
       brand_profile ? JSON.stringify(brand_profile) : null]
    );
    res.json(rows[0]);
  } catch (err) { next(err); }
}

export async function getNotificationPrefs(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const db = (await import('../config/db')).default;
    const { rows } = await db.query(
      'SELECT * FROM notification_prefs WHERE user_id = $1',
      [req.user!.sub]
    );
    res.json(rows[0] ?? {});
  } catch (err) { next(err); }
}

export async function upsertNotificationPrefs(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const db = (await import('../config/db')).default;
    const { edit_complete, approval, partnership, publish, analytics, billing } = req.body;
    const { rows } = await db.query(
      `INSERT INTO notification_prefs (user_id, edit_complete, approval, partnership, publish, analytics, billing)
       VALUES ($1,$2,$3,$4,$5,$6,$7)
       ON CONFLICT (user_id) DO UPDATE SET
         edit_complete=$2, approval=$3, partnership=$4, publish=$5, analytics=$6, billing=$7
       RETURNING *`,
      [req.user!.sub, edit_complete, approval, partnership, publish, analytics, billing]
    );
    res.json(rows[0]);
  } catch (err) { next(err); }
}
