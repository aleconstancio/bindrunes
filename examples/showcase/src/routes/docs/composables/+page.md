# Composables

All composables follow the `useX()` pattern with Svelte 5 runes. Context providers use `createX()` / `useX()`.

---

## Data Layer

### `useQuery`

Server data fetching with caching, stale-while-revalidate, and retry.

```ts
import { useQuery } from "urupe-ui";

const users = useQuery<User[]>({
  key: "/api/users",
  fetcher: () => fetch("/api/users").then(r => r.json()),
  staleTime: 30_000,
});
```

### `useMutation`

Optimistic mutations with invalidation.

```ts
import { useMutation, invalidateQuery } from "urupe-ui";

const createUser = useMutation<User, NewUser>({
  mutator: (user) => api.post("/users", user),
  onSuccess: () => invalidateQuery("/api/users"),
});
```

### `invalidateQuery` / `setQueryData`

```ts
import { invalidateQuery, setQueryData } from "urupe-ui";

invalidateQuery("/api/users");
setQueryData<User[]>("/api/users", (prev) => [...prev, newUser]);
```

---

## Forms

### `useForm`

Valibot-validated form state.

```ts
import { useForm } from "urupe-ui";
import { string, minLength, email } from "valibot";

const form = useForm({
  schema: {
    name: string([minLength(1, "Required")]),
    email: string([email("Invalid email")]),
  },
  onSubmit: async (values) => api.post("/users", values),
});
```

### `useWizard`

Multi-step form with step tracking.

```ts
import { useWizard } from "urupe-ui";

const wizard = useWizard({ steps: ["info", "payment", "confirm"] });
wizard.next();
wizard.prev();
```

### `validateWithSchema`

Standalone Valibot validation.

```ts
import { validateWithSchema } from "urupe-ui";

const errors = validateWithSchema(schema, values);
```

---

## Auth

### `useAuth`

Reactive auth state (token, user, loading).

```ts
import { useAuth } from "urupe-ui";

const auth = useAuth();
// auth.user, auth.isAuthenticated, auth.token
```

### `useAccess`

Role-based access control checks.

```ts
import { useAccess } from "urupe-ui";

const access = useAccess(auth);
access.hasRole("admin");
access.hasPermission("users:write");
```

---

## Design System

### `useTheme`

Runtime theme, aesthetic, density switching with dark mode control.

```ts
import { useTheme } from "urupe-ui";

const theme = useTheme({ default: "editorial" });
theme.setTheme("dracula");
theme.toggleMode();
theme.setMode("dark");
theme.isDark;
```

### `useAesthetic`

```ts
import { useAesthetic } from "urupe-ui";

const aesthetic = useAesthetic({ default: "minimal" });
aesthetic.setAesthetic("glass");
```

### `useDensity`

Supports responsive mode via media query.

```ts
import { useDensity } from "urupe-ui";

// Persisted preference
const density = useDensity({ default: "comfortable" });

// Responsive — derives from viewport
const density = useDensity({ responsive: { compact: 768, spacious: 1200 } });
```

### `createTheme`

Define or extend themes programmatically.

```ts
import { createTheme } from "urupe-ui";

// New theme
const myBrand = createTheme({
  name: "my-brand",
  tokens: { "--primary": "oklch(0.60 0.15 250)" },
});

// Extend existing
const custom = createTheme({
  base: "dracula",
  tokens: { "--primary": "oklch(0.8 0.25 320)" },
});
```

---

## Reactivity

### `useDebounce`

Overloaded: reactive value debounce or callback debounce.

```ts
import { useDebounce } from "urupe-ui";

// Value debounce
const debounced = useDebounce(searchValue, 300);

// Callback debounce
const debouncedFetch = useDebounce((q: string) => searchAPI(q), 300);
```

### `useClickOutside`

```ts
import { useClickOutside } from "urupe-ui";
useClickOutside(element, () => close());
```

### `useClipboard`

```ts
import { useClipboard } from "urupe-ui";
const { copied, copy } = useClipboard();
await copy("text to copy");
```

### `useEventListener`

```ts
import { useEventListener } from "urupe-ui";
useEventListener("resize", () => handleResize());
```

### `useLocalStorage`

