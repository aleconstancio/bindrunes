<script lang="ts">
let {
	class: className = "",
}: {
	class?: string;
} = $props();
</script>

<div class="flex gap-3 {className}" role="status" aria-live="polite">
	<div class="shrink-0 w-7 h-7 rounded-[--radius-pill] bg-primary/10 flex items-center justify-center">
		<svg aria-hidden="true" class="w-3.5 h-3.5 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/></svg>
	</div>
	<div class="rounded-xl px-4 py-3 text-sm bg-card border border-border">
		<div class="flex items-center gap-2 text-muted-foreground">
			<div class="flex gap-1">
				<span class="w-2 h-2 bg-muted-foreground rounded-[--radius-pill] animate-bounce" style="animation-delay: 0ms"></span>
				<span class="w-2 h-2 bg-muted-foreground rounded-[--radius-pill] animate-bounce" style="animation-delay: 150ms"></span>
				<span class="w-2 h-2 bg-muted-foreground rounded-[--radius-pill] animate-bounce" style="animation-delay: 300ms"></span>
			</div>
			<span class="text-label-sm">Pensando...</span>
		</div>
	</div>
</div>
