# bindrunes Platform Design Spec

> **Date:** 2026-06-22
> **Status:** Approved
> **Scope:** Full-stack Svelte 5 design platform with deep customization

---

## 1. Vision

Evolve bindrunes from a component library into a **full-stack Svelte 5 design platform** with the deepest customization system in any ecosystem. Four pillars:

1. **Foundation** — Fix critical issues blocking adoption
2. **Agentic Kernel** — Ship the unique differentiator (LLM chat orchestration)
3. **Design Depth** — Expand the 3-axis system with more aesthetics, a visual builder, and component-level overrides
4. **Growth** — Docs, community, and examples that convert visitors into users

---

## 2. Phased Delivery

### Phase 1: Foundation Fixes (Weeks 1-2)

#### 1.1 Fix CLI Templates

**Problem:** `create-bindrunes` CLI (`packages/bindrunes-kit/src/cli/index.ts:10`) references `TEMPLATES_DIR` that doesn't exist.

**Solution:**
- Create `packages/bindrunes-kit/templates/full-stack/` with working SvelteKit scaffold:
  - `package.json` (with `bindrunes`, `svelte`, `@sveltejs/kit` dependencies)
  - `svelte.config.js` (adapter-auto default)
  - `vite.config.ts` (tailwindcss + sveltekit plugins)
  - `src/app.css` (tailwindcss + bindrunes imports)
  - `src/app.html`
  - `src/routes/+layout.svelte` (AppProvider wrapper)
  - `src/routes/+page.svelte` (landing page stub)
  - `src/hooks.server.ts` (auth stub)
- Create `packages/bindrunes-kit/templates/spa-backend/` with SPA-only scaffold (no hooks.server.ts)
- Update `packages/bindrunes-kit/package.json` `"files"` to include `"templates"`

#### 1.2 Fix Kit Types

**Problem:** `packages/bindrunes-kit/src/types/index.ts` exports `{}`.

**Solution:** Export shared types used across kit modules:
```ts
export type { SessionData } from "../server/auth";
export type { CreateClientAuthOptions, User } from "../client/auth.svelte";
export type { CreateSSEClientOptions, SSEStatus } from "../client/sse.svelte";
```

#### 1.3 Bundle Size Tracking

**Problem:** No bundle size analysis or optimization guidance.

**Solution:**
- Add `@size-limit/preset-small-lib` and `size-limit` dev dependencies to root
- Create `.size-limit.json` at root:
  ```json
  [
    { "name": "bindrunes (main)", "path": "packages/bindrunes/dist/index.js", "limit": "15 kB" },
    { "name": "bindrunes/layouts", "path": "packages/bindrunes/dist/layouts/index.js", "limit": "8 kB" },
    { "name": "bindrunes/domains", "path": "packages/bindrunes/dist/domains/index.js", "limit": "12 kB" }
  ]
  ```
- Add `"size"` script to root `package.json`: `"size": "size-limit"`
- Add size check to `validate` pipeline
- Add size badge to README

#### 1.4 Fix Homepage Stats

**Problem:** Docs site homepage claims "245+ components" and "49+ composables".

**Solution:** Verify actual counts and update `docs-site/src/routes/+page.svelte`:
- Components: 87 primitives + 36 layouts + 115 domains + 10 templates = 248
- Composables: 53+ (verified from file count)
- Update to "248+ components" and "53+ composables"

---

### Phase 2: Agentic Kernel v1 (Weeks 2-4)

#### 2.1 Orchestrator

**New file:** `src/utils/agentic/createOrchestrator.svelte.ts`

The Orchestrator composable coordinates multi-turn agent loops:

```ts
interface OrchestratorOptions {
  store: WindowStore;
  runtime: AgentRuntime;
  maxTurns?: number;        // default 10
  timeout?: number;         // default 30000ms per turn
  onTurnComplete?: (turn: Turn) => void;
  onToolCall?: (spec: ToolSpec, args: unknown) => void;
}

interface OrchestratorResult {
  status: "idle" | "running" | "completed" | "error" | "aborted";
  currentTurn: number;
  messages: ReadonlyArray<Turn>;
  error: Error | null;
  start: (input: string) => void;
  abort: () => void;
}
```

**Behavior:**
1. `start(input)` appends user message to active window
2. Calls `runtime.complete()` with current window context
3. If response contains `tool_call` deltas:
   - Emit `onToolCall` callback
   - Append tool call to window
   - Execute tool (consumer-provided handler via `OrchestratorOptions.tools`)
   - Append tool result to window
   - Re-prompt `runtime.complete()`
4. Repeat until: `done` delta, `maxTurns` reached, timeout, or abort
5. Each turn is recorded via `store.appendTurn()`

**Tests:** `src/utils/agentic/createOrchestrator.svelte.test.ts`
- Test basic single-turn completion
- Test multi-turn tool calling loop
- Test abort mid-turn
- Test timeout handling
- Test maxTurns limit
- Test error recovery

