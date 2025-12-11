# Repository Guidelines

## Project Structure & Module Organization
Next.js App Router organizes routes under `src/app`: blog surfaces in `(blog)`, admin screens in `(studio)`, and API handlers in `api/[[...route]]/route.ts`. Shared UI lives in `src/components`; domain utilities sit in `src/lib`; server-only logic belongs in `src/server`. Database schemas now live in `src/db/schema` (relations in `src/db/relations.ts`), and Drizzle Kit writes migrations to `drizzle/migrations`—regenerate these instead of hand-editing. Static assets stay in `public/` and global styles in `src/app/globals.css`.

## Build, Test, and Development Commands
Use pnpm for every script. `pnpm dev` (Turbopack) runs the local server. `pnpm build` compiles production assets, and `pnpm start` serves them. `pnpm lint` enforces the shared ESLint rules and applies safe fixes. When the Drizzle schema changes, run `pnpm db:push` to sync the database and emit migrations, `pnpm db:migrate` to apply committed migrations to an environment, and `pnpm db:studio` to inspect or seed data.

## Coding Style & Naming Conventions
TypeScript runs in strict mode, so prefer explicit types at module boundaries. Components and hooks use PascalCase; helpers remain camelCase; filenames mirror their primary export. ESLint via `@antfu/eslint-config` expects two-space indentation, single quotes, and ordered imports. Use the `~/` alias instead of deep relative paths and group Tailwind utilities from layout primitives to visual tweaks for readability.

## Testing Guidelines
Automated tests are not yet configured. For every change, document manual verification in the PR and sanity-check key flows with `pnpm dev`. If you add a harness, colocate specs beside features (`feature-name.test.tsx`) and expose a `pnpm test` script that runs headless in CI. Until broader coverage exists, treat `pnpm lint` as the minimum gate before review.

## Commit & Pull Request Guidelines
Commits follow the conventional syntax seen in history (`feat(db): …`, `chore: …`). Keep scopes focused and subjects under ~70 characters. PRs need a clear summary, references to issues or Notion docs, and screenshots or clips for UI work. Call out schema or env changes, include migration names, and confirm `pnpm lint` and relevant Drizzle commands have run before requesting review.

## Environment & Data
Copy `.env.example` to `.env` and supply credentials for Notion, Better Auth, GitHub, and the database before running scripts. Develop against branch-specific databases to protect shared environments. After editing `src/db/schema` or `src/db/relations.ts`, regenerate and commit the Drizzle migration artifacts in `drizzle/migrations`; never commit personal `.env` contents or generated database artifacts you did not rebuild.
