<script lang="ts">
import Accordion from "../../Accordion.svelte";
import AccordionItem from "../../AccordionItem.svelte";

let { value = "item-1", triggerText = "Trigger", childrenText = "Panel content" } = $props();
</script>

<Accordion value={[value]}>
	<AccordionItem {value}>
		{#snippet trigger()}{triggerText}{/snippet}
		{childrenText}
	</AccordionItem>
</Accordion>
