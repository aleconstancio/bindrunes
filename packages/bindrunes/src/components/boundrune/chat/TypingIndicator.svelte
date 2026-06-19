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
      <span class="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style="animation-delay: 0ms"></span>
      <span class="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style="animation-delay: 150ms"></span>
      <span class="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style="animation-delay: 300ms"></span>
    </div>
  </div>
</div>
