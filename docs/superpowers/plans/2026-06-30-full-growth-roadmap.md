# Full Growth Roadmap — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert bindrunes from invisible to adopted across 4 phases: visibility, quality, revenue, scale.

**Architecture:** Each phase is independently executable. Phase 1 deploys the existing playground and improves discovery. Phase 2 adds Storybook and visual testing. Phase 3 creates template showcases. Phase 4 stabilizes the kit and expands to multi-framework.

**Tech Stack:** Svelte 5, SvelteKit, Tailwind CSS v4, Vercel, Storybook 8, Vitest, Biome, Bun, Turborepo

---

## File Structure

### Phase 1: Visibility

| File | Purpose |
|------|---------|
| `.github/workflows/vercel.yml` | Vercel preview/production deployments |
| `vercel.json` | Vercel project config at monorepo root |
| `docs-site/src/routes/playground/+page.svelte` | **Already exists** — embed the Playground component |
| `docs-site/src/routes/docs/playground/+page.svelte` | **Already exists** — 28 components registered |
| `packages/bindrunes/src/playground/component-registry.ts` | Expand from 28 to all 84 primitives |
| `README.md` | Rewrite with comparison table, badges, playground link |
| `docs/agentic/build-a-copilot.md` | New tutorial |
| `docs/agentic/api-reference.md` | New API reference |

### Phase 2: Quality

| File | Purpose |
|------|---------|
| `.storybook/main.ts` | Storybook 8 config |
| `.storybook/preview.ts` | Theme/aesthetic/density decorators |
| `packages/bindrunes/src/primitives/*.stories.ts` | Stories for 84 primitives |
| `.github/workflows/chromatic.yml` | Visual regression CI (REMOVED — going solo) |
| `chromatic.config.json` | Chromatic config (REMOVED — going solo) |
| `docs/accessibility.md` | Accessibility audit results |
| `docs/VPAT-2.4.md` | VPAT document |

### Phase 3: Revenue

| File | Purpose |
|------|---------|
| `templates/saas-dashboard/` | SaaS dashboard template |
| `templates/ai-chatbot/` | AI chatbot template |
| `templates/ecommerce-storefront/` | E-commerce template |
| `templates/marketing-site/` | Marketing site template |
| `templates/crud-admin/` | CRUD admin template |
| `docs/figma-link.md` | Figma design system link |
| `docs/migration/from-bootstrap.md` | Bootstrap migration guide |
| `docs/migration/from-ant-design.md` | Ant Design migration guide |
| `docs/migration/from-material-ui.md` | Material UI migration guide |

### Phase 4: Scale

| File | Purpose |
|------|---------|
| `packages/bindrunes-kit/src/adapters/aws.ts` | AWS adapter |
| `packages/bindrunes-kit/src/adapters/gcp.ts` | GCP adapter |
| `packages/bindrunes-kit/src/server/db-drizzle.ts` | Drizzle adapter |
| `packages/bindrunes-kit/src/server/db-prisma.ts` | Prisma adapter |
| `packages/bindrunes-kit/src/server/auth-passkey.ts` | Passkey auth |
| `packages/bindrunes-kit/src/server/auth-magic-link.ts` | Magic link auth |
| `packages/bindrunes-kit/src/server/rate-limit-redis.ts` | Redis rate limiter |
| `packages/tokens/` | Framework-agnostic CSS tokens |
| `packages/tokens-react/` | React token provider |
| `packages/tokens-vue/` | Vue token plugin |
| `docs/enterprise.md` | Enterprise features page |

---

## Phase 1: Visibility

### Task 1: Vercel Deployment Setup

**Files:**
- Create: `.github/workflows/vercel.yml`
- Create: `vercel.json`

**Note:** Requires `VERCEL_TOKEN` from user. Block until provided.

- [ ] **Step 1: Ask user for Vercel token**

If not already provided, ask: "I need a Vercel token to set up deployments. You can generate one at https://vercel.com/account/tokens. Please paste it here."

- [ ] **Step 2: Create vercel.json at monorepo root**

```json
{
  "buildCommand": "turbo run build --filter=bindrunes-docs",
  "outputDirectory": "docs-site/.svelte-kit/output",
  "installCommand": "bun install",
  "framework": "sveltekit",
  "rootDirectory": "docs-site"
}
```

- [ ] **Step 3: Create GitHub Action for Vercel**

```yaml
# .github/workflows/vercel.yml
name: Vercel

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

concurrency:
  group: vercel-${{ github.ref }}
  cancel-in-progress: true

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: oven-sh/setup-bun@v2
        with:
          bun-version: 1.3.14
          cache: true

      - name: Install dependencies
        run: bun install --frozen-lockfile

      - name: Build bindrunes
        run: bun run build --filter=bindrunes

      - name: Deploy to Vercel (Preview)
        if: github.event_name == 'pull_request'
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          working-directory: docs-site

      - name: Deploy to Vercel (Production)
        if: github.event_name == 'push' && github.ref == 'refs/heads/main'
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
          working-directory: docs-site
```

- [ ] **Step 4: Add secrets to GitHub repo**

 instruct user to add `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` to repo secrets.

- [ ] **Step 5: Create Vercel project and link**

```bash
cd docs-site && npx vercel link
```

Follow prompts to create/link project. This generates `.vercel/project.json`.

