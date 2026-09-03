# Build a Copilot in 5 Minutes

This tutorial walks you through building a working LLM chat interface using urupe-ui agentic composables and copilot components.

## Prerequisites

```bash
npm install urupe-ui
```

urupe-ui requires Svelte 5 with runes mode enabled.

---

## Step 1: Set Up the Provider

Every copilot needs a window store. Wrap your app (or chat subtree) with `createWindowStoreProvider`:

```svelte
<script lang="ts">
  import { createWindowStoreProvider } from "urupe-ui/agentic";

  const store = createWindowStoreProvider({ budgetCap: 8192 });
</script>

{@render children()}
```

This creates a reactive `WindowStore` and puts it into Svelte context so any child component can access it via `useWindowStore()`.

---

## Step 2: Build the Chat UI

Create the main chat component. It uses `CopilotMessageList` for the message feed and `CopilotInput` for the composer:

```svelte
<script lang="ts">
  import {
    useWindowStore,
    useOrchestrator,
    useTokenBudget,
  } from "urupe-ui/agentic";
  import {
    CopilotMessageList,
    CopilotInput,
    CopilotStreamIndicator,
  } from "urupe-ui/domains/agentic";
  import type { CopilotMessage } from "urupe-ui/domains/agentic";
  import type { AgentRuntime } from "urupe-ui/agentic";

  const store = useWindowStore();

  // Replace with your real LLM runtime
  const runtime: AgentRuntime = {
    tools: [],
    async *complete(req, signal) {
      // Your LLM API call goes here
      // Must yield Delta objects: { kind: "token", text }, { kind: "done", finishReason: "stop" }
    },
  };

  // Create the window
  store.createRoot({});

  // Token budget
  const budget = useTokenBudget({ cap: 8192 });

  // Orchestrator for multi-turn loops
  const orchestrator = useOrchestrator({
    store,
    runtime,
    maxTurns: 10,
    timeout: 30000,
    onTurnComplete: (turn) => {
      console.log("Turn complete:", turn.content);
    },
  });

  let messages = $state<CopilotMessage[]>([]);
  let streamingContent = $state("");
  let status = $state<"connected" | "disconnected" | "connecting" | "reconnecting">("connected");

  function handleSend(message: string) {
    // Add user message to UI
    messages.push({
      id: crypto.randomUUID(),
      content: message,
      role: "user",
      timestamp: new Date(),
    });

    // Run the orchestrator
    orchestrator.start(message);

    // Watch orchestrator messages to update UI
    $effect(() => {
      const turns = orchestrator.messages;
      messages = turns.map((t) => ({
        id: t.id,
        content: t.content,
        role: t.role === "assistant" ? "agent" : "user",
        timestamp: new Date(t.createdAt),
        toolCalls: t.toolCalls?.map((tc) => ({
          tool: tc.name,
          status: "done" as const,
          result: tc.result,
        })),
      }));
    });
  }
</script>

<div class="flex flex-col h-full">
  <CopilotMessageList
    {messages}
    {streamingContent}
    {status}
    suggestions={[]}
    mode="global"
    onQuickAction={handleSend}
  />

  {#if orchestrator.status === "running"}
    <CopilotStreamIndicator />
  {/if}

  <CopilotInput
    status={status === "connected" ? "connected" : "disconnected"}
    mode="global"
    onSend={handleSend}
  />
</div>
```

---

## Step 3: Add Streaming Feedback

The `CopilotStreamIndicator` shows a bouncing dots animation while the LLM is streaming. You already added it above — it reacts to orchestrator status:

```svelte
{#if orchestrator.status === "running"}
  <CopilotStreamIndicator />
{/if}
```

---

## Step 4: Add Tool Calling (Optional)

If your runtime supports tools, define them and pass a `toolHandler` to the orchestrator:

```svelte
<script lang="ts">
  import { useOrchestrator } from "urupe-ui/agentic";
  import type { ToolSpec } from "urupe-ui/agentic";

  const tools: ToolSpec[] = [
    {
      name: "search_cases",
      description: "Search legal cases by keyword",
      parameters: {
        type: "object",
        properties: {
          query: { type: "string", description: "Search query" },
        },
        required: ["query"],
      },
    },
  ];

  const runtime: AgentRuntime = {
    tools,
    async *complete(req, signal) {
      // Your LLM API call with tool support
    },
  };

  async function handleToolCall(name: string, args: unknown): Promise<unknown> {
    switch (name) {
      case "search_cases":
        // Your tool implementation
        return { results: [] };
      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  }

  const orchestrator = useOrchestrator({
    store,
    runtime,
    maxTurns: 10,
    toolHandler: handleToolCall,
    onToolCall: (name, args) => {
      console.log("Tool called:", name, args);
    },
  });
</script>

{#if orchestrator.messages.some((t) => t.toolCalls?.length)}
  <CopilotToolPanel
    toolCategories={[{
      id: "actions",
      label: "Actions",
      tools: tools.map((t) => ({
        id: t.name,
        label: t.name,
        description: t.description,
        params: {},
      })),
    }]}
    activeCategory="actions"
    {status}
    onSelectCategory={() => {}}
    onSendToolCall={(toolId, params) => handleToolCall(toolId, params)}
  />
{/if}
```

---

## Step 5: Add Context Sidebar (Optional)

Show token usage with `CopilotContextSidebar`:

```svelte
<script lang="ts">
  import { CopilotContextSidebar } from "urupe-ui/domains/agentic";

  const budget = useTokenBudget({ cap: 8192 });
</script>

<CopilotContextSidebar
  contextLoaded={true}
  contextTokens={budget.used}
  maxTokens={budget.cap}
  contextLayers={[
    { name: "Working", tokens: budget.working },
    { name: "Episodic", tokens: budget.episodic },
    { name: "Semantic", tokens: budget.semantic },
  ]}
  {status}
/>
```

---

## Full Working Example

See the complete copilot example at `examples/copilot` in the urupe-ui repository.

---

## Next Steps

- [API Reference](./api-reference.md) — full type signatures for every composable and component
- [Overview](./overview.md) — architecture and module inventory
