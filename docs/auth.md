# Authentication — Clerk

## Rules

- **Clerk is the only auth provider.** Do not implement any other authentication method (JWT, NextAuth, sessions, etc.).
- All auth logic must use Clerk v7 APIs exclusively.

## Route Protection

- `/dashboard` is a protected route — users must be signed in to access it.
- Protect `/dashboard` (and any sub-routes) using Clerk's `clerkMiddleware` with `createRouteMatcher` in `middleware.ts`:

```ts
// middleware.ts
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)']);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'],
};
```

## Homepage Redirect

- If a signed-in user visits `/`, redirect them to `/dashboard`.
- Perform this check server-side in `app/page.tsx` using `auth()`:

```ts
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function HomePage() {
  const { userId } = await auth();
  if (userId) redirect('/dashboard');
  // render landing/sign-in UI
}
```

## Sign In / Sign Up

- Sign in and sign up must always open as a **modal** — never navigate to a dedicated sign-in/sign-up page.
- Use `<SignInButton mode="modal">` and `<SignUpButton mode="modal">` from `@clerk/nextjs`.
- Do not create custom `/sign-in` or `/sign-up` routes.

```tsx
import { SignInButton, SignUpButton } from '@clerk/nextjs';

<SignInButton mode="modal">
  <button>Sign in</button>
</SignInButton>
```

## Server-Side Helpers

| Helper | Use case |
|---|---|
| `auth()` | Get `userId` / session claims in Server Components & Route Handlers |
| `currentUser()` | Get full user object when profile data is needed |
| `clerkMiddleware` | Enforce protection at the edge in `middleware.ts` |

## Client-Side Components

| Component | Use case |
|---|---|
| `<SignInButton mode="modal">` | Trigger sign-in modal |
| `<SignUpButton mode="modal">` | Trigger sign-up modal |
| `<UserButton>` | Signed-in user avatar / account menu |
| `<SignedIn>` / `<SignedOut>` | Conditionally render UI based on auth state |

## What NOT to Do

- Do not use `getServerSession`, `useSession`, or any NextAuth/iron-session API.
- Do not check auth on the client only — always validate server-side for protected routes.
- Do not hardcode Clerk keys in source files; use `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` in `.env.local`.
- Do not create standalone sign-in or sign-up pages.
