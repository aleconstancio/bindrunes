# Showcase Perfection — Design Spec

**Date:** 2026-06-12
**Goal:** Make the urupe-ui showcase a nobrainer local site that demonstrates ALL urupe-ui capabilities — fix bugs, add missing demos, and polish UX.

---

## 1. Bug Fixes & Cleanup

### 1.1 Broken link
- `examples/showcase/src/routes/landing/+page.svelte` lines 44 and 104: change `/auth/signup` → `/auth/register`

### 1.2 Unused imports (6 files)
| File | Remove |
|------|--------|
| `landing/+page.svelte` | `VideoEmbed` |
| `marketing/blog/+page.svelte` | `Button`, `Card`, `Badge`, `Block` |
| `data/list/+page.svelte` | `Button` |
| `media/+page.svelte` | `Card` |
| `chat/+page.svelte` | `TypingIndicator` |
| `app/+page.svelte` | `Suspense` |

### 1.3 Missing nav link
- Add a card/link on `/dashboard` page pointing to `/dashboard/split` (not top nav — it's a variant)

---

## 2. Missing Demos — Added to Existing Pages

### 2.1 `/app` — App Shell & Design System
- **ThemeStudio** — live theme/aesthetic/density switcher with preview and export
- **Omnibar** — command palette demo triggered by Ctrl+K
- **`shortcut` action** — keyboard shortcut demo
- **UI composables panel** — `useBreakpoint`, `useClipboard`, `useLocalStorage`, `useToggle` with interactive buttons

### 2.2 `/dashboard` — Dashboard Shell Variants
- **3 shell variants** — tabs switching between default (left sidebar), right sidebar, and topnav variants
- **Split layout** — card linking to `/dashboard/split`
- **QuickActions** widget demo
- **DashboardFooter** demo
- **Replace chart placeholder** with a `DataChart` bar chart using mock data

### 2.3 `/landing` — Landing Sections
- **VideoEmbed** — render the already-imported component (YouTube/vimeo placeholder)
- **TeamSection** — team members grid with avatars
- **LogoCloud** — partner/trust logos
- **IntegrationGrid** — integration partner cards
- **Newsletter** — email subscription form

### 2.4 `/marketing/blog` — Content Components
- **BlogArticle** — single article view with rich content
- **ContentWithImage** — image + text section layout
- **Maintenance** — maintenance page banner
- **Popup** — modal popup trigger demo
- **ReleaseNotes** — release notes display
- **SocialProof** — social proof strip

### 2.5 `/portfolio` — Portfolio
- **CaseStudy** — detailed case study page with sections

### 2.6 `/data/list` — Data & Forms
- **WizardForm** — multi-step form wizard with per-step validation
- **ExportFlow** — data export dialog
- **ImportFlow** — file import with preview
- **AdvancedTable** — advanced table features (column toggling, density)
- **FacetedSearch** — faceted filter panel
- **createForm** — live form with valibot validation
- **createQuery/createMutation** — data fetching mock with loading/error/success states

### 2.7 `/ecommerce` — E-commerce
- **Checkout** — checkout flow with address/payment steps
- **OrderSummary** — order summary card
- **PriceTag** — price display component

### 2.8 `/media` — Media
- **VideoPlayer** — video player demo

### 2.9 `/chat` — Chat
- **TypingIndicator** — render the already-imported component
- **RealtimeClient** — mock SSE connection demo with simulated events

### 2.10 Cross-cutting: i18n
- Language toggle (EN/PT-BR) in the header using `createI18n`

---

## 3. UX Polish

### 3.1 Navigation improvements
- **Sticky sidebar navigation** on longer pages (settings, data) for quick section jumping
- **"Back to overview"** breadcrumb link on every sub-page
- **Cross-links between related demos** — e.g., dashboard → settings, ecommerce → checkout

### 3.2 Component index page
- New `/components` route (linked from header)
- Searchable/filterable grid of ALL 88 core components + 67 boundrune components
- Each card: name, category, one-line description, link to demo page

### 3.3 Header improvements
- **Omnibar trigger** in header (Ctrl+K hint)
- **GitHub link** and **npm link** in header
- **i18n language toggle** (EN/PT-BR) in header

### 3.4 Page-level polish
- Consistent `PageHeader` on every page
- Consistent section structure: title → description → live preview
- Empty states where appropriate (empty cart, no results)

### 3.5 Home page refresh
- Hero section with library tagline
- Stats bar (160+ components, 47 composables, 6 themes, 12 boundrune categories)
- Improved card grid with better hover states and category icons

---

## Scope

- **Files modified:** ~20 existing route files + 1 new route (`/components`)
- **No library changes** — all work is in `examples/showcase/`
- **No new dependencies** — only uses components already exported by urupe-ui

---

## Order of Work

1. Bug fixes & cleanup (quick wins)
2. Home page refresh
3. Header improvements (nav, links, i18n toggle)
4. `/app` page — ThemeStudio, Omnibar, composables
5. `/dashboard` — shell variants, chart, QuickActions
6. `/data/list` — wizard, export/import, createForm, createQuery
7. `/ecommerce` — checkout, order summary
8. `/landing` — missing sections
9. `/marketing/blog` — missing content components
10. `/portfolio` — case study
11. `/media` — video player
12. `/chat` — typing indicator, realtime mock
13. Component index page
14. Cross-links and breadcrumb navigation
15. Final polish pass
