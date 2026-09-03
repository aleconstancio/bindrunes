# Meta-Pages Expansion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Complete the meta-page composition system by cleaning up the type system, finishing MarketingPage, and adding all missing page templates for every boundrune subdomain.

**Architecture:** Three phases: (1) unify types and eliminate duplication (Block vs PageSection), (2) complete MarketingPage with all 8 missing landing sections + snippet overrides, (3) create 8 new page templates (AuthPage, SettingsPage, ChatPage, CalendarPage, EcommercePage, BlogPage, PortfolioPage, MediaPage) following the established PageShell pattern.

**Tech Stack:** Svelte 5 runes, TypeScript, Tailwind CSS v4, bits-ui, existing urupe-ui component library.

---

## File Structure

### New Files
```
src/components/boundrune/types/
  index.ts                    # Re-exports all subdomain types
  auth.ts                     # AuthPage types
  calendar.ts                 # Calendar types
  chat.ts                     # Chat types
  ecommerce.ts                # Ecommerce types
  marketing.ts                # Marketing content types (BlogPost, etc.)
  media.ts                    # Media types
  portfolio.ts                # Portfolio types
  settings.ts                 # Settings types
  page-templates.ts           # Page template config types

src/components/boundrune/auth/AuthPage.svelte
src/components/boundrune/settings/SettingsPage.svelte
src/components/boundrune/chat/ChatPage.svelte
src/components/boundrune/calendar/CalendarPage.svelte
src/components/boundrune/ecommerce/EcommercePage.svelte
src/components/boundrune/marketing/BlogPage.svelte
src/components/boundrune/portfolio/PortfolioPage.svelte
src/components/boundrune/media/MediaPage.svelte
```

### Modified Files
```
src/components/landing/landing-types.ts          # Add Testimonial, Logo types
src/components/landing/MarketingPage.svelte      # Add 8 missing sections + snippet overrides
src/components/boundrune/types.ts                # Deprecate inline types
src/components/boundrune/index.ts                # Export new templates + types
src/components/landing/index.ts                  # Export new types
docs/landing.md                                  # Update with all new sections
docs/components.md                               # Update with all new templates
```

---

## Phase 1: Type System Cleanup

### Task 1: Unify Testimonial Types

**Files:**
- Modify: `src/components/landing/landing-types.ts`
- Modify: `src/components/landing/MarketingPage.svelte`
- Modify: `src/components/boundrune/types.ts`

- [ ] **Step 1: Add canonical Testimonial type to landing-types.ts**

```ts
// Add to src/components/landing/landing-types.ts
export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  avatar?: string;
  avatarFallback?: string;
}
```

- [ ] **Step 2: Update MarketingPage to use canonical type**

Replace the local `TestimonialData` interface in `src/components/landing/MarketingPage.svelte` with:

```ts
import type { ..., Testimonial } from "./landing-types";
```

Change the prop type from `TestimonialData[]` to `Testimonial[]`.

- [ ] **Step 3: Deprecate TestimonialItem in boundrune/types.ts**

Add a comment to `TestimonialItem` in `src/components/boundrune/types.ts`:

```ts
/** @deprecated Use Testimonial from urupe-ui/landing instead */
export interface TestimonialItem { ... }
```

- [ ] **Step 4: Run lint**

Run: `npx biome check src/components/landing/landing-types.ts src/components/landing/MarketingPage.svelte src/components/boundrune/types.ts`

- [ ] **Step 5: Commit**

```bash
git add src/components/landing/landing-types.ts src/components/landing/MarketingPage.svelte src/components/boundrune/types.ts
git commit -m "fix: unify Testimonial type across landing and boundrune"
```

---

### Task 2: Unify Logo Types

**Files:**
- Modify: `src/components/landing/landing-types.ts`
- Modify: `src/components/landing/MarketingPage.svelte`
- Modify: `src/components/boundrune/types.ts`

- [ ] **Step 1: Add canonical Logo type to landing-types.ts**

```ts
// Add to src/components/landing/landing-types.ts
export interface Logo {
  label: string;
  icon?: import("svelte").Component | string;
  href?: string;
}
```

- [ ] **Step 2: Update MarketingPage NavLogo to use Logo**

In `MarketingPage.svelte`, replace the local `NavLogo` interface:

```ts
import type { ..., Logo } from "./landing-types";
// Use Logo for the logo prop instead of local NavLogo
```

- [ ] **Step 3: Deprecate LogoItem in boundrune/types.ts**

