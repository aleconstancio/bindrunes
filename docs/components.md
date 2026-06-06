# Components

## Foundation

| Component | Description |
|-----------|-------------|
| `<Button>` | 6 variants (primary/secondary/outline/ghost/destructive/link), 3 sizes, loading spinner, `href` support for render-as-link |
| `<Card>` | 4 variants (surface/glass/outlined/ghost), interactive, `href` support |
| `<Input>` | Text/textarea, error/helper/label, prefix/suffix, `$bindable` |
| `<Spinner>` | 3 sizes, animated SVG tail |
| `<Skeleton>` | Shimmer loading lines |
| `<Badge>` | 7 variants including success/warning/destructive/info |
| `<Progress>` | 3 sizes, 4 colors — bits-ui wrapper |
| `<Kbd>` | Keyboard shortcut display |
| `<Avatar>` | Image with fallback text, 3 sizes (sm/md/lg) — bits-ui wrapper |

## Forms

| Component | Description |
|-----------|-------------|
| `<Form>` | Submit wrapper with loading state, success/error toasts |
| `<Input>` | Text input with label, error, helper, prefix/suffix |
| `<Select>` | Dropdown with options, error state |
| `<Switch>` | Toggle switch — bits-ui wrapper |
| `<Checkbox>` | With label — bits-ui wrapper |
| `<Label>` | bits-ui label wrapper |
| `<RadioGroup>` | Radio button group with options |
| `<Toggle>` | Single toggle button with bindable `pressed` state — bits-ui wrapper |
| `<ToggleGroup>` | Group of toggles, single or multiple selection — bits-ui wrapper |
| `<Combobox>` | Searchable combobox with async option loading — bits-ui wrapper |
| `<Slider>` | Range slider with step and value binding |
| `<DatePicker>` | Calendar date picker — bits-ui wrapper |
| `<TimeField>` | Time input field — bits-ui wrapper |
| `<RangeCalendar>` | Date range selection — bits-ui wrapper |
| `<PinInput>` | Multi-character PIN/OTP input |
| `<RatingGroup>` | Star rating with half-star support |

## Feedback & Status

| Component | Description |
|-----------|-------------|
| `<Alert>` | Info/success/warning/destructive, icon, title, description, action |
| `<StatusChip>` | Status pill with optional animated dot |
| `<MetricCard>` | KPI card with label/value/detail/progress |
| `<EmptyState>` | Centered placeholder with icon/action |
| `<ErrorBoundary>` | Catches window errors, shows fallback UI |
| `<PageLoading>` | Skeleton presets (table/cards/form/text) |
| `<Suspense>` | Renders by `status`: loading/empty/error/loaded |
| `<Stepper>` | Horizontal step indicator with active/completed/pending states |

## Overlays

| Component | Description |
|-----------|-------------|
| `<Dialog>` | Modal with overlay/animation/title/icon/actions |
| `<DropdownMenu>` | Positioned menu with items |
| `<Tooltip>` | Positionable tooltip — bits-ui wrapper |
| `<Omnibar>` | Cmd+K command palette with search/categories |
| `<Sheet>` | Side-panel overlay (left/right/top/bottom) |
| `<Popover>` | Positioned popover with outside-click dismiss |
| `<Popconfirm>` | Confirmation popover for destructive actions |

## Navigation & Data

| Component | Description |
|-----------|-------------|
| `<Tabs>` | `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent` — bits-ui |
| `<DataTable>` | Sortable columns, pagination, row click, selection, striped |
| `<Pagination>` | Page nav with ellipsis, prev/next |
| `<SectionHeader>` | Section title with optional action |
| `<Accordion>` | Expandable content sections with single/multiple mode |
| `<AccordionItem>` | Individual accordion panel with chevron indicator |
| `<Breadcrumb>` | Breadcrumb navigation with customizable separator |
| `<PageHeader>` | Page header with breadcrumb, title, description, actions slot |
| `<RuleFootnote>` | Legal/rules footnote display |

## Data Visualization

| Component | Description |
|-----------|-------------|
| `<DataChart>` | Chart.js wrapper — line, bar, doughnut, radar, scatter. Peer dep: `chart.js` |

## File Upload

| Component | Description |
|-----------|-------------|
| `<FileUpload>` | Drag-and-drop with image preview, file list, validation, progress |

## Rich Text

| Component | Description |
|-----------|-------------|
| `<RichTextEditor>` | ProseMirror markdown editor with configurable toolbar |

