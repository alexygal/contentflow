import pool from '../config/db';

export interface User {
  id: string;
  email: string;
  password_hash: string;
  name: string;
  role: 'creator' | 'admin';
  tier: 'starter' | 'growth' | 'premium';
  bio: string | null;
  website: string | null;
  avatar_url: string | null;
  email_verified: boolean;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  created_at: Date;
  updated_at: Date;
}

export type PublicUser = Omit<User, 'password_hash'>;

export async function findByEmail(email: string): Promise<User | null> {
  const { rows } = await pool.query<User>('SELECT * FROM users WHERE email = $1', [email]);
  return rows[0] ?? null;
}

export async function findById(id: string): Promise<PublicUser | null> {
  const { rows } = await pool.query<PublicUser>(
    'SELECT id,email,name,role,tier,bio,website,avatar_url,email_verified,stripe_customer_id,stripe_subscription_id,created_at,updated_at FROM users WHERE id = $1',
    [id]
  );
  return rows[0] ?? null;
}

export async function createUser(
  email: string,
  passwordHash: string,
  name: string,
  tier: string = 'starter'
): Promise<User> {
  const { rows } = await pool.query<User>(
    `INSERT INTO users (email, password_hash, name, tier)
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [email, passwordHash, name, tier]
  );
  return rows[0];
}

export async function updateUser(id: string, fields: Partial<Pick<User, 'name' | 'bio' | 'website' | 'avatar_url' | 'email_verified' | 'stripe_customer_id' | 'stripe_subscription_id'>>): Promise<PublicUser | null> {
  const keys = Object.keys(fields) as (keyof typeof fields)[];
  if (keys.length === 0) return findById(id);

  const setClauses = keys.map((k, i) => `${k} = $${i + 2}`).join(', ');
  const values = keys.map(k => fields[k]);

  const { rows } = await pool.query<PublicUser>(
    `UPDATE users SET ${setClauses} WHERE id = $1
     RETURNING id,email,name,role,tier,bio,website,avatar_url,email_verified,stripe_customer_id,stripe_subscription_id,created_at,updated_at`,
    [id, ...values]
  );
  return rows[0] ?? null;
}

export async function listUsers(limit = 50, offset = 0): Promise<PublicUser[]> {
  const { rows } = await pool.query<PublicUser>(
    `SELECT id,email,name,role,tier,bio,website,avatar_url,email_verified,created_at,updated_at
     FROM users ORDER BY created_at DESC LIMIT $1 OFFSET $2`,
    [limit, offset]
  );
  return rows;
}
