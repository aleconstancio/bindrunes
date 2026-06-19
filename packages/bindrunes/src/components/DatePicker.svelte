<script lang="ts">
import { CalendarDate } from "@internationalized/date";
import { DatePicker } from "bits-ui";

let {
	value = $bindable<Date | undefined>(undefined),
	label = "",
	disabled = false,
	class: className = "",
}: {
	value?: Date | undefined;
	label?: string;
	disabled?: boolean;
	class?: string;
} = $props();

let bitsValue = $derived(
	value ? new CalendarDate(value.getFullYear(), value.getMonth() + 1, value.getDate()) : undefined,
);

function onBitsValueChange(v: typeof bitsValue) {
	if (v) {
		value = new Date(v.year, v.month - 1, v.day);
	} else {
		value = undefined;
	}
}
</script>

<DatePicker.Root value={bitsValue} onValueChange={onBitsValueChange} {disabled} trimValues class="w-full {className}">
	{#if label}
		<DatePicker.Label class="text-label-md text-muted-foreground mb-1.5 block">{label}</DatePicker.Label>
	{/if}
	<DatePicker.Input class="flex w-full rounded-[--radius] border bg-input px-3 py-2 text-body-md text-foreground transition-colors duration-[--duration-snappy] focus:outline-none focus:ring-2 focus:ring-ring" />
	<DatePicker.Portal>
		<DatePicker.Content class="z-[--z-overlay,30] mt-1 rounded-[--radius] border bg-card p-3 shadow-[--shadow-md]">
			<DatePicker.Calendar />
		</DatePicker.Content>
	</DatePicker.Portal>
</DatePicker.Root>
