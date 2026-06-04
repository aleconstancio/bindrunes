# Composables

All composables follow the `createX()` pattern using Svelte 5 runes (`$state`, `$derived`, `$effect`).

## Data Layer

### `createQuery`

Reactive data fetching with caching, dedup, background refetch, retries.

```svelte
<script lang="ts">
  import { createQuery, createApiClient } from "bindrunes";

  const api = createApiClient({ baseUrl: "/api", getToken: () => localStorage.getItem("token") });

  const users = createQuery<User[]>({
    key: "/api/users",
    fetcher: () => api.get<User[]>("/users"),
    staleTime: 30_000,
    refetchOnWindowFocus: true,
    refetchInterval: 60_000,
    retry: 3,
    onSuccess: (data) => console.log("loaded", data.length, "users"),
    onError: (err) => toast.error(err.message),
  });
</script>

{#if users.isLoading}
  <PageLoading type="table" />
{:else if users.isError}
  <Alert variant="destructive" title="Error" description={users.error?.message} />
{:else}
  <DataTable data={users.data} columns={...} />
{/if}
```

```ts
interface CreateQueryOptions<TData> {
  key: string;
  fetcher: () => Promise<TData>;
  staleTime?: number;              // default: 0 (always stale)
  enabled?: boolean;               // default: true
  refetchOnWindowFocus?: boolean;  // default: true
  refetchInterval?: number;
  retry?: number;                  // default: 3
  gcTime?: number;                 // default: 5min
  onSuccess?: (data: TData) => void;
  onError?: (error: Error) => void;
}

interface QueryResult<TData> {
  readonly data: TData | undefined;
  readonly error: Error | null;
  readonly status: 'loading' | 'success' | 'error';
  readonly isLoading: boolean;
  readonly isSuccess: boolean;
  readonly isError: boolean;
  readonly isFetching: boolean;
  readonly isStale: boolean;
  refetch(): Promise<void>;
}
```

### `createMutation`

Reactive mutation with lifecycle callbacks.

```svelte
<script lang="ts">
  import { createMutation, invalidateQuery } from "bindrunes";

  const createUser = createMutation<User, { name: string; email: string }>({
    mutator: (vars) => api.post<User>("/users", vars),
    onMutate: (vars) => { /* optimistic update */ },
    onSuccess: () => { invalidateQuery("/api/users"); },
    onError: (err, vars) => { /* rollback */ },
    onSettled: () => { /* cleanup */ },
  });
</script>
```

```ts
interface CreateMutationOptions<TData, TVariables> {
  mutator: (variables: TVariables) => Promise<TData>;
  onMutate?: (variables: TVariables) => Promise<void> | void;
  onSuccess?: (data: TData, variables: TVariables) => void;
  onError?: (error: Error, variables: TVariables) => void;
  onSettled?: (data: TData | undefined, error: Error | null, variables: TVariables) => void;
}

interface MutationResult<TData, TVariables> {
  readonly data: TData | undefined;
  readonly error: Error | null;
  readonly status: 'idle' | 'loading' | 'success' | 'error';
  readonly isLoading: boolean;
  readonly isSuccess: boolean;
  readonly isError: boolean;
  mutate(variables: TVariables): Promise<TData>;
  reset(): void;
}
```

### `invalidateQuery`

Mark a cache entry as stale, triggering refetch for all subscribers.

```ts
invalidateQuery("/api/users");
```

### `setQueryData`

Directly inject data into cache (for optimistic updates).

```ts
setQueryData("/api/users/1", { name: "Ale" });
```

## Forms

### `createForm`

Typesafe form state with valibot validation. `$bindable`-ready.

```svelte
<script lang="ts">
  import { createForm, Form, Input, Button } from "bindrunes";
  import { string, minLength, email } from "valibot";

  const form = createForm({
    schema: {
      name: string([minLength(1, "O nome é obrigatório")]),
      email: string([email("E-mail inválido")]),
    },
    initialValues: { name: "", email: "" },
    onSubmit: async (values) => await api.post("/users", values),
  });
</script>

<Form onsubmit={form.handleSubmit}>
  <Input label="Nome" bind:value={form.values.name} error={form.errors.name} />
  <Input label="E-mail" type="email" bind:value={form.values.email} error={form.errors.email} />
  <Button type="submit" loading={form.isSubmitting}>Salvar</Button>
</Form>
```

### `createWizard`

Multi-step form wizard with per-step validation.

```svelte
<script lang="ts">
  import { createWizard } from "bindrunes";
  import { string, minLength, pipe } from "valibot";

  const wizard = createWizard({
    steps: [
      { id: "personal", label: "Personal Info", schema: { name: pipe(string(), minLength(2)) } },
      { id: "confirm", label: "Confirm" },
    ],
    onSubmit: async (values) => await api.post("/users", values),
  });
</script>
```

## Auth

### `createAuth`

Reactive token management with localStorage persistence.

```svelte
<script lang="ts">
  import { createAuth, AuthGuard } from "bindrunes";
  const auth = createAuth();
</script>

{#if !auth.isAuthenticated}
  <form onsubmit={(e) => { e.preventDefault(); auth.login(token); }}>
    <!-- login form -->
  </form>
{:else}
  <AuthGuard>
    <ProtectedContent />
  </AuthGuard>
{/if}
```

### `createAccess`

RBAC access control. Requires an existing auth instance:

```ts
import { createAccess, createAuth } from "bindrunes";
const auth = createAuth();
const access = createAccess(auth);

if (access.hasRole('admin')) { ... }
if (access.hasPermission('users:write')) { ... }
```

> `hasRole`/`hasPermission` standalone utilities are deprecated. Use `createAccess(auth)` instead.

### `AuthGuard`

Route guard component that redirects unauthenticated users.

```svelte
<AuthGuard fallback="/login">
  <ProtectedContent />
</AuthGuard>
```

## i18n

### `createI18n`

Reactive locale switching with interpolation.

```svelte
<script lang="ts">
  import { createI18n } from "bindrunes";
  import ptBR from "bindrunes/i18n/pt-BR";

  const t = createI18n({
    default: "pt-BR",
    dicts: { "pt-BR": ptBR },
    fallback: "pt-BR",
  });
</script>

<p>{t("form.Form.success")}</p>
<button onclick={() => t.setLocale("en")}>English</button>
```

## Utilities

| Utility | Description |
|---------|-------------|
| `createApiClient` | Typed HTTP client wrapping `fetch` |
| `createStorage` | Typed localStorage wrapper with prefix |
| `createEnv` | Type-safe environment variable access |
| `RealtimeClient` | SSE client with exponential backoff reconnection |
| `createToast` | Typed wrapper over svelte-sonner |
| `createTable` | Reactive DataTable state (sorting, filtering, pagination) |
| `shortcut` | `use:shortcut` Svelte action for keyboard bindings |

### Formatters

```ts
import { formatDate, formatRelative, formatNumber, formatBytes } from "bindrunes";

formatDate(new Date());       // "19/05/2026"
formatRelative(new Date());   // "agora"
formatNumber(1500);           // "1.500"
formatBytes(2048);            // "2 KB"
```

### `getChartTheme`

Reads CSS custom properties for chart color theming:

```ts
const theme = getChartTheme();
// { primary, accent, destructive, muted, background }
```

> Renamed from `useChartTheme` (deprecated).
