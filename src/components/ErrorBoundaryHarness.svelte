<script lang="ts">
	import ErrorBoundary from './ErrorBoundary.svelte';
	let { text = '', ...rest } = $props();
</script>

<ErrorBoundary {...rest}>
	{#snippet children()}{text}{/snippet}
</ErrorBoundary>
