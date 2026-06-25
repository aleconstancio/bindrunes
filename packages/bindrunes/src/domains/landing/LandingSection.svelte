<script lang="ts">
import type { Snippet } from "svelte";
import PageSection from "../../layouts/PageSection.svelte";
import type { ContainerSize } from "../../shared-types";

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

<PageSection {id} class={className} {size} {background} {spacing} reveal {header} {footer}>
	{@render children?.()}
</PageSection>
