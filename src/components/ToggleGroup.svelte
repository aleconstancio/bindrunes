<script lang="ts">
import { ToggleGroup } from "bits-ui";
import type { SelectOption } from "../shared-types";

const BitsToggleGroup = ToggleGroup;

let {
	value = $bindable<string | string[]>(""),
	multiple = false,
	options = [] as SelectOption[],
	class: className = "",
}: {
	value?: string | string[];
	multiple?: boolean;
	options?: SelectOption[];
	class?: string;
} = $props();
</script>

<BitsToggleGroup.Root
	type={multiple ? 'multiple' : 'single'}
	bind:value
	class="inline-flex items-center rounded-[--radius] border border-border bg-muted p-1 {className}"
>
	{#each options as option}
		<BitsToggleGroup.Item
			value={option.value}
			disabled={option.disabled}
			class="inline-flex items-center justify-center rounded-sm px-3 py-1.5 text-label-md transition-colors cursor-pointer
			       data-[state=on]:bg-background data-[state=on]:text-foreground data-[state=on]:shadow-sm
			       data-[state=off]:text-muted-foreground hover:text-foreground
			       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
			       disabled:pointer-events-none disabled:opacity-50"
		>
			{option.label}
		</BitsToggleGroup.Item>
	{/each}
</BitsToggleGroup.Root>
