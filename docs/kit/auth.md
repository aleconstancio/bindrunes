# Authentication

## Server-Side (Full-Stack Mode)

```ts
import { createServerAuth, createAuthGuard } from "bindrunes-kit/server";

const auth = createServerAuth({
  cookieName: "urupe-ui-session",  // default
  maxAge: 60 * 60 * 24 * 7,        // 7 days
  validate: async (token) => {
    const user = await db.validateToken(token);
    return user ? { user, expiresAt: Date.now() + 86400000 } : null;
  },
});

// In hooks.server.ts
export const handle = auth.handle;
```

The `handle` hook reads the session cookie and attaches `event.locals.session` for use in load functions and API routes.

### Session Management

```ts
// In a server action or API route
export const POST: RequestHandler = async ({ locals, cookies }) => {
  // Set session after login
  auth.setSession(event, {
    user: { id: "123", email: "user@example.com" },
    expiresAt: Date.now() + 86400000,
  });

  // Delete session on logout
  auth.deleteSession(event);

  // Get current session
  const session = await auth.getSession(event);
};
```

### Route Protection

```ts
// In hooks.server.ts
import { createAuthGuard } from "bindrunes-kit/server";

const authGuard = createAuthGuard({
  requireAuth: true,        // redirect if not authenticated
  loginPath: "/login",      // login route
  appPath: "/app",          // redirect authenticated users from auth routes
});

export const handle = authGuard;
```

The guard:
- Redirects unauthenticated users to `loginPath` (preserving the original URL as a `redirect` query param)
- Redirects authenticated users away from `/login`, `/register`, `/forgot-password` to `appPath`

## Client-Side (SPA Mode)

```ts
import { createApiClient } from "urupe-ui";

const api = createApiClient({
  baseUrl: import.meta.env.VITE_API_URL,
});

async function login(email: string, password: string) {
  const response = await fetch(`${api.baseUrl}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const { token } = await response.json();
  localStorage.setItem("auth-token", token);
}

function getToken(): string | null {
  return localStorage.getItem("auth-token");
}

function logout() {
  localStorage.removeItem("auth-token");
}
```

## CSRF Protection

Protect mutation routes from cross-site request forgery:

```ts
import { createCsrfGuard } from "bindrunes-kit/server";

const csrfGuard = createCsrfGuard([
  "https://yourdomain.com",
  "https://www.yourdomain.com",
]);

// In hooks.server.ts
export const handle = csrfGuard;
```

The guard checks the `Origin` header on non-GET requests and rejects requests from unknown origins with a 403.