#### 2.2 Compaction Strategies

**New files:**
- `src/utils/agentic/compaction/SummarizeCompaction.ts`
- `src/utils/agentic/compaction/SlidingWindowCompaction.ts`

**SummarizeCompaction:**
```ts
interface SummarizeCompactionOptions {
  summarize: (turns: Turn[]) => Promise<string>;
  maxTokensBeforeCompaction?: number;
}
```
- When token budget exceeds threshold, sends older turns to `summarize` function
- Replaces old turns with a single summary turn
- Requires LLM call (consumer provides the `summarize` function)

**SlidingWindowCompaction:**
```ts
interface SlidingWindowCompactionOptions {
  windowSize: number;  // number of turns to keep
}
```
- Keeps the last N turns, discards older ones
- Simple, predictable, no LLM call
- Good for cost-sensitive applications

#### 2.3 Persistence Layer

**New file:** `src/utils/agentic/persistence.svelte.ts`

```ts
interface PersistenceAdapter {
  save(key: string, data: string): Promise<void>;
  load(key: string): Promise<string | null>;
  remove(key: string): Promise<void>;
}

function createPersistedStore(
  store: WindowStore,
  adapter: PersistenceAdapter,
  key: string
): {
  save: () => Promise<void>;
  load: () => Promise<void>;
  clear: () => Promise<void>;
}
```

**Built-in adapters:**
- `createLocalStorageAdapter(prefix)` — localStorage with key prefix
- `createIndexedDBAdapter(dbName)` — IndexedDB for large conversations

#### 2.4 Eviction Policies

**New file:** `src/utils/agentic/eviction.svelte.ts`

```ts
interface EvictionPolicy {
  shouldEvict(store: WindowStore): boolean;
  evict(store: WindowStore): void;
}

function createTokenBudgetEviction(threshold: number): EvictionPolicy;
function createAgeEviction(maxAge: number): EvictionPolicy;
function createCompositeEviction(...policies: EvictionPolicy[]): EvictionPolicy;
```

#### 2.5 Agentic UI Components

**New files in `src/domains/chat/`:**
- `AgentChat.svelte` — Full chat interface with message list, input, streaming display
- `ToolCallBadge.svelte` — Visual indicator for tool invocations
- `ConversationBranch.svelte` — Visual tree view of conversation branches

**Tests:** Co-located `.svelte.test.ts` files with a11y checks

---

### Phase 3: Design System Depth (Weeks 3-6)

#### 3.1 New Aesthetics

**New files:**
- `src/styles/aesthetics/neon.css`
- `src/styles/aesthetics/brutalist.css`
- `src/styles/aesthetics/organic.css`

**neon:**
```css
[data-aesthetic="neon"] {
  --radius: 0.25rem;
  --radius-md: 0.25rem;
  --radius-lg: 0.375rem;
  --radius-xl: 0.5rem;
  --shadow-xs: 0 0 4px oklch(0.7 0.2 180 / 0.15);
  --shadow-sm: 0 0 8px oklch(0.7 0.2 180 / 0.2);
  --shadow-md: 0 0 16px oklch(0.7 0.2 180 / 0.25);
  --shadow-lg: 0 0 32px oklch(0.7 0.2 180 / 0.3);
  --duration-snappy: 80ms;
  --duration-fluid: 150ms;
  --duration-slow: 250ms;
  --ease-standard: cubic-bezier(0.2, 0, 0, 1);
  --button-treatment: flat;
  --button-bg: var(--primary);
  --card-treatment: solid;
  --surface-texture: none;
  --hero-translate: 4px;
  --shadow-emphasis: high;
}
```

**brutalist:**
```css
[data-aesthetic="brutalist"] {
  --radius: 0;
  --radius-md: 0;
  --radius-lg: 0;
  --radius-xl: 0;
  --shadow-xs: none;
  --shadow-sm: none;
  --shadow-md: none;
  --shadow-lg: none;
  --duration-snappy: 50ms;
  --duration-fluid: 100ms;
  --duration-slow: 150ms;
  --ease-standard: linear;
  --button-treatment: flat;
  --button-bg: var(--primary);
  --card-treatment: solid;
  --surface-texture: noise;
  --hero-translate: 2px;
  --shadow-emphasis: low;
}
```

**organic:**
```css
[data-aesthetic="organic"] {
  --radius: 1.5rem;
  --radius-md: 1.5rem;
  --radius-lg: 2rem;
  --radius-xl: 2.5rem;
  --shadow-xs: 0 1px 4px oklch(0 0 0 / 0.03);
  --shadow-sm: 0 2px 8px -2px oklch(0 0 0 / 0.05);
  --shadow-md: 0 4px 16px -4px oklch(0 0 0 / 0.08);
  --shadow-lg: 0 8px 24px -6px oklch(0 0 0 / 0.1);
  --duration-snappy: 200ms;
  --duration-fluid: 350ms;
  --duration-slow: 500ms;
  --ease-spring: linear(0, 0.4 7%, 0.9 25%, 1);
  --button-treatment: gradient;
  --button-bg: linear-gradient(135deg, var(--primary), var(--accent));
  --card-treatment: tinted;
  --surface-texture: paper;
  --hero-translate: 20px;
  --shadow-emphasis: medium;
}
```

