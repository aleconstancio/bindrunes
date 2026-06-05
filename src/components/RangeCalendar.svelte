<script lang="ts">
	import { RangeCalendar as BitsRangeCalendar } from 'bits-ui';

	let {
		value = $bindable<{ start: Date; end: Date } | undefined>(undefined),
		class: className = '',
	}: {
		value?: { start: Date; end: Date } | undefined;
		class?: string;
	} = $props();
</script>

<BitsRangeCalendar.Root
	bind:value
	class="inline-flex flex-col gap-4 rounded-[--radius] border bg-card p-4 shadow-md {className}"
>
	<BitsRangeCalendar.Header class="flex items-center justify-between" />
	{#each [0, 1] as _}
		<BitsRangeCalendar.Grid class="w-full">
			<BitsRangeCalendar.GridHead>
				<BitsRangeCalendar.GridRow class="grid grid-cols-7 mb-1">
					{#each ['S', 'M', 'T', 'W', 'T', 'F', 'S'] as day}
						<BitsRangeCalendar.HeadCell class="text-center text-body-sm text-muted-foreground font-medium">{day}</BitsRangeCalendar.HeadCell>
					{/each}
				</BitsRangeCalendar.GridRow>
			</BitsRangeCalendar.GridHead>
			<BitsRangeCalendar.GridBody>
				{#each Array(5) as _}
					<BitsRangeCalendar.GridRow class="grid grid-cols-7">
						{#each Array(7) as _}
							<BitsRangeCalendar.Cell class="text-center">
								<BitsRangeCalendar.Day
									class="inline-flex h-8 w-8 items-center justify-center rounded-[--radius-sm] text-body-sm transition-colors cursor-pointer
									       data-[selected]:bg-primary data-[selected]:text-primary-foreground
									       data-[range-end]:bg-primary data-[range-end]:text-primary-foreground
									       data-[range-start]:bg-primary data-[range-start]:text-primary-foreground
									       data-[today]:font-bold
									       hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring"
								/>
							</BitsRangeCalendar.Cell>
						{/each}
					</BitsRangeCalendar.GridRow>
				{/each}
			</BitsRangeCalendar.GridBody>
		</BitsRangeCalendar.Grid>
	{/each}
</BitsRangeCalendar.Root>
