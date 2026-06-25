# bindrunes v2.0 API Redesign

## Overview

Ground-up API cleanup and consolidation for bindrunes v2.0. No migration concern — fresh start.

**Focus:** API cleanup + consolidation of overlapping APIs, removal of deprecated paths, unified naming conventions, and TypeScript DX improvements.

---

## 1. Export Path Restructuring

### Current (14 paths)

| Path | What |
|------|------|
| `.` | Primitives + composables + utilities + types + templates (275 lines) |
| `./layouts` | Layout components (42 lines) |
| `./domains` | All 12 domains barrel-re-exported |
| `./domains/*` | Individual domain |
| `./templates` | 10 pre-composed page templates |
| `./playground` | Dev playground |
| `./scaffold` | Alias for playground |
| `./scaffold/app.css` | CSS file |
| `./landing` | Alias for landing domain |
| `./i18n/*` | Translation dictionaries |
| `./boundrune` | Deprecated alias for domains |
| `./tailwind` | Tailwind plugin |
| `./styles/*` | Theme CSS files |
| `./agentic` | Agentic kernel |

### v2 (7 paths)

| Path | What | Change |
|------|------|--------|
| `.` | Primitives + composables + utilities + types | Templates removed |
| `./layouts` | Layouts + templates (merged) | Templates fold in |
| `./domains/<name>` | Individual domain only | No barrel `./domains` |
| `./agentic` | Agentic kernel | Unchanged |
| `./tailwind` | Tailwind plugin | Unchanged |
| `./styles/*` | Theme CSS | Unchanged |
| `./i18n/*` | Translation dicts | Unchanged |

### Removed Paths

| Path | Reason |
|------|--------|
| `./domains` (barrel) | Forces full import of all 12 domains |
| `./templates` | Merged into `./layouts` |
| `./playground` / `./scaffold` | Dev-only, not published |
| `./scaffold/app.css` | Dev-only |
| `./landing` | Redundant alias |
| `./boundrune` | Deprecated naming |

### Import Migration

```ts
// v1
import { DashboardTemplate, AuthTemplate } from "bindrunes/templates";
import { LoginForm } from "bindrunes/domains";
import { Button, Card } from "bindrunes";

// v2
import { DashboardTemplate, AuthTemplate } from "bindrunes/layouts";
import { LoginForm } from "bindrunes/domains/auth";
import { Button, Card } from "bindrunes";
```

---

## 2. Composable API Consolidation

### Merges

| v1 APIs | v2 Unified API | Rationale |
|---------|---------------|-----------|
| `defineTheme()` + `extendTheme()` + `createThemeBuilder()` | `createTheme()` | Three APIs for theme creation is confusing. Options: `{ name, tokens }` for define, `{ base, overrides }` for extend. Builder is internal. |
| `useTheme()` + `useDarkMode()` | `useTheme()` | `useDarkMode()` wraps `mode-watcher` — that's a theme concern. `useTheme()` gets `.toggleMode()`. |
| `useDebounce()` + `useDebouncedCallback()` | `useDebounce()` | Overloaded: `useDebounce(value, ms)` for reactive values, `useDebounce(callback, ms)` for functions. |
| `useAsyncState()` + `useQuery()` | `useQuery()` | `useAsyncState` is a subset of `useQuery` without caching. `useQuery({ cache: false })` replaces it. |
| `useDensity()` + `useResponsiveDensity()` | `useDensity()` | `useDensity()` gains `{ responsive: true }` option. Without it: persisted preference. With it: derives from media query. |

### Naming Fixes

| v1 File | v2 File | Reason |
|---------|---------|--------|
| `sseBridge.svelte.ts` | `createSseBridge.svelte.ts` | Follows `createX` convention |
| `staggerChildren.svelte.ts` | `createStaggerChildren.svelte.ts` | Factory, not a hook |
| `RealtimeClient.svelte.ts` | `createRealtime.svelte.ts` | Drop PascalCase |
| `hasRole.svelte.ts` | `useAccess.svelte.ts` | Align filename with export |
| `extendTheme.svelte.ts` | Merged into `createTheme.svelte.ts` | Consolidation |
| `defineTheme.svelte.ts` | Merged into `createTheme.svelte.ts` | Consolidation |
| `createThemeBuilder.ts` | Merged into `createTheme.svelte.ts` | Consolidation |
| `createI18nContext.svelte.ts` | `useI18n.svelte.ts` | Match `useX` consumer pattern |
| `provideWindowStore.svelte.ts` | `createWindowStoreProvider.svelte.ts` | Follow `createX` provider convention |

