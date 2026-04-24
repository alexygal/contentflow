import { Router, raw } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { createCheckoutSession, handleWebhook, listInvoices, getSubscription } from '../controllers/billing.controller';

const router = Router();

// Stripe webhook needs raw body — mount before json middleware applies
router.post('/webhook', raw({ type: 'application/json' }), handleWebhook as any);

router.use(authenticate);
router.post('/checkout', createCheckoutSession);
router.get('/subscription', getSubscription);
router.get('/invoices', listInvoices);

export default router;
