<script lang="ts">
import type { Snippet } from "svelte";
import type { ContainerSize } from "../shared-types";
import MetaContainer from "./MetaContainer.svelte";

let {
	id = undefined as string | undefined,
	size = "xl" as ContainerSize,
	background = "none" as "none" | "muted" | "gradient",
	spacing = "normal" as "compact" | "normal" | "wide",
	reveal = true,
	class: className = "",
	header = undefined as Snippet | undefined,
	footer = undefined as Snippet | undefined,
	children,
}: {
	id?: string;
	size?: ContainerSize;
	background?: "none" | "muted" | "gradient";
	spacing?: "compact" | "normal" | "wide";
	reveal?: boolean;
	class?: string;
	header?: Snippet;
	footer?: Snippet;
	children?: Snippet;
} = $props();

const spacingY: Record<string, string> = {
	compact: "py-8",
	normal: "py-16",
	wide: "py-24",
};

const bgClass: Record<string, string> = {
	none: "",
	muted: "bg-muted",
	gradient: "bg-gradient-to-b from-background via-muted/30 to-background",
};
</script>

<section
	{id}
	class="px-6 {spacingY[spacing]} {bgClass[background]} {reveal ? 'section-reveal' : ''} {className}"
>
	<MetaContainer {size}>
		{#if header}
			<div class="mb-8">{@render header()}</div>
		{/if}
		{@render children?.()}
		{#if footer}
			<div class="mt-8">{@render footer()}</div>
		{/if}
	</MetaContainer>
</section>