### Split Files

| v1 File | v2 Split | Reason |
|---------|----------|--------|
| `createMultiTenant.svelte.ts` | `useMultiTenant.svelte.ts` + `createMultiTenantContext.svelte.ts` | One concern per file |

### Removed Composables

| API | Replacement |
|-----|-------------|
| `useAsyncState()` | `useQuery({ cache: false })` |
| `useDarkMode()` | `useTheme().toggleMode()` |
| `extendTheme()` | `createTheme({ base, tokens })` |
| `defineTheme()` | `createTheme({ name, tokens })` |
| `createThemeBuilder()` (exported) | Internal only |

---

## 3. Barrel Export Cleanup & TypeScript DX

### Main Barrel Reduction

`src/index.ts`: 275 lines → ~120 lines.

**`src/index.ts`** (primitives + composables + utilities + types):
- Primitives: ~60 components
- Composables: ~40 `useX`/`createX` functions
- Utilities: `cn`, formatters, color converters, validators
- Types: shared type definitions

**`src/layouts/index.ts`** (layouts + templates):
- Layout primitives: PageShell, PageSection, MetaLayout, MetaContainer, Sidebar, etc.
- Dashboard shells: DashboardShell, etc.
- Templates: DashboardTemplate, AuthTemplate, etc. (moved from `src/templates/`)

### Domain Barrel Removal

Delete `src/domains/index.ts`. Consumers must import from specific domains:

```ts
// v1
import { LoginForm } from "bindrunes/domains";

// v2
import { LoginForm } from "bindrunes/domains/auth";
```

### TypeScript Improvements

| Area | Change |
|------|--------|
| Composable generics | `useQuery<T>()` and `useMutation<T>()` get better type inference — return type derives from fetcher/mutator generics. |
| Valibot integration | `useForm()` infers form state type from schema automatically. |
| Theme token types | `createTheme()` accepts a typed token map. |
| Exported types cleanup | Audit and remove internal types from public exports. |

### Anti-patterns Added to AGENTS.md

| Rule | Rationale |
|------|-----------|
| No `export let` — Svelte 5 runes only | Formalize existing practice |
| No legacy stores — `$state`/`$derived`/`$effect` only | Prevent regression |
| One exported function per file (except natural `createX`/`useX` pairs) | Prevents multi-export files |
| No `console.warn` in production — use `devWarning()` helper | Dev-only warnings |
| No barrel files for domains — granular imports only | Enforces tree-shaking |

---

## 4. Deprecated API Removal

### Removed APIs

| What | Why | Migration |
|------|-----|-----------|
| `SidebarLayout` | Deprecated since v1.1 | Use `MetaLayout` |
| `./boundrune` export path | Pre-v1.0 legacy | `bindrunes/domains/<name>` |
| `./landing` export path | Redundant alias | `bindrunes/domains/landing` |
| `./playground` / `./scaffold` exports | Dev-only | Import from source |
| `./scaffold/app.css` | Dev-only | `bindrunes/styles/global.css` |
| `LOCALE` direct export | `@deprecated` — unsafe in SSR | `getLocale()` |
| `useAsyncState` | Subset of `useQuery` | `useQuery({ cache: false })` |
| `useDarkMode` | Overlaps with `useTheme` | `useTheme().toggleMode()` |
| `defineTheme` | Consolidated | `createTheme({ name, tokens })` |
| `extendTheme` | Consolidated | `createTheme({ base, tokens })` |
| `createThemeBuilder` (exported) | Internal detail | `createTheme()` wraps it |

### New Helper: `devWarning()`

```ts
// src/utils/devWarning.ts
export function devWarning(condition: boolean, message: string) {
  if (import.meta.env?.DEV && condition) {
    console.warn(`[bindrunes] ${message}`);
  }
}
```

### Sidebar Components

All kept except `SidebarLayout` (removed).

---

## 5. Testing & Bundle Size

### Test Cleanup

