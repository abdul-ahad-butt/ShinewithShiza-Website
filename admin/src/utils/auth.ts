// Authentication & Session Token Management for Salon Admin

const AUTH_TOKEN_KEY = 'shine_with_shiza_admin_token';
const AUTH_USER_KEY = 'shine_with_shiza_admin_user';

export interface AdminUser {
  email: string;
  username: string;
  name: string;
  role: string;
}

export const AuthUtils = {
  getToken(): string | null {
    try {
      return localStorage.getItem(AUTH_TOKEN_KEY);
    } catch {
      return null;
    }
  },

  getUser(): AdminUser | null {
    try {
      const raw = localStorage.getItem(AUTH_USER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token && token.length > 5;
  },

  setSession(token: string, user: AdminUser): void {
    try {
      localStorage.setItem(AUTH_TOKEN_KEY, token);
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
    } catch (e) {
      console.warn('LocalStorage unavailable for session storage');
    }
  },

  clearSession(): void {
    try {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem(AUTH_USER_KEY);
    } catch (e) {
      console.warn('LocalStorage clear error');
    }
  }
};
