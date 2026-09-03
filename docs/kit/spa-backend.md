# SPA + Backend Mode

Static SvelteKit frontend with external API backend.

## Setup

```bash
npx create-bindrunes my-app
```

SPA mode generates a layout with SSR disabled:

```ts
// src/routes/+layout.ts
export const prerender = true;
export const ssr = false;
```

## Configuration

Set your API URL in `.env`:

```
VITE_API_URL=http://localhost:8080
```

## API Client

The generated API client is in `src/lib/api/client.ts`:

```ts
import { createApiClient } from "urupe-ui";

export const api = createApiClient({
  baseUrl: import.meta.env.VITE_API_URL ?? "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});
```

## Using in Components

```svelte
<script lang="ts">
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
{/each}
```

## Auth

For SPA mode, use client-side auth with the API backend:

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
```

## Prerendering

SPA mode enables prerendering for static pages. To exclude dynamic routes:

```ts
// src/routes/dashboard/+layout.ts
export const prerender = false;
```