| Action | Detail |
|--------|--------|
| Remove `SidebarLayout` tests | 2 test files, 19 references |
| Remove `useAsyncState` tests | Covered by `useQuery` |
| Remove `defineTheme` / `extendTheme` tests | Merged into `createTheme` |
| Remove `useDarkMode` tests | Merged into `useTheme` |
| Update `Sidebar.svelte.test.ts` | Remove SidebarLayout references |
| Update agentic tests | `SimulatorRuntime` → `createSimulatorRuntime` |
| Update `formatters.test.ts` | Remove `LOCALE` direct access test |

### Bundle Size Targets

| Bundle | v1 Limit | v2 Limit | Reason |
|--------|----------|----------|--------|
| `bindrunes` (main) | 15 kB | 16 kB | Slight growth from consolidated composables, offset by removed re-exports |
| `bindrunes/layouts` | 8 kB | 18 kB | Absorbs templates |
| `bindrunes/domains/<name>` | (single 12 kB) | 2 kB each | Granular per-domain |

---

## 6. Implementation Order

1. **Remove deprecated APIs** — SidebarLayout, deprecated export paths, LOCALE
2. **Consolidate theme APIs** — Merge defineTheme + extendTheme + createThemeBuilder → createTheme
3. **Consolidate composable overlaps** — useDarkMode → useTheme, useDebounce unification, useAsyncState → useQuery, useDensity unification
4. **Rename non-conforming files** — sseBridge, staggerChildren, RealtimeClient, hasRole, etc.
5. **Split multi-export files** — createMultiTenant
6. **Restructure exports** — Remove domain barrel, merge templates into layouts, clean package.json exports
7. **Reduce barrel size** — Trim src/index.ts to ~120 lines
8. **Add devWarning helper** — Replace console.warn calls
9. **Add new AGENTS.md rules** — Formalize anti-patterns
10. **Update tests** — Remove/update tests for removed/changed APIs
11. **Update bundle size limits** — New per-domain limits
12. **Update docs** — architecture.md, components.md, composables.md, AGENTS.md

---

## 7. Files Affected

### Deleted Files (~15)

- `src/layouts/sidebar/SidebarLayout.svelte` + tests
- `src/utils/defineTheme.svelte.ts` + test
- `src/utils/extendTheme.svelte.ts` + test
- `src/utils/createThemeBuilder.ts` + test
- `src/utils/useAsyncState.svelte.ts`
- `src/utils/useDarkMode.svelte.ts` + test
- `src/utils/useDebouncedCallback.svelte.ts` + test
- `src/domains/index.ts` (barrel)
- `src/templates/index.ts` (barrel — templates move to layouts)

### Renamed Files (~8)

- `src/utils/sseBridge.svelte.ts` → `createSseBridge.svelte.ts`
- `src/utils/staggerChildren.svelte.ts` → `createStaggerChildren.svelte.ts`
- `src/utils/RealtimeClient.svelte.ts` → `createRealtime.svelte.ts`
- `src/utils/hasRole.svelte.ts` → `useAccess.svelte.ts`
- `src/utils/createI18nContext.svelte.ts` → `useI18n.svelte.ts`
- `src/utils/agentic/provideWindowStore.svelte.ts` → `createWindowStoreProvider.svelte.ts`

### Split Files (1)

- `src/utils/createMultiTenant.svelte.ts` → `useMultiTenant.svelte.ts` + `createMultiTenantContext.svelte.ts`

### Modified Files (~20)

- `src/index.ts` — barrel reduction
- `src/layouts/index.ts` — absorb templates
- `packages/bindrunes/package.json` — export paths
- `src/utils/useTheme.svelte.ts` — absorb useDarkMode, add toggleMode
- `src/utils/useDebounce.svelte.ts` — absorb useDebouncedCallback
- `src/utils/useQuery.svelte.ts` — absorb useAsyncState pattern
- `src/utils/useDensity.svelte.ts` — absorb useResponsiveDensity
- `src/utils/createTheme.svelte.ts` — new consolidated file
- `src/utils/devWarning.ts` — new helper
- `src/utils/formatters.ts` — remove LOCALE export
- `src/utils/agentic/SimulatorRuntime.ts` — rename
- `.size-limit.json` — new limits
- `.agents/AGENTS.md` — new anti-patterns
- `docs/architecture.md` — update
- `docs/components.md` — update
- `docs/composables.md` — update
- `docs/design-system.md` — update
- `docs/agentic/overview.md` — update
