<script lang="ts">
import { Badge, CodeSnippet } from "urupe-ui";
</script>

<div class="p-6 lg:p-8 max-w-4xl">
  <Badge variant="primary">Kit</Badge>
  <h1 class="mt-4 text-display-1 text-foreground">API Reference</h1>
  <p class="mt-3 text-body-lg text-muted-foreground">
    Comprehensive reference for every export in bindrunes-kit.
  </p>

  <div class="mt-10 space-y-10">
    <section>
      <h2 class="text-title-1 text-foreground mb-4">Server API</h2>

      <h3 class="text-title-2 text-foreground mb-3">createServerAuth(options)</h3>
      <p class="text-body text-muted-foreground mb-4">Cookie-based session management for SvelteKit server routes.</p>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-border">
              <th class="text-left py-2 pr-4 font-medium text-foreground">Property</th>
              <th class="text-left py-2 pr-4 font-medium text-foreground">Type</th>
              <th class="text-left py-2 pr-4 font-medium text-foreground">Default</th>
              <th class="text-left py-2 font-medium text-foreground">Description</th>
            </tr>
          </thead>
          <tbody class="text-muted-foreground">
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-mono text-xs">cookieName</td>
              <td class="py-2 pr-4 font-mono text-xs">string</td>
              <td class="py-2 pr-4">"urupe-ui-session"</td>
              <td class="py-2">Name of the session cookie</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-mono text-xs">maxAge</td>
              <td class="py-2 pr-4 font-mono text-xs">number</td>
              <td class="py-2 pr-4">604800</td>
              <td class="py-2">Cookie max age in seconds (7 days)</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-mono text-xs">validate</td>
              <td class="py-2 pr-4 font-mono text-xs">async (token) =&gt; SessionData | null</td>
              <td class="py-2 pr-4">required</td>
              <td class="py-2">Validates a raw cookie token</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="text-body text-muted-foreground mt-3">
        Returns: getSession(event), setSession(event, data), deleteSession(event), handle
      </p>
    </section>

    <section>
      <h3 class="text-title-2 text-foreground mb-3">createServerApiClient(options)</h3>
      <p class="text-body text-muted-foreground mb-4">Typed HTTP client for calling external APIs from server-side code.</p>
      <CodeSnippet language="ts">
{`import { createServerApiClient } from 'bindrunes-kit/server';

const api = createServerApiClient({
  baseUrl: 'https://api.example.com',
  auth: true,
});

// Methods: get, post, put, patch, delete
const user = await api.get('/me', locals.session ? { locals } : undefined);`}
      </CodeSnippet>
    </section>

    <section>
      <h3 class="text-title-2 text-foreground mb-3">combineHooks(...hooks)</h3>
      <p class="text-body text-muted-foreground mb-4">Compose multiple SvelteKit Handle hooks into a single hook.</p>
      <CodeSnippet language="ts">
{`import { combineHooks } from 'bindrunes-kit/server';

export const handle = combineHooks(
  auth.handle,
  createAuthGuard({ loginPath: '/login' }),
  createCsrfGuard(['https://example.com']),
);`}
      </CodeSnippet>
    </section>

    <section>
      <h3 class="text-title-2 text-foreground mb-3">createAuthGuard(options?)</h3>
      <p class="text-body text-muted-foreground mb-4">Route protection hook for unauthenticated users.</p>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-border">
              <th class="text-left py-2 pr-4 font-medium text-foreground">Property</th>
              <th class="text-left py-2 pr-4 font-medium text-foreground">Type</th>
              <th class="text-left py-2 pr-4 font-medium text-foreground">Default</th>
              <th class="text-left py-2 font-medium text-foreground">Description</th>
            </tr>
          </thead>
          <tbody class="text-muted-foreground">
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-mono text-xs">requireAuth</td>
              <td class="py-2 pr-4 font-mono text-xs">boolean</td>
              <td class="py-2 pr-4">true</td>
              <td class="py-2">Redirect if not authenticated</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-mono text-xs">loginPath</td>
              <td class="py-2 pr-4 font-mono text-xs">string</td>
              <td class="py-2 pr-4">"/login"</td>
              <td class="py-2">Redirect path for unauthenticated users</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-mono text-xs">appPath</td>
              <td class="py-2 pr-4 font-mono text-xs">string</td>
              <td class="py-2 pr-4">"/app"</td>
              <td class="py-2">Redirect path for authenticated users on auth routes</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section>
      <h3 class="text-title-2 text-foreground mb-3">createCsrfGuard(allowedOrigins)</h3>
      <p class="text-body text-muted-foreground mb-4">CSRF protection hook that validates the Origin header on non-GET requests.</p>
    </section>

    <section>
      <h3 class="text-title-2 text-foreground mb-3">createServerI18n(options)</h3>
      <p class="text-body text-muted-foreground mb-4">Server-side locale detection and path locale parsing.</p>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-border">
              <th class="text-left py-2 pr-4 font-medium text-foreground">Property</th>
              <th class="text-left py-2 pr-4 font-medium text-foreground">Type</th>
              <th class="text-left py-2 pr-4 font-medium text-foreground">Default</th>
              <th class="text-left py-2 font-medium text-foreground">Description</th>
            </tr>
          </thead>
          <tbody class="text-muted-foreground">
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-mono text-xs">locales</td>
              <td class="py-2 pr-4 font-mono text-xs">string[]</td>
              <td class="py-2 pr-4">required</td>
              <td class="py-2">Supported locale codes</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-mono text-xs">defaultLocale</td>
              <td class="py-2 pr-4 font-mono text-xs">string</td>
              <td class="py-2 pr-4">required</td>
              <td class="py-2">Fallback locale</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-mono text-xs">strategy</td>
              <td class="py-2 pr-4 font-mono text-xs">"path" | "cookie" | "header"</td>
              <td class="py-2 pr-4">"path"</td>
              <td class="py-2">Detection strategy</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">Client API</h2>

      <h3 class="text-title-2 text-foreground mb-3">createClientAuth(options?)</h3>
      <p class="text-body text-muted-foreground mb-4">Reactive authentication state for Svelte 5 components.</p>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-border">
              <th class="text-left py-2 pr-4 font-medium text-foreground">Property</th>
              <th class="text-left py-2 pr-4 font-medium text-foreground">Type</th>
              <th class="text-left py-2 font-medium text-foreground">Description</th>
            </tr>
          </thead>
          <tbody class="text-muted-foreground">
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-mono text-xs">user</td>
              <td class="py-2 pr-4 font-mono text-xs">User | null</td>
              <td class="py-2">Current user (reactive)</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-mono text-xs">isAuthenticated</td>
              <td class="py-2 pr-4 font-mono text-xs">boolean</td>
              <td class="py-2">Derived: true when user !== null</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-mono text-xs">loading</td>
              <td class="py-2 pr-4 font-mono text-xs">boolean</td>
              <td class="py-2">true while bootstrap/login is in progress</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-mono text-xs">login(email, password)</td>
              <td class="py-2 pr-4 font-mono text-xs">function</td>
              <td class="py-2">Login function</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-mono text-xs">logout()</td>
              <td class="py-2 pr-4 font-mono text-xs">function</td>
              <td class="py-2">Logout function</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section>
      <h3 class="text-title-2 text-foreground mb-3">createAutosave(options)</h3>
      <p class="text-body text-muted-foreground mb-4">Debounced autosave composable for forms.</p>
      <CodeSnippet language="ts">
{`import { createAutosave } from 'bindrunes-kit/client';

const autosave = createAutosave({
  data: () => content,
  save: async (data) => {
    await fetch('/api/documents', {
      method: 'PATCH',
      body: JSON.stringify({ content: data }),
    });
  },
  delay: 500,
});`}
      </CodeSnippet>
    </section>

    <section>
      <h3 class="text-title-2 text-foreground mb-3">createSession(options?)</h3>
      <p class="text-body text-muted-foreground mb-4">Session timeout tracking with activity detection and warning callbacks.</p>
    </section>

    <section>
      <h3 class="text-title-2 text-foreground mb-3">createSSEClient(options)</h3>
      <p class="text-body text-muted-foreground mb-4">Server-Sent Events client with automatic reconnection and gap detection.</p>
    </section>

    <section>
      <h3 class="text-title-2 text-foreground mb-3">createWebSocketSession(options)</h3>
      <p class="text-body text-muted-foreground mb-4">WebSocket client with automatic reconnection and message queuing.</p>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">CLI</h2>
      <CodeSnippet language="bash" title="Terminal">
{`npx bindrunes-kit create`}
      </CodeSnippet>
      <div class="mt-4 space-y-4">
        <div>
          <h3 class="text-title-2 text-foreground mb-2">Modes</h3>
          <ul class="text-body text-muted-foreground space-y-1 list-disc list-inside">
            <li><strong>full-stack</strong> — SvelteKit with SSR, server routes, database, and auth</li>
            <li><strong>spa-backend</strong> — SPA frontend with a separate backend API server</li>
          </ul>
        </div>
        <div>
          <h3 class="text-title-2 text-foreground mb-2">Features</h3>
          <ul class="text-body text-muted-foreground space-y-1 list-disc list-inside">
            <li><strong>auth</strong> — Login, signup, session management</li>
            <li><strong>crud</strong> — Database models, API routes, forms</li>
            <li><strong>billing</strong> — Stripe integration, pricing pages</li>
            <li><strong>realtime</strong> — WebSocket subscriptions, live data</li>
            <li><strong>i18n</strong> — Multi-language support, locale routing</li>
          </ul>
        </div>
        <div>
          <h3 class="text-title-2 text-foreground mb-2">Deployment Targets</h3>
          <ul class="text-body text-muted-foreground space-y-1 list-disc list-inside">
            <li><strong>vercel</strong> — @sveltejs/adapter-vercel</li>
            <li><strong>firebase</strong> — @sveltejs/adapter-firebase</li>
            <li><strong>node</strong> — @sveltejs/adapter-node</li>
            <li><strong>docker</strong> — @sveltejs/adapter-node + Dockerfile</li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</div>
