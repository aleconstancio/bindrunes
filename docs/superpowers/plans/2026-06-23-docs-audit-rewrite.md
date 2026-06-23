# Documentation Audit & Rewrite Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restructure and rewrite all bindrunes documentation to accurately reflect the current codebase (245 components, ~48 composables, bindrunes-kit package, agentic copilot components, Siren/Vico contributions).

**Architecture:** Domain-organized docs structure. Move kit docs from `packages/bindrunes-kit/docs/` into `docs/kit/`. Move migration guides into `docs/migration/`. Rewrite AGENTS.md, README.md, and index.md with accurate data. Expand agentic docs to cover copilot components and new subsystem modules.

**Tech Stack:** Markdown documentation only. No code changes.

**Accurate Counts (from source):**
- Primitives: 77 `.svelte` files
- Layouts: 36 `.svelte` files
- Domains: 124 `.svelte` files (including 9 agentic copilot)
- Templates: 10 `.svelte` files
- Composables: ~48 `.svelte.ts` files (39 main + 8 agentic + 1 defineTheme + 1 extendTheme)
- Main index.ts exports: 178

---

## Phase 1: Structure (directory moves, no content changes)

### Task 1: Create directories and move kit docs

**Files:**
- Create: `docs/kit/` (directory)
- Move: `packages/bindrunes-kit/docs/*` → `docs/kit/`

- [ ] **Step 1: Create directories**

```bash
mkdir -p docs/kit docs/migration
```

- [ ] **Step 2: Move kit docs via git mv**

```bash
git mv packages/bindrunes-kit/docs/getting-started.md docs/kit/getting-started.md
git mv packages/bindrunes-kit/docs/full-stack.md docs/kit/full-stack.md
git mv packages/bindrunes-kit/docs/spa-backend.md docs/kit/spa-backend.md
git mv packages/bindrunes-kit/docs/auth.md docs/kit/auth.md
git mv packages/bindrunes-kit/docs/i18n.md docs/kit/i18n.md
git mv packages/bindrunes-kit/docs/deployment.md docs/kit/deployment.md
```

- [ ] **Step 3: Create kit overview**

Write `docs/kit/index.md`:

```markdown
# bindrunes-kit

SvelteKit meta-framework powered by bindrunes. Build full-stack or SPA+backend apps with the bindrunes design system.

## Quick Start

\`\`\`bash
npx create-bindrunes my-app
cd my-app
bun install
bun run dev
\`\`\`

## Modes

- **[Full-Stack](full-stack.md)** — SvelteKit with SSR, server load functions, API routes, and hooks
- **[SPA + Backend](spa-backend.md)** — Static SvelteKit frontend with external API backend

## Guides

| Guide | Description |
|-------|-------------|
| [Getting Started](getting-started.md) | Project structure, dev commands, design system setup |
| [Full-Stack Mode](full-stack.md) | SSR, server hooks, load functions, API routes |
| [SPA + Backend Mode](spa-backend.md) | Static frontend with external API |
| [Authentication](auth.md) | Server-side sessions, route protection, CSRF |
| [Internationalization](i18n.md) | Server-side locale detection, client translations |
| [Deployment](deployment.md) | Vercel, Firebase, Node.js, Docker |

## Server Utilities

\`\`\`ts
import { createServerAuth, createAuthGuard, createCsrfGuard } from "bindrunes-kit/server";
\`\`\`

- `createServerAuth` — Cookie-based session management with `handle` hook
- `createAuthGuard` — Route protection middleware (redirects unauthenticated users)
- `createCsrfGuard` — CSRF protection via origin validation
- `createServerI18n` — Server-side locale detection (path, cookie, or header strategies)
- `createServerApiClient` — Typed server API client with auth forwarding
- `combineHooks` — Compose multiple SvelteKit hooks
```

- [ ] **Step 4: Commit**

```bash
git add docs/kit/ packages/bindrunes-kit/docs/
git commit -m "docs: move bindrunes-kit docs to docs/kit/"
```

---

### Task 2: Move migration guides

