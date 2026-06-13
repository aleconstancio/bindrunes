<script lang="ts">
import type { Snippet } from "svelte";
import Avatar from "../../Avatar.svelte";
import Block from "../Block.svelte";

interface ActivityItem {
	id: string;
	user: { name: string; avatar?: string };
	action: string;
	target?: string;
	timestamp: string;
}

let {
	items = [] as ActivityItem[],
	title = "Activity",
	class: className = "",
	itemSnippet = undefined as Snippet<[{ item: ActivityItem }]> | undefined,
}: {
	items?: ActivityItem[];
	title?: string;
	class?: string;
	itemSnippet?: Snippet<[{ item: ActivityItem }]>;
} = $props();
</script>

<Block size="md" spacing="compact" class={className}>
  <div class="space-y-4">
    <h3 class="text-title-2 text-foreground">{title}</h3>
    <div class="space-y-4">
      {#each items as item}
        {#if itemSnippet}
          {@render itemSnippet({ item })}
        {:else}
          <div class="flex items-start gap-3">
            <Avatar
              src={item.user.avatar}
              alt={item.user.name}
              size="sm"
            />
            <div class="min-w-0 flex-1">
              <p class="text-body-sm text-foreground">
                <span class="font-medium">{item.user.name}</span>
                {item.action}
                {#if item.target}
                  <span class="font-medium">{item.target}</span>
                {/if}
              </p>
              <time class="text-mono-xs text-muted-foreground">{item.timestamp}</time>
            </div>
          </div>
        {/if}
      {/each}
    </div>
  </div>
</Block>
