// Database adapter for Cloudflare D1 with local fallback

export interface Appointment {
  id: string;
  client_name: string;
  phone: string;
  service: string;
  category: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  whatsapp_url?: string;
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
  title: string;
  discount_pct: number;
  code?: string;
  badge_text?: string;
  description?: string;
  is_active: number;
  valid_until?: string;
  created_at: string;
}

// In-memory store for local live submissions and D1 fallback
let appointmentsMemory: Appointment[] = [];
let courseInquiriesMemory: CourseInquiry[] = [];

let dealsMemory: Deal[] = [
  {
    id: 'deal-1',
    title: 'Basic to Advance Beautician Masterclass',
    discount_pct: 50,
    code: 'ACADEMY50',
    badge_text: '50% OFF LIMITED SEATS',
    description: 'Comprehensive professional certification covering bridal hair, HD contouring, hygiene, and live client handling.',
    is_active: 1,
    valid_until: '2026-12-31',
    created_at: new Date().toISOString()
  },
  {
    id: 'deal-2',
    title: 'Royal Baroque Bridal Trio Bundle',
    discount_pct: 30,
    code: 'BAROQUE30',
    badge_text: 'WEDDING SEASON SPECIAL',
    description: 'Signature Barat, Walima, and Nikkah glam package including free pre-bridal HydraFacial and hair spa treatment.',
    is_active: 1,
    valid_until: '2026-11-30',
    created_at: new Date().toISOString()
  },
  {
    id: 'deal-3',
    title: 'HydraFacial Glow & Keratin Polish Combo',
    discount_pct: 25,
    code: 'GLOWSPA25',
    badge_text: 'WEEKDAY EXCLUSIVE',
    description: 'Ultimate skin rejuvenation HydraFacial with deep scalp keratin nourishing treatment.',
    is_active: 1,
    valid_until: '2026-10-31',
    created_at: new Date().toISOString()
  }
];

export class DatabaseService {
  private d1?: any;

  constructor(d1?: any) {
    this.d1 = d1;
  }

  // --- APPOINTMENTS ---
  async getAppointments(status?: string): Promise<Appointment[]> {
    if (this.d1) {
      let query = 'SELECT * FROM appointments ORDER BY created_at DESC';
      if (status) {
        const { results } = await this.d1.prepare('SELECT * FROM appointments WHERE status = ? ORDER BY created_at DESC').bind(status).all();
        return results as Appointment[];
      }
      const { results } = await this.d1.prepare(query).all();
      return results as Appointment[];
    }
    if (status) {
      return appointmentsMemory.filter(a => a.status === status);
    }
    return [...appointmentsMemory].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }

