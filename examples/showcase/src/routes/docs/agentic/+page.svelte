<script lang="ts">
import { Badge } from "urupe-ui";
</script>

<div class="p-6 lg:p-8 max-w-4xl">
  <Badge variant="primary">Agentic</Badge>
  <h1 class="mt-4 text-display-1 text-foreground">Agentic Chat Kernel & Copilot Components</h1>
  <p class="mt-3 text-body-lg text-muted-foreground">
    Build LLM chat interfaces with token budget management, conversation branching, and persistence.
  </p>

  <div class="mt-10 space-y-10">
    <section>
      <h2 class="text-title-1 text-foreground mb-4">Overview</h2>
      <p class="text-body text-muted-foreground mb-4">
        The agentic subsystem provides two layers:
      </p>
      <ul class="text-body text-muted-foreground space-y-2 list-disc list-inside">
        <li><strong>Kernel</strong> — Composables for building memory-constrained LLM chatbot interfaces. Handles token budget constraints, conversation branching, context compaction, orchestrator loops, eviction, and persistence.</li>
        <li><strong>Copilot Components</strong> — Pre-built Svelte 5 UI components for LLM chat interfaces. Message lists, tool panels, streaming indicators, suggestion cards, reasoning displays.</li>
      </ul>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">Getting Started</h2>
      <p class="text-body text-muted-foreground mb-4">
        New to agentic? Start with the tutorial:
      </p>
      <div class="flex gap-3">
        <a href="/docs/agentic/build-a-copilot" class="inline-flex items-center gap-2 px-4 py-2 rounded-[--radius] bg-primary text-primary-foreground text-body-sm font-medium hover:opacity-90 transition-opacity">
          Build a Copilot in 5 Minutes →
        </a>
        <a href="/docs/agentic/api-reference" class="inline-flex items-center gap-2 px-4 py-2 rounded-[--radius] border border-border text-body-sm font-medium text-foreground hover:bg-accent/50 transition-colors">
          API Reference →
        </a>
      </div>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">Copilot Components</h2>
      <p class="text-body text-muted-foreground mb-4">
        Import from <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">urupe-ui/domains/agentic</code>
      </p>
      <div class="overflow-x-auto">
        <table class="w-full text-body text-muted-foreground">
          <thead>
            <tr class="border-b border-border">
              <th class="text-left py-2 pr-4 text-label-sm text-foreground">Component</th>
              <th class="text-left py-2 text-label-sm text-foreground">Description</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-border/50">
            <tr><td class="py-2 pr-4"><code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">CopilotMessageList</code></td><td class="py-2">Scrollable message list with role-based styling</td></tr>
            <tr><td class="py-2 pr-4"><code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">CopilotInput</code></td><td class="py-2">Message composer with send button and keyboard shortcuts</td></tr>
            <tr><td class="py-2 pr-4"><code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">CopilotStreamIndicator</code></td><td class="py-2">Animated indicator showing LLM is streaming</td></tr>
            <tr><td class="py-2 pr-4"><code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">CopilotToolPanel</code></td><td class="py-2">Display for tool calls and results</td></tr>
            <tr><td class="py-2 pr-4"><code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">CopilotChainProgress</code></td><td class="py-2">Progress indicator for multi-step agent chains</td></tr>
            <tr><td class="py-2 pr-4"><code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">CopilotContextSidebar</code></td><td class="py-2">Sidebar showing conversation context and token usage</td></tr>
            <tr><td class="py-2 pr-4"><code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">CopilotSuggestionCard</code></td><td class="py-2">Clickable suggestion cards for quick prompts</td></tr>
            <tr><td class="py-2 pr-4"><code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">DebateHistoryTree</code></td><td class="py-2">Visual tree of conversation branches</td></tr>
            <tr><td class="py-2 pr-4"><code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">InteractiveCitations</code></td><td class="py-2">Clickable citation references with source links</td></tr>
          </tbody>
        </table>
      </div>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">Kernel Modules</h2>
      <p class="text-body text-muted-foreground mb-4">
        Import from <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">urupe-ui/agentic</code>
      </p>
      <div class="overflow-x-auto">
        <table class="w-full text-body text-muted-foreground">
          <thead>
            <tr class="border-b border-border">
              <th class="text-left py-2 pr-4 text-label-sm text-foreground">Module</th>
              <th class="text-left py-2 text-label-sm text-foreground">Purpose</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-border/50">
            <tr><td class="py-2 pr-4"><code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">createWindowStore</code></td><td class="py-2">Reactive context window manager</td></tr>
            <tr><td class="py-2 pr-4"><code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">useTokenBudget</code></td><td class="py-2">Multi-tier token budgets</td></tr>
            <tr><td class="py-2 pr-4"><code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">createConversationBranches</code></td><td class="py-2">Fork/branch derivations</td></tr>
            <tr><td class="py-2 pr-4"><code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">useOrchestrator</code></td><td class="py-2">Multi-turn agent loop coordination</td></tr>
            <tr><td class="py-2 pr-4"><code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">createPersistenceAdapter</code></td><td class="py-2">Window graph serialization</td></tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</div>
