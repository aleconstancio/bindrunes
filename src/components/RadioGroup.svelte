<script lang="ts">
	import { RadioGroup as BitsRadioGroup } from 'bits-ui';

	type Option = { value: string; label: string; disabled?: boolean };

	let {
		value = $bindable(''),
		options = [] as Option[],
		class: className = '',
		ariaLabel = undefined as string | undefined,
	}: {
		value?: string;
		options?: Option[];
		class?: string;
		ariaLabel?: string;
	} = $props();
</script>

<BitsRadioGroup.Root bind:value aria-label={ariaLabel} class="flex flex-col gap-2 {className}">
	{#each options as option}
		<BitsRadioGroup.Item
			value={option.value}
			disabled={option.disabled}
			class="flex items-center gap-3 rounded-[--radius] border px-4 py-3 transition-colors cursor-pointer
			       data-[state=checked]:border-primary data-[state=unchecked]:border-border
			       data-[state=checked]:bg-muted"
		>
			<div class="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 data-[state=checked]:border-primary data-[state=unchecked]:border-muted-foreground">
				<div class="h-2 w-2 rounded-full data-[state=checked]:bg-primary" />
			</div>
			<span class="text-label-md text-foreground">{option.label}</span>
		</BitsRadioGroup.Item>
	{/each}
</BitsRadioGroup.Root>
