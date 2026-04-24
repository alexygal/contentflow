import { Request, Response, NextFunction } from 'express';

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction): void {
  const ts = new Date().toISOString();
  const message = err instanceof Error ? err.message : 'Internal server error';
  const status = (err as { status?: number }).status ?? 500;
  if (status >= 500) {
    console.error(`[${ts}] ERROR ${status}:`, err);
  }
  res.status(status).json({ error: message });
}
