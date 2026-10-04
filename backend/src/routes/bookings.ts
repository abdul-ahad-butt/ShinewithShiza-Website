import { Hono } from 'hono';
import { DatabaseService } from '../db/index';
import { generateBookingWhatsAppUrl } from '../services/whatsapp';
import type { Bindings } from '../index';

export const bookingsRouter = new Hono<{ Bindings: Bindings }>();

// GET /api/appointments - fetch all bookings (optional status filter)
bookingsRouter.get('/', async (c) => {
  try {
    const status = c.req.query('status');
    const db = new DatabaseService(c.env?.['shinewithshiza-D1']);
    const appointments = await db.getAppointments(status);
    return c.json({ success: true, data: appointments });
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500);
  }
});

// POST /api/appointments - submit a booking lead
bookingsRouter.post('/', async (c) => {
  try {
    const body = await c.req.json().catch(() => ({}));
    const clientName = (body.client_name || body.clientName || '').trim();
    const phone = (body.phone || '').trim();
    const service = (body.service || '').trim();
    const date = (body.preferred_date || body.date || '').trim();
    const time = (body.preferred_time || body.time || '').trim();
    const notes = (body.notes || '').trim();
    const category = (body.category || 'general').trim();

    if (!clientName || !phone || !service || !date || !time) {
      return c.json({
        success: false,
        error: 'Missing required booking details (client_name, phone, service, date, time are required)'
      }, 400);
    }

    const salonPhone = c.env?.SALON_PHONE || '923374262774';
    const whatsappUrl = generateBookingWhatsAppUrl(
      { clientName, phone, service, category, date, time, notes },
      salonPhone
    );

    const db = new DatabaseService(c.env?.['shinewithshiza-D1']);
    const appointment = await db.createAppointment({
      client_name: clientName,
      phone,
      service,
      category: category || 'general',
      date,
      time,
      status: 'pending',
      notes: notes || '',
      whatsapp_url: whatsappUrl
    });

    return c.json({
      success: true,
      message: 'Salon appointment request received successfully',
      data: appointment,
      whatsappUrl
    }, 201);
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500);
  }
});

// PATCH /api/appointments/:id - update appointment status or notes
bookingsRouter.patch('/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const body = await c.req.json();
    const { status, notes } = body;

    const db = new DatabaseService(c.env?.['shinewithshiza-D1']);
    const updated = await db.updateAppointmentStatus(id, status, notes);

    if (!updated) {
      return c.json({ success: false, error: 'Appointment not found' }, 404);
    }

    return c.json({ success: true, data: updated });
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500);
  }
});

// DELETE /api/appointments/:id
bookingsRouter.delete('/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const db = new DatabaseService(c.env?.['shinewithshiza-D1']);
    const deleted = await db.deleteAppointment(id);
    return c.json({ success: true, deleted });
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500);
  }
});