- [ ] **Step 6: Commit**

```bash
git add vercel.json .github/workflows/vercel.yml docs-site/.vercel/
git commit -m "chore: add Vercel deployment config"
```

- [ ] **Step 7: Push and verify preview deploy**

```bash
git push
```

Verify GitHub Action runs and produces a preview URL.

---

### Task 2: Expand Playground Component Registry

**Files:**
- Modify: `packages/bindrunes/src/playground/component-registry.ts`

The playground currently registers 28 components. Expand to cover all 84 primitives.

- [ ] **Step 1: Add remaining Foundation components**

Add to `componentRegistry` array in `component-registry.ts`:

```typescript
// Add after existing Foundation entries
{
	name: "CodeSnippet",
	category: "Foundation",
	description: "Syntax-highlighted code block",
	importPath: "bindrunes",
	props: {
		code: { type: "text", default: "console.log('hello')", label: "Code" },
		language: { type: "text", default: "javascript", label: "Language" },
	},
},
{
	name: "Collapsible",
	category: "Foundation",
	description: "Toggleable content section",
	importPath: "bindrunes",
	props: {},
	slot: "Collapsible content",
},
{
	name: "ColorPicker",
	category: "Foundation",
	description: "Color selection widget",
	importPath: "bindrunes",
	props: {
		value: { type: "color", default: "#3b82f6", label: "Color" },
	},
},
{
	name: "Combobox",
	category: "Foundation",
	description: "Searchable select dropdown",
	importPath: "bindrunes",
	props: {
		placeholder: { type: "text", default: "Search...", label: "Placeholder" },
	},
},
{
	name: "CommandPalette",
	category: "Foundation",
	description: "Cmd+K command palette",
	importPath: "bindrunes",
	props: {},
},
{
	name: "ContextMenu",
	category: "Foundation",
	description: "Right-click context menu",
	importPath: "bindrunes",
	props: {},
	slot: "Right-click me",
},
{
	name: "DatePicker",
	category: "Foundation",
	description: "Date selection input",
	importPath: "bindrunes",
	props: {
		placeholder: { type: "text", default: "Pick a date", label: "Placeholder" },
	},
},
{
	name: "DropdownMenu",
	category: "Foundation",
	description: "Click-triggered dropdown menu",
	importPath: "bindrunes",
	props: {},
	slot: "Open menu",
},
{
	name: "Kbd",
	category: "Foundation",
	description: "Keyboard shortcut indicator",
	importPath: "bindrunes",
	props: {},
	slot: "Ctrl+K",
},
{
	name: "Label",
	category: "Foundation",
	description: "Form field label",
	importPath: "bindrunes",
	props: {
		text: { type: "text", default: "Email", label: "Label text" },
	},
},
{
	name: "MetricCard",
	category: "Foundation",
	description: "KPI/metric display card",
	importPath: "bindrunes",
	props: {
		label: { type: "text", default: "Revenue", label: "Label" },
		value: { type: "text", default: "$12,345", label: "Value" },
	},
},
{
	name: "NumberInput",
	category: "Foundation",
	description: "Numeric input with stepper",
	importPath: "bindrunes",
	props: {
		min: { type: "number", default: 0, label: "Min" },
		max: { type: "number", default: 100, label: "Max" },
		step: { type: "number", default: 1, label: "Step" },
	},
},
{
	name: "Omnibar",
	category: "Foundation",
	description: "Global search/command bar",
	importPath: "bindrunes",
	props: {},
},
{
	name: "OTPInput",
	category: "Foundation",
	description: "One-time password input",
	importPath: "bindrunes",
	props: {
		length: { type: "number", default: 6, label: "Length" },
	},
},
{
	name: "PasswordInput",
	category: "Foundation",
	description: "Password input with toggle",
	importPath: "bindrunes",
	props: {
		placeholder: { type: "text", default: "Enter password", label: "Placeholder" },
	},
},
{
	name: "PinInput",
	category: "Foundation",
	description: "PIN code entry",
	importPath: "bindrunes",
	props: {
		length: { type: "number", default: 4, label: "Length" },
	},
},
{
	name: "Popover",
	category: "Foundation",
	description: "Floating popover content",
	importPath: "bindrunes",
	props: {},
	slot: "Toggle popover",
},
{
	name: "Popconfirm",
	category: "Foundation",
	description: "Popover confirmation dialog",
	importPath: "bindrunes",
	props: {
		title: { type: "text", default: "Are you sure?", label: "Title" },
	},
	slot: "Delete item",
},
{
	name: "RadioGroup",
	category: "Foundation",
	description: "Radio button group",
	importPath: "bindrunes",
	props: {},
},
{
	name: "RatingGroup",
	category: "Foundation",
	description: "Star/emoji rating input",
	importPath: "bindrunes",
	props: {
		max: { type: "number", default: 5, label: "Max rating" },
	},
},
{
	name: "RichTextEditor",
	category: "Foundation",
	description: "WYSIWYG rich text editor",
	importPath: "bindrunes",
	props: {},
},
{
	name: "ScrollArea",
	category: "Foundation",
	description: "Custom scrollbar container",
	importPath: "bindrunes",
	props: {},
},
{
	name: "Sheet",
	category: "Foundation",
	description: "Slide-in side sheet",
	importPath: "bindrunes",
	props: {
		side: { type: "select", options: ["left", "right", "top", "bottom"], default: "right", label: "Side" },
	},
	slot: "Sheet content",
},
{
	name: "StatusChip",
	category: "Foundation",
	description: "Status indicator chip",
	importPath: "bindrunes",
	props: {
		variant: { type: "select", options: ["active", "inactive", "pending"], default: "active", label: "Status" },
	},
},
{
	name: "SwipeableList",
	category: "Foundation",
	description: "Swipeable list container",
	importPath: "bindrunes",
	props: {},
},
{
	name: "TagInput",
	category: "Foundation",
	description: "Multi-tag text input",
	importPath: "bindrunes",
	props: {
		placeholder: { type: "text", default: "Add tag...", label: "Placeholder" },
	},
},
{
	name: "Textarea",
	category: "Foundation",
	description: "Multi-line text input",
	importPath: "bindrunes",
	props: {
		placeholder: { type: "text", default: "Enter text...", label: "Placeholder" },
		rows: { type: "number", default: 4, label: "Rows" },
	},
},
{
	name: "TimeField",
	category: "Foundation",
	description: "Time input field",
	importPath: "bindrunes",
	props: {
		placeholder: { type: "text", default: "HH:mm", label: "Placeholder" },
	},
},
{
	name: "Timeline",
	category: "Foundation",
	description: "Chronological timeline display",
	importPath: "bindrunes",
	props: {},
},
{
	name: "Toggle",
	category: "Foundation",
	description: "Toggle button",
	importPath: "bindrunes",
	props: {},
	slot: "Toggle",
},
{
	name: "ToggleGroup",
	category: "Foundation",
	description: "Group of toggle buttons",
	importPath: "bindrunes",
	props: {},
},
{
	name: "TreeView",
	category: "Foundation",
	description: "Hierarchical tree navigation",
	importPath: "bindrunes",
	props: {},
},
{
	name: "AlertDialog",
	category: "Foundation",
	description: "Confirmation/destructive action dialog",
	importPath: "bindrunes",
	props: {
		title: { type: "text", default: "Confirm action", label: "Title" },
	},
	slot: "Are you sure you want to proceed?",
},
{
	name: "ErrorBanner",
	category: "Foundation",
	description: "Error notification banner",
	importPath: "bindrunes",
	props: {
		title: { type: "text", default: "Error occurred", label: "Title" },
	},
	slot: "Something went wrong.",
},
{
	name: "SuccessBanner",
	category: "Foundation",
	description: "Success notification banner",
	importPath: "bindrunes",
	props: {
		title: { type: "text", default: "Success!", label: "Title" },
	},
	slot: "Operation completed successfully.",
},
{
	name: "FileUpload",
	category: "Foundation",
	description: "File upload dropzone",
	importPath: "bindrunes",
	props: {},
},
{
	name: "NavigationMenu",
	category: "Foundation",
	description: "Top-level navigation menu",
	importPath: "bindrunes",
	props: {},
},
{
	name: "RangeCalendar",
	category: "Foundation",
	description: "Date range calendar picker",
	importPath: "bindrunes",
	props: {},
},
{
	name: "BouncingDots",
	category: "Foundation",
	description: "Loading/typing indicator dots",
	importPath: "bindrunes",
	props: {},
},
{
	name: "RuleFootnote",
	category: "Foundation",
	description: "Rule/compliance footnote",
	importPath: "bindrunes",
	props: {},
},
```

