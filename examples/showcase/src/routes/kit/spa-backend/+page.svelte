<script lang="ts">
import { Badge, CodeSnippet } from "urupe-ui";
</script>

<div class="p-6 lg:p-8 max-w-4xl">
  <Badge variant="primary">Kit</Badge>
  <h1 class="mt-4 text-display-1 text-foreground">SPA + Backend</h1>
  <p class="mt-3 text-body-lg text-muted-foreground">
    Static SvelteKit frontend with external API backend.
  </p>

  <div class="mt-10 space-y-10">
    <section>
      <h2 class="text-title-1 text-foreground mb-4">Setup</h2>
      <CodeSnippet language="bash" title="Terminal">
{`npx create-bindrunes my-app`}
      </CodeSnippet>
      <p class="text-body text-muted-foreground mt-4">SPA mode generates a layout with SSR disabled:</p>
      <CodeSnippet language="ts" title="src/routes/+layout.ts">
{`export const prerender = true;
export const ssr = false;`}
      </CodeSnippet>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">Configuration</h2>
      <p class="text-body text-muted-foreground mb-4">Set your API URL in <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">.env</code>:</p>
      <CodeSnippet language="bash" title=".env">
{`VITE_API_URL=http://localhost:8080`}
      </CodeSnippet>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">API Client</h2>
      <p class="text-body text-muted-foreground mb-4">
        The generated API client is in <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">src/lib/api/client.ts</code>:
      </p>
      <CodeSnippet language="ts" title="src/lib/api/client.ts">
{`import { createApiClient } from "urupe-ui";

export const api = createApiClient({
  baseUrl: import.meta.env.VITE_API_URL ?? "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});`}
      </CodeSnippet>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">Using in Components</h2>
      <CodeSnippet language="svelte">
{`<script lang="ts">
  import { onMount } from "svelte";
  import { api } from "$lib/api/client";

  const items = $state<any[]>([]);

  onMount(async () => {
    const data = await api.get("/api/items");
    items.push(...data);
  });
</script>

{#each items as item}
  <div>{item.name}</div>
{/each}`}
      </CodeSnippet>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">Auth</h2>
      <p class="text-body text-muted-foreground mb-4">
        For SPA mode, use client-side auth with the API backend:
      </p>
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
}`}
      </CodeSnippet>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">Prerendering</h2>
      <p class="text-body text-muted-foreground mb-4">
        SPA mode enables prerendering for static pages. To exclude dynamic routes:
      </p>
      <CodeSnippet language="ts" title="src/routes/dashboard/+layout.ts">
{`export const prerender = false;`}
      </CodeSnippet>
    </section>
  </div>
</div>
