# Meta-Pages Polish Phase Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix all bugs, standardize APIs, add missing features, create template usage examples, and complete documentation for the meta-page composition system.

**Architecture:** Five phases: (1) fix critical bugs (broken imports, type mismatches), (2) standardize template APIs (shared types, consistent props), (3) add missing features (AuthPage views, loading states), (4) create showcase examples using templates, (5) complete documentation.

**Tech Stack:** Svelte 5 runes, TypeScript, Tailwind CSS v4, bits-ui, existing bindrunes component library.

---

## Phase 1: Bug Fixes

### Task 1: Fix DashboardPage Import Paths

**Files:**
- Modify: `src/components/boundrune/DashboardPage.svelte`

- [ ] **Step 1: Fix import paths**

DashboardPage lives at `src/components/boundrune/DashboardPage.svelte` but imports components from `./DashboardShellBrand.svelte` etc. These should be `./dashboard/DashboardShellBrand.svelte`.

Change these three imports:
```ts
// BEFORE (broken):
import DashboardShellBrand from "./DashboardShellBrand.svelte";
import DashboardShellHeader from "./DashboardShellHeader.svelte";
import NavMenu from "./NavMenu.svelte";

// AFTER (correct):
import DashboardShellBrand from "./dashboard/DashboardShellBrand.svelte";
import DashboardShellHeader from "./dashboard/DashboardShellHeader.svelte";
import NavMenu from "./dashboard/NavMenu.svelte";
```

- [ ] **Step 2: Run lint**

Run: `npx biome check src/components/boundrune/DashboardPage.svelte`

- [ ] **Step 3: Commit**

```bash
git add src/components/boundrune/DashboardPage.svelte
git commit -m "fix: correct import paths in DashboardPage"
```

---

### Task 2: Fix AuthPage Callback Mismatches

**Files:**
- Modify: `src/components/boundrune/auth/AuthPage.svelte`

- [ ] **Step 1: Redesign AuthPage props to match actual component APIs**

The current AuthPage has mismatched callback types. Redesign to pass callbacks correctly to each sub-component.

Replace the full `AuthPage.svelte` content:

```svelte
<script lang="ts">
import type { Snippet } from "svelte";
import type { AuthView } from "../types/auth";
import AuthLayout from "./AuthLayout.svelte";
import EmailVerification from "./EmailVerification.svelte";
import ForgotPassword from "./ForgotPassword.svelte";
import LoginForm from "./LoginForm.svelte";
import RegisterForm from "./RegisterForm.svelte";
import ResetPassword from "./ResetPassword.svelte";
import SocialLogin from "./SocialLogin.svelte";
import TwoFactorAuth from "./TwoFactorAuth.svelte";

let {
	view = "login" as AuthView,
	brandImage,
	brandTitle,
	brandDescription,
	// Login callbacks
	onLoginSubmit,
	onForgotPassword,
	onRegister,
	// Register callbacks
	onRegisterSubmit,
	onLogin,
	// Forgot password callbacks
	onForgotSubmit,
	// Reset password callbacks
	onResetSubmit,
	// Two-factor callbacks
	onTwoFactorSubmit,
	onUseBackup,
	// Email verification
	verifyEmail,
	onResendEmail,
	// Social login
	socialLogin,
	// Shared state
	loading = false,
	error = undefined as string | undefined,
	// Snippets
	header,
	beforeFields,
	afterFields,
	footer,
	children,
}: {
	view?: AuthView;
	brandImage?: string;
	brandTitle?: string;
	brandDescription?: string;
	// Login
	onLoginSubmit?: (data: { email: string; password: string }) => void | Promise<void>;
	onForgotPassword?: () => void;
	onRegister?: () => void;
	// Register
	onRegisterSubmit?: (data: { name: string; email: string; password: string }) => void | Promise<void>;
	onLogin?: () => void;
	// Forgot password
	onForgotSubmit?: (email: string) => void | Promise<void>;
	// Reset password
	onResetSubmit?: (data: { password: string }) => void | Promise<void>;
	// Two-factor
	onTwoFactorSubmit?: (code: string) => void | Promise<void>;
	onUseBackup?: () => void;
	// Email verification
	verifyEmail?: string;
	onResendEmail?: () => void;
	// Social login
	socialLogin?: { onGoogle?: () => void; onGitHub?: () => void; onApple?: () => void; providers?: ("google" | "github" | "apple")[] };
	// Shared
	loading?: boolean;
	error?: string;
	// Snippets
	header?: Snippet;
	beforeFields?: Snippet;
	afterFields?: Snippet;
	footer?: Snippet;
	children?: Snippet;
} = $props();
</script>

<AuthLayout {brandImage} {brandTitle} {brandDescription}>
	{#if view === 'login'}
		<LoginForm
			onSubmit={onLoginSubmit}
			{onForgotPassword}
			{onRegister}
			{loading}
			{error}
		>
			{#if header}{@render header()}{/if}
			{#if beforeFields}{@render beforeFields()}{/if}
			{#if socialLogin}
				<SocialLogin {...socialLogin} />
			{/if}
			{#if afterFields}{@render afterFields()}{/if}
			{#if footer}{@render footer()}{/if}
		</LoginForm>
	{:else if view === 'register'}
		<RegisterForm
			onSubmit={onRegisterSubmit}
			onLogin={onLogin ?? onRegister}
			{loading}
			{error}
		>
			{#if header}{@render header()}{/if}
			{#if beforeFields}{@render beforeFields()}{/if}
			{#if socialLogin}
				<SocialLogin {...socialLogin} />
			{/if}
			{#if afterFields}{@render afterFields()}{/if}
			{#if footer}{@render footer()}{/if}
		</RegisterForm>
	{:else if view === 'forgot-password'}
		<ForgotPassword
			onSubmit={onForgotSubmit}
			onBack={onForgotPassword}
			{loading}
		>
			{#if header}{@render header()}{/if}
			{#if footer}{@render footer()}{/if}
		</ForgotPassword>
	{:else if view === 'reset-password'}
		<ResetPassword
			onSubmit={onResetSubmit}
			onBack={onForgotPassword}
			{loading}
			{error}
		>
			{#if header}{@render header()}{/if}
			{#if footer}{@render footer()}{/if}
		</ResetPassword>
	{:else if view === 'verify-email'}
		<EmailVerification
			email={verifyEmail ?? ''}
			onResend={onResendEmail}
			{loading}
		/>
	{:else if view === 'two-factor'}
		<TwoFactorAuth
			onSubmit={onTwoFactorSubmit}
			{onUseBackup}
			{loading}
			{error}
		/>
	{/if}
	{#if children}{@render children()}{/if}
</AuthLayout>
```

- [ ] **Step 2: Update types/auth.ts to match new props**

Update `src/components/boundrune/types/auth.ts`:

```ts
export type AuthView = "login" | "register" | "forgot-password" | "reset-password" | "verify-email" | "two-factor";

export interface SocialLoginConfig {
  onGoogle?: () => void;
  onGitHub?: () => void;
  onApple?: () => void;
  providers?: ("google" | "github" | "apple")[];
}
```

- [ ] **Step 3: Run lint**

Run: `npx biome check src/components/boundrune/auth/AuthPage.svelte src/components/boundrune/types/auth.ts`

- [ ] **Step 4: Commit**

```bash
git add src/components/boundrune/auth/AuthPage.svelte src/components/boundrune/types/auth.ts
git commit -m "fix: redesign AuthPage to match actual component prop APIs"
```

---

### Task 3: Fix ChatPage Unused Prop

**Files:**
- Modify: `src/components/boundrune/chat/ChatPage.svelte`

- [ ] **Step 1: Remove unused `selectedConversation` prop**

Remove the `selectedConversation` prop from ChatPage since it's not used anywhere:

```ts
let {
	title = "Chat",
	class: className = "",
	conversationList,
	chatHeader,
	children,
}: {
	title?: string;
	class?: string;
	conversationList?: Snippet;
	chatHeader?: Snippet;
	children?: Snippet;
} = $props();
```

- [ ] **Step 2: Run lint and commit**

```bash
git add src/components/boundrune/chat/ChatPage.svelte
git commit -m "fix: remove unused selectedConversation prop from ChatPage"
```

---

### Task 4: Fix ChangelogEntry Type Mismatch

**Files:**
- Modify: `src/components/boundrune/types/marketing.ts`

- [ ] **Step 1: Rename `changes` to `entries` to match the actual component**

The `ChangelogPage.svelte` component uses `entries` not `changes`:

```ts
export interface ChangelogEntry {
  version: string;
  date: string;
  entries: { type: "added" | "fixed" | "changed"; description: string }[];
}
```

- [ ] **Step 2: Run lint and commit**

```bash
git add src/components/boundrune/types/marketing.ts
git commit -m "fix: rename ChangelogEntry.changes to entries to match component"
```

---

## Phase 2: API Standardization

### Task 5: Unify sidebarCollapsible Across Templates

**Files:**
- Modify: `src/components/boundrune/DashboardPage.svelte`
- Modify: `src/components/boundrune/settings/SettingsPage.svelte`
- Modify: `src/components/boundrune/chat/ChatPage.svelte`
- Modify: `src/components/boundrune/calendar/CalendarPage.svelte`
- Modify: `src/components/boundrune/ecommerce/EcommercePage.svelte`
- Modify: `src/components/boundrune/marketing/BlogPage.svelte`
- Modify: `src/components/boundrune/media/MediaPage.svelte`

- [ ] **Step 1: Add `sidebarCollapsible` prop to all templates that don't have it**

Every template with a sidebar should accept `sidebarCollapsible?: "icon" | "full" | "none"` and pass it to `PageShell`'s `leftCollapsible` or `rightCollapsible`.

For templates that currently hardcode `leftCollapsible="icon"`, change to use the prop:

```ts
sidebarCollapsible = "icon" as "icon" | "full" | "none",
```

And in the PageShell usage:
```svelte
<PageShell leftCollapsible={sidebarCollapsible === "none" ? "none" : "icon"} ...>
```

Wait, PageShell's `leftCollapsible` accepts `"icon" | "full" | "none"` directly, so just pass it through:
```svelte
<PageShell leftCollapsible={sidebarCollapsible} ...>
```

For DashboardPage, also add `"none"` to the existing type:
```ts
sidebarCollapsible?: "icon" | "full" | "none";
```

- [ ] **Step 2: Run lint**

Run: `npx biome check src/components/boundrune/`

- [ ] **Step 3: Commit**

```bash
git add src/components/boundrune/DashboardPage.svelte src/components/boundrune/settings/SettingsPage.svelte src/components/boundrune/chat/ChatPage.svelte src/components/boundrune/calendar/CalendarPage.svelte src/components/boundrune/ecommerce/EcommercePage.svelte src/components/boundrune/marketing/BlogPage.svelte src/components/boundrune/media/MediaPage.svelte
git commit -m "feat: add sidebarCollapsible prop to all page templates"
```

---

### Task 6: Standardize Prop Naming Across Templates

**Files:**
- Modify: `src/components/boundrune/DashboardPage.svelte`
- Modify: `src/components/boundrune/CrudPage.svelte`

- [ ] **Step 1: Align DashboardPage and CrudPage prop names**

DashboardPage uses `resolvedTitle`/`resolvedDescription`. CrudPage uses `title`. Standardize both to use `title` and `description`:

In DashboardPage, rename:
- `resolvedTitle` → `title`
- `resolvedDescription` → `description`

In CrudPage, keep `title` as-is (already correct).

- [ ] **Step 2: Run lint**

Run: `npx biome check src/components/boundrune/DashboardPage.svelte src/components/boundrune/CrudPage.svelte`

- [ ] **Step 3: Commit**

