# Components

All components are fully interactive Svelte 5 blocks that adapt to the active design axes.

For detailed visual state specs (tokens, hover/focus/disabled states), see [Component States](component-states.md).

Components are organized into four layers following the architecture:

- **Primitives** (`bindrunes`) -- Low-level UI building blocks
- **Layouts** (`bindrunes/layouts`) -- Structural and navigation components
- **Domains** (`bindrunes/domains`) -- Domain-specific feature components
- **Templates** (`bindrunes/templates`) -- Pre-composed full-page layouts

> **Note:** Several components from other layers are re-exported from the main `bindrunes`
> entry point for convenience (e.g. `Form`, `FormField`, `DataTable`, `PageHeader`,
> `SectionHeader`). The sections below list each component under the layer it physically
> belongs to.

---

## Primitives

*Import from `bindrunes`*

### Foundation & Forms

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
| `<Select>` / `<Switch>` / `<Checkbox>` | Standard form selection components. |
| `<RadioGroup>` / `<ToggleGroup>` / `<Combobox>` | Multi-value input controllers. |
| `<Slider>` / `<DatePicker>` / `<TimeField>` | Complex input selectors. |
| `<PinInput>` / `<RatingGroup>` / `<FileUpload>` | Specialty fields (OTP/stars/drag-and-drop file loads). |
| `<ColorPicker>` / `<RangeCalendar>` | Color selection and range calendar inputs. |
| `<RichTextEditor>` | ProseMirror-based rich text editor with toolbar. |
| `<CodeSnippet>` | Code block with copy-to-clipboard button and optional title. |

### Button

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `"primary" \| "secondary" \| "outline" \| "ghost" \| "destructive" \| "link" \| "soft" \| "subtle"` | `"primary"` | Visual style |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Button size |
| `href` | `string` | — | Render as `<a>` instead of `<button>` |
| `loading` | `boolean` | `false` | Show spinner and disable interaction |
| `disabled` | `boolean` | `false` | Disabled state |
| `fullWidth` | `boolean` | `false` | Stretch to container width |
| `iconOnly` | `boolean` | `false` | Square button for icon-only content |
| `type` | `"button" \| "submit" \| "reset"` | `"button"` | Native button type |

```svelte
<Button variant="primary" size="lg">Get Started</Button>
<Button href="/signup" variant="outline">Sign Up</Button>
```

### Card

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `"surface" \| "glass" \| "outlined" \| "ghost"` | `"surface"` | Visual style |
| `interactive` | `boolean` | `false` | Hover/active states, role="button" |
| `padding` | `boolean` | `true` | Apply default padding |
| `href` | `string` | — | Render as link |
| `header` | `Snippet` | — | Header slot |
| `footer` | `Snippet` | — | Footer slot (with border separator) |

```svelte
<Card variant="glass" interactive onclick={handleClick}>
  {#snippet header()}<h3>Title</h3>{/snippet}
  <p>Content goes here.</p>
</Card>
```

