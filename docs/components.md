# Components

## Foundation

| Component | Description |
|-----------|-------------|
| `<Button>` | 6 variants (primary/secondary/outline/ghost/destructive), 3 sizes, loading spinner, href support |
| `<Card>` | 4 variants (surface/glass/outlined/ghost), interactive, href |
| `<Input>` | Text/textarea, error/helper/label, prefix/suffix, $bindable |
| `<Spinner>` | 3 sizes, animated SVG tail |
| `<Skeleton>` | Shimmer loading lines |
| `<Badge>` | 7 variants including success/warning/destructive |
| `<Progress>` | 3 sizes, 4 colors — bits-ui wrapper |
| `<Kbd>` | Keyboard shortcut display |

## Forms

| Component | Description |
|-----------|-------------|
| `<Form>` | Submit wrapper with loading state, success/error toasts |
| `<Input>` | Text input with label, error, helper, prefix/suffix |
| `<Select>` | Dropdown with options, error state |
| `<Switch>` | Toggle switch — bits-ui wrapper |
| `<Checkbox>` | With label — bits-ui wrapper |
| `<Label>` | bits-ui label wrapper |

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

## Dashboard Shell

| Component | Description |
|-----------|-------------|
| `<DashboardShell>` | Full dashboard with `variant` prop (default/right/topnav) — sidebar + sticky header + content |
| `<NavMenu>` | Renders `NavGroup[]` as sidebar navigation |
| `<Sidebar>` | Three modes: offcanvas/icon/none |
| `<SidebarProvider>` | Context provider for sidebar state |
| `<SidebarTrigger>` | Hamburger toggle |
| `<SidebarRail>` | Edge handle for collapse |
| `<DashboardShellRight>` | Wrapper around `<DashboardShell variant="right">` |
| `<DashboardShellTopnav>` | Wrapper around `<DashboardShell variant="topnav">` |
| `<DashboardShellSplit>` | Master-detail two-panel layout |
| `<ThemeBuilder>` | Interactive theme editor with color pickers |

## Auth & Layout

| Component | Description |
|-----------|-------------|
| `<AppProvider>` | Root scaffold — `ModeWatcher` + `Toaster` |
| `<AuthGuard>` | Route guard — redirects to /login if not authenticated |
| `<ThemeToggle>` | Dark/light mode switch |
