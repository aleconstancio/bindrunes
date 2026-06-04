<script lang="ts">
	import ThemeStudio from './ThemeStudio.svelte';

	let {
		children,
		...rest
	}: Record<string, unknown> & { children?: import('svelte').Snippet } = $props();
</script>

<ThemeStudio {...rest}>
	{@render children?.()}
</ThemeStudio>
