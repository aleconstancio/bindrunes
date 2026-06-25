# bindrunes v3.0 — Server-First Rewrite + Responsive Hybrid

## Overview

v3.0 is the foundation release of the v3 roadmap. It adds native Svelte 5 server component support and a hybrid responsive system (CSS-native + JS adaptive). This positions bindrunes for the future of web development — server-first rendering with progressive enhancement.

## Roadmap

| Version | Focus | Status |
|---------|-------|--------|
| **v3.0** | Server-first + Responsive hybrid | This spec |
| **v3.1** | Advanced mobile (gestures, swipe, haptic) | Future |
| **v3.2** | Motion & animation (scroll-linked, view transitions) | Future |

---

## 1. Server Component Architecture

### New Layer

```
Templates (Layer 4)
  └── Domains (Layer 3)
       └── Layouts (Layer 2)
            └── Primitives (Layer 1)
                 └── Server (NEW — Layer 0)
```

### Export Path

`bindrunes/server` — Server-only components and utilities.

### Server Components

Render on the server, send HTML to the client, hydrate only when interacted with:
- Zero JS for non-interactive components on first paint
- Full content for search engines
- Streaming SSR sends HTML chunks as they render

### Component Classification

**Server components** (static, read-only):
- Layout: PageShell, Sidebar, DashboardShell, MetaLayout, MetaContainer
- Display: Card, Badge, Avatar, Alert, StatusChip, MetricCard
- Data: DataTable, DataGrid, ListPage
- Landing: HeroBanner, PricingTable, Testimonial, FeatureGrid, LogoCloud
- Marketing: BlogArticle, BlogListing, ChangelogPage, ReleaseNotes
- Navigation: Breadcrumb, NavigationMenu

**Client-only** (need interaction):
- Forms: Input, Select, Checkbox, Switch, Combobox, DatePicker, FileUpload
- Overlays: Dialog, Drawer, DropdownMenu, Popover, AlertDialog, Sheet
- Interactive: Tabs, Accordion, Stepper, CommandPalette, Omnibar
- Agentic: All copilot components

### Server API Pattern

```svelte
<script lang="server">
  import { Card } from "bindrunes/server";
  let { title, content } = $props();
</script>

<Card variant="glass">
  <h2>{title}</h2>
  <p>{content}</p>
</Card>
```

### Server Utilities

```ts
// bindrunes/server
export { createServerTheme } from "./utils/createServerTheme.svelte.ts";
export { useThemeServer } from "./utils/useThemeServer.svelte.ts";
export { useDensityServer } from "./utils/useDensityServer.svelte.ts";
export { renderComponent } from "./utils/renderComponent.ts";
```

---

## 2. Responsive Hybrid Layer

### CSS Layer (Zero JS)

All components get responsive behavior through CSS container queries and fluid tokens:

```css
/* Fluid spacing — adapts to viewport */
--space-4: clamp(0.75rem, 1.5vw, 1rem);
--space-6: clamp(1rem, 2vw, 1.5rem);

/* Container queries — adapt to parent */
@container (min-width: 640px) { .card { padding: var(--space-6); } }
@container (min-width: 1024px) { .card { display: grid; grid-template-columns: 1fr 1fr; } }

/* Fluid typography */
--text-body-md: clamp(0.875rem, 1.2vw, 1rem);
```

### New Density Mode: `auto`

Derives density from viewport width automatically:
- `< 640px` → compact
- `640-1024px` → comfortable
- `> 1024px` → spacious

### JS Layer (Opt-in)

New export: `bindrunes/responsive`

| Composable | Purpose |
|------------|---------|
| `useGesture()` | Swipe, pinch, long-press, drag |
| `useScroll()` | Sticky headers, parallax, scroll-linked |
| `useOrientation()` | Landscape/portrait adaptation |
| `useViewport()` | Breakpoint detection, safe areas |

### Responsive Tokens

```css
--responsive-card-padding: var(--space-4);
--responsive-sidebar-width: 280px;
--responsive-grid-columns: 1;

@container (min-width: 768px) {
  --responsive-grid-columns: 2;
  --responsive-sidebar-width: 320px;
}
```

---

## 3. Progressive Hydration

### Strategies

| Strategy | When | Use Case |
|----------|------|----------|
| `eager` | Immediately | Above-the-fold interactive |
| `visible` | Scrolled into view | Below-the-fold cards |
| `idle` | Browser idle | Non-critical interactive |
| `interaction` | First click/touch | Tooltips, dialogs |

### Component API

```svelte
<Card hydrate="visible">
  <DataTable data={rows} />
</Card>

<Dialog hydrate="interaction">
  <ConfirmDialog />
</Dialog>
```

### Server Hint

Server components emit `<template data-hydrate="visible">` markers. Client runtime picks them up via IntersectionObserver.

---

## 4. Breaking Changes

| v2 API | v3 Change | Migration |
|--------|-----------|-----------|
| `useTheme()` | Split into `useTheme()` + `useThemeServer()` | Server components use `useThemeServer()` |
| `useDensity()` | Split into `useDensity()` + `useViewport()` | `useViewport()` replaces responsive option |
| `createTheme()` | Add server variant | `createThemeServer()` for SSR context |
| `AppProvider` | Rename to `ThemeProvider` | Clearer purpose |
| Peer dep `mode-watcher` | Remove | Absorbed into `useTheme().toggleMode()` |
| Peer dep `lucide-svelte` | Optional | Icons ship as inline SVG |

---

## 5. Phased Delivery

### Phase 1: Server Foundation (v3.0-alpha)
- Create `bindrunes/server` export path
- Server variants of 20 most-used components
- `createServerTheme()` and `useThemeServer()`
- Progressive hydration system

### Phase 2: Responsive System (v3.0-beta)
- CSS container query integration for all components
- Fluid token system
- `useViewport()` composable
- `auto` density mode

### Phase 3: Polish & Ship (v3.0)
- Remaining server components (full coverage)
- Documentation rewrite
- Migration guide
- Performance benchmarks

---

## 6. Implementation Order

1. Create `bindrunes/server` export path and barrel
2. Implement `createServerTheme()` + `useThemeServer()`
3. Create server variants of core components (Card, Button, Badge, Alert, Avatar)
4. Implement progressive hydration system
5. Add CSS container queries to existing components
6. Implement fluid token system
7. Create `bindrunes/responsive` export
8. Implement `useViewport()` composable
9. Add `auto` density mode
10. Server variants for layout components (PageShell, Sidebar, DashboardShell)
11. Server variants for domain components (landing, marketing)
12. Documentation rewrite
13. Migration guide
14. Performance benchmarks
