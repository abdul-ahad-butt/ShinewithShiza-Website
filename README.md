# ✨ Shine With Shiza (Beauty Salon)

A luxury web application & administration portal for **Shine With Shiza**, Lahore's premier royal bridal studio and beautician training center.

---

## 📍 Business Dossier & Verified Profile
- **Salon Name:** Shine With Shiza (Beauty Salon)
- **Primary Phone & WhatsApp:** `+92 337 4262774`
- **Location:** Baby World Basement, Model Town Link Rd, Opp. Amanah Mall, near Jalal Sons, Phase 3 GECH Society, Lahore, 54600, Pakistan
- **Google Reviews & Rating:** 4.9 ★★★★★ (127+ Google Reviews)
- **Operating Hours:** Monday – Sunday: 11:00 AM – 08:30 PM
- **Official Social Links:**
  - Instagram: [@shinewithshiza](https://www.instagram.com/shinewithshiza)
  - TikTok: [@shinewithshizaofficial](https://www.tiktok.com/@shinewithshizaofficial)
  - YouTube: [@shinewithshiza-q8z5j](https://www.youtube.com/@shinewithshiza-q8z5j)

---

## 🏛️ Project Architecture

```
Shine with Shiza-Website/
├── frontend/             # High-conversion luxury customer website (Vite + React + Tailwind + Lucide)
├── admin/                # Private authenticated manager portal (React + Vite + Live Data Pipeline)
├── backend/              # Cloudflare Workers / Hono API & SQLite D1 data services
├── package.json          # Root npm workspaces configuration
└── .gitignore            # Clean git exclusion rules
```

---

## 🚀 Quick Start & Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Applications

- **Client Website** (Port `5173`):
  ```bash
  npm run dev --workspace=frontend
  ```

- **Private Admin Portal** (Port `5174`):
  ```bash
  npm run dev --workspace=admin
  ```

- **Backend API Server** (Port `8787`):
  ```bash
  npm run dev:local --workspace=backend
  ```

---

## 💄 Core Features

1. **Client Experience (`frontend/`):**
   - Royal Obsidian & Gold Aesthetic.
   - 2-Month Beautician Masterclass with 50% Off Highlight.
   - Interactive Draggable Before & After Transformation Slider.
   - Instant WhatsApp Click-to-Chat Deep Linking engine.
   - Multi-step VIP Appointment & Course Enrollment Modal.
   - Google Maps navigation with exact landmarks (Baby World Basement, opposite Amanah Mall).

2. **Management & Operations (`admin/`):**
   - Protected Staff Authentication (`admin@shinewithshiza.com`).
   - Live real-time appointment tracking and status updates (Pending, Confirmed, Completed, Cancelled).
   - Beautician course inquiries table with 1-click WhatsApp follow-up link generator.
   - Revenue analytics, category breakdowns, and booking velocity metrics.

3. **Backend Engine (`backend/`):**
   - High-performance Hono API server.
   - Cloudflare D1 / SQLite database with appointment and inquiry schemas.
   - WhatsApp link formatting and sanitization service.

---

## 📜 License
Private & Proprietary - © Shine With Shiza. All rights reserved.
