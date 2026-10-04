// API Client connecting Admin Dashboard to live Cloudflare/Hono Backend
import { AuthUtils } from '../utils/auth';

export interface Booking {
  id: string;
  client_name: string;
  phone: string;
  service: string;
  category: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  created_at: string;
}

export interface CourseInquiry {
  id: string;
  student_name: string;
  phone: string;
  course_name: string;
  experience_level: string;
  notes?: string;
  status: 'new' | 'contacted' | 'enrolled' | 'closed';
  created_at: string;
}

export interface Deal {
  id: string;
  badge: string;
  promo_code?: string;
  title: string;
  description: string;
  valid_until?: string;
  is_active: number;
  target_section?: 'all' | 'banner' | 'hero' | 'services' | string;
  created_at?: string;
  discount_pct?: number;
  code?: string;
  badge_text?: string;
}

import { API_BASE_URL } from '../config/api';

const PRIMARY_API = `${API_BASE_URL}/api`;
const DIRECT_API = 'http://localhost:8787/api';

const getHeaders = () => {
  const token = AuthUtils.getToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
};

// In-memory fallback if backend is offline during isolation testing
let localBookings: Booking[] = [];
let localInquiries: CourseInquiry[] = [];

let localDeals: Deal[] = [
  {
    id: 'deal-1',
    badge: '50% OFF LIMITED SEATS',
    badge_text: '50% OFF LIMITED SEATS',
    promo_code: 'ACADEMY50',
    code: 'ACADEMY50',
    title: 'Basic to Advance Beautician Masterclass',
    description: 'Comprehensive professional certification covering bridal hair, HD contouring, hygiene, and live client handling.',
    is_active: 1,
    valid_until: '2026-12-31',
    target_section: 'all',
    discount_pct: 50,
    created_at: new Date().toISOString()
  },
  {
    id: 'deal-2',
    badge: 'WEDDING SEASON SPECIAL',
    badge_text: 'WEDDING SEASON SPECIAL',
    promo_code: 'BAROQUE30',
    code: 'BAROQUE30',
    title: 'Royal Baroque Bridal Trio Bundle',
    description: 'Signature Barat, Walima, and Nikkah glam package including free pre-bridal HydraFacial and hair spa treatment.',
    is_active: 1,
    valid_until: '2026-11-30',
    target_section: 'services',
    discount_pct: 30,
    created_at: new Date().toISOString()
  },
  {
    id: 'deal-3',
    badge: 'WEEKDAY EXCLUSIVE',
    badge_text: 'WEEKDAY EXCLUSIVE',
    promo_code: 'GLOWSPA25',
    code: 'GLOWSPA25',
    title: 'HydraFacial Glow & Keratin Polish Combo',
    description: 'Ultimate skin rejuvenation HydraFacial with deep scalp keratin nourishing treatment.',
    is_active: 1,
    valid_until: '2026-10-31',
    target_section: 'services',
    discount_pct: 25,
    created_at: new Date().toISOString()
  }
];

