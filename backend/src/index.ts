import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { authRouter } from './routes/auth';
import { bookingsRouter } from './routes/bookings';
import { coursesRouter } from './routes/courses';
import { dealsRouter } from './routes/deals';
import { statsRouter } from './routes/stats';

type Bindings = {
  DB?: any;
  SALON_NAME?: string;
  SALON_PHONE?: string;
  SALON_LOCATION?: string;
  ADMIN_EMAIL?: string;
  ADMIN_PASSWORD?: string;
  ADMIN_PIN?: string;
  CORS_ORIGIN?: string;
};

const app = new Hono<{ Bindings: Bindings }>();

// Logger Middleware
app.use('*', logger());

// Robust CORS Middleware
app.use('*', cors({
  origin: (origin) => {
    // Allow localhost, cloudflare preview domains, or any configured origin
    return origin || '*';
  },
  allowMethods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'X-Admin-PIN'],
  exposeHeaders: ['Content-Length'],
  maxAge: 86400,
  credentials: true,
}));

// Simple In-Memory Rate Limiting Tracker
const requestIpMap = new Map<string, { count: number; timestamp: number }>();

app.use('*', async (c, next) => {
  const ip = c.req.header('cf-connecting-ip') || c.req.header('x-forwarded-for') || '127.0.0.1';
  const now = Date.now();
  const entry = requestIpMap.get(ip) || { count: 0, timestamp: now };

  if (now - entry.timestamp > 60000) {
    entry.count = 1;
    entry.timestamp = now;
  } else {
    entry.count++;
  }
  requestIpMap.set(ip, entry);

  // Allow up to 120 requests/minute per IP
  if (entry.count > 120) {
    return c.json({ error: 'Too many requests. Please slow down.' }, 429);
  }

  await next();
});

// Root & Health Check
app.get('/', (c) => {
  return c.json({
    brand: 'Shine with Shiza',
    subtitle: 'Luxury Beauty Salon & Academy API',
    location: 'Model Town Link Road, Opposite Amanah Mall, Beside Jalal Sons, Lahore',
    status: 'online',
    version: '1.0.0',
    documentation: {
      endpoints: [
        'POST /api/appointments - Book salon slot (WhatsApp integrated)',
        'GET /api/appointments - List bookings (Admin)',
        'POST /api/course-inquiries - Apply for Beautician Academy',
        'GET /api/course-inquiries - List student inquiries (Admin)',
        'GET /api/deals - Active seasonal discounts',
        'GET /api/stats - Live salon KPIs & metrics'
      ]
    }
  });
});

app.get('/api/health', (c) => {
  return c.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Attach Modular Routers
app.route('/api/admin', authRouter);
app.route('/api/admin/bookings', bookingsRouter);
app.route('/api/admin/courses', coursesRouter);
app.route('/api/bookings', bookingsRouter);
app.route('/api/appointments', bookingsRouter);
app.route('/api/courses', coursesRouter);
app.route('/api/course-inquiries', coursesRouter);
app.route('/api/deals', dealsRouter);
app.route('/api/stats', statsRouter);

export default app;