### Input

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string` | `""` | Bound input value |
| `label` | `string` | — | Label text above input |
| `type` | `"text" \| "email" \| "password" \| "number" \| "tel" \| "url" \| "search" \| "date" \| "time" \| "textarea"` | `"text"` | Input type |
| `placeholder` | `string` | `""` | Placeholder text |
| `error` | `string` | — | Error message (turns border red) |
| `helper` | `string` | — | Helper text below input |
| `disabled` | `boolean` | `false` | Disabled state |
| `required` | `boolean` | `false` | Show required indicator on label |
| `prefix` / `suffix` | `Snippet` | — | Icons or text inside input |

```svelte
<Input label="Email" type="email" placeholder="you@example.com" required />
<Input label="Bio" type="textarea" placeholder="Tell us about yourself" />
```

### Badge

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `"default" \| "primary" \| "secondary" \| "success" \| "warning" \| "destructive" \| "info" \| "outline"` | `"default"` | Color style |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Badge size |
| `removable` | `boolean` | `false` | Show close button |
| `onRemove` | `() => void` | — | Callback when removed |
| `icon` | `Snippet` | — | Leading icon slot |

```svelte
<Badge variant="success" size="sm">Active</Badge>
<Badge variant="destructive" removable onRemove={handleRemove}>Error</Badge>
```

### Dialog

| Prop | Type | Default | Description |
|---|---|---|---|
| `open` | `boolean` | `false` | Bindable open state |
| `title` | `string` | — | Dialog title |
| `size` | `"sm" \| "md" \| "lg" \| "xl" \| "full"` | `"md"` | Max-width variant |
| `closeOnOverlayClick` | `boolean` | `true` | Close when clicking backdrop |
| `header` | `Snippet` | — | Custom header (replaces icon+title) |
| `footer` | `Snippet` | — | Footer slot with border separator |
| `actions` | `Snippet` | — | Action buttons slot |
| `icon` | `Snippet` | — | Icon above title |

```svelte
<Dialog bind:open title="Delete item?" size="sm">
  <p>This action cannot be undone.</p>
  {#snippet actions()}
    <Button variant="ghost" onclick={() => open = false}>Cancel</Button>
    <Button variant="destructive" onclick={handleDelete}>Delete</Button>
  {/snippet}
</Dialog>
```

### Sheet

| Prop | Type | Default | Description |
|---|---|---|---|
| `open` | `boolean` | `false` | Bindable open state |
| `side` | `"left" \| "right" \| "top" \| "bottom"` | `"right"` | Slide direction |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Width/height variant |
| `title` | `string` | — | Header title |
| `header` | `Snippet` | — | Custom header slot |
| `footer` | `Snippet` | — | Footer slot with border separator |

```svelte
<Sheet bind:open side="right" title="Filters">
  <FilterPanel />
  {#snippet footer()}
    <Button onclick={() => open = false}>Apply</Button>
  {/snippet}
</Sheet>
```

### Tabs

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string` | `""` | Bindable active tab ID |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Tab layout direction |

Sub-components: `TabsList`, `TabsTrigger`, `TabsContent`.

| TabsTrigger Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string` | `""` | Tab ID to activate |
| `disabled` | `boolean` | `false` | Disable this tab |

```svelte
<Tabs bind:value="account">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="security">Security</TabsTrigger>
  </TabsList>
  <TabsContent value="account">Account settings</TabsContent>
  <TabsContent value="security">Security settings</TabsContent>
</Tabs>
```

### Select

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string` | `""` | Bindable selected value |
| `options` | `SelectOption[]` | `[]` | Options array (`{ value, label, disabled? }`) |
| `label` | `string` | — | Label text above select |
| `placeholder` | `string` | `"Select..."` | Placeholder when nothing selected |
| `disabled` | `boolean` | `false` | Disabled state |
| `required` | `boolean` | `false` | Required field |
| `error` | `string` | — | Error message |
| `itemSnippet` | `Snippet<[{ option }]>` | — | Custom option renderer |

```svelte
<Select label="Role" options={roles} bind:value={role} />
<Select label="Country" options={countries} error={!country ? 'Required' : ''} />
```

### Switch

| Prop | Type | Default | Description |
|---|---|---|---|
| `checked` | `boolean` | `false` | Bindable toggle state |
| `disabled` | `boolean` | `false` | Disabled state |
| `label` | `string` | — | Label text next to switch |
| `name` | `string` | — | Form field name |
| `error` | `string` | — | Error message |

```svelte
<Switch label="Dark mode" bind:checked={darkMode} />
<Switch label="Notifications" bind:checked={notify} disabled />
```

### Checkbox

| Prop | Type | Default | Description |
|---|---|---|---|
| `checked` | `boolean` | `false` | Bindable checked state |
| `indeterminate` | `boolean` | `false` | Bindable indeterminate state |
| `disabled` | `boolean` | `false` | Disabled state |
| `label` | `string` | — | Label text next to checkbox |
| `required` | `boolean` | `false` | Required field |
| `name` | `string` | — | Form field name |
| `error` | `string` | — | Error message |

```svelte
<Checkbox label="I agree to the terms" bind:checked={agreed} required />
<Checkbox label="Select all" bind:indeterminate={someSelected} />
```

---

### Overlays & Navigation

| Component | Description |
|---|---|
| `<Alert>` | Inline notification banners with variants (success/warning/destructive/info). |
| `<Dialog>` | Modal boxes with size variants (sm/md/lg/xl/full), closeOnOverlayClick, header/footer snippets. |
| `<Sheet>` | Slide-out drawers with size variants (sm/md/lg) and 4-side support. |
| `<AlertDialog>` | Important confirmations with customizable content. |
| `<Popover>` | Hover-triggered content panels. |
| `<DropdownMenu>` | Context-sensitive dropdowns with item snippets. |
| `<ContextMenu>` | Right-click context menus. |
| `<Tooltip>` / `<TooltipProvider>` | Hover tooltips with rich content support via snippet and global provider. |
| `<Omnibar>` / `<CommandPalette>` | Global command palette (Cmd+K launcher). |
| `<Popconfirm>` | Quick inline confirmation tooltips. |
| `<Collapsible>` | Expandable/collapsible content sections. |
| `<Stepper>` | Step-by-step wizard navigation with ARIA list semantics. |
| `<Tabs>` / `<Accordion>` | Sectioned layouts with vertical orientation support. |
| `<Pagination>` | Tabular data pagination controls. |
| `<Breadcrumb>` | Breadcrumb navigation trail. |
| `<Drawer>` | Mobile-friendly drawer with snap points and gesture dismissal. |
| `<TreeView>` | Hierarchical tree display with expand/collapse. |
| `<AppProvider>` / `<AuthGuard>` | App shell provider and route protection. |
| `<Separator>` / `<ScrollArea>` | Visual dividers and styled scroll containers. |
| `<EmptyState>` / `<ErrorMessage>` / `<PageLoading>` | Empty, error, and loading states. |
| `<OTPInput>` / `<Suspense>` | OTP input and suspense loading wrapper. |
| `<Toggle>` / `<NavigationMenu>` | Toggle button and navigation menu. |

---

## Layouts

*Import from `bindrunes/layouts`*

### Meta-Components

Primitives that expose layout slots and standardize container dimensions:
- **`<PageShell>`**: Layout primitive with composable topbar, left sidebar, right sidebar, and main zones. Handles sidebar width and collapsibility.
- **`<PageSection>`**: Content zone wrapper with container sizing, spacing, and section-reveal animation.
- **`<MetaLayout>`**: Positional layout slots (`header`, `content`, `footer`, `separator`).
- **`<MetaContainer>`**: Restricts content width to design scales (`prose` through `2xl` or `full`).
- **`<MetaScrollable>`**: Container enforcing consistent overflow scrollbar behaviors.
- **`<PageHeader>`**: Page-level header with title, description, and actions slot.
- **`<SectionHeader>`**: Section heading with optional description and actions.
- **`<ListPage>`**: Reusable page layout with `PageHeader` + content slot + empty state.
- **`<ErrorBoundary>`**: Catches Svelte errors and renders a fallback UI snippet.
- **`<DynamicIcon>`**: Resolves icon names to `lucide-svelte` components at runtime.
- **`<LazyLoad>`**: Intersection-based lazy rendering for deferred content loading.
- **`<SEO>`**: Sets document `<title>`, meta descriptions, and Open Graph properties.

### Dashboard Shell

- **`<DashboardShell>`**: Layout wrapper supporting standard, right, and top navigation structures.
- **`<DashboardShellRight>`**: Right-sidebar variant of the dashboard shell.
- **`<DashboardShellTopnav>`**: Top-navigation variant of the dashboard shell.
- **`<DashboardShellSplit>`**: Two-column master-detail layout with `emptyState` snippet.
- **`<DashboardShellHeader>`**: Header area for dashboard shells.
- **`<DashboardShellBrand>`**: Brand/logo area for dashboard shells.
- **`<NavMenu>`**: Dynamic navigation lists with state markers.

### Sidebar

Sidebar sub-components (import from `bindrunes/layouts`):

- **`<SidebarProvider>`**: Root context provider for sidebar state.
- **`<Sidebar>`**: Main sidebar panel with `side`, `variant`, and `collapsible` props.
- **`<SidebarLayout>`**: Full sidebar layout wrapper combining provider, sidebar, and content.
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

## Domains

*Import from `bindrunes/domains` or `bindrunes/domains/<name>`*

### Theming UI

- **`<ThemeStudio>`**: Tabbed interface for editing themes, aesthetics, and density scales, and exporting CSS.
- **`<ThemePreview>`** / **`<ThemeToggle>`**: Utility displays and dark-mode togglers.

### Feedback & Display

- **`<ToastProvider>`**: Root provider for toast notifications (wraps `svelte-sonner`).
- **`<MetricCard>`**: KPI metric display with value, label, and change indicator.
- **`<Timeline>`**: Vertical timeline display with icons and timestamps.

### Block

- **`<Block>`** (`bindrunes/domains`): Section wrapper with `header`/`footer` snippets, size, background, and spacing props.

### Auth (`bindrunes/domains/auth`)
- `<AuthLayout>` -- Split-screen layout (branding left, form right).
- `<LoginForm>` / `<RegisterForm>` / `<ForgotPassword>` / `<ResetPassword>` -- Authentication forms with snippet customization.
- `<SocialLogin>` -- OAuth buttons (Google, GitHub, Apple).
- `<EmailVerification>` -- "Check your inbox" page with resend.
- `<TwoFactorAuth>` -- 6-digit TOTP input with backup codes.

### Dashboard (`bindrunes/domains/dashboard`)
- `<DashboardHome>` -- Stats grid + chart + recent activity.
- `<StatsOverview>` -- Responsive metric cards with change indicators.
- `<QuickActions>` -- Action button bar.
- `<ActivityFeed>` -- Real-time event feed with timestamps and avatars.
- `<DashboardFooter>` -- Dashboard footer area.

### Settings (`bindrunes/domains/settings`)
- `<TabbedSettings>` -- Settings with vertical sidebar tabs.
- `<ProfileSettings>` -- Avatar + name/email form.
- `<SecuritySettings>` -- Password change + 2FA toggle.
- `<NotificationSettings>` -- Toggle grid for notification preferences.
- `<SettingsSection>` -- Reusable settings section wrapper.
- `<DangerZone>` -- Account deactivation, deletion, transfer with confirmation.

### Data (`bindrunes/domains/data`)
- `<CrudListPage>` -- Composed PageHeader + FacetedSearch + AdvancedTable + EmptyState.
- `<AdvancedTable>` -- Table with search, sort, pagination, bulk selection.
- `<DataTable>` -- Data table with column definitions and sorting.
- `<FacetedSearch>` -- Faceted filter bar for data tables.
- `<Form>` / `<FormField>` -- Validation submit wrapper with labeled field display.
- `<CrudCreateForm>` / `<CrudCreateModal>` / `<CrudCreateDrawer>` -- Create entities.
- `<CrudEditForm>` / `<CrudEditModal>` / `<CrudEditDrawer>` -- Edit entities.
- `<CrudDetailSection>` / `<CrudDetailDrawer>` -- View entity details.
- `<CrudDeleteConfirm>` -- Deletion confirmation dialog.
- `<WizardForm>` -- Multi-step form with step indicator and progress.
- `<UserManagement>` -- Pre-configured table for user entities.
- `<ApiKeyManagement>` -- API key list with create/revoke/copy.
- `<BillingDashboard>` -- Current plan, usage meter, invoices.
- `<ImportFlow>` / `<ExportFlow>` -- File import/export dialogs.

### E-commerce (`bindrunes/domains/ecommerce`)
- `<ProductCard>` -- Product display with image, price, rating, add-to-cart.
- `<ProductGrid>` -- Responsive product grid with sort/filter.
- `<Cart>` / `<CartItem>` -- Shopping cart with quantity controls.
- `<Checkout>` -- Checkout form with order summary.
- `<OrderSummary>` -- Order total breakdown.
- `<PriceTag>` -- Price display with discount calculation.

### Media (`bindrunes/domains/media`)
- `<ImageUpload>` -- Drag-and-drop image upload with preview.
- `<VideoPlayer>` -- Video element with controls.
- `<AudioPlayer>` -- Audio player with play/pause, progress, seek.
- `<MediaGallery>` -- Image gallery with thumbnail navigation.
- `<FileCard>` -- File display with type icon and actions.

### Calendar (`bindrunes/domains/calendar`)
- `<EventCalendar>` -- Monthly calendar with event dots and date selection.
- `<Scheduler>` -- Time slot picker grid.
- `<BookingForm>` -- Appointment booking form.
- `<AvailabilityGrid>` -- Weekly availability toggle grid.

### Chat (`bindrunes/domains/chat`)
- `<ChatThread>` -- Scrollable message list.
- `<ChatInput>` -- Message input with send button.
- `<ChatMessage>` -- Individual message display with role and timestamp.
- `<ChatBubble>` -- Styled message bubble with variants and optional timestamp.
- `<ConversationList>` -- Chat sidebar with unread counts.
- `<TypingIndicator>` -- Animated typing dots.
- `<AgentChatPage>` -- Full agent chat page layout.
- `<AgentStatus>` -- Agent status display.
- `<MemoryDisplay>` -- Agent memory display.
- `<ReasoningPanel>` -- Agent reasoning display panel.
- `<ToolCallDisplay>` -- Agent tool call display.

### Agentic Copilot (`bindrunes/domains/agentic`)
- `CopilotMessageList` -- Scrollable message list with role-based styling.
- `CopilotInput` -- Message composer with send button and keyboard shortcuts.
- `CopilotStreamIndicator` -- Animated indicator showing LLM is streaming.
- `CopilotToolPanel` -- Display for tool calls and results.
- `CopilotChainProgress` -- Progress indicator for multi-step agent chains.
- `CopilotContextSidebar` -- Sidebar showing conversation context and token usage.
- `CopilotSuggestionCard` -- Clickable suggestion cards for quick prompts.
- `DebateHistoryTree` -- Visual tree of conversation branches and reasoning paths.
- `InteractiveCitations` -- Clickable citation references with source links.

### Marketing (`bindrunes/domains/marketing`)
- `<BlogArticle>` / `<BlogListing>` -- Blog post display and listing.
- `<BlogPage>` -- Blog page layout.
- `<ChangelogPage>` / `<ReleaseNotes>` -- Version history and release notes.
- `<CommentSection>` -- Comment list with reply form.
- `<ContentWithImage>` -- Text + image alternating sections.
- `<SocialProof>` -- Testimonials and logo cloud.
- `<Schedule>` -- Timeline/schedule display.
- `<Banner>` / `<Popup>` / `<Maintenance>` -- Announcement components.
- `<CookieConsent>` -- GDPR consent banner.
- `<DocsLayout>` -- Documentation layout with sidebar nav.

### Portfolio (`bindrunes/domains/portfolio`)
- `<Portfolio>` -- Project grid with filters.
- `<ProjectCard>` -- Project display card.
- `<ProjectGrid>` -- Responsive project grid.
- `<CaseStudy>` -- Detailed case study layout.

### Landing (`bindrunes/domains/landing`)

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

### Admin (`bindrunes/domains/admin`)
- `<AdminDashboard>` -- Admin dashboard with overview metrics and management links.

---

## Templates

*Import from `bindrunes/templates`*

Pre-composed full-page templates that combine primitives, layouts, and domain components into ready-to-use page layouts.

### DashboardTemplate
Full app shell with sidebar navigation, header, and content area.

| Prop | Type | Default | Description |
|---|---|---|---|
| `appName` | `string` | `""` | Application name in sidebar brand |
| `appSubtitle` | `string` | — | Subtitle below app name |
| `brandIcon` | `string \| Component` | — | Icon for the sidebar brand |
| `title` | `string` | — | Page title in the header |
| `description` | `string` | — | Subtitle in the header |
| `navigation` | `NavGroup[]` | `[]` | Sidebar navigation groups |
| `pathname` | `string` | `""` | Current path for active state |
| `onNavigate` | `(to: string) => void` | — | Navigation callback |
| `sidebarCollapsible` | `"icon" \| "full" \| "none"` | `"icon"` | Sidebar collapse behavior |
| `sidebarHeader` | `Snippet` | — | Override sidebar header area |
| `sidebarFooter` | `Snippet` | — | Override sidebar footer area |
| `headerActions` | `Snippet` | — | Actions slot in the header |
| `statusChip` | `{ variant?, label?, dot?, animate? }` | — | Status chip in the header |
| `class` | `string` | `""` | Additional CSS classes |
| `children` | `Snippet` | — | Main content area |

**Usage:**
```svelte
<DashboardTemplate appName="MyApp" navigation={groups} pathname={route}>
  <p>Dashboard content</p>
</DashboardTemplate>
```

### CrudTemplate
List + detail split layout with sidebar navigation.

| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | `""` | Page title in the header |
| `appName` | `string` | `""` | Application name in sidebar brand |
| `appSubtitle` | `string` | — | Subtitle below app name |
| `brandIcon` | `string \| Component` | — | Icon for the sidebar brand |
| `navigation` | `NavGroup[]` | `[]` | Sidebar navigation groups |
| `pathname` | `string` | `""` | Current path for active state |
| `onNavigate` | `(to: string) => void` | — | Navigation callback |
| `sidebarCollapsible` | `"icon" \| "full" \| "none"` | `"none"` | Sidebar collapse behavior |
| `sidebarHeader` | `Snippet` | — | Override sidebar header area |
| `sidebarFooter` | `Snippet` | — | Override sidebar footer area |
| `headerActions` | `Snippet` | — | Actions slot in the header |
| `statusChip` | `{ variant?, label?, dot?, animate? }` | — | Status chip in the header |
| `selectedItem` | `Record<string, unknown>` | — | Currently selected record |
| `emptyTitle` | `string` | `"Select an item"` | Empty state title |
| `emptyDescription` | `string` | `"Choose an item from the list to view its details."` | Empty state description |
| `listPanel` | `Snippet` | — | Custom list panel content |
| `detailPanel` | `Snippet` | — | Custom detail panel content |
| `class` | `string` | `""` | Additional CSS classes |
| `children` | `Snippet` | — | Fallback content when no detail panel |

**Usage:**
```svelte
<CrudTemplate title="Users" selectedItem={user}>
  {#snippet listPanel()}
    <AdvancedTable {rows} />
  {/snippet}
  {#snippet detailPanel()}
    <UserProfile {user} />
  {/snippet}
</CrudTemplate>
```

### AuthTemplate
Auth layout with view switching (login/register/forgot/reset/2FA/verify-email).

| Prop | Type | Default | Description |
|---|---|---|---|
| `view` | `AuthView` | `"login"` | Current auth view |
| `brandImage` | `string` | — | Brand image for the left panel |
| `brandTitle` | `string` | — | Brand title for the left panel |
| `brandDescription` | `string` | — | Brand description for the left panel |
| `onLoginSubmit` | `(data: { email, password }) => void` | — | Login form submit handler |
| `onRegisterSubmit` | `(data: { name, email, password }) => void` | — | Register form submit handler |
| `onForgotSubmit` | `(email: string) => void` | — | Forgot password submit handler |
| `onResetSubmit` | `(data: { password }) => void` | — | Reset password submit handler |
| `onTwoFactorSubmit` | `(code: string) => void` | — | 2FA code submit handler |
| `onForgotPassword` | `() => void` | — | Navigate to forgot-password view |
| `onRegister` | `() => void` | — | Navigate to register view |
| `onLogin` | `() => void` | — | Navigate to login view |
| `onUseBackup` | `() => void` | — | Switch to backup code input |
| `verifyEmail` | `string` | — | Email for verification view |
| `onResendEmail` | `() => void` | — | Resend verification email |
| `socialLogin` | `{ onGoogle?, onGitHub?, onApple?, providers? }` | — | Social login providers |
| `loading` | `boolean` | `false` | Show loading state on forms |
| `error` | `string` | — | Error message to display |
| `header` | `Snippet` | — | Header slot above form fields |
| `beforeFields` | `Snippet` | — | Slot between header and form fields |
| `afterFields` | `Snippet` | — | Slot between form fields and footer |
| `footer` | `Snippet` | — | Footer slot below form |
| `children` | `Snippet` | — | Additional content appended after the form |

**Usage:**
```svelte
<AuthTemplate view="login" onLoginSubmit={handleLogin} loading={isLoading}>
  {#snippet footer()}
    <p class="text-sm text-muted-foreground">Need help? Contact support.</p>
  {/snippet}
</AuthTemplate>
```

### SettingsTemplate
Settings layout with tabbed sidebar navigation.

| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | `"Settings"` | Page title |
| `activeTab` | `string` | `""` | Currently active tab ID (bindable) |
| `tabs` | `SettingsTab[]` | `[]` | Tab definitions with `id`, `label`, and optional `icon` snippet |
| `header` | `Snippet` | — | Header slot above tabs |
| `footer` | `Snippet` | — | Footer slot below tabs |
| `tabContent` | `Snippet<[SettingsTab]>` | — | Render function for each tab's content |
| `class` | `string` | `""` | Additional CSS classes |
| `children` | `Snippet` | — | Additional content |

**Usage:**
```svelte
<SettingsTemplate bind:activeTab tabs={settingsTabs}>
  {#snippet tabContent(tab)}
    {#if tab.id === 'profile'}<ProfileForm />{/if}
  {/snippet}
</SettingsTemplate>
```

### ChatTemplate
Chat layout with collapsible conversation list sidebar.

| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | `"Chat"` | Page title |
| `sidebarCollapsible` | `"icon" \| "full" \| "none"` | `"icon"` | Sidebar collapse behavior |
| `conversationList` | `Snippet` | — | Conversation list sidebar content |
| `chatHeader` | `Snippet` | — | Header slot above messages |
| `class` | `string` | `""` | Additional CSS classes |
| `children` | `Snippet` | — | Chat message area |

**Usage:**
```svelte
<ChatTemplate conversationList={conversations}>
  {#snippet chatHeader()}
    <span class="font-medium">Alice</span>
  {/snippet}
  <ChatThread messages={msgs} />
</ChatTemplate>
```

### CalendarTemplate
Calendar layout with optional sidebar.

| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | `"Calendar"` | Page title |
| `sidebarCollapsible` | `"icon" \| "full" \| "none"` | `"icon"` | Sidebar collapse behavior |
| `sidebar` | `Snippet` | — | Sidebar content (e.g., mini calendar, filters) |
| `header` | `Snippet` | — | Header actions slot |
| `class` | `string` | `""` | Additional CSS classes |
| `children` | `Snippet` | — | Main calendar content |

**Usage:**
```svelte
<CalendarTemplate>
  {#snippet sidebar()}
    <MiniCalendar />
  {/snippet}
  <EventCalendar events={events} />
</CalendarTemplate>
```

### EcommerceTemplate
E-commerce layout with collapsible cart sidebar on the right.

| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | `"Shop"` | Page title |
| `cartCollapsible` | `"icon" \| "full" \| "none"` | `"icon"` | Cart sidebar collapse behavior |
| `cartSnippet` | `Snippet` | — | Cart sidebar content |
| `header` | `Snippet` | — | Header actions slot |
| `class` | `string` | `""` | Additional CSS classes |
| `children` | `Snippet` | — | Main product content |

**Usage:**
```svelte
<EcommerceTemplate>
  {#snippet cartSnippet()}
    <Cart items={cartItems} />
  {/snippet}
  <ProductGrid {products} />
</EcommerceTemplate>
```

### MarketingTemplate
Marketing landing page layout.

**Usage:**
```svelte
<MarketingTemplate>
  <HeroBanner />
  <FeatureGrid />
  <PricingTable />
</MarketingTemplate>
```

### PortfolioTemplate
Portfolio showcase layout with centered header.

| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | `"Portfolio"` | Page title |
| `description` | `string` | — | Subtitle below title |
| `header` | `Snippet` | — | Override the default title/description header |
| `class` | `string` | `""` | Additional CSS classes |
| `children` | `Snippet` | — | Portfolio grid content |

**Usage:**
```svelte
<PortfolioTemplate title="My Work" description="Selected projects">
  <ProjectGrid {projects} />
</PortfolioTemplate>
```

### MediaTemplate
Media library layout with optional sidebar.

| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | `"Media"` | Page title |
| `sidebarCollapsible` | `"icon" \| "full" \| "none"` | `"icon"` | Sidebar collapse behavior |
| `sidebar` | `Snippet` | — | Sidebar content (e.g., folder tree, filters) |
| `header` | `Snippet` | — | Header actions slot |
| `class` | `string` | `""` | Additional CSS classes |
| `children` | `Snippet` | — | Main media grid content |

**Usage:**
```svelte
<MediaTemplate>
  {#snippet sidebar()}
    <FolderTree {folders} />
  {/snippet}
  <MediaGallery {files} />
</MediaTemplate>
```

---

## Accessibility Patterns
- All interactive controls have default `role` maps and keyboard bindings.
- Modals, popovers, and comboboxes utilize `bits-ui` focus-trapping.
- All components pass automated `vitest-axe` checks.
- Skip-to-content links and ARIA labels on icon-only buttons.