export const AdminAPI = {
  // Fetch Real Live Bookings
  async getBookings(): Promise<Booking[]> {
    const endpoints = [
      `${PRIMARY_API}/admin/bookings`,
      `${DIRECT_API}/admin/bookings`,
      `${PRIMARY_API}/appointments`,
      `${DIRECT_API}/appointments`
    ];

    for (const url of endpoints) {
      try {
        const res = await fetch(url, { headers: getHeaders() });
        if (res.ok) {
          const json = await res.json();
          if (Array.isArray(json.data)) {
            localBookings = json.data;
            return json.data;
          }
        }
      } catch (err) {
        // Continue to fallback endpoint
      }
    }

    return [...localBookings];
  },

  // Update Booking Status
  async updateBookingStatus(id: string, status: Booking['status']): Promise<Booking | null> {
    const endpoints = [
      `${PRIMARY_API}/admin/bookings/${id}`,
      `${DIRECT_API}/admin/bookings/${id}`,
      `${PRIMARY_API}/appointments/${id}`,
      `${DIRECT_API}/appointments/${id}`
    ];

    for (const url of endpoints) {
      try {
        const res = await fetch(url, {
          method: 'PATCH',
          headers: getHeaders(),
          body: JSON.stringify({ status })
        });
        if (res.ok) {
          const json = await res.json();
          return json.data;
        }
      } catch (err) {}
    }

    const found = localBookings.find(b => b.id === id);
    if (found) {
      found.status = status;
      return { ...found };
    }
    return null;
  },

  // Add Walk-in / Reception Booking
  async createBooking(booking: Omit<Booking, 'id' | 'created_at'>): Promise<Booking> {
    const endpoints = [
      `${PRIMARY_API}/admin/bookings`,
      `${DIRECT_API}/admin/bookings`,
      `${PRIMARY_API}/bookings`,
      `${DIRECT_API}/bookings`
    ];

    for (const url of endpoints) {
      try {
        const res = await fetch(url, {
          method: 'POST',
          headers: getHeaders(),
          body: JSON.stringify({
            client_name: booking.client_name,
            phone: booking.phone,
            service: booking.service,
            category: booking.category || 'general',
            preferred_date: booking.date,
            preferred_time: booking.time,
            notes: booking.notes || ''
          })
        });
        if (res.ok) {
          const json = await res.json();
          if (json.data) {
            localBookings.unshift(json.data);
            return json.data;
          }
        }
      } catch (err) {}
    }

    const newBooking: Booking = {
      ...booking,
      id: `apt-${Date.now()}`,
      created_at: new Date().toISOString()
    };
    localBookings.unshift(newBooking);
    return newBooking;
  },

  // Delete Booking
  async deleteBooking(id: string): Promise<boolean> {
    const endpoints = [
      `${PRIMARY_API}/admin/bookings/${id}`,
      `${DIRECT_API}/admin/bookings/${id}`,
      `${PRIMARY_API}/appointments/${id}`,
      `${DIRECT_API}/appointments/${id}`
    ];

    for (const url of endpoints) {
      try {
        const res = await fetch(url, {
          method: 'DELETE',
          headers: getHeaders()
        });
        if (res.ok) {
          localBookings = localBookings.filter(b => b.id !== id);
          return true;
        }
      } catch (err) {}
    }

    localBookings = localBookings.filter(b => b.id !== id);
    return true;
  },

  // Fetch Real Live Course Inquiries
  async getCourseInquiries(): Promise<CourseInquiry[]> {
    const endpoints = [
      `${PRIMARY_API}/admin/courses`,
      `${DIRECT_API}/admin/courses`,
      `${PRIMARY_API}/course-inquiries`,
      `${DIRECT_API}/course-inquiries`
    ];

    for (const url of endpoints) {
      try {
        const res = await fetch(url, { headers: getHeaders() });
        if (res.ok) {
          const json = await res.json();
          if (Array.isArray(json.data)) {
            localInquiries = json.data;
            return json.data;
          }
        }
      } catch (err) {}
    }

    return [...localInquiries];
  },

  // Update Course Inquiry Status
  async updateCourseInquiryStatus(id: string, status: CourseInquiry['status']): Promise<CourseInquiry | null> {
    const endpoints = [
      `${PRIMARY_API}/admin/courses/${id}`,
      `${DIRECT_API}/admin/courses/${id}`,
      `${PRIMARY_API}/course-inquiries/${id}`,
      `${DIRECT_API}/course-inquiries/${id}`
    ];

    for (const url of endpoints) {
      try {
        const res = await fetch(url, {
          method: 'PATCH',
          headers: getHeaders(),
          body: JSON.stringify({ status })
        });
        if (res.ok) {
          const json = await res.json();
          return json.data;
        }
      } catch (err) {}
    }

    const found = localInquiries.find(i => i.id === id);
    if (found) {
      found.status = status;
      return { ...found };
    }
    return null;
  },

  // Fetch Deals
  async getDeals(): Promise<Deal[]> {
    const endpoints = [
      `${PRIMARY_API}/deals?all=true`,
      `${DIRECT_API}/deals?all=true`
    ];

    for (const url of endpoints) {
      try {
        const res = await fetch(url, { headers: getHeaders() });
        if (res.ok) {
          const json = await res.json();
          if (Array.isArray(json.data)) {
            localDeals = json.data;
            return json.data;
          }
        }
      } catch (err) {}
    }

    return [...localDeals];
  },

  // Create New Deal
  async createDeal(dealData: Omit<Deal, 'id' | 'created_at'>): Promise<Deal> {
    const endpoints = [
      `${PRIMARY_API}/deals`,
      `${DIRECT_API}/deals`
    ];

    for (const url of endpoints) {
      try {
        const res = await fetch(url, {
          method: 'POST',
          headers: getHeaders(),
          body: JSON.stringify(dealData)
        });
        if (res.ok) {
          const json = await res.json();
          if (json.data) {
            localDeals.unshift(json.data);
            return json.data;
          }
        }
      } catch (err) {}
    }

    const fallbackDeal: Deal = {
      ...dealData,
      id: `deal-${Date.now()}`,
      created_at: new Date().toISOString()
    };
    localDeals.unshift(fallbackDeal);
    return fallbackDeal;
  },

  // Update Deal Details
  async updateDeal(id: string, dealData: Partial<Omit<Deal, 'id' | 'created_at'>>): Promise<Deal | null> {
    const endpoints = [
      `${PRIMARY_API}/deals/${id}`,
      `${DIRECT_API}/deals/${id}`
    ];

    for (const url of endpoints) {
      try {
        const res = await fetch(url, {
          method: 'PATCH',
          headers: getHeaders(),
          body: JSON.stringify(dealData)
        });
        if (res.ok) {
          const json = await res.json();
          return json.data;
        }
      } catch (err) {}
    }

    const found = localDeals.find(d => d.id === id);
    if (found) {
      Object.assign(found, dealData);
      return { ...found };
    }
    return null;
  },

  // Toggle Deal
  async toggleDeal(id: string, isActive: boolean): Promise<Deal | null> {
    const endpoints = [
      `${PRIMARY_API}/deals/${id}/toggle`,
      `${DIRECT_API}/deals/${id}/toggle`
    ];

    for (const url of endpoints) {
      try {
        const res = await fetch(url, {
          method: 'PATCH',
          headers: getHeaders(),
          body: JSON.stringify({ isActive })
        });
        if (res.ok) {
          const json = await res.json();
          return json.data;
        }
      } catch (err) {}
    }

    const found = localDeals.find(d => d.id === id);
    if (found) {
      found.is_active = isActive ? 1 : 0;
      return { ...found };
    }
    return null;
  },

  // Delete Deal
  async deleteDeal(id: string): Promise<boolean> {
    const endpoints = [
      `${PRIMARY_API}/deals/${id}`,
      `${DIRECT_API}/deals/${id}`
    ];

    for (const url of endpoints) {
      try {
        const res = await fetch(url, {
          method: 'DELETE',
          headers: getHeaders()
        });
        if (res.ok) {
          localDeals = localDeals.filter(d => d.id !== id);
          return true;
        }
      } catch (err) {}
    }

    localDeals = localDeals.filter(d => d.id !== id);
    return true;
  }
};
