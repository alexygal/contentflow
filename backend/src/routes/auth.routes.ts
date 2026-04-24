import { Router } from 'express';
import { authLimiter, loginLimiter, registerLimiter } from '../middleware/rateLimiter';
import { validate } from '../middleware/validate';
import {
  loginSchema,
  registerSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from '../utils/validators';
import {
  login,
  register,
  verifyEmail,
  forgotPassword,
  resetPassword,
} from '../controllers/auth.controller';

const router = Router();

router.post('/register', registerLimiter, validate(registerSchema), register);
router.post('/signup',   registerLimiter, validate(registerSchema), register);
router.post('/login',    loginLimiter,    validate(loginSchema),    login);
router.get('/verify-email/:token', verifyEmail);
router.post('/forgot-password', authLimiter, validate(forgotPasswordSchema), forgotPassword);
router.post('/reset-password',  authLimiter, validate(resetPasswordSchema),  resetPassword);

export default router;
