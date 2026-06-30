# Agentic Chat Kernel & Copilot Components

> **New to agentic?** Start with the [Build a Copilot in 5 Minutes](./build-a-copilot.md) tutorial.

## Overview

The agentic subsystem provides two layers:

1. **Kernel** — Composables for building memory-constrained LLM chatbot interfaces. Handles token budget constraints, conversation branching, context compaction, orchestrator loops, eviction, and persistence.

2. **Copilot Components** — Pre-built Svelte 5 UI components for LLM chat interfaces. Message lists, tool panels, streaming indicators, suggestion cards, reasoning displays, and more.

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

```svelte
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
```

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
- `src/utils/agentic/createSimulatorRuntime.ts` — Mock runtime for tests
- `src/utils/agentic/createWindowStoreProvider.svelte.ts` — Context provider wrapper
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
| `persistence.svelte.ts` | Serialization/deserialization of Window graphs. Built-in adapters: `createLocalStorageAdapter(prefix)`, `createIndexedDBAdapter(dbName)`. |
| `createSimulatorRuntime.ts` | Reference `AgentRuntime` implementation for tests. Reads scripted Delta streams, respects `AbortSignal`, never touches the network. |
| `createWindowStoreProvider.svelte.ts` | Creates a `WindowStore` instance and sets it into Svelte context via `createMetaContext`. |
| `useWindowStore.svelte.ts` | Retrieves the `WindowStore` from Svelte context via `useMetaContext`. Throws if no provider is mounted. |

### Core Concepts

- **`Window`**: Isolated context windows holding state (messages, token budget, lineage).
- **`TokenBudget`**: Tracks working, episodic, and semantic token layers with eviction detectors.
- **`AgentRuntime`**: Boundary interface defining LLM completion endpoints:
  ```ts
  interface AgentRuntime {
    readonly tools: ReadonlyArray<ToolSpec>;
    complete(req: CompletionRequest, signal: AbortSignal): AsyncIterable<Delta>;
    embed?(input: string, signal: AbortSignal): Promise<Float32Array>;
  }
  ```
- **Branches**: Git-like lineage tree generation from message histories.
- **Orchestrator**: Multi-turn agent loop coordination (tool calling, re-prompting).
- **Eviction**: Token eviction policies for context window management.
- **Persistence**: Window graph serialization for cross-session storage. Built-in adapters for `localStorage` and IndexedDB.

### Context Wrappers

```ts
// In a parent component:
const store = createWindowStoreProvider({ budgetCap: 8192 });

// In any child component:
const store = useWindowStore();
```

---

## Stricter Coverage Requirements

As defined in `vitest.config.ts`, the agentic kernel has a higher coverage bar:
- **95%** Statements / Lines
- **90%** Branches
- **92%** Functions

Copilot components (`src/domains/agentic/`) follow standard coverage thresholds.
