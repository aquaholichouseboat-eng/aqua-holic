# AQUA_HOLIC – Premium Houseboat Website & Sanity CMS

Decoupled architecture featuring a modern **Next.js (App Router)** customer-facing website and an independent **Sanity Studio CMS** for content management.

---

## Architecture Overview

```text
AQUA_HOLIC/
├── website/                     # Public-Facing Next.js Application (Port 3000)
│   ├── app/                     # Next.js App Router (Pages, Slugs & Layouts)
│   ├── components/              # UI Components connected to GROQ queries
│   ├── data/                    # TypeScript data files (Graceful Fallback)
│   ├── lib/
│   │   └── sanity/
│   │       ├── client.ts        # Next-sanity client & error-safe fetching wrapper
│   │       ├── queries.ts       # GROQ queries for all 9 content sections
│   │       └── image.ts         # Sanity image URL builder
│   ├── public/                  # Static assets
│   ├── next.config.js           # Next.js config with cdn.sanity.io remote pattern
│   ├── package.json             # Website dependencies
│   ├── tsconfig.json
│   └── .env.local               # Website environment variables
│
├── cms/                         # Independent Sanity Studio (Port 3001)
│   ├── schemaTypes/
│   │   ├── index.ts             # Schema registry
│   │   ├── homePage.ts          # Hero, highlights, and CTA management
│   │   ├── about.ts             # Company story, vision, and mission
│   │   ├── services.ts          # Activities (Speed Boat, Kayak, Shikara, Open Boat)
│   │   ├── products.ts          # Houseboats (Bedrooms, capacity, rates, menus, gallery)
│   │   ├── gallery.ts           # Backwater photos, categories & captions
│   │   ├── banners.ts           # Promotional banners & announcements
│   │   ├── contact.ts           # Phone, WhatsApp, email, jetty address & maps
│   │   └── websiteSettings.ts   # Global branding, metadata & primary WhatsApp
│   ├── sanity.config.ts         # Custom Desk Structure with 9 Admin Sections
│   ├── sanity.cli.ts            # CLI config (fixed to port 3001)
│   ├── package.json             # Sanity Studio dependencies
│   ├── tsconfig.json
│   └── .env                     # CMS environment variables
│
├── package.json                 # Monorepo runner scripts
├── README.md                    # Setup & documentation
└── .gitignore
```

---

## 9 Sanity CMS Management Sections

1. **Dashboard & Settings**: Quick overview and global website branding settings.
2. **Homepage Management**: Hero headline, highlights, subtitle, cover photo, WhatsApp and phone CTA actions, stats guarantee bar.
3. **About Us Management**: Company story, mission, vision, fleet size, years of experience, and photo collages.
4. **Services Management**: Speed Boat, Backwater Kayaking, Traditional Shikara, and Open Boat with pricing, inclusions, and safety guidelines.
5. **Products Management**: 10+ Houseboats with bedroom count, guest capacity, pricing, food menus, inclusions, and photo galleries.
6. **Gallery Management**: Categorized backwater photography with lightbox captions (Houseboats, Interiors, Backwaters, Activities, Dining).
7. **Banner Management**: Promotional deals, seasonal offers, and announcement banners.
8. **Contact Information**: Direct phone hotline, WhatsApp booking number, boarding jetty address, email, and Google Maps location.
9. **Website Settings**: Site name, logo, primary WhatsApp number, SEO titles, and footer copyright.

---

## Quick Start & Running Applications

### 1. Run the Website (Frontend)

```bash
cd website
npm install
npm run dev
```

* **URL:** [http://localhost:3000](http://localhost:3000)

### 2. Run Sanity Studio (CMS)

```bash
cd cms
npm install
npm run dev
```

* **URL:** [http://localhost:3001](http://localhost:3001)

### 3. Run from Project Root

```bash
# Start website on port 3000
npm run dev:website

# Start CMS on port 3001
npm run dev:cms
```

---

## Connecting to Your Own Sanity Project

1. Create a free project at [Sanity.io](https://www.sanity.io/).
2. Copy your **Project ID** and **Dataset** (usually `production`).
3. Update `website/.env.local`:
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
   ```
4. Update `cms/.env`:
   ```env
   SANITY_STUDIO_PROJECT_ID=your-project-id
   SANITY_STUDIO_DATASET=production
   ```
5. Add `http://localhost:3000` and `http://localhost:3001` to your **CORS Origins** in the Sanity Management Console (`API` tab).

> **Graceful Fallback Guarantee:** If Sanity is not yet configured or documents are unpublished, the website automatically falls back to the rich local TypeScript dataset in `data/`, ensuring zero broken pages or empty states.
