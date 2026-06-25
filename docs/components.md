# Components

All components are interactive Svelte 5 blocks that adapt to the active design axes.

Components are organized into four layers:

- **Primitives** (`bindrunes`) — Low-level UI building blocks
- **Layouts** (`bindrunes/layouts`) — Structural and navigation components
- **Domains** (`bindrunes/domains/<name>`) — Domain-specific feature components

---

## Primitives

*Import from `bindrunes`*

### Foundation & Forms

| Component | Description |
|---|---|
| `<Button>` | 8 variants (primary/secondary/outline/ghost/destructive/link/soft/subtle), loading, iconOnly |
| `<Card>` | 4 styles (surface/glass/tinted/outlined/ghost), interactive triggers |
| `<Input>` | Text/textarea, error, label, prefix/suffix slots |
| `<PasswordInput>` | Show/hide toggle |
| `<NumberInput>` | Increment/decrement with min/max/step |
| `<TagInput>` | Multi-value chip input |
| `<Spinner>` | Loading indicator |
| `<Skeleton>` | Shimmer loading placeholder |
| `<Badge>` / `<StatusChip>` | Status indicators |
| `<Progress>` / `<Avatar>` | Progress bars, user avatars |
| `<Label>` | Form field label with required indicator |
| `<Kbd>` | Keyboard shortcut indicator |
| `<Select>` / `<Switch>` / `<Checkbox>` | Form selection |
| `<RadioGroup>` / `<ToggleGroup>` / `<Combobox>` | Multi-value input |
| `<Slider>` / `<DatePicker>` / `<TimeField>` | Complex input |
| `<PinInput>` / `<RatingGroup>` / `<FileUpload>` | Specialty fields |
| `<ColorPicker>` / `<RangeCalendar>` | Color and range input |
| `<RichTextEditor>` | ProseMirror-based editor |
| `<CodeSnippet>` | Code block with copy button |

### Button