```ts
import { useLocalStorage } from "urupe-ui";
const theme = useLocalStorage("theme", "light");
theme.set("dark");
```

### `useMediaQuery`

```ts
import { useMediaQuery } from "urupe-ui";
const isMobile = useMediaQuery("(max-width: 768px)");
```

### `useIntersectionObserver`

```ts
import { useIntersectionObserver } from "urupe-ui";
useIntersectionObserver(element, (visible) => {
  if (visible) loadImage();
});
```

### `useResizeObserver`

```ts
import { useResizeObserver } from "urupe-ui";
useResizeObserver(element, (entry) => {
  console.log(entry.contentRect.width);
});
```

### `useInfiniteScroll`

```ts
import { useInfiniteScroll } from "urupe-ui";
useInfiniteScroll(sentinel, {
  onLoadMore: async () => fetchNextPage(),
});
```

### `useVirtualList`

```ts
import { useVirtualList } from "urupe-ui";
const { visibleItems, containerStyle } = useVirtualList(items, {
  itemHeight: 40,
  overscan: 5,
});
```

### Other Reactivity Composables

```ts
import {
  useAnimation, useBreakpoint, useCounter, useHead,
  useInterval, useReducedMotion, useThrottle, useTimeout,
  useToggle, useUrlParams,
} from "urupe-ui";

const counter = useCounter(0);
counter.increment();

const toggle = useToggle(false);
toggle.toggle();

useInterval(() => fetchData(), 5000);
useTimeout(() => redirect(), 30000);

const { current: reducedMotion } = useReducedMotion();
```

---

## Context

### `createMetaContext` / `useMetaContext`

Type-safe Svelte context with Symbol keys.

```ts
import { createMetaContext, useMetaContext } from "urupe-ui";

const KEY = Symbol("app-context");
export function createAppState() {
  return createMetaContext(KEY, () => { /* state */ });
}
export function useAppState() {
  return useMetaContext(KEY);
}
```

### `useMultiTenant` / `createMultiTenantContext`

```ts
import { useMultiTenant, createMultiTenantContext } from "urupe-ui";

// Provider
createMultiTenantContext({
  tenantId: "org_123",
  onSwitch: async (id) => reload(id),
});

// Consumer
const tenant = useMultiTenant();
```

---

## Utilities

### `createApiClient`

```ts
import { createApiClient } from "urupe-ui";
const api = createApiClient({ baseUrl: "/api", headers: { Authorization: `Bearer ${token}` } });
```

### `createEnv`

```ts
import { createEnv } from "urupe-ui";
const env = createEnv({ PUBLIC_API_URL: { default: "http://localhost:3000" } });
```

### `createStorage`

```ts
import { createStorage } from "urupe-ui";
const storage = createStorage("my-app");
storage.get("key");
storage.set("key", "value");
```

### `createI18n`

```ts
import { createI18n } from "urupe-ui";
const t = createI18n({ default: "en", dicts: { en: enDict } });
t("greeting");
```

### `useToast`

```ts
import { useToast } from "urupe-ui";
const toast = useToast({ defaultDuration: 4000 });
toast.success("Saved!");
```

### `useOmnibar`

```ts
import { useOmnibar } from "urupe-ui";
const omnibar = useOmnibar();
// omnibar.open(), omnibar.close()
```

### `useTable`

```ts
import { useTable } from "urupe-ui";
const table = useTable({ data: rows, columns: [{ key: "name", sortable: true }] });
```

### Other Utilities

```ts
import {
  createPrefersTheme, createSessionMonitor, createTransition,
  createStaggerChildren, createSseBridge, createRealtime,
  createPersistedDataAttribute,
} from "urupe-ui";

const prefers = createPrefersTheme();
// prefers.current — "light" | "dark"

const monitor = createSessionMonitor({
  onIdle: () => logout(),
  idleTimeout: 300_000,
});
```

---

## Formatting

```ts
import {
  formatBytes, formatDate, formatDateShort, formatDateTime,
  formatTime, formatNumber, formatPercentage, formatRelative,
  getLocale, setLocale,
} from "urupe-ui";

formatBytes(1024);          // "1.0 KB"
formatDate(new Date());     // "Jun 25, 2026"
formatNumber(1234.56);      // "1,234.56"
setLocale("de-DE");
```
