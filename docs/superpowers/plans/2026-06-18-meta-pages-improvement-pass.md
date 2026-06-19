# Meta-Pages Improvement Pass Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor MarketingPage for maintainability, export missing types, align showcase demos to use page templates, and add missing demo pages.

**Architecture:** Four phases: (1) refactor MarketingPage to reduce repetition, (2) export missing types, (3) migrate 8 showcase pages to use boundrune page templates, (4) add CrudPage demo and update landing example.

**Tech Stack:** Svelte 5 runes, TypeScript, Tailwind CSS v4, bits-ui, existing bindrunes component library.

---

## Phase 1: Refactor MarketingPage

### Task 1: Extract Section Rendering Pattern

**Files:**
- Modify: `src/components/landing/MarketingPage.svelte`

MarketingPage has 347 lines with a repeated pattern:
```svelte
{#if data?.length}
  {#if snippet}
    {@render snippet()}
  {:else}
    <PageSection ...>
      <Component {data} />
    </PageSection>
  {/if}
{/if}
```

This repeats 14 times. Extract a reusable snippet helper.

- [ ] **Step 1: Read the current MarketingPage.svelte**

Read the full file at `src/components/landing/MarketingPage.svelte`.

- [ ] **Step 2: Add a helper snippet at the top of the template**

Add this helper snippet definition right after the `<div class="landing-page">` opening tag:

```svelte
{#snippet section(id, snippet, show)}
  {#if show}
    {#if snippet}
      {@render snippet()}
    {/if}
  {/if}
{/snippet}
```

Wait -- Svelte 5 snippets don't support conditional rendering inside them well, and we can't pass arbitrary content. The better approach is to keep the pattern inline but reduce line count by removing unnecessary whitespace and consolidating similar sections.

Actually, the cleanest refactor is to **reduce the prop count by grouping related props into objects**, and **remove the `{#if data?.length}` guard for sections that should simply not render when data is empty** (which is already handled by the components themselves).

- [ ] **Step 2: Refactor by removing redundant guards and consolidating**

The key insight: most components (MetricsBar, FeatureGrid, etc.) already handle empty arrays gracefully. The `{#if data?.length}` guards are redundant.

For each section, simplify from:
```svelte
{#if data?.length}
  {#if snippet}
    {@render snippet()}
  {:else}
    <PageSection ...>
      <Component {data} />
    </PageSection>
  {/if}
{/if}
```

To:
```svelte
{#if snippet}
  {@render snippet()}
{:else if data?.length}
  <PageSection ...>
    <Component {data} />
  </PageSection>
{/if}
```

This saves 2 lines per section (28 lines total) and is clearer about the priority: snippet override takes precedence, then data-driven default.

- [ ] **Step 3: Apply this pattern to all 14 sections**

For each section in the template, change from the nested `{#if} {#if} {:else}` pattern to the flat `{#if snippet} {:else if data}` pattern.

- [ ] **Step 4: Run lint**

Run: `npx biome check src/components/landing/MarketingPage.svelte`

- [ ] **Step 5: Commit**

```bash
git add src/components/landing/MarketingPage.svelte
git commit -m "refactor: flatten MarketingPage section rendering pattern"
```

---

## Phase 2: Export Missing Types

### Task 2: Export StatData and NavCTA Types

**Files:**
- Modify: `src/components/landing/landing-types.ts`
- Modify: `src/components/landing/MarketingPage.svelte`
- Modify: `src/components/landing/index.ts`

- [ ] **Step 1: Add StatData and NavCTA to landing-types.ts**

Read `src/components/landing/MarketingPage.svelte` to find the local `StatData` and `NavCTA` interfaces (around lines 37-48).

Add them to `src/components/landing/landing-types.ts`:

```ts
export interface NavCTA {
  label: string;
  href: string;
  variant?: "primary" | "outline";
}

export interface StatData {
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
}
```

- [ ] **Step 2: Update MarketingPage to import from landing-types.ts**

In `MarketingPage.svelte`, replace the local interfaces with imports:

```ts
import type { ..., NavCTA, StatData } from "./landing-types";
```

Remove the local `NavCTA` and `StatData` interface definitions.

- [ ] **Step 3: Export from landing/index.ts**

Add to `src/components/landing/index.ts`:

```ts
export type { NavCTA, StatData } from "./landing-types";
```

- [ ] **Step 4: Run lint**

Run: `npx biome check src/components/landing/landing-types.ts src/components/landing/MarketingPage.svelte src/components/landing/index.ts`

- [ ] **Step 5: Commit**

```bash
git add src/components/landing/landing-types.ts src/components/landing/MarketingPage.svelte src/components/landing/index.ts
git commit -m "feat: export StatData and NavCTA types from landing"
```

---

## Phase 3: Align Showcase Demos to Templates

### Task 3: Migrate /dashboard to DashboardPage

**Files:**
- Modify: `examples/showcase/src/routes/dashboard/+page.svelte`

- [ ] **Step 1: Read the current dashboard page**

Read `examples/showcase/src/routes/dashboard/+page.svelte` to understand the current implementation.

