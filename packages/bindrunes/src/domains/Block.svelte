<script lang="ts">
import type { Snippet } from "svelte";
import type { ContainerSize } from "../../shared-types";
import PageSection from "../layouts/PageSection.svelte";

let {
	id = undefined as string | undefined,
	class: className = "",
	size = "xl" as ContainerSize,
	background = "none" as "none" | "muted" | "gradient",
	spacing = "normal" as "compact" | "normal" | "wide",
	reveal = false,
	header = undefined as Snippet | undefined,
	footer = undefined as Snippet | undefined,
	children,
}: {
	id?: string;
	class?: string;
	size?: ContainerSize;
	background?: "none" | "muted" | "gradient";
	spacing?: "compact" | "normal" | "wide";
	reveal?: boolean;
	header?: Snippet;
	footer?: Snippet;
	children?: Snippet;
} = $props();
</script>

<PageSection {id} {size} {background} {spacing} {reveal} class={className}>
	{#if header}
		<div class="mb-8">{@render header()}</div>
	{/if}
	{@render children?.()}
	{#if footer}
		<div class="mt-8">{@render footer()}</div>
	{/if}
</PageSection>
