<script lang="ts">
import Avatar from "../../primitives/Avatar.svelte";

interface Conversation {
	id: string;
	name: string;
	avatar?: string;
	lastMessage: string;
	timestamp: string;
	unread?: number;
	active?: boolean;
}

let {
	conversations = [] as Conversation[],
	selectedId = $bindable(""),
	onSelect = undefined as ((id: string) => void) | undefined,
	class: className = "",
}: {
	conversations?: Conversation[];
	selectedId?: string;
	onSelect?: (id: string) => void;
	class?: string;
} = $props();
</script>

<div class="divide-y divide-border {className}">
  {#each conversations as conv}
    <button
      type="button"
      class="w-full flex items-center gap-3 p-3 text-left transition-colors cursor-pointer
             {selectedId === conv.id ? 'bg-primary/5' : 'hover:bg-muted/50'}"
      onclick={() => {
        selectedId = conv.id;
        onSelect?.(conv.id);
      }}
    >
      <Avatar src={conv.avatar} alt={conv.name} size="sm" />
      <div class="flex-1 min-w-0">
        <div class="flex items-center justify-between">
          <span class="text-label-md text-foreground truncate">{conv.name}</span>
          <span class="text-mono-xs text-muted-foreground shrink-0">{conv.timestamp}</span>
        </div>
        <p class="text-body-xs text-muted-foreground truncate">{conv.lastMessage}</p>
      </div>
      {#if conv.unread}
        <span class="shrink-0 w-5 h-5 rounded-[--radius-pill] bg-primary text-primary-foreground text-mono-xs flex items-center justify-center">
          {conv.unread}
        </span>
      {/if}
    </button>
  {/each}
</div>
