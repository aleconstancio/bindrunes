<script lang="ts">
import { Card, Badge, Button } from "bindrunes";

const themes = ["editorial", "dracula", "nord", "catppuccin", "rose-pine", "github"] as const;
const aesthetics = ["minimal", "glass", "bento", "expressive"] as const;
const densities = ["compact", "comfortable", "spacious"] as const;
</script>

<div class="max-w-7xl mx-auto p-6 space-y-8">
  <div>
    <h1 class="text-display-3 mb-2">Theme Grid</h1>
    <p class="text-body-lg text-muted-foreground">All theme × aesthetic × density combinations.</p>
  </div>

  {#each themes as theme}
    <section>
      <h2 class="text-title-1 mb-4 capitalize">{theme}</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {#each aesthetics as aesthetic}
          {#each densities as density}
            <div data-theme={theme} data-aesthetic={aesthetic} data-density={density}>
              <Card variant="glass" padding>
                <div class="space-y-2">
                  <Badge variant="primary">{aesthetic}</Badge>
                  <Badge variant="outline">{density}</Badge>
                  <p class="text-body-sm text-muted-foreground">Theme: {theme}</p>
                  <Button size="sm">Button</Button>
                </div>
              </Card>
            </div>
          {/each}
        {/each}
      </div>
    </section>
  {/each}
</div>
