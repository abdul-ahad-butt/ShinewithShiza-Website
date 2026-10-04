import { Hono } from 'hono';
import { DatabaseService } from '../db/index';

export const dealsRouter = new Hono<{ Bindings: { DB?: any } }>();

// GET /api/deals - retrieve salon packages and course discounts
dealsRouter.get('/', async (c) => {
  try {
    const all = c.req.query('all') === 'true';
    const activeOnly = c.req.query('active') === '1' || (!all && c.req.query('all') !== 'false' && c.req.query('active') !== '0');
    const section = c.req.query('section') || undefined;

    const db = new DatabaseService(c.env?.DB);
    // If explicitly requesting all deals (like admin does with ?all=true), activeOnly = false
    const deals = await db.getDeals(all ? false : activeOnly, section);
    return c.json({ success: true, data: deals });
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500);
  }
});

// GET /api/deals/:id - retrieve a single deal
dealsRouter.get('/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const db = new DatabaseService(c.env?.DB);
    const deal = await db.getDealById(id);
    if (!deal) {
      return c.json({ success: false, error: 'Deal not found' }, 404);
    }
    return c.json({ success: true, data: deal });
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500);
  }
});

// POST /api/deals - create a new promotional deal or banner
dealsRouter.post('/', async (c) => {
  try {
    const body = await c.req.json();
    const { title, description, badge, badge_text, promo_code, code, valid_until, is_active, target_section, discount_pct } = body;

    if (!title || !description) {
      return c.json({ success: false, error: 'Title and description are required' }, 400);
    }

    const db = new DatabaseService(c.env?.DB);
    const newDeal = await db.createDeal({
      title: String(title).trim(),
      description: String(description).trim(),
      badge: String(badge || badge_text || `${discount_pct || 50}% OFF`).trim(),
      promo_code: promo_code || code || '',
      valid_until: valid_until || undefined,
      is_active: is_active === undefined ? 1 : (Number(is_active) === 1 ? 1 : 0),
      target_section: target_section || 'all',
      discount_pct: Number(discount_pct) || 50
    });

    return c.json({ success: true, data: newDeal }, 201);
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500);
  }
});

// PATCH /api/deals/:id - update existing deal details
dealsRouter.patch('/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const body = await c.req.json();
    const db = new DatabaseService(c.env?.DB);

    const updateData: any = {};
    if (body.title !== undefined) updateData.title = String(body.title).trim();
    if (body.description !== undefined) updateData.description = String(body.description).trim();
    if (body.badge !== undefined || body.badge_text !== undefined) {
      updateData.badge = String(body.badge || body.badge_text).trim();
    }
    if (body.promo_code !== undefined || body.code !== undefined) {
      updateData.promo_code = String(body.promo_code !== undefined ? body.promo_code : body.code).trim();
    }
    if (body.valid_until !== undefined) updateData.valid_until = body.valid_until;
    if (body.is_active !== undefined) updateData.is_active = Number(body.is_active) === 1 ? 1 : 0;
    if (body.target_section !== undefined) updateData.target_section = body.target_section;
    if (body.discount_pct !== undefined) updateData.discount_pct = Number(body.discount_pct);

    const updated = await db.updateDeal(id, updateData);
    if (!updated) {
      return c.json({ success: false, error: 'Deal not found' }, 404);
    }
    return c.json({ success: true, data: updated });
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500);
  }
});

// PATCH /api/deals/:id/toggle - enable or disable deal
dealsRouter.patch('/:id/toggle', async (c) => {
  try {
    const id = c.req.param('id');
    const body = await c.req.json().catch(() => ({}));
    const db = new DatabaseService(c.env?.DB);

    let nextActiveState: boolean;
    if (body.isActive !== undefined) {
      nextActiveState = Boolean(body.isActive);
    } else {
      const existing = await db.getDealById(id);
      if (!existing) {
        return c.json({ success: false, error: 'Deal not found' }, 404);
      }
      nextActiveState = existing.is_active !== 1;
    }

    const updated = await db.toggleDeal(id, nextActiveState);
    if (!updated) {
      return c.json({ success: false, error: 'Deal not found' }, 404);
    }
    return c.json({ success: true, data: updated });
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500);
  }
});

// DELETE /api/deals/:id - remove deal
dealsRouter.delete('/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const db = new DatabaseService(c.env?.DB);
    const deleted = await db.deleteDeal(id);
    if (!deleted) {
      return c.json({ success: false, error: 'Deal not found or could not be deleted' }, 404);
    }
    return c.json({ success: true, message: 'Deal deleted successfully', id });
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500);
  }
});
