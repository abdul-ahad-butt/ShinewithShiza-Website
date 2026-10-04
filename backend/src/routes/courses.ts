import { Hono } from 'hono';
import { DatabaseService } from '../db/index';
import { generateCourseWhatsAppUrl } from '../services/whatsapp';
import type { Bindings } from '../index';

export const coursesRouter = new Hono<{ Bindings: Bindings }>();

// GET /api/course-inquiries - fetch all student applicants
coursesRouter.get('/', async (c) => {
  try {
    const db = new DatabaseService(c.env?.['shinewithshiza-D1']);
    const inquiries = await db.getCourseInquiries();
    return c.json({ success: true, data: inquiries });
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500);
  }
});

// POST /api/course-inquiries - submit beautician academy inquiry
coursesRouter.post('/', async (c) => {
  try {
    const body = await c.req.json().catch(() => ({}));
    const studentName = (body.student_name || body.studentName || '').trim();
    const phone = (body.phone || '').trim();
    const courseName = (body.course_name || body.courseName || '').trim();
    const experienceLevel = (body.experience_level || body.experienceLevel || 'Beginner').trim();
    const notes = (body.notes || '').trim();

    if (!studentName || !phone || !courseName) {
      return c.json({
        success: false,
        error: 'Missing student_name, phone, or course_name'
      }, 400);
    }

    const salonPhone = c.env?.SALON_PHONE || '923374262774';
    const whatsappUrl = generateCourseWhatsAppUrl(
      { studentName, phone, courseName, experienceLevel, notes },
      salonPhone
    );

    const db = new DatabaseService(c.env?.['shinewithshiza-D1']);
    const inquiry = await db.createCourseInquiry({
      student_name: studentName,
      phone,
      course_name: courseName,
      experience_level: experienceLevel,
      notes: notes || ''
    });

    return c.json({
      success: true,
      message: 'Course admission inquiry recorded',
      data: inquiry,
      whatsappUrl
    }, 201);
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500);
  }
});

// PATCH /api/course-inquiries/:id - update status
coursesRouter.patch('/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const { status } = await c.req.json();
    const db = new DatabaseService(c.env?.['shinewithshiza-D1']);
    const updated = await db.updateCourseInquiryStatus(id, status);
    if (!updated) {
      return c.json({ success: false, error: 'Inquiry not found' }, 404);
    }
    return c.json({ success: true, data: updated });
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500);
  }
});