```ts
/** @deprecated Use Logo from urupe-ui/landing instead */
export interface LogoItem { ... }
```

- [ ] **Step 4: Run lint**

Run: `npx biome check src/components/landing/landing-types.ts src/components/landing/MarketingPage.svelte src/components/boundrune/types.ts`

- [ ] **Step 5: Commit**

```bash
git add src/components/landing/landing-types.ts src/components/landing/MarketingPage.svelte src/components/boundrune/types.ts
git commit -m "fix: unify Logo type across landing and boundrune"
```

---

### Task 3: Resolve Block vs PageSection Duplication

**Files:**
- Modify: `src/components/boundrune/Block.svelte`
- Modify: `src/components/landing/LandingSection.svelte`

- [ ] **Step 1: Make Block delegate to PageSection**

Replace the full content of `src/components/boundrune/Block.svelte` with a thin wrapper:

```svelte
<script lang="ts">
import type { Snippet } from "svelte";
import type { ContainerSize } from "../../shared-types";
import PageSection from "../PageSection.svelte";

let {
	id = undefined as string | undefined,
	class: className = "",
	size = "xl" as ContainerSize,
	background = "none" as "none" | "muted" | "gradient",
	spacing = "normal" as "compact" | "normal" | "wide",
	header = undefined as Snippet | undefined,
	footer = undefined as Snippet | undefined,
	children,
}: {
	id?: string;
	class?: string;
	size?: ContainerSize;
	background?: "none" | "muted" | "gradient";
	spacing?: "compact" | "normal" | "wide";
	header?: Snippet;
	footer?: Snippet;
	children?: Snippet;
} = $props();
</script>

<PageSection {id} {size} {background} {spacing} reveal={false} class={className}>
	{#if header}
		<div class="mb-8">{@render header()}</div>
	{/if}
	{@render children?.()}
	{#if footer}
		<div class="mt-8">{@render footer()}</div>
	{/if}
</PageSection>
```

Note: `reveal={false}` because Block is used in non-landing contexts where section-reveal is not desired.

- [ ] **Step 2: Simplify LandingSection to delegate to PageSection**

Replace the full content of `src/components/landing/LandingSection.svelte`:

```svelte
<script lang="ts">
import type { Snippet } from "svelte";
import type { ContainerSize } from "../../shared-types";
import PageSection from "../PageSection.svelte";

let {
	id = undefined as string | undefined,
	class: className = "",
	size = "xl" as ContainerSize,
	background = "none" as "none" | "muted" | "gradient",
	spacing = "normal" as "compact" | "normal" | "wide",
	header = undefined as Snippet | undefined,
	footer = undefined as Snippet | undefined,
	children,
}: {
	id?: string;
	class?: string;
	size?: ContainerSize;
	background?: "none" | "muted" | "gradient";
	spacing?: "compact" | "normal" | "wide";
	header?: Snippet;
	footer?: Snippet;
	children?: Snippet;
} = $props();
</script>

<PageSection {id} {size} {background} {spacing} reveal={true} class={className}>
	{#if header}
		<div class="mb-8">{@render header()}</div>
	{/if}
	{@render children?.()}
	{#if footer}
		<div class="mt-8">{@render footer()}</div>
	{/if}
</PageSection>
```

- [ ] **Step 3: Run lint**

Run: `npx biome check src/components/boundrune/Block.svelte src/components/landing/LandingSection.svelte`

- [ ] **Step 4: Commit**

```bash
git add src/components/boundrune/Block.svelte src/components/landing/LandingSection.svelte
git commit -m "refactor: unify Block and LandingSection to delegate to PageSection"
```

---

### Task 4: Create Subdomain Type Files

**Files:**
- Create: `src/components/boundrune/types/index.ts`
- Create: `src/components/boundrune/types/auth.ts`
- Create: `src/components/boundrune/types/calendar.ts`
- Create: `src/components/boundrune/types/chat.ts`
- Create: `src/components/boundrune/types/ecommerce.ts`
- Create: `src/components/boundrune/types/marketing.ts`
- Create: `src/components/boundrune/types/media.ts`
- Create: `src/components/boundrune/types/portfolio.ts`
- Create: `src/components/boundrune/types/settings.ts`
- Create: `src/components/boundrune/types/page-templates.ts`

- [ ] **Step 1: Create types/index.ts barrel**

```ts
export * from "./auth";
export * from "./calendar";
export * from "./chat";
export * from "./ecommerce";
export * from "./marketing";
export * from "./media";
export * from "./portfolio";
export * from "./settings";
export * from "./page-templates";
```

