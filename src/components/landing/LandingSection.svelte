<script lang="ts">
import type { Snippet } from "svelte";
import type { ContainerSize } from "../../shared-types";
import Block from "../boundrune/Block.svelte";

let {
	id = undefined as string | undefined,
	class: className = "",
	size = "xl" as ContainerSize,
	background = "none" as "none" | "muted" | "gradient",
	spacing = "normal" as "compact" | "normal" | "wide",
	header = undefined as Snippet | undefined,
	footer = undefined as Snippet | undefined,
	children,
}: {
	id?: string;
	class?: string;
	size?: ContainerSize;
	background?: "none" | "muted" | "gradient";
	spacing?: "compact" | "normal" | "wide";
	header?: Snippet;
	footer?: Snippet;
	children?: Snippet;
} = $props();
</script>

<Block {id} {size} {background} {spacing} class="section-reveal {className}">
  {#if header}
    {@render header()}
  {/if}
  {@render children?.()}
  {#if footer}
    {@render footer()}
  {/if}
</Block>