- [ ] **Step 2: Update preview snippet in playground page**

In `docs-site/src/routes/docs/playground/+page.svelte`, add preview cases for the new components. For simple ones, use a generic fallback:

```svelte
{:else if definition.name === "CodeSnippet"}
  <div class="w-full">
    <CodeSnippet code={props.code} language={props.language} />
  </div>
{:else if definition.name === "Collapsible"}
  <div class="w-full">
    <Collapsible>
      <Button variant="outline">Toggle</Button>
      {#snippet children()}
        <p class="text-body-sm text-muted-foreground p-4">{definition.slot}</p>
      {/snippet}
    </Collapsible>
  </div>
<!-- ... add cases for each new component ... -->
```

For components that need specific imports, add them to the import block at the top of the file.

- [ ] **Step 3: Build and verify**

```bash
cd packages/bindrunes && bun run build
cd ../.. && turbo run build --filter=bindrunes-docs
```

Expected: Build succeeds with no errors.

- [ ] **Step 4: Commit**

```bash
git add packages/bindrunes/src/playground/component-registry.ts docs-site/src/routes/docs/playground/+page.svelte
git commit -m "feat: expand playground to cover all 84 primitives"
```

---

### Task 3: README Overhaul

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Rewrite README**

Replace the full content of `README.md` with:

