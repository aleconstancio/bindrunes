<script lang="ts">
let {
	multiple = false,
	value = $bindable([] as string[]),
	class: className = "",
	children,
}: {
	multiple?: boolean;
	value?: string[];
	class?: string;
	children?: import("svelte").Snippet;
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
