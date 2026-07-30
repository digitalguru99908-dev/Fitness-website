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

Workflows are managed by Replit:
- **Frontend**: `pnpm --filter @workspace/infinity-fitness run dev` → serves on `$PORT`
- **API Server**: `pnpm --filter @workspace/api-server run dev` → builds with esbuild then serves on port 8080

## Environment / Secrets

| Key | Required | Purpose |
|-----|----------|---------|
| `GMAIL_APP_PASSWORD` | Yes (for contact form) | Gmail app password for `digitalguru99908@gmail.com` — used by Nodemailer to send inquiry emails |
| `SESSION_SECRET` | Set | Express session secret |
| `DATABASE_URL` | Auto-managed | Replit PostgreSQL connection string |

## User Preferences

- Keep the existing project structure — do not restructure or migrate without being asked.
