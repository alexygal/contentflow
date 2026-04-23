import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate';
import { contentCreateSchema } from '../utils/validators';
import {
  listContent,
  createContentItem,
  approveContent,
  rejectContent,
  removeContent,
} from '../controllers/content.controller';

const router = Router();

router.use(authenticate);

router.get('/', listContent);
router.post('/', validate(contentCreateSchema), createContentItem);
router.post('/:id/approve', approveContent);
router.post('/:id/reject', rejectContent);
router.delete('/:id', removeContent);

export default router;