```markdown
# bindrunes

[![CI](https://github.com/aleconstancio/bindrunes/actions/workflows/ci.yml/badge.svg)](https://github.com/aleconstancio/bindrunes/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/bindrunes)](https://www.npmjs.com/package/bindrunes)
[![license](https://img.shields.io/npm/l/bindrunes)](https://github.com/aleconstancio/bindrunes/blob/main/LICENSE)
[![bundle size](https://img.shields.io/bundlephobia/minzip/bindrunes)](https://bundlephobia.com/package/bindrunes)

**Svelte 5 component library for B2B SaaS.** 270+ components, 60+ composables, server-first rendering, responsive hybrid design, and an agentic copilot kernel.

[Try it live →](https://bindrunes.dev/playground)

## Quick Start

\```bash
bun add bindrunes svelte tailwindcss lucide-svelte svelte-sonner
\```

\```css
/* app.css */
@import "tailwindcss";
@plugin "bindrunes/tailwind";
@import "bindrunes/styles/global.css";
\```

\```svelte
<!-- +layout.svelte -->
<script lang="ts">
  import "../app.css";
  import { ThemeProvider } from "bindrunes";
  let { children } = $props();
</script>

<ThemeProvider themeDefault="editorial" densityDefault="comfortable">
  {@render children()}
</ThemeProvider>
\```

\```svelte
<!-- +page.svelte -->
<script lang="ts">
  import { Button, Card } from "bindrunes";
</script>

<Card variant="glass" responsive>
  <h2>Welcome</h2>
  <Button variant="primary">Get Started</Button>
</Card>
\```

## Why bindrunes?

| Feature | bindrunes | shadcn-svelte | Skeleton | Melt UI |
|---------|-----------|---------------|----------|---------|
| Svelte 5 runes | ✅ | ✅ | ✅ | ✅ |
| B2B domain components | ✅ (10 categories) | ❌ | ❌ | ❌ |
| Agentic copilot UI | ✅ | ❌ | ❌ | ❌ |
| SSR-first | ✅ | Partial | Partial | ❌ |
| Three-axis design system | ✅ (126 combos) | ❌ | ❌ | ❌ |
| SvelteKit meta-framework | ✅ | ❌ | ❌ | ❌ |
| OKLCH theming | ✅ | ❌ | Partial | ❌ |
| 7 aesthetics | ✅ | ❌ | ❌ | ❌ |
| Valibot validation | ✅ | ❌ | ❌ | ❌ |
| Tree-shakeable | ✅ | ✅ | ✅ | ✅ |

## Design System

Three orthogonal axes, 126 visual combinations:

- **Theme** — 6 color themes: editorial, dracula, nord, catppuccin, rose-pine, github
- **Aesthetic** — 7 form styles: minimal, glass, bento, expressive, neon, brutalist, organic
- **Density** — 3 spacing scales: compact, comfortable, spacious

Any combination works. Colors never bleed into form. Form never touches spacing.

## Domain Components

10 pre-built domain categories:

- **Auth** — LoginForm, RegisterForm, ForgotPassword, TwoFactorAuth, SocialLogin
- **Data** — AdvancedTable, CrudListPage, CrudForm, FacetedSearch, WizardForm
- **Landing** — HeroBanner, FeatureGrid, PricingTable, Testimonial, FAQ
- **Chat** — ChatThread, ChatInput, ConversationList, AgentChatPage
- **Agentic** — CopilotMessageList, CopilotInput, CopilotToolPanel, CopilotStreamIndicator
- **E-commerce** — ProductCard, Cart, Checkout, OrderSummary
- **Calendar** — EventCalendar, Scheduler, BookingForm
- **Dashboard** — DashboardHome, StatsOverview, ActivityFeed
- **Marketing** — BlogArticle, ChangelogPage, CookieConsent
- **Settings** — ProfileSettings, SecuritySettings, NotificationSettings

## Agentic Copilot Kernel

Build LLM chat interfaces with built-in token budget management, conversation branching, and persistence:

\```ts
import { CopilotMessageList, CopilotInput } from "bindrunes/domains/agentic";
\```

[Read the tutorial →](https://bindrunes.dev/docs/agentic/build-a-copilot)

## Server-First

All components are SSR-safe. Server utilities work outside SvelteKit:

\```ts
import { createServerTheme, useThemeServer } from "bindrunes/server";
\```

## Export Paths

| Path | What |
|------|------|
| `bindrunes` | Primitives, composables, utilities, types |
| `bindrunes/server` | SSR-safe utilities |
| `bindrunes/responsive` | Viewport, gesture, haptic, motion |
| `bindrunes/data` | useQuery, useMutation, useTable |
| `bindrunes/forms` | useForm, useWizard |
| `bindrunes/auth` | useAuth, useAccess |
| `bindrunes/domains/<name>` | Domain components |
| `bindrunes/layouts` | Layouts + templates |
| `bindrunes/agentic` | Agentic copilot kernel |
| `bindrunes/tailwind` | Tailwind CSS v4 plugin |

## Documentation

| Guide | Description |
|-------|-------------|
| [Getting Started](docs/getting-started.md) | Install, setup, first component |
| [Components](docs/components.md) | Component reference |
| [Composables](docs/composables.md) | Reactivity, data, forms, auth |
| [Design System](docs/design-system.md) | Themes, aesthetics, density |
| [Architecture](docs/architecture.md) | 4-layer hierarchy |
| [Agentic](docs/agentic/overview.md) | LLM chat kernel |
| [Security](docs/security.md) | Token storage, CSRF, XSS |
| [bindrunes-kit](docs/kit/) | SvelteKit meta-framework |
| [Playground](https://bindrunes.dev/playground) | Interactive component explorer |

## Development

\```bash
bun install           # Dependencies
bun run dev           # Watch mode
bun run build         # Build library
bun run test          # Run tests
bun run lint          # Lint check
\```

## License

MIT
```

