import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate';
import { profileUpdateSchema } from '../utils/validators';
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
router.patch('/me', validate(profileUpdateSchema), updateMe);
router.get('/me/brand', getBrandSettings);
router.put('/me/brand', upsertBrandSettings);
router.get('/me/notifications', getNotificationPrefs);
router.put('/me/notifications', upsertNotificationPrefs);

export default router;
