# Components

All components are fully interactive Svelte 5 blocks that adapt to the active design axes.

For detailed visual state specs (tokens, hover/focus/disabled states), see [Component States](component-states.md).

## Foundation & Forms

| Component | Description |
|---|---|
| `<Button>` | 8 variants (primary/secondary/outline/ghost/destructive/link/soft/subtle), loading spinner, iconOnly prop. |
| `<Card>` | 4 styles (surface/glass/outlined/ghost), interactive triggers. |
| `<Input>` | Text/textarea fields, error and label support. |
| `<PasswordInput>` | Input with show/hide password toggle. |
| `<NumberInput>` | Increment/decrement buttons with min/max/step. |
| `<TagInput>` | Multi-value chip input with keyboard support. |
| `<Spinner>` | Loading spinner indicator. |
| `<Skeleton>` | Loading placeholder with shimmer animation. |
| `<Badge>` / `<StatusChip>` | Status indicators with size/removable/icon props. |
| `<Progress>` / `<Avatar>` | Progress bars and user avatars wrapping `bits-ui` primitives. |
| `<Label>` | Form field label with required indicator support. |
| `<Kbd>` | Keyboard shortcut indicator. |
| `<Form>` | Validation submit wrapper with optional toast feedbacks. |
| `<FormField>` | Labeled form field wrapper with error display. |
| `<Select>` / `<Switch>` / `<Checkbox>` | Standard form selection components. |
| `<RadioGroup>` / `<ToggleGroup>` / `<Combobox>` | Multi-value input controllers. |
| `<Slider>` / `<DatePicker>` / `<TimeField>` | Complex input selectors. |
| `<PinInput>` / `<RatingGroup>` / `<FileUpload>` | Specialty fields (OTP/stars/drag-and-drop file loads). |
| `<RichTextEditor>` | ProseMirror-based rich text editor with toolbar. |
| `<CodeSnippet>` | Code block with copy-to-clipboard button and optional title. |

---

## Overlays & Navigation

| Component | Description |
|---|---|
| `<Alert>` | Inline notification banners with variants (success/warning/destructive/info). |
| `<Dialog>` | Modal boxes with size variants (sm/md/lg/xl/full), closeOnOverlayClick, header/footer snippets. |
| `<Sheet>` | Slide-out drawers with size variants (sm/md/lg) and 4-side support. |
| `<AlertDialog>` | Important confirmations with customizable content. |
| `<Popover>` | Hover-triggered content panels. |
| `<DropdownMenu>` | Context-sensitive dropdowns with item snippets. |
| `<ContextMenu>` | Right-click context menus. |
| `<Tooltip>` | Hover tooltips with rich content support via snippet. |
| `<Omnibar>` | Global command palette (Cmd+K launcher). |
| `<Popconfirm>` | Quick inline confirmation tooltips. |
| `<Collapsible>` | Expandable/collapsible content sections. |
| `<Stepper>` | Step-by-step wizard navigation with ARIA list semantics. |
| `<Tabs>` / `<Accordion>` | Sectioned layouts with vertical orientation support. |
| `<DataTable>` / `<Pagination>` | Tabular data displays with pagination support. |
| `<Breadcrumb>` / `<PageHeader>` / `<SectionHeader>` | Page structure and heading systems. |
| `<Drawer>` | Mobile-friendly drawer with snap points and gesture dismissal. |
| `<TreeView>` | Hierarchical tree display with expand/collapse. |

---

## Meta-Components

Primitives that expose layout slots and standardize container dimensions:
- **`<PageShell>`**: Layout primitive with composable topbar, left sidebar, right sidebar, and main zones. Handles sidebar width and collapsibility.
- **`<PageSection>`**: Content zone wrapper with container sizing, spacing, and section-reveal animation.
- **`<MetaLayout>`**: Positional layout slots (`header`, `content`, `footer`, `separator`).
- **`<MetaContainer>`**: Restricts content width to design scales (`prose` through `2xl` or `full`).
- **`<MetaScrollable>`**: Container enforcing consistent overflow scrollbar behaviors.
- **`<Block>`**: Section wrapper with `header`/`footer` snippets, size, background, and spacing props.
- **`<ErrorBoundary>`**: Catches Svelte errors and renders a fallback UI snippet.
- **`<DynamicIcon>`**: Resolves icon names to `lucide-svelte` components at runtime.
- **`<LazyLoad>`**: Intersection-based lazy rendering for deferred content loading.
- **`<ListPage>`**: Reusable page layout with `PageHeader` + content slot + empty state.
- **`<SEO>`**: Sets document `<title>`, meta descriptions, and Open Graph properties.

