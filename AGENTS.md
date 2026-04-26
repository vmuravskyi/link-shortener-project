<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Link Shortener — Agent Instructions

---

## Tech Stack

| Layer | Library / Tool | Version |
|---|---|---|
| Framework | Next.js (App Router) | 16.2.3 |
| Language | TypeScript (strict) | ^5 |
| UI | React | 19.2.4 |
| Styling | Tailwind CSS v4 | ^4 |
| Components | shadcn/ui + Base UI | latest |
| Icons | lucide-react | ^1.8.0 |
| Auth | Clerk | ^7.0.12 |
| ORM | Drizzle ORM | ^0.45.2 |
| Database | Neon (serverless PostgreSQL) | ^1.0.2 |
| Migrations | drizzle-kit | ^0.31.10 |

---

## Core Rules

> **MANDATORY:** You MUST read every relevant file in `/docs` BEFORE writing a single line of code. No exceptions. Generating code without first reading the applicable doc(s) is a critical violation of these rules.

1. **Read the relevant doc first — this is non-negotiable.** Never write, suggest, or scaffold any code until you have explicitly read the applicable doc(s) in `/docs` using a file-reading tool. If you are unsure which doc applies, read all of them.
2. **Never downgrade dependencies.** The pinned versions in `package.json` are intentional.
3. **App Router only.** Do not use the Pages Router. All routes live under `app/`.
4. **Server Components by default.** Only add `"use client"` when browser APIs or React state/effects are required.
5. **TypeScript strict mode.** No `any`, no `// @ts-ignore` without a comment explaining why.
6. **Tailwind for all styling.** No inline styles, no CSS Modules, no external CSS files beyond `app/globals.css`.
7. **Never use `middleware.ts`.** In this project's Next.js version, `middleware.ts` is deprecated; use `proxy.ts` instead.
8. **No orphan files.** Every new file must be imported and used somewhere — don't create scaffolding speculatively.

---

## Documentation Index

> **STOP.** Before generating any code, you MUST open and read the relevant file(s) below using a file-reading tool. Do not rely on memory or prior training — the actual file contents are the source of truth. Reading these docs is a prerequisite, not a suggestion.

For detailed guidelines on specific topics, refer to the modular documentation in the `/docs` directory.

| Topic | File | When to read |
|---|---|---|
| Authentication (Clerk) | [`docs/auth-instructions.md`](docs/auth-instructions.md) | Any auth, sign-in, sign-out, session, or user-related code |
| UI Components (shadcn/ui) | [`docs/ui-instructions.md`](docs/ui-instructions.md) | Any component, layout, form, button, or UI-related code |

---

## Project Structure

```
app/                  # All routes and layouts (App Router)
  layout.tsx          # Root layout — wraps ClerkProvider
  page.tsx            # Home page (Server Component)
  globals.css         # Global styles — Tailwind base only
components/
  ui/                 # Reusable UI primitives (shadcn/ui generated)
db/
  index.ts            # Drizzle client instance (Neon serverless)
  schema.ts           # All table definitions
docs/                 # Per-topic coding standards (read before coding)
lib/
  utils.ts            # Shared utilities (cn helper, etc.)
drizzle.config.ts     # drizzle-kit config
```

---

## Key Conventions

### Routing
- Every route segment is a folder under `app/` with a `page.tsx`.
- Layouts inherit from the root `layout.tsx` which provides `ClerkProvider`.
- Dynamic segments use `[param]` folder naming (e.g., `app/[slug]/page.tsx`).
- Never add `middleware.ts`; use the root-level `proxy.ts` entry point for this kind of request handling.
- Route handlers live in `app/api/` as `route.ts` files.

### Database
- All table definitions go in `db/schema.ts` using Drizzle ORM's `pgTable`.
- Never write raw SQL; use the Drizzle query builder.
- The Drizzle client (`db`) is imported from `db/index.ts` — do not create additional client instances.
- Run migrations with `drizzle-kit` via `npx drizzle-kit push` (development) or `npx drizzle-kit migrate` (production).
- `DATABASE_URL` must be set in `.env.local` and is never committed to version control.

### Authentication
- Authentication is handled exclusively by Clerk v7.
- Use Clerk's Server-side helpers (`auth()`, `currentUser()`) in Server Components and Route Handlers.
- Use Clerk's React components (`<SignInButton>`, `<UserButton>`, `<Show>`) for UI.
- Protected pages must validate the session server-side — never trust client-only auth checks.

### Components & UI
- **All UI elements must use shadcn/ui components.** Do not create custom components — see [`docs/ui.md`](docs/ui.md).
- Primitive UI components (buttons, inputs, etc.) are generated via shadcn/ui and live in `components/ui/`.
- Do not edit generated shadcn files directly; extend them by composition.
- Base UI (`@base-ui/react`) is the underlying primitive layer used by shadcn — do not use it directly.
- Component file names use kebab-case (e.g., `link-card.tsx`).
- Export one component per file; named exports preferred over default exports for non-page components.

### Styling
- Tailwind CSS v4 is configured via `postcss.config.mjs`. There is no `tailwind.config.js` — configuration is done in CSS using `@theme`.
- Use the `cn()` utility from `lib/utils.ts` to merge conditional class names.
- Use `class-variance-authority` (CVA) when a component needs multiple style variants.
- Dark mode is supported via the `dark:` variant — do not hardcode light-only styles.

### Data Fetching & Mutations
- Fetch data in Server Components using `async/await` directly — no `useEffect` for initial data.
- Use Next.js Server Actions for form submissions and mutations.
- Never expose database credentials or internal IDs in client-rendered output.
- Validate all user-supplied input server-side before writing to the database.

### TypeScript
- Enable all strict checks — `tsconfig.json` has `"strict": true`.
- Prefer explicit return types on exported functions.
- Use Drizzle's inferred types (`typeof table.$inferSelect`, `typeof table.$inferInsert`) for DB row types — do not manually duplicate them.

### Environment & Secrets
- All secrets (database URL, Clerk keys) live in `.env.local` which is git-ignored.
- Reference environment variables only in server-side code (Server Components, Route Handlers, Server Actions).
- Never import `dotenv` in application code — it is only used by scripts (drizzle-kit, `proxy.ts`).
