<script lang="ts">
import { Badge, Button, Card, CodeSnippet, PageSection } from "bindrunes";
</script>

<div class="min-h-screen">
  <!-- Hero -->
  <section class="py-24 text-center relative overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5 pointer-events-none"></div>
    <div class="relative">
      <span class="docs-badge mb-6 inline-flex">Svelte 5 + Tailwind v4</span>
      <h1 class="mt-4 text-display-1 text-foreground tracking-tight">bindrunes</h1>
      <p class="mt-4 text-body-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
        248+ components · 53+ composables · 126 theme combinations · The complete design system for B2B SaaS.
      </p>
      <div class="mt-8 flex items-center justify-center gap-3">
        <Button href="/docs/getting-started" variant="primary" size="lg">Get Started</Button>
        <Button href="https://www.npmjs.com/package/bindrunes" variant="outline" size="lg">npm</Button>
        <Button href="https://github.com/aleconstancio/bindrunes" variant="ghost" size="lg">GitHub</Button>
      </div>
    </div>
  </section>

  <!-- Quick Start -->
  <section class="docs-section max-w-3xl mx-auto px-4">
    <h2 class="text-title-1 text-foreground text-center mb-6">Quick Start</h2>
    <div class="space-y-4">
      <CodeSnippet language="bash" title="Install & scaffold">
{`npx create-bindrunes my-app
cd my-app
bun run dev`}
      </CodeSnippet>
      <p class="text-body-sm text-muted-foreground text-center">Or install manually:</p>
      <CodeSnippet language="bash" title="Manual install">
{`bun add bindrunes`}
      </CodeSnippet>
    </div>
  </section>

  <!-- Features -->
  <section class="docs-section max-w-4xl mx-auto px-4 mt-12">
    <h2 class="text-title-1 text-foreground text-center mb-8">Why bindrunes?</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="docs-card">
        <h3>248+ Components</h3>
        <p>Button, Card, DataTable, Dialog, Form, and more. Every component adapts to your theme.</p>
      </div>
      <div class="docs-card">
        <h3>3-Axis Design System</h3>
        <p>Theme × Aesthetic × Density = 126 unique combinations. OKLCH colors, CSS custom properties.</p>
      </div>
      <div class="docs-card">
        <h3>SvelteKit Integration</h3>
        <p>Full-stack or SPA mode. Auth, API routes, i18n, and deployment adapters built-in.</p>
      </div>
    </div>
  </section>

  <!-- Stats -->
  <section class="docs-section max-w-3xl mx-auto px-4 mt-12">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center py-8 border-y border-border">
      <div>
        <div class="text-display-2 text-foreground">248+</div>
        <div class="text-body-sm text-muted-foreground mt-1">Components</div>
      </div>
      <div>
        <div class="text-display-2 text-foreground">53+</div>
        <div class="text-body-sm text-muted-foreground mt-1">Composables</div>
      </div>
      <div>
        <div class="text-display-2 text-foreground">126</div>
        <div class="text-body-sm text-muted-foreground mt-1">Themes</div>
      </div>
      <div>
        <div class="text-display-2 text-foreground">100%</div>
        <div class="text-body-sm text-muted-foreground mt-1">Svelte 5</div>
      </div>
    </div>
  </section>
</div>
