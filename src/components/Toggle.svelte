<script lang="ts">
let {
	pressed = $bindable(false),
	disabled = false,
	class: className = "",
	children,
}: {
	pressed?: boolean;
	disabled?: boolean;
	class?: string;
	children?: import("svelte").Snippet;
} = $props();
</script>

<BitsToggle.Root
	bind:pressed
	{disabled}
	class="inline-flex items-center justify-center rounded-[--radius-sm] px-3 py-1.5 text-label-md transition-colors cursor-pointer
	       data-[state=on]:bg-accent data-[state=on]:text-accent-foreground
	       data-[state=off]:text-muted-foreground hover:bg-muted hover:text-foreground
	       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
	       disabled:pointer-events-none disabled:opacity-50 {className}"
>
	{@render children?.()}
</BitsToggle.Root>
