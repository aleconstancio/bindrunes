<script lang="ts">
import { Badge, Button, Card, PageSection } from "bindrunes";
</script>

<div class="p-6 lg:p-8 max-w-5xl">
  <div class="mb-8">
    <Badge variant="primary">Migration Guides</Badge>
    <h1 class="mt-4 text-display-1 text-foreground">Migration</h1>
    <p class="mt-3 text-body-lg text-muted-foreground max-w-2xl">
      Step-by-step guides for migrating from other component libraries to bindrunes.
    </p>
  </div>

  <PageSection size="2xl" spacing="compact">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <a href="/migration/shadcn-svelte" class="block">
        <Card variant="glass" interactive padding>
          <h3 class="text-title-1">From shadcn-svelte</h3>
          <p class="text-body-sm text-muted-foreground mt-2">Component mapping, HSL to OKLCH, and Zod to Valibot migration.</p>
        </Card>
      </a>
      <a href="/migration/melt-ui" class="block">
        <Card variant="glass" interactive padding>
          <h3 class="text-title-1">From melt-ui</h3>
          <p class="text-body-sm text-muted-foreground mt-2">Builder functions to components, headless to styled.</p>
        </Card>
      </a>
      <a href="/migration/skeleton" class="block">
        <Card variant="glass" interactive padding>
          <h3 class="text-title-1">From Skeleton</h3>
          <p class="text-body-sm text-muted-foreground mt-2">Theme system migration, token mapping, and setup changes.</p>
        </Card>
      </a>
    </div>
  </PageSection>
</div>
