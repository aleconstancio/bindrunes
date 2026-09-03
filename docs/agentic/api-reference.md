# Agentic API Reference

Complete type signatures and usage for every agentic composable and copilot component.

---

## Types

Import from `"urupe-ui/agentic"`.

### `WindowId`

Branded string type for window identifiers.

```ts
type WindowId = string & { readonly [windowIdBrand]: "WindowId" };
```

### `toWindowId(s: string): WindowId`

Factory to create a branded `WindowId` from a plain string.

### `Turn`

One conversational exchange in a window.

```ts
interface Turn {
  readonly id: string;
  readonly role: "user" | "assistant" | "system" | "tool";
  readonly content: string;
  readonly toolCalls?: ReadonlyArray<{
    readonly callId: string;
    readonly name: string;
    readonly args: unknown;
    readonly result?: unknown;
    readonly isError?: boolean;
  }>;
  readonly createdAt: number;
  readonly estimatedTokens: number;
  readonly memoryLayer: "working" | "episodic" | "semantic";
}
```

### `Window<TState>`

An isolated context window holding state, turns, and lineage.

```ts
interface Window<TState = unknown> {
  readonly id: WindowId;
  readonly parentId: WindowId | null;
  readonly state: TState;
  readonly turns: ReadonlyArray<Turn>;
  readonly semanticRefs: ReadonlyArray<MemoryRef>;
  readonly budget: { used: number; cap: number };
  readonly policy: EvictionPolicy;
  readonly lineage: { children: ReadonlyArray<WindowId> };
  readonly createdAt: number;
  readonly updatedAt: number;
}
```

### `Delta`

Streaming event union yielded by `AgentRuntime.complete()`.

```ts
type Delta =
  | { kind: "token"; text: string }
  | { kind: "tool_call"; callId: string; name: string; args: unknown }
  | { kind: "tool_result"; callId: string; result: unknown; isError?: boolean }
  | { kind: "reasoning"; text: string }
  | { kind: "usage"; prompt: number; completion: number }
  | { kind: "error"; message: string; recoverable: boolean }
  | { kind: "done"; finishReason: FinishReason };
```

### `FinishReason`

```ts
type FinishReason = "stop" | "length" | "tool" | "cancel";
```

### `isTerminalDelta(d: Delta): boolean`

Returns `true` if `d.kind === "done"` or `d.kind === "error"`.

### `ToolSpec`

```ts
interface ToolSpec {
  readonly name: string;
  readonly description: string;
  readonly parameters: Record<string, unknown>;
}
```

### `Message`

LLM-facing message format (used in `CompletionRequest`).

```ts
interface Message {
  readonly role: "system" | "user" | "assistant" | "tool";
  readonly content: string;
  readonly name?: string;
  readonly toolCallId?: string;
}
```

### `CompletionRequest`

```ts
interface CompletionRequest {
  readonly messages: ReadonlyArray<Message>;
  readonly tools?: ReadonlyArray<ToolSpec>;
  readonly temperature?: number;
  readonly maxTokens?: number;
  readonly signal?: AbortSignal;
}
```

### `AgentRuntime`

Boundary interface your LLM implementation must satisfy.

```ts
interface AgentRuntime {
  readonly tools: ReadonlyArray<ToolSpec>;
  complete(req: CompletionRequest, signal: AbortSignal): AsyncIterable<Delta>;
  embed?(input: string, signal: AbortSignal): Promise<Float32Array>;
}
```

### `MemoryLayer`

```ts
type MemoryLayer = "working" | "episodic" | "semantic";
```

### `MemoryRef`

```ts
interface MemoryRef {
  readonly id: string;
  readonly preview: string;
  readonly estimatedTokens: number;
  readonly pinned: boolean;
}
```

### `EvictionPolicy`

```ts
type EvictionPolicy =
  | { kind: "sliding"; keepLast: number }
  | { kind: "pinned-summary"; summaryTurnIds: ReadonlyArray<string> }
  | { kind: "none" };
```

### `CompactionPlan`