- [ ] **Step 2: Create auth.ts**

```ts
export type AuthView = "login" | "register" | "forgot-password" | "reset-password" | "verify-email" | "two-factor";

export interface AuthPageConfig {
  view?: AuthView;
  brandImage?: string;
  brandTitle?: string;
  brandDescription?: string;
}
```

- [ ] **Step 3: Create calendar.ts**

```ts
export interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  endDate?: Date;
  description?: string;
  color?: string;
}

export interface TimeSlot {
  start: string;
  end: string;
  available: boolean;
}
```

- [ ] **Step 4: Create chat.ts**

```ts
export interface ChatMessage {
  id: string;
  content: string;
  sender: string;
  timestamp: Date;
  avatar?: string;
  avatarFallback?: string;
}

export interface Conversation {
  id: string;
  name: string;
  lastMessage?: string;
  unreadCount?: number;
  avatar?: string;
  avatarFallback?: string;
}
```

- [ ] **Step 5: Create ecommerce.ts**

```ts
export interface Product {
  id: string;
  name: string;
  price: number;
  description?: string;
  image?: string;
  rating?: number;
  inStock?: boolean;
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}
```

- [ ] **Step 6: Create marketing.ts**

```ts
export interface BlogPost {
  title: string;
  excerpt: string;
  content?: string;
  author: string;
  date: string;
  image?: string;
  tags?: string[];
}

export interface ChangelogEntry {
  version: string;
  date: string;
  changes: { type: "added" | "fixed" | "changed"; description: string }[];
}
```

- [ ] **Step 7: Create media.ts**

```ts
export interface MediaItem {
  id: string;
  url: string;
  type: "image" | "video" | "audio";
  name?: string;
  thumbnail?: string;
}
```

- [ ] **Step 8: Create portfolio.ts**

```ts
export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  image?: string;
  tags?: string[];
  href?: string;
}

export interface CaseStudyItem {
  id: string;
  title: string;
  summary: string;
  content?: string;
  image?: string;
  results?: { label: string; value: string }[];
}
```

- [ ] **Step 9: Create settings.ts**

```ts
export interface SettingsTab {
  id: string;
  label: string;
  icon?: import("svelte").Component | string;
}
```

- [ ] **Step 10: Create page-templates.ts**

```ts
import type { Component, Snippet } from "svelte";
import type { NavGroup, StatusVariant } from "../../../shared-types";

export interface DashboardPageProps {
  appName?: string;
  appSubtitle?: string;
  brandIcon?: string | Component;
  navigation?: NavGroup[];
  pathname?: string;
  onNavigate?: (to: string) => void;
  sidebarCollapsible?: "icon" | "full";
  sidebarHeader?: Snippet;
  sidebarFooter?: Snippet;
  headerActions?: Snippet;
  statusChip?: { variant?: StatusVariant; label?: string; dot?: boolean; animate?: boolean };
  resolvedTitle?: string;
  resolvedDescription?: string;
  class?: string;
  children?: Snippet;
}

export interface CrudPageProps {
  title?: string;
  appName?: string;
  appSubtitle?: string;
  brandIcon?: string | Component;
  navigation?: NavGroup[];
  pathname?: string;
  onNavigate?: (to: string) => void;
  sidebarCollapsible?: "icon" | "full" | "none";
  sidebarHeader?: Snippet;
  sidebarFooter?: Snippet;
  headerActions?: Snippet;
  statusChip?: { variant?: StatusVariant; label?: string; dot?: boolean; animate?: boolean };
  selectedItem?: Record<string, unknown>;
  emptyTitle?: string;
  emptyDescription?: string;
  class?: string;
  listPanel?: Snippet;
  detailPanel?: Snippet;
  children?: Snippet;
}
```

- [ ] **Step 11: Run lint**

Run: `npx biome check src/components/boundrune/types/`

- [ ] **Step 12: Commit**

```bash
git add src/components/boundrune/types/
git commit -m "feat: add typed interfaces for all boundrune subdomains"
```

---

## Phase 2: MarketingPage Completion

### Task 5: Add Missing Snippet Overrides to MarketingPage

**Files:**
- Modify: `src/components/landing/MarketingPage.svelte`

- [ ] **Step 1: Add missing snippet props**

Add these props to the MarketingPage interface:

```ts
metricsSnippet?: Snippet;
howItWorksSnippet?: Snippet;
testimonialsSnippet?: Snippet;
statsSnippet?: Snippet;
ctaSnippet?: Snippet;
```

