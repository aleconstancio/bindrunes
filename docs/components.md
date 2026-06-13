# Components

All components are fully interactive Svelte 5 blocks that adapt to the active design axes.

## Foundation & Forms

| Component | Description |
|---|---|
| `<Button>` | 8 variants (primary/secondary/outline/ghost/destructive/link/soft/subtle), loading spinner, iconOnly prop. |
| `<Card>` | 4 styles (surface/glass/outlined/ghost), interactive triggers. |
| `<Input>` | Text/textarea fields, error and label support. |
| `<PasswordInput>` | Input with show/hide password toggle. |
| `<NumberInput>` | Increment/decrement buttons with min/max/step. |
| `<TagInput>` | Multi-value chip input with keyboard support. |
| `<Spinner>` / `<Skeleton>` | Loading placeholders and spinners. |
| `<Badge>` / `<StatusChip>` | Status indicators with size/removable/icon props. |
| `<Progress>` / `<Avatar>` / `<Kbd>` | Common design indicators wrapping `bits-ui` primitives. |
| `<Form>` | Validation submit wrapper with optional toast feedbacks. |
| `<Select>` / `<Switch>` / `<Checkbox>` | Standard form selection components. |
| `<RadioGroup>` / `<ToggleGroup>` / `<Combobox>` | Multi-value input controllers. |
| `<Slider>` / `<DatePicker>` / `<TimeField>` | Complex input selectors. |
| `<PinInput>` / `<RatingGroup>` / `<FileUpload>` | Specialty fields (OTP/stars/drag-and-drop file loads). |

---

## Overlays & Navigation

| Component | Description |
|---|---|
| `<Dialog>` | Modal boxes with size variants (sm/md/lg/xl/full), closeOnOverlayClick, header/footer snippets. |
| `<Sheet>` | Slide-out drawers with size variants (sm/md/lg) and 4-side support. |
| `<AlertDialog>` | Important confirmations with customizable content. |
| `<Popover>` | Hover-triggered content panels. |
| `<DropdownMenu>` | Context-sensitive dropdowns with item snippets. |
| `<ContextMenu>` | Right-click context menus. |
| `<Tooltip>` | Hover tooltips with rich content support via snippet. |
| `<Omnibar>` | Global command palette (Cmd+K launcher). |
| `<Popconfirm>` | Quick inline confirmation tooltips. |
| `<Tabs>` / `<Accordion>` | Sectioned layouts with vertical orientation support. |
| `<DataTable>` / `<Pagination>` | Tabular data displays with pagination support. |
| `<Breadcrumb>` / `<PageHeader>` / `<SectionHeader>` | Page structure and heading systems. |
| `<Drawer>` | Mobile-friendly drawer with snap points and gesture dismissal. |

---

## Meta-Components

Primitives that expose layout slots and standardize container dimensions:
- **`<MetaLayout>`**: Positional layout slots (`header`, `content`, `footer`, `separator`).
- **`<MetaContainer>`**: Restricts content width to design scales (`prose` through `2xl` or `full`).
- **`<MetaScrollable>`**: Container enforcing consistent overflow scrollbar behaviors.
- **`<Block>`**: Section wrapper with `header`/`footer` snippets, size, background, and spacing props.

---

## Dashboard Shell

- **`<DashboardShell>`**: Layout wrapper supporting standard, right, and top navigation structures.
- **`<DashboardShellSplit>`**: Two-column master-detail layout with `emptyState` snippet.
- **`<SidebarProvider>` / `<Sidebar>`**: Root context provider and sidebar panels. Supports collapsed rails.
- **`<NavMenu>`**: Dynamic navigation lists with state markers.

---

## Theming UI

- **`<ThemeStudio>`**: Tabbed interface for editing themes, aesthetics, and density scales, and exporting CSS.
- **`<ThemePreview>`** / **`<ThemeToggle>`**: Utility displays and dark-mode togglers.

---

## Boundrune (Page Blocks)
*Import from `bindrunes/boundrune`*

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
- `<ChatMessage>` — Individual message with sender/timestamp.
- `<ChatInput>` — Message input with send button.
- `<ChatBubble>` — Styled message bubble with variants.
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
| `<LogoCloud>` / `<LogoTicker>` | Partner logo display. |
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
