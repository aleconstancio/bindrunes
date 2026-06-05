<script lang="ts">
	import { Combobox as BitsCombobox } from 'bits-ui';

	type Option = { value: string; label: string; disabled?: boolean };

	let {
		value = $bindable(''),
		placeholder = 'Search...',
		options = [] as Option[],
		disabled = false,
		class: className = '',
	}: {
		value?: string;
		placeholder?: string;
		options?: Option[];
		disabled?: boolean;
		class?: string;
	} = $props();

	let inputValue = $state('');

	let filtered = $derived(
		options.filter((o) => o.label.toLowerCase().includes(inputValue.toLowerCase())),
	);
</script>

<BitsCombobox.Root bind:value bind:inputValue {disabled} class="relative {className}">
	<BitsCombobox.Input
		{placeholder}
		class="flex w-full rounded-[--radius] border bg-input px-3 py-2 text-body-md text-foreground placeholder:text-muted-foreground transition-colors duration-[--duration-snappy] focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 disabled:cursor-not-allowed"
		class:border-border={true}
	/>
	<BitsCombobox.Portal>
		<BitsCombobox.Content class="z-[--z-overlay,30] mt-1 max-h-60 w-full overflow-auto rounded-[--radius] border bg-card p-1 shadow-md">
			<BitsCombobox.Viewport>
				{#each filtered as option}
					<BitsCombobox.Item
						value={option.value}
						disabled={option.disabled}
						class="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-body-md text-foreground hover:bg-muted data-[state=checked]:bg-muted focus:outline-none focus:bg-muted"
					>
						{option.label}
					</BitsCombobox.Item>
				{/each}
			</BitsCombobox.Viewport>
		</BitsCombobox.Content>
	</BitsCombobox.Portal>
</BitsCombobox.Root>