**Updates:**
- Add `neon`, `brutalist`, `organic` to `Aesthetic` type in `src/utils/useAesthetic.svelte.ts`
- Update `ThemeStudio` component to include new aesthetics
- Update `ThemeToggle` to support 7 aesthetics

#### 3.2 Visual Theme Builder (Docs Site)

**New route:** `docs-site/src/routes/docs/design-system/builder/+page.svelte`

**Features:**
- Live preview panel: renders Button, Card, Input, Dialog in a sample layout
- Theme selector: dropdown with 6 presets + "Custom" option
- Aesthetic selector: 7 presets with visual preview cards
- Density slider: compact ↔ comfortable ↔ spacious
- CSS variable editor: text inputs for modifying individual tokens
- Export panel: shows generated CSS / `defineTheme()` / `extendTheme()` code
- Copy-to-clipboard for all export formats

**Implementation:**
- Uses `createTheme`, `createAesthetic`, `createDensity` composables
- Preview panel wrapped in `AppProvider` with selected axes
- CSS export computed from current token state
- No new dependencies needed

#### 3.3 Component-Level Token Overrides

**Approach:** Add optional `theme`, `aesthetic`, `density` props to `AppProvider`. When set, apply `data-theme`, `data-aesthetic`, `data-density` as scoped attributes on the component's root element. CSS cascade naturally handles the override.

**Update:** `src/primitives/AppProvider.svelte` to accept and apply scoped axis overrides.

**Documentation:** Add section to `docs/design-system.md` showing the pattern.

#### 3.4 Animation Token System

**New file:** `src/styles/tokens/animation.css`

```css
:root {
  --animate-enter: var(--duration-fluid) var(--ease-standard) both;
  --animate-exit: var(--duration-snappy) var(--ease-accelerated) both;
  --animate-slide-up: translateY(8px);
  --animate-fade-in: opacity 0;
  --animate-scale-in: scale(0.95);
}
```

**New composable:** `src/utils/useAnimation.svelte.ts`

```ts
function useAnimation(): {
  enter: string;    // CSS class for enter animation
  exit: string;     // CSS class for exit animation
  slideUp: string;  // CSS class for slide-up
  fadeIn: string;   // CSS class for fade-in
  scaleIn: string;  // CSS class for scale-in
}
```

---

### Phase 4: Docs & Community (Weeks 4-8)

#### 4.1 Live Component Playground

**New route:** `docs-site/src/routes/docs/playground/+page.svelte`

**Features:**
- Component picker: searchable dropdown of all 248+ components
- Live preview: renders selected component with current props
- Props panel: generated from component type definitions, editable
- Code preview: shows the Svelte code to achieve current state
- Theme/aesthetic/density controls in sidebar
- "Open in StackBlitz" button

#### 4.2 Blog Posts

Write 2 launch posts:
1. "Why bindrunes: The case for a full-stack Svelte design system"
2. "Deep dive: The 3-axis design system"

Publish to the docs site under `/blog/`.

#### 4.3 Discord Server

Set up Discord with channels:
- `#general` — Discussion
- `#help` — Q&A
- `#showcase` — User projects
- `#contributors` — Development discussion

#### 4.4 Example App Polish

- **showcase:** Demo every component with all theme × aesthetic × density combinations
- **landing:** Real-looking SaaS landing page using `MarketingTemplate`
- **webapp:** Demo full-stack kit features (auth, CRUD, settings)

---

## 3. Testing Strategy

- **Agentic modules:** 95% lines, 90% branches, 92% functions (existing threshold)
- **New aesthetics:** Visual regression tests (screenshot comparison)
- **Visual builder:** Integration tests for theme switching
- **All new code:** Co-located tests with a11y checks via `vitest-axe`

---

## 4. Documentation Updates

- Update `AGENTS.md` with new anti-patterns and conventions
- Update `docs/design-system.md` with new aesthetics and component-level overrides
- Update `docs/agentic/overview.md` with orchestrator and persistence docs
- Update `docs/components.md` with new agentic UI components
- Add `docs/design-system/builder.md` for the visual builder
- Update README with new stats and features

---

## 5. Success Metrics

| Metric | Current | Target (3 months) |
|--------|---------|-------------------|
| npm weekly downloads | Unknown | Track from day 1 |
| Bundle size (main entry) | Unknown | Under 15KB gzipped |
| Test coverage | 90%+ threshold | Maintain 90%+ |
| Docs site pages | 22 | 28+ (playground, builder, 2 blog posts) |
| GitHub stars | Unknown | 500+ |
| Discord members | 0 | 100+ |
