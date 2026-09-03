<script lang="ts">
import { Badge, Button, Card, PageSection } from "urupe-ui";
</script>

<div class="p-6 lg:p-8 max-w-5xl">
  <div class="mb-8">
    <Badge variant="primary">SvelteKit Integration</Badge>
    <h1 class="mt-4 text-display-1 text-foreground">urupe-ui Kit</h1>
    <p class="mt-3 text-body-lg text-muted-foreground max-w-2xl">
      SvelteKit scaffolding with SSR, auth, API routes, and deployment adapters.
    </p>
  </div>

  <PageSection size="2xl" spacing="compact">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <a href="/kit/getting-started" class="block">
        <Card variant="glass" interactive padding>
          <h3 class="text-title-1">Getting Started</h3>
          <p class="text-body-sm text-muted-foreground mt-2">Create a new project with npx create-bindrunes.</p>
        </Card>
      </a>
      <a href="/kit/full-stack" class="block">
        <Card variant="glass" interactive padding>
          <h3 class="text-title-1">Full-Stack Mode</h3>
          <p class="text-body-sm text-muted-foreground mt-2">SSR, server load functions, API routes, and hooks.</p>
        </Card>
      </a>
      <a href="/kit/spa-backend" class="block">
        <Card variant="glass" interactive padding>
          <h3 class="text-title-1">SPA + Backend</h3>
          <p class="text-body-sm text-muted-foreground mt-2">Static SvelteKit frontend with external API backend.</p>
        </Card>
      </a>
      <a href="/kit/auth" class="block">
        <Card variant="glass" interactive padding>
          <h3 class="text-title-1">Authentication</h3>
          <p class="text-body-sm text-muted-foreground mt-2">Server and client-side auth with session management.</p>
        </Card>
      </a>
      <a href="/kit/i18n" class="block">
        <Card variant="glass" interactive padding>
          <h3 class="text-title-1">Internationalization</h3>
          <p class="text-body-sm text-muted-foreground mt-2">Server-side locale detection and client translations.</p>
        </Card>
      </a>
      <a href="/kit/deployment" class="block">
        <Card variant="glass" interactive padding>
          <h3 class="text-title-1">Deployment</h3>
          <p class="text-body-sm text-muted-foreground mt-2">Vercel, Firebase, Node.js, and Docker deployment guides.</p>
        </Card>
      </a>
      <a href="/kit/api-reference" class="block">
        <Card variant="glass" interactive padding>
          <h3 class="text-title-1">API Reference</h3>
          <p class="text-body-sm text-muted-foreground mt-2">Comprehensive reference for all bindrunes-kit exports.</p>
        </Card>
      </a>
    </div>
  </PageSection>
</div>
