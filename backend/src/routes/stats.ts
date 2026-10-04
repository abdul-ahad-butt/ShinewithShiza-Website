import { Hono } from 'hono';
import { DatabaseService } from '../db/index';
import type { Bindings } from '../index';

export const statsRouter = new Hono<{ Bindings: Bindings }>();

// GET /api/stats - dashboard analytics
statsRouter.get('/', async (c) => {
  try {
    const db = new DatabaseService(c.env?.['shinewithshiza-D1']);
    const stats = await db.getStats();
    return c.json({ success: true, data: stats });
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500);
  }
});
