<script lang="ts">
import type { Snippet } from "svelte";
import Badge from "../../primitives/Badge.svelte";
import Sheet from "../../primitives/Sheet.svelte";
import Skeleton from "../../primitives/Skeleton.svelte";

let {
	open = $bindable(false),
	title = "",
	loading = false,
	sections = [] as {
		label: string;
		value: string;
		variant?:
			| "default"
			| "primary"
			| "secondary"
			| "success"
			| "warning"
			| "destructive"
			| "outline";
	}[],
	actions,
	children,
}: {
	open?: boolean;
	title?: string;
	loading?: boolean;
	sections?: {
		label: string;
		value: string;
		variant?:
			| "default"
			| "primary"
			| "secondary"
			| "success"
			| "warning"
			| "destructive"
			| "outline";
	}[];
	actions?: Snippet;
	children?: Snippet;
} = $props();
</script>

<Sheet bind:open side="right" title={title}>
  {#snippet header()}
    <div>
      <h2 class="text-title-2 text-foreground">{title}</h2>
    </div>
  {/snippet}

  {#if loading}
    <div class="space-y-4">
      <Skeleton lines={1} width="40%" />
      <Skeleton lines={3} />
      <Skeleton lines={1} width="60%" />
      <Skeleton lines={2} />
    </div>
  {:else if sections.length > 0}
    <div class="space-y-6">
      {#each sections as section}
        <div>
          <p class="text-mono-xs uppercase text-muted-foreground font-bold mb-1">{section.label}</p>
          {#if section.variant}
            <Badge variant={section.variant}>{section.value}</Badge>
          {:else}
            <p class="text-body-md text-foreground">{section.value}</p>
          {/if}
        </div>
      {/each}
    </div>
  {/if}

  {#if children}
    <div class="mt-6">
      {@render children()}
    </div>
  {/if}

  {#if actions}
    {#snippet footer()}
      <div class="flex justify-end gap-3">
        {@render actions()}
      </div>
    {/snippet}
  {/if}
</Sheet>
