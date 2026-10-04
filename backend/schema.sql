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

DROP TABLE IF EXISTS deals;
CREATE TABLE IF NOT EXISTS deals (
  id TEXT PRIMARY KEY,
  badge TEXT NOT NULL,              -- e.g. "50% OFF LIMITED SEATS", "WEDDING SPECIAL"
  promo_code TEXT,                  -- e.g. "ACADEMY50", "BAROQUE30"
  title TEXT NOT NULL,              -- e.g. "Basic to Advance Beautician Masterclass"
  description TEXT NOT NULL,
  valid_until TEXT,                 -- e.g. "2026-12-31"
  is_active INTEGER DEFAULT 1,      -- 1 = Active, 0 = Inactive
  target_section TEXT DEFAULT 'all', -- 'banner', 'hero', 'services', 'all'
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Backward compatibility view
DROP VIEW IF EXISTS active_deals;
CREATE VIEW IF NOT EXISTS active_deals AS SELECT id, title, badge AS badge_text, promo_code AS code, description, is_active, valid_until, created_at FROM deals;

-- Seed Initial Promotional Deals
INSERT INTO deals (id, badge, promo_code, title, description, valid_until, is_active, target_section) VALUES
('deal-1', '50% OFF LIMITED SEATS', 'ACADEMY50', 'Basic to Advance Beautician Masterclass', 'Comprehensive professional certification covering bridal hair, HD contouring, hygiene, and live client handling.', '2026-12-31', 1, 'all'),
('deal-2', 'WEDDING SEASON SPECIAL', 'BAROQUE30', 'Royal Baroque Bridal Trio Bundle', 'Signature Barat, Walima, and Nikkah glam package including free pre-bridal HydraFacial and hair spa treatment.', '2026-11-30', 1, 'services'),
('deal-3', 'WEEKDAY EXCLUSIVE', 'GLOWSPA25', 'HydraFacial Glow & Keratin Polish Combo', 'Ultimate skin rejuvenation HydraFacial with deep scalp keratin nourishing treatment.', '2026-10-31', 1, 'services');

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
