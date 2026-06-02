# bindrunes — Svelte 5 Component Library & Scaffold

56 components · 12 utilities · Svelte 5 + Tailwind v4 + bits-ui + valibot

## Overview

`bindrunes` is a design system and front-end scaffold for building B2B AI-agent dashboards. It provides a complete set of UI components and composable utilities that follow the `createX()` pattern using Svelte 5 runes ($state, $derived, $effect).

**Design:**
- Dark-first, OKLCH color tokens with glassmorphism panels
- Tailwind CSS v4 via `@theme inline` tokens
- Custom CSS `@property` registrations for GPU-accelerated animation
- Baked-in `pt-BR` locale with `createI18n` for multi-language support

**Architecture:**
- Router-agnostic — works with SvelteKit, Astro, standalone SPA
- Zero traditional stores — all reactivity via runes
- Module-level cache for request deduplication (`queryCache`)
- Pluggable auth via `createAuth` + `AuthGuard`

## Installation

```bash
bun add bindrunes
```

### Peer dependencies

```bash
bun add svelte tailwindcss lucide-svelte mode-watcher svelte-sonner
bun add -D @tailwindcss/vite
```

### Tailwind setup

In your `app.css`:

```css
@import "tailwindcss";
@import "bindrunes/styles/global.css";
```

Map design tokens to your theme by reassigning CSS custom properties on `:root`.

In `vite.config.ts`:

```ts
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
  plugins: [tailwindcss(), sveltekit()],
});
```

## Quick Start

```svelte
<!-- src/routes/+layout.svelte -->
<script lang="ts">
  import "../app.css";
  import { AppProvider } from "bindrunes";
  let { children } = $props();
</script>

<AppProvider>
  {@render children()}
</AppProvider>
```

---

## Components

### Foundation

| Component | Description |
|-----------|-------------|
| `<Button>` | 6 variants (primary/secondary/outline/ghost/destructive), 3 sizes, loading spinner, href support |
| `<Card>` | 4 variants (surface/glass/outlined/ghost), interactive, href |
| `<Input>` | Text/textarea, error/helper/label, prefix/suffix, $bindable |
| `<Spinner>` | 3 sizes, animated SVG tail |
| `<Skeleton>` | Shimmer loading lines |
| `<Badge>` | 7 variants including success/warning/destructive |
| `<Progress>` | 3 sizes, 4 colors — bits-ui wrapper |
| `<Kbd>` | Keyboard shortcut display (`<kbd>`) |

### Forms

| Component | Description |
|-----------|-------------|
| `<Form>` | Submit wrapper with loading state, success/error toasts |
| `<Input>` | Text input with label, error, helper, prefix/suffix |
| `<Select>` | Dropdown with options, error state |
| `<Switch>` | Toggle switch — bits-ui wrapper |
| `<Checkbox>` | With label — bits-ui wrapper |
| `<Label>` | bits-ui label wrapper |

### Feedback & Status

| Component | Description |
|-----------|-------------|
| `<Alert>` | Info/success/warning/destructive, icon, title, description, action |
| `<StatusChip>` | Status pill with optional animated dot |
| `<MetricCard>` | KPI card with label/value/detail/progress |
| `<EmptyState>` | Centered placeholder with icon/action |
| `<ErrorBoundary>` | Catches window errors, shows fallback UI |
| `<PageLoading>` | Skeleton presets (table/cards/form/text) |
| `<Suspense>` | Renders by `status`: loading/empty/error/loaded |

### Overlays

| Component | Description |
|-----------|-------------|
| `<Dialog>` | Modal with overlay/animation/title/icon/actions |
| `<DropdownMenu>` | Positioned menu with items |
| `<Tooltip>` | Positionable tooltip — bits-ui wrapper |
| `<Omnibar>` | Cmd+K command palette with search/categories |
| `<Sheet>` | Side-panel overlay (left/right/top/bottom) |
| `<Popover>` | Positioned popover with outside-click dismiss |
| `<Popconfirm>` | Confirmation popover for destructive actions |

### Navigation & Data

| Component | Description |
|-----------|-------------|
| `<Tabs>` | `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent` — bits-ui |
| `<DataTable>` | Sortable columns, pagination, row click, selection, striped |
| `<Pagination>` | Page nav with ellipsis, prev/next |
| `<SectionHeader>` | Section title with optional action |
| `<Accordion>` | Expandable content sections with single/multiple mode |
| `<AccordionItem>` | Individual accordion panel with chevron indicator |

### Data Visualization

