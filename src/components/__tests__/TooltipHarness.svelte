<script lang="ts">
import type { Snippet } from "svelte";
import Tooltip from "../Tooltip.svelte";
import TooltipProvider from "../TooltipProvider.svelte";

let {
	content = "",
	children,
}: {
	content?: string;
	children?: Snippet;
} = $props();
</script>

<TooltipProvider>
  <Tooltip {content}>
    {@render children?.()}
  </Tooltip>
</TooltipProvider>
