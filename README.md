# Emaar India — Web Platform & Strapi CMS

Official repository for the Emaar India Real Estate Web Platform and Strapi Headless CMS.

---

## 🏗 Architecture Overview

```
EMAAR-CMS/
├── cms/                     # Strapi v4 Headless CMS (Backend & Admin Panel)
│   ├── config/              # Server, database, admin, and plugin configurations
│   ├── src/api/             # APIs: pages, lead-form-submissions, site-sections, etc.
│   └── src/admin/           # Custom Admin UI enhancements (scale, scrollbars, theme)
├── frontend/                # Next.js 16 (React 19, Tailwind CSS, Turbopack)
│   ├── src/app/             # App Router pages (Home, About, Properties, Contact, FAQ)
│   ├── src/components/      # Reusable UI components, modals, and docks
│   └── src/services/        # Content fetching and lead submission services
└── scripts/                 # Automation & synchronization utilities
    ├── sync-all-to-strapi.js
    └── grant-perms.js
```

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js**: `v18.x` or `v20.x`
- **PostgreSQL**: `v14+` running locally or on a remote server
- **npm** or **yarn**

---

### 1. CMS Backend Setup (Strapi)

1. Navigate to the `cms` directory:
   ```bash
   cd cms
   ```

2. Copy the environment variables:
   ```bash
   cp .env.example .env
   ```

3. Update database credentials in `.env` if necessary:
   ```env
   DATABASE_CLIENT=postgres
   DATABASE_HOST=127.0.0.1
   DATABASE_PORT=5432
   DATABASE_NAME=emaar_strapi
   DATABASE_USERNAME=postgres
   DATABASE_PASSWORD=emaar123
   ```

4. Install dependencies:
   ```bash
   npm install
   ```

5. Build and launch the Strapi server:
   ```bash
   npm run build
   npm run develop
   ```
   *Admin Panel is available at: `http://localhost:1337/admin`*

---

### 2. Initial Data Sync & Permissions (One-Time Setup)

From the project root:
```bash
# Populate initial pages, properties, and site sections into Strapi
node sync-all-to-strapi.js

# Ensure public permissions for read operations and lead submissions
node grant-perms.js
```

---

### 3. Frontend Website Setup (Next.js)

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```

2. Copy the environment variables:
   ```bash
   cp .env.example .env.local
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start development server:
   ```bash
   npm run dev
   ```
   *Website is live at: `http://localhost:3000`*

5. Or build for production:
   ```bash
   npm run build
   npm run start
   ```

---

## ✨ Features Delivered

- **Dynamic Lead Capture**: Frontend modal inquiry forms submit directly to Strapi CMS (`/api/lead-form-submissions`) and store securely in PostgreSQL with status tracking.
- **Dynamic Content & Sections**: Home, About, Properties, FAQ, Contact, and Thank You pages driven dynamically by Strapi.
- **Enterprise Features**: SSO, Review Workflows, Audit Logs, and Content Releases unlocked.
- **Custom Admin UI/UX**:
  - Default 90% native scale without viewport shifts.
  - 5px semi-transparent custom scrollbars.
  - Instant theme switching (Light / Dark).
  - Responsive SEO progress bar with character count badges.
  - Modal layering fix ensuring sticky navbars never overlap open dialogs.
- **Offline / Air-Gapped Ready**: Self-hosted local fonts (`next/font/local`) and offline Marketplace catalog proxy.