- [ ] **Step 2: Wire up metricsSnippet**

Replace the metrics section:

```svelte
{#if metrics?.length}
  {#if metricsSnippet}
    {@render metricsSnippet()}
  {:else}
    <PageSection id="metrics" size="xl">
      <MetricsBar {metrics} />
    </PageSection>
  {/if}
{/if}
```

- [ ] **Step 3: Wire up howItWorksSnippet**

Replace the steps section:

```svelte
{#if steps?.length}
  {#if howItWorksSnippet}
    {@render howItWorksSnippet()}
  {:else}
    <PageSection id="how-it-works" size="xl">
      <h2 class="text-center text-display-3 text-foreground">How it works</h2>
      <div class="mt-10">
        <HowItWorks {steps} showConnector />
      </div>
    </PageSection>
  {/if}
{/if}
```

- [ ] **Step 4: Wire up testimonialsSnippet**

Replace the testimonials section:

```svelte
{#if testimonials?.length}
  {#if testimonialsSnippet}
    {@render testimonialsSnippet()}
  {:else}
    <PageSection id="testimonials" size="xl">
      <h2 class="text-center text-display-3 text-foreground">What our customers say</h2>
      <div class="mt-10">
        <TestimonialGrid {testimonials} />
      </div>
    </PageSection>
  {/if}
{/if}
```

- [ ] **Step 5: Wire up statsSnippet**

Replace the stats section:

```svelte
{#if stats?.length}
  {#if statsSnippet}
    {@render statsSnippet()}
  {:else}
    <PageSection id="stats" size="xl">
      <StatsCounter {stats} />
    </PageSection>
  {/if}
{/if}
```

- [ ] **Step 6: Wire up ctaSnippet**

Replace the CTA section:

```svelte
{#if ctaTitle}
  {#if ctaSnippet}
    {@render ctaSnippet()}
  {:else}
    <CtaBanner title={ctaTitle} description={ctaDescription} {ctaLabel} {ctaHref} />
  {/if}
{/if}
```

- [ ] **Step 7: Run lint**

Run: `npx biome check src/components/landing/MarketingPage.svelte`

- [ ] **Step 8: Commit**

```bash
git add src/components/landing/MarketingPage.svelte
git commit -m "feat: add missing snippet overrides to MarketingPage"
```

---

### Task 6: Add Missing Landing Sections to MarketingPage

**Files:**
- Modify: `src/components/landing/MarketingPage.svelte`
- Modify: `src/components/landing/landing-types.ts`

- [ ] **Step 1: Add Logo type and logos prop**

Add to `landing-types.ts`:

```ts
export interface Logo {
  label: string;
  icon?: import("svelte").Component | string;
  href?: string;
}
```

Add to MarketingPage props:

```ts
logos?: Logo[];
logosTitle?: string;
logosSnippet?: Snippet;
```

- [ ] **Step 2: Add LogoCloud section to MarketingPage**

After the metrics section, add:

```svelte
{#if logos?.length}
  {#if logosSnippet}
    {@render logosSnippet()}
  {:else}
    <PageSection id="logos" size="xl" reveal={false}>
      <LogoCloud title={logosTitle} logos={logos} />
    </PageSection>
  {/if}
{/if}
```

Import `LogoCloud` from `./LogoCloud.svelte`.

- [ ] **Step 3: Add integrations section**

Add props:

```ts
integrations?: Integration[];
integrationsSnippet?: Snippet;
```

After features section:

```svelte
{#if integrations?.length}
  {#if integrationsSnippet}
    {@render integrationsSnippet()}
  {:else}
    <PageSection id="integrations" size="xl">
      <IntegrationGrid {integrations} />
    </PageSection>
  {/if}
{/if}
```

Import `IntegrationGrid` from `./IntegrationGrid.svelte`.

- [ ] **Step 4: Add team section**

Add props:

```ts
team?: TeamMember[];
teamSnippet?: Snippet;
```

After testimonials:

```svelte
{#if team?.length}
  {#if teamSnippet}
    {@render teamSnippet()}
  {:else}
    <PageSection id="team" size="xl">
      <TeamSection {team} />
    </PageSection>
  {/if}
{/if}
```

Import `TeamSection` from `./TeamSection.svelte`.

- [ ] **Step 5: Add newsletter section**

Add props:

```ts
newsletter?: { title?: string; description?: string };
newsletterSnippet?: Snippet;
```

Before the footer:

