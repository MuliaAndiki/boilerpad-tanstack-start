# Boilerpad TanStack Start

Production-ready frontend boilerplate for apps backed by an **external REST API**, deployed on **Cloudflare Workers**.

## Tech stack

| Area | Choice |
| --- | --- |
| Framework | TanStack Start (React 19) + Vite |
| Routing | TanStack Router (file-based, typed) |
| Data | TanStack Query (per-request client, SSR hydration) |
| UI | shadcn/ui (new-york, neutral, Radix) + Tailwind CSS v4 + Lucide |
| Forms | React Hook Form + Zod |
| HTTP | Typed `fetch` wrapper (`src/lib/api`) |
| Runtime | Cloudflare Workers via `@cloudflare/vite-plugin` + Wrangler |
| Tooling | Bun, TypeScript (strict), ESLint, Prettier |

## Installation

```bash
bun install
cp .env.example .env.local   # optional local overrides
bun run dev                  # http://localhost:3000
```

## Scripts

| Script | Purpose |
| --- | --- |
| `bun run dev` | Dev server (Workers runtime in SSR) |
| `bun run typecheck` | `tsc --noEmit` |
| `bun run lint` / `format` | ESLint / Prettier + ESLint fix |
| `bun run build` | Build (development mode) |
| `bun run build:staging` / `build:production` | Build for an environment |
| `bun run preview` | Preview built output in the Workers runtime |
| `bun run deploy:staging` / `deploy:production` | Build + `wrangler deploy --env …` |
| `bun run generate-routes` | Regenerate `src/routeTree.gen.ts` |

## Project structure

```text
src/
├── components/
│   ├── ui/        # shadcn/ui only (generated, not linted)
│   ├── common/    # app-level reusable components
│   └── layouts/   # public + dashboard layouts
├── features/example/{components,hooks,queries,services,schemas}
├── hooks/
├── lib/{api,env}  # HTTP client, typed env; utils.ts holds cn()
├── providers/     # theme, tooltip, toaster
├── routes/        # file-based routes (keep thin)
└── styles/globals.css   # Tailwind + theme tokens (light/dark)
```

Routes: `/`, `/dashboard` (`ssr: false`), `/examples/query`, `/examples/form`, and a 404 page.

## Environment variables

Vite loads `.env`, `.env.local`, then `.env.<mode>`. Variables prefixed `VITE_` are **public** (bundled to the client).

| Variable | Description |
| --- | --- |
| `VITE_API_BASE_URL` | Base URL of the REST API |
| `VITE_APP_ENV` | `development` \| `staging` \| `production` |
| `VITE_APP_NAME` | Display name |

- `.env.development`, `.env.staging`, `.env.production` are committed and contain **public values only**. Replace the placeholder API URLs.
- Server-only secrets: `.dev.vars` locally (gitignored) and `bunx wrangler secret put NAME --env staging|production`.
- `wrangler.jsonc` defines separate Workers per environment (`…-staging`, production). Wrangler does **not** inherit `vars` into named envs, so redefine what each needs.
- Environment builds use `CLOUDFLARE_ENV=<env>` (handled by the build scripts).

## Common tasks

**Add a page**: create `src/routes/<name>.tsx` with `createFileRoute('/<name>')`; the route tree regenerates in dev. Use `_public.*` for the public layout or nest under `dashboard.*`.

**Add a shadcn component**: `bunx --bun shadcn@latest add <component>` (config in `components.json`).

**Add an API service**: add `features/<x>/services/<x>.service.ts` using `api.get/post/put/patch/delete<T>()` from `@/lib/api`. Errors are thrown as `ApiError`.

**Add a query**: define keys + `queryOptions` in `features/<x>/queries`, consume with `useQuery(...)`, or prefetch in a route `loader` via `context.queryClient.ensureQueryData(...)`. Mutations call `invalidateQueries` (see `use-create-post.ts`).

## Build, preview, deploy

```bash
bun run build && bun run preview   # Workers runtime locally
bun run deploy:staging
bun run deploy:production
```

Deployment requires `bunx wrangler login` (or `CLOUDFLARE_API_TOKEN`). Nothing is deployed automatically.

## Notes

- `ssr: false` on `/dashboard` renders the shell on the client, but requests still pass through the Worker for static assets/routing.
- Authentication is intentionally not implemented; add it behind `routes/dashboard.tsx` (e.g. `beforeLoad`) when integrating a real backend.
- The example API is the public JSONPlaceholder (writes are faked).