```ts
interface CompactionPlan {
  readonly strategyId: string;
  readonly dropTurnIds: ReadonlyArray<string>;
  readonly pinnedTurnIds: ReadonlyArray<string>;
  readonly summary?: string;
  readonly estimatedTokensAfter: number;
}
```

### `CompactionStrategy`

```ts
interface CompactionStrategy {
  readonly id: string;
  plan(window: Window, budget: { used: number; cap: number }): CompactionPlan;
  apply?(window: Window, plan: CompactionPlan): Promise<Window>;
}
```

---

## Composables

Import from `"urupe-ui/agentic"`.

### `createWindowStore(options?)`

Creates the central state manager for agentic windows.

```ts
function createWindowStore(options?: WindowStoreOptions): WindowStore;
```

**Options:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `budgetCap` | `number` | `4096` | Default token cap for new windows |
| `defaultPolicy` | `EvictionPolicy` | `{ kind: "none" }` | Default eviction policy |

**Returns `WindowStore`:**

| Member | Type | Description |
|--------|------|-------------|
| `windows` | `ReadonlyArray<Window>` | All windows in the graph |
| `activeId` | `WindowId \| null` | ID of the currently active window |
| `active` | `Window \| null` | The currently active window object |
| `roots` | `ReadonlyArray<WindowId>` | IDs of root windows |
| `createRoot<TState>(state)` | `WindowId` | Create a root window and make it active |
| `fork<TState>(fromId, options?)` | `WindowId` | Fork a new window from an existing one |
| `navigate(id)` | `void` | Set the active window |
| `appendTurn(windowId, turn)` | `void` | Append a turn to a window |
| `compact(windowId, plan)` | `void` | Apply a compaction plan to a window |
| `remove(windowId)` | `void` | Remove a window from the graph |

**Example:**

```ts
import { createWindowStore } from "urupe-ui/agentic";

const store = createWindowStore({ budgetCap: 16384 });
const rootId = store.createRoot({ topic: "legal research" });
store.appendTurn(rootId, myTurn);
```

---

### `useTokenBudget(policy)`

Creates a multi-layer token budget tracker.

```ts
function useTokenBudget(policy: TokenBudgetPolicy): TokenBudget;
```

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `policy.cap` | `number` | Maximum token budget |

**Returns `TokenBudget`:**

| Member | Type | Description |
|--------|------|-------------|
| `used` | `number` | Total tokens used |
| `cap` | `number` | Maximum budget |
| `remaining` | `number` | Tokens remaining (`cap - used`, min 0) |
| `overflow` | `boolean` | Whether usage exceeds cap |
| `working` | `number` | Tokens in working layer |
| `episodic` | `number` | Tokens in episodic layer |
| `semantic` | `number` | Tokens in semantic layer |
| `record(usage)` | `void` | Record token usage |
| `reset()` | `void` | Reset all counters |

**`TokenUsage`:**

```ts
interface TokenUsage {
  readonly prompt: number;
  readonly completion: number;
  readonly layer?: MemoryLayer; // defaults to "episodic"
}
```

---

### `createConversationBranches(options)`

Derives branch tree from a flat list of windows.

```ts
function createConversationBranches(options: CreateConversationBranchesOptions): ConversationBranches;
```

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `rootId` | `WindowId` | Root window to derive branches from |
| `windows` | `ReadonlyArray<Window>` | All windows in the graph |

**Returns `ConversationBranches`:**

| Member | Type | Description |
|--------|------|-------------|
| `rootId` | `WindowId` | The root window ID |
| `branches` | `ReadonlyArray<Branch>` | Root-to-leaf paths |
| `leaves` | `ReadonlyArray<WindowId>` | Leaf window IDs |
| `compareSiblings(a, b)` | `SiblingComparison` | Find common ancestor of two windows |

**`Branch`:**

```ts
interface Branch {
  readonly id: WindowId;
  readonly path: ReadonlyArray<WindowId>;
}
```

**`SiblingComparison`:**

```ts
interface SiblingComparison {
  readonly commonAncestor: WindowId;
  readonly divergedAt: number;
}
```

---

### `useOrchestrator(options)`

Coordinates multi-turn agent loops with tool calling and timeouts.

