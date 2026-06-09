<script lang="ts">
let { text = "", ...rest } = $props();
</script>

<ErrorBoundary {...rest}>
	{#snippet children()}{text}{/snippet}
</ErrorBoundary>