- [ ] **Step 2: Commit**

```bash
git add README.md
git commit -m "docs: rewrite README with comparison table and playground link"
```

---

### Task 4: Agentic Public API Documentation

**Files:**
- Create: `docs/agentic/build-a-copilot.md`
- Create: `docs/agentic/api-reference.md`
- Modify: `docs/agentic/overview.md` (minor updates)

- [ ] **Step 1: Write "Build a Copilot" tutorial**

Create `docs/agentic/build-a-copilot.md`:

```markdown
# Build a Copilot in 5 Minutes

This tutorial walks you through building an LLM chat interface using bindrunes' agentic copilot components.

## Prerequisites

\```bash
bun add bindrunes svelte lucide-svelte
\```

## Step 1: Set Up the Provider

Wrap your chat page with the window store provider:

\```svelte
<script lang="ts">
  import { createWindowStoreProvider } from "bindrunes";
  import { CopilotMessageList, CopilotInput, CopilotStreamIndicator } from "bindrunes/domains/agentic";

  const store = createWindowStoreProvider({ budgetCap: 8192 });

  let messages = $state([]);
  let isStreaming = $state(false);

  async function handleSend(text: string) {
    messages.push({ role: "user", content: text });
    isStreaming = true;

    // Replace with your LLM API call
    const response = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ messages }),
    });

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let assistantMessage = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      assistantMessage += decoder.decode(value);
      // Update last message reactively
      messages[messages.length - 1] = { role: "assistant", content: assistantMessage };
    }

    isStreaming = false;
  }
</script>

<div class="flex flex-col h-screen">
  <CopilotMessageList {messages} />
  {#if isStreaming}
    <CopilotStreamIndicator />
  {/if}
  <CopilotInput onSend={handleSend} />
</div>
\```

## Step 2: Add Tool Calling (Optional)

If your LLM supports tool calling, use the tool panel:

\```svelte
<script lang="ts">
  import { CopilotToolPanel } from "bindrunes/domains/agentic";

  let toolCalls = $state([]);
</script>

{#if toolCalls.length > 0}
  <CopilotToolPanel calls={toolCalls} />
{/if}
\```

## Step 3: Add Context Sidebar (Optional)

Show token usage and conversation context:

\```svelte
<script lang="ts">
  import { CopilotContextSidebar } from "bindrunes/domains/agentic";
</script>

<CopilotContextSidebar {store} />
\```

## Full Example

See the [Showcase example](https://github.com/aleconstancio/bindrunes/tree/main/examples/showcase) for a complete working implementation.

## Next Steps

- Read the [API Reference](./api-reference.md) for all available types and composables
- Explore the [Window Store](./overview.md#window-store) for conversation branching
- Set up [Token Budgets](./overview.md#token-budget) for memory management
```

- [ ] **Step 2: Write API reference**

Create `docs/agentic/api-reference.md`:

```markdown
# Agentic API Reference

## Types

### Window

\```ts
interface Window {
  id: WindowId;
  parentId: WindowId | null;
  turns: Turn[];
  tokenBudget: TokenBudget;
}
\```

### Turn

\```ts
interface Turn {
  role: "user" | "assistant" | "system" | "tool";
  content: string;
  toolCalls?: ToolCall[];
  toolResults?: ToolResult[];
}
\```

### AgentRuntime

\```ts
interface AgentRuntime {
  readonly tools: ReadonlyArray<ToolSpec>;
  complete(req: CompletionRequest, signal: AbortSignal): AsyncIterable<Delta>;
  embed?(input: string, signal: AbortSignal): Promise<Float32Array>;
}
\```

### Delta

\```ts
type Delta =
  | { kind: "text"; content: string }
  | { kind: "tool_call"; name: string; args: unknown }
  | { kind: "tool_result"; name: string; result: unknown }
  | { kind: "done" }
  | { kind: "error"; message: string };
\```

## Composables

### createWindowStore

\```ts
function createWindowStore(options?: { budgetCap?: number }): WindowStore;
\```

Creates a reactive context window manager. Holds a graph of Window objects and tracks the active window.

**Returns:**
- `current` — Current window state
- `createRoot()` — Create root window
- `fork(parentId)` — Fork a branch
- `navigate(windowId)` — Switch active window
- `appendTurn(turn)` — Add turn to active window
- `compact(windowId)` — Compact a window's turns
- `remove(windowId)` — Remove a window

### createTokenBudget

\```ts
function createTokenBudget(cap: number): TokenBudget;
\```

Tracks token usage across three layers: working, episodic, semantic.

**Returns:**
- `record(tokens, layer)` — Record token usage
- `reset()` — Reset all layers
- `remaining` — Computed remaining tokens
- `overflow` — Computed overflow status

### createConversationBranches

\```ts
function createConversationBranches(windows: Window[], rootId: WindowId): BranchTree;
\```

Derives a branch tree from a flat list of windows.

**Returns:**
- `leaves` — Leaf windows
- `paths` — All paths from root to leaves
- `siblings(windowId)` — Sibling windows

### createOrchestrator

\```ts
function createOrchestrator(runtime: AgentRuntime): Orchestrator;
\```

Coordinates multi-turn agent loops with tool calling.

**Returns:**
- `run(prompt, signal)` — Run agent loop
- `abort()` — Abort current run

## Context Wrappers

### createWindowStoreProvider

\```ts
function createWindowStoreProvider(options?: { budgetCap?: number }): WindowStore;
\```

Creates a WindowStore and sets it into Svelte context.

### useWindowStore

\```ts
function useWindowStore(): WindowStore;
\```

Retrieves the WindowStore from Svelte context. Throws if no provider is mounted.

## Copilot Components

### CopilotMessageList

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `messages` | `CopilotMessage[]` | `[]` | Array of messages |
| `showTimestamps` | `boolean` | `false` | Show message timestamps |

### CopilotInput

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onSend` | `(text: string) => void` | — | Send handler |
| `disabled` | `boolean` | `false` | Disable input |
| `placeholder` | `string` | `"Type a message..."` | Placeholder text |

