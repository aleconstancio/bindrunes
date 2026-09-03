<script lang="ts">
import { Badge, Button, Card, PageSection } from "urupe-ui";
</script>

<div class="p-6 lg:p-8 max-w-5xl">
  <div class="mb-8">
    <Badge variant="primary">Documentation</Badge>
    <h1 class="mt-4 text-display-1 text-foreground">urupe-ui Docs</h1>
    <p class="mt-3 text-body-lg text-muted-foreground max-w-2xl">
      Everything you need to build with urupe-ui — the complete design system for Svelte 5.
    </p>
  </div>

  <PageSection size="2xl" spacing="compact">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <a href="/docs/getting-started" class="block">
        <Card variant="glass" interactive padding>
          <h3 class="text-title-1">Getting Started</h3>
          <p class="text-body-sm text-muted-foreground mt-2">Installation, Tailwind integration, and quick start guide.</p>
        </Card>
      </a>
      <a href="/docs/architecture" class="block">
        <Card variant="glass" interactive padding>
          <h3 class="text-title-1">Architecture</h3>
          <p class="text-body-sm text-muted-foreground mt-2">Four-layer component hierarchy, design principles, and export structure.</p>
        </Card>
      </a>
      <a href="/docs/components" class="block">
        <Card variant="glass" interactive padding>
          <h3 class="text-title-1">Components</h3>
          <p class="text-body-sm text-muted-foreground mt-2">245+ components across primitives, layouts, domains, and templates.</p>
        </Card>
      </a>
      <a href="/docs/composables" class="block">
        <Card variant="glass" interactive padding>
          <h3 class="text-title-1">Composables</h3>
          <p class="text-body-sm text-muted-foreground mt-2">49+ composables for data, forms, auth, design system, and reactivity.</p>
        </Card>
      </a>
      <a href="/docs/design-system" class="block">
        <Card variant="glass" interactive padding>
          <h3 class="text-title-1">Design System</h3>
          <p class="text-body-sm text-muted-foreground mt-2">Three-axis customization: themes, aesthetics, and density.</p>
        </Card>
      </a>
      <a href="/docs/security" class="block">
        <Card variant="glass" interactive padding>
          <h3 class="text-title-1">Security</h3>
          <p class="text-body-sm text-muted-foreground mt-2">Auth token storage, XSS prevention, CSP, and input validation.</p>
        </Card>
      </a>
      <a href="/docs/testing" class="block">
        <Card variant="glass" interactive padding>
          <h3 class="text-title-1">Testing</h3>
          <p class="text-body-sm text-muted-foreground mt-2">Vitest, testing-library, accessibility checks, and coverage targets.</p>
        </Card>
      </a>
      <a href="/docs/changelog" class="block">
        <Card variant="glass" interactive padding>
          <h3 class="text-title-1">Changelog</h3>
          <p class="text-body-sm text-muted-foreground mt-2">All notable changes to the urupe-ui package.</p>
        </Card>
      </a>
      <a href="/docs/contributing" class="block">
        <Card variant="glass" interactive padding>
          <h3 class="text-title-1">Contributing</h3>
          <p class="text-body-sm text-muted-foreground mt-2">Setup, coding guidelines, and PR process.</p>
        </Card>
      </a>
    </div>
  </PageSection>
</div>
