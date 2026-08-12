# Infinity Fitness Gym

A multi-page marketing website for **Infinity Fitness Gym** (Kaithal), built with React + Vite on the frontend and an Express API server on the backend.

## Stack

- **Frontend** (`artifacts/infinity-fitness`): React 19, Vite, Tailwind CSS v4, shadcn/ui, Framer Motion, Wouter (routing)
- **API Server** (`artifacts/api-server`): Express 5, Pino logging, Nodemailer (Gmail SMTP)
- **Database** (`lib/db`): Drizzle ORM + PostgreSQL (Replit managed) — schema currently empty; used for future features
- **Shared libs**: `lib/api-spec`, `lib/api-zod`, `lib/api-client-react`

## Pages

- `/` — Home (hero, features, CTA)
- `/about` — About the gym
- `/services` — Services offered
- `/membership` — Membership plans
- `/gallery` — Photo gallery
- `/contact` — Contact / inquiry form

## Running

The project uses pnpm workspaces. Install dependencies from the root:

```bash
pnpm install
```

### On Replit
The committed `.replit` configuration uses the default **Project** workflow,
which starts both services in parallel:

- **Backend:** `artifacts/api-server: API Server` — Express API on port `8080`
- **Frontend:** `artifacts/infinity-fitness: web` — Vite site on port `18902`

Workflows start automatically. Replit injects `PORT` and `BASE_PATH` for the
artifact services; do not add those manually.

### Locally (any machine / any browser)
No env vars required — sensible defaults kick in automatically.

**Terminal 1 — API server** (port 8080):
```bash
pnpm --filter @workspace/api-server run dev
```

**Terminal 2 — Frontend** (port 5173):
```bash
pnpm --filter @workspace/infinity-fitness run dev
```

Then open **http://localhost:5173** in any browser. The Vite dev server proxies `/api` requests to the API server on port 8080, so the contact form and all API calls work out of the box.

For the contact form to send real emails locally, copy `.env.example` to `.env` in the project root and fill in `GMAIL_APP_PASSWORD`.

## Environment / Secrets

### Add manually

| Key | When needed | Purpose |
|-----|-------------|---------|
| `GMAIL_APP_PASSWORD` | Required for the contact form to send email | Gmail app password for `digitalguru99908@gmail.com`, used by Nodemailer |

### Replit-managed / injected

| Key | Source | Purpose |
|-----|--------|---------|
| `SESSION_SECRET` | Already configured in this Repl | Session signing secret; keep it private |
| `DATABASE_URL` | Replit PostgreSQL, if/when provisioned | Database connection string for the shared DB package |
| `PORT` | Artifact workflow | Service port |
| `BASE_PATH` | Artifact workflow | Frontend URL base path |

Never commit `.env` files or secret values. The committed `.env.example` contains
placeholders only.

## User Preferences

- Keep the existing project structure — do not restructure or migrate without being asked.
