# Composables

All composables follow the `createX()` or `useX()` pattern using Svelte 5 runes (`$state`, `$derived`, `$effect`).

---

## Data Layer

### `createQuery` & `createMutation`
Manage server queries and state mutations with caching, retry strategies, and loading statuses.

```ts
import { createQuery, createMutation } from "bindrunes";

const users = createQuery<User[]>({
  key: "/api/users",
  fetcher: () => fetch("/api/users").then(r => r.json()),
  staleTime: 30_000
});

const createUser = createMutation<User, NewUser>({
  mutator: (user) => api.post("/users", user),
  onSuccess: () => invalidateQuery("/api/users")
});
```

- **`invalidateQuery(key)`**: Invalidates cached keys.
- **`setQueryData(key, data)`**: Optimistically updates queries.

### `createAsyncState`
Reactive wrapper for async operations with loading, error, and data states.

```ts
import { createAsyncState } from "bindrunes";

const user = createAsyncState(
  () => fetch("/api/users/1").then(r => r.json()),
  { immediate: true }
);
// user.isLoading, user.data, user.error
```

### `createTable`
State machine for sorting, pagination, and filtering in tables.

```ts
const table = createTable({ data: usersList, columns: [{ key: "name", sortable: true }] });
```

---

## Forms

### `createForm` & `createWizard`
Typesafe form and multi-step wizard state with Valibot schema validations.

```ts
import { createForm } from "bindrunes";
import { string, minLength } from "valibot";

const form = createForm({
  schema: {
    name: string([minLength(1, "Name required")])
  },
  onSubmit: async (values) => api.post("/users", values)
});
```

### `validateWithSchema`
Standalone validation utility using Valibot schemas.

```ts
import { validateWithSchema } from "bindrunes";

const errors = validateWithSchema(schema, values);
```

---

## Auth & RBAC

### `createAuth` & `createAccess`
Reactive authentication token handling and Role-Based Access Controls.

```ts
import { createAuth, createAccess } from "bindrunes";

const auth = createAuth();
const access = createAccess(auth);

if (access.hasRole("admin") && access.hasPermission("users:write")) {
  // admin actions
}
```

### `createAuthProvider` / `useAuthProvider`
Context provider for auth state across components.

```ts
import { createAuthProvider, useAuthProvider } from "bindrunes/boundrune";

// In root layout:
const auth = createAuthProvider({
  onLogin: async (email, password) => { /* ... */ },
  onLogout: () => { /* ... */ }
});

// In any child component:
const auth = useAuthProvider();
console.log(auth.isAuthenticated, auth.user);
```

### `hasRole` / `hasAnyRole` / `hasPermission`
Role-Based Access Control checks.

```ts
import { hasRole, hasAnyRole, hasPermission } from "bindrunes";

hasRole(user, "admin");          // true if user has "admin" role
hasAnyRole(user, ["admin", "editor"]);
hasPermission(user, "users:write");
```

### `createCrudProvider` / `useCrudProvider`
Context provider for CRUD operations across components.

```ts
import { createCrudProvider, useCrudProvider } from "bindrunes/boundrune";

// In parent:
const crud = createCrudProvider();

// In child:
const crud = useCrudProvider();
crud.setItems(data);
crud.toggleSelect(id);
```

---

## Design System

### `createTheme` / `createAesthetic` / `createDensity`
Runtime switching of the three design axes.

```ts
import { createTheme, createAesthetic, createDensity } from "bindrunes";

const theme = createTheme({ default: "editorial" });
const aesthetic = createAesthetic({ default: "glass" });
const density = createDensity({ default: "comfortable" });

theme.setTheme("dracula");
aesthetic.setAesthetic("bento");
density.setDensity("spacious");
```

### `defineTheme` / `extendTheme`
Create custom themes programmatically.

```ts
import { defineTheme, extendTheme } from "bindrunes";

const myTheme = defineTheme("my-brand", { "--primary": "oklch(0.60 0.15 250)" });
myTheme.apply();
```

### `createThemeBuilder`
Runtime theme token builder with all token categories (colors, spacing, shadows, borders, radii).

```ts
import { createThemeBuilder } from "bindrunes";

const builder = createThemeBuilder("my-theme");
builder.setToken("--primary", "oklch(0.60 0.15 250)");
builder.exportCSS(); // Returns CSS string
```

### `createDarkMode`
Reactive dark mode toggling with system preference detection.

```ts
import { createDarkMode } from "bindrunes";

const dark = createDarkMode();
dark.toggle();
// dark.isDark, dark.mode ("light" | "dark" | "system")
```

### `createPrefersTheme`
Detect and react to the OS-level color scheme preference.

```ts
import { createPrefersTheme } from "bindrunes";

const prefers = createPrefersTheme();
// prefers.current — "light" | "dark"
```

---

## Localization & UI State

### `createI18n`
Reactive dictionary-based locale switching.
```ts
const t = createI18n({ default: "en", dicts: { en: enDict } });
```

### `createI18nContext` / `useI18n`
Context-based i18n for sharing a dictionary across a component tree.
```ts
import { createI18nContext, useI18n } from "bindrunes";

// In a parent:
createI18nContext({ default: "en", dicts: { en: enDict } });

// In any child:
const t = useI18n();
t("greeting"); // Looks up "greeting" key in active dictionary
```

### `createTable`
State machine for sorting, pagination, and filtering in tables.
```ts
const table = createTable({ data: usersList, columns: [{ key: "name", sortable: true }] });
```

### `createOmnibar`
State container for global launcher keyboard controls (Cmd+K).

### `createToast`
Toast notification composable (dynamic import of svelte-sonner).
```ts
import { createToast } from "bindrunes";
const toast = createToast({ defaultDuration: 4000 });
toast.success("Saved!");
```

