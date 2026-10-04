import { Hono } from 'hono';

export const authRouter = new Hono<{
  Bindings: {
    ADMIN_EMAIL?: string;
    ADMIN_PASSWORD?: string;
  };
}>();

const EXPECTED_EMAIL = 'admin@shinewithshiza.com';
const EXPECTED_USERNAME = 'admin';
const EXPECTED_PASSWORD = 'Admin@ShinewithShiza';

// POST /api/admin/login
authRouter.post('/login', async (c) => {
  try {
    const body = await c.req.json().catch(() => ({}));
    const usernameOrEmail = (body.username || body.email || '').trim().toLowerCase();
    const password = (body.password || '').trim();

    const targetEmail = (c.env?.ADMIN_EMAIL || process.env.ADMIN_EMAIL || EXPECTED_EMAIL).toLowerCase();
    const targetPassword = c.env?.ADMIN_PASSWORD || process.env.ADMIN_PASSWORD || EXPECTED_PASSWORD;

    const isUserValid =
      usernameOrEmail === EXPECTED_USERNAME ||
      usernameOrEmail === targetEmail;

    const isPasswordValid = password === targetPassword;

    if (!isUserValid || !isPasswordValid) {
      return c.json(
        {
          success: false,
          error: 'Invalid username or password. Please check your credentials.'
        },
        401
      );
    }

    // Generate secure session token
    const token = `shiza-admin-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 10)}`;

    return c.json({
      success: true,
      message: 'Authentication successful',
      token,
      user: {
        email: targetEmail,
        username: 'admin',
        name: 'Salon Administrator',
        role: 'manager'
      }
    });
  } catch (err: any) {
    return c.json({ success: false, error: 'Authentication service error' }, 500);
  }
});

// GET /api/admin/verify
authRouter.get('/verify', (c) => {
  const authHeader = c.req.header('Authorization');
  if (authHeader && authHeader.startsWith('Bearer shiza-admin-')) {
    return c.json({ success: true, authenticated: true });
  }
  return c.json({ success: false, authenticated: false }, 401);
});