```ts
function useOrchestrator(options: OrchestratorOptions): OrchestratorResult;
```

**Options:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `store` | `WindowStore` | *required* | Window store to operate on |
| `runtime` | `AgentRuntime` | *required* | LLM runtime implementation |
| `maxTurns` | `number` | `10` | Max agent loop iterations |
| `timeout` | `number` | `30000` | Timeout per turn in ms |
| `onTurnComplete` | `(turn: Turn) => void` | — | Callback after each turn |
| `onToolCall` | `(name: string, args: unknown) => void` | — | Callback when a tool is called |
| `toolHandler` | `ToolHandler` | — | Handler that executes tool calls |

**`ToolHandler`:**

```ts
type ToolHandler = (name: string, args: unknown) => Promise<unknown>;
```

**Returns `OrchestratorResult`:**

| Member | Type | Description |
|--------|------|-------------|
| `status` | `"idle" \| "running" \| "completed" \| "error" \| "aborted"` | Current status |
| `currentTurn` | `number` | Current turn number |
| `messages` | `ReadonlyArray<Turn>` | Turns from the active window |
| `error` | `Error \| null` | Error if status is `"error"` |
| `start(input)` | `void` | Start the agent loop |
| `abort()` | `void` | Abort the running agent loop |

---

## Context Wrappers

### `createWindowStoreProvider(options?)`

Creates a `WindowStore` and puts it into Svelte context. Exported as `provideWindowStore` internally.

```ts
function createWindowStoreProvider(options?: Parameters<typeof createWindowStore>[0]): WindowStore;
```

**Example:**

```svelte
<script lang="ts">
  import { createWindowStoreProvider } from "urupe-ui/agentic";
  const store = createWindowStoreProvider({ budgetCap: 8192 });
</script>
```

### `useWindowStore()`

Retrieves the `WindowStore` from Svelte context. Throws if no provider is mounted.

```ts
function useWindowStore(): WindowStore;
```

---

## Eviction Policies

Import from `"urupe-ui/agentic"`.

### `createTokenBudgetEviction(threshold)`

Evicts oldest turns when token usage exceeds `threshold`.

```ts
function createTokenBudgetEviction(threshold: number): EvictionPolicyInstance;
```

### `createAgeEviction(maxAgeMs)`

Evicts turns older than `maxAgeMs` milliseconds.

```ts
function createAgeEviction(maxAgeMs: number): EvictionPolicyInstance;
```

### `createCompositeEviction(...policies)`

Runs multiple eviction policies in sequence.

```ts
function createCompositeEviction(...policies: EvictionPolicyInstance[]): EvictionPolicyInstance;
```

### `EvictionPolicyInstance`

```ts
interface EvictionPolicyInstance {
  shouldEvict(window: Window): boolean;
  evict(window: Window): Window;
}
```

---

## Compaction Strategies

Import from `"urupe-ui/agentic"`.

### `SlidingWindowCompaction`

Drops the oldest turns, keeping only the last N.

```ts
class SlidingWindowCompaction implements CompactionStrategy {
  readonly id: "sliding-window";
  constructor(windowSize: number);
  plan(window: Window): CompactionPlan;
  apply(window: Window, plan: CompactionPlan): Promise<Window>;
}
```

**Example:**

```ts
import { SlidingWindowCompaction } from "urupe-ui/agentic";

const strategy = new SlidingWindowCompaction(20);
const plan = strategy.plan(store.active!);
store.compact(store.active!.id, plan);
```

### `SummarizeCompaction`

Drops old turns and generates a summary using a provided function.

```ts
class SummarizeCompaction implements CompactionStrategy {
  readonly id: "summarize";
  constructor(options: SummarizeCompactionOptions);
  plan(window: Window): CompactionPlan;
  apply(window: Window, plan: CompactionPlan): Promise<Window>;
}
```

**`SummarizeCompactionOptions`:**

```ts
interface SummarizeCompactionOptions {
  readonly keepLast: number;
  readonly summarize: (turns: ReadonlyArray<Turn>) => Promise<string>;
}
```

---

## Persistence

Import from `"urupe-ui/agentic"`.

### `PersistenceAdapter`