---

## Reactivity Composables

### `useClickOutside`
Detect clicks outside an element.
```ts
import { useClickOutside } from "bindrunes";
useClickOutside(element, () => close());
```

### `useDebounce` / `useThrottle`
Debounce or throttle reactive values.
```ts
import { useDebounce, useThrottle } from "bindrunes";
const debouncedSearch = useDebounce(searchValue, 300);
const throttledScroll = useThrottle(scrollY, 100);
```

### `useClipboard`
Copy to clipboard with success/error feedback.
```ts
import { useClipboard } from "bindrunes";
const { copied, copy } = useClipboard();
await copy("text to copy");
```

### `createMediaQuery`
Reactive media query matching.
```ts
import { createMediaQuery } from "bindrunes";

const isMobile = createMediaQuery("(max-width: 768px)");
// isMobile.current — boolean
```

### `createPersistedDataAttribute`
Persist a data attribute to localStorage and re-apply on load.
```ts
import { createPersistedDataAttribute } from "bindrunes";

createPersistedDataAttribute("theme", "data-theme");
```

### `useResizeObserver`
Observe element size changes.
```ts
import { useResizeObserver } from "bindrunes";
useResizeObserver(element, (entry) => {
  console.log(entry.contentRect.width);
});
```

### `useIntersectionObserver`
Detect element visibility for lazy loading.
```ts
import { useIntersectionObserver } from "bindrunes";
useIntersectionObserver(element, (isIntersecting) => {
  if (isIntersecting) loadImage();
});
```

### `useEventListener`
Generic event listener with auto-cleanup.
```ts
import { useEventListener } from "bindrunes";
useEventListener("resize", () => handleResize());
```

### `useLocalStorage`
Reactive localStorage wrapper.
```ts
import { useLocalStorage } from "bindrunes";
const theme = useLocalStorage("theme", "light");
theme.set("dark");
```

### `useCounter` / `useToggle`
Simple state helpers.
```ts
import { useCounter, useToggle } from "bindrunes";
const counter = useCounter(0);
counter.increment();

const toggle = useToggle(false);
toggle.toggle();
```

### `useInterval` / `useTimeout`
Timer composables with auto-cleanup.
```ts
import { useInterval, useTimeout } from "bindrunes";
useInterval(() => fetchData(), 5000);
useTimeout(() => redirect(), 30000);
```

### `useDebouncedCallback`
Creates a debounced version of a callback. Delays execution until `delay` ms after the last call.
```ts
import { useDebouncedCallback } from "bindrunes";

const debouncedSearch = useDebouncedCallback((query: string) => {
  searchAPI(query);
}, 300);
```

### `useInfiniteScroll`
Triggers a callback when a sentinel element enters the viewport. Use for infinite scroll patterns.
```ts
import { useInfiniteScroll } from "bindrunes";

useInfiniteScroll(sentinelElement, {
  onLoadMore: async () => {
    const more = await loadNextPage();
    return more; // false to stop observing
  },
});
```

### `useVirtualList`
Virtual list for rendering large datasets. Only renders items visible in viewport plus overscan buffer.
```ts
import { useVirtualList } from "bindrunes";

const { visibleItems, containerStyle, scrollTo } = useVirtualList(items, {
  itemHeight: 40,
  overscan: 5,
});
```

### `useReducedMotion`
Detect `prefers-reduced-motion` media query.
```ts
import { useReducedMotion } from "bindrunes";
const { current: reducedMotion } = useReducedMotion();
```

### `useUrlParams`
Sync state with URL search parameters.
```ts
import { useUrlParams } from "bindrunes";
const { getParam, setParam } = useUrlParams();
setParam("page", "2");
```

---

## Context Patterns

### `createMetaContext` / `useMetaContext`
Type-safe Svelte context wrapper using Symbol keys.

```ts
import { createMetaContext, useMetaContext } from "bindrunes";

const KEY = Symbol("my-context");
export function createMyState() {
  return createMetaContext(KEY, () => { /* state */ });
}
export function getMyState() {
  return useMetaContext(KEY);
}
```

---

## General Utilities

- **`cn(...classes)`**: Merge class names with Tailwind conflict resolution (last-wins per utility prefix).
- **`shortcut(element, options)`**: Svelte action for keyboard shortcut binding.
- **`createApiClient(config)`**: Fetch client wrapping JSON parsing and headers.
- **`createStorage(prefix)`**: LocalStorage wrapper with key prefixing.
- **`createEnv(config)`**: Env variables reader with fallback defaults.
- **`useHead(metadata)`**: Updates document page headers and Open Graph properties.
- **`useBreakpoint(width)`**: Detects viewport breakpoint matches.
- **`RealtimeClient(config)`**: SSE client with reconnection behaviors.
- **`handleSSEEvent(event, router)`**: SSE event router for dispatching typed events.
- **`getChartTheme()`**: Reads theme colors for Chart.js integrations.
- **`formatDate` / `formatDateShort` / `formatDateTime` / `formatTime`**: Locale-aware date formatters.
- **`formatNumber` / `formatPercentage` / `formatBytes` / `formatRelative`**: Number and byte formatters.
- **`getLocale()` / `setLocale(locale)`**: Get/set the active locale for formatters.
- **`hexToOklch` / `oklchToHex`**: Color space conversion utilities.
- **`checkContrast` / `oklchContrast` / `parseOklch`**: Color contrast checking utilities.
- **`semanticColors`**: Mapping of semantic color names to CSS custom properties.
- **`defaultTableFallbacks`**: Default cell renderers and empty states for `DataTable`.
- **`isBrowser`**: SSR-safe browser detection.
- **`isSafeRedirect(url)`**: URL validation for open redirect prevention.
- **`toError(err)`**: Normalize unknown errors to Error objects.
