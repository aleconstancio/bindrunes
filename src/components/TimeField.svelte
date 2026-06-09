<script lang="ts">
import { Time } from "@internationalized/date";
import { TimeField as BitsTimeField } from "bits-ui";

let {
	value = $bindable(new Time(0, 0)),
	disabled = false,
	class: className = "",
}: {
	value?: Time;
	disabled?: boolean;
	class?: string;
} = $props();
</script>

<BitsTimeField.Root bind:value {disabled} class="w-full {className}">
	<BitsTimeField.Label class="text-label-md text-muted-foreground mb-1.5 block" />
	<BitsTimeField.Input class="flex w-full items-center rounded-[--radius] border bg-input px-3 py-2 text-body-md text-foreground transition-colors duration-[--duration-snappy] focus:outline-none focus:ring-2 focus:ring-ring">
		{#snippet children({ segments })}
			{#each segments as segment, i}
				<span class="flex items-center">
					{#if i > 0}
						<span class="text-muted-foreground px-0.5">:</span>
					{/if}
					<BitsTimeField.Segment
						{...segment}
						class="rounded px-0.5 text-body-md text-foreground tabular-nums transition-colors
						       focus:bg-primary focus:text-primary-foreground focus:outline-none
						       data-[state=placeholder]:text-muted-foreground"
					/>
				</span>
			{/each}
		{/snippet}
	</BitsTimeField.Input>
</BitsTimeField.Root>
