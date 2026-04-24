import 'dotenv/config';
import app from './app';

const REQUIRED_ENV = ['JWT_SECRET', 'DATABASE_URL'] as const;
const missing = REQUIRED_ENV.filter(k => !process.env[k]);
if (missing.length) {
  console.error(`[startup] Missing required environment variables: ${missing.join(', ')}`);
  process.exit(1);
}

if (process.env.JWT_SECRET === 'change_me_to_a_long_random_string') {
  console.error('[startup] JWT_SECRET must not use the default placeholder value in production');
  if (process.env.NODE_ENV === 'production') process.exit(1);
}

const PORT = Number(process.env.PORT ?? 4000);

app.listen(PORT, () => {
  console.log(`[${new Date().toISOString()}] ContentFlow API running on http://localhost:${PORT} (${process.env.NODE_ENV ?? 'development'})`);
});
