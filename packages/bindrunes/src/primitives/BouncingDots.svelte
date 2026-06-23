<script lang="ts">
let {
	color = "bg-muted-foreground",
	class: className = "",
}: {
	color?: string;
	class?: string;
} = $props();
</script>

<div class="flex items-center gap-1 {className}">
	<span class="w-2 h-2 {color} rounded-[--radius-pill] animate-bounce" style="animation-delay: var(--delay-none)"></span>
	<span class="w-2 h-2 {color} rounded-[--radius-pill] animate-bounce" style="animation-delay: var(--delay-md)"></span>
	<span class="w-2 h-2 {color} rounded-[--radius-pill] animate-bounce" style="animation-delay: var(--delay-xl)"></span>
</div>