```svelte
{#if newsletter}
  {#if newsletterSnippet}
    {@render newsletterSnippet()}
  {:else}
    <PageSection id="newsletter" size="lg" background="muted">
      <Newsletter title={newsletter.title} description={newsletter.description} />
    </PageSection>
  {/if}
{/if}
```

Import `Newsletter` from `./Newsletter.svelte`.

- [ ] **Step 6: Add video section**

Add props:

```ts
video?: { url: string; poster?: string; caption?: string };
videoSnippet?: Snippet;
```

After how-it-works:

```svelte
{#if video}
  {#if videoSnippet}
    {@render videoSnippet()}
  {:else}
    <PageSection id="video" size="lg">
      <VideoEmbed url={video.url} poster={video.poster} caption={video.caption} />
    </PageSection>
  {/if}
{/if}
```

Import `VideoEmbed` from `./VideoEmbed.svelte`.

- [ ] **Step 7: Run lint**

Run: `npx biome check src/components/landing/MarketingPage.svelte src/components/landing/landing-types.ts`

- [ ] **Step 8: Commit**

```bash
git add src/components/landing/MarketingPage.svelte src/components/landing/landing-types.ts
git commit -m "feat: add LogoCloud, IntegrationGrid, TeamSection, Newsletter, VideoEmbed to MarketingPage"
```

---

## Phase 3: Missing Page Templates

### Task 7: AuthPage

**Files:**
- Create: `src/components/boundrune/auth/AuthPage.svelte`
- Modify: `src/components/boundrune/index.ts`

- [ ] **Step 1: Create AuthPage.svelte**

```svelte
<script lang="ts">
import type { Component, Snippet } from "svelte";
import type { AuthView } from "../types/auth";
import AuthLayout from "./AuthLayout.svelte";
import ForgotPassword from "./ForgotPassword.svelte";
import LoginForm from "./LoginForm.svelte";
import RegisterForm from "./RegisterForm.svelte";
import ResetPassword from "./ResetPassword.svelte";
import TwoFactorAuth from "./TwoFactorAuth.svelte";

let {
	view = "login" as AuthView,
	brandImage,
	brandTitle,
	brandDescription,
	onSubmit,
	onForgotPassword,
	onRegister,
	onResetPassword,
	onVerify2FA,
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
	onSubmit?: (data: Record<string, string>) => void | Promise<void>;
	onForgotPassword?: () => void;
	onRegister?: () => void;
	onResetPassword?: (data: Record<string, string>) => void | Promise<void>;
	onVerify2FA?: (code: string) => void | Promise<void>;
	header?: Snippet;
	beforeFields?: Snippet;
	afterFields?: Snippet;
	footer?: Snippet;
	children?: Snippet;
} = $props();
</script>

<AuthLayout {brandImage} {brandTitle} {brandDescription}>
	{#if view === 'login'}
		<LoginForm {onSubmit} {onForgotPassword} {onRegister}>
			{#if header}{@render header()}{/if}
			{#if beforeFields}{@render beforeFields()}{/if}
			{#if afterFields}{@render afterFields()}{/if}
			{#if footer}{@render footer()}{/if}
		</LoginForm>
	{:else if view === 'register'}
		<RegisterForm {onSubmit} {onForgotPassword}>
			{#if header}{@render header()}{/if}
			{#if beforeFields}{@render beforeFields()}{/if}
			{#if afterFields}{@render afterFields()}{/if}
			{#if footer}{@render footer()}{/if}
		</RegisterForm>
	{:else if view === 'forgot-password'}
		<ForgotPassword onSubmit={onForgotPassword}>
			{#if header}{@render header()}{/if}
			{#if footer}{@render footer()}{/if}
		</ForgotPassword>
	{:else if view === 'reset-password'}
		<ResetPassword onSubmit={onResetPassword}>
			{#if header}{@render header()}{/if}
			{#if footer}{@render footer()}{/if}
		</ResetPassword>
	{:else if view === 'two-factor'}
		<TwoFactorAuth onVerify={onVerify2FA}>
			{#if header}{@render header()}{/if}
			{#if footer}{@render footer()}{/if}
		</TwoFactorAuth>
	{/if}
	{#if children}{@render children()}{/if}
</AuthLayout>
```

- [ ] **Step 2: Export from boundrune/index.ts**

Add to `src/components/boundrune/index.ts`:

```ts
export { default as AuthPage } from "./auth/AuthPage.svelte";
```

- [ ] **Step 3: Run lint**

Run: `npx biome check src/components/boundrune/auth/AuthPage.svelte src/components/boundrune/index.ts`