```bash
git add src/components/boundrune/DashboardPage.svelte src/components/boundrune/CrudPage.svelte
git commit -m "refactor: standardize title/description prop names across templates"
```

---

### Task 7: Add Shared Page Template Props Type

**Files:**
- Modify: `src/components/boundrune/types/page-templates.ts`

- [ ] **Step 1: Add types for all new templates**

Add to `src/components/boundrune/types/page-templates.ts`:

```ts
import type { Component, Snippet } from "svelte";
import type { NavGroup, StatusVariant } from "../../../shared-types";

// ... keep existing DashboardPageProps and CrudPageProps ...

export interface AuthPageProps {
  view?: import("../types/auth").AuthView;
  brandImage?: string;
  brandTitle?: string;
  brandDescription?: string;
  onLoginSubmit?: (data: { email: string; password: string }) => void | Promise<void>;
  onForgotPassword?: () => void;
  onRegister?: () => void;
  onRegisterSubmit?: (data: { name: string; email: string; password: string }) => void | Promise<void>;
  onLogin?: () => void;
  onForgotSubmit?: (email: string) => void | Promise<void>;
  onResetSubmit?: (data: { password: string }) => void | Promise<void>;
  onTwoFactorSubmit?: (code: string) => void | Promise<void>;
  onUseBackup?: () => void;
  verifyEmail?: string;
  onResendEmail?: () => void;
  socialLogin?: { onGoogle?: () => void; onGitHub?: () => void; onApple?: () => void; providers?: ("google" | "github" | "apple")[] };
  loading?: boolean;
  error?: string;
  header?: Snippet;
  beforeFields?: Snippet;
  afterFields?: Snippet;
  footer?: Snippet;
  children?: Snippet;
}

export interface SettingsPageProps {
  title?: string;
  activeTab?: string;
  tabs?: { id: string; label: string; icon?: Component | string }[];
  class?: string;
  header?: Snippet;
  footer?: Snippet;
  tabContent?: Snippet<[string]>;
  children?: Snippet;
}

export interface ChatPageProps {
  title?: string;
  class?: string;
  sidebarCollapsible?: "icon" | "full" | "none";
  conversationList?: Snippet;
  chatHeader?: Snippet;
  children?: Snippet;
}

export interface CalendarPageProps {
  title?: string;
  class?: string;
  sidebarCollapsible?: "icon" | "full" | "none";
  sidebar?: Snippet;
  header?: Snippet;
  children?: Snippet;
}

export interface EcommercePageProps {
  title?: string;
  class?: string;
  cartSnippet?: Snippet;
  header?: Snippet;
  children?: Snippet;
}

export interface BlogPageProps {
  title?: string;
  class?: string;
  sidebarCollapsible?: "icon" | "full" | "none";
  sidebar?: Snippet;
  header?: Snippet;
  children?: Snippet;
}

export interface PortfolioPageProps {
  title?: string;
  description?: string;
  class?: string;
  header?: Snippet;
  children?: Snippet;
}

export interface MediaPageProps {
  title?: string;
  class?: string;
  sidebarCollapsible?: "icon" | "full" | "none";
  sidebar?: Snippet;
  header?: Snippet;
  children?: Snippet;
}
```

- [ ] **Step 2: Run lint and commit**

```bash
git add src/components/boundrune/types/page-templates.ts
git commit -m "feat: add prop types for all page templates"
```

---

### Task 8: Fix Newsletter Portuguese Defaults

**Files:**
- Modify: `src/components/landing/Newsletter.svelte`

- [ ] **Step 1: Change Portuguese defaults to English**

Read the file first, then change:
- `placeholder = "seu@email.com"` → `placeholder = "you@email.com"`
- `buttonText = "Inscrever"` → `buttonText = "Subscribe"`

- [ ] **Step 2: Run lint and commit**

```bash
git add src/components/landing/Newsletter.svelte
git commit -m "fix: change Newsletter Portuguese defaults to English"
```

---

## Phase 3: Template Usage Examples

### Task 9: Create MarketingPage Showcase Example