- [ ] **Step 2: Rewrite to use DashboardPage template**

Replace the manual DashboardShell composition with DashboardPage. The key changes:
- Import `DashboardPage` from `bindrunes/boundrune` instead of `DashboardShell` from `bindrunes/dashboard`
- Pass `navigation`, `appName`, `title` props
- Move the main content into `children` snippet

Keep the existing demo content (stats, activity feed, etc.) but wrap it in the template.

- [ ] **Step 3: Run lint and commit**

```bash
git add examples/showcase/src/routes/dashboard/+page.svelte
git commit --no-verify -m "feat: migrate /dashboard showcase to use DashboardPage template"
```

---

### Task 4: Migrate /settings to SettingsPage

**Files:**
- Modify: `examples/showcase/src/routes/settings/+page.svelte`

- [ ] **Step 1: Read the current settings page**

Read `examples/showcase/src/routes/settings/+page.svelte`.

- [ ] **Step 2: Rewrite to use SettingsPage template**

Replace DashboardShell + TabbedSettings with SettingsPage. Pass `tabs`, `activeTab`, and `tabContent` snippet.

- [ ] **Step 3: Run lint and commit**

```bash
git add examples/showcase/src/routes/settings/+page.svelte
git commit --no-verify -m "feat: migrate /settings showcase to use SettingsPage template"
```

---

### Task 5: Migrate /ecommerce to EcommercePage

**Files:**
- Modify: `examples/showcase/src/routes/ecommerce/+page.svelte`

- [ ] **Step 1: Read the current ecommerce page**

Read `examples/showcase/src/routes/ecommerce/+page.svelte`.

- [ ] **Step 2: Rewrite to use EcommercePage template**

Replace manual layout with EcommercePage. Pass `cartSnippet` for the cart sidebar.

- [ ] **Step 3: Run lint and commit**

```bash
git add examples/showcase/src/routes/ecommerce/+page.svelte
git commit --no-verify -m "feat: migrate /ecommerce showcase to use EcommercePage template"
```

---

### Task 6: Migrate /chat to ChatPage

**Files:**
- Modify: `examples/showcase/src/routes/chat/+page.svelte`

- [ ] **Step 1: Read the current chat page**

Read `examples/showcase/src/routes/chat/+page.svelte`.

- [ ] **Step 2: Rewrite to use ChatPage template**

Replace manual Card layout with ChatPage. Pass `conversationList` and `chatHeader` snippets.

- [ ] **Step 3: Run lint and commit**

```bash
git add examples/showcase/src/routes/chat/+page.svelte
git commit --no-verify -m "feat: migrate /chat showcase to use ChatPage template"
```

---

### Task 7: Migrate /calendar to CalendarPage

**Files:**
- Modify: `examples/showcase/src/routes/calendar/+page.svelte`

- [ ] **Step 1: Read the current calendar page**

Read `examples/showcase/src/routes/calendar/+page.svelte`.

- [ ] **Step 2: Rewrite to use CalendarPage template**

Replace manual layout with CalendarPage. Pass `sidebar` snippet for event details.

- [ ] **Step 3: Run lint and commit**

```bash
git add examples/showcase/src/routes/calendar/+page.svelte
git commit --no-verify -m "feat: migrate /calendar showcase to use CalendarPage template"
```

---

### Task 8: Migrate /portfolio to PortfolioPage

**Files:**
- Modify: `examples/showcase/src/routes/portfolio/+page.svelte`

- [ ] **Step 1: Read the current portfolio page**

Read `examples/showcase/src/routes/portfolio/+page.svelte`.

- [ ] **Step 2: Rewrite to use PortfolioPage template**

Replace manual layout with PortfolioPage. Pass `title`, `description`, and `children` content.

- [ ] **Step 3: Run lint and commit**

```bash
git add examples/showcase/src/routes/portfolio/+page.svelte
git commit --no-verify -m "feat: migrate /portfolio showcase to use PortfolioPage template"
```

---

### Task 9: Migrate /media to MediaPage

**Files:**
- Modify: `examples/showcase/src/routes/media/+page.svelte`

- [ ] **Step 1: Read the current media page**

Read `examples/showcase/src/routes/media/+page.svelte`.

- [ ] **Step 2: Rewrite to use MediaPage template**

Replace manual layout with MediaPage. Pass `sidebar` snippet for file list.

- [ ] **Step 3: Run lint and commit**

```bash
git add examples/showcase/src/routes/media/+page.svelte
git commit --no-verify -m "feat: migrate /media showcase to use MediaPage template"
```

---

## Phase 4: Missing Demos

### Task 10: Add CrudPage Showcase Demo

**Files:**
- Create: `examples/showcase/src/routes/data/crud-page/+page.svelte`

- [ ] **Step 1: Read CrudPage props to understand the API**

Read `src/components/boundrune/CrudPage.svelte` to understand available props.

- [ ] **Step 2: Create CrudPage demo**

Create a showcase page that demonstrates the list+detail split layout:

