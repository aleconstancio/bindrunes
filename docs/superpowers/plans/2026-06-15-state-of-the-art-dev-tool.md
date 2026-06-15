# State-of-the-Art Developer Tool Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Complete the bindrunes showcase, add developer experience features (code snippets, playground), and fix agentic kernel issues.

**Architecture:** Three phases — Phase 1 completes missing demos in `examples/showcase/`. Phase 2 adds a `CodeSnippet` component and interactive playground. Phase 3 fixes agentic kernel duplication and adds context wrappers.

**Tech Stack:** Svelte 5 runes, Tailwind CSS v4, bits-ui, valibot, Vitest, happy-dom

---

## File Map

### Phase 1 — Showcase Completion

| Action | File |
|--------|------|
| Modify | `examples/showcase/src/routes/components/forms/+page.svelte` |
| Modify | `examples/showcase/src/routes/components/feedback/+page.svelte` |
| Modify | `examples/showcase/src/routes/dashboard/+page.svelte` |
| Modify | `examples/showcase/src/routes/settings/+page.svelte` |
| Modify | `examples/showcase/src/routes/components/+page.svelte` |
| Modify | `examples/showcase/src/routes/auth/login/+page.svelte` |
| Modify | `examples/showcase/src/routes/auth/register/+page.svelte` |
| Modify | `examples/showcase/src/routes/auth/forgot-password/+page.svelte` |
| Modify | `examples/showcase/src/routes/auth/reset-password/+page.svelte` |
| Modify | `examples/showcase/src/routes/auth/email-verify/+page.svelte` |
| Modify | `examples/showcase/src/routes/auth/2fa/+page.svelte` |
| Modify | `examples/showcase/src/routes/calendar/+page.svelte` |
| Modify | `examples/showcase/src/routes/marketing/blog/+page.svelte` |
| Modify | `examples/showcase/src/routes/data/list/+page.svelte` |
| Modify | `examples/showcase/src/routes/landing/+page.svelte` |
| Modify | `examples/showcase/src/routes/app/+page.svelte` |

### Phase 2 — DX Features

| Action | File |
|--------|------|
| Create | `src/components/CodeSnippet.svelte` |
| Create | `src/components/CodeSnippet.svelte.test.ts` |
| Modify | `src/index.ts` (add CodeSnippet export) |
| Create | `examples/showcase/src/routes/playground/+page.svelte` |
| Modify | Multiple showcase route files (add "Show Code" sections) |

### Phase 3 — Agentic Fixes

| Action | File |
|--------|------|
| Modify | `src/utils/agentic/createTokenBudget.svelte.ts` |
| Create | `src/utils/agentic/provideWindowStore.svelte.ts` |
| Create | `src/utils/agentic/useWindowStore.svelte.ts` |
| Modify | `docs/agentic/overview.md` |

---

## Phase 1 Tasks

### Task 1: Fix Bugs (5 quick fixes)

**Files:**
- Modify: `examples/showcase/src/routes/components/forms/+page.svelte:115`
- Modify: `examples/showcase/src/routes/components/feedback/+page.svelte:2`
- Modify: `examples/showcase/src/routes/dashboard/+page.svelte:5`
- Modify: `examples/showcase/src/routes/settings/+page.svelte:2`
- Modify: `examples/showcase/src/routes/components/+page.svelte:202`

- [ ] **Step 1: Fix broken options binding in forms page**

In `examples/showcase/src/routes/components/forms/+page.svelte`, find line ~115 where `{options}` is used and change to `{selectOptions}`:

```svelte
<!-- Before -->
<Select bind:value={selectValue} {options} placeholder="Select an option" />

<!-- After -->
<Select bind:value={selectValue} options={selectOptions} placeholder="Select an option" />
```

- [ ] **Step 2: Remove unused Suspense import**

In `examples/showcase/src/routes/components/feedback/+page.svelte`, remove the `Suspense` import from the import statement.

- [ ] **Step 3: Remove unused StatsOverview import**

In `examples/showcase/src/routes/dashboard/+page.svelte`, remove `StatsOverview` from the import statement.

- [ ] **Step 4: Remove unused goto import**

In `examples/showcase/src/routes/settings/+page.svelte`, remove `goto` from the import statement.

- [ ] **Step 5: Fix DocsLayout demoPath**