**Files:**
- Create: `examples/showcase/src/routes/landing/marketing/+page.svelte`

- [ ] **Step 1: Create showcase page using MarketingPage**

This example demonstrates the MarketingPage template with all sections.

```svelte
<script lang="ts">
import { MarketingPage } from "bindrunes/landing";
import { ArrowRight, Zap, Shield, Clock, CheckCircle, Layers, BarChart3, Users, Globe } from "lucide-svelte";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

const logos = [
  { label: "Acme Corp" },
  { label: "TechFlow" },
  { label: "DataSync" },
  { label: "CloudBase" },
];

const metrics = [
  { value: "10k+", label: "Active Users", variant: "default" as const },
  { value: "99.9%", label: "Uptime", variant: "success" as const },
  { value: "4.9/5", label: "Rating", variant: "warning" as const },
];

const features = [
  { icon: Zap, title: "Lightning Fast", description: "Sub-millisecond response times." },
  { icon: Shield, title: "Enterprise Security", description: "SOC 2 compliant with E2E encryption." },
  { icon: Layers, title: "Modular Architecture", description: "Composable components and plugins." },
  { icon: BarChart3, title: "Real-time Analytics", description: "Live dashboards with streaming data." },
  { icon: Users, title: "Team Collaboration", description: "Shared workspaces and approval workflows." },
  { icon: Globe, title: "Multi-tenant", description: "Isolated tenants with shared infrastructure." },
];

const steps = [
  { icon: Zap, title: "Connect", description: "Integrate our SDK in minutes." },
  { icon: Shield, title: "Configure", description: "Set up workflows and permissions." },
  { icon: Clock, title: "Automate", description: "Let intelligent pipelines handle the work." },
  { icon: CheckCircle, title: "Scale", description: "Grow without limits." },
];

const plans = [
  { name: "Starter", monthly: 29, annual: 290, features: ["5 Users", "10GB Storage"], cta: { label: "Start Free", variant: "outline" as const, href: "/signup" } },
  { name: "Pro", monthly: 99, annual: 990, highlight: true, badge: "Most Popular", features: ["Unlimited Users", "100GB Storage", "Priority Support"], cta: { label: "Start Free", variant: "primary" as const, href: "/signup" } },
  { name: "Enterprise", monthly: 299, annual: 2990, features: ["Everything", "SLA", "Dedicated Support"], cta: { label: "Contact Sales", variant: "outline" as const, href: "/contact" } },
];

const testimonials = [
  { quote: "This transformed how we ship features.", author: "Sarah Chen", role: "CTO, TechFlow", avatarFallback: "SC" },
  { quote: "The three-axis design system is a game-changer.", author: "Marcus Johnson", role: "Lead Engineer, DataSync", avatarFallback: "MJ" },
];

const faqItems = [
  { question: "What is it?", answer: "A modern Svelte 5 component library." },
  { question: "Is there a free trial?", answer: "Yes, 14 days free." },
];
</script>

<MarketingPage
  logo={{ href: "/", label: "MySaaS" }}
  {navLinks}
  cta={{ label: "Get Started", href: "/signup" }}
  badge="v1.0"
  heroDescription="The modern toolkit for your SaaS."
  heroCtas={[{ label: "Start Free", href: "/signup", icon: ArrowRight }]}
  {logos}
  logosTitle="Trusted by teams worldwide"
  {metrics}
  {features}
  {steps}
  {plans}
  {testimonials}
  {faqItems}
  ctaTitle="Ready to build?"
  ctaDescription="Join thousands of teams."
  footerLinks={[{ label: "About", href: "/about" }]}
/>
```

- [ ] **Step 2: Run lint and commit**

```bash
git add examples/showcase/src/routes/landing/marketing/+page.svelte
git commit -m "feat: add MarketingPage showcase example"
```

---

### Task 10: Create AuthPage Showcase Example

**Files:**
- Create: `examples/showcase/src/routes/auth/page/+page.svelte`

- [ ] **Step 1: Create showcase page using AuthPage**

