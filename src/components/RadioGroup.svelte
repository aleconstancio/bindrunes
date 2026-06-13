<script lang="ts">
import { RadioGroup } from "bits-ui";
import type { SelectOption } from "../shared-types";

const BitsRadioGroup = RadioGroup;

let {
	value = $bindable(""),
	options = [] as SelectOption[],
	class: className = "",
	ariaLabel = undefined as string | undefined,
}: {
	value?: string;
	options?: SelectOption[];
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
				<div class="h-2 w-2 rounded-full data-[state=checked]:bg-primary"></div>
			</div>
			<span class="text-label-md text-foreground">{option.label}</span>
		</BitsRadioGroup.Item>
	{/each}
</BitsRadioGroup.Root>
