<script lang="ts">
import { Badge, CodeSnippet } from "bindrunes";
</script>

<div class="p-6 lg:p-8 max-w-4xl">
  <Badge variant="primary">Agentic</Badge>
  <h1 class="mt-4 text-display-1 text-foreground">Agentic API Reference</h1>
  <p class="mt-3 text-body-lg text-muted-foreground">
    Complete type signatures for all agentic composables, types, and copilot components.
  </p>

  <div class="mt-10 space-y-10">
    <section>
      <h2 class="text-title-1 text-foreground mb-4">Types</h2>

      <h3 class="text-title-2 text-foreground mb-3">Window</h3>
      <CodeSnippet language="ts">
{`interface Window {
  id: WindowId;
  parentId: WindowId | null;
  turns: Turn[];
  tokenBudget: TokenBudget;
}`}
      </CodeSnippet>

      <h3 class="text-title-2 text-foreground mb-3 mt-6">Turn</h3>
      <CodeSnippet language="ts">
{`interface Turn {
  role: "user" | "assistant" | "system" | "tool";
  content: string;
  toolCalls?: ToolCall[];
  toolResults?: ToolResult[];
}`}
      </CodeSnippet>

      <h3 class="text-title-2 text-foreground mb-3 mt-6">AgentRuntime</h3>
      <CodeSnippet language="ts">
{`interface AgentRuntime {
  readonly tools: ReadonlyArray<ToolSpec>;
  complete(req: CompletionRequest, signal: AbortSignal): AsyncIterable<Delta>;
  embed?(input: string, signal: AbortSignal): Promise<Float32Array>;
}`}
      </CodeSnippet>

      <h3 class="text-title-2 text-foreground mb-3 mt-6">Delta</h3>
      <CodeSnippet language="ts">
{`type Delta =
  | { kind: "text"; content: string }
  | { kind: "tool_call"; name: string; args: unknown }
  | { kind: "tool_result"; name: string; result: unknown }
  | { kind: "done" }
  | { kind: "error"; message: string };`}
      </CodeSnippet>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">Composables</h2>

      <h3 class="text-title-2 text-foreground mb-3">createWindowStore</h3>
      <CodeSnippet language="ts">
{`function createWindowStore(options?: { budgetCap?: number }): WindowStore;`}
      </CodeSnippet>
      <p class="text-body text-muted-foreground mt-2">Creates a reactive context window manager.</p>

      <h3 class="text-title-2 text-foreground mb-3 mt-6">useTokenBudget</h3>
      <CodeSnippet language="ts">
{`function useTokenBudget(options: { cap: number }): TokenBudget;`}
      </CodeSnippet>
      <p class="text-body text-muted-foreground mt-2">Tracks token usage across three layers: working, episodic, semantic.</p>

      <h3 class="text-title-2 text-foreground mb-3 mt-6">createConversationBranches</h3>
      <CodeSnippet language="ts">
{`function createConversationBranches(windows: Window[], rootId: WindowId): BranchTree;`}
      </CodeSnippet>
      <p class="text-body text-muted-foreground mt-2">Derives a branch tree from a flat list of windows.</p>

      <h3 class="text-title-2 text-foreground mb-3 mt-6">useOrchestrator</h3>
      <CodeSnippet language="ts">
{`function useOrchestrator(options: {
  store: WindowStore;
  runtime: AgentRuntime;
  maxTurns?: number;
  timeout?: number;
  toolHandler?: (name: string, args: unknown) => Promise<unknown>;
  onTurnComplete?: (turn: Turn) => void;
}): Orchestrator;`}
      </CodeSnippet>
      <p class="text-body text-muted-foreground mt-2">Coordinates multi-turn agent loops with tool calling.</p>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">Context Wrappers</h2>

      <h3 class="text-title-2 text-foreground mb-3">createWindowStoreProvider</h3>
      <CodeSnippet language="ts">
{`function createWindowStoreProvider(options?: { budgetCap?: number }): WindowStore;`}
      </CodeSnippet>
      <p class="text-body text-muted-foreground mt-2">Creates a WindowStore and sets it into Svelte context.</p>

      <h3 class="text-title-2 text-foreground mb-3 mt-6">useWindowStore</h3>
      <CodeSnippet language="ts">
{`function useWindowStore(): WindowStore;`}
      </CodeSnippet>
      <p class="text-body text-muted-foreground mt-2">Retrieves the WindowStore from Svelte context. Throws if no provider is mounted.</p>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">Copilot Components</h2>
      <p class="text-body text-muted-foreground mb-4">
        Import from <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">bindrunes/domains/agentic</code>
      </p>

      <h3 class="text-title-2 text-foreground mb-3">CopilotMessageList</h3>
      <div class="overflow-x-auto">
        <table class="w-full text-body text-muted-foreground">
          <thead><tr class="border-b border-border"><th class="text-left py-2 pr-4 text-label-sm text-foreground">Prop</th><th class="text-left py-2 pr-4 text-label-sm text-foreground">Type</th><th class="text-left py-2 text-label-sm text-foreground">Description</th></tr></thead>
          <tbody class="divide-y divide-border/50">
            <tr><td class="py-2 pr-4">messages</td><td class="py-2 pr-4">CopilotMessage[]</td><td class="py-2">Array of messages</td></tr>
            <tr><td class="py-2 pr-4">streamingContent</td><td class="py-2 pr-4">string</td><td class="py-2">Current streaming text</td></tr>
            <tr><td class="py-2 pr-4">status</td><td class="py-2 pr-4">ConnectionStatus</td><td class="py-2">Connection status</td></tr>
          </tbody>
        </table>
      </div>

      <h3 class="text-title-2 text-foreground mb-3 mt-6">CopilotInput</h3>
      <div class="overflow-x-auto">
        <table class="w-full text-body text-muted-foreground">
          <thead><tr class="border-b border-border"><th class="text-left py-2 pr-4 text-label-sm text-foreground">Prop</th><th class="text-left py-2 pr-4 text-label-sm text-foreground">Type</th><th class="text-left py-2 text-label-sm text-foreground">Description</th></tr></thead>
          <tbody class="divide-y divide-border/50">
            <tr><td class="py-2 pr-4">onSend</td><td class="py-2 pr-4">(text: string) =&gt; void</td><td class="py-2">Send handler</td></tr>
            <tr><td class="py-2 pr-4">status</td><td class="py-2 pr-4">"connected" | "disconnected"</td><td class="py-2">Connection status</td></tr>
            <tr><td class="py-2 pr-4">mode</td><td class="py-2 pr-4">"global" | "workspace"</td><td class="py-2">Input mode</td></tr>
          </tbody>
        </table>
      </div>

      <h3 class="text-title-2 text-foreground mb-3 mt-6">CopilotStreamIndicator</h3>
      <p class="text-body text-muted-foreground">No required props. Shows bouncing dots animation while LLM is streaming.</p>

      <h3 class="text-title-2 text-foreground mb-3 mt-6">CopilotToolPanel</h3>
      <div class="overflow-x-auto">
        <table class="w-full text-body text-muted-foreground">
          <thead><tr class="border-b border-border"><th class="text-left py-2 pr-4 text-label-sm text-foreground">Prop</th><th class="text-left py-2 pr-4 text-label-sm text-foreground">Type</th><th class="text-left py-2 text-label-sm text-foreground">Description</th></tr></thead>
          <tbody class="divide-y divide-border/50">
            <tr><td class="py-2 pr-4">toolCategories</td><td class="py-2 pr-4">ToolCategory[]</td><td class="py-2">Tool categories to display</td></tr>
            <tr><td class="py-2 pr-4">activeCategory</td><td class="py-2 pr-4">string</td><td class="py-2">Currently active category</td></tr>
            <tr><td class="py-2 pr-4">status</td><td class="py-2 pr-4">ConnectionStatus</td><td class="py-2">Connection status</td></tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</div>
