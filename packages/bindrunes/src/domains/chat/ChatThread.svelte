<script lang="ts">
import type { Snippet } from "svelte";
import ScrollArea from "../../primitives/ScrollArea.svelte";
import ChatMessageComponent from "./ChatMessage.svelte";
import type { ChatMessage } from "./types";

let {
	messages = [] as ChatMessage[],
	class: className = "",
	messageSnippet = undefined as Snippet<[{ message: ChatMessage }]> | undefined,
}: {
	messages?: ChatMessage[];
	class?: string;
	messageSnippet?: Snippet<[{ message: ChatMessage }]>;
} = $props();
</script>

<ScrollArea class="flex-1 {className}">
  <div class="space-y-4 p-4">
    {#each messages as message}
      {#if messageSnippet}
        {@render messageSnippet({ message })}
      {:else}
        <ChatMessageComponent
          content={message.content}
          sender={message.sender}
          timestamp={message.timestamp}
        />
      {/if}
    {/each}
  </div>
</ScrollArea>
