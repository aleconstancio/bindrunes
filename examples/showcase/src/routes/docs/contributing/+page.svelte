<script lang="ts">
import { Badge, CodeSnippet } from "urupe-ui";
</script>

<div class="p-6 lg:p-8 max-w-4xl">
  <Badge variant="primary">Docs</Badge>
  <h1 class="mt-4 text-display-1 text-foreground">Contributing</h1>
  <p class="mt-3 text-body-lg text-muted-foreground">
    How to contribute to urupe-ui.
  </p>

  <div class="mt-10 space-y-10">
    <section>
      <h2 class="text-title-1 text-foreground mb-4">Quick Start</h2>
      <CodeSnippet language="bash" title="Terminal">
{`# Clone the repo
git clone https://github.com/aleconstancio/urupe-ui.git
cd urupe-ui

# Install dependencies
bun install

# Start the dev server (showcase app)
bun run dev

# Run tests
bun run test

# Run lint
bun run lint`}
      </CodeSnippet>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">Daily Commands</h2>
      <CodeSnippet language="bash" title="Commands">
{`bun run build         # Build packages
bun run check         # TypeScript check
bun run test          # Run all test suites
bun run test:coverage # Run tests with coverage reports
bun run lint          # Format check
bun run lint:fix      # Format fix`}
      </CodeSnippet>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">Style Guidelines</h2>
      <p class="text-body text-muted-foreground mb-4">
        We use <strong>Biome</strong> for style and quality checking:
      </p>
      <ul class="text-body text-muted-foreground space-y-2 list-disc list-inside">
        <li><strong>Indentation:</strong> Tabs</li>
        <li><strong>Quotes:</strong> Double quotes for JS/TS</li>
        <li><strong>Semicolons:</strong> Always</li>
        <li><strong>Line Length:</strong> 100 characters</li>
      </ul>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">Architecture Conventions</h2>
      <ul class="text-body text-muted-foreground space-y-3 list-disc list-inside">
        <li><strong>Svelte 5 Runes:</strong> Always use <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">$state</code>, <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">$derived</code>, and <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">$effect</code>. Legacy Svelte stores are forbidden.</li>
        <li><strong>Factory Pattern:</strong> All stateful utilities use the <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">createX()</code> composable pattern.</li>
        <li><strong>Valibot:</strong> Validation schemas must use Valibot, not Zod.</li>
        <li><strong>Colors:</strong> Colors must use OKLCH color custom properties. Direct hex/HSL styling is forbidden.</li>
        <li><strong>Pragmas:</strong> Subsystem sharing uses <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">createMetaContext</code> / <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">useMetaContext</code> and <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">readonlyGetters</code>.</li>
      </ul>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">Adding Files</h2>
      <div class="space-y-3">
        <div class="p-3 rounded-lg bg-surface-1 border border-border">
          <h3 class="text-title-2 text-foreground mb-1">Components</h3>
          <p class="text-body-sm text-muted-foreground">Place in <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">src/components/</code> and export from <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">src/index.ts</code>. Add test files co-located next to implementation with <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">vitest-axe</code> assertions. Update <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">docs/components.md</code>.</p>
        </div>
        <div class="p-3 rounded-lg bg-surface-1 border border-border">
          <h3 class="text-title-2 text-foreground mb-1">Composables</h3>
          <p class="text-body-sm text-muted-foreground">Place in <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">src/utils/</code> and suffix with <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">.svelte.ts</code> if runes are used. Add tests using the <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">mountComposable</code> helper. Update <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">docs/composables.md</code>.</p>
        </div>
        <div class="p-3 rounded-lg bg-surface-1 border border-border">
          <h3 class="text-title-2 text-foreground mb-1">Themes & Aesthetics</h3>
          <p class="text-body-sm text-muted-foreground">Define color custom properties (<code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">themes/</code>) or layout tokens (<code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">aesthetics/</code>). Update <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">docs/design-system.md</code>.</p>
        </div>
      </div>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">PR Requirements</h2>
      <ol class="text-body text-muted-foreground space-y-3 list-decimal list-inside">
        <li>Create a topic branch from <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">main</code>.</li>
        <li>Ensure <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">lint</code>, <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">check</code>, and <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">test</code> passes locally.</li>
        <li><strong>Add a changeset</strong> for any user-facing change:
          <CodeSnippet language="bash" title="Terminal">
{`bun run changeset`}
          </CodeSnippet>
          Select the bump type (major/minor/patch) and write a short summary. Changesets are required for all bug fixes, features, and chores that affect the published package.
        </li>
        <li>Open a PR with a description of the changes. Commit logs must follow Conventional Commits (e.g. <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">feat: ...</code>, <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">fix: ...</code>).</li>
      </ol>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">Test Coverage Requirements</h2>
      <ul class="text-body text-muted-foreground space-y-2 list-disc list-inside">
        <li><strong>Global floor:</strong> 80% lines/statements, 77% functions, 70% branches.</li>
        <li><strong>Agentic kernel</strong> (<code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">src/utils/agentic/**</code>, <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">src/types/agent.ts</code>): 90% lines, 88% functions, 85% branches. TDD is required for agentic code.</li>
        <li>Run <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">bun run test:coverage</code> to check coverage locally. CI enforces these thresholds.</li>
        <li>Use <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">vitest-axe</code> for all component tests: <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">await expectNoAxeViolations(container)</code>.</li>
      </ul>
    </section>
  </div>
</div>