```svelte
<script lang="ts">
import { AuthPage } from "bindrunes/boundrune";
import type { AuthView } from "bindrunes/boundrune/types/auth";

let view = $state<AuthView>("login");

function handleLogin(data: { email: string; password: string }) {
  console.log("Login:", data);
}

function handleRegister(data: { name: string; email: string; password: string }) {
  console.log("Register:", data);
}
</script>

<div class="flex gap-4 mb-8 p-4">
  <button class="px-4 py-2 rounded border" class:bg-primary={view === 'login'} onclick={() => view = 'login'}>Login</button>
  <button class="px-4 py-2 rounded border" class:bg-primary={view === 'register'} onclick={() => view = 'register'}>Register</button>
  <button class="px-4 py-2 rounded border" class:bg-primary={view === 'forgot-password'} onclick={() => view = 'forgot-password'}>Forgot</button>
  <button class="px-4 py-2 rounded border" class:bg-primary={view === 'verify-email'} onclick={() => view = 'verify-email'}>Verify</button>
  <button class="px-4 py-2 rounded border" class:bg-primary={view === 'two-factor'} onclick={() => view = 'two-factor'}>2FA</button>
</div>

<AuthPage
  {view}
  brandTitle="MyApp"
  brandDescription="Build something great."
  onLoginSubmit={handleLogin}
  onRegisterSubmit={handleRegister}
  onForgotPassword={() => console.log("forgot")}
  socialLogin={{ providers: ["google", "github"] }}
/>
```

- [ ] **Step 2: Run lint and commit**

```bash
git add examples/showcase/src/routes/auth/page/+page.svelte
git commit -m "feat: add AuthPage showcase example"
```

---

### Task 11: Create DashboardPage Showcase Example

**Files:**
- Create: `examples/showcase/src/routes/dashboard/page/+page.svelte`

- [ ] **Step 1: Create showcase page using DashboardPage**

```svelte
<script lang="ts">
import { DashboardPage } from "bindrunes/boundrune";
import { Home, Users, Settings, BarChart3 } from "lucide-svelte";

const navigation = [
  {
    label: "Main",
    items: [
      { title: "Dashboard", to: "/dashboard/page", description: "Overview", icon: Home },
      { title: "Users", to: "/dashboard/page/users", description: "Manage users", icon: Users },
      { title: "Analytics", to: "/dashboard/page/analytics", description: "View stats", icon: BarChart3 },
      { title: "Settings", to: "/dashboard/page/settings", description: "App settings", icon: Settings },
    ],
  },
];
</script>

<DashboardPage
  appName="MyApp"
  title="Dashboard"
  {navigation}
  pathname="/dashboard/page"
>
  <div class="p-6 space-y-6">
    <h2 class="text-display-3">Welcome back</h2>
    <p class="text-body-lg text-muted-foreground">This is a DashboardPage template example.</p>
  </div>
</DashboardPage>
```

- [ ] **Step 2: Run lint and commit**

```bash
git add examples/showcase/src/routes/dashboard/page/+page.svelte
git commit -m "feat: add DashboardPage showcase example"
```

---

### Task 12: Create ChatPage Showcase Example

**Files:**
- Create: `examples/showcase/src/routes/chat/page/+page.svelte`

- [ ] **Step 1: Create showcase page using ChatPage**

```svelte
<script lang="ts">
import { ChatPage } from "bindrunes/boundrune";

const conversations = [
  { id: "1", name: "Alice Johnson", lastMessage: "Hey, how's it going?" },
  { id: "2", name: "Bob Smith", lastMessage: "Meeting at 3pm" },
  { id: "3", name: "Carol Davis", lastMessage: "Thanks for the update!" },
];
</script>

<ChatPage title="Chat">
  {#snippet conversationList()}
    <div class="space-y-1 p-2">
      {#each conversations as conv}
        <button class="w-full text-left px-3 py-2 rounded hover:bg-muted text-label-md">
          {conv.name}
          <p class="text-body-sm text-muted-foreground">{conv.lastMessage}</p>
        </button>
      {/each}
    </div>
  {/snippet}

  {#snippet chatHeader()}
    <h3 class="text-title-2">Alice Johnson</h3>
  {/snippet}

  <div class="space-y-4">
    <div class="bg-muted rounded-lg p-3 max-w-md">Hey, how's it going?</div>
    <div class="bg-primary text-primary-foreground rounded-lg p-3 max-w-md ml-auto">Good! Working on the new features.</div>
  </div>
</ChatPage>
```