In `examples/showcase/src/routes/components/+page.svelte`, find the `DocsLayout` entry (line ~202) and change `demoPath: ""` to `demoPath: "/marketing/docs"`.

- [ ] **Step 6: Verify fixes**

Run: `cd examples/showcase && bun run check`
Expected: No type errors

- [ ] **Step 7: Commit**

```bash
git add examples/showcase/src/routes/components/forms/+page.svelte \
  examples/showcase/src/routes/components/feedback/+page.svelte \
  examples/showcase/src/routes/dashboard/+page.svelte \
  examples/showcase/src/routes/settings/+page.svelte \
  examples/showcase/src/routes/components/+page.svelte
git commit -m "fix: showcase bugs — broken binding, unused imports, wrong demoPath"
```

---

### Task 2: Add Auth Pages AuthLayout Wrapper

**Files:**
- Modify: `examples/showcase/src/routes/auth/login/+page.svelte`
- Modify: `examples/showcase/src/routes/auth/register/+page.svelte`
- Modify: `examples/showcase/src/routes/auth/forgot-password/+page.svelte`
- Modify: `examples/showcase/src/routes/auth/reset-password/+page.svelte`
- Modify: `examples/showcase/src/routes/auth/email-verify/+page.svelte`
- Modify: `examples/showcase/src/routes/auth/2fa/+page.svelte`

- [ ] **Step 1: Read current auth page structure**

Read each auth page to understand current structure. They are all bare wrappers around a single form component.

- [ ] **Step 2: Update login page with AuthLayout**

```svelte
<script lang="ts">
  import { AuthLayout, LoginForm } from "bindrunes/boundrune";
</script>

<AuthLayout
  brand="bindrunes"
  tagline="Sign in to your account"
  description="Welcome back. Enter your credentials to access your dashboard."
>
  <LoginForm />
</AuthLayout>
```

- [ ] **Step 3: Update register page with AuthLayout**

```svelte
<script lang="ts">
  import { AuthLayout, RegisterForm } from "bindrunes/boundrune";
</script>

<AuthLayout
  brand="bindrunes"
  tagline="Create your account"
  description="Get started with bindrunes. Fill in your details to create your account."
>
  <RegisterForm />
</AuthLayout>
```

- [ ] **Step 4: Update forgot-password page with AuthLayout**

```svelte
<script lang="ts">
  import { AuthLayout, ForgotPassword } from "bindrunes/boundrune";
</script>

<AuthLayout
  brand="bindrunes"
  tagline="Reset your password"
  description="Enter your email address and we'll send you a link to reset your password."
>
  <ForgotPassword />
</AuthLayout>
```

- [ ] **Step 5: Update reset-password page with AuthLayout**

```svelte
<script lang="ts">
  import { AuthLayout, ResetPassword } from "bindrunes/boundrune";
</script>

<AuthLayout
  brand="bindrunes"
  tagline="Set new password"
  description="Enter your new password below."
>
  <ResetPassword />
</AuthLayout>
```

- [ ] **Step 6: Update email-verify page with AuthLayout**

```svelte
<script lang="ts">
  import { AuthLayout, EmailVerification } from "bindrunes/boundrune";
</script>

<AuthLayout
  brand="bindrunes"
  tagline="Verify your email"
  description="We've sent a verification link to your email address."
>
  <EmailVerification />
</AuthLayout>
```

- [ ] **Step 7: Update 2fa page with AuthLayout**

```svelte
<script lang="ts">
  import { AuthLayout, TwoFactorAuth } from "bindrunes/boundrune";
</script>

<AuthLayout
  brand="bindrunes"
  tagline="Two-factor authentication"
  description="Enter the 6-digit code from your authenticator app."
>
  <TwoFactorAuth />
</AuthLayout>
```

- [ ] **Step 8: Verify all auth pages**

Run: `cd examples/showcase && bun run check`
Expected: No type errors

- [ ] **Step 9: Commit**

```bash
git add examples/showcase/src/routes/auth/
git commit -m "feat: wrap auth pages in AuthLayout split-screen"
```

---

### Task 3: Add Missing Calendar Demo (AvailabilityGrid)

**Files:**
- Modify: `examples/showcase/src/routes/calendar/+page.svelte`

- [ ] **Step 1: Read current calendar page**

Read `examples/showcase/src/routes/calendar/+page.svelte` to understand structure.

- [ ] **Step 2: Add AvailabilityGrid section**

