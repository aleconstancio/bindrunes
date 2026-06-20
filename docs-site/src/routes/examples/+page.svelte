<script lang="ts">
import { Badge, Button, Card, PageSection } from "bindrunes";
</script>

<div class="p-6 lg:p-8 max-w-5xl">
  <div class="mb-8">
    <Badge variant="primary">Examples</Badge>
    <h1 class="mt-4 text-display-1 text-foreground">Examples</h1>
    <p class="mt-3 text-body-lg text-muted-foreground max-w-2xl">
      Example projects and showcases built with bindrunes.
    </p>
  </div>

  <PageSection size="2xl" spacing="compact">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <a href="/examples/showcase" class="block">
        <Card variant="glass" interactive padding>
          <h3 class="text-title-1">Showcase</h3>
          <p class="text-body-sm text-muted-foreground mt-2">Component showcase with all variants and themes.</p>
        </Card>
      </a>
      <a href="/examples/webapp" class="block">
        <Card variant="glass" interactive padding>
          <h3 class="text-title-1">Webapp</h3>
          <p class="text-body-sm text-muted-foreground mt-2">Full-featured SaaS webapp example.</p>
        </Card>
      </a>
      <a href="/examples/landing" class="block">
        <Card variant="glass" interactive padding>
          <h3 class="text-title-1">Landing</h3>
          <p class="text-body-sm text-muted-foreground mt-2">Marketing landing page example.</p>
        </Card>
      </a>
    </div>
  </PageSection>
</div>
