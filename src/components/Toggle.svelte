<script lang="ts">
import { Toggle } from "bits-ui";

const BitsToggle = Toggle;

let {
	pressed = $bindable(false),
	disabled = false,
	class: className = "",
	children,
	ariaLabel = undefined as string | undefined,
}: {
	pressed?: boolean;
	disabled?: boolean;
	class?: string;
	children?: import("svelte").Snippet;
	ariaLabel?: string;
} = $props();
</script>

<BitsToggle.Root
	bind:pressed
	{disabled}
	aria-label={ariaLabel}
	class="inline-flex items-center justify-center rounded-[--radius-sm] px-3 py-1.5 text-label-md transition-colors cursor-pointer
	       data-[state=on]:bg-accent data-[state=on]:text-accent-foreground
	       data-[state=off]:text-muted-foreground hover:bg-muted hover:text-foreground
	       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
	       disabled:pointer-events-none disabled:opacity-50 {className}"
>
	{@render children?.()}
</BitsToggle.Root>
