<script lang="ts">
let {
	class: className = "",
}: {
	class?: string;
} = $props();
</script>

<div class="flex justify-start {className}">
  <div class="bg-muted rounded-[--radius-lg] rounded-bl-sm px-4 py-3">
    <div class="flex items-center gap-1">
      <span class="w-2 h-2 bg-muted-foreground/50 rounded-[--radius-pill] animate-bounce" style="animation-delay: var(--delay-none)"></span>
      <span class="w-2 h-2 bg-muted-foreground/50 rounded-[--radius-pill] animate-bounce" style="animation-delay: var(--delay-md)"></span>
      <span class="w-2 h-2 bg-muted-foreground/50 rounded-[--radius-pill] animate-bounce" style="animation-delay: var(--delay-xl)"></span>
    </div>
  </div>
</div>
