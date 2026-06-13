<script lang="ts">
import { Accordion } from "bits-ui";

const BitsAccordion = Accordion;

let {
	value = "",
	disabled = false,
	class: className = "",
	trigger,
	children,
}: {
	value: string;
	disabled?: boolean;
	class?: string;
	trigger?: import("svelte").Snippet;
	children?: import("svelte").Snippet;
} = $props();
</script>

<BitsAccordion.Item {value} {disabled} class="rounded-[--radius] overflow-hidden border border-border bg-card {className}">
	<BitsAccordion.Header class="flex">
		<BitsAccordion.Trigger
			class="accordion-trigger flex w-full items-center justify-between p-4 text-left transition-colors text-foreground bg-transparent border-none cursor-pointer {disabled ? 'cursor-not-allowed opacity-50' : ''}"
			{disabled}
		>
			{#if trigger}
				{@render trigger()}
			{/if}
			<svg
				class="chevron h-4 w-4 shrink-0 text-muted-foreground"
				fill="none" viewBox="0 0 24 24" stroke="currentColor"
			>
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
			</svg>
		</BitsAccordion.Trigger>
	</BitsAccordion.Header>
	<BitsAccordion.Content class="px-4 pb-4 pt-0 text-foreground">
		{@render children?.()}
	</BitsAccordion.Content>
</BitsAccordion.Item>

<style>
	:global(.accordion-trigger[aria-expanded="true"] .chevron) {
		transform: rotate(180deg);
	}
</style>