  async createAppointment(data: Omit<Appointment, 'id' | 'created_at'>): Promise<Appointment> {
    const id = `apt-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`;
    const created_at = new Date().toISOString();
    const newAppointment: Appointment = {
      id,
      ...data,
      created_at
    };

    if (this.d1) {
      await this.d1.prepare(
        `INSERT INTO appointments (id, client_name, phone, service, category, date, time, status, notes, whatsapp_url, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      ).bind(
        newAppointment.id,
        newAppointment.client_name,
        newAppointment.phone,
        newAppointment.service,
        newAppointment.category,
        newAppointment.date,
        newAppointment.time,
        newAppointment.status,
        newAppointment.notes || '',
        newAppointment.whatsapp_url || '',
        created_at
      ).run();
    } else {
      appointmentsMemory.unshift(newAppointment);
    }

    return newAppointment;
  }

  async updateAppointmentStatus(id: string, status: Appointment['status'], notes?: string): Promise<Appointment | null> {
    if (this.d1) {
      if (notes !== undefined) {
        await this.d1.prepare('UPDATE appointments SET status = ?, notes = ? WHERE id = ?').bind(status, notes, id).run();
      } else {
        await this.d1.prepare('UPDATE appointments SET status = ? WHERE id = ?').bind(status, id).run();
      }
      const { results } = await this.d1.prepare('SELECT * FROM appointments WHERE id = ?').bind(id).all();
      return (results[0] as Appointment) || null;
    }

    const item = appointmentsMemory.find(a => a.id === id);
    if (!item) return null;
    item.status = status;
    if (notes !== undefined) item.notes = notes;
    return item;
  }

  async deleteAppointment(id: string): Promise<boolean> {
    if (this.d1) {
      await this.d1.prepare('DELETE FROM appointments WHERE id = ?').bind(id).run();
      return true;
    }
    const idx = appointmentsMemory.findIndex(a => a.id === id);
    if (idx !== -1) {
      appointmentsMemory.splice(idx, 1);
      return true;
    }
    return false;
  }

  // --- COURSE INQUIRIES ---
  async getCourseInquiries(): Promise<CourseInquiry[]> {
    if (this.d1) {
      const { results } = await this.d1.prepare('SELECT * FROM course_inquiries ORDER BY created_at DESC').all();
      return results as CourseInquiry[];
    }
    return [...courseInquiriesMemory].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }

  async createCourseInquiry(data: Omit<CourseInquiry, 'id' | 'created_at' | 'status'>): Promise<CourseInquiry> {
    const id = `inq-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`;
    const created_at = new Date().toISOString();
    const newInquiry: CourseInquiry = {
      id,
      ...data,
      status: 'new',
      created_at
    };

    if (this.d1) {
      await this.d1.prepare(
        `INSERT INTO course_inquiries (id, student_name, phone, course_name, experience_level, notes, status, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
      ).bind(
        newInquiry.id,
        newInquiry.student_name,
        newInquiry.phone,
        newInquiry.course_name,
        newInquiry.experience_level,
        newInquiry.notes || '',
        newInquiry.status,
        created_at
      ).run();
    } else {
      courseInquiriesMemory.unshift(newInquiry);
    }

    return newInquiry;
  }

  async updateCourseInquiryStatus(id: string, status: CourseInquiry['status']): Promise<CourseInquiry | null> {
    if (this.d1) {
      await this.d1.prepare('UPDATE course_inquiries SET status = ? WHERE id = ?').bind(status, id).run();
      const { results } = await this.d1.prepare('SELECT * FROM course_inquiries WHERE id = ?').bind(id).all();
      return (results[0] as CourseInquiry) || null;
    }
    const item = courseInquiriesMemory.find(i => i.id === id);
    if (!item) return null;
    item.status = status;
    return item;
  }

  // --- DEALS ---
  async getDeals(activeOnly: boolean = true): Promise<Deal[]> {
    if (this.d1) {
      const query = activeOnly ? 'SELECT * FROM active_deals WHERE is_active = 1' : 'SELECT * FROM active_deals';
      const { results } = await this.d1.prepare(query).all();
      return results as Deal[];
    }
    if (activeOnly) {
      return dealsMemory.filter(d => d.is_active === 1);
    }
    return dealsMemory;
  }

  async toggleDeal(id: string, isActive: boolean): Promise<Deal | null> {
    if (this.d1) {
      await this.d1.prepare('UPDATE active_deals SET is_active = ? WHERE id = ?').bind(isActive ? 1 : 0, id).run();
      const { results } = await this.d1.prepare('SELECT * FROM active_deals WHERE id = ?').bind(id).all();
      return (results[0] as Deal) || null;
    }
    const item = dealsMemory.find(d => d.id === id);
    if (!item) return null;
    item.is_active = isActive ? 1 : 0;
    return item;
  }

  // --- STATS ---
  async getStats() {
    const appointments = await this.getAppointments();
    const inquiries = await this.getCourseInquiries();
    const deals = await this.getDeals(false);

    const pending = appointments.filter(a => a.status === 'pending').length;
    const confirmed = appointments.filter(a => a.status === 'confirmed').length;
    const completed = appointments.filter(a => a.status === 'completed').length;

    // Calculate top requested service
    const serviceCounts: Record<string, number> = {};
    for (const apt of appointments) {
      serviceCounts[apt.service] = (serviceCounts[apt.service] || 0) + 1;
    }
    let topService = 'Barat Signature Royal Bridal Glam';
    let maxCount = 0;
    for (const [srv, count] of Object.entries(serviceCounts)) {
      if (count > maxCount) {
        maxCount = count;
        topService = srv;
      }
    }

    return {
      totalBookings: appointments.length,
      pendingFollowups: pending,
      confirmedBookings: confirmed,
      completedBookings: completed,
      courseInquiries: inquiries.length,
      activeDealsCount: deals.filter(d => d.is_active === 1).length,
      topRequestedService: topService,
      conversionRate: appointments.length > 0 ? Math.round((confirmed / appointments.length) * 100) : 85
    };
  }
}