---

## Dashboard Shell

- **`<DashboardShell>`**: Layout wrapper supporting standard, right, and top navigation structures.
- **`<DashboardShellRight>`**: Right-sidebar variant of the dashboard shell.
- **`<DashboardShellTopnav>`**: Top-navigation variant of the dashboard shell.
- **`<DashboardShellSplit>`**: Two-column master-detail layout with `emptyState` snippet.
- **`<DashboardShellHeader>`**: Header area for dashboard shells.
- **`<DashboardShellBrand>`**: Brand/logo area for dashboard shells.
- **`<NavMenu>`**: Dynamic navigation lists with state markers.

### Sidebar

Sidebar sub-components (import from `bindrunes/sidebar`):

- **`<SidebarProvider>`**: Root context provider for sidebar state.
- **`<Sidebar>`**: Main sidebar panel with `side`, `variant`, and `collapsible` props.
- **`<SidebarContent>`**: Scrollable content area inside the sidebar.
- **`<SidebarHeader>`** / **`<SidebarFooter>`**: Header and footer areas.
- **`<SidebarGroup>`**: Groups menu items with optional labels.
- **`<SidebarMenu>`** / **`<SidebarMenuItem>`** / **`<SidebarMenuButton>`**: Menu item hierarchy.
- **`<SidebarMenuBadge>`**: Badge indicator on menu items.
- **`<SidebarMenuSkeleton>`**: Loading placeholder for menu items.
- **`<SidebarRail>`**: Collapsed rail mode for compact sidebars.
- **`<SidebarSeparator>`**: Visual divider between sidebar sections.
- **`<SidebarTrigger>`**: Toggle button to open/close the sidebar.

---

## Theming UI

- **`<ThemeStudio>`**: Tabbed interface for editing themes, aesthetics, and density scales, and exporting CSS.
- **`<ThemePreview>`** / **`<ThemeToggle>`**: Utility displays and dark-mode togglers.

---

## Feedback & Display

- **`<ToastProvider>`**: Root provider for toast notifications (wraps `svelte-sonner`).
- **`<Timeline>`**: Vertical timeline display with icons and timestamps.
- **`<MetricCard>`**: KPI metric display with value, label, and change indicator.

---

## Boundrune (Page Blocks)
*Import from `bindrunes/boundrune`*

### Page Templates
- **`<DashboardPage>`** — Full app shell with sidebar navigation, header, and content area. Accepts `appName`, `navigation`, `pathname`, and snippet overrides for sidebar header/footer.
- **`<CrudPage>`** — List + detail split layout. Accepts `title`, `selectedItem`, and snippets for list/detail panels.

### Auth
- `<LoginForm>` / `<RegisterForm>` / `<ForgotPassword>` / `<ResetPassword>` — Authentication forms with snippet customization.
- `<AuthLayout>` — Split-screen layout (branding left, form right).
- `<SocialLogin>` — OAuth buttons (Google, GitHub, Apple).
- `<EmailVerification>` — "Check your inbox" page with resend.
- `<TwoFactorAuth>` — 6-digit TOTP input with backup codes.

### Dashboard
- `<DashboardHome>` — Stats grid + chart + recent activity.
- `<StatsOverview>` — Responsive metric cards with change indicators.
- `<QuickActions>` — Action button bar.
- `<ActivityFeed>` — Real-time event feed with timestamps and avatars.

### Settings
- `<TabbedSettings>` — Settings with vertical sidebar tabs.
- `<ProfileSettings>` — Avatar + name/email form.
- `<SecuritySettings>` — Password change + 2FA toggle.
- `<NotificationSettings>` — Toggle grid for notification preferences.
- `<DangerZone>` — Account deactivation, deletion, transfer with confirmation.