**Files:**
- Move: `docs/migration-from-shadcn-svelte.md` → `docs/migration/from-shadcn-svelte.md`
- Move: `docs/migration-from-melt-ui.md` → `docs/migration/from-melt-ui.md`
- Move: `docs/migration-from-skeleton.md` → `docs/migration/from-skeleton.md`

- [ ] **Step 1: Move files via git mv**

```bash
git mv docs/migration-from-shadcn-svelte.md docs/migration/from-shadcn-svelte.md
git mv docs/migration-from-melt-ui.md docs/migration/from-melt-ui.md
git mv docs/migration-from-skeleton.md docs/migration/from-skeleton.md
```

- [ ] **Step 2: Commit**

```bash
git add docs/migration/
git commit -m "docs: relocate migration guides to docs/migration/"
```

---

## Phase 2: Core accuracy

### Task 3: Rewrite AGENTS.md

**Files:**
- Modify: `.agents/AGENTS.md`

- [ ] **Step 1: Rewrite AGENTS.md**

Replace entire content with:

```markdown
# bindrunes — Agent Laws

## Monorepo
- `packages/bindrunes` — Component library (Svelte 5 + Tailwind v4)
- `packages/bindrunes-kit` — SvelteKit meta-framework (SSR, auth, i18n)
- `docs-site/` — Documentation website
- `examples/` — Showcase and demo apps

## Architecture
Svelte 5 + Tailwind CSS v4 B2B SaaS component library. ~245 components, ~48 composables, 10 domain categories, 6 themes. Agentic kernel with copilot UI components. Kit provides SvelteKit scaffolding with full-stack and SPA+backend modes.

## Three Orthogonal Axes (v1.0+)
- Theme (`data-theme=editorial|dracula|nord|catppuccin|rose-pine|github`) → color identity
- Aesthetic (`data-aesthetic=minimal|glass|bento|expressive`) → form (radius/shadow/motion)
- Density (`data-density=compact|comfortable|spacious`) → spacing scale

## Token Rules
- **Color tokens** → theme layer only. Never touch form.
- **Form tokens** (radius, shadow, motion, easing) → aesthetic layer only. Never touch color.
- **Spacing tokens** (`--space-*`) → density layer only. Never touch color or form.
- No literal `box-shadow`, `duration-*`, `oklch()` inline in components — always use CSS var tokens.

## Laws
- `createX()` pattern for all reactive utilities
- Svelte 5 runes only — no legacy stores, no `export let`
- Valibot for validation (not Zod)
- OKLCH color space for theming
- bits-ui for accessible primitives
- Prefer lightweight, tree-shakeable dependencies
- **Props convention:** Use inline anonymous types in `$props()` for components with ≤8 props. Use `interface Props` for components with >8 props or complex/conditional prop groups. New components should follow this convention; don't mass-refactor existing ones.
- The agentic kernel (`src/utils/agentic/`, `src/types/agent.ts`) follows the same `createX()` factory + readonly-getter contract as the rest of the library. **The `AgentRuntime` interface is the only thing consumers are expected to implement.**
- **Meta-component context:** Use `createMetaContext` / `useMetaContext` (from `src/utils/createMetaContext.svelte.ts`) for all subsystem context. Never use raw `setContext`/`getContext`.
- **Meta-component state:** Use `readonlyGetters` for state exposed to consumers. Mutations via explicit action methods only.
- **Meta-component layout:** Use `MetaLayout` (position slots), `MetaContainer` (content width), `MetaScrollable` (overflow). Never hardcode `max-w-*` or inline overflow styles.
- **Kit conventions:** Server utilities go in `bindrunes-kit/server`. Client-side auth uses `createApiClient` + localStorage. Server-side auth uses `createServerAuth` + cookies.

## Anti-Patterns
- Don't use legacy Svelte stores
- Don't use Zod (use Valibot)
- Don't add runtime deps without strong justification
- Don't use hardcoded colors — use CSS custom properties
- Don't export internal state — expose via readonly getters
- Don't use `thoth-` prefix (retired in v1.0)
- Don't use `text-sm`/`text-xs`/`text-lg`/`text-2xl font-bold`/etc. — use type scale tokens (`text-display-2`, `text-headline-2`, `text-title-1`, `text-body-md`, `text-label-md`, `text-mono-xs`)
- Don't hardcode `--duration-*` fallbacks — preset.css provides all token defaults
- Don't ship provider SDKs in the agentic kernel — the contract is the boundary
- Don't add a `Window` to the store without wiring it into the parent's `lineage.children`
- Don't use raw `setContext`/`getContext` — use `createMetaContext`/`useMetaContext`
- Don't hardcode `max-w-4xl`/`max-w-6xl` etc. — use `<MetaContainer size="...">`
- Don't use `<SidebarLayout>` — use `<MetaLayout>` (SidebarLayout is deprecated)

## Internal Components
The following components are internal to ThemeStudio and should NOT be imported directly:
- `AestheticTab`, `DensityTab`, `ExportTab`, `ThemeColorTab`, `ThemePreview`
These are sub-components of `ThemeStudio` and are not part of the public API.

## Routing (Documentation)
| Topic | File |
|-------|------|
| Install & setup | `docs/getting-started.md` |
| Component reference | `docs/components.md` |
| Component state specs | `docs/component-states.md` |
| Composable reference | `docs/composables.md` |
| Design system & tokens | `docs/design-system.md` |
| Landing pages | `docs/landing.md` |
| Domain components | `docs/boundrunes.md` |
| Architecture | `docs/architecture.md` |
| Security | `docs/security.md` |
| Testing | `docs/testing.md` |
| Agentic kernel & copilot | `docs/agentic/overview.md` |
| bindrunes-kit | `docs/kit/` |
| Migration from shadcn-svelte | `docs/migration/from-shadcn-svelte.md` |
| Migration from Melt UI | `docs/migration/from-melt-ui.md` |
| Migration from Skeleton | `docs/migration/from-skeleton.md` |

## Agentic Coverage
The agentic folder has a **stricter per-glob threshold** enforced in CI
(`vitest.config.ts#thresholds`):
- `src/utils/agentic/**` and `src/types/agent.ts`: **90% lines / 85% branches
  / 88% functions / 90% statements**.
