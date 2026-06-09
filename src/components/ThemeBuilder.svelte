<!-- @deprecated Use ThemeStudio directly instead. ThemeBuilder is a passthrough alias kept for backward compatibility. -->
<script lang="ts">
let { children, ...rest }: Record<string, unknown> & { children?: import("svelte").Snippet } =
	$props();
</script>

<ThemeStudio {...rest}>
	{@render children?.()}
</ThemeStudio>