### Data
- `<CrudListPage>` — Composed PageHeader + FacetedSearch + AdvancedTable + EmptyState.
- `<AdvancedTable>` — Table with search, sort, pagination, bulk selection.
- `<CrudCreateForm>` / `<CrudCreateModal>` / `<CrudCreateDrawer>` — Create entities.
- `<CrudEditForm>` / `<CrudEditModal>` / `<CrudEditDrawer>` — Edit entities.
- `<CrudDetailSection>` / `<CrudDetailDrawer>` — View entity details.
- `<CrudDeleteConfirm>` — Deletion confirmation dialog.
- `<WizardForm>` — Multi-step form with step indicator and progress.
- `<UserManagement>` — Pre-configured table for user entities.
- `<ApiKeyManagement>` — API key list with create/revoke/copy.
- `<BillingDashboard>` — Current plan, usage meter, invoices.
- `<ImportFlow>` / `<ExportFlow>` — File import/export dialogs.

### E-commerce
- `<ProductCard>` — Product display with image, price, rating, add-to-cart.
- `<ProductGrid>` — Responsive product grid with sort/filter.
- `<Cart>` / `<CartItem>` — Shopping cart with quantity controls.
- `<Checkout>` — Checkout form with order summary.
- `<OrderSummary>` — Order total breakdown.
- `<PriceTag>` — Price display with discount calculation.

### Media
- `<ImageUpload>` — Drag-and-drop image upload with preview.
- `<VideoPlayer>` — Video element with controls.
- `<AudioPlayer>` — Audio player with play/pause, progress, seek.
- `<MediaGallery>` — Image gallery with thumbnail navigation.
- `<FileCard>` — File display with type icon and actions.

### Calendar
- `<EventCalendar>` — Monthly calendar with event dots and date selection.
- `<Scheduler>` — Time slot picker grid.
- `<BookingForm>` — Appointment booking form.
- `<AvailabilityGrid>` — Weekly availability toggle grid.

### Chat
- `<ChatThread>` — Scrollable message list.
- `<ChatInput>` — Message input with send button.
- `<ChatBubble>` — Styled message bubble with variants and optional timestamp.
- `<ConversationList>` — Chat sidebar with unread counts.
- `<TypingIndicator>` — Animated typing dots.

### Marketing
- `<BlogArticle>` / `<BlogListing>` — Blog post display and listing.
- `<ChangelogPage>` / `<ReleaseNotes>` — Version history and release notes.
- `<CommentSection>` — Comment list with reply form.
- `<ContentWithImage>` — Text + image alternating sections.
- `<SocialProof>` — Testimonials and logo cloud.
- `<Schedule>` — Timeline/schedule display.
- `<Banner>` / `<Popup>` / `<Maintenance>` — Announcement components.
- `<CookieConsent>` — GDPR consent banner.
- `<DocsLayout>` — Documentation layout with sidebar nav.

### Portfolio
- `<Portfolio>` — Project grid with filters.
- `<ProjectCard>` — Project display card.
- `<ProjectGrid>` — Responsive project grid.
- `<CaseStudy>` — Detailed case study layout.

---

## Landing Sections
*Import from `bindrunes/landing`*

| Component | Description |
|---|---|
| `<HeroBanner>` | Hero section with badge, title, description, CTAs. |
| `<FeatureGrid>` | Feature cards in 2/3/4 column grid. |
| `<HowItWorks>` | Step-by-step process with connectors. |
| `<PricingTable>` | 3-tier pricing with monthly/annual toggle. |
| `<Testimonial>` / `<TestimonialGrid>` | Customer testimonials. |
| `<MetricsBar>` | Key metrics display. |
| `<StatsCounter>` | Animated number counters. |
| `<FAQ>` | Accordion FAQ section. |
| `<LogoCloud>` | Partner logo display. |
| `<TeamSection>` | Team member grid. |
| `<IntegrationGrid>` | Integration partner display. |
| `<FeatureComparison>` | Feature comparison table. |
| `<Newsletter>` | Email signup form. |
| `<CtaBanner>` | Full-width call-to-action section. |
| `<VideoEmbed>` | Video demo section. |
| `<ComparisonTable>` | vs Competitors comparison. |
| `<SecurityBadges>` | SOC2/GDPR/HIPAA badge display. |
| `<SiteFooter>` / `<SiteFooterColumns>` | Footer with links. |
| `<LandingNav>` | Sticky navigation bar. |
| `<LandingSection>` | Generic section wrapper. |

---

## Accessibility Patterns
- All interactive controls have default `role` maps and keyboard bindings.
- Modals, popovers, and comboboxes utilize `bits-ui` focus-trapping.
- All components pass automated `vitest-axe` checks.
- Skip-to-content links and ARIA labels on icon-only buttons.
