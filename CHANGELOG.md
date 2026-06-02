# Changelog — bindrunes

## v0.7.0 (2026-06-01)

### Added
- `Breadcrumb` component for multi-level navigation
- `PageHeader` component with back button, breadcrumbs, and action slots
- `FormField` component (Label + Input + error in one)
- `Stepper` component for wizard/step progress
- `ListPage` composite component (header + search + loading/error/empty + table)
- `useHead` composable for per-page SEO meta tags
- `useBreakpoint` composable for reactive responsive behavior
- Register page, Forgot Password page in starter template
- User detail page (`/dashboard/users/[id]`) with breadcrumbs and profile card
- 404 page with dedicated UI in starter template
- View transitions via SvelteKit `onNavigate` in starter layout
- `onUnauthorized` callback in `createApiClient` for 401 handling

### Fixed
- AuthGuard: added redirect loop prevention
- Login page: added links to register and forgot-password pages

## v0.6.0 (2026-06-01)

### Fixed
- Sheet focus trap: focus is now trapped within the dialog when open
- hasRole/hasPermission: no longer create new auth instances on every call
- Popover: corrected ARIA role from tooltip to dialog
- Added aria-labels to icon-only buttons (Sheet close, Pagination prev/next, FileUpload remove)
- Removed hardcoded Portuguese from DataTable, Pagination, ThemeToggle, Select, Form, ErrorBoundary

### Changed
- createAuth: removed duplicate setToken method
- DashboardShell* components: brandIcon prop typed as string | ComponentType instead of any
- Deleted stale root-level Tabs component files (duplicates of tabs/ directory)

### Added
- Tests for createTable, createWizard, Sheet, Popover, Popconfirm, Accordion, FileUpload

## v0.5.0 (2026-06-01)

### Added
- RBAC auth layer: `createAuth` with user/roles/permissions/tenantId, `hasRole`, `hasPermission`, `createAccess` composable
- `AuthGuard` now accepts `roles`, `permissions`, and `requireAll` props
- 3 new dashboard layout variants: `DashboardShellRight`, `DashboardShellTopnav`, `DashboardShellSplit`
- `ThemeBuilder` visual editor with color pickers, 6 preset starters, live preview, and CSS export
- `hexToOklch` / `oklchToHex` color conversion utilities

### Changed
- `createAuth` returns reactive `user`, `roles`, `permissions`, `tenantId` properties
- `AuthGuard` supports unauthorized fallback route

## v0.4.0 (2026-05-31)

### Added
- 3 composables: `createTable` (reactive DataTable state), `createWizard` (multi-step form wizard), `createToast` (typed svelte-sonner wrapper)
- 4 components: Sheet/Drawer, Popover, Popconfirm, Accordion/AccordionItem
- `createThemeBuilder` — generate full OKLCH theme from partial palette
- `extendTheme` — inherit from preset and override specific tokens
- High-contrast theme preset (`contrast`) for accessibility
- `prefers-reduced-motion` support in global styles
- Starter template enrichment: Users CRUD, Profile form, Onboarding wizard, Settings with theme switcher

### Changed
- Starter template now demonstrates createQuery, createMutation, createForm, createWizard, createToast, createTheme

## v0.3.0 (2026-05-31)

### Added
- 3 new components: DataChart (Chart.js wrapper), FileUpload (drag-and-drop), RichTextEditor (ProseMirror markdown)
- 6 theme presets: Dracula, Akashic, Martian, Alchemy, Druidic, Obsidian
- `createTheme` composable for runtime theme switching with localStorage persistence
- `useChartTheme` utility for reading CSS tokens in Chart.js datasets
- Peer dependency: `chart.js` + `svelte-chartjs`
- Dependencies: `prosemirror-*` packages for rich text editing

### Changed
- Package renamed from `@thoth/ui` to `bindrunes`
- Starter template enriched with full token system, ambient backdrop, composables, and route patterns
- thoth-web simplified to consume template patterns

## v0.2.1 (2026-05-30)

### Added
- Full API documentation in README.md
- CHANGELOG tracking

## v0.2.0 (2026-04-01)

### Added
- 52 Svelte 5 components across foundation, forms, feedback, overlays, navigation, dashboard, sidebar
- 12 composables/utilities: createQuery, createMutation, createAuth, createForm, createI18n, createApiClient, createStorage, createEnv, RealtimeClient, createOmnibar, derivePageInfo, deriveOmnibarOptions
- 1 Svelte action: shortcut
- i18n system with pt-BR dictionary
- OKLCH-based design token system
- ~50 Vitest tests
- Dark/light theme via mode-watcher
- Validation via valibot