- Global floor stays at 80 / 70 / 77.
- When adding agentic code, TDD is required — the contract is the API
  surface; logic must be deeply covered.
- Copilot components (`src/domains/agentic/`) follow standard coverage thresholds.
```

- [ ] **Step 2: Commit**

```bash
git add .agents/AGENTS.md
git commit -m "docs: rewrite AGENTS.md with accurate counts and kit/agentic routing"
```

---

### Task 4: Rewrite README.md

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Rewrite README.md**

Replace entire content with:

```markdown
# bindrunes — Svelte 5 Component Library & Scaffold

[![CI](https://github.com/aleconstancio/bindrunes/actions/workflows/ci.yml/badge.svg)](https://github.com/aleconstancio/bindrunes/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/bindrunes)](https://www.npmjs.com/package/bindrunes)
[![license](https://img.shields.io/npm/l/bindrunes)](https://github.com/aleconstancio/bindrunes/blob/main/LICENSE)

245+ components · 48 composables · 10 domain categories · 6 themes · Svelte 5 + Tailwind v4 + bits-ui + valibot.

## Features

- **Three-axis design system** — Fully orthogonal theme (color), aesthetic (form), and density (spacing) scales.
- **Svelte 5 runes** — Built exclusively with `$state`, `$derived`, and `$effect`. No legacy stores.
- **Page composition** — `PageShell` layout primitive + `MarketingTemplate`, `DashboardTemplate`, `CrudTemplate` templates for no-brainer page building.
- **10 domain categories** — Pre-composed page patterns for Auth, Calendar, Chat, Data, E-commerce, Landing, Marketing, Media, Portfolio, and Settings.
- **B2B SaaS focus** — Shells, sidebars, data tables, CRUD operations, and pre-built landing sections.
- **Lightweight validation** — Built with Valibot, not Zod.
- **OKLCH color space** — Perceptually uniform theming with 6 curated presets.
- **48 composables** — Reactivity primitives, data fetching, forms, auth, i18n, and more.
- **Agentic copilot UI** — Pre-built components for LLM chat interfaces: message lists, tool panels, streaming indicators, suggestion cards, and reasoning displays.
- **SvelteKit meta-framework** — `bindrunes-kit` provides full-stack and SPA+backend scaffolding with auth, i18n, and deployment helpers.

## Install

\`\`\`bash
bun add bindrunes
bun add svelte tailwindcss lucide-svelte mode-watcher svelte-sonner
\`\`\`

## Setup

\`\`\`css
/* app.css */
@import "tailwindcss";
@plugin "bindrunes/tailwind";
@import "bindrunes/styles/global.css";
\`\`\`

\`\`\`ts
// vite.config.ts
import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [tailwindcss(), sveltekit()],
  optimizeDeps: { exclude: ['bindrunes'] },
});
\`\`\`

\`\`\`svelte
<!-- +layout.svelte -->
<script lang="ts">
  import "../app.css";
  import { AppProvider } from "bindrunes";
  let { children } = $props();
</script>

<AppProvider themeDefault="editorial" aestheticDefault="editorial" densityDefault="comfortable">
  {@render children()}
</AppProvider>
\`\`\`

---

## Documentation

| Guide | Description |
|-------|-------------|
| [Getting Started](docs/getting-started.md) | Install, setup, and troubleshooting |
| [Components](docs/components.md) | Component references and details |
| [Component States](docs/component-states.md) | Visual state specs for all components (tokens, hover/focus/disabled) |
| [Composables](docs/composables.md) | Core composable APIs (caching, forms, auth) |
| [Design System](docs/design-system.md) | Customizing themes, aesthetics, and density |
| [Landing Pages](docs/landing.md) | Pre-built landing page sections |
| [Boundrunes](docs/boundrunes.md) | Pre-composed page patterns by category |
| [Architecture](docs/architecture.md) | Codebase design, context, and file mapping |
| [Security](docs/security.md) | Token storage and redirect validation |
| [Testing](docs/testing.md) | Vitest testing rules, helpers, and coverage |
| [Agentic Chat](docs/agentic/overview.md) | LLM agent kernel and copilot components |
| [bindrunes-kit](docs/kit/) | SvelteKit meta-framework (SSR, auth, i18n) |

---

## Export Paths

| Path | Description |
|------|-------------|
| `bindrunes` | Primitives, composables, and utilities |
| `bindrunes/layouts` | Layout components, dashboard shells, and sidebar |
| `bindrunes/domains` | Domain components (auth, calendar, chat, data, e-commerce, landing, marketing, media, portfolio, settings) |
| `bindrunes/domains/*` | Individual domain imports (e.g. `bindrunes/domains/landing`) |
| `bindrunes/domains/agentic` | Agentic copilot UI components |
| `bindrunes/templates` | Pre-composed page templates (10 categories) |
| `bindrunes/agentic` | Agentic chat kernel composables |
| `bindrunes/playground` | Playground and demo components |
| `bindrunes/tailwind` | Tailwind CSS v4 integration plugin |
| `bindrunes/styles/*` | Theme and global CSS |

---

## Development

\`\`\`bash
bun install           # Dependencies
bun run dev           # Watch mode (library + tests)
bun run build         # Build library
bun run clean         # Clean dist
bun run check         # Type check
bun run test          # Run tests
bun run lint          # Lint check
\`\`\`

## Releases

We use [Changesets](https://github.com/changesets/changesets) to manage versioning and package publishing.

### 1. Adding a Changeset
Whenever you make a user-facing change (bugfix, feature, chore, etc.), run:
\`\`\`bash
bun run changeset
\`\`\`
Follow the prompt to select the bump type (major, minor, patch) and write a short summary of the change.

### 2. Auto-Publish Flow
Our CI/CD pipeline ([release.yml](.github/workflows/release.yml)) automates publication:
1. When changesets are pushed to `main`, Changesets opens a versioning PR containing all accumulated changes.
2. Merging that PR into `main` automatically bumps the version, updates `CHANGELOG.md`, builds the project, and publishes the package to NPM with **Build Provenance** enabled.

## License

MIT
```

- [ ] **Step 2: Commit**

```bash
git add README.md
git commit -m "docs: rewrite README with accurate counts, kit section, agentic copilot"
```

---

### Task 5: Rewrite docs/index.md

**Files:**
- Modify: `docs/index.md`

- [ ] **Step 1: Rewrite docs/index.md**

Replace entire content with:

```markdown
# bindrunes Documentation

> Svelte 5 Component Library & B2B SaaS Scaffold — 245 components, 48 composables, 10 domain categories, 6 themes.

## Overview

bindrunes is a toolkit for building SaaS interfaces. It provides a three-axis design system: theme (color), aesthetic (form), and density (spacing).

\`\`\`svelte
<script lang="ts">
  import { AppProvider, Button, Card, useQuery } from "bindrunes";
  const users = useQuery({
    key: "/api/users",
    fetcher: () => fetch("/api/users").then(r => r.json()),
  });
</script>

<AppProvider>
  <Card>
    {#if users.isLoading}
      <p>Loading...</p>
    {:else}
      {#each users.data as user}
        <Button onclick={() => alert(user.name)}>{user.name}</Button>
      {/each}
    {/if}
  </Card>
</AppProvider>
\`\`\`

## Core Library

- [Getting Started](getting-started.md) — Install, setup, and troubleshooting
- [Components](components.md) — Reference for all 245 components
- [Composables](composables.md) — Reference for state, fetching, forms, auth, i18n
- [Design System](design-system.md) — Orthogonal theme, aesthetic, and density customizer
- [Landing Pages](landing.md) — Pre-built marketing sections
- [Templates](components.md#templates) — Pre-composed page templates
- [Architecture](architecture.md) — Folder mapping, composite patterns, context rules
- [Security](security.md) — Token storage and redirect sanitization
- [Testing](testing.md) — Test conventions, helpers, and coverage
- [Agentic Chat](agentic/overview.md) — LLM agent kernel and copilot components

## bindrunes-kit

- [Kit Overview](kit/) — SvelteKit meta-framework with full-stack and SPA+backend modes
- [Authentication](kit/auth.md) — Server-side sessions, route protection, CSRF
- [Internationalization](kit/i18n.md) — Server-side locale detection, client translations
- [Deployment](kit/deployment.md) — Vercel, Firebase, Node.js, Docker

## Migration Guides

- [From shadcn-svelte](migration/from-shadcn-svelte.md)
- [From Melt UI](migration/from-melt-ui.md)
- [From Skeleton](migration/from-skeleton.md)

## Exports

- `bindrunes` — Core components, composables, and utilities
- `bindrunes/layouts` — Layout shell components (DashboardShell, Sidebar, Tabs, etc.)
- `bindrunes/domains` — Domain-specific components (auth, calendar, chat, data, ecommerce, landing, marketing, media, portfolio, settings)
- `bindrunes/domains/*` — Individual domain imports (e.g., `bindrunes/domains/auth`)
- `bindrunes/domains/agentic` — Agentic copilot UI components
- `bindrunes/templates` — Pre-composed page templates
- `bindrunes/playground` — Demo/scaffold components and utilities
- `bindrunes/agentic` — Agentic chat kernel composables
- `bindrunes/tailwind` — Tailwind CSS v4 integration plugin
- `bindrunes/styles/*` — Theme CSS, presets, aesthetics, and density scales
```

- [ ] **Step 2: Commit**

```bash
git add docs/index.md
git commit -m "docs: rewrite docs/index.md with accurate counts and kit/migration links"
```

---

### Task 6: Update CONTRIBUTING.md paths

**Files:**
- Modify: `CONTRIBUTING.md`

- [ ] **Step 1: Update the "Adding Files" section**

Read `CONTRIBUTING.md` and update line 65:
- Old: `Update docs/components.md`
- Keep as-is (path unchanged)

Read line 67:
- Old: `Update docs/composables.md`
- Keep as-is (path unchanged)

No path changes needed in CONTRIBUTING.md — the component/composable docs stayed in place.

- [ ] **Step 2: Commit (only if changes were made)**

If no changes needed, skip this commit.

---

## Phase 3: Missing content

### Task 7: Rewrite docs/agentic/overview.md

**Files:**
- Modify: `docs/agentic/overview.md`

- [ ] **Step 1: Rewrite agentic overview**

Replace entire content with:

```markdown
# Agentic Chat Kernel & Copilot Components

## Overview

The agentic subsystem provides two layers:

1. **Kernel** (`src/utils/agentic/`, `src/types/agent.ts`) — Typesafe, reactive modules for building memory-constrained LLM chatbot interfaces. Handles token budget constraints, conversation branching, context compaction, orchestrator loops, eviction, and persistence.

2. **Copilot Components** (`src/domains/agentic/`) — Pre-built Svelte 5 UI components for LLM chat interfaces. Message lists, tool panels, streaming indicators, suggestion cards, reasoning displays, and more.

---

## Copilot Components

*Import from `bindrunes/domains/agentic`*

| Component | Description |
|-----------|-------------|
| `CopilotMessageList` | Scrollable message list with role-based styling |
| `CopilotInput` | Message composer with send button and keyboard shortcuts |
| `CopilotStreamIndicator` | Animated indicator showing LLM is streaming |
| `CopilotToolPanel` | Display for tool calls and results |
| `CopilotChainProgress` | Progress indicator for multi-step agent chains |
| `CopilotContextSidebar` | Sidebar showing conversation context and token usage |
| `CopilotSuggestionCard` | Clickable suggestion cards for quick prompts |
| `DebateHistoryTree` | Visual tree of conversation branches and reasoning paths |
| `InteractiveCitations` | Clickable citation references with source links |

### Usage

\`\`\`svelte
<script lang="ts">
  import {
    CopilotMessageList,
    CopilotInput,
    CopilotStreamIndicator,
    CopilotToolPanel
  } from "bindrunes/domains/agentic";

  let messages = $state([]);
  let isStreaming = $state(false);
</script>

<CopilotMessageList {messages} />
{#if isStreaming}
  <CopilotStreamIndicator />
{/if}
<CopilotInput onSend={handleSend} />
\`\`\`

---

## Kernel Modules

### File Layout

- `src/types/agent.ts` — Type contracts (`Window`, `Delta`, `AgentRuntime`, etc.)
- `src/utils/agentic/createWindowStore.svelte.ts` — Reactive context window manager
- `src/utils/agentic/createTokenBudget.svelte.ts` — Multi-tier token budgets
- `src/utils/agentic/createConversationBranches.svelte.ts` — Fork/branch derivations
- `src/utils/agentic/createOrchestrator.svelte.ts` — Multi-turn agent loop coordination
- `src/utils/agentic/eviction.svelte.ts` — Token eviction policies
- `src/utils/agentic/persistence.svelte.ts` — Window graph serialization/deserialization
- `src/utils/agentic/SimulatorRuntime.ts` — Mock runtime for tests
- `src/utils/agentic/provideWindowStore.svelte.ts` — Context provider wrapper
- `src/utils/agentic/useWindowStore.svelte.ts` — Context consumer wrapper

### Module Inventory

| Module | Purpose |
|--------|---------|
| `agent.ts` | Type declarations for the agentic interchange surface. Defines `Window`, `Delta`, `AgentRuntime`, `Turn`, `CompactionPlan`, and related types. Also exports runtime helpers: `toWindowId()` (branded ID factory) and `isTerminalDelta()` (delta kind checker). |
| `createWindowStore.svelte.ts` | Central state manager. Holds a graph of `Window` objects, tracks the active window, and exposes operations: `createRoot`, `fork`, `navigate`, `appendTurn`, `compact`, `remove`. Uses Svelte 5 runes for reactivity. |
| `createTokenBudget.svelte.ts` | Tracks token usage across three memory layers (`working`, `episodic`, `semantic`). Provides `record`, `reset`, and computed `remaining`/`overflow` getters. |
| `createConversationBranches.svelte.ts` | Pure derivation of branch tree from a flat list of Windows rooted at `rootId`. Computes leaves, paths, and sibling comparisons without mutating state. |
| `createOrchestrator.svelte.ts` | Coordinates multi-turn agent loops — tool calling, re-prompting, and completion detection. |
| `eviction.svelte.ts` | Token eviction policies for managing context window size when budgets are exceeded. |
| `persistence.svelte.ts` | Serialization and deserialization of Window graphs for persistence across sessions. |
| `SimulatorRuntime.ts` | Reference `AgentRuntime` implementation for tests. Reads scripted Delta streams, respects `AbortSignal`, never touches the network. |
| `provideWindowStore.svelte.ts` | Creates a `WindowStore` instance and sets it into Svelte context via `createMetaContext`. |
| `useWindowStore.svelte.ts` | Retrieves the `WindowStore` from Svelte context via `useMetaContext`. Throws if no provider is mounted. |

### Core Concepts

- **`Window`**: Isolated context windows holding state (messages, token budget, lineage).
- **`TokenBudget`**: Tracks working, episodic, and semantic token layers with eviction detectors.
- **`AgentRuntime`**: Boundary interface defining LLM completion endpoints:
  \`\`\`ts
  interface AgentRuntime {
    readonly tools: ReadonlyArray<ToolSpec>;
    complete(req: CompletionRequest, signal: AbortSignal): AsyncIterable<Delta>;
    embed?(input: string, signal: AbortSignal): Promise<Float32Array>;
  }
  \`\`\`
- **Branches**: Git-like lineage tree generation from message histories.
- **Orchestrator**: Multi-turn agent loop coordination (tool calling, re-prompting).
- **Eviction**: Token eviction policies for context window management.
- **Persistence**: Window graph serialization for cross-session storage.
- **Context Wrappers**: `provideWindowStore` and `useWindowStore` enable sharing a single `WindowStore` across a component tree via Svelte context.

### Context Wrappers

\`\`\`ts
// In a parent component:
const store = provideWindowStore({ budgetCap: 8192 });

// In any child component:
const store = useWindowStore();
\`\`\`

---

## Stricter Coverage Requirements

As defined in `vitest.config.ts`, the agentic kernel has a higher coverage bar:
- **90%** Statements / Lines
- **85%** Branches
- **88%** Functions

Copilot components (`src/domains/agentic/`) follow standard coverage thresholds.
```

- [ ] **Step 2: Commit**

```bash
git add docs/agentic/overview.md
git commit -m "docs: rewrite agentic overview with copilot components and kernel modules"
```

---

### Task 8: Update docs/components.md with agentic copilot

**Files:**
- Modify: `docs/components.md`

- [ ] **Step 1: Add agentic copilot section**

After the existing "### Chat" section (around line 406), add a new subsection before "### Marketing":

```markdown
### Agentic Copilot (`bindrunes/domains/agentic`)
- `CopilotMessageList` -- Scrollable message list with role-based styling
- `CopilotInput` -- Message composer with send button and keyboard shortcuts
- `CopilotStreamIndicator` -- Animated indicator showing LLM is streaming
- `CopilotToolPanel` -- Display for tool calls and results
- `CopilotChainProgress` -- Progress indicator for multi-step agent chains
- `CopilotContextSidebar` -- Sidebar showing conversation context and token usage
- `CopilotSuggestionCard` -- Clickable suggestion cards for quick prompts
- `DebateHistoryTree` -- Visual tree of conversation branches and reasoning paths
- `InteractiveCitations` -- Clickable citation references with source links
```

- [ ] **Step 2: Commit**

```bash
git add docs/components.md
git commit -m "docs: add agentic copilot components to components.md"
```

---

### Task 9: Update docs/composables.md with missing composables

**Files:**
- Modify: `docs/composables.md`

- [ ] **Step 1: Add createSessionMonitor**

After the `useInfiniteScroll` section (around line 354), add:

```markdown
### `createSessionMonitor`
Monitors and tracks session activity for analytics or security purposes.

\`\`\`ts
import { createSessionMonitor } from "bindrunes";

const monitor = createSessionMonitor({
  onIdle: () => console.log("Session idle"),
  onActivity: () => console.log("Session active"),
  idleTimeout: 300_000, // 5 minutes
});
\`\`\`
```

- [ ] **Step 2: Add createMultiTenant**

After `createSessionMonitor`, add:

```markdown
### `createMultiTenant`
Multi-tenant context provider for SaaS applications with tenant isolation.

\`\`\`ts
import { createMultiTenant } from "bindrunes";

const tenant = createMultiTenant({
  tenantId: "org_123",
  onSwitch: async (newTenantId) => {
    // Reload data for new tenant
  },
});
\`\`\`
```

- [ ] **Step 3: Commit**

```bash
git add docs/composables.md
git commit -m "docs: add createSessionMonitor and createMultiTenant to composables.md"
```

---

### Task 10: Update docs/boundrunes.md with agentic copilot

**Files:**
- Modify: `docs/boundrunes.md`

- [ ] **Step 1: Add agentic copilot to Chat domain section**

After the Chat domain table (around line 128), before "### E-commerce", add:

```markdown
### Agentic Copilot
Pre-built UI components for LLM chat interfaces.

**Import from `bindrunes/domains/agentic`:**

| Component | Description |
|-----------|-------------|
| `CopilotMessageList` | Scrollable message list with role-based styling |
| `CopilotInput` | Message composer with send button |
| `CopilotStreamIndicator` | Animated streaming indicator |
| `CopilotToolPanel` | Tool call and result display |
| `CopilotChainProgress` | Multi-step chain progress |
| `CopilotContextSidebar` | Context and token usage sidebar |
| `CopilotSuggestionCard` | Quick prompt suggestion cards |
| `DebateHistoryTree` | Conversation branch tree |
| `InteractiveCitations` | Clickable citation references |
```

- [ ] **Step 2: Commit**

```bash
git add docs/boundrunes.md
git commit -m "docs: add agentic copilot components to boundrunes.md"
```

---

## Phase 4: Cleanup

### Task 11: Verify all links resolve

**Files:** All docs files

- [ ] **Step 1: Extract and check all markdown links**

Run a script to find all `[text](path)` links in docs/ and verify each target file exists:

```bash
cd /home/ale/Projects/bindrunes
for f in $(find docs -name "*.md" -not -path "*/superpowers/*"); do
  grep -oP '\[.*?\]\(([^)]+)\)' "$f" | grep -oP '\(([^)]+)\)' | tr -d '()' | while read link; do
    if [[ "$link" == http* ]] || [[ "$link" == "#"* ]]; then
      continue
    fi
    target="$f"
    dir=$(dirname "$f")
    resolved="$dir/$link"
    if [ ! -f "$resolved" ] && [ ! -f "$resolved.md" ] && [ ! -f "$resolved/index.md" ]; then
      echo "BROKEN: $f -> $link"
    fi
  done
done
```

- [ ] **Step 2: Fix any broken links found**

- [ ] **Step 3: Final commit**

```bash
git add -A
git commit -m "docs: fix broken links across documentation"
```

---

### Task 12: Final verification

- [ ] **Step 1: Verify counts match across all files**

```bash
echo "=== README.md ===" && grep -o '[0-9]\+.*components' README.md | head -1
echo "=== AGENTS.md ===" && grep -o '[0-9]\+.*components' .agents/AGENTS.md | head -1
echo "=== index.md ===" && grep -o '[0-9]\+.*components' docs/index.md | head -1
```

All three should show the same count (~245).

- [ ] **Step 2: Verify kit docs exist**

```bash
ls docs/kit/
```

Should show: `index.md`, `getting-started.md`, `full-stack.md`, `spa-backend.md`, `auth.md`, `i18n.md`, `deployment.md`

- [ ] **Step 3: Verify migration guides exist**

```bash
ls docs/migration/
```

Should show: `from-shadcn-svelte.md`, `from-melt-ui.md`, `from-skeleton.md`

- [ ] **Step 4: Verify old files are gone**

```bash
ls docs/migration-from-*.md 2>/dev/null && echo "OLD FILES STILL EXIST" || echo "Clean"
ls packages/bindrunes-kit/docs/ 2>/dev/null && echo "OLD KIT DOCS STILL EXIST" || echo "Clean"
```