Add import for `AvailabilityGrid` from `bindrunes/boundrune` and add a new section after the existing BookingForm demo:

```svelte
<script lang="ts">
  // ... existing imports
  import { AvailabilityGrid } from "bindrunes/boundrune";
</script>

<!-- Existing sections ... -->

<!-- Availability Grid -->
<section class="space-y-4">
  <div>
    <h3 class="text-title-2 text-foreground">Availability Grid</h3>
    <p class="text-body-sm text-muted-foreground">Weekly availability toggle grid</p>
  </div>
  <Card padding>
    <AvailabilityGrid />
  </Card>
</section>
```

- [ ] **Step 3: Verify**

Run: `cd examples/showcase && bun run check`

- [ ] **Step 4: Commit**

```bash
git add examples/showcase/src/routes/calendar/+page.svelte
git commit -m "feat: add AvailabilityGrid demo to calendar page"
```

---

### Task 4: Add Missing Marketing Demos (Banner, CommentSection)

**Files:**
- Modify: `examples/showcase/src/routes/marketing/blog/+page.svelte`

- [ ] **Step 1: Read current marketing blog page**

Read the file to understand structure.

- [ ] **Step 2: Add Banner section**

Add import for `Banner` from `bindrunes/boundrune` and add a new section:

```svelte
<script lang="ts">
  // ... existing imports
  import { Banner, CommentSection } from "bindrunes/boundrune";
</script>

<!-- Existing sections ... -->

<!-- Banner -->
<section class="space-y-4">
  <div>
    <h3 class="text-title-2 text-foreground">Banner</h3>
    <p class="text-body-sm text-muted-foreground">Marketing announcement banner</p>
  </div>
  <Banner title="New Release" description="Version 2.0 is now available with exciting new features!" />
</section>

<!-- Comment Section -->
<section class="space-y-4">
  <div>
    <h3 class="text-title-2 text-foreground">Comment Section</h3>
    <p class="text-body-sm text-muted-foreground">Comments with reply form</p>
  </div>
  <Card padding>
    <CommentSection
      comments={[
        { author: "Alice", content: "Great article!", date: "2 hours ago" },
        { author: "Bob", content: "Very helpful, thanks for sharing.", date: "1 hour ago" },
      ]}
    />
  </Card>
</section>
```

- [ ] **Step 3: Verify**

Run: `cd examples/showcase && bun run check`

- [ ] **Step 4: Commit**

```bash
git add examples/showcase/src/routes/marketing/blog/+page.svelte
git commit -m "feat: add Banner and CommentSection demos to marketing page"
```

---

### Task 5: Add Missing CRUD Component Demos

**Files:**
- Modify: `examples/showcase/src/routes/data/list/+page.svelte`

- [ ] **Step 1: Read current data list page**

Read the file — it already has 7 tabs. We'll add CRUD component demos as new sections below the tabs.

- [ ] **Step 2: Add CRUD component imports and sections**

Add imports for all 8 CRUD components and add demo sections with mock data:

```svelte
<script lang="ts">
  // ... existing imports
  import {
    CrudCreateForm,
    CrudCreateDrawer,
    CrudCreateModal,
    CrudEditForm,
    CrudEditDrawer,
    CrudEditModal,
    CrudDeleteConfirm,
    CrudDetailDrawer,
  } from "bindrunes/boundrune";
</script>

<!-- After existing tabs section -->

<!-- CRUD Components -->
<div class="space-y-8">
  <h2 class="text-title-1 text-foreground">CRUD Components</h2>

  <!-- CrudCreateForm -->
  <section class="space-y-4">
    <h3 class="text-title-2 text-foreground">CrudCreateForm</h3>
    <Card padding>
      <CrudCreateForm
        config={{
          title: "Create User",
          description: "Add a new user to the system",
          fields: [
            { name: "name", label: "Name", type: "text", placeholder: "John Doe", required: true },
            { name: "email", label: "Email", type: "email", placeholder: "john@example.com", required: true },
            { name: "role", label: "Role", type: "select", options: [
              { label: "Admin", value: "admin" },
              { label: "User", value: "user" },
            ]},
          ],
        }}
        onSubmit={async (values) => { console.log("Created:", values); }}
      />
    </Card>
  </section>

  <!-- Similar sections for CrudEditForm, CrudDeleteConfirm, CrudDetailDrawer -->
  <!-- CrudCreateDrawer, CrudCreateModal, CrudEditDrawer, CrudEditModal — trigger buttons -->
</div>
```

