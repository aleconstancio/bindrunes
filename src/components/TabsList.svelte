<script lang="ts">
import { Tabs as BitsTabs } from "bits-ui";

let { children }: { children?: import("svelte").Snippet } = $props();
</script>

<BitsTabs.List class="inline-flex h-10 items-center justify-center rounded-[--radius] bg-muted p-1 text-muted-foreground mb-4" style="gap: 0.25rem;">
  {@render children?.()}
</BitsTabs.List>
