const rawUrl =
  import.meta.env.VITE_API_URL ||
  'https://shinewithshiza-website.shinewithshiza87.workers.dev';

// Strip trailing slashes to prevent double slashes
export const API_BASE_URL = (rawUrl || '').trim().replace(/\/+$/, '');

export const buildApiUrl = (path: string) => {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE_URL}${cleanPath}`;
};

export const endpoints = {
  login: `${API_BASE_URL}/api/admin/login`,
  verify: `${API_BASE_URL}/api/admin/verify`,
  bookings: `${API_BASE_URL}/api/admin/bookings`,
  courses: `${API_BASE_URL}/api/admin/courses`,
  deals: `${API_BASE_URL}/api/deals`,
  adminDeals: `${API_BASE_URL}/api/admin/deals`,
  stats: `${API_BASE_URL}/api/admin/stats`,
};