### CopilotStreamIndicator

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | `"Thinking..."` | Loading label |

### CopilotToolPanel

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `calls` | `CopilotToolCall[]` | `[]` | Tool calls to display |

### CopilotContextSidebar

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `store` | `WindowStore` | — | Window store instance |
| `showTokenUsage` | `boolean` | `true` | Show token budget |

### CopilotChainProgress

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `steps` | `ChainStep[]` | `[]` | Chain steps |
| `currentStep` | `number` | `0` | Current step index |

### CopilotSuggestionCard

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `suggestion` | `string` | — | Suggestion text |
| `onSelect` | `(text: string) => void` | — | Selection handler |
```

- [ ] **Step 3: Update overview.md**

In `docs/agentic/overview.md`, add a note at the top:

```markdown
> **New to agentic?** Start with the [Build a Copilot in 5 Minutes](./build-a-copilot.md) tutorial.
```

- [ ] **Step 4: Add to docs navigation**

In `docs-site/src/lib/navigation.ts`, add to `docsNav`:

```typescript
{
    label: "Agentic",
    href: "/docs/agentic",
    items: [
        { label: "Overview", href: "/docs/agentic/overview" },
        { label: "Build a Copilot", href: "/docs/agentic/build-a-copilot" },
        { label: "API Reference", href: "/docs/agentic/api-reference" },
    ],
},
```

- [ ] **Step 5: Commit**

```bash
git add docs/agentic/build-a-copilot.md docs/agentic/api-reference.md docs/agentic/overview.md docs-site/src/lib/navigation.ts
git commit -m "docs: add public agentic API reference and copilot tutorial"
```

---

## Phase 2: Quality

### Task 5: Storybook Setup

**Files:**
- Create: `.storybook/main.ts`
- Create: `.storybook/preview.ts`
- Create: `packages/bindrunes/src/primitives/Button.stories.ts` (example)
- Modify: `packages/bindrunes/package.json` (add storybook scripts)

- [ ] **Step 1: Install Storybook**

```bash
cd packages/bindrunes
bun add -d @storybook/svelte @storybook/svelte-vite @storybook/addon-essentials @storybook/addon-a11y @storybook/addon-themes @storybook/addon-viewport storybook
```

- [ ] **Step 2: Create .storybook/main.ts**

```typescript
import type { StorybookConfig } from "@storybook/svelte-vite";

const config: StorybookConfig = {
	stories: ["../src/**/*.stories.@(js|ts|svelte)"],
	addons: [
		"@storybook/addon-essentials",
		"@storybook/addon-a11y",
		"@storybook/addon-themes",
		"@storybook/addon-viewport",
	],
	framework: {
		name: "@storybook/svelte-vite",
		options: {},
	},
	svelteOptions: {
		preprocess: [],
	},
};

export default config;
```

- [ ] **Step 3: Create .storybook/preview.ts**

```typescript
import type { Preview } from "@storybook/svelte";
import "../src/styles/global.css";

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		a11y: {
			config: {},
			options: {
				checks: { "color-contrast": { options: { threshold: 0.2 } } },
				rules: [],
			},
		},
	},
	decorators: [
		(story) => {
			return {
				Component: story,
				props: {},
			};
		},
	],
};

export default preview;
```

- [ ] **Step 4: Create Button.stories.ts as template**

```typescript
import type { Meta, StoryObj } from "@storybook/svelte";
import Button from "./Button.svelte";

const meta: Meta<typeof Button> = {
	title: "Primitives/Button",
	component: Button,
	tags: ["autodocs"],
	argTypes: {
		variant: {
			control: "select",
			options: ["primary", "secondary", "outline", "ghost", "destructive", "link", "soft", "subtle"],
		},
		size: { control: "select", options: ["sm", "md", "lg"] },
		disabled: { control: "boolean" },
		loading: { control: "boolean" },
		fullWidth: { control: "boolean" },
		iconOnly: { control: "boolean" },
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		variant: "primary",
		children: "Primary",
	},
};

export const Secondary: Story = {
	args: {
		variant: "secondary",
		children: "Secondary",
	},
};

export const Outline: Story = {
	args: {
		variant: "outline",
		children: "Outline",
	},
};

export const Ghost: Story = {
	args: {
		variant: "ghost",
		children: "Ghost",
	},
};

export const Destructive: Story = {
	args: {
		variant: "destructive",
		children: "Delete",
	},
};

