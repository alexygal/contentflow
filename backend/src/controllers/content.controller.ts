import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import {
  createContent,
  listContentByUser,
  updateContentStatus,
  deleteContent,
} from '../models/content.model';
import { createApproval } from '../models/approval.model';

export async function listContent(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const { status } = req.query as { status?: string };
    const items = await listContentByUser(req.user!.sub, status);
    res.json(items);
  } catch (err) { next(err); }
}

export async function createContentItem(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const item = await createContent(req.user!.sub, req.body);
    res.status(201).json(item);
  } catch (err) { next(err); }
}

export async function approveContent(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = req.params['id'] as string;
    const updated = await updateContentStatus(id, req.user!.sub, 'approved');
    if (!updated) { res.status(404).json({ error: 'Content not found' }); return; }
    await createApproval(id, req.user!.sub, 'approved', req.body.note);
    res.json(updated);
  } catch (err) { next(err); }
}

export async function rejectContent(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = req.params['id'] as string;
    const updated = await updateContentStatus(id, req.user!.sub, 'rejected');
    if (!updated) { res.status(404).json({ error: 'Content not found' }); return; }
    await createApproval(id, req.user!.sub, 'rejected', req.body.note);
    res.json(updated);
  } catch (err) { next(err); }
}

export async function removeContent(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const ok = await deleteContent(req.params['id'] as string, req.user!.sub);
    if (!ok) { res.status(404).json({ error: 'Content not found' }); return; }
    res.status(204).end();
  } catch (err) { next(err); }
}
