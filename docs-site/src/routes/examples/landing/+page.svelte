<script lang="ts">
import { Badge, Button, Card, PageSection } from "bindrunes";
</script>

<div class="p-6 lg:p-8 max-w-4xl">
  <Badge variant="primary">Examples</Badge>
  <h1 class="mt-4 text-display-1 text-foreground">Landing</h1>
  <p class="mt-3 text-body-lg text-muted-foreground">
    Marketing landing page example using bindrunes landing components.
  </p>

  <div class="mt-10 space-y-10">
    <section>
      <h2 class="text-title-1 text-foreground mb-4">Overview</h2>
      <p class="text-body text-muted-foreground mb-4">
        This example demonstrates a marketing landing page built with bindrunes, featuring:
      </p>
      <ul class="text-body text-muted-foreground space-y-2 list-disc list-inside">
        <li>Hero section with badge, title, description, and CTAs</li>
        <li>Feature grid with cards</li>
        <li>Pricing table with monthly/annual toggle</li>
        <li>Testimonials and social proof</li>
        <li>FAQ accordion section</li>
        <li>Newsletter signup form</li>
        <li>Site footer with link columns</li>
      </ul>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">Landing Components</h2>
      <PageSection size="2xl" spacing="compact">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card variant="glass" padding>
            <h3 class="text-title-2">HeroBanner</h3>
            <p class="text-body-sm text-muted-foreground mt-2">Hero section with badge, title, description, CTAs.</p>
          </Card>
          <Card variant="glass" padding>
            <h3 class="text-title-2">FeatureGrid</h3>
            <p class="text-body-sm text-muted-foreground mt-2">Feature cards in 2/3/4 column grid.</p>
          </Card>
          <Card variant="glass" padding>
            <h3 class="text-title-2">PricingTable</h3>
            <p class="text-body-sm text-muted-foreground mt-2">3-tier pricing with monthly/annual toggle.</p>
          </Card>
          <Card variant="glass" padding>
            <h3 class="text-title-2">Testimonial</h3>
            <p class="text-body-sm text-muted-foreground mt-2">Customer testimonials and social proof.</p>
          </Card>
          <Card variant="glass" padding>
            <h3 class="text-title-2">FAQ</h3>
            <p class="text-body-sm text-muted-foreground mt-2">Accordion FAQ section.</p>
          </Card>
          <Card variant="glass" padding>
            <h3 class="text-title-2">Newsletter</h3>
            <p class="text-body-sm text-muted-foreground mt-2">Email signup form.</p>
          </Card>
        </div>
      </PageSection>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">Recommended Theme</h2>
      <p class="text-body text-muted-foreground mb-4">
        For marketing pages, use the expressive aesthetic with spacious density:
      </p>
      <code class="block p-4 rounded-lg bg-surface-1 border border-border font-mono text-sm text-muted-foreground">
        minimal x expressive x spacious
      </code>
      <p class="text-body text-muted-foreground mt-3">
        This gives you dramatic shadows, gradient buttons, mesh textures, and generous whitespace.
      </p>
    </section>
  </div>
</div>