export const Loading: Story = {
	args: {
		variant: "primary",
		loading: true,
		children: "Loading...",
	},
};

export const Small: Story = {
	args: {
		variant: "primary",
		size: "sm",
		children: "Small",
	},
};

export const Large: Story = {
	args: {
		variant: "primary",
		size: "lg",
		children: "Large",
	},
};

export const FullWidth: Story = {
	args: {
		variant: "primary",
		fullWidth: true,
		children: "Full Width Button",
	},
};
```

- [ ] **Step 5: Add storybook scripts to package.json**

Add to `packages/bindrunes/package.json` scripts:

```json
"storybook": "storybook dev -p 6006",
"build-storybook": "storybook build"
```

- [ ] **Step 6: Verify Storybook launches**

```bash
cd packages/bindrunes && bun run storybook
```

Expected: Storybook opens at http://localhost:6006 with Button story visible.

- [ ] **Step 7: Create stories for remaining primitives**

Create stories for all 84 primitives. Each story follows the Button.stories.ts pattern with appropriate argTypes. Use a subagent for this batch task.

- [ ] **Step 8: Commit**

```bash
git add .storybook/ packages/bindrunes/src/primitives/*.stories.ts packages/bindrunes/package.json
git commit -m "feat: add Storybook 8 with stories for all primitives"
```

---

### Task 7: Accessibility Audit & VPAT

**Files:**
- Create: `docs/accessibility.md`
- Create: `docs/VPAT-2.4.md`

- [ ] **Step 1: Run axe-core scan via Storybook**

With Storybook running, use the a11y addon to scan each component. Document findings.

- [ ] **Step 2: Write accessibility.md**

Create `docs/accessibility.md` with:
- WCAG 2.1 AA compliance status
- Component-by-component audit results
- Known issues and workarounds
- Keyboard navigation support

- [ ] **Step 3: Write VPAT 2.4**

Create `docs/VPAT-2.4.md` with standard VPAT template covering:
- WCAG 2.1 Level A
- WCAG 2.1 Level AA
- Revised Section 508

- [ ] **Step 4: Add to docs navigation**

In `docs-site/src/lib/navigation.ts`, add:

```typescript
{ label: "Accessibility", href: "/docs/accessibility" },
```

- [ ] **Step 5: Commit**

```bash
git add docs/accessibility.md docs/VPAT-2.4.md docs-site/src/lib/navigation.ts
git commit -m "docs: add accessibility audit and VPAT 2.4"
```

---

## Phase 3: Revenue

**Note on Figma:** The Figma design system (spec 3.2) is manual design work outside code automation. After templates ship, create a Figma file manually and add `docs/figma-link.md` with the public link.

### Task 8: Template Scaffolding (5 Templates)

**Files:**
- Create: `templates/saas-dashboard/` (full SvelteKit app)
- Create: `templates/ai-chatbot/`
- Create: `templates/ecommerce-storefront/`
- Create: `templates/marketing-site/`
- Create: `templates/crud-admin/`
- Modify: `package.json` (add `templates/*` to workspaces)

Each template is a standalone SvelteKit app. Use existing `examples/` as base.

- [ ] **Step 1: Add templates workspace**

Add `"templates/*"` to `package.json` workspaces array.

- [ ] **Step 2: Scaffold SaaS Dashboard template**

```bash
mkdir -p templates/saas-dashboard
cd templates/saas-dashboard
bun init -y
bun add bindrunes bindrunes-kit svelte lucide-svelte svelte-sonner
```

Create the full SvelteKit app structure with:
- Auth routes (login, signup)
- Dashboard with stats, activity feed
- Settings page with tabs
- Sidebar navigation
- Responsive design
- Theme support

- [ ] **Step 3: Scaffold AI Chatbot template**

Same pattern, focused on:
- Chat interface with CopilotMessageList, CopilotInput
- Conversation list sidebar
- Streaming indicator
- Tool call display

- [ ] **Step 4: Scaffold remaining templates**

- E-commerce: Product grid, cart, checkout
- Marketing: Hero, features, pricing, FAQ
- CRUD: List page, detail drawer, form modal

- [ ] **Step 5: Add template build tasks to turbo.json**

```json
"build": {
  "dependsOn": ["^build"],
  "outputs": [".svelte-kit/output", "dist/**"]
}
```

- [ ] **Step 6: Verify all templates build**

```bash
turbo run build --filter='./templates/*'
```

- [ ] **Step 7: Commit**

```bash
git add templates/ package.json turbo.json
git commit -m "feat: add 5 starter templates (dashboard, chatbot, ecommerce, marketing, crud)"
```

---

### Task 9: Migration Guide Expansion

**Files:**
- Create: `docs/migration/from-bootstrap.md`
- Create: `docs/migration/from-ant-design.md`
- Create: `docs/migration/from-material-ui.md`
- Modify: `docs-site/src/lib/navigation.ts`

- [ ] **Step 1: Write Bootstrap migration guide**

Component mapping table, token translation, code examples.

- [ ] **Step 2: Write Ant Design migration guide**

Same structure, focused on enterprise component patterns.

- [ ] **Step 3: Write Material UI migration guide**

Same structure, focused on design token mapping.

- [ ] **Step 4: Update navigation**

Add to `migrationNav` in `navigation.ts`.

- [ ] **Step 5: Commit**

```bash
git add docs/migration/ docs-site/src/lib/navigation.ts
git commit -m "docs: add migration guides for Bootstrap, Ant Design, Material UI"
```

---

## Phase 4: Scale

### Task 10: Kit v1.0 — New Adapters

**Files:**
- Create: `packages/bindrunes-kit/src/adapters/aws.ts`
- Create: `packages/bindrunes-kit/src/adapters/gcp.ts`

- [ ] **Step 1: Create AWS adapter**

Follow existing adapter pattern (cloudflare.ts, vercel.ts).

```typescript
export function awsConfig(options?: { region?: string; runtime?: string }) {
	return {
		adapter: "@sveltejs/adapter-node",
		config: {
			region: options?.region ?? "us-east-1",
			runtime: options?.runtime ?? "nodejs20.x",
		},
	};
}
```

- [ ] **Step 2: Create GCP adapter**

```typescript
export function gcpConfig(options?: { region?: string; runtime?: string }) {
	return {
		adapter: "@sveltejs/adapter-node",
		config: {
			region: options?.region ?? "us-central1",
			runtime: options?.runtime ?? "nodejs20",
		},
	};
}
```

- [ ] **Step 3: Write tests**

Follow existing adapter test patterns.

- [ ] **Step 4: Commit**

```bash
git add packages/bindrunes-kit/src/adapters/
git commit -m "feat(kit): add AWS and GCP deployment adapters"
```

---

### Task 11: Kit v1.0 — Database Adapters

**Files:**
- Create: `packages/bindrunes-kit/src/server/db-drizzle.ts`
- Create: `packages/bindrunes-kit/src/server/db-prisma.ts`

- [ ] **Step 1: Create Drizzle adapter**

```typescript
import { defineSchema } from "./db";

export function createDrizzleAdapter(schema: ReturnType<typeof defineSchema>) {
	// Wrap Drizzle ORM with CRUD router generation
	return {
		createCrudRouter: (tableName: string) => {
			// Generate CRUD routes from Drizzle schema
		},
	};
}
```

- [ ] **Step 2: Create Prisma adapter**

Same pattern for Prisma ORM.

- [ ] **Step 3: Write tests**

- [ ] **Step 4: Commit**

```bash
git add packages/bindrunes-kit/src/server/db-drizzle.ts packages/bindrunes-kit/src/server/db-prisma.ts
git commit -m "feat(kit): add Drizzle and Prisma database adapters"
```

---

### Task 12: Kit v1.0 — Auth Flows

**Files:**
- Create: `packages/bindrunes-kit/src/server/auth-passkey.ts`
- Create: `packages/bindrunes-kit/src/server/auth-magic-link.ts`

- [ ] **Step 1: Create passkey/WebAuthn auth**

- [ ] **Step 2: Create magic link auth**

- [ ] **Step 3: Write tests**

- [ ] **Step 4: Commit**

```bash
git add packages/bindrunes-kit/src/server/auth-passkey.ts packages/bindrunes-kit/src/server/auth-magic-link.ts
git commit -m "feat(kit): add passkey and magic link auth flows"
```

---

### Task 13: Multi-Framework Token Port

**Files:**
- Create: `packages/tokens/`
- Create: `packages/tokens-react/`
- Create: `packages/tokens-vue/`

- [ ] **Step 1: Create tokens package**

Extract CSS from `packages/bindrunes/src/styles/` into a standalone package.

- [ ] **Step 2: Create React provider**

- [ ] **Step 3: Create Vue plugin**

- [ ] **Step 4: Add workspaces**

- [ ] **Step 5: Commit**

```bash
git add packages/tokens/ package.json
git commit -m "feat: add framework-agnostic design token packages"
```

---

### Task 14: Enterprise Features & Kit v1.0 Release

**Files:**
- Create: `packages/bindrunes/src/utils/useAuditLog.svelte.ts`
- Create: `packages/bindrunes-kit/src/server/auth-sso.ts`
- Create: `docs/enterprise.md`
- Modify: `packages/bindrunes-kit/package.json` (version to 1.0.0)

- [ ] **Step 1: Create audit log composable**

- [ ] **Step 2: Create SSO adapter**

- [ ] **Step 3: Write enterprise docs page**

- [ ] **Step 4: Bump kit to v1.0.0**

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: enterprise features (audit log, SSO) and kit v1.0.0"
```

---

## Execution Order

```
Phase 1 (do first — everything depends on deployment):
  Task 1: Vercel setup ←── BLOCKED on user providing VERCEL_TOKEN
  Task 2: Expand playground ←── independent
  Task 3: README ←── depends on Task 1 (needs playground URL)
  Task 4: Agentic docs ←── independent

Phase 2 (after Phase 1):
  Task 5: Storybook ←── independent
  Task 7: Accessibility ←── depends on Task 5

Phase 3 (after Phase 2):
  Task 8: Templates ←── independent
  Task 9: Migration guides ←── independent

Phase 4 (after Phase 3):
  Task 10: Kit adapters ←── independent
  Task 11: DB adapters ←── independent
  Task 12: Auth flows ←── independent
  Task 13: Token port ←── independent
  Task 14: Enterprise + v1.0 ←── depends on Tasks 10-12
```
