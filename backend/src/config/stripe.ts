import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
});

export const PLAN_PRICES: Record<string, string> = {
  starter: 'price_starter_id',
  growth: 'price_growth_id',
  premium: 'price_premium_id',
};

export default stripe;
