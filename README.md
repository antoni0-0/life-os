# Life OS

Monorepo for **Life OS**, a personal productivity platform organized around life ecosystems (Habits, Goals, Health, Mind, Skills, Finance).

## Tech stack

| Layer | Stack |
|-------|-------|
| Frontend | Next.js 16, React 19, TypeScript, Tailwind CSS, Framer Motion |
| Backend | NestJS 11, Prisma 7, PostgreSQL |
| Tooling | pnpm workspaces, Turborepo |

## Prerequisites

- **Node.js** 20+ (recommended)
- **pnpm** 9 (`corepack enable && corepack prepare pnpm@9.0.0 --activate`)
- **PostgreSQL** running locally or remotely

## Installation

### 1. Clone and install dependencies

```bash
git clone <repository-url>
cd life-os-project
pnpm install
```

### 2. Configure the API

Create `apps/api/.env`:

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/life_os?schema=public"

JWT_ACCESS_SECRET="your-access-secret"
JWT_REFRESH_SECRET="your-refresh-secret"
JWT_ACCESS_EXPIRES="15m"
JWT_REFRESH_EXPIRES="7d"

PORT=3001
CORS_ORIGIN="http://localhost:3000"
```

### 3. Run database migrations

```bash
cd apps/api
pnpm exec prisma migrate deploy
```

For local development you can also use:

```bash
pnpm exec prisma migrate dev
```

### 4. Configure the web app

Create `apps/web/.env.local` (optional — defaults work for local dev):

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 5. Start the apps

From the repository root:

```bash
# API + Web together
pnpm dev

# Or individually
pnpm dev:api   # http://localhost:3001
pnpm dev:web   # http://localhost:3000
```

## Usage (technical test demo)

1. Open [http://localhost:3000](http://localhost:3000).
2. Register or log in (`/register`, `/login`).
3. Go to **Habits** (`/habits`).
4. Use **search**, **status/priority filters**, and **sort by date**.
5. Select a row to open the **detail panel** (desktop) or **bottom sheet** (mobile).
6. Reload the page — **filters persist** via `localStorage`.
7. Click **New habit** to create a task via `POST /tasks`.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│  apps/web (Next.js)                                         │
│  ┌──────────────┐   ┌─────────────┐   ┌──────────────────┐  │
│  │ habits-page  │ → │ use-habits  │ → │ lib/api/tasks    │  │
│  │ + components │   │   (hook)    │   │ (fetch client)   │  │
│  └──────────────┘   └─────────────┘   └────────┬─────────┘  │
└────────────────────────────────────────────────│────────────┘
                                                 │ HTTP
┌────────────────────────────────────────────────▼────────────┐
│  apps/api (NestJS)                                          │
│  ┌──────────────────┐   ┌──────────────┐   ┌─────────────┐  │
│  │ TasksController  │ → │ TasksService │ → │ Prisma ORM  │  │
│  └──────────────────┘   └──────────────┘   └──────┬──────┘  │
└─────────────────────────────────────────────────────│───────┘
                                                      │
                                              ┌───────▼───────┐
                                              │  PostgreSQL   │
                                              └───────────────┘
```

## Key technical decisions

See **[DECISIONS.md](./DECISIONS.md)** for detailed rationale. Summary:

## Project structure

```
life-os-project/
├── apps/
│   ├── api/          # NestJS API, Prisma, auth, tasks
│   ├── web/          # Next.js web app (Habits = task tray)
│   └── mobile/       # Expo app (separate from this test scope)
├── package.json      # Root scripts (turbo)
├── turbo.json
├── README.md
└── DECISIONS.md
```

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start all apps in dev mode |
| `pnpm dev:api` | API only (port 3001) |
| `pnpm dev:web` | Web only (port 3000) |
| `pnpm build` | Build all apps |
| `pnpm lint` | Lint all apps |

