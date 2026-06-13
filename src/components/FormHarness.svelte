<script lang="ts">
import Form from "./Form.svelte";

let { text = "", ...rest } = $props();
</script>

<Form {...rest}>
	{#snippet children()}{text}{/snippet}
</Form>
