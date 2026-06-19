<script lang="ts">
let {
	content = "",
	sender = "user" as "user" | "assistant",
	timestamp = undefined as string | undefined,
	class: className = "",
}: {
	content?: string;
	sender?: "user" | "assistant";
	timestamp?: string;
	class?: string;
} = $props();
</script>

<div class="flex {sender === 'user' ? 'justify-end' : 'justify-start'} {className}">
  <div class="max-w-[75%] space-y-1">
    <div
      class="rounded-[--radius-lg] px-4 py-2.5 text-body-md
             {sender === 'user'
               ? 'bg-primary text-primary-foreground rounded-br-sm'
               : 'bg-muted text-foreground rounded-bl-sm'}"
    >
      {content}
    </div>
    {#if timestamp}
      <p class="text-mono-xs text-muted-foreground {sender === 'user' ? 'text-right' : ''}">{timestamp}</p>
    {/if}
  </div>
</div>
