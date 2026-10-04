const rawUrl =
  import.meta.env.VITE_API_URL ||
  'https://shinewithshiza-website.shinewithshiza87.workers.dev';

// Strip trailing slashes to eliminate double slashes like .workers.dev//api
export const API_BASE_URL = (rawUrl || '').trim().replace(/\/+$/, '');

export const buildApiUrl = (path: string) => {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE_URL}${cleanPath}`;
};
