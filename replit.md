# Infinity Fitness

A multi-page gym website for **Infinity Fitness** — Kaithal's premier community gym.

## Stack

- **Frontend** (`artifacts/infinity-fitness`): React 19 + Vite + Tailwind CSS + Wouter (routing) + Framer Motion
- **Backend** (`artifacts/api-server`): Express 5 + Pino logger + Drizzle ORM
- **Shared libraries** (`lib/`): `api-zod`, `api-spec`, `api-client-react`, `db`
- **Package manager**: pnpm monorepo (pnpm-workspace.yaml)

## Pages

Home, About, Services, Membership, Gallery, Contact, Testimonials, Owner

## How to run

Dependencies are installed at the workspace root:

```bash
pnpm install
```

Workflows are configured automatically:

| Workflow | Command |
|---|---|
| `artifacts/infinity-fitness: web` | `pnpm --filter @workspace/infinity-fitness run dev` |
| `artifacts/api-server: API Server` | `pnpm --filter @workspace/api-server run dev` |

## User preferences

<!-- Add user preferences here -->
