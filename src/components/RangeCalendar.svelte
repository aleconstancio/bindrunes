<script lang="ts">
import { RangeCalendar } from "bits-ui";

let {
	value = $bindable<{ start: Date; end: Date } | undefined>(undefined),
	class: className = "",
}: {
	value?: { start: Date; end: Date } | undefined;
	class?: string;
} = $props();
</script>

	<RangeCalendar.Root
	bind:value
	numberOfMonths={2}
	class="inline-flex flex-col gap-4 rounded-[--radius] border bg-card p-4 shadow-md {className}"
>
	<RangeCalendar.Header class="flex items-center justify-between" />
	{#each [0, 1] as _}
		<RangeCalendar.Grid class="w-full">
			<RangeCalendar.GridHead>
				<RangeCalendar.GridRow class="grid grid-cols-7 mb-1">
					{#each ['S', 'M', 'T', 'W', 'T', 'F', 'S'] as day}
						<RangeCalendar.HeadCell class="text-center text-body-sm text-muted-foreground font-medium">{day}</RangeCalendar.HeadCell>
					{/each}
				</RangeCalendar.GridRow>
			</RangeCalendar.GridHead>
			<RangeCalendar.GridBody>
				{#each Array(5) as _}
					<RangeCalendar.GridRow class="grid grid-cols-7">
						{#each Array(7) as _}
							<RangeCalendar.Cell class="text-center">
								<RangeCalendar.Day
									class="inline-flex h-8 w-8 items-center justify-center rounded-[--radius-sm] text-body-sm transition-colors cursor-pointer
									       data-[selected]:bg-primary data-[selected]:text-primary-foreground
									       data-[range-end]:bg-primary data-[range-end]:text-primary-foreground
									       data-[range-start]:bg-primary data-[range-start]:text-primary-foreground
									       data-[today]:font-bold
									       hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring"
								/>
							</RangeCalendar.Cell>
						{/each}
					</RangeCalendar.GridRow>
				{/each}
			</RangeCalendar.GridBody>
		</RangeCalendar.Grid>
	{/each}
</RangeCalendar.Root>
