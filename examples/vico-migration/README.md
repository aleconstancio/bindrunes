# Vico Migration Example

This example demonstrates how to migrate a SvelteKit SPA app (like Vico) to use bindrunes-kit.

## Key Changes

1. Replace shadcn-svelte components with bindrunes components
2. Use bindrunes-kit server utilities for auth hooks
3. Use bindrunes-kit API client for backend communication
4. Keep the existing Go backend — no changes needed

## Before (Vico current)

```svelte
<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Card } from "$lib/components/ui/card";
</script>

<Card>
  <Button>Click me</Button>
</Card>
```

## After (With bindrunes-kit)

```svelte
<script lang="ts">
  import { Button, Card } from "bindrunes";
</script>

<Card>
  <Button>Click me</Button>
</Card>
```

## Auth Migration

### Before
```ts
// Custom auth with localStorage
const auth = createAuth(); // custom implementation
```

### After
```ts
// bindrunes auth with SSR support
import { createAuth } from "bindrunes";
const auth = createAuth(); // built-in, SSR-safe
```

## API Client Migration

### Before
```ts
// Custom fetch wrapper
const api = createApiClient({ baseUrl: "..." });
```

### After
```ts
// bindrunes-kit server API client
import { createServerApiClient } from "bindrunes-kit/server";
const api = createServerApiClient({ baseUrl: "..." });
```
