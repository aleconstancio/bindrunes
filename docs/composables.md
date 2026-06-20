# Composables

All composables follow the `useX()` pattern using Svelte 5 runes (`$state`, `$derived`, `$effect`). Context providers use the `createX()` / `useX()` dual pattern.

---

## Data Layer

### `useQuery` & `useMutation`
Manage server queries and state mutations with caching, retry strategies, and loading statuses.

```ts
import { useQuery, useMutation } from "bindrunes";

const users = useQuery<User[]>({
  key: "/api/users",
  fetcher: () => fetch("/api/users").then(r => r.json()),
  staleTime: 30_000
});

const createUser = useMutation<User, NewUser>({
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

### `useTable`
State machine for sorting, pagination, and filtering in tables.

```ts
import { useTable } from "bindrunes";

const table = useTable({ data: usersList, columns: [{ key: "name", sortable: true }] });
```

---

## Forms

### `useForm` & `useWizard`
Typesafe form and multi-step wizard state with Valibot schema validations.

```ts
import { useForm } from "bindrunes";
import { string, minLength } from "valibot";

const form = useForm({
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

### `useAuth` & `useAccess`
Reactive authentication token handling and Role-Based Access Controls.

```ts
import { useAuth, useAccess } from "bindrunes";

const auth = useAuth();
const access = useAccess(auth);

if (access.hasRole("admin") && access.hasPermission("users:write")) {
  // admin actions
}
```

### `createAuthProvider` / `useAuth`
Context provider for auth state across components. `createAuthProvider` is called in the root layout; `useAuth` retrieves the state in any child component.

```ts
import { createAuthProvider, useAuth } from "bindrunes/domains/auth";

// In root layout:
const auth = createAuthProvider({
  onLogin: async (email, password) => { /* ... */ },
  onLogout: () => { /* ... */ }
});

// In any child component:
const auth = useAuth();
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

### `createCrudProvider` / `useCrud`
Context provider for CRUD operations across components.

```ts
import { createCrudProvider, useCrud } from "bindrunes/domains/data";

// In parent:
const crud = createCrudProvider();

// In child:
const crud = useCrud();
crud.setItems(data);
crud.toggleSelect(id);
```

---

## Design System

### `useTheme` / `useAesthetic` / `useDensity`
Runtime switching of the three design axes.

```ts
import { useTheme, useAesthetic, useDensity } from "bindrunes";

const theme = useTheme({ default: "editorial" });
const aesthetic = useAesthetic({ default: "glass" });
const density = useDensity({ default: "comfortable" });

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

### `useDarkMode`
Reactive dark mode toggling with system preference detection.

```ts
import { useDarkMode } from "bindrunes";

const dark = useDarkMode();
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

### `useTable`
State machine for sorting, pagination, and filtering in tables.
```ts
import { useTable } from "bindrunes";
const table = useTable({ data: usersList, columns: [{ key: "name", sortable: true }] });
```

### `createOmnibar`
State container for global launcher keyboard controls (Cmd+K).

### `useToast`
Toast notification composable (dynamic import of svelte-sonner).
```ts
import { useToast } from "bindrunes";
const toast = useToast({ defaultDuration: 4000 });
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
export function useMyContext() {
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
