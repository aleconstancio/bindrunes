<script lang="ts">
import { Badge, CodeSnippet } from "urupe-ui";
</script>

<div class="p-6 lg:p-8 max-w-4xl">
  <Badge variant="primary">Kit</Badge>
  <h1 class="mt-4 text-display-1 text-foreground">Authentication</h1>
  <p class="mt-3 text-body-lg text-muted-foreground">
    Server and client-side auth with session management.
  </p>

  <div class="mt-10 space-y-10">
    <section>
      <h2 class="text-title-1 text-foreground mb-4">Server-Side (Full-Stack Mode)</h2>
      <CodeSnippet language="ts" title="Server auth setup">
{`import { createServerAuth, createAuthGuard } from "bindrunes-kit/server";

const auth = createServerAuth({
  cookieName: "urupe-ui-session",  // default
  maxAge: 60 * 60 * 24 * 7,        // 7 days
  validate: async (token) => {
    const user = await db.validateToken(token);
    return user ? { user, expiresAt: Date.now() + 86400000 } : null;
  },
});

// In hooks.server.ts
export const handle = auth.handle;`}
      </CodeSnippet>

      <h3 class="text-title-2 text-foreground mt-6 mb-3">Session Management</h3>
      <CodeSnippet language="ts">
{`// In a server action or API route
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
};`}
      </CodeSnippet>

      <h3 class="text-title-2 text-foreground mt-6 mb-3">Route Protection</h3>
      <CodeSnippet language="ts" title="hooks.server.ts">
{`import { createAuthGuard } from "bindrunes-kit/server";

const authGuard = createAuthGuard({
  requireAuth: true,        // redirect if not authenticated
  loginPath: "/login",      // login route
  appPath: "/app",          // redirect authenticated users from auth routes
});

export const handle = authGuard;`}
      </CodeSnippet>
      <p class="text-body text-muted-foreground mt-3">
        The guard redirects unauthenticated users to <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">loginPath</code> (preserving the original URL as a redirect query param) and redirects authenticated users away from /login, /register, /forgot-password to <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">appPath</code>.
      </p>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">Client-Side (SPA Mode)</h2>
      <CodeSnippet language="ts">
{`import { createApiClient } from "urupe-ui";

const api = createApiClient({
  baseUrl: import.meta.env.VITE_API_URL,
});

async function login(email: string, password: string) {
  const response = await fetch(\`\${api.baseUrl}/auth/login\`, {
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
}`}
      </CodeSnippet>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">CSRF Protection</h2>
      <p class="text-body text-muted-foreground mb-4">
        Protect mutation routes from cross-site request forgery:
      </p>
      <CodeSnippet language="ts">
{`import { createCsrfGuard } from "bindrunes-kit/server";

const csrfGuard = createCsrfGuard([
  "https://yourdomain.com",
  "https://www.yourdomain.com",
]);

// In hooks.server.ts
export const handle = csrfGuard;`}
      </CodeSnippet>
      <p class="text-body text-muted-foreground mt-3">
        The guard checks the Origin header on non-GET requests and rejects requests from unknown origins with a 403.
      </p>
    </section>
  </div>
</div>