- [ ] **Step 4: Commit**

```bash
git add src/components/boundrune/auth/AuthPage.svelte src/components/boundrune/index.ts
git commit -m "feat: add AuthPage template"
```

---

### Task 8: SettingsPage

**Files:**
- Create: `src/components/boundrune/settings/SettingsPage.svelte`
- Modify: `src/components/boundrune/index.ts`

- [ ] **Step 1: Create SettingsPage.svelte**

```svelte
<script lang="ts">
import type { Component, Snippet } from "svelte";
import PageShell from "../../PageShell.svelte";
import DashboardShellHeader from "../../dashboard/DashboardShellHeader.svelte";
import TabbedSettings from "./TabbedSettings.svelte";

let {
	title = "Settings",
	activeTab = undefined as string | undefined,
	tabs = [] as { id: string; label: string; icon?: Component | string }[],
	class: className = "",
	header,
	footer,
	tabContent,
	children,
}: {
	title?: string;
	activeTab?: string;
	tabs?: { id: string; label: string; icon?: Component | string }[];
	class?: string;
	header?: Snippet;
	footer?: Snippet;
	tabContent?: Snippet<[string]>;
	children?: Snippet;
} = $props();
</script>

{#snippet topbar()}
	<DashboardShellHeader resolvedTitle={title} />
{/snippet}

<PageShell topbar={topbar} class={className}>
	{#snippet main()}
		<div class="p-6">
			{#if header}
				<div class="mb-6">{@render header()}</div>
			{/if}
			<TabbedSettings {tabs} bind:activeTab>
				{#snippet tabContent(tab)}
					{#if tabContent}
						{@render tabContent(tab)}
					{/if}
				{/snippet}
			</TabbedSettings>
			{#if footer}
				<div class="mt-6">{@render footer()}</div>
			{/if}
		</div>
	{/snippet}
</PageShell>
```

- [ ] **Step 2: Export**

```ts
export { default as SettingsPage } from "./settings/SettingsPage.svelte";
```

- [ ] **Step 3: Run lint and commit**

```bash
git add src/components/boundrune/settings/SettingsPage.svelte src/components/boundrune/index.ts
git commit -m "feat: add SettingsPage template"
```

---

### Task 9: ChatPage

**Files:**
- Create: `src/components/boundrune/chat/ChatPage.svelte`
- Modify: `src/components/boundrune/index.ts`

- [ ] **Step 1: Create ChatPage.svelte**

```svelte
<script lang="ts">
import type { Snippet } from "svelte";
import PageShell from "../../PageShell.svelte";
import DashboardShellHeader from "../../dashboard/DashboardShellHeader.svelte";

let {
	title = "Chat",
	selectedConversation = undefined as string | undefined,
	class: className = "",
	conversationList,
	chatHeader,
	children,
}: {
	title?: string;
	selectedConversation?: string;
	class?: string;
	conversationList?: Snippet;
	chatHeader?: Snippet;
	children?: Snippet;
} = $props();
</script>

{#snippet topbar()}
	<DashboardShellHeader resolvedTitle={title} />
{/snippet}

{#snippet leftPanel()}
	{#if conversationList}
		{@render conversationList()}
	{/if}
{/snippet}

<PageShell
	topbar={topbar}
	left={conversationList ? leftPanel : undefined}
	leftWidth="300px"
	leftCollapsible="icon"
	class={className}
>
	{#snippet main()}
		{#if chatHeader}
			<div class="border-b border-border px-6 py-3">
				{@render chatHeader()}
			</div>
		{/if}
		<div class="flex-1 overflow-y-auto p-6">
			{@render children?.()}
		</div>
	{/snippet}
</PageShell>
```

- [ ] **Step 2: Export**

```ts
export { default as ChatPage } from "./chat/ChatPage.svelte";
```

- [ ] **Step 3: Run lint and commit**

```bash
git add src/components/boundrune/chat/ChatPage.svelte src/components/boundrune/index.ts
git commit -m "feat: add ChatPage template"
```

---

### Task 10: CalendarPage

**Files:**
- Create: `src/components/boundrune/calendar/CalendarPage.svelte`
- Modify: `src/components/boundrune/index.ts`

- [ ] **Step 1: Create CalendarPage.svelte**