| Component | Description |
|-----------|-------------|
| `<DataChart>` | Chart.js wrapper — line, bar, doughnut, radar, scatter. Peer dep: `chart.js` |

### File Upload

| Component | Description |
|-----------|-------------|
| `<FileUpload>` | Drag-and-drop with image preview, file list, validation, progress |

### Rich Text

| Component | Description |
|-----------|-------------|
| `<RichTextEditor>` | ProseMirror markdown editor with configurable toolbar |

### Dashboard Shell

| Component | Description |
|-----------|-------------|
| `<DashboardShell>` | Full dashboard: sidebar + sticky header + content area |
| `<NavMenu>` | Renders `NavGroup[]` as sidebar navigation |
| `<Sidebar>` | Three modes: offcanvas/icon/none |
| `<SidebarProvider>` | Context provider for sidebar state |
| `<SidebarTrigger>` | Hamburger toggle |
| `<SidebarRail>` | Edge handle for collapse |
| `<DashboardShellRight>` | Sidebar on right for detail/chat panels |
| `<DashboardShellTopnav>` | Top navigation bar, no sidebar |
| `<DashboardShellSplit>` | Master-detail two-panel layout |
| `<ThemeBuilder>` | Interactive theme editor with color pickers |

### Auth & Layout

| Component | Description |
|-----------|-------------|
| `<AppProvider>` | Root scaffold — `ModeWatcher` + `Toaster` |
| `<AuthGuard>` | Route guard — redirects to /login if not authenticated |
| `<ThemeToggle>` | Dark/light mode switch |

---

## Composables (Data Layer)

### `createQuery`

Reactive data fetching with caching, dedup, background refetch, retries.

