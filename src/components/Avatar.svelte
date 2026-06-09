<script lang="ts">
let {
	src = undefined as string | undefined,
	alt = "",
	fallback = "",
	size = "md" as "sm" | "md" | "lg",
	class: className = "",
}: {
	src?: string;
	alt?: string;
	fallback?: string;
	size?: "sm" | "md" | "lg";
	class?: string;
} = $props();

const _sizeClasses: Record<string, string> = {
	sm: "h-10 w-10 text-label-md",
	md: "h-16 w-16 text-title-2",
	lg: "h-24 w-24 text-headline-2",
};
</script>

<BitsAvatar.Root class="inline-flex items-center justify-center rounded-full overflow-hidden shrink-0 {sizeClasses[size]} {className}">
	{#if src}
		<BitsAvatar.Image {src} {alt} class="h-full w-full object-cover" />
	{/if}
	<BitsAvatar.Fallback class="flex h-full w-full items-center justify-center bg-primary/10 font-bold text-primary">
		{fallback}
	</BitsAvatar.Fallback>
</BitsAvatar.Root>
