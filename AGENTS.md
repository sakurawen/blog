# Repository Guidelines

## Project Structure & Module Organization
Next.js App Router organizes routes under `src/app`: blog surfaces in `(blog)`, admin screens in `(studio)`, and API handlers in `api/[[...route]]/route.ts`. Shared UI lives in `src/components`; domain utilities sit in `src/lib`; server-only logic belongs in `src/server`. Data models reside in `prisma/schema.prisma`, and Prisma outputs in `src/generated/prisma` should be regenerated, not edited. Static assets stay in `public/` and global styles in `src/app/globals.css`.

## Build, Test, and Development Commands
Use pnpm for every script. `pnpm dev` (Turbopack) runs the local server. `pnpm build` compiles production assets, and `pnpm start` serves them. `pnpm lint` enforces the shared ESLint rules and applies safe fixes. When the schema changes, run `pnpm prisma:generate` to refresh clients, `pnpm prisma:migrate` to scaffold migrations, and `pnpm prisma:studio` to inspect or seed data.

## Coding Style & Naming Conventions
TypeScript runs in strict mode, so prefer explicit types at module boundaries. Components and hooks use PascalCase; helpers remain camelCase; filenames mirror their primary export. ESLint via `@antfu/eslint-config` expects two-space indentation, single quotes, and ordered imports. Use the `~/` alias instead of deep relative paths and group Tailwind utilities from layout primitives to visual tweaks for readability.

## Testing Guidelines
Automated tests are not yet configured. For every change, document manual verification in the PR and sanity-check key flows with `pnpm dev`. If you add a harness, colocate specs beside features (`feature-name.test.tsx`) and expose a `pnpm test` script that runs headless in CI. Until broader coverage exists, treat `pnpm lint` as the minimum gate before review.

## Commit & Pull Request Guidelines
Commits follow the conventional syntax seen in history (`feat(prisma): …`, `chore: …`). Keep scopes focused and subjects under ~70 characters. PRs need a clear summary, references to issues or Notion docs, and screenshots or clips for UI work. Call out schema or env changes, include migration names, and confirm `pnpm lint` and relevant Prisma commands have run before requesting review.

## Environment & Data
Copy `.env.example` to `.env` and supply credentials for Notion, Better Auth, GitHub, and the database before running scripts. Develop against branch-specific databases to protect shared environments. After editing `prisma/schema.prisma`, regenerate clients and commit both schema and migration artifacts; never commit personal `.env` contents or generated Prisma binaries you did not rebuild.
