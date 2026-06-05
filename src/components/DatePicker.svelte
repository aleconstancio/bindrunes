<script lang="ts">
	import { CalendarDate } from '@internationalized/date';
	import { DatePicker as BitsDatePicker } from 'bits-ui';

	let {
		value = $bindable<Date | undefined>(undefined),
		label = '',
		class: className = '',
	}: {
		value?: Date | undefined;
		label?: string;
		class?: string;
	} = $props();

	let bitsValue = $derived(value ? new CalendarDate(value.getFullYear(), value.getMonth() + 1, value.getDate()) : undefined);

	function onBitsValueChange(v: typeof bitsValue) {
		if (v) {
			value = new Date(v.year, v.month - 1, v.day);
		} else {
			value = undefined;
		}
	}
</script>

<BitsDatePicker.Root value={bitsValue} onValueChange={onBitsValueChange} trimValues class="w-full {className}">
	{#if label}
		<BitsDatePicker.Label class="text-label-md text-muted-foreground mb-1.5 block">{label}</BitsDatePicker.Label>
	{/if}
	<BitsDatePicker.Input class="flex w-full rounded-[--radius] border bg-input px-3 py-2 text-body-md text-foreground transition-colors duration-[--duration-snappy] focus:outline-none focus:ring-2 focus:ring-ring" />
	<BitsDatePicker.Portal>
		<BitsDatePicker.Content class="z-[--z-overlay,30] mt-1 rounded-[--radius] border bg-card p-3 shadow-md">
			<BitsDatePicker.Calendar />
		</BitsDatePicker.Content>
	</BitsDatePicker.Portal>
</BitsDatePicker.Root>
