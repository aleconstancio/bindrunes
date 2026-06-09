<script lang="ts">
	import { RatingGroup as BitsRatingGroup } from 'bits-ui';

	let {
		value = $bindable(0),
		max = 5,
		disabled = false,
		class: className = '',
	}: {
		value?: number;
		max?: number;
		disabled?: boolean;
		class?: string;
	} = $props();
</script>

<BitsRatingGroup.Root
	bind:value
	{max}
	{disabled}
	class="inline-flex items-center gap-1 {className}"
>
	{#each Array(max) as _, i}
		<BitsRatingGroup.Item
			value={i + 1}
			class="inline-flex items-center justify-center text-headline-3 transition-colors cursor-pointer
			       data-[state=active]:text-warning data-[state=inactive]:text-muted-foreground
			       hover:text-warning
			       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
			       disabled:cursor-not-allowed disabled:opacity-50"
		>
			★
		</BitsRatingGroup.Item>
	{/each}
</BitsRatingGroup.Root>
