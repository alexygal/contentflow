import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import stripe, { PLAN_PRICES } from '../config/stripe';
import pool from '../config/db';
import { findById, updateUser } from '../models/user.model';

export async function createCheckoutSession(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const { tier } = req.body as { tier: 'starter' | 'growth' | 'premium' };
    const user = await findById(req.user!.sub);
    if (!user) { res.status(404).json({ error: 'User not found' }); return; }

    let customerId = user.stripe_customer_id;
    if (!customerId) {
      const customer = await stripe.customers.create({ email: user.email, name: user.name });
      customerId = customer.id;
      await updateUser(req.user!.sub, { stripe_customer_id: customerId });
    }

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      line_items: [{ price: PLAN_PRICES[tier], quantity: 1 }],
      success_url: `${process.env.CLIENT_ORIGIN}/dashboard?upgraded=true`,
      cancel_url: `${process.env.CLIENT_ORIGIN}/pricing`,
      metadata: { user_id: req.user!.sub, tier },
    });

    res.json({ url: session.url });
  } catch (err) { next(err); }
}

export async function handleWebhook(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const sig = req.headers['stripe-signature'] as string;
    const event = stripe.webhooks.constructEvent(
      req.body as Buffer,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as { metadata: { user_id: string; tier: string }; subscription: string };
      const { user_id, tier } = session.metadata;
      await pool.query('UPDATE users SET tier = $1, stripe_subscription_id = $2 WHERE id = $3', [
        tier, session.subscription, user_id,
      ]);
    }

    if (event.type === 'customer.subscription.deleted') {
      const sub = event.data.object as { id: string };
      await pool.query("UPDATE users SET tier = 'starter' WHERE stripe_subscription_id = $1", [sub.id]);
    }

    res.json({ received: true });
  } catch (err) { next(err); }
}

export async function getSubscription(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const { rows } = await pool.query(
      'SELECT tier, updated_at FROM users WHERE id = $1',
      [req.user!.sub]
    );
    if (!rows[0]) { res.status(404).json({ error: 'User not found' }); return; }
    const tierPrices: Record<string, string> = {
      starter: '€500/month',
      growth: '€2,500/month',
      premium: '€5,000/month',
    };
    const tier = rows[0].tier as string;
    const nextDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      .toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    res.json({
      plan: tier.charAt(0).toUpperCase() + tier.slice(1),
      price: tierPrices[tier] ?? '€0/month',
      nextDate,
    });
  } catch (err) { next(err); }
}

export async function listInvoices(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const { rows } = await pool.query(
      'SELECT * FROM invoices WHERE user_id = $1 ORDER BY created_at DESC',
      [req.user!.sub]
    );
    res.json(rows);
  } catch (err) { next(err); }
}