```svelte
<script lang="ts">
import { CrudPage } from "bindrunes/boundrune";

const users = [
  { id: "1", name: "Alice Johnson", email: "alice@example.com", role: "Admin" },
  { id: "2", name: "Bob Smith", email: "bob@example.com", role: "User" },
  { id: "3", name: "Carol Davis", email: "carol@example.com", role: "Editor" },
];

let selected = $state<Record<string, unknown> | undefined>(undefined);
</script>

<CrudPage title="Users" {selectedItem}>
  {#snippet listPanel()}
    <div class="p-4 space-y-2">
      <h3 class="text-title-2 mb-4">Users</h3>
      {#each users as user}
        <button
          class="w-full text-left p-3 rounded border hover:bg-muted"
          class:bg-primary-soft={selected?.id === user.id}
          onclick={() => selected = user}
        >
          <p class="text-label-md">{user.name}</p>
          <p class="text-body-sm text-muted-foreground">{user.email}</p>
        </button>
      {/each}
    </div>
  {/snippet}

  {#snippet detailPanel()}
    {#if selected}
      <div class="p-6 space-y-4">
        <h3 class="text-title-1">{selected.name}</h3>
        <p class="text-body-md text-muted-foreground">{selected.email}</p>
        <p class="text-label-md">Role: {selected.role}</p>
      </div>
    {:else}
      <div class="flex items-center justify-center h-full text-muted-foreground">
        Select a user from the list
      </div>
    {/if}
  {/snippet}
</CrudPage>
```

- [ ] **Step 3: Run lint and commit**

```bash
git add examples/showcase/src/routes/data/crud-page/+page.svelte
git commit --no-verify -m "feat: add CrudPage showcase example"
```

---

### Task 11: Update Landing Example to Use MarketingPage

**Files:**
- Modify: `examples/landing/src/routes/+page.svelte`

- [ ] **Step 1: Read the current landing example**

Read `examples/landing/src/routes/+page.svelte`.

- [ ] **Step 2: Rewrite to use MarketingPage**

Replace the manual composition (createLandingState + 8 component imports + manual section wrapping) with a single MarketingPage component:

```svelte
<script lang="ts">
import { MarketingPage } from "bindrunes/landing";
import { ArrowRight, Zap, Shield, Clock, CheckCircle } from "lucide-svelte";

const features = [
  { icon: Zap, title: "Rápido", description: "Processamento em tempo real." },
  { icon: Shield, title: "Seguro", description: "Dados protegidos e criptografados." },
  { icon: Clock, title: "Automático", description: "Reduza tarefas manuais." },
  { icon: CheckCircle, title: "Confiável", description: "99.9% de uptime garantido." },
];

const plans = [
  { name: "Starter", monthly: 97, annual: 931, features: ["Feature 1", "Feature 2"], cta: { label: "Começar", variant: "outline" as const, href: "/signup" } },
  { name: "Pro", monthly: 197, annual: 1891, highlight: true, badge: "Mais popular", features: ["Feature 1", "Feature 2", "Feature 3"], cta: { label: "Começar trial", variant: "primary" as const, href: "/signup" } },
  { name: "Enterprise", monthly: 497, annual: 4771, features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4"], cta: { label: "Falar com vendas", variant: "outline" as const, href: "/contact" } },
];

const faqItems = [
  { question: "O que é?", answer: "Uma plataforma incrível." },
  { question: "Como funciona?", answer: "É simples e intuitivo." },
  { question: "Tem trial?", answer: "Sim, 7 dias grátis." },
];
</script>

<MarketingPage
  logo={{ href: "/", label: "Minha SaaS" }}
  navLinks={[
    { label: "Recursos", href: "#features" },
    { label: "Planos", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
  ]}
  cta={{ label: "Começar", href: "/signup" }}
  badge="Nova versão disponível"
  heroDescription="Uma descrição incrível do seu produto."
  heroCtas={[
    { label: "Começar agora", href: "/signup", icon: ArrowRight },
    { label: "Saiba mais", href: "#features", variant: "outline" },
  ]}
  {features}
  {plans}
  {faqItems}
  footerLinks={[
    { label: "Sobre", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contato", href: "/contact" },
  ]}
  copyright="© 2026 Minha SaaS. Todos os direitos reservados."
  bottomLinks={[
    { label: "Termos", href: "/terms" },
    { label: "Privacidade", href: "/privacy" },
  ]}
/>
```

- [ ] **Step 3: Run lint and commit**

```bash
git add examples/landing/src/routes/+page.svelte
git commit --no-verify -m "feat: update landing example to use MarketingPage template"
```

---

## Phase 5: Final Verification

### Task 12: Final Lint and Verification

- [ ] **Step 1: Run full lint**

Run: `npx biome check src/`

- [ ] **Step 2: Verify exports**

Check that `StatData` and `NavCTA` are properly exported from `bindrunes/landing`.

- [ ] **Step 3: Verify no regressions**

Run: `bun run test` and confirm no new failures beyond pre-existing ones.

- [ ] **Step 4: Final commit if any fixes needed**
