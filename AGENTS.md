<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Agents

Single Next.js 16 (App Router) app, bootstrapped by create-next-app. No tests, no CI, no backend — everything lives in `src/`.

## Commands

- `npm run dev` — dev server (Turbopack) at localhost:3000
- `npm run build` / `npm start` — production build / serve
- `npx tsc --noEmit` — typecheck (there is no `typecheck` script)
- `npm run lint` — ESLint flat config (`eslint.config.mjs`)

There is no test framework; verify changes with `tsc --noEmit`, lint, and a build.

## Stack quirks

- **React Compiler is on** (`reactCompiler: true` in `next.config.ts` + `babel-plugin-react-compiler`). Don't add `memo`/`useMemo` "for performance" — the compiler handles it.
- **Tailwind v4 via Turbopack rule**: loaded by `@tailwindcss/turbopack` in `next.config.ts`, not PostCSS. No `tailwind.config.js` — theme tokens are defined with `@theme` in `src/app/globals.css`.
- **shadcn with Base UI, not Radix**: `components.json` uses style `base-nova`; the `src/components/ui/*` components are built on `@base-ui/react` and `cn` (not `radix-ui` or `clsx`). Add new components with the shadcn CLI (`npx shadcn add <component>`), which reads `components.json`.
- Path alias `@/*` → `src/*` (e.g. `@/lib/utils`, `@/components/ui/...`). Keep all app code under `src/`.
