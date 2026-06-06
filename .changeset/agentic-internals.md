---
"bindrunes": patch
---

Land the agentic-chat kernel as **internal-only** under `src/utils/agentic/` and
`src/types/agent.ts`. No public API change — no new package subpath is added
in this release; the code is shipped in the tarball and exercised by unit
tests but is not yet importable. The kernel exposes:

- `createWindowStore()` — reactive graph of `Window` objects with `fork`,
  `navigate`, `appendTurn`, `compact`, `remove`. Svelte 5 runes-based;
  generic over typed `TState`.
- `createTokenBudget()` — per-layer (working / episodic / semantic) token
  accounting with `record`, `reset`, overflow detection, integer rounding.
- `createConversationBranches()` — pure derivation of the branch tree
  (BFS from root) with `compareSiblings()` finding the common ancestor and
  diverged-at turn count.
- `SimulatorRuntime` — reference `AgentRuntime` implementation that reads
  scripted `Delta` streams and respects `AbortSignal` (including mid-delay
  abort). The only runtime shipped with bindrunes; consumers bring their own
  for production.
- `src/types/agent.ts` — the typed contract: `WindowId`, `Window`, `Delta`,
  `AgentRuntime`, `CompletionRequest`, `ToolSpec`, `Turn`, `MemoryRef`,
  `EvictionPolicy`, `CompactionPlan`, `CompactionStrategy`, `Message`,
  `MemoryLayer`.
- `src/test-fixtures/scriptedRuns.ts` — reusable `Delta` scripts for tests
  (`greeting`, `toolCall`, `reasoning`, `longReply`, `errors`).

Coverage threshold: 90% lines / 85% branches / 88% functions on
`src/utils/agentic/**` and `src/types/agent.ts`, enforced in CI on top of
the global 80 / 70 / 77 floor.
