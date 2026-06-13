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

---

## Localization & UI State

### `createI18n`
Reactive dictionary-based locale switching.
```ts
const t = createI18n({ default: "en", dicts: { en: enDict } });
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

- **`createApiClient(config)`**: Fetch client wrapping JSON parsing and headers.
- **`createStorage(prefix)`**: LocalStorage wrapper with key prefixing.
- **`createEnv(config)`**: Env variables reader with fallback defaults.
- **`useHead(metadata)`**: Updates document page headers and Open Graph properties.
- **`useBreakpoint(width)`**: Detects viewport breakpoint matches.
- **`RealtimeClient(config)`**: SSE client with reconnection behaviors.
- **`getChartTheme()`**: Reads theme colors for Chart.js integrations.
- **`formatDate` / `formatNumber`**: Locale-aware string formatters.
- **`hexToOklch` / `oklchToHex`**: Color space conversion utilities.
- **`isBrowser`**: SSR-safe browser detection.
- **`isSafeRedirect(url)`**: URL validation for open redirect prevention.
- **`toError(err)`**: Normalize unknown errors to Error objects.
