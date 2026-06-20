<script lang="ts">
import { Badge, CodeSnippet } from "bindrunes";
</script>

<div class="p-6 lg:p-8 max-w-4xl">
  <Badge variant="primary">Kit</Badge>
  <h1 class="mt-4 text-display-1 text-foreground">Full-Stack Mode</h1>
  <p class="mt-3 text-body-lg text-muted-foreground">
    SvelteKit with SSR, server load functions, API routes, and hooks.
  </p>

  <div class="mt-10 space-y-10">
    <section>
      <h2 class="text-title-1 text-foreground mb-4">Setup</h2>
      <CodeSnippet language="bash" title="Terminal">
{`npx create-bindrunes my-app`}
      </CodeSnippet>
      <p class="text-body text-muted-foreground mt-4">
        The full-stack mode includes server-side features by default. SSR is enabled and prerender/ssr are not overridden in the root layout.
      </p>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">Server Hooks</h2>
      <p class="text-body text-muted-foreground mb-4">Edit <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">src/hooks.server.ts</code>:</p>
      <CodeSnippet language="ts" title="src/hooks.server.ts">
{`import type { Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";
import { createServerAuth, createAuthGuard, createCsrfGuard } from "bindrunes-kit/server";

const auth = createServerAuth({
  validate: async (token) => {
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

export const handle = sequence(auth.handle, authGuard, csrfGuard);`}
      </CodeSnippet>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">Server Load Functions</h2>
      <p class="text-body text-muted-foreground mb-4">
        Access the session in server load functions via <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">locals.session</code>:
      </p>
      <CodeSnippet language="ts" title="src/routes/dashboard/+page.server.ts">
{`import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ locals }) => {
  if (!locals.session) {
    throw redirect(302, "/login");
  }

  return {
    user: locals.session.user,
  };
};`}
      </CodeSnippet>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">API Routes</h2>
      <CodeSnippet language="ts" title="src/routes/api/items/+server.ts">
{`import { json } from "@sveltejs/kit";
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
};`}
      </CodeSnippet>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">Typed Server API Client</h2>
      <p class="text-body text-muted-foreground mb-4">
        Use <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">createServerApiClient</code> to call external APIs from server code:
      </p>
      <CodeSnippet language="ts" title="src/lib/api/external.ts">
{`import { createServerApiClient } from "bindrunes-kit/server";

export const externalApi = createServerApiClient({
  baseUrl: "https://api.example.com",
  auth: true,
  onError: (error) => console.error("External API error:", error),
});`}
      </CodeSnippet>
    </section>
  </div>
</div>