> **Note:** ProseMirror packages are optional dependencies. See [Getting Started](getting-started.md#optional-dependencies).

## Meta-Components

Shared layout primitives used across all subsystems (sidebar, landing, dashboard, agentic).

| Component | Description |
|-----------|-------------|
| `<MetaLayout>` | Position-based snippet slots (`header`, `content`, `footer`, `separator`). Replaces deprecated `<SidebarLayout>`. |
| `<MetaContainer>` | Token-aware content width wrapper. Maps `size` prop (`prose`/`sm`/`md`/`lg`/`xl`/`2xl`/`full`) to `--container-*` CSS tokens. |
| `<MetaScrollable>` | Standardized overflow container with thin scrollbar styling. Replaces inline `overflow-y-auto` patterns. |

### Meta-Component Utilities

| Utility | Import | Purpose |
|---------|--------|---------|
| `createMetaContext` | `bindrunes` | Two-function context pattern — creates state + sets Svelte context |
| `useMetaContext` | `bindrunes` | Retrieves context set by `createMetaContext` |
| `readonlyGetters` | `bindrunes` | Wraps state object with get-only accessors for safe exposure |

> **Rule:** All new subsystem context must use `createMetaContext`/`useMetaContext`. All state exposed to consumers must use `readonlyGetters`. See [Architecture](architecture.md#context-pattern).

## Utility Components

| Component | Description |
|-----------|-------------|
| `<ScrollArea>` | Styled scrollable container with thin hover scrollbars — bits-ui wrapper |
| `<LazyLoad>` | Async content loader with skeleton placeholder while loading |
| `<SEO>` | Head/meta tag manager for title, description, and Open Graph tags |

## Dashboard Shell

| Component | Description |
|-----------|-------------|
| `<DashboardShell>` | Full dashboard layout with `variant` prop (default/right/topnav) — sidebar + sticky header + content |
| `<DashboardShellRight>` | Convenience wrapper: `<DashboardShell variant="right">` |
| `<DashboardShellTopnav>` | Convenience wrapper: `<DashboardShell variant="topnav">` |
| `<DashboardShellSplit>` | Master-detail two-panel layout with resizable list panel (280–600px) |
| `<DashboardShellBrand>` | Brand/logo section for dashboard header |
| `<DashboardShellHeader>` | Sticky top header bar with title, description, status chip, actions |
| `<NavMenu>` | Renders `NavGroup[]` as sidebar navigation with active item highlighting |

### Sidebar System

| Component | Description |
|-----------|-------------|
| `<SidebarProvider>` | Root context provider — controlled (`open`/`onOpenChange`) or uncontrolled mode. Supports `collapsible` prop: `offcanvas`, `icon`, `none` |
| `<Sidebar>` | The sidebar itself — 3 display variants (`sidebar`, `floating`, `inset`), 3 collapse modes |
| `<SidebarLayout>` | Polymorphic layout slot helper (header/content/footer/separator positions) |
| `<SidebarHeader>` | Top area of sidebar for logo/brand |
| `<SidebarContent>` | Scrollable middle area for navigation items |
| `<SidebarFooter>` | Bottom area for user profile/settings |
| `<SidebarGroup>` | Grouping container with optional label and action slot |
| `<SidebarMenu>` | Navigation list wrapper (`<nav>` element) |
| `<SidebarMenuItem>` | Single menu item wrapper |
| `<SidebarMenuButton>` | Clickable menu item — renders as `<a>` (if `href`), `<button>` (if `onclick`), or `<div>` |
| `<SidebarMenuBadge>` | Badge/counter pill for a menu item |
| `<SidebarMenuSkeleton>` | Loading skeleton for menu items |
| `<SidebarTrigger>` | Hamburger toggle button |
| `<SidebarRail>` | Edge handle that appears on hover for collapse/expand |
| `<SidebarSeparator>` | Horizontal divider line |

## Auth & Layout

| Component | Description |
|-----------|-------------|
| `<AppProvider>` | Root scaffold — `ModeWatcher` + `Toaster` + three design axes. Accepts `themeDefault`, `aestheticDefault`, `densityDefault` props |
| `<AuthGuard>` | Route guard — redirects to `/login` if not authenticated. Validates `fallback` URLs against open redirect |
| `<ThemeToggle>` | Dark/light mode switch |

## Theming UI

| Component | Description |
|-----------|-------------|
| `<ThemeStudio>` | Full preview UI with 4 tabs (Theme, Aesthetic, Density, Export) for live theme editing and CSS export |
| `<ThemeBuilder>` | Legacy alias for `<ThemeStudio>` — re-exports through v1.1.x |
| `<ThemePreview>` | Live preview card showing Buttons, Input, Badges, Alert under current theme |
| `<ThemeColorTab>` | Theme color picker — presets (editorial, dracula, nord, catppuccin, rose-pine, github) + custom primary/accent/destructive hex inputs |
| `<AestheticTab>` | Aesthetic selector — radio-style buttons for editorial, glass, bento, expressive |
| `<DensityTab>` | Density selector — radio-style buttons for compact, comfortable, spacious |
| `<ExportTab>` | CSS export panel — displays generated CSS with "Apply Theme" and "Copy CSS" buttons |

## Landing Page Sections

Import from `bindrunes/landing`. See [Landing Pages](landing.md) for setup and usage.

| Component | Description |
|-----------|-------------|
| `LandingNav` | Sticky nav with scroll progress, mobile menu, theme toggle |
| `HeroBanner` | Hero/CTA banner with gradient, badge, CTAs (used for both hero and final CTA) |
| `MetricsBar` | Responsive metric cards grid |
| `HowItWorks` | Numbered steps with connector line |
| `FeatureGrid` | Feature cards (card/minimal variants) |
| `PricingTable` | Pricing with monthly/annual toggle, subgrid alignment, snippet customization |
| `Testimonial` | Centered testimonial with avatar |
| `TestimonialGrid` | Multi-testimonial grid (1/2/3 columns) |
| `FAQ` | Accordion-based FAQ section |
| `LogoCloud` | Partner/customer logo row |
| `FeatureComparison` | Side-by-side feature comparison table |
| `Newsletter` | Email signup form section |
| `TeamSection` | Team member cards with avatars/social |
| `IntegrationGrid` | Integration logos with descriptions |
| `StatsCounter` | Animated number counters |
| `SiteFooter` | Site footer with links |
| `LandingSection` | Generic section wrapper with id and layout options |
