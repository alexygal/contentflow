import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { requireAdmin } from '../middleware/admin.middleware';
import { getStats, getAllUsers, suspendUser, getAllInvoices, getSystemHealth } from '../controllers/admin.controller';

const router = Router();

router.use(authenticate, requireAdmin);

router.get('/stats', getStats);
router.get('/users', getAllUsers);
router.post('/users/:id/suspend', suspendUser);
router.get('/invoices', getAllInvoices);
router.get('/health', getSystemHealth);

export default router;
