import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { authRouter } from './routes/auth';
import { bookingsRouter } from './routes/bookings';
import { coursesRouter } from './routes/courses';
import { dealsRouter } from './routes/deals';
import { statsRouter } from './routes/stats';

export type Bindings = {
  'shinewithshiza-D1'?: D1Database;
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

// Enable CORS for Cloudflare Pages, Admin Portal, preview domains, and local testing
app.use('*', cors({
  origin: (origin) => {
    const allowed = [
      'https://shinewithshiza-website.pages.dev',
      'https://shinewithshiza-website-admin.pages.dev',
      'http://localhost:5173',
      'http://localhost:5174'
    ];
    if (!origin || allowed.includes(origin)) return origin || '*';
    if (
      origin.endsWith('.pages.dev') ||
      origin.endsWith('.workers.dev') ||
      origin.includes('localhost') ||
      origin.includes('127.0.0.1') ||
      origin.includes('shinewithshiza')
    ) {
      return origin;
    }
    return allowed[0];
  },
  allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'X-Admin-PIN'],
  exposeHeaders: ['Content-Length'],
  maxAge: 86400,
  credentials: true,
}));

// Normalize duplicate slashes in incoming request URLs (e.g. //api/deals -> /api/deals)
app.use('*', async (c, next) => {
  const url = new URL(c.req.url);
  if (url.pathname.includes('//')) {
    const cleanPath = url.pathname.replace(/\/+/g, '/');
    return c.redirect(cleanPath + url.search, 307);
  }
  await next();
});

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

// Root Endpoint: API Information & Health Check
app.get('/', (c) => {
  return c.json({
    status: 'online',
    service: 'Shine with Shiza Salon & Academy Backend API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      deals: '/api/deals',
      bookings: '/api/bookings',
      courses: '/api/courses',
      admin: '/api/admin/*'
    }
  });
});

app.get('/health', (c) => c.json({ ok: true, timestamp: new Date().toISOString() }));
app.get('/api/health', (c) => c.json({ ok: true, timestamp: new Date().toISOString() }));

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
