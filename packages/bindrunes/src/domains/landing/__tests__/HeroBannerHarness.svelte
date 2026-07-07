<script lang="ts">
import HeroBanner from "../HeroBanner.svelte";

let {
	badge,
	titleGradient,
	description,
	ctas,
	footnote,
	background,
	level,
	class: className,
}: {
	badge?: string;
	titleGradient?: boolean;
	description?: string;
	ctas?: Array<{ label: string; href: string; variant?: string; icon?: string }>;
	footnote?: { title: string; description: string };
	background?: "gradient" | "solid" | "none";
	level?: 1 | 2;
	class?: string;
} = $props();
</script>

{#snippet titleSnippet()}Test Title{/snippet}

<HeroBanner
	{badge}
	{titleGradient}
	{description}
	{ctas}
	{footnote}
	{background}
	{level}
	class={className}
	title={titleSnippet}
/>