```ts
interface PersistenceAdapter {
  save(key: string, data: string): Promise<void>;
  load(key: string): Promise<string | null>;
  remove(key: string): Promise<void>;
}
```

### `createPersistenceAdapter(store, adapter, key)`

Wraps a `WindowStore` with save/load/clear operations.

```ts
function createPersistenceAdapter(
  store: WindowStore,
  adapter: PersistenceAdapter,
  key: string,
): { save(): Promise<void>; load(): Promise<void>; clear(): Promise<void> };
```

**Example:**

```ts
import {
  createWindowStore,
  createLocalStorageAdapter,
  createPersistenceAdapter,
} from "urupe-ui/agentic";

const store = createWindowStore();
const adapter = createPersistenceAdapter(store, createLocalStorageAdapter(), "chat");

// Save state
await adapter.save();

// Load state on page reload
await adapter.load();
```

### `createLocalStorageAdapter(prefix?)`

Browser localStorage adapter.

```ts
function createLocalStorageAdapter(prefix?: string): PersistenceAdapter;
// default prefix: "urupe-ui"
```

### `createIndexedDBAdapter(dbName?)`

IndexedDB adapter for larger state.

```ts
function createIndexedDBAdapter(dbName?: string): PersistenceAdapter;
// default dbName: "urupe-ui-agentic"
```

---

## Simulator Runtime

Import from `"urupe-ui/agentic"`.

### `createSimulatorRuntime(options)`

Mock `AgentRuntime` for tests and offline development. Reads scripted delta streams and respects `AbortSignal` without touching the network.

```ts
function createSimulatorRuntime(options: SimulatorRuntimeOptions): SimulatorRuntime;
```

**Options:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `script` | `ReadonlyArray<Delta>` | Predefined delta sequence to replay |
| `delayMs` | `number` | Delay between deltas (default: `0`) |

**Example:**

```ts
import { createSimulatorRuntime } from "urupe-ui/agentic";

const runtime = createSimulatorRuntime({
  script: [
    { kind: "token", text: "Hello" },
    { kind: "token", text: " world" },
    { kind: "done", finishReason: "stop" },
  ],
  delayMs: 50,
});
```

---

## Copilot Components

Import from `"urupe-ui/domains/agentic"`.

### `CopilotMessageList`

Scrollable message list with role-based styling. Auto-scrolls to bottom on new messages.

```svelte
<CopilotMessageList
  {messages}
  {streamingContent}
  {status}
  {suggestions}
  {mode}
  {onQuickAction}
  {onDismissSuggestion}
  {onActSuggestion}
/>
```

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `messages` | `CopilotMessage[]` | yes | Array of messages to display |
| `streamingContent` | `string` | yes | Partial content being streamed |
| `status` | `ConnectionStatus` | yes | Connection state |
| `suggestions` | `CopilotSuggestion[]` | yes | Suggestions shown when message list is empty |
| `mode` | `"item" \| "global"` | yes | Context mode (per-item or global) |
| `onQuickAction` | `(message: string) => void` | yes | Handler for quick action buttons |
| `onDismissSuggestion` | `(id: string) => void` | no | Handler to dismiss a suggestion |
| `onActSuggestion` | `(id: string, action: SuggestionAction) => void` | no | Handler when suggestion action is clicked |
| `class` | `string` | no | Additional CSS classes |

**`CopilotMessage`:**

```ts
interface CopilotMessage {
  id: string;
  content: string;
  role: "user" | "agent";
  timestamp: Date;
  toolCalls?: CopilotToolCall[];
}
```

---

### `CopilotInput`

Message composer with send button and character count.

```svelte
<CopilotInput
  bind:chatInput
  {status}
  {mode}
  {onSend}
/>
```

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `chatInput` | `string` | no (bindable) | Current input text |
| `status` | `ConnectionStatus` | yes | Connection state; disables input when not connected |
| `mode` | `"item" \| "global"` | yes | Placeholder text varies by mode |
| `onSend` | `(message: string) => void` | yes | Handler when message is submitted |
| `class` | `string` | no | Additional CSS classes |

---

### `CopilotStreamIndicator`