- [ ] **Step 3: Add drawer/modal trigger buttons**

For drawer and modal variants, add Button triggers that open them:

```svelte
<div class="flex gap-2">
  <CrudCreateDrawer
    config={{ title: "Create User", fields: [...] }}
    onSubmit={async (v) => console.log(v)}
  >
    {#snippet trigger()}
      <Button variant="outline">Open Create Drawer</Button>
    {/snippet}
  </CrudCreateDrawer>

  <CrudCreateModal
    config={{ title: "Create User", fields: [...] }}
    onSubmit={async (v) => console.log(v)}
  >
    {#snippet trigger()}
      <Button variant="outline">Open Create Modal</Button>
    {/snippet}
  </CrudCreateModal>
</div>
```

- [ ] **Step 4: Verify**

Run: `cd examples/showcase && bun run check`

- [ ] **Step 5: Commit**

```bash
git add examples/showcase/src/routes/data/list/+page.svelte
git commit -m "feat: add CRUD component demos (CreateForm, EditForm, DeleteConfirm, DetailDrawer, drawers, modals)"
```

---

### Task 6: Add Missing Composable Demos to App Page

**Files:**
- Modify: `examples/showcase/src/routes/app/+page.svelte`

- [ ] **Step 1: Read current app page**

Read the file — it has 5 tabs. The Composables tab already has useToggle, useCounter, useClipboard, useLocalStorage. We'll add 8 more composables.

- [ ] **Step 2: Add composable imports and interactive demos**

Add to the Composables tab section:

```svelte
<script lang="ts">
  // ... existing imports
  import {
    createAuth, createAccess, createToast, createApiClient,
    useDebounce, useEventListener, useIntersectionObserver, useResizeObserver,
  } from "bindrunes";
</script>

<!-- In the Composables tab, add after existing demos -->

<!-- createAuth -->
<div class="space-y-3">
  <h4 class="text-title-3 text-foreground font-mono">createAuth</h4>
  <p class="text-body-sm text-muted-foreground">Token/user management with login/logout</p>
  {@render authDemo()}
</div>

<!-- createAccess -->
<div class="space-y-3">
  <h4 class="text-title-3 text-foreground font-mono">createAccess</h4>
  <p class="text-body-sm text-muted-foreground">Role-based access checks</p>
  {@render accessDemo()}
</div>

<!-- createToast -->
<div class="space-y-3">
  <h4 class="text-title-3 text-foreground font-mono">createToast</h4>
  <p class="text-body-sm text-muted-foreground">Toast notifications</p>
  {@render toastDemo()}
</div>

<!-- useDebounce -->
<div class="space-y-3">
  <h4 class="text-title-3 text-foreground font-mono">useDebounce</h4>
  <p class="text-body-sm text-muted-foreground">Debounced search input</p>
  {@render debounceDemo()}
</div>

<!-- useEventListener -->
<div class="space-y-3">
  <h4 class="text-title-3 text-foreground font-mono">useEventListener</h4>
  <p class="text-body-sm text-muted-foreground">DOM event listener with auto-cleanup</p>
  {@render eventListenerDemo()}
</div>

<!-- useIntersectionObserver -->
<div class="space-y-3">
  <h4 class="text-title-3 text-foreground font-mono">useIntersectionObserver</h4>
  <p class="text-body-sm text-muted-foreground">Element visibility detection</p>
  {@render intersectionDemo()}
</div>

<!-- useResizeObserver -->
<div class="space-y-3">
  <h4 class="text-title-3 text-foreground font-mono">useResizeObserver</h4>
  <p class="text-body-sm text-muted-foreground">Element size changes</p>
  {@render resizeDemo()}
</div>
```

- [ ] **Step 3: Implement demo snippets**

Each demo is a `{#snippet}` block with interactive controls:

