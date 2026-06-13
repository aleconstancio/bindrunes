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

---

## Core Concepts

- **`Window`**: Isolated context windows holding state (messages, token budget, lineage).
- **`TokenBudget`**: Tracks working, episodic, and semantic token layers with eviction detectors.
- **`AgentRuntime`**: Boundary interface defining LLM completion endpoints:
  ```ts
  interface AgentRuntime {
    complete(request: CompletionRequest, signal?: AbortSignal): AsyncIterable<Delta>;
  }
  ```
- **Branches**: Git-like lineage tree generation from message histories.

---

## Stricter Coverage Requirements

As defined in `vitest.config.ts`, the agentic directory has a higher coverage bar:
- **90%** Statements / Lines
- **85%** Branches
- **88%** Functions
