import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { apiLimiter } from './middleware/rateLimiter';
import { errorHandler } from './middleware/errorHandler';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import contentRoutes from './routes/content.routes';
import billingRoutes from './routes/billing.routes';
import adminRoutes from './routes/admin.routes';
import teamRoutes from './routes/team.routes';

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_ORIGIN, credentials: true }));

// Raw body for Stripe webhook (must be before json middleware)
app.use('/api/billing/webhook', express.raw({ type: 'application/json' }));

app.use(express.json());
app.use(apiLimiter);

app.use('/api/auth',    authRoutes);
app.use('/api/users',   userRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/billing', billingRoutes);
app.use('/api/admin',   adminRoutes);
app.use('/api/team',    teamRoutes);

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

app.use(errorHandler);

export default app;
