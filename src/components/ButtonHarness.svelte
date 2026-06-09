<script lang="ts">
	import Button from './Button.svelte';
	let { label = '', ...rest } = $props();
</script>

<Button {...rest}>
	{#snippet children()}{label}{/snippet}
</Button>
