import { Hono } from 'hono';
import { DatabaseService } from '../db/index';

export const dealsRouter = new Hono<{ Bindings: { DB?: any } }>();

// GET /api/deals - retrieve active salon packages and course discounts
dealsRouter.get('/', async (c) => {
  try {
    const all = c.req.query('all') === 'true';
    const db = new DatabaseService(c.env?.DB);
    const deals = await db.getDeals(!all);
    return c.json({ success: true, data: deals });
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500);
  }
});

// PATCH /api/deals/:id/toggle - enable or disable deal
dealsRouter.patch('/:id/toggle', async (c) => {
  try {
    const id = c.req.param('id');
    const { isActive } = await c.req.json();
    const db = new DatabaseService(c.env?.DB);
    const updated = await db.toggleDeal(id, Boolean(isActive));
    if (!updated) {
      return c.json({ success: false, error: 'Deal not found' }, 404);
    }
    return c.json({ success: true, data: updated });
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500);
  }
});
