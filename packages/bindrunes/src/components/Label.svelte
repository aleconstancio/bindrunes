<script lang="ts">
import { Label } from "bits-ui";
import type { Snippet } from "svelte";

const BitsLabel = Label;

let { for: forEl, children }: { for?: string; children?: Snippet } = $props();
</script>

<BitsLabel.Root for={forEl} class="block text-label-md text-muted-foreground mb-2">
  {@render children?.()}
</BitsLabel.Root>
