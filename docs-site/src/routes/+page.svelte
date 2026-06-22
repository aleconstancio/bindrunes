<script lang="ts">
import { Badge, Button, Card, CodeSnippet, PageSection } from "bindrunes";
</script>

<div class="min-h-screen">
  <section class="py-20 text-center">
    <Badge variant="primary" size="lg">Svelte 5 + Tailwind v4</Badge>
    <h1 class="mt-6 text-display-1 text-foreground">bindrunes</h1>
    <p class="mt-4 text-body-lg text-muted-foreground max-w-2xl mx-auto">
      248+ components · 53+ composables · 72 theme combinations · The complete design system for B2B SaaS.
    </p>
    <div class="mt-8 flex items-center justify-center gap-4">
      <Button href="/docs/getting-started" variant="primary" size="lg">Get Started</Button>
      <Button href="https://www.npmjs.com/package/bindrunes" variant="outline" size="lg">npm</Button>
    </div>
  </section>

  <PageSection size="2xl" spacing="compact">
    <h2 class="text-title-1 text-foreground text-center mb-8">Quick Start</h2>
    <div class="max-w-2xl mx-auto mb-12">
      <CodeSnippet language="bash" title="Install & scaffold">
{`npx create-bindrunes my-app
cd my-app
bun run dev`}
      </CodeSnippet>
      <p class="text-body-sm text-muted-foreground mt-3 text-center">
        Or install manually:
      </p>
      <CodeSnippet language="bash" title="Manual install">
{`bun add bindrunes`}
      </CodeSnippet>
    </div>

    <CodeSnippet language="svelte" title="Use in your Svelte files">
{`<script lang="ts">
  import { Button, Card, Input, PageSection } from "bindrunes";
</script>

<PageSection size="2xl" spacing="wide" reveal={false}>
  <Card variant="glass" interactive padding>
    <Input placeholder="Enter text..." />
    <Button variant="primary">Submit</Button>
  </Card>
</PageSection>`}
    </CodeSnippet>
  </PageSection>

  <PageSection size="2xl" spacing="compact">
    <h2 class="text-title-1 text-foreground text-center mb-8">Why bindrunes?</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card variant="glass" padding>
        <h3 class="text-title-1">248+ Components</h3>
        <p class="text-body-sm text-muted-foreground mt-2">Button, Card, DataTable, Dialog, Form, and more. Every component adapts to your theme.</p>
      </Card>
      <Card variant="glass" padding>
        <h3 class="text-title-1">3-Axis Design System</h3>
        <p class="text-body-sm text-muted-foreground mt-2">Theme × Aesthetic × Density = 72 unique combinations. OKLCH colors, CSS custom properties.</p>
      </Card>
      <Card variant="glass" padding>
        <h3 class="text-title-1">SvelteKit Integration</h3>
        <p class="text-body-sm text-muted-foreground mt-2">Full-stack or SPA mode. Auth, API routes, i18n, and deployment adapters built-in.</p>
      </Card>
    </div>
  </PageSection>

  <PageSection size="2xl" spacing="compact">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
      <div>
        <div class="text-display-1 text-foreground">248+</div>
        <div class="text-body-sm text-muted-foreground mt-1">Components</div>
      </div>
      <div>
        <div class="text-display-1 text-foreground">53+</div>
        <div class="text-body-sm text-muted-foreground mt-1">Composables</div>
      </div>
      <div>
        <div class="text-display-1 text-foreground">72</div>
        <div class="text-body-sm text-muted-foreground mt-1">Theme Combinations</div>
      </div>
      <div>
        <div class="text-display-1 text-foreground">100%</div>
        <div class="text-body-sm text-muted-foreground mt-1">Svelte 5 Runes</div>
      </div>
    </div>
  </PageSection>
</div>