Animated bouncing dots indicator shown while the LLM is streaming.

```svelte
<CopilotStreamIndicator />
```

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `class` | `string` | no | Additional CSS classes |

---

### `CopilotToolPanel`

Tabbed panel displaying available tools grouped by category.

```svelte
<CopilotToolPanel
  {toolCategories}
  {activeCategory}
  {status}
  {onSelectCategory}
  {onSendToolCall}
/>
```

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `toolCategories` | `ToolCategory[]` | yes | Available tool categories |
| `activeCategory` | `string` | yes | Currently selected category ID |
| `status` | `ConnectionStatus` | yes | Connection state; disables tools when not connected |
| `onSelectCategory` | `(categoryId: string) => void` | yes | Category selection handler |
| `onSendToolCall` | `(toolId: string, params: Record<string, unknown>) => void` | yes | Tool execution handler |
| `class` | `string` | no | Additional CSS classes |

**`ToolCategory`:**

```ts
interface ToolCategory {
  id: string;
  label: string;
  tools: Array<{
    id: string;
    label: string;
    description: string;
    icon?: unknown;
    params: Record<string, unknown>;
  }>;
}
```

---

### `CopilotChainProgress`

Progress indicator for multi-step agent chains. Shows step-by-step execution status.

```svelte
<CopilotChainProgress
  {chain}
  {onContinue}
  {onCancel}
/>
```

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `chain` | `CopilotChain` | yes | Current chain state |
| `onContinue` | `(chainName: string) => void` | yes | Continue handler (for `waiting_gate` status) |
| `onCancel` | `(chainName: string) => void` | yes | Cancel handler |
| `class` | `string` | no | Additional CSS classes |

**`CopilotChain`:**

```ts
interface CopilotChain {
  name: string;
  status: "idle" | "running" | "waiting_gate" | "done" | "error";
  steps: CopilotChainStep[];
}
```

---

### `CopilotContextSidebar`

Sidebar showing token usage, context layers, and connection status.

```svelte
<CopilotContextSidebar
  {contextLoaded}
  {contextTokens}
  {maxTokens}
  {contextLayers}
  {status}
/>
```

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `contextLoaded` | `boolean` | yes | Whether context data is loaded |
| `contextTokens` | `number` | yes | Current token usage |
| `maxTokens` | `number` | no | Maximum tokens (default: `10000`) |
| `contextLayers` | `CopilotContextLayer[]` | yes | Token breakdown by layer |
| `status` | `ConnectionStatus` | yes | Connection state |
| `class` | `string` | no | Additional CSS classes |

**`CopilotContextLayer`:**

```ts
interface CopilotContextLayer {
  name: string;
  tokens: number;
}
```

---

### `CopilotSuggestionCard`

Clickable suggestion card with risk level indicator and action buttons.

```svelte
<CopilotSuggestionCard
  {suggestion}
  {onDismiss}
  {onAct}
/>
```

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `suggestion` | `CopilotSuggestion` | yes | Suggestion data |
| `onDismiss` | `(id: string) => void` | yes | Dismiss handler |
| `onAct` | `(id: string, action: SuggestionAction) => void` | yes | Action handler |
| `class` | `string` | no | Additional CSS classes |

**`CopilotSuggestion`:**

```ts
interface CopilotSuggestion {
  id: string;
  title: string;
  description: string;
  risk: "critical" | "high" | "medium" | "low";
  actions: SuggestionAction[];
}
```

---

### `DebateHistoryTree`

Visual timeline of analyst-critic debate turns with approval indicators.

```svelte
<DebateHistoryTree {debateText} />
```

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `debateText` | `string` | no | Raw debate text to parse |
| `class` | `string` | no | Additional CSS classes |

---

### `InteractiveCitations`

Clickable citation references with source links. Parses `source:layer:id` patterns from text.

```svelte
<InteractiveCitations
  {text}
  {onHighlightCitation}
/>
```

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `text` | `string` | yes | Text containing `source:layer:id` citation markers |
| `onHighlightCitation` | `(layer: string, id: string) => void` | no | Callback when citation is clicked |
| `class` | `string` | no | Additional CSS classes |
