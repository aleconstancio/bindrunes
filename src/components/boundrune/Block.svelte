<script lang="ts">
import type { Snippet } from "svelte";

type ContainerSize = "prose" | "sm" | "md" | "lg" | "xl" | "2xl" | "full";

let {
	id = undefined as string | undefined,
	class: className = "",
	size = "xl" as ContainerSize,
	background = "none" as "none" | "muted" | "gradient",
	spacing = "normal" as "compact" | "normal" | "wide",
	children,
}: {
	id?: string;
	class?: string;
	size?: ContainerSize;
	background?: "none" | "muted" | "gradient";
	spacing?: "compact" | "normal" | "wide";
	children?: Snippet;
} = $props();

const _spacingY: Record<string, string> = {
	compact: "py-8",
	normal: "py-16",
	wide: "py-24",
};

const _bgClass: Record<string, string> = {
	none: "",
	muted: "bg-muted",
	gradient: "bg-gradient-to-b from-background via-muted/30 to-background",
};
</script>

<section
  {id}
  class="px-6 {spacingY[spacing]} {bgClass[background]} {className}"
>
  <MetaContainer {size}>
    {@render children?.()}
  </MetaContainer>
</section>
