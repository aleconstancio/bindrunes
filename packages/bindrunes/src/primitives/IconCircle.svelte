<script lang="ts">
import type { Snippet } from "svelte";

let {
	size = "md",
	tone = "primary",
	children,
}: {
	size?: "sm" | "md" | "lg";
	tone?: "primary" | "accent" | "success" | "warning" | "destructive" | "info" | "neutral";
	children: Snippet;
} = $props();
</script>

<div
	class="inline-flex items-center justify-center rounded-xl {size === 'sm' ? 'h-8 w-8' : size === 'md' ? 'h-10 w-10' : 'h-12 w-12'} bg-{tone}/10 text-{tone}"
>
	{@render children()}
</div>