| Prop | Type | Default |
|---|---|---|
| `variant` | `"primary" \| "secondary" \| "outline" \| "ghost" \| "destructive" \| "link" \| "soft" \| "subtle"` | `"primary"` |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` |
| `href` | `string` | — |
| `loading` | `boolean` | `false` |
| `disabled` | `boolean` | `false` |
| `fullWidth` | `boolean` | `false` |
| `iconOnly` | `boolean` | `false` |

```svelte
<Button variant="primary" size="lg">Get Started</Button>
<Button href="/signup" variant="outline">Sign Up</Button>
```

### Card

| Prop | Type | Default |
|---|---|---|
| `variant` | `"surface" \| "glass" \| "tinted" \| "outlined" \| "ghost"` | `"surface"` |
| `interactive` | `boolean` | `false` |
| `padding` | `boolean` | `true` |
| `href` | `string` | — |
| `header` / `footer` | `Snippet` | — |

```svelte
<Card variant="glass" interactive onclick={handleClick}>
  {#snippet header()}<h3>Title</h3>{/snippet}
  <p>Content</p>
</Card>
```

### Input

| Prop | Type | Default |
|---|---|---|
| `value` | `string` | `""` |
| `label` | `string` | — |
| `type` | `"text" \| "email" \| "password" \| "number" \| "tel" \| "url" \| "search" \| "date" \| "time" \| "textarea"` | `"text"` |
| `placeholder` | `string` | `""` |
| `error` | `string` | — |
| `helper` | `string` | — |
| `disabled` / `required` | `boolean` | `false` |
| `prefix` / `suffix` | `Snippet` | — |

```svelte
<Input label="Email" type="email" placeholder="you@example.com" required />
<Input label="Bio" type="textarea" placeholder="Tell us about yourself" />
```

### Badge

| Prop | Type | Default |
|---|---|---|
| `variant` | `"default" \| "primary" \| "secondary" \| "success" \| "warning" \| "destructive" \| "info" \| "outline"` | `"default"` |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` |
| `removable` | `boolean` | `false` |
| `onRemove` | `() => void` | — |

### Dialog

| Prop | Type | Default |
|---|---|---|
| `open` | `boolean` | `false` |
| `title` | `string` | — |
| `size` | `"sm" \| "md" \| "lg" \| "xl" \| "full"` | `"md"` |
| `closeOnOverlayClick` | `boolean` | `true` |
| `header` / `footer` / `actions` | `Snippet` | — |

### Sheet

| Prop | Type | Default |
|---|---|---|
| `open` | `boolean` | `false` |
| `side` | `"left" \| "right" \| "top" \| "bottom"` | `"right"` |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` |
| `title` | `string` | — |

### Tabs

Sub-components: `TabsList`, `TabsTrigger`, `TabsContent`.

```svelte
<Tabs value="account">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="security">Security</TabsTrigger>
  </TabsList>
  <TabsContent value="account">Account settings</TabsContent>
</Tabs>
```

### Select / Switch / Checkbox

```svelte
<Select label="Role" options={roles} bind:value={role} />
<Switch label="Dark mode" bind:checked={darkMode} />
<Checkbox label="I agree" bind:checked={agreed} required />
```

---

### Overlays & Navigation

| Component | Description |
|---|---|
| `<Alert>` | Inline notification banners |
| `<Dialog>` | Modal boxes with size variants |
| `<Sheet>` | Slide-out drawers, 4-side support |
| `<AlertDialog>` | Important confirmations |
| `<Popover>` | Hover-triggered panels |
| `<DropdownMenu>` | Context dropdowns |
| `<ContextMenu>` | Right-click menus |
| `<Tooltip>` / `<TooltipProvider>` | Hover tooltips |
| `<Omnibar>` / `<CommandPalette>` | Cmd+K launcher |
| `<Popconfirm>` | Inline confirmation |
| `<Collapsible>` | Expandable sections |
| `<Stepper>` | Step-by-step wizard |
| `<Tabs>` / `<Accordion>` | Sectioned layouts |
| `<Pagination>` | Data pagination |
| `<Breadcrumb>` | Navigation trail |
| `<Drawer>` | Mobile drawer with snap points |
| `<TreeView>` | Hierarchical tree |
| `<AppProvider>` / `<AuthGuard>` | App shell + route protection |
| `<Separator>` / `<ScrollArea>` | Dividers and scroll |
| `<EmptyState>` / `<ErrorMessage>` / `<PageLoading>` | State components |
| `<OTPInput>` / `<Suspense>` | OTP input, suspense wrapper |
| `<Toggle>` / `<NavigationMenu>` | Toggle button, nav menu |

---

## Layouts

*Import from `bindrunes/layouts`*

### Meta-Components

- **`<PageShell>`** — Composable topbar/left/right/main zones
- **`<PageSection>`** — Content zone with container sizing + reveal animation
- **`<MetaLayout>`** — Positional slots (header, content, footer, separator)
- **`<MetaContainer>`** — Width constraint (prose through 2xl or full)
- **`<MetaScrollable>`** — Consistent overflow scrollbar
- **`<PageHeader>`** — Title, description, actions slot
- **`<SectionHeader>`** — Section heading with optional description
- **`<ListPage>`** — PageHeader + content + empty state
- **`<ErrorBoundary>`** — Catches Svelte errors, renders fallback
- **`<DynamicIcon>`** — Resolves icon names to lucide-svelte
- **`<LazyLoad>`** — Intersection-based deferred rendering
- **`<SEO>`** — Document title, meta, Open Graph

### Dashboard Shell

- **`<DashboardShell>`** — Standard, right, and top navigation variants
- **`<DashboardShellRight>`** — Right-sidebar variant
- **`<DashboardShellTopnav>`** — Top-navigation variant
- **`<DashboardShellSplit>`** — Master-detail with emptyState snippet
- **`<DashboardShellHeader>`** / **`<DashboardShellBrand>`** — Header and brand
- **`<NavMenu>`** — Dynamic navigation lists

### Sidebar

- **`<SidebarProvider>`** — Root context provider
- **`<Sidebar>`** — Main panel with side/variant/collapsible
- **`<SidebarContent>`** — Scrollable content area
- **`<SidebarHeader>`** / **`<SidebarFooter>`**
- **`<SidebarGroup>`** / **`<SidebarMenu>`** / **`<SidebarMenuItem>`** / **`<SidebarMenuButton>`**
- **`<SidebarMenuBadge>`** / **`<SidebarMenuSkeleton>`**
- **`<SidebarRail>`** — Collapsed rail mode
- **`<SidebarSeparator>`** / **`<SidebarTrigger>`**

---

## Domains

*Import from `bindrunes/domains/<name>`*

### Auth (`bindrunes/domains/auth`)

- `<AuthLayout>`, `<LoginForm>`, `<RegisterForm>`, `<ForgotPassword>`, `<ResetPassword>`
- `<SocialLogin>`, `<EmailVerification>`, `<TwoFactorAuth>`

### Dashboard (`bindrunes/domains/dashboard`)

- `<DashboardHome>`, `<StatsOverview>`, `<QuickActions>`, `<ActivityFeed>`, `<DashboardFooter>`

### Settings (`bindrunes/domains/settings`)

- `<TabbedSettings>`, `<ProfileSettings>`, `<SecuritySettings>`, `<NotificationSettings>`, `<DangerZone>`

### Data (`bindrunes/domains/data`)

- `<CrudListPage>`, `<AdvancedTable>`, `<DataTable>`, `<FacetedSearch>`
- `<Form>` / `<FormField>`, `<CrudCreateForm>` / `<CrudEditForm>` / `<CrudDeleteConfirm>`
- `<WizardForm>`, `<UserManagement>`, `<ApiKeyManagement>`, `<BillingDashboard>`
- `<ImportFlow>` / `<ExportFlow>`

### E-commerce (`bindrunes/domains/ecommerce`)

- `<ProductCard>`, `<ProductGrid>`, `<Cart>` / `<CartItem>`, `<Checkout>`, `<OrderSummary>`, `<PriceTag>`

### Media (`bindrunes/domains/media`)

- `<ImageUpload>`, `<VideoPlayer>`, `<AudioPlayer>`, `<MediaGallery>`, `<FileCard>`

### Calendar (`bindrunes/domains/calendar`)

- `<EventCalendar>`, `<Scheduler>`, `<BookingForm>`, `<AvailabilityGrid>`

### Chat (`bindrunes/domains/chat`)

- `<ChatThread>`, `<ChatInput>`, `<ChatMessage>`, `<ChatBubble>`, `<ConversationList>`, `<TypingIndicator>`
- `<AgentChatPage>`, `<AgentStatus>`, `<MemoryDisplay>`, `<ReasoningPanel>`, `<ToolCallDisplay>`

### Agentic Copilot (`bindrunes/domains/agentic`)

- `CopilotMessageList`, `CopilotInput`, `CopilotStreamIndicator`, `CopilotToolPanel`
- `CopilotChainProgress`, `CopilotContextSidebar`, `CopilotSuggestionCard`
- `DebateHistoryTree`, `InteractiveCitations`

### Marketing (`bindrunes/domains/marketing`)

- `<BlogArticle>` / `<BlogListing>` / `<BlogPage>`
- `<ChangelogPage>` / `<ReleaseNotes>`, `<CommentSection>`
- `<SocialProof>`, `<Banner>` / `<Popup>` / `<Maintenance>`, `<CookieConsent>`, `<DocsLayout>`

### Portfolio (`bindrunes/domains/portfolio`)

- `<Portfolio>`, `<ProjectCard>`, `<ProjectGrid>`, `<CaseStudy>`

### Landing (`bindrunes/domains/landing`)

- `<HeroBanner>`, `<FeatureGrid>`, `<HowItWorks>`, `<PricingTable>`
- `<Testimonial>` / `<TestimonialGrid>`, `<MetricsBar>`, `<StatsCounter>`
- `<FAQ>`, `<LogoCloud>`, `<TeamSection>`, `<IntegrationGrid>`
- `<FeatureComparison>`, `<Newsletter>`, `<CtaBanner>`, `<VideoEmbed>`
- `<SiteFooter>` / `<SiteFooterColumns>`, `<LandingNav>`, `<LandingSection>`

### Theming UI (`bindrunes/domains`)

- `<ThemeStudio>`, `<ThemePreview>` / `<ThemeToggle>`, `<ToastProvider>`, `<MetricCard>`, `<Timeline>`

---

## Templates

*Import from `bindrunes/layouts`*

Pre-composed full-page layouts. Previously in `bindrunes/templates`, now merged into layouts.

### `DashboardTemplate`

```svelte
<DashboardTemplate appName="MyApp" navigation={groups} pathname={route}>
  <p>Dashboard content</p>
</DashboardTemplate>
```

Props: `appName`, `appSubtitle`, `brandIcon`, `title`, `description`, `navigation`, `pathname`, `onNavigate`, `sidebarCollapsible`, `sidebarHeader`, `sidebarFooter`, `headerActions`, `statusChip`, `children`.

### `CrudTemplate`

```svelte
<CrudTemplate title="Users" selectedItem={user}>
  {#snippet listPanel()}<AdvancedTable {rows} />{/snippet}
  {#snippet detailPanel()}<UserProfile {user} />{/snippet}
</CrudTemplate>
```

### `AuthTemplate`

```svelte
<AuthTemplate view="login" onLoginSubmit={handleLogin} loading={isLoading}>
  {#snippet footer()}
    <p class="text-sm text-muted-foreground">Need help? Contact support.</p>
  {/snippet}
</AuthTemplate>
```

### `SettingsTemplate`

```svelte
<SettingsTemplate bind:activeTab tabs={settingsTabs}>
  {#snippet tabContent(tab)}
    {#if tab.id === 'profile'}<ProfileForm />{/if}
  {/snippet}
</SettingsTemplate>
```

### `ChatTemplate`

```svelte
<ChatTemplate conversationList={conversations}>
  {#snippet chatHeader()}<span class="font-medium">Alice</span>{/snippet}
  <ChatThread messages={msgs} />
</ChatTemplate>
```

### Other Templates

- `CalendarTemplate` — Calendar with optional sidebar
- `EcommerceTemplate` — Product grid with cart sidebar
- `MarketingTemplate` — Landing page sections
- `PortfolioTemplate` — Project showcase with centered header
- `MediaTemplate` — Media library with optional sidebar

---

## Accessibility

- All interactive controls have ARIA roles and keyboard bindings
- Modals, popovers, comboboxes use `bits-ui` focus-trapping
- All components pass `vitest-axe` checks
- Skip-to-content links and ARIA labels on icon-only buttons
