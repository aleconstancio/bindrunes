<script lang="ts">
import { Accordion } from "bits-ui";
import type { Snippet } from "svelte";

const BitsAccordion = Accordion;

let {
	multiple = false,
	value = $bindable([] as string[]),
	class: className = "",
	children,
}: {
	multiple?: boolean;
	value?: string[];
	class?: string;
	children?: Snippet;
} = $props();

$effect(() => {
	if (!multiple && value.length > 1) {
		value = [value[value.length - 1]];
	}
});
</script>

<BitsAccordion.Root type="multiple" bind:value class="space-y-2 {className}">
	{@render children?.()}
</BitsAccordion.Root>
