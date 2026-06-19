<script lang="ts">
import { Badge, Button, Card, PageSection } from "bindrunes";
</script>

<div class="min-h-screen">
  <section class="py-20 text-center">
    <Badge variant="primary" size="lg">Svelte 5 + Tailwind v4</Badge>
    <h1 class="mt-6 text-display-1 text-foreground">bindrunes</h1>
    <p class="mt-4 text-body-lg text-muted-foreground max-w-2xl mx-auto">
      245+ components · 49+ composables · 72 theme combinations · The complete design system for B2B SaaS.
    </p>
    <div class="mt-8 flex items-center justify-center gap-4">
      <Button href="https://github.com/bindrunes/bindrunes" variant="primary" size="lg">Get Started</Button>
      <Button href="https://www.npmjs.com/package/bindrunes" variant="outline" size="lg">npm</Button>
    </div>
  </section>

  <PageSection size="2xl" spacing="compact">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card variant="glass" padding>
        <h3 class="text-title-1">245+ Components</h3>
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
</div>