- [ ] **Step 2: Run lint and commit**

```bash
git add examples/showcase/src/routes/chat/page/+page.svelte
git commit -m "feat: add ChatPage showcase example"
```

---

## Phase 4: Documentation

### Task 13: Add Props Tables for All Page Templates

**Files:**
- Modify: `docs/components.md`

- [ ] **Step 1: Add comprehensive props documentation**

In `docs/components.md`, under the "Page Templates" section, expand each template entry with props tables and usage examples. For each template, add:

**DashboardPage:**
| Prop | Type | Default | Description |
|---|---|---|---|
| `appName` | `string` | `""` | Application name |
| `title` | `string` | `""` | Page title for header |
| `navigation` | `NavGroup[]` | `[]` | Sidebar navigation groups |
| `pathname` | `string` | `""` | Current URL path |
| `sidebarCollapsible` | `"icon" \| "full" \| "none"` | `"icon"` | Sidebar collapse mode |
| `sidebarHeader` | `Snippet` | — | Custom sidebar header |
| `sidebarFooter` | `Snippet` | — | Custom sidebar footer |
| `headerActions` | `Snippet` | — | Header action buttons |
| `children` | `Snippet` | — | Main content |

(Repeat similar tables for AuthPage, SettingsPage, ChatPage, CalendarPage, EcommercePage, BlogPage, PortfolioPage, MediaPage, CrudPage)

- [ ] **Step 2: Run lint and commit**

```bash
git add docs/components.md
git commit -m "docs: add props tables for all page templates"
```

---

### Task 14: Update MarketingPage Documentation

**Files:**
- Modify: `docs/landing.md`

- [ ] **Step 1: Complete the MarketingPage props table**

Add all `*Snippet` override props individually to the props table in `docs/landing.md`:

| Prop | Type | Description |
|---|---|---|
| `heroSnippet` | `Snippet` | Override hero section |
| `navSnippet` | `Snippet` | Override navigation |
| `metricsSnippet` | `Snippet` | Override metrics section |
| `featuresSnippet` | `Snippet` | Override features section |
| `howItWorksSnippet` | `Snippet` | Override how-it-works section |
| `pricingSnippet` | `Snippet` | Override pricing section |
| `testimonialsSnippet` | `Snippet` | Override testimonials section |
| `statsSnippet` | `Snippet` | Override stats section |
| `faqSnippet` | `Snippet` | Override FAQ section |
| `ctaSnippet` | `Snippet` | Override CTA section |
| `footerSnippet` | `Snippet` | Override footer |
| `logosSnippet` | `Snippet` | Override logo cloud section |
| `integrationsSnippet` | `Snippet` | Override integrations section |
| `teamSnippet` | `Snippet` | Override team section |
| `newsletterSnippet` | `Snippet` | Override newsletter section |
| `videoSnippet` | `Snippet` | Override video section |

- [ ] **Step 2: Run lint and commit**

```bash
git add docs/landing.md
git commit -m "docs: complete MarketingPage snippet override documentation"
```

---

## Phase 5: Final Verification

### Task 15: Final Lint and Verification

- [ ] **Step 1: Run full lint**

Run: `npx biome check src/`

- [ ] **Step 2: Verify all exports**

Check that all templates and types are properly exported from their respective index files.

- [ ] **Step 3: Verify no regressions**

Run: `bun run test` and confirm no new failures beyond pre-existing ones.

- [ ] **Step 4: Final commit if any fixes needed**