```svelte
<script lang="ts">
import type { Snippet } from "svelte";
import PageShell from "../../PageShell.svelte";
import DashboardShellHeader from "../../dashboard/DashboardShellHeader.svelte";

let {
	title = "Calendar",
	class: className = "",
	sidebar,
	header,
	children,
}: {
	title?: string;
	class?: string;
	sidebar?: Snippet;
	header?: Snippet;
	children?: Snippet;
} = $props();
</script>

{#snippet topbar()}
	<DashboardShellHeader resolvedTitle={title} {header} />
{/snippet}

{#snippet leftPanel()}
	{#if sidebar}
		<div class="p-4">
			{@render sidebar()}
		</div>
	{/if}
{/snippet}

<PageShell
	topbar={topbar}
	left={sidebar ? leftPanel : undefined}
	leftWidth="320px"
	leftCollapsible="icon"
	class={className}
>
	{#snippet main()}
		<div class="p-6">
			{@render children?.()}
		</div>
	{/snippet}
</PageShell>
```

- [ ] **Step 2: Export**

```ts
export { default as CalendarPage } from "./calendar/CalendarPage.svelte";
```

- [ ] **Step 3: Run lint and commit**

```bash
git add src/components/boundrune/calendar/CalendarPage.svelte src/components/boundrune/index.ts
git commit -m "feat: add CalendarPage template"
```

---

### Task 11: EcommercePage

**Files:**
- Create: `src/components/boundrune/ecommerce/EcommercePage.svelte`
- Modify: `src/components/boundrune/index.ts`

- [ ] **Step 1: Create EcommercePage.svelte**

```svelte
<script lang="ts">
import type { Snippet } from "svelte";
import PageShell from "../../PageShell.svelte";
import DashboardShellHeader from "../../dashboard/DashboardShellHeader.svelte";

let {
	title = "Shop",
	class: className = "",
	cartSnippet,
	header,
	children,
}: {
	title?: string;
	class?: string;
	cartSnippet?: Snippet;
	header?: Snippet;
	children?: Snippet;
} = $props();
</script>

{#snippet topbar()}
	<DashboardShellHeader resolvedTitle={title} {header} />
{/snippet}

{#snippet rightPanel()}
	{#if cartSnippet}
		<div class="p-4">
			{@render cartSnippet()}
		</div>
	{/if}
{/snippet}

<PageShell
	topbar={topbar}
	right={cartSnippet ? rightPanel : undefined}
	rightWidth="360px"
	rightCollapsible="icon"
	class={className}
>
	{#snippet main()}
		<div class="p-6">
			{@render children?.()}
		</div>
	{/snippet}
</PageShell>
```

- [ ] **Step 2: Export**

```ts
export { default as EcommercePage } from "./ecommerce/EcommercePage.svelte";
```

- [ ] **Step 3: Run lint and commit**

```bash
git add src/components/boundrune/ecommerce/EcommercePage.svelte src/components/boundrune/index.ts
git commit -m "feat: add EcommercePage template"
```

---

### Task 12: BlogPage

**Files:**
- Create: `src/components/boundrune/marketing/BlogPage.svelte`
- Modify: `src/components/boundrune/index.ts`

- [ ] **Step 1: Create BlogPage.svelte**

```svelte
<script lang="ts">
import type { Snippet } from "svelte";
import PageShell from "../../PageShell.svelte";
import DashboardShellHeader from "../../dashboard/DashboardShellHeader.svelte";

let {
	title = "Blog",
	class: className = "",
	sidebar,
	header,
	children,
}: {
	title?: string;
	class?: string;
	sidebar?: Snippet;
	header?: Snippet;
	children?: Snippet;
} = $props();
</script>

{#snippet topbar()}
	<DashboardShellHeader resolvedTitle={title} {header} />
{/snippet}

{#snippet leftPanel()}
	{#if sidebar}
		<div class="p-4">
			{@render sidebar()}
		</div>
	{/if}
{/snippet}

<PageShell
	topbar={topbar}
	left={sidebar ? leftPanel : undefined}
	leftWidth="280px"
	leftCollapsible="icon"
	class={className}
>
	{#snippet main()}
		<div class="p-6">
			{@render children?.()}
		</div>
	{/snippet}
</PageShell>
```

- [ ] **Step 2: Export**

```ts
export { default as BlogPage } from "./marketing/BlogPage.svelte";
```

- [ ] **Step 3: Run lint and commit**

```bash
git add src/components/boundrune/marketing/BlogPage.svelte src/components/boundrune/index.ts
git commit -m "feat: add BlogPage template"
```

---

### Task 13: PortfolioPage

**Files:**
- Create: `src/components/boundrune/portfolio/PortfolioPage.svelte`
- Modify: `src/components/boundrune/index.ts`

