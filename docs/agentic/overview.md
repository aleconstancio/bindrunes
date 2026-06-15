# Agentic Chat Kernel

> Status: **Internal kernel landed in v1.0.1**. Public metacomponents ship in future releases under `bindrunes/agentic`.

## Overview

The agentic chat kernel provides typesafe, reactive modules for building memory-constrained LLM chatbot interfaces in Svelte 5. It handles token budget constraints, conversation branching, and context compaction.

---

## File Layout

- `src/types/agent.ts` — Type contracts (`Window`, `Delta`, `AgentRuntime`, etc.).
- `src/utils/agentic/createWindowStore.svelte.ts` — Reactive context window manager.
- `src/utils/agentic/createTokenBudget.svelte.ts` — Multi-tier token budgets.
- `src/utils/agentic/createConversationBranches.svelte.ts` — Fork/branch derivations.
- `src/utils/agentic/SimulatorRuntime.ts` — Mock runtime for tests.
- `src/utils/agentic/provideWindowStore.svelte.ts` — Context provider wrapper.
- `src/utils/agentic/useWindowStore.svelte.ts` — Context consumer wrapper.

---

## Module Inventory

| Module | Purpose |
|--------|---------|
| `agent.ts` | Pure type declarations for the agentic interchange surface. Defines `Window`, `Delta`, `AgentRuntime`, `Turn`, `CompactionPlan`, and related types. No runtime code. |
| `createWindowStore.svelte.ts` | Central state manager. Holds a graph of `Window` objects, tracks the active window, and exposes operations: `createRoot`, `fork`, `navigate`, `appendTurn`, `compact`, `remove`. Uses Svelte 5 runes for reactivity. |
| `createTokenBudget.svelte.ts` | Tracks token usage across three memory layers (`working`, `episodic`, `semantic`). Provides `record`, `reset`, and computed `remaining`/`overflow` getters. |
| `createConversationBranches.svelte.ts` | Pure derivation of branch tree from a flat list of Windows rooted at `rootId`. Computes leaves, paths, and sibling comparisons without mutating state. |
| `SimulatorRuntime.ts` | Reference `AgentRuntime` implementation for tests. Reads scripted Delta streams, respects `AbortSignal`, never touches the network. |
| `provideWindowStore.svelte.ts` | Creates a `WindowStore` instance and sets it into Svelte context via `createMetaContext`. |
| `useWindowStore.svelte.ts` | Retrieves the `WindowStore` from Svelte context via `useMetaContext`. Throws if no provider is mounted. |

---

## Core Concepts

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
- **Context Wrappers**: `provideWindowStore` and `useWindowStore` enable sharing a single `WindowStore` across a component tree via Svelte context.

---

## AgentRuntime Contract

The `AgentRuntime` interface is the primary boundary between the agentic kernel and LLM backends:

- **`tools`**: Declares available tools the runtime supports.
- **`complete(req, signal)`**: Yields a stream of `Delta` events (`token`, `tool_call`, `tool_result`, `reasoning`, `usage`, `error`, `done`).
- **`embed?(input, signal)`**: Optional embedding endpoint for semantic memory.

Consumers implement `AgentRuntime`; bindrunes ships `SimulatorRuntime` for tests and offline development.

---

## Context Wrappers

`provideWindowStore` and `useWindowStore` wrap Svelte's `getContext`/`setContext` with typed symbols:

```ts
// In a parent component:
const store = provideWindowStore({ budgetCap: 8192 });

// In any child component:
const store = useWindowStore();
```

This pattern ensures a single `WindowStore` instance is shared across the component subtree without prop drilling.

---

## Stricter Coverage Requirements

As defined in `vitest.config.ts`, the agentic directory has a higher coverage bar:
- **90%** Statements / Lines
- **85%** Branches
- **88%** Functions

---

## Known Gaps

- **Orchestrator**: No higher-level orchestrator to coordinate multi-turn agent loops (tool calling, re-prompting, etc.).
- **Compaction Strategies**: `CompactionStrategy` interface is defined but no concrete strategies are shipped yet.
- **Persistence**: No serialization/deserialization of `Window` graphs for persistence across sessions.
- **Eviction Policies**: `EvictionPolicy` types are defined but no automatic eviction logic is implemented in the store.