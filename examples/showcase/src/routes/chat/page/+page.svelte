<script lang="ts">
import { ChatTemplate } from "urupe-ui/layouts";

const conversations = [
  { id: "1", name: "Alice Johnson", lastMessage: "Hey, how's it going?" },
  { id: "2", name: "Bob Smith", lastMessage: "Meeting at 3pm" },
  { id: "3", name: "Carol Davis", lastMessage: "Thanks for the update!" },
];
</script>

<ChatTemplate title="Chat">
  {#snippet conversationList()}
    <div class="space-y-1 p-2">
      {#each conversations as conv}
        <button class="w-full text-left px-3 py-2 rounded hover:bg-muted text-label-md">
          {conv.name}
          <p class="text-body-sm text-muted-foreground">{conv.lastMessage}</p>
        </button>
      {/each}
    </div>
  {/snippet}

  {#snippet chatHeader()}
    <h3 class="text-title-2">Alice Johnson</h3>
  {/snippet}

  <div class="space-y-4">
    <div class="bg-muted rounded-lg p-3 max-w-md">Hey, how's it going?</div>
    <div class="bg-primary text-primary-foreground rounded-lg p-3 max-w-md ml-auto">Good! Working on the new features.</div>
  </div>
</ChatTemplate>
