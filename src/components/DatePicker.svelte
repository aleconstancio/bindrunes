<script lang="ts">
	import { DatePicker as BitsDatePicker } from 'bits-ui';

	let {
		value = $bindable<Date | undefined>(undefined),
		placeholder = 'Pick a date',
		class: className = '',
	}: {
		value?: Date | undefined;
		placeholder?: string;
		class?: string;
	} = $props();
</script>

<BitsDatePicker.Root bind:value trimValues class="w-full {className}">
	<BitsDatePicker.Label class="text-label-md text-muted-foreground mb-1.5 block" />
	<BitsDatePicker.Input class="flex w-full rounded-[--radius] border bg-input px-3 py-2 text-body-md text-foreground transition-colors duration-[--duration-snappy] focus:outline-none focus:ring-2 focus:ring-ring" placeholder={placeholder} />
	<BitsDatePicker.Portal>
		<BitsDatePicker.Content class="z-[--z-overlay,30] mt-1 rounded-[--radius] border bg-card p-3 shadow-md">
			<BitsDatePicker.Calendar />
		</BitsDatePicker.Content>
	</BitsDatePicker.Portal>
</BitsDatePicker.Root>