```svelte
<script lang="ts">
  import { createQuery, createApiClient } from "bindrunes";

  const api = createApiClient({ baseUrl: "/api", getToken: () => localStorage.getItem("token") });

  const users = createQuery<User[]>({
    key: "/api/users",
    fetcher: () => api.get<User[]>("/users"),
    staleTime: 30_000,              // background refetch after 30s
    refetchOnWindowFocus: true,     // refetch on tab focus
    refetchInterval: 60_000,        // polling every 60s
    retry: 3,                       // exponential backoff 1s → 2s → 4s
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

#### API

```ts
interface CreateQueryOptions<TData> {
  key: string;                          // cache key for dedup
  fetcher: () => Promise<TData>;        // fetch function
  staleTime?: number;                   // default: 0 (always stale)
  enabled?: boolean;                    // default: true
  refetchOnWindowFocus?: boolean;       // default: true
  refetchInterval?: number;             // polling ms
  retry?: number;                       // default: 3
  gcTime?: number;                      // unused cache GC, default: 5min
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
  readonly isFetching: boolean;    // background refetch in progress
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

<button onclick={() => createUser.mutate({ name: "Ale", email: "ale@ex.com" })} disabled={createUser.isLoading}>
  {createUser.isLoading ? "Creating..." : "Create User"}
</button>
```

#### API

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
import { invalidateQuery } from "bindrunes";
invalidateQuery("/api/users");  // refetches all queries with this key
```

### `setQueryData`

Directly inject data into cache (for optimistic updates).

```ts
import { setQueryData } from "bindrunes";
setQueryData("/api/users/1", { name: "Ale" });  // immediate UI update
```

---

## Composables (Forms)

### `createForm`

Typesafe form state with valibot validation. $bindable-ready.

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
  <Input label="Nome" bind:value={form.values.name} error={form.errors.name} onblur={() => form.setFieldTouched("name")} />
  <Input label="E-mail" type="email" bind:value={form.values.email} error={form.errors.email} onblur={() => form.setFieldTouched("email")} />
  <Button type="submit" loading={form.isSubmitting}>Salvar</Button>
</Form>

{#if form.isSubmitted && !form.isValid}
  <p class="text-destructive text-sm">Corrija os erros antes de salvar.</p>
{/if}
```

#### API

```ts
interface FormState<TShape extends Record<string, BaseSchema>> {
  readonly values: { [K in keyof TShape]: InferOutput<TShape[K]> };  // $state, $bindable
  readonly errors: { [K in keyof TShape]?: string };                 // per-field error messages
  readonly touched: { [K in keyof TShape]?: boolean };               // per-field interaction tracking
  readonly dirty: { [K in keyof TShape]?: boolean };                 // changed from initial
  readonly isSubmitting: boolean;
  readonly isSubmitted: boolean;
  readonly isValid: boolean;             // $derived — no errors
  readonly isDirty: boolean;             // $derived — any field dirty
  setFieldValue<K>(field: K, value: InferOutput<TShape[K]>): void;
  setFieldTouched<K>(field: K, touched?: boolean): void;
  validate(): Promise<boolean>;
  reset(): void;
  handleSubmit(e: SubmitEvent): Promise<void>;
}
```

---

## Composables (Auth)

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

#### API

```ts
interface AuthStorage {
  getToken(): string | null;
  setToken(token: string): void;
  clearToken(): void;
}

function createAuth(options?: { storage?: AuthStorage }): {
  readonly token: string | null;          // $state, reactive
  readonly isAuthenticated: boolean;      // $derived
  login(token: string): void;
  logout(): void;
  setToken(token: string): void;
  refreshToken(token: string): void;
};
```

---

## Composables (i18n)

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

<p>{t("form.Form.success")}</p>       <!-- "Salvo com sucesso!" -->
<p>{t("formatters.formatRelative.minutesAgo", { minutes: 5 })}</p>  <!-- "5 minutos atrás" -->

<button onclick={() => t.setLocale("en")}>English</button>
```

#### API

```ts
function createI18n(options: {
  default: string;
  dicts: Record<string, Dict>;
  fallback?: string;
}): {
  readonly locale: string;        // $state, reactive
  readonly locales: string[];
  t(key: string, params?: Record<string, string | number>): string;
  setLocale(locale: string): void;
};
```

---

## Utilities

### `createApiClient`

Typed HTTP client wrapping `fetch`.

```ts
const api = createApiClient({
  baseUrl: import.meta.env.VITE_API_URL,
  getToken: () => localStorage.getItem("token"),
  onError: (err) => toast.error(err.message),
});

const users = await api.get<User[]>("/users", { status: "active" });
await api.post("/users", { name: "Ale" });
await api.put("/users/1", { name: "Updated" });
await api.delete("/users/1");
await api.upload("/files", file, { category: "document" });
```

### `createStorage`

Typed localStorage wrapper with prefix.

```ts
const storage = createStorage({ prefix: "myapp" });
storage.set("theme", "dark");
const theme = storage.get<string>("theme");
storage.remove("theme");
storage.clear();  // clears all keys with prefix
```

### `createEnv`

Type-safe environment variable access.

```ts
const env = createEnv({ prefix: "VITE_", strict: true });
const apiUrl = env.get("API_URL");         // string
const port = env.getNumber("PORT", 3000);  // number
const debug = env.getBoolean("DEBUG");     // boolean
```

### `RealtimeClient`

SSE client with exponential backoff reconnection and gap detection.

```ts
const rt = new RealtimeClient("/api/events", {
  getToken: () => localStorage.getItem("token"),
  onMessage: (event) => console.log(event),
});
rt.connect();
// ...
rt.disconnect();
```

### Formatters

```ts
import { formatDate, formatRelative, formatNumber, formatBytes } from "bindrunes";

formatDate(new Date());           // "19/05/2026"
formatRelative(new Date());      // "agora"
formatNumber(1500);              // "1.500"
formatBytes(2048);               // "2 KB"
```

---

## Scaffold Composables

### `createTable`

Reactive DataTable state management: sorting, filtering, pagination, selection.

```svelte
<script lang="ts">
  import { createTable } from "bindrunes";

  const table = createTable({
    data: users,
    columns: [
      { key: "name", label: "Name", sortable: true },
      { key: "email", label: "Email", sortable: true },
      { key: "status", label: "Status", filterable: true },
    ],
    initialState: {
      sort: { key: "name", direction: "asc" },
      pagination: { page: 1, pageSize: 20 },
    },
  });
</script>

<DataTable data={table.data} columns={table.columns} />
```

#### API

```ts
interface CreateTableOptions<T> {
  data: T[] | (() => T[]);
  columns: Column<T>[];
  initialState?: { sort?: SortState; filters?: Record<string, string>; pagination?: Partial<PaginationState>; selected?: Set<string> };
  getRowId?: (row: T) => string;
}

interface TableResult<T> {
  readonly data: T[];           // current page
  readonly allData: T[];        // all filtered/sorted
  readonly totalRows: number;
  readonly totalPages: number;
  readonly page: number;
  readonly sort: SortState | null;
  sortColumn(key: string): void;
  setFilter(key: string, value: string): void;
  setPage(page: number): void;
  toggleRow(id: string): void;
  toggleAll(): void;
  reset(): void;
}
```

### `createWizard`

Multi-step form wizard with per-step validation.

```svelte
<script lang="ts">
  import { createWizard } from "bindrunes";
  import { string, minLength, email, pipe } from "valibot";

  const wizard = createWizard({
    steps: [
      { id: "personal", label: "Personal Info", schema: { name: pipe(string(), minLength(2)) } },
      { id: "confirm", label: "Confirm" },
    ],
    onSubmit: async (values) => await api.post("/users", values),
  });
</script>

<div class="flex gap-2 mb-4">
  {#each wizard.steps as step}
    <Badge variant={wizard.currentStep.id === step.id ? "primary" : "secondary"}>
      {step.label}
    </Badge>
  {/each}
</div>

<Button onclick={wizard.isLastStep ? wizard.submit : wizard.next}>
  {wizard.isLastStep ? "Submit" : "Next"}
</Button>
```

### `createToast`

Typed wrapper over svelte-sonner with action support.

```ts
import { createToast } from "bindrunes";

const toast = createToast();

toast.success("Saved!");
toast.error("Failed", { action: { label: "Retry", onClick: retry } });
toast.warning("Session expiring");
```

### `createAccess`

RBAC access control with role and permission checking.

```ts
import { createAccess } from "bindrunes";
const access = createAccess();
if (access.can({ roles: ['admin'] })) { ... }
```

### `hasRole` / `hasPermission`

Standalone role and permission check utilities.

```ts
import { hasRole, hasPermission } from "bindrunes";
if (hasRole(auth, 'admin')) { ... }
```

### Actions

```ts
import { shortcut } from "bindrunes";

// use:shortcut={{ key: "k", ctrl: true, callback: () => openOmnibar() }}
// use:shortcut={[{ key: "j", callback: next }, { key: "k", callback: prev }]}
```

---

## Data Visualization

### `DataChart`

Chart.js wrapper with theme integration.

```svelte
<script lang="ts">
  import { DataChart, useChartTheme } from "bindrunes";

  const theme = useChartTheme();

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr"],
    datasets: [{
      label: "Users",
      data: [12, 19, 3, 5],
      borderColor: theme.primary,
      backgroundColor: theme.primary + "33",
    }],
  };
</script>

<DataChart type="line" {data} class="h-[300px]" />
```

Supported types: `line`, `bar`, `doughnut`, `radar`, `scatter`.

### `useChartTheme`

Reads CSS custom properties for chart color theming:

```ts
const theme = useChartTheme();
// { primary, accent, destructive, muted, background }
```

---

## File Upload

### `FileUpload`

Drag-and-drop file upload with preview, validation, and progress.

```svelte
<script lang="ts">
  import { FileUpload } from "bindrunes";

  async function handleUpload(files: File[]) {
    const form = new FormData();
    files.forEach(f => form.append("files", f));
    await fetch("/api/upload", { method: "POST", body: form });
  }
</script>

<FileUpload
  accept={["image/*", "application/pdf"]}
  maxFiles={5}
  maxSize={10 * 1024 * 1024}
  onUpload={handleUpload}
/>
```

Features: image thumbnails, per-file progress, type/size/count validation, keyboard accessible.

---

## Rich Text Editor

### `RichTextEditor`

ProseMirror-based markdown editor with configurable toolbar.

```svelte
<script lang="ts">
  import { RichTextEditor } from "bindrunes";

  let content = $state("# Hello\n\nStart writing...");
</script>

<RichTextEditor bind:value={content} />
```

Toolbar actions: `bold`, `italic`, `code`, `heading`, `list`, `quote`, `horizontalrule`, `undo`, `redo`.

---

## Theming

### Theme Presets

`bindrunes` ships with 6 built-in theme presets:

| Preset | Primary | Accent | Character |
|--------|---------|--------|-----------|
| `dracula` | Purple | Pink | Dark, moody, hacker |
| `akashic` | Blue | Cyan | Deep knowledge, calm |
| `martian` | Red | Orange | Warm, intense |
| `alchemy` | Gold | Amber | Precious, refined |
| `druidic` | Green | Teal | Natural, balanced |
| `obsidian` | Slate | Neutral | Minimal, professional |

Import a preset in your `app.css`:

```css
@import "bindrunes/styles/themes/dracula.css";
```

### Runtime Theme Switching

```svelte
<script lang="ts">
  import { createTheme } from "bindrunes";

  const theme = createTheme({ default: "dracula" });
</script>

{#each theme.themes as t}
  <button onclick={() => theme.setTheme(t)}>{t}</button>
{/each}
```

### Custom Themes

Override tokens on `[data-theme="yourname"]`:

```css
[data-theme="custom"] {
  --background: oklch(0.06 0.02 200);
  --primary: oklch(0.70 0.15 200);
  --accent: oklch(0.65 0.20 180);
}
```

### Manual Token Override

Override by setting on `:root`:

```css
:root {
  --background: oklch(0.05 0.01 290);
  --foreground: oklch(0.95 0.01 290);
  --primary: oklch(0.75 0.21 310);
  --success: oklch(0.65 0.2 145);
  --warning: oklch(0.80 0.18 85);
  --destructive: oklch(0.65 0.24 30);
  --radius: 0.625rem;
}
```

Available tokens: `background`, `foreground`, `card`, `primary`, `secondary`, `muted`, `accent`, `destructive`, `border`, `input`, `ring`, `glass-*`, `success`, `warning`, `radius`, `glass-blur`, `duration-*`.

Utility classes: `.glass-panel`, `.glass-interactive`, `.text-gradient-violet`, `.text-gradient-gold`, `.animate-pulse-glow`, `.mono`.

---

## Pattern Guide

### Creating new composables

Follow the `createX()` pattern established by `createAuth`:

```ts
// libs/ui/src/utils/createMyThing.svelte.ts
export function createMyThing(options: Options): Result {
  let state = $state(initial);
  let derived = $derived(state > 0);

  $effect(() => {
    // setup: subscribe, addEventListener, etc.
    return () => cleanup;
  });

  return {
    get state() { return state; },
    get derived() { return derived; },
    action() { /* modify state */ },
  };
}
```

Use `.svelte.ts` extension for files containing runes. Export types alongside the function.

### Directory map

```
libs/ui/src/
├── index.ts                            # barrel exports
├── actions/shortcut.ts                 # use:shortcut Svelte action
├── components/                         # Svelte components
│   ├── Button.svelte, Card.svelte, ...
│   ├── DataChart.svelte               # Chart.js wrapper
│   ├── FileUpload.svelte              # Drag-and-drop upload
│   ├── RichTextEditor.svelte          # ProseMirror markdown editor
│   ├── Sheet.svelte                   # Side-panel overlay
│   ├── Popover.svelte                 # Positioned popover
│   ├── Popconfirm.svelte              # Confirmation popover
│   ├── Accordion.svelte               # Expandable sections
│   ├── AccordionItem.svelte           # Individual accordion panel
│   ├── dashboard/                      # DashboardShell, NavMenu
│   └── sidebar/                        # SidebarProvider, Sidebar*, ...
├── i18n/
│   └── pt-BR.ts                        # default pt-BR dictionary
├── styles/
│   ├── global.css                      # base reset + preset + utilities + reduced-motion
│   ├── preset.css                      # @theme inline tokens
│   ├── utilities.css                   # glass, gradients, animations
│   └── themes/                         # theme preset CSS files
│       ├── dracula.css
│       ├── akashic.css
│       ├── martian.css
│       ├── alchemy.css
│       ├── druidic.css
│       ├── obsidian.css
│       └── contrast.css                # high-contrast accessibility theme
└── utils/
    ├── createAuth.svelte.ts            # reactive auth
    ├── createForm.svelte.ts            # valibot form validation
    ├── createI18n.svelte.ts            # i18n composable
    ├── createTheme.svelte.ts           # runtime theme switching
    ├── createThemeBuilder.svelte.ts    # OKLCH theme generation
    ├── extendTheme.svelte.ts           # preset-aware theme extension
    ├── createTable.svelte.ts           # reactive DataTable state
    ├── createWizard.svelte.ts          # multi-step form wizard
    ├── createToast.svelte.ts           # typed svelte-sonner wrapper
    ├── createMutation.svelte.ts        # mutation composable
    ├── createQuery.svelte.ts           # query composable
    ├── createApiClient.ts              # typed fetch wrapper
    ├── createEnv.ts                    # typed env vars
    ├── createStorage.ts                # typed localStorage wrapper
    ├── chartTheme.ts                   # CSS token reader for charts
    ├── formatters.ts                   # pt-BR formatters
    ├── queryCache.ts                   # module-level cache backend
    └── RealtimeClient.svelte.ts        # SSE client
```

---

## Development

```bash
# Dev servers
bun run dev:web       # thoth-web dashboard
bun run dev:docs      # thoth-docs catalog

# Typecheck
bun run check

# Test
bun run vitest

# Lint + format
bun run lint          # biome
bun run format        # biome auto-fix
```

---

## License

MIT — see root [LICENSE](../../LICENSE).
