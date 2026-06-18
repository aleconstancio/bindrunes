<script lang="ts">
import { Combobox } from "bits-ui";
import type { Snippet } from "svelte";
import type { SelectOption } from "../shared-types";

let {
	value = $bindable(""),
	placeholder = "Search...",
	options = [] as SelectOption[],
	disabled = false,
	class: className = "",
	itemSnippet = undefined as Snippet<[{ option: SelectOption }]> | undefined,
	emptySnippet = undefined as Snippet | undefined,
	ariaLabel = undefined as string | undefined,
}: {
	value?: string;
	placeholder?: string;
	options?: SelectOption[];
	disabled?: boolean;
	class?: string;
	itemSnippet?: Snippet<[{ option: SelectOption }]>;
	emptySnippet?: Snippet;
	ariaLabel?: string;
} = $props();

let inputValue = $state("");

function normalize(str: string): string {
	return str
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.toLowerCase();
}

let _filtered = $derived(options.filter((o) => normalize(o.label).includes(normalize(inputValue))));
</script>

<Combobox.Root bind:value bind:inputValue {disabled} class="relative {className}">
	<Combobox.Input
		{placeholder}
		aria-label={ariaLabel}
		class="flex w-full rounded-[--radius] border border-border bg-input px-3 py-2 text-body-md text-foreground placeholder:text-muted-foreground transition-colors duration-[--duration-snappy] focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 disabled:cursor-not-allowed"
	/>
	<Combobox.Portal>
		<Combobox.Content class="z-[--z-overlay,30] mt-1 max-h-60 w-full overflow-auto rounded-[--radius] border bg-card p-1 shadow-[--shadow-md]">
			<Combobox.Viewport>
				{#if _filtered.length === 0 && emptySnippet}
					{@render emptySnippet()}
				{:else}
					{#each _filtered as option}
						<Combobox.Item
							value={option.value}
							disabled={option.disabled}
							class="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-body-md text-foreground hover:bg-muted data-[state=checked]:bg-muted focus:outline-none focus:bg-muted"
						>
							{#if itemSnippet}
								{@render itemSnippet({ option })}
							{:else}
								{option.label}
							{/if}
						</Combobox.Item>
					{/each}
				{/if}
			</Combobox.Viewport>
		</Combobox.Content>
	</Combobox.Portal>
</Combobox.Root>
