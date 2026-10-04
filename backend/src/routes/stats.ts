import { Hono } from 'hono';
import { DatabaseService } from '../db/index';

export const statsRouter = new Hono<{ Bindings: { DB?: any } }>();

// GET /api/stats - dashboard analytics
statsRouter.get('/', async (c) => {
  try {
    const db = new DatabaseService(c.env?.DB);
    const stats = await db.getStats();
    return c.json({ success: true, data: stats });
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500);
  }
});
