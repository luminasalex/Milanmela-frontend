<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Agents

Event platform ("Milanmela"): a single Next.js 16 (App Router) app bootstrapped by create-next-app. No tests, no CI — everything lives in `src/`. Data comes from an **external REST API** (not part of this repo); auth runs **in-process** via better-auth.

## Commands

- `npm run dev` — dev server (Turbopack) at localhost:3000
- `npm run build` / `npm start` — production build / serve
- `npx tsc --noEmit` — typecheck (there is no `typecheck` script)
- `npm run lint` — ESLint flat config (`eslint.config.mjs`)

There is no test framework; verify changes with `tsc --noEmit`, lint, and a build.

## Architecture

- **External REST API**: all event data is fetched from `process.env.NEXT_PUBLIC_API_URL` (a separate Express-style server, not in this repo). Endpoints used: `/events`, `/events/:id`, `/events/:id/join`, `/create-event`, `/my-events/:email`, `/joined-events/:email`. Most fetches rely on `cache: "no-store"` or client-side fetches — don't add caching casually.
- **Auth (better-auth + MongoDB)**: server config in `src/lib/auth.ts` (MongoDB adapter, db `Milanmela`, email/password + Google OAuth). Client helper in `src/lib/auth-client.ts` exports `signIn`, `signUp`, `useSession`. The only API route is `src/app/api/auth/[...all]/route.ts`.
- **Middleware/proxy**: `src/proxy.ts` exports a `proxy()` function (this Next version's replacement for `middleware.ts`). It guards every page except `/`, `/sing-in`, `/sing-up` — note the misspelled route names `sing-in`/`sing-up` are intentional/established; don't "fix" them elsewhere incorrectly.
- **Pages** (`src/app/`): `events`, `events/[id]`, `create-event`, `manage-events`, `joined-events`. Home page composes `src/components/home/*`.
- **Event domain helpers** live in `src/lib/events.ts` (`EventItem` type, category colors, date/time formatting, sort/filter). Use these instead of re-implementing date/category logic.

## Stack quirks

- **React Compiler is on** (`reactCompiler: true` in `next.config.ts` + `babel-plugin-react-compiler`). Don't add `memo`/`useMemo` "for performance" — the compiler handles it.
- **Tailwind v4 via Turbopack rule**: loaded by `@tailwindcss/turbopack` in `next.config.ts`, not PostCSS. No `tailwind.config.js` — theme tokens are defined with `@theme` in `src/app/globals.css`.
- **shadcn with Base UI, not Radix**: `components.json` uses style `base-nova`; the `src/components/ui/*` components are built on `@base-ui/react` and `cn` (not `radix-ui` or `clsx`). Add new components with the shadcn CLI (`npx shadcn add <component>`), which reads `components.json`.
- Path alias `@/*` → `src/*` (e.g. `@/lib/utils`, `@/components/ui/...`). Keep all app code under `src/`.

## Environment

`.env.local` needs: `MONGODB_URI`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `NEXT_PUBLIC_API_URL`. Event endpoints won't work without the external API running.
