-- Shine with Shiza - Cloudflare D1 SQL Schema

DROP TABLE IF EXISTS appointments;
CREATE TABLE IF NOT EXISTS appointments (
  id TEXT PRIMARY KEY,
  client_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  service TEXT NOT NULL,
  category TEXT DEFAULT 'salon',
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  status TEXT DEFAULT 'pending', -- pending, confirmed, completed, cancelled
  notes TEXT,
  whatsapp_url TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS course_inquiries;
CREATE TABLE IF NOT EXISTS course_inquiries (
  id TEXT PRIMARY KEY,
  student_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  course_name TEXT NOT NULL,
  experience_level TEXT DEFAULT 'Beginner', -- Beginner, Intermediate, Professional
  notes TEXT,
  status TEXT DEFAULT 'new', -- new, contacted, enrolled, closed
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS active_deals;
CREATE TABLE IF NOT EXISTS active_deals (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  discount_pct INTEGER NOT NULL DEFAULT 50,
  code TEXT,
  badge_text TEXT,
  description TEXT,
  is_active INTEGER DEFAULT 1,
  valid_until TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Seed Initial Promotional Deals
INSERT INTO active_deals (id, title, discount_pct, code, badge_text, description, is_active, valid_until) VALUES
('deal-1', 'Basic to Advance Beautician Masterclass', 50, 'ACADEMY50', '50% OFF LIMITED SLOTS', 'Comprehensive professional certification covering bridal hair, HD contouring, hygiene, and live client handling.', 1, '2026-12-31'),
('deal-2', 'Royal Baroque Bridal Trio Bundle', 30, 'BAROQUE30', 'WEDDING SEASON SPECIAL', 'Signature Barat, Walima, and Nikkah glam package including free pre-bridal HydraFacial and hair spa treatment.', 1, '2026-11-30'),
('deal-3', 'HydraFacial Glow & Keratin Polish Combo', 25, 'GLOWSPA25', 'WEEKDAY EXCLUSIVE', 'Ultimate skin rejuvenation HydraFacial with deep scalp keratin nourishing treatment.', 1, '2026-10-31');

-- Seed Sample Bookings for Admin demonstration
INSERT INTO appointments (id, client_name, phone, service, category, date, time, status, notes) VALUES
('apt-101', 'Ayesha Malik', '+92 300 8472910', 'Barat Signature Bridal Glam', 'bridal', '2026-10-15', '02:00 PM', 'confirmed', 'Requires heavy jewelry setting & dupatta draping. Walima also booked.'),
('apt-102', 'Fatima Zahra', '+92 321 4455667', 'HydraFacial Deep Pore Glow', 'skin', '2026-10-08', '04:30 PM', 'pending', 'Sensitive skin pre-consultation requested.'),
('apt-103', 'Zara Khan', '+92 333 9988771', 'Brazilian Keratin Hair Rebonding', 'hair', '2026-10-10', '12:00 PM', 'confirmed', 'Shoulder-length hair, previous color treatment.'),
('apt-104', 'Mahnoor Ali', '+92 312 6677889', 'Soft Glam Evening Party Makeup', 'party', '2026-10-09', '06:00 PM', 'pending', 'Sister of the bride.');

-- Seed Sample Course Inquiries
INSERT INTO course_inquiries (id, student_name, phone, course_name, experience_level, notes, status) VALUES
('inq-201', 'Sana Tariq', '+92 301 5566778', 'Basic to Advance Beautician Course', 'Beginner', 'Wants weekend batches due to college schedule.', 'new'),
('inq-202', 'Hina Bilal', '+92 322 8899001', 'Bridal Eye & Hair Masterclass', 'Intermediate', 'Looking to open home studio in Bahria Town.', 'contacted');
