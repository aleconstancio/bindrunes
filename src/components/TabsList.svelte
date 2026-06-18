<script lang="ts">
import { Tabs } from "bits-ui";

const BitsTabs = Tabs;

let { children }: { children?: import("svelte").Snippet } = $props();
</script>

<BitsTabs.List class="inline-flex h-10 items-center justify-center gap-1 rounded-[--radius] bg-muted p-1 text-muted-foreground mb-4">
  {@render children?.()}
</BitsTabs.List>
