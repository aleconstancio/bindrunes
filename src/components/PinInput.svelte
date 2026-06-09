<script lang="ts">
import { PinInput as BitsPinInput } from "bits-ui";

let {
	value = $bindable(""),
	placeholder = "\u25CB",
	disabled = false,
	type = "text" as "text" | "password",
	length = 4,
	class: className = "",
}: {
	value?: string;
	placeholder?: string;
	disabled?: boolean;
	type?: "text" | "password";
	length?: number;
	class?: string;
} = $props();
</script>

<BitsPinInput.Root bind:value maxlength={length} {placeholder} {disabled} {type} class="flex items-center gap-2 {className}">
	{#snippet children({ cells })}
		{#each cells as cell}
			<BitsPinInput.Cell
				{cell}
				class="flex h-12 w-12 items-center justify-center rounded-[--radius] border bg-input text-center text-headline-2 text-foreground transition-colors duration-[--duration-snappy]
				       focus-within:ring-2 focus-within:ring-ring focus-within:border-ring"
			/>
		{/each}
	{/snippet}
</BitsPinInput.Root>
