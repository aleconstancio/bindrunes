# Agentic Chat (in development)

> Status: **internal kernel landed in v1.1.0**. Public metacomponents ship in
> v1.2.0 under a new `bindrunes/agentic` subpath. See the [milestone plan][plan]
> for the rollout order.
>
> If you arrived here from a public release note: the kernel exists today and
> is unit-tested, but you cannot import it yet. The M2 release adds the
> subpath and the Svelte components (`<AgentConsole>`, `<ThreadView>`, etc.).

[plan]: ../../CHANGELOG.md

## What is it?

A *metacomponent* suite for building agentic chat UIs in Svelte 5. The same
`<ThreadView>` and `<MessageList>` render correctly whether you point them at
a real OpenAI/Anthropic runtime or the shipped `SimulatorRuntime` for tests
and offline development. The interchange surface is the typed
`AgentRuntime` contract — not a vendor SDK.

## Concepts

| Concept | One-line definition |
|---|---|
| **`Window`** | A first-class, typed context window with a parent, working memory (`state`), episodic memory (`turns`), and a token budget. |
| **`Delta`** | The event emitted by a streaming completion: `token`, `tool_call`, `tool_result`, `reasoning`, `usage`, `error`, or `done`. |
| **`AgentRuntime`** | The contract bindrunes consumes. `complete(req, signal): AsyncIterable<Delta>`. Consumers implement this. |
| **`SimulatorRuntime`** | The reference `AgentRuntime` shipped with bindrunes. Reads scripted `Delta` streams. Hermetic; never touches the network. |
| **`TokenBudget`** | Per-layer (working / episodic / semantic) token accounting with overflow detection. |
| **`CompactionStrategy`** | Pure, structural strategy that produces a `CompactionPlan` (no LLM in defaults). |
| **Branches** | Git-like fork/merge over windows. The `BranchTree` UI navigates them; `compareSiblings()` finds the common ancestor. |

## File layout

```
src/types/agent.ts                              # the contract
src/utils/agentic/
  createWindowStore.svelte.ts                   # reactive window graph
  createTokenBudget.svelte.ts                   # 3-layer token accounting
  createConversationBranches.svelte.ts          # pure branch derivation
  SimulatorRuntime.ts                           # reference runtime
src/test-fixtures/scriptedRuns.ts               # reusable Delta scripts
```

## What is *not* in the kernel

- No provider SDKs (no `openai`, `anthropic`, `ollama` adapters).
- No HTTP, WebSocket, or SSE transport.
- No persistence backend (the contract allows it; M2+ may add an interface).
- No tool sandbox or permission system (valibot schemas are validated by the
  consumer's tool implementations).
- No embeddings, no vector store, no RAG.

The kernel is intentionally tiny. The "intercambial logic" promise is that
*any* runtime that implements `AgentRuntime` works — without changes to the
upcoming M2 components.

## Coverage

A stricter per-glob threshold applies in CI:

| Path | Stmts | Branches | Funcs | Lines |
|---|---|---|---|---|
| `src/utils/agentic/**`, `src/types/agent.ts` | 90% | 85% | 88% | 90% |

See `vitest.config.ts#thresholds`.

## Roadmap

- **M2** — `<AgentProvider>`, `<ThreadView>`, `<MessageList>`, `<TurnBubble>`,
  `<StreamingText>`, `<ToolCallCard>`, `<AgentInput>`. `createThread`,
  `createStreamingDelta`, `createToolRegistry`. **`./agentic` subpath added**.
- **M3** — `<BranchTree>`, `<MemoryInspector>`, `<ContextBudgetMeter>`,
  `<CompactionPreview>`. `createCompactor` (`sliding`, `pinned-summary`).
- **M4** — `<AgentConsole>`. `examples/agentic/` SvelteKit demo.
- **M5** — docs pass; deterministic eval suite.