- [ ] **Step 1: Create PortfolioPage.svelte**

```svelte
<script lang="ts">
import type { Snippet } from "svelte";
import PageSection from "../../PageSection.svelte";

let {
	title = "Portfolio",
	description,
	class: className = "",
	header,
	children,
}: {
	title?: string;
	description?: string;
	class?: string;
	header?: Snippet;
	children?: Snippet;
} = $props();
</script>

<div class="min-h-screen {className}">
	<PageSection size="2xl" spacing="wide" reveal={false}>
		{#if header}
			{@render header()}
		{:else}
			<div class="text-center space-y-4 mb-12">
				<h1 class="text-display-2 text-foreground">{title}</h1>
				{#if description}
					<p class="text-body-lg text-muted-foreground max-w-2xl mx-auto">{description}</p>
				{/if}
			</div>
		{/if}
		{@render children?.()}
	</PageSection>
</div>
```

- [ ] **Step 2: Export**

```ts
export { default as PortfolioPage } from "./portfolio/PortfolioPage.svelte";
```

- [ ] **Step 3: Run lint and commit**

```bash
git add src/components/boundrune/portfolio/PortfolioPage.svelte src/components/boundrune/index.ts
git commit -m "feat: add PortfolioPage template"
```

---

### Task 14: MediaPage

**Files:**
- Create: `src/components/boundrune/media/MediaPage.svelte`
- Modify: `src/components/boundrune/index.ts`

- [ ] **Step 1: Create MediaPage.svelte**

```svelte
<script lang="ts">
import type { Snippet } from "svelte";
import PageShell from "../../PageShell.svelte";
import DashboardShellHeader from "../../dashboard/DashboardShellHeader.svelte";

let {
	title = "Media",
	class: className = "",
	sidebar,
	header,
	children,
}: {
	title?: string;
	class?: string;
	sidebar?: Snippet;
	header?: Snippet;
	children?: Snippet;
} = $props();
</script>

{#snippet topbar()}
	<DashboardShellHeader resolvedTitle={title} {header} />
{/snippet}

{#snippet leftPanel()}
	{#if sidebar}
		<div class="p-4">
			{@render sidebar()}
		</div>
	{/if}
{/snippet}

<PageShell
	topbar={topbar}
	left={sidebar ? leftPanel : undefined}
	leftWidth="300px"
	leftCollapsible="icon"
	class={className}
>
	{#snippet main()}
		<div class="p-6">
			{@render children?.()}
		</div>
	{/snippet}
</PageShell>
```

- [ ] **Step 2: Export**

```ts
export { default as MediaPage } from "./media/MediaPage.svelte";
```

- [ ] **Step 3: Run lint and commit**

```bash
git add src/components/boundrune/media/MediaPage.svelte src/components/boundrune/index.ts
git commit -m "feat: add MediaPage template"
```

---

## Phase 4: Documentation & Exports

### Task 15: Update Documentation

**Files:**
- Modify: `docs/landing.md`
- Modify: `docs/components.md`
- Modify: `docs/architecture.md`

- [ ] **Step 1: Update landing.md with new MarketingPage props**

Add documentation for all new MarketingPage props: `logos`, `logosTitle`, `integrations`, `team`, `newsletter`, `video`, and all corresponding `*Snippet` overrides.

- [ ] **Step 2: Update components.md with new page templates**

Add entries for: AuthPage, SettingsPage, ChatPage, CalendarPage, EcommercePage, BlogPage, PortfolioPage, MediaPage.

- [ ] **Step 3: Update architecture.md with complete template list**

- [ ] **Step 4: Run lint**

Run: `npx biome check docs/`

- [ ] **Step 5: Commit**

```bash
git add docs/
git commit -m "docs: update for meta-pages expansion"
```

---

### Task 16: Final Verification

- [ ] **Step 1: Run full lint**

Run: `npx biome check src/`

- [ ] **Step 2: Run typecheck**

Run: `npx svelte-check --tsconfig ./tsconfig.json`

- [ ] **Step 3: Run tests**

Run: `bun run test`

- [ ] **Step 4: Verify exports**

Check that all new components are properly exported:
- `urupe-ui` → PageShell, PageSection
- `urupe-ui/landing` → MarketingPage, Logo, Testimonial
- `urupe-ui/boundrune` → DashboardPage, CrudPage, AuthPage, SettingsPage, ChatPage, CalendarPage, EcommercePage, BlogPage, PortfolioPage, MediaPage

- [ ] **Step 5: Final commit if any fixes needed**
