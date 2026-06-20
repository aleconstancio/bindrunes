<script lang="ts">
import type { Snippet } from "svelte";
import TooltipProvider from "../../primitives/TooltipProvider.svelte";
import Tooltip from "../Tooltip.svelte";

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
