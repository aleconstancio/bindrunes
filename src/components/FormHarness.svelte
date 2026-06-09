<script lang="ts">
let { text = "", ...rest } = $props();
</script>

<Form {...rest}>
	{#snippet children()}{text}{/snippet}
</Form>
