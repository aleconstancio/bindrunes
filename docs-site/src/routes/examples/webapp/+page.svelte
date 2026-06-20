<script lang="ts">
import { Badge, Button, Card, PageSection } from "bindrunes";
</script>

<div class="p-6 lg:p-8 max-w-4xl">
  <Badge variant="primary">Examples</Badge>
  <h1 class="mt-4 text-display-1 text-foreground">Webapp</h1>
  <p class="mt-3 text-body-lg text-muted-foreground">
    Full-featured SaaS webapp example using bindrunes components and templates.
  </p>

  <div class="mt-10 space-y-10">
    <section>
      <h2 class="text-title-1 text-foreground mb-4">Overview</h2>
      <p class="text-body text-muted-foreground mb-4">
        This example demonstrates a complete SaaS application built with bindrunes, featuring:
      </p>
      <ul class="text-body text-muted-foreground space-y-2 list-disc list-inside">
        <li>Dashboard with stats, charts, and activity feed</li>
        <li>CRUD management with AdvancedTable and FacetedSearch</li>
        <li>Authentication flows (login, register, forgot password)</li>
        <li>Settings pages with tabbed navigation</li>
        <li>Real-time notifications via ToastProvider</li>
      </ul>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">Templates Used</h2>
      <PageSection size="2xl" spacing="compact">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card variant="glass" padding>
            <h3 class="text-title-2">DashboardTemplate</h3>
            <p class="text-body-sm text-muted-foreground mt-2">App shell with sidebar navigation and content area.</p>
          </Card>
          <Card variant="glass" padding>
            <h3 class="text-title-2">CrudTemplate</h3>
            <p class="text-body-sm text-muted-foreground mt-2">List + detail split layout for data management.</p>
          </Card>
          <Card variant="glass" padding>
            <h3 class="text-title-2">AuthTemplate</h3>
            <p class="text-body-sm text-muted-foreground mt-2">Authentication layout with view switching.</p>
          </Card>
          <Card variant="glass" padding>
            <h3 class="text-title-2">SettingsTemplate</h3>
            <p class="text-body-sm text-muted-foreground mt-2">Settings with tabbed sidebar navigation.</p>
          </Card>
        </div>
      </PageSection>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">Getting Started</h2>
      <p class="text-body text-muted-foreground mb-4">
        Use the CLI to scaffold a webapp project:
      </p>
      <code class="block p-4 rounded-lg bg-surface-1 border border-border font-mono text-sm text-muted-foreground">
        npx create-bindrunes my-app --mode full-stack --features auth,crud,realtime
      </code>
    </section>
  </div>
</div>
