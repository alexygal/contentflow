import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import pool from '../config/db';
import { createUser, findByEmail } from '../models/user.model';
import { signToken } from '../utils/jwt';
import { sendVerificationEmail, sendPasswordResetEmail } from '../utils/email';

const SALT_ROUNDS = 12;

export async function register(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { name, email, password, tier = 'starter' } = req.body;

    if (await findByEmail(email)) {
      res.status(409).json({ error: 'Email already registered' });
      return;
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await createUser(email, passwordHash, name, tier);

    const token = crypto.randomBytes(32).toString('hex');
    await pool.query(
      `INSERT INTO api_keys (user_id, name, key_hash, prefix)
       VALUES ($1, 'email_verify', $2, $3)`,
      [user.id, crypto.createHash('sha256').update(token).digest('hex'), token.slice(0, 8)]
    );

    await sendVerificationEmail(email, token).catch(() => {});

    const jwt = signToken({ sub: user.id, email: user.email, role: user.role });
    res.status(201).json({ token: jwt, user: { id: user.id, email: user.email, name: user.name, role: user.role, tier: user.tier } });
  } catch (err) {
    next(err);
  }
}

export async function login(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { email, password } = req.body;
    const user = await findByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      res.status(401).json({ error: 'Invalid email or password' });
      return;
    }

    const token = signToken({ sub: user.id, email: user.email, role: user.role });
    res.json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role, tier: user.tier } });
  } catch (err) {
    next(err);
  }
}

export async function verifyEmail(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const token = req.params['token'] as string;
    const hash = crypto.createHash('sha256').update(token).digest('hex');

    const { rows } = await pool.query(
      `SELECT user_id FROM api_keys WHERE key_hash = $1 AND name = 'email_verify'`,
      [hash]
    );

    if (!rows[0]) {
      res.status(400).json({ error: 'Invalid or expired verification link' });
      return;
    }

    await pool.query('UPDATE users SET email_verified = TRUE WHERE id = $1', [rows[0].user_id]);
    await pool.query('DELETE FROM api_keys WHERE key_hash = $1', [hash]);

    res.json({ message: 'Email verified successfully' });
  } catch (err) {
    next(err);
  }
}

export async function forgotPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { email } = req.body;
    const user = await findByEmail(email);

    // Always respond 200 to avoid email enumeration
    if (!user) {
      res.json({ message: 'If that email exists, a reset link has been sent.' });
      return;
    }

    const token = crypto.randomBytes(32).toString('hex');
    const hash = crypto.createHash('sha256').update(token).digest('hex');
    const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await pool.query(
      `INSERT INTO api_keys (user_id, name, key_hash, prefix, last_used)
       VALUES ($1, 'password_reset', $2, $3, $4)
       ON CONFLICT DO NOTHING`,
      [user.id, hash, token.slice(0, 8), expires]
    );

    await sendPasswordResetEmail(email, token).catch(() => {});
    res.json({ message: 'If that email exists, a reset link has been sent.' });
  } catch (err) {
    next(err);
  }
}

export async function resetPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { token, password } = req.body;
    const hash = crypto.createHash('sha256').update(token).digest('hex');

    const { rows } = await pool.query(
      `SELECT user_id, last_used FROM api_keys WHERE key_hash = $1 AND name = 'password_reset'`,
      [hash]
    );

    if (!rows[0] || new Date(rows[0].last_used) < new Date()) {
      res.status(400).json({ error: 'Invalid or expired reset link' });
      return;
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    await pool.query('UPDATE users SET password_hash = $1 WHERE id = $2', [passwordHash, rows[0].user_id]);
    await pool.query('DELETE FROM api_keys WHERE key_hash = $1', [hash]);

    res.json({ message: 'Password reset successfully' });
  } catch (err) {
    next(err);
  }
}
