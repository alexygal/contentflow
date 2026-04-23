import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import {
  getMe,
  updateMe,
  getBrandSettings,
  upsertBrandSettings,
  getNotificationPrefs,
  upsertNotificationPrefs,
} from '../controllers/user.controller';

const router = Router();

router.use(authenticate);

router.get('/me', getMe);
router.patch('/me', updateMe);
router.get('/me/brand', getBrandSettings);
router.put('/me/brand', upsertBrandSettings);
router.get('/me/notifications', getNotificationPrefs);
router.put('/me/notifications', upsertNotificationPrefs);

export default router;
