<script lang="ts">
import type { Snippet } from "svelte";
import ScrollArea from "../../ScrollArea.svelte";
import ChatMessage from "./ChatMessage.svelte";
import type { Message } from "./types";

let {
	messages = [] as Message[],
	class: className = "",
	messageSnippet = undefined as Snippet<[{ message: Message }]> | undefined,
}: {
	messages?: Message[];
	class?: string;
	messageSnippet?: Snippet<[{ message: Message }]>;
} = $props();
</script>

<ScrollArea class="flex-1 {className}">
  <div class="space-y-4 p-4">
    {#each messages as message}
      {#if messageSnippet}
        {@render messageSnippet({ message })}
      {:else}
        <ChatMessage
          content={message.content}
          sender={message.sender}
          timestamp={message.timestamp}
        />
      {/if}
    {/each}
  </div>
</ScrollArea>
