// Client API service for real-time promotional deals and banners

export interface Deal {
  id: string;
  badge: string;
  promo_code?: string;
  title: string;
  description: string;
  valid_until?: string;
  is_active: number;
  target_section?: string;
  created_at?: string;
  discount_pct?: number;
  code?: string;
  badge_text?: string;
}

import { API_BASE_URL } from '../config/api';

const PRIMARY_API = `${API_BASE_URL}/api/deals?active=1`;
const RELATIVE_API = '/api/deals?active=1';
const DIRECT_API = 'http://localhost:8787/api/deals?active=1';

// Luxury default fallback in case offline
const DEFAULT_FALLBACK_DEALS: Deal[] = [
  {
    id: 'deal-1',
    badge: '50% OFF LIMITED SEATS',
    badge_text: '50% OFF LIMITED SEATS',
    promo_code: 'ACADEMY50',
    code: 'ACADEMY50',
    title: 'Basic to Advance Beautician Masterclass (2 Months)',
    description: 'Comprehensive professional certification covering bridal hair, HD contouring, hygiene, and live client handling.',
    is_active: 1,
    valid_until: '2026-12-31',
    target_section: 'all',
    discount_pct: 50
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
    discount_pct: 30
  }
];

export const DealsClientAPI = {
  async getActiveDeals(): Promise<Deal[]> {
    const endpoints = [PRIMARY_API, RELATIVE_API, DIRECT_API];

    for (const url of endpoints) {
      try {
        const res = await fetch(url, {
          headers: { 'Content-Type': 'application/json' }
        });
        if (res.ok) {
          const json = await res.json();
          if (Array.isArray(json.data)) {
            return json.data;
          }
        }
      } catch (err) {
        // Fall through to next endpoint
      }
    }

    return DEFAULT_FALLBACK_DEALS;
  }
};