```svelte
{#snippet authDemo()}
  {@const auth = createAuth()}
  <div class="flex gap-2 items-center">
    <Button size="sm" onclick={() => auth.login({ id: "1", name: "Demo User", role: "admin" })}>Login</Button>
    <Button size="sm" variant="outline" onclick={() => auth.logout()}>Logout</Button>
    <span class="text-body-sm text-muted-foreground">
      {auth.isAuthenticated ? `Logged in as ${auth.user?.name}` : "Not authenticated"}
    </span>
  </div>
{/snippet}

{#snippet debounceDemo()}
  {@const searchValue = $state("")}
  {@const debouncedValue = useDebounce(() => searchValue, 300)}
  <div class="space-y-2">
    <Input bind:value={searchValue} placeholder="Type to search..." />
    <p class="text-body-sm text-muted-foreground">Debounced value: {debouncedValue()}</p>
  </div>
{/snippet}

{#snippet eventListenerDemo()}
  {@const lastKey = $state("")}
  {@const _ = useEventListener("keydown", (e) => { lastKey = e.key; })}
  <p class="text-body-sm text-muted-foreground">Last key pressed: <Kbd>{lastKey || "none"}</Kbd></p>
{/snippet}
```

- [ ] **Step 4: Verify**

Run: `cd examples/showcase && bun run check`

- [ ] **Step 5: Commit**

```bash
git add examples/showcase/src/routes/app/+page.svelte
git commit -m "feat: add 8 composable demos (createAuth, createAccess, createToast, useDebounce, useEventListener, etc.)"
```

---

### Task 7: Add Missing Landing Components

**Files:**
- Modify: `examples/showcase/src/routes/landing/+page.svelte`

- [ ] **Step 1: Read current landing page**

Read the file to understand structure and find where to add missing components.

- [ ] **Step 2: Add 5 missing landing components**

Add imports and sections for: `FeatureComparison`, `Testimonial` (singular), `LandingNav`, `LandingSection`, `SiteFooterColumns`

```svelte
<script lang="ts">
  // ... existing imports
  import {
    FeatureComparison, Testimonial, LandingNav, LandingSection, SiteFooterColumns,
  } from "bindrunes/landing";
</script>

<!-- After existing sections -->

<!-- Feature Comparison -->
<LandingSection title="Feature Comparison" description="See how we stack up">
  <FeatureComparison
    features={[
      { name: "Components", us: "160+", competitor: "50+" },
      { name: "Themes", us: "6", competitor: "3" },
      { name: "Accessibility", us: "Full", competitor: "Partial" },
    ]}
  />
</LandingSection>

<!-- Single Testimonial -->
<LandingSection title="What Users Say" description="Trusted by developers">
  <Testimonial
    quote="bindrunes has completely transformed how we build Svelte applications."
    author="Sarah Chen"
    role="CTO at TechCorp"
  />
</LandingSection>

<!-- Site Footer Columns -->
<SiteFooterColumns
  columns={[
    { title: "Product", links: [{ label: "Features", href: "#" }, { label: "Pricing", href: "#" }] },
    { title: "Company", links: [{ label: "About", href: "#" }, { label: "Blog", href: "#" }] },
    { title: "Support", links: [{ label: "Docs", href: "#" }, { label: "Contact", href: "#" }] },
  ]}
/>
```

- [ ] **Step 3: Verify**

Run: `cd examples/showcase && bun run check`

- [ ] **Step 4: Commit**

```bash
git add examples/showcase/src/routes/landing/+page.svelte
git commit -m "feat: add 5 missing landing components (FeatureComparison, Testimonial, LandingSection, SiteFooterColumns)"
```

---

## Phase 2 Tasks

### Task 8: Create CodeSnippet Component

**Files:**
- Create: `src/components/CodeSnippet.svelte`
- Create: `src/components/CodeSnippet.svelte.test.ts`
- Modify: `src/index.ts`

- [ ] **Step 1: Write the failing test**

```ts
// src/components/CodeSnippet.svelte.test.ts
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/svelte";
import { expectNoAxeViolations } from "../helpers/axe";
import CodeSnippet from "./CodeSnippet.svelte";

describe("CodeSnippet", () => {
  it("renders code content", () => {
    const { getByText } = render(CodeSnippet, {
      props: { code: "const x = 1;" },
    });
    expect(getByText("const x = 1;")).toBeTruthy();
  });

  it("renders title when provided", () => {
    const { getByText } = render(CodeSnippet, {
      props: { code: "test", title: "Example.svelte" },
    });
    expect(getByText("Example.svelte")).toBeTruthy();
  });

  it("has a copy button", () => {
    const { getByRole } = render(CodeSnippet, {
      props: { code: "test" },
    });
    expect(getByRole("button", { name: /copy/i })).toBeTruthy();
  });

  it("passes accessibility checks", async () => {
    const { container } = render(CodeSnippet, {
      props: { code: "const x = 1;" },
    });
    await expectNoAxeViolations(container);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `bun run test src/components/CodeSnippet.svelte.test.ts`
Expected: FAIL — component not found

- [ ] **Step 3: Write minimal implementation**

```svelte
<!-- src/components/CodeSnippet.svelte -->
<script lang="ts">
  import type { Snippet } from "svelte";
  import { useClipboard } from "../utils/useClipboard.svelte";

  interface Props {
    code: string;
    language?: string;
    title?: string;
    children?: Snippet;
  }

  let { code, language = "svelte", title, children }: Props = $props();
  const { copied, copy } = useClipboard();
