<script lang="ts">
import { Tooltip } from "bits-ui";
import type { Snippet } from "svelte";

const BitsTooltip = Tooltip;

let {
	content = "",
	contentSnippet = undefined as Snippet | undefined,
	side = "top" as "top" | "right" | "bottom" | "left",
	children,
}: {
	content?: string;
	contentSnippet?: Snippet;
	side?: "top" | "right" | "bottom" | "left";
	children?: Snippet;
} = $props();
</script>

<BitsTooltip.Root>
  <BitsTooltip.Trigger class="inline-flex">{@render children?.()}</BitsTooltip.Trigger>
  <BitsTooltip.Content
    {side}
    class="z-[--z-overlay,30] rounded-[--radius] bg-foreground px-2.5 py-1.5 text-body-sm text-background shadow-[--shadow-md]
           data-[state=delayed-open]:animate-in data-[state=closed]:animate-out
           data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0
           data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 max-w-[20rem]"
  >
    {#if contentSnippet}
      {@render contentSnippet()}
    {:else}
      {content}
    {/if}
  </BitsTooltip.Content>
</BitsTooltip.Root>
