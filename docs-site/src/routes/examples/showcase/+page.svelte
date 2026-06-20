<script lang="ts">
import { Badge, Button, Card, PageSection } from "bindrunes";
</script>

<div class="p-6 lg:p-8 max-w-4xl">
  <Badge variant="primary">Examples</Badge>
  <h1 class="mt-4 text-display-1 text-foreground">Showcase</h1>
  <p class="mt-3 text-body-lg text-muted-foreground">
    Component showcase with all variants and themes.
  </p>

  <div class="mt-10 space-y-10">
    <section>
      <h2 class="text-title-1 text-foreground mb-4">Button Variants</h2>
      <PageSection size="2xl" spacing="compact">
        <div class="flex flex-wrap gap-3">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="link">Link</Button>
          <Button variant="soft">Soft</Button>
          <Button variant="subtle">Subtle</Button>
        </div>
      </PageSection>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">Card Variants</h2>
      <PageSection size="2xl" spacing="compact">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card variant="surface" padding>
            <h3 class="text-title-2">Surface Card</h3>
            <p class="text-body-sm text-muted-foreground mt-2">Default solid card variant.</p>
          </Card>
          <Card variant="glass" padding>
            <h3 class="text-title-2">Glass Card</h3>
            <p class="text-body-sm text-muted-foreground mt-2">Translucent glass effect.</p>
          </Card>
          <Card variant="outlined" padding>
            <h3 class="text-title-2">Outlined Card</h3>
            <p class="text-body-sm text-muted-foreground mt-2">Border-only card variant.</p>
          </Card>
          <Card variant="ghost" padding>
            <h3 class="text-title-2">Ghost Card</h3>
            <p class="text-body-sm text-muted-foreground mt-2">Minimal ghost variant.</p>
          </Card>
        </div>
      </PageSection>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">Theme Previews</h2>
      <PageSection size="2xl" spacing="compact">
        <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
          {#each ["editorial", "dracula", "nord", "catppuccin", "rose-pine", "github"] as theme}
            <div class="p-4 rounded-lg border border-border bg-surface-1 text-center">
              <p class="text-body-sm font-medium text-foreground">{theme}</p>
            </div>
          {/each}
        </div>
      </PageSection>
    </section>
  </div>
</div>