</script>

<div class="rounded-[--radius-md] border border-border overflow-hidden">
  {#if title}
    <div class="flex items-center justify-between px-3 py-1.5 bg-muted border-b border-border">
      <span class="text-label-xs text-muted-foreground font-mono">{title}</span>
      <button
        type="button"
        onclick={() => copy(code)}
        class="text-label-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
      >
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  {/if}
  <pre class="p-4 bg-muted/50 overflow-x-auto text-body-sm font-mono"><code>{code}</code></pre>
  {#if !title}
    <div class="flex justify-end px-3 py-1.5 bg-muted border-t border-border">
      <button
        type="button"
        onclick={() => copy(code)}
        class="text-label-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
      >
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  {/if}
</div>
```

- [ ] **Step 4: Run test to verify it passes**

Run: `bun run test src/components/CodeSnippet.svelte.test.ts`
Expected: PASS

- [ ] **Step 5: Add export to index.ts**

In `src/index.ts`, add after the existing component exports:

```ts
export { default as CodeSnippet } from "./components/CodeSnippet.svelte";
```

- [ ] **Step 6: Commit**

```bash
git add src/components/CodeSnippet.svelte src/components/CodeSnippet.svelte.test.ts src/index.ts
git commit -m "feat: add CodeSnippet component with copy-to-clipboard"
```

---

### Task 9: Add Code Examples to Showcase Pages

**Files:**
- Modify: `examples/showcase/src/routes/app/+page.svelte`
- Modify: `examples/showcase/src/routes/dashboard/+page.svelte`
- Modify: `examples/showcase/src/routes/landing/+page.svelte`
- Modify: `examples/showcase/src/routes/components/forms/+page.svelte`
- Modify: `examples/showcase/src/routes/components/overlays/+page.svelte`
- Modify: `examples/showcase/src/routes/components/feedback/+page.svelte`
- Modify: `examples/showcase/src/routes/components/navigation/+page.svelte`
- Modify: `examples/showcase/src/routes/components/data-display/+page.svelte`
- Modify: `examples/showcase/src/routes/ecommerce/+page.svelte`
- Modify: `examples/showcase/src/routes/chat/+page.svelte`
- Modify: `examples/showcase/src/routes/calendar/+page.svelte`
- Modify: `examples/showcase/src/routes/media/+page.svelte`

- [ ] **Step 1: Read a target page to understand pattern**

Read `examples/showcase/src/routes/components/forms/+page.svelte`.

- [ ] **Step 2: Add CodeSnippet import and code example pattern**

For each demo section, add a collapsible code example. Pattern:

```svelte
<script lang="ts">
  import { CodeSnippet, Collapsible } from "bindrunes";
</script>

<!-- After each demo section -->
<Collapsible>
  {#snippet trigger()}
    <button class="text-label-sm text-primary hover:underline cursor-pointer">Show Code</button>
  {/snippet}
  <div class="space-y-2 mt-2">
    <CodeSnippet
      code={`import { Input, Form } from "bindrunes";\n\n<Input placeholder="Enter text" />`}
      language="svelte"
      title="Import & Usage"
    />
  </div>
</Collapsible>
```

- [ ] **Step 3: Add code examples to forms page**

Add 3-5 code snippets showing Input, Select, Checkbox usage patterns.

- [ ] **Step 4: Add code examples to remaining 11 pages**

For each page, add 2-4 relevant code snippets.

- [ ] **Step 5: Verify**

Run: `cd examples/showcase && bun run check`

- [ ] **Step 6: Commit**

```bash
git add examples/showcase/src/routes/
git commit -m "feat: add code examples with copy button to 12 showcase pages"
```

---

### Task 10: Create Interactive Playground

**Files:**
- Create: `examples/showcase/src/routes/playground/+page.svelte`
- Modify: `examples/showcase/src/routes/+layout.svelte` (add nav link)

- [ ] **Step 1: Create playground page**

```svelte
<!-- examples/showcase/src/routes/playground/+page.svelte -->
<script lang="ts">
  import { PageHeader, Card, Input, Select, Switch, Slider, Button, CodeSnippet } from "bindrunes";

  const components = [
    { name: "Button", props: { variant: { type: "select", options: ["primary", "secondary", "outline", "ghost", "destructive", "link", "soft", "subtle"], default: "primary" }, size: { type: "select", options: ["sm", "md", "lg"], default: "md" }, disabled: { type: "switch", default: false }, loading: { type: "switch", default: false } } },
    { name: "Badge", props: { variant: { type: "select", options: ["primary", "secondary", "outline", "soft", "destructive"], default: "primary" }, size: { type: "select", options: ["sm", "md", "lg"], default: "md" } } },
    { name: "Card", props: { variant: { type: "select", options: ["surface", "glass", "outlined", "ghost"], default: "surface" }, padding: { type: "switch", default: true } } },
    // ... more components
  ];

  let selectedComponent = $state("Button");
  let propValues = $state<Record<string, any>>({});

  const currentComponent = $derived(components.find(c => c.name === selectedComponent));

  // Initialize props when component changes
  $effect(() => {
    if (currentComponent) {
      const initial: Record<string, any> = {};
      for (const [key, prop] of Object.entries(currentComponent.props)) {
        initial[key] = prop.default;
      }
      propValues = initial;
    }
  });

  // Generate code string
  const generatedCode = $derived(() => {
    const props = Object.entries(propValues)
      .filter(([, v]) => v !== undefined && v !== "")
      .map(([k, v]) => `${k}={${typeof v === "boolean" ? v : JSON.stringify(v)}}`)
      .join(" ");
    return `import { ${selectedComponent} } from "bindrunes";\n\n<${selectedComponent} ${props}>Click me</${selectedComponent}>`;
  });
</script>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
  <PageHeader title="Playground" description="Tweak component props and see live results with generated code" />

  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <!-- Component Selector -->
    <div class="space-y-4">
      <h3 class="text-title-3 text-foreground">Component</h3>
      <Select
        value={selectedComponent}
        options={components.map(c => ({ label: c.name, value: c.name }))}
        onChange={(v) => selectedComponent = v}
      />

      <!-- Prop Controls -->
      {#if currentComponent}
        <div class="space-y-3">
          <h4 class="text-title-3 text-foreground">Props</h4>
          {#each Object.entries(currentComponent.props) as [key, prop]}
            <div class="space-y-1">
              <label class="text-label-sm text-muted-foreground">{key}</label>
              {#if prop.type === "select"}
                <Select
                  value={propValues[key]}
                  options={prop.options.map(o => ({ label: o, value: o }))}
                  onChange={(v) => propValues[key] = v}
                />
              {:else if prop.type === "switch"}
                <Switch checked={propValues[key]} onChange={(v) => propValues[key] = v} />
              {:else if prop.type === "text"}
                <Input value={propValues[key]} onInput={(v) => propValues[key] = v} />
              {/if}
            </div>
          {/each}
        </div>
      {/if}
    </div>

    <!-- Preview -->
    <div class="space-y-4">
      <h3 class="text-title-3 text-foreground">Preview</h3>
      <Card padding class="min-h-[200px] flex items-center justify-center">
        {#if selectedComponent === "Button"}
          <Button {...propValues}>Click me</Button>
        {:else if selectedComponent === "Badge"}
          <Badge {...propValues}>Label</Badge>
        {:else if selectedComponent === "Card"}
          <Card {...propValues}>Card content</Card>
        {/if}
      </Card>
    </div>

    <!-- Generated Code -->
    <div class="space-y-4">
      <h3 class="text-title-3 text-foreground">Generated Code</h3>
      <CodeSnippet code={generatedCode()} language="svelte" title="App.svelte" />
    </div>
  </div>
</div>
```

- [ ] **Step 2: Add playground to navigation**

In `examples/showcase/src/routes/+layout.svelte`, add to the nav array:

```ts
const nav = [
  // ... existing items
  { href: "/playground", label: "Playground" },
];
```

- [ ] **Step 3: Verify**

Run: `cd examples/showcase && bun run check`

- [ ] **Step 4: Commit**

```bash
git add examples/showcase/src/routes/playground/+page.svelte examples/showcase/src/routes/+layout.svelte
git commit -m "feat: add interactive playground with component selector, prop controls, and code generation"
```

---

## Phase 3 Tasks

### Task 11: Fix MemoryLayer Duplication

**Files:**
- Modify: `src/utils/agentic/createTokenBudget.svelte.ts`

- [ ] **Step 1: Read current file**

Read `src/utils/agentic/createTokenBudget.svelte.ts` to find the local `MemoryLayer` declaration.

- [ ] **Step 2: Replace local type with import**

Remove the local `MemoryLayer` type declaration and add:

```ts
import type { MemoryLayer } from "../../types/agent.js";
```

- [ ] **Step 3: Verify tests pass**

Run: `bun run test src/utils/agentic/`
Expected: All tests pass

- [ ] **Step 4: Commit**

```bash
git add src/utils/agentic/createTokenBudget.svelte.ts
git commit -m "fix: remove MemoryLayer duplication, import from agent.ts"
```

---

### Task 12: Add Svelte Context Wrappers for WindowStore

**Files:**
- Create: `src/utils/agentic/provideWindowStore.svelte.ts`
- Create: `src/utils/agentic/useWindowStore.svelte.ts`

- [ ] **Step 1: Create provideWindowStore**

```ts
// src/utils/agentic/provideWindowStore.svelte.ts
import { createMetaContext } from "../createMetaContext.svelte";
import { createWindowStore, type WindowStore, type WindowStoreOptions } from "./createWindowStore.svelte";

const WINDOW_STORE_KEY = Symbol("window-store");

export function provideWindowStore<TState>(
  options?: WindowStoreOptions<TState>
): WindowStore<TState> {
  return createMetaContext(WINDOW_STORE_KEY, () => createWindowStore(options));
}
```

- [ ] **Step 2: Create useWindowStore**

```ts
// src/utils/agentic/useWindowStore.svelte.ts
import { useMetaContext } from "../createMetaContext.svelte";
import type { WindowStore } from "./createWindowStore.svelte";

const WINDOW_STORE_KEY = Symbol("window-store");

export function useWindowStore<TState>(): WindowStore<TState> {
  return useMetaContext(WINDOW_STORE_KEY);
}
```

- [ ] **Step 3: Write tests**

```ts
// src/utils/agentic/provideWindowStore.test.ts
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/svelte";
import { provideWindowStore, useWindowStore } from "./provideWindowStore.svelte";

describe("provideWindowStore", () => {
  it("creates a window store", () => {
    const store = provideWindowStore({ budgetCap: 4096 });
    expect(store).toBeDefined();
    expect(store.windows).toBeDefined();
  });
});
```

- [ ] **Step 4: Run tests**

Run: `bun run test src/utils/agentic/provideWindowStore.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/utils/agentic/provideWindowStore.svelte.ts src/utils/agentic/useWindowStore.svelte.ts src/utils/agentic/provideWindowStore.test.ts
git commit -m "feat: add provideWindowStore/useWindowStore Svelte context wrappers"
```

---

### Task 13: Update Agentic Documentation

**Files:**
- Modify: `docs/agentic/overview.md`

- [ ] **Step 1: Read current docs**

Read `docs/agentic/overview.md`.

- [ ] **Step 2: Update with current architecture**

Update to include:
- Module inventory (WindowStore, TokenBudget, ConversationBranches, SimulatorRuntime)
- AgentRuntime contract reference
- New context wrappers (provideWindowStore, useWindowStore)
- Known gaps section (orchestrator, compaction strategies, persistence)

- [ ] **Step 3: Commit**

```bash
git add docs/agentic/overview.md
git commit -m "docs: update agentic overview with current architecture and context wrappers"
```

---

## Final Verification

- [ ] **Step 1: Run full lint**

Run: `bun run lint`
Expected: No errors

- [ ] **Step 2: Run type check**

Run: `bun run check`
Expected: No errors

- [ ] **Step 3: Run tests**

Run: `bun run test`
Expected: All tests pass

- [ ] **Step 4: Build library**

Run: `bun run build`
Expected: Build succeeds
