<script lang="ts">
import { Tooltip as TooltipPrimitive } from "bits-ui";
import type { Snippet } from "svelte";

let {
	delayDuration = 200,
	children,
}: {
	delayDuration?: number;
	children?: Snippet;
} = $props();
</script>

<TooltipPrimitive.Provider {delayDuration}>
  {@render children?.()}
</TooltipPrimitive.Provider>
