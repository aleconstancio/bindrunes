<script lang="ts">
import { Badge, CodeSnippet } from "bindrunes";
</script>

<div class="p-6 lg:p-8 max-w-4xl">
  <Badge variant="primary">Docs</Badge>
  <h1 class="mt-4 text-display-1 text-foreground">Testing</h1>
  <p class="mt-3 text-body-lg text-muted-foreground">
    All components and utilities are tested using Vitest and testing-library/svelte.
  </p>

  <div class="mt-10 space-y-10">
    <section>
      <h2 class="text-title-1 text-foreground mb-4">Conventions</h2>
      <ul class="text-body text-muted-foreground space-y-2 list-disc list-inside">
        <li><strong>Co-location:</strong> Test files reside next to their implementation (e.g. <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">Button.svelte.test.ts</code> next to <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">Button.svelte</code>).</li>
        <li><strong>Naming:</strong> Components use <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">&lt;Name&gt;.svelte.test.ts</code>; composables use <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">&lt;name&gt;.svelte.test.ts</code>.</li>
      </ul>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">Test Helpers</h2>
      <p class="text-body text-muted-foreground mb-4">
        Located in <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">src/helpers/</code>:
      </p>
      <div class="space-y-3">
        <div class="p-3 rounded-lg bg-surface-1 border border-border">
          <h3 class="text-title-2 text-foreground mb-1">mountComposable</h3>
          <p class="text-body-sm text-muted-foreground">Instantiates composables inside Svelte component contexts.</p>
        </div>
        <div class="p-3 rounded-lg bg-surface-1 border border-border">
          <h3 class="text-title-2 text-foreground mb-1">expectNoAxeViolations</h3>
          <p class="text-body-sm text-muted-foreground">Validates a11y standards.</p>
        </div>
        <div class="p-3 rounded-lg bg-surface-1 border border-border">
          <h3 class="text-title-2 text-foreground mb-1">mockBitsUi</h3>
          <p class="text-body-sm text-muted-foreground">Mocks bits-ui layout primitives to avoid JSDOM errors.</p>
        </div>
        <div class="p-3 rounded-lg bg-surface-1 border border-border">
          <h3 class="text-title-2 text-foreground mb-1">renderWithTheme</h3>
          <p class="text-body-sm text-muted-foreground">Wraps components inside host containers set to target themes.</p>
        </div>
      </div>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">Testing Patterns</h2>

      <h3 class="text-title-2 text-foreground mb-3">Render Tests</h3>
      <p class="text-body text-muted-foreground mb-3">
        Basic smoke tests verify that components render without errors and display expected content.
      </p>
      <CodeSnippet language="ts" title="Button.svelte.test.ts">
{`import { describe, it } from "vitest";
import { render } from "@testing-library/svelte";
import Button from "./Button.svelte";

describe("Button", () => {
  it("renders children", () => {
    const { getByText } = render(Button, {
      props: { children: "Submit" }
    });
  });

  it("applies variant styles", () => {
    const { container } = render(Button, {
      props: { variant: "destructive", children: "Delete" }
    });
  });
});`}
      </CodeSnippet>

      <h3 class="text-title-2 text-foreground mt-6 mb-3">Accessibility Tests</h3>
      <p class="text-body text-muted-foreground mb-3">
        Every component must pass automated axe checks. Use <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">vitest-axe</code> assertions.
      </p>
      <CodeSnippet language="ts" title="a11y pattern">
{`import { render } from "@testing-library/svelte";
import { expectNoAxeViolations } from "../helpers/axe";

it("passes accessibility checks", async () => {
  const { container } = render(Button, {
    props: { children: "A11y" }
  });
  await expectNoAxeViolations(container);
});`}
      </CodeSnippet>

      <h3 class="text-title-2 text-foreground mt-6 mb-3">Smoke Tests</h3>
      <p class="text-body text-muted-foreground mb-3">
        Verify that a component renders all key states without throwing.
      </p>
      <CodeSnippet language="ts" title="Smoke test pattern">
{`import { describe, it } from "vitest";
import { render } from "@testing-library/svelte";
import Card from "./Card.svelte";

describe("Card smoke", () => {
  it("renders default", () => {
    render(Card, { props: { children: "Content" } });
  });

  it("renders all variants", () => {
    for (const variant of ["surface", "glass", "outlined", "ghost"]) {
      render(Card, {
        props: { variant, children: "Content" }
      });
    }
  });
});`}
      </CodeSnippet>

      <h3 class="text-title-2 text-foreground mt-6 mb-3">Composable Tests</h3>
      <p class="text-body text-muted-foreground mb-3">
        Use <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">mountComposable</code> to test composables inside a Svelte context.
      </p>
      <CodeSnippet language="ts" title="Composable test pattern">
{`import { describe, it } from "vitest";
import { mountComposable } from "../helpers/composable";
import { createCounter } from "./counter.svelte";

describe("createCounter", () => {
  it("increments", () => {
    const counter = mountComposable(createCounter);
    counter.increment();
    expect(counter.count).toBe(1);
  });
});`}
      </CodeSnippet>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">Testing Svelte 5 Components</h2>
      <ul class="text-body text-muted-foreground space-y-3 list-disc list-inside">
        <li><strong>Runes:</strong> Use <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">$state</code>, <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">$derived</code>, <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">$effect</code> — never legacy stores.</li>
        <li><strong>Snippets:</strong> Pass content via <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">{`{#snippet name()}...{/snippet}`}</code> blocks.</li>
        <li><strong>Event handling:</strong> Use <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">onclick</code> props instead of <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">on:click</code>.</li>
        <li><strong>Props:</strong> Use <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">let &#123; children &#125; = $props()</code> — not <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">export let</code>.</li>
        <li><strong>Biome:</strong> Ensure <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">bun run lint</code> passes. Tabs, double quotes, semicolons.</li>
      </ul>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">Example Pattern</h2>
      <CodeSnippet language="ts" title="Button.svelte.test.ts">
{`import { describe, it } from "vitest";
import { render } from "@testing-library/svelte";
import { expectNoAxeViolations } from "../helpers/axe";
import Button from "./Button.svelte";

describe("Button", () => {
  it("renders children", () => {
    const { getByText } = render(Button, { props: { children: "Submit" } });
  });

  it("passes accessibility checks", async () => {
    const { container } = render(Button, { props: { children: "A11y" } });
    await expectNoAxeViolations(container);
  });
});`}
      </CodeSnippet>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">Coverage & Commands</h2>
      <p class="text-body text-muted-foreground mb-4">
        Vitest enforces coverage targets:
      </p>
      <ul class="text-body text-muted-foreground space-y-2 list-disc list-inside mb-4">
        <li><strong>Global:</strong> 80% lines & statements, 70% branches, 77% functions.</li>
        <li><strong>Agentic:</strong> 90% lines & statements, 85% branches, 88% functions.</li>
      </ul>
      <CodeSnippet language="bash" title="Commands">
{`bun run test           # Run tests
bun run test:coverage  # Coverage report
bun run lint           # Check formatting
bun run check          # TypeScript check`}
      </CodeSnippet>
    </section>
  </div>
</div>
