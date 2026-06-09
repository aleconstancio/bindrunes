<script lang="ts">
let { label = "", ...rest } = $props();
</script>

<Button {...rest}>
	{#snippet children()}{label}{/snippet}
</Button>
