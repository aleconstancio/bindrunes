<script lang="ts">
import { Copy, Trash2 } from "lucide-svelte";
import type { Snippet } from "svelte";
import Badge from "../../Badge.svelte";
import Button from "../../Button.svelte";
import Card from "../../Card.svelte";
import Block from "../Block.svelte";

interface ApiKey {
	id: string;
	name: string;
	key: string;
	createdAt: string;
	lastUsed?: string;
	expiresAt?: string;
}

let {
	keys = [] as ApiKey[],
	onCreate = undefined as (() => void) | undefined,
	onRevoke = undefined as ((id: string) => void) | undefined,
	class: className = "",
}: {
	keys?: ApiKey[];
	onCreate?: () => void;
	onRevoke?: (id: string) => void;
	class?: string;
} = $props();
</script>

<Block size="md" spacing="compact" class={className}>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-title-2 text-foreground">API Keys</h2>
        <p class="text-body-sm text-muted-foreground mt-1">Manage your API keys for programmatic access.</p>
      </div>
      {#if onCreate}
        <Button onclick={onCreate}>Create API Key</Button>
      {/if}
    </div>

    {#if keys.length === 0}
      <Card padding class="text-center py-12">
        <p class="text-body-md text-muted-foreground">No API keys yet. Create one to get started.</p>
      </Card>
    {:else}
      <div class="space-y-3">
        {#each keys as key}
          <Card padding class="flex items-center justify-between gap-4">
            <div class="min-w-0 flex-1">
              <div class="flex items-center gap-2">
                <span class="text-label-md text-foreground font-medium">{key.name}</span>
                {#if key.expiresAt}
                  <Badge variant="warning" size="sm">Expires {key.expiresAt}</Badge>
                {/if}
              </div>
              <div class="flex items-center gap-2 mt-1">
                <code class="text-mono-sm text-muted-foreground">{key.key.slice(0, 12)}...{key.key.slice(-4)}</code>
              </div>
              <div class="flex items-center gap-3 mt-2 text-mono-xs text-muted-foreground">
                <span>Created {key.createdAt}</span>
                {#if key.lastUsed}
                  <span>Last used {key.lastUsed}</span>
                {/if}
              </div>
            </div>
            <div class="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                iconOnly
                aria-label="Copy key"
                onclick={() => navigator.clipboard.writeText(key.key)}
              >
                <Copy class="h-4 w-4" />
              </Button>
              {#if onRevoke}
                <Button
                  variant="ghost"
                  size="sm"
                  iconOnly
                  aria-label="Revoke key"
                  onclick={() => onRevoke(key.id)}
                >
                  <Trash2 class="h-4 w-4 text-destructive" />
                </Button>
              {/if}
            </div>
          </Card>
        {/each}
      </div>
    {/if}
  </div>
</Block>
