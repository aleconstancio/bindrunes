<script lang="ts">
	import { PinInput as BitsPinInput } from 'bits-ui';

	let {
		value = $bindable(['', '', '', ''] as string[]),
		placeholder = '\u25CB',
		disabled = false,
		type = 'text' as 'text' | 'password',
		length = 4,
		class: className = '',
	}: {
		value?: string[];
		placeholder?: string;
		disabled?: boolean;
		type?: 'text' | 'password';
		length?: number;
		class?: string;
	} = $props();
</script>

<BitsPinInput.Root bind:value {placeholder} {disabled} {type} class="flex items-center gap-2 {className}">
	{#each Array(length) as _, i}
		<BitsPinInput.Cell
			{...{ ref: undefined }}
			class="flex h-12 w-12 items-center justify-center rounded-[--radius] border bg-input text-center text-headline-2 text-foreground transition-colors duration-[--duration-snappy]
			       focus-within:ring-2 focus-within:ring-ring focus-within:border-ring
			       data-[state=filled]:border-primary data-[state=active]:border-ring"
		/>
	{/each}
</BitsPinInput.Root>
