# Full-Stack Mode

SvelteKit with SSR, server load functions, API routes, and hooks.

## Setup

```bash
npx create-bindrunes my-app
```

The full-stack mode includes server-side features by default. SSR is enabled and `prerender`/`ssr` are not overridden in the root layout.

## Server Hooks

Edit `src/hooks.server.ts`:

```ts
import type { Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";
import { createServerAuth, createAuthGuard, createCsrfGuard } from "bindrunes-kit/server";

const auth = createServerAuth({
  validate: async (token) => {
    // Validate token, return session or null
    const user = await db.validateToken(token);
    return user ? { user, expiresAt: Date.now() + 86400000 } : null;
  },
});

const authGuard = createAuthGuard({
  requireAuth: true,
  loginPath: "/login",
  appPath: "/app",
});

const csrfGuard = createCsrfGuard(["https://yourdomain.com"]);

export const handle = sequence(auth.handle, authGuard, csrfGuard);
```

## Server Load Functions

Access the session in server load functions via `locals.session`:

```ts
// src/routes/dashboard/+page.server.ts
import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ locals }) => {
  if (!locals.session) {
    throw redirect(302, "/login");
  }

  return {
    user: locals.session.user,
  };
};
```

## API Routes

```ts
// src/routes/api/items/+server.ts
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ locals }) => {
  if (!locals.session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const items = await db.getItems(locals.session.user.id);
  return json(items);
};

export const POST: RequestHandler = async ({ locals, request }) => {
  if (!locals.session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const body = await request.json();
  const item = await db.createItem(locals.session.user.id, body);
  return json(item, { status: 201 });
};
```

## Typed Server API Client

Use `createServerApiClient` to call external APIs from server code:

```ts
// src/lib/api/external.ts
import { createServerApiClient } from "bindrunes-kit/server";

export const externalApi = createServerApiClient({
  baseUrl: "https://api.example.com",
  auth: true,
  onError: (error) => console.error("External API error:", error),
});
```

Use it in server load functions or API routes:

```ts
export const load = async ({ locals, fetch }) => {
  const data = await externalApi.get("/data", locals);
  return { data };
};
```
