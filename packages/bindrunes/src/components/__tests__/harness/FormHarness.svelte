<script lang="ts">
import Form from "../../../domains/data/Form.svelte";

let { text = "", ...rest } = $props();
</script>

<Form {...rest}>
	{#snippet children()}{text}{/snippet}
</Form>
