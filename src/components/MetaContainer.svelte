<script lang="ts">
import type { Snippet } from "svelte";

let {
	size = "2xl",
	padding = true,
	class: className = "",
	children,
}: {
	size?: "prose" | "sm" | "md" | "lg" | "xl" | "2xl" | "full";
	padding?: boolean;
	class?: string;
	children?: Snippet;
} = $props();

const widthClass = $derived(
	size === "prose"
		? "max-w-[var(--container-prose)]"
		: size === "sm"
			? "max-w-[var(--container-sm)]"
			: size === "md"
				? "max-w-[var(--container-md)]"
				: size === "lg"
					? "max-w-[var(--container-lg)]"
					: size === "xl"
						? "max-w-[var(--container-xl)]"
						: size === "2xl"
							? "max-w-[var(--container-2xl)]"
							: "max-w-full",
);
</script>

<div class="mx-auto {widthClass} {padding ? 'px-6' : ''} {className}">
  {@render children?.()}
</div>
