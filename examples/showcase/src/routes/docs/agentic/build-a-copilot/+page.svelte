<script lang="ts">
import { Badge, CodeSnippet } from "bindrunes";
</script>

<div class="p-6 lg:p-8 max-w-4xl">
  <Badge variant="primary">Agentic</Badge>
  <h1 class="mt-4 text-display-1 text-foreground">Build a Copilot in 5 Minutes</h1>
  <p class="mt-3 text-body-lg text-muted-foreground">
    This tutorial walks you through building a working LLM chat interface using bindrunes agentic composables and copilot components.
  </p>

  <div class="mt-10 space-y-10">
    <section>
      <h2 class="text-title-1 text-foreground mb-4">Prerequisites</h2>
      <CodeSnippet language="bash">
{`npm install bindrunes`}
      </CodeSnippet>
      <p class="text-body text-muted-foreground mt-3">
        bindrunes requires Svelte 5 with runes mode enabled.
      </p>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">Step 1: Set Up the Provider</h2>
      <p class="text-body text-muted-foreground mb-4">
        Every copilot needs a window store. Wrap your app with <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">createWindowStoreProvider</code>:
      </p>
      <CodeSnippet language="svelte">
{`<script lang="ts">
  import { createWindowStoreProvider } from "bindrunes/agentic";

  const store = createWindowStoreProvider({ budgetCap: 8192 });
</script>

{@render children()}`}
      </CodeSnippet>
      <p class="text-body text-muted-foreground mt-3">
        This creates a reactive WindowStore and puts it into Svelte context so any child component can access it via <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">useWindowStore()</code>.
      </p>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">Step 2: Build the Chat UI</h2>
      <p class="text-body text-muted-foreground mb-4">
        Create the main chat component using <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">CopilotMessageList</code> and <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">CopilotInput</code>:
      </p>
      <CodeSnippet language="svelte">
{`<script lang="ts">
  import { useWindowStore, useOrchestrator, useTokenBudget } from "bindrunes/agentic";
  import { CopilotMessageList, CopilotInput, CopilotStreamIndicator } from "bindrunes/domains/agentic";
  import type { CopilotMessage } from "bindrunes/domains/agentic";
  import type { AgentRuntime } from "bindrunes/agentic";

  const store = useWindowStore();

  const runtime: AgentRuntime = {
    tools: [],
    async *complete(req, signal) {
      // Your LLM API call goes here
    },
  };

  store.createRoot({});
  const budget = useTokenBudget({ cap: 8192 });
  const orchestrator = useOrchestrator({ store, runtime, maxTurns: 10, timeout: 30000 });

  let messages = $state<CopilotMessage[]>([]);

  function handleSend(message: string) {
    messages.push({
      id: crypto.randomUUID(),
      content: message,
      role: "user",
      timestamp: new Date(),
    });
    orchestrator.start(message);
  }
</script>

<div class="flex flex-col h-full">
  <CopilotMessageList {messages} mode="global" onQuickAction={handleSend} />
  {#if orchestrator.status === "running"}
    <CopilotStreamIndicator />
  {/if}
  <CopilotInput status="connected" mode="global" onSend={handleSend} />
</div>`}
      </CodeSnippet>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">Step 3: Add Tool Calling (Optional)</h2>
      <p class="text-body text-muted-foreground mb-4">
        If your runtime supports tools, define them and pass a <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">toolHandler</code> to the orchestrator:
      </p>
      <CodeSnippet language="ts">
{`const tools: ToolSpec[] = [
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

async function handleToolCall(name: string, args: unknown): Promise<unknown> {
  switch (name) {
    case "search_cases":
      return { results: [] };
    default:
      throw new Error(\`Unknown tool: \${name}\`);
  }
}

const orchestrator = useOrchestrator({
  store,
  runtime,
  maxTurns: 10,
  toolHandler: handleToolCall,
});`}
      </CodeSnippet>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">Step 4: Add Context Sidebar (Optional)</h2>
      <p class="text-body text-muted-foreground mb-4">
        Show token usage with <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">CopilotContextSidebar</code>:
      </p>
      <CodeSnippet language="svelte">
{`<script lang="ts">
  import { CopilotContextSidebar } from "bindrunes/domains/agentic";
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
/>`}
      </CodeSnippet>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">Next Steps</h2>
      <ul class="text-body text-muted-foreground space-y-2 list-disc list-inside">
        <li><a href="/docs/agentic/api-reference" class="text-primary hover:underline">API Reference</a> — full type signatures for every composable and component</li>
        <li><a href="/docs/agentic" class="text-primary hover:underline">Overview</a> — architecture and module inventory</li>
      </ul>
    </section>
  </div>
</div>
