<script lang="ts">
import { Tabs } from "bits-ui";
import type { Snippet } from "svelte";

const BitsTabs = Tabs;

let { children }: { children?: Snippet } = $props();
</script>

<BitsTabs.List class="inline-flex h-10 items-center justify-center gap-1 rounded-[--radius] bg-muted p-1 text-muted-foreground mb-4">
  {@render children?.()}
</BitsTabs.List>
