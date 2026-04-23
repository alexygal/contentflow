# ContentFlow

AI-powered content automation platform for video creators. Handles script generation, multi-platform publishing, brand partnership management, and analytics — all in one dark-mode SaaS dashboard.

---

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React 18 + Vite + TypeScript |
| Styling | Tailwind CSS v3 |
| Routing | React Router v7 |
| Charts | Recharts v3 |
| Icons | Lucide React |
| Backend | Express.js + TypeScript |
| Database | PostgreSQL |
| Auth | JWT + bcrypt |
| Payments | Stripe |
| Email | Nodemailer / SendGrid |
| Validation | Zod |

---

## Project Structure

```
ContentFlow/
├── landing.tsx              # Self-contained landing page (EN/FR/ES)
├── src/
│   ├── main.tsx             # Entry point
│   ├── router.tsx           # All route definitions
│   ├── index.css            # Tailwind base
│   ├── contexts/
│   │   └── AuthContext.tsx  # Auth state (mock + real-API ready)
│   ├── components/
│   │   ├── ui.tsx           # Shared design system components
│   │   ├── PublicNav.tsx    # Public navigation bar
│   │   └── Sidebar.tsx      # Dashboard sidebar
│   ├── layouts/
│   │   ├── PublicLayout.tsx
│   │   ├── AuthLayout.tsx
│   │   └── DashboardLayout.tsx
│   └── pages/
│       ├── public/          # Features, Pricing, Blog, Help
│       ├── auth/            # Login, Signup, ForgotPassword, ResetPassword, VerifyEmail
│       └── dashboard/       # Overview, Create, Operations, Partnerships, Analytics, Approvals, Settings, Admin
├── backend/
│   ├── schema.sql           # PostgreSQL schema
│   ├── .env.example
│   └── src/
│       ├── server.ts
│       ├── app.ts
│       ├── config/          # db.ts, stripe.ts
│       ├── utils/           # jwt.ts, email.ts, validators.ts
│       ├── models/          # user, content, approval
│       ├── middleware/       # auth, admin, errorHandler, rateLimiter, validate
│       ├── controllers/     # auth, user, content, billing, admin
│       └── routes/          # auth, user, content, billing, admin
├── .env.example             # Frontend env vars (VITE_ prefix)
└── README.md
```

---

## Quick Start

### Prerequisites

- Node.js 20+
- PostgreSQL 15+
- A Stripe account (test mode)
- A SendGrid (or other SMTP) account

### 1 — Frontend

```bash
# Install dependencies
npm install

# Copy and fill env vars
cp .env.example .env

# Start dev server (http://localhost:5173)
npm run dev

# Production build
npm run build
```

### 2 — Backend

```bash
cd backend

# Install dependencies
npm install

# Copy and fill env vars
cp .env.example .env

# Create the database
createdb contentflow

# Run the schema migration
psql $DATABASE_URL -f schema.sql

# Start dev server with hot reload (http://localhost:4000)
npm run dev

# Production build + start
npm run build && npm start
```

---

## Environment Variables

### Frontend (`/.env`)

| Variable | Description |
|---|---|
| `VITE_API_URL` | Backend API base URL (e.g. `http://localhost:4000/api`) |
| `VITE_APP_NAME` | App display name |
| `VITE_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key |

### Backend (`/backend/.env`)

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `JWT_SECRET` | Long random string for signing JWTs |
| `JWT_EXPIRES_IN` | Token lifetime (e.g. `7d`) |
| `STRIPE_SECRET_KEY` | Stripe secret key |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASS` | SMTP credentials |
| `MAIL_FROM` | Sender email address |
| `CLIENT_ORIGIN` | Frontend URL for CORS + email links |

---

## API Reference

All endpoints are prefixed with `/api`.

### Auth (`/api/auth`)

| Method | Path | Body | Auth |
|---|---|---|---|
| POST | `/register` | `{ name, email, password, tier? }` | — |
| POST | `/login` | `{ email, password }` | — |
| GET | `/verify-email/:token` | — | — |
| POST | `/forgot-password` | `{ email }` | — |
| POST | `/reset-password` | `{ token, password }` | — |

### Users (`/api/users`) — requires Bearer token

| Method | Path | Description |
|---|---|---|
| GET | `/me` | Get current user |
| PATCH | `/me` | Update profile |
| GET | `/me/brand` | Get brand settings |
| PUT | `/me/brand` | Save brand settings |
| GET | `/me/notifications` | Get notification prefs |
| PUT | `/me/notifications` | Save notification prefs |

### Content (`/api/content`) — requires Bearer token

| Method | Path | Description |
|---|---|---|
| GET | `/` | List content (optional `?status=`) |
| POST | `/` | Create content item |
| POST | `/:id/approve` | Approve content |
| POST | `/:id/reject` | Reject content |
| DELETE | `/:id` | Delete content |

### Billing (`/api/billing`)

| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/webhook` | Stripe sig | Stripe event handler |
| POST | `/checkout` | Bearer | Create Stripe checkout session |
| GET | `/invoices` | Bearer | List user invoices |

### Admin (`/api/admin`) — requires Bearer token + admin role

| Method | Path | Description |
|---|---|---|
| GET | `/stats` | Platform-wide stats |
| GET | `/users` | List all users |
| POST | `/users/:id/suspend` | Suspend a user |
| GET | `/invoices` | All invoices |
| GET | `/health` | System health check |

---

## Demo Accounts (Frontend Mock)

| Email | Password | Role | Tier |
|---|---|---|---|
| `alex@contentflow.ai` | `demo1234` | creator | growth |
| `admin@contentflow.ai` | `admin1234` | admin | premium |

These are wired to `localStorage` mock auth in `AuthContext.tsx`. Swap `login()` to call `VITE_API_URL/auth/login` for real auth.

---

## Deployment

### Frontend — Vercel

```bash
# vercel.json (root)
{
  "rewrites": [{ "source": "/((?!api/).*)", "destination": "/index.html" }]
}
```

Set the `VITE_*` env vars in the Vercel dashboard.

### Backend — Railway / Render / Fly.io

1. Provision a PostgreSQL instance and grab the `DATABASE_URL`.
2. Set all backend env vars in the platform dashboard.
3. Run `npm run build` as the build command, `node dist/server.js` as the start command.
4. Run `psql $DATABASE_URL -f schema.sql` once after first deploy (use the platform's shell or a migration step).

### Stripe Webhooks

Point `https://your-api-domain.com/api/billing/webhook` to the Stripe dashboard → Developers → Webhooks. Select events: `checkout.session.completed`, `customer.subscription.deleted`.
