<script lang="ts">
import Badge from "../../primitives/Badge.svelte";
import Block from "../Block.svelte";

interface ChangelogEntry {
	version: string;
	date: string;
	entries: { type: "added" | "changed" | "fixed" | "removed"; description: string }[];
}

let {
	entries = [] as ChangelogEntry[],
	title = "Changelog",
	class: className = "",
}: {
	entries?: ChangelogEntry[];
	title?: string;
	class?: string;
} = $props();

const typeVariant: Record<string, "success" | "primary" | "warning" | "default"> = {
	added: "success",
	changed: "primary",
	fixed: "warning",
	removed: "default",
};
</script>

<Block size="md" spacing="normal" class={className}>
  <div class="space-y-12">
    <h1 class="text-display-2 text-foreground">{title}</h1>

    {#each entries as entry}
      <div class="relative pl-8 border-l-2 border-border">
        <div class="absolute -left-2 top-0 w-3 h-3 rounded-[--radius-pill] bg-primary"></div>
        <div class="space-y-4">
          <div class="flex items-center gap-3">
            <span class="text-title-2 text-foreground">v{entry.version}</span>
            <time class="text-mono-xs text-muted-foreground">{entry.date}</time>
          </div>
          <div class="space-y-2">
            {#each entry.entries as item}
              <div class="flex items-start gap-2">
                <Badge variant={typeVariant[item.type]} size="sm" class="mt-0.5">{item.type}</Badge>
                <span class="text-body-md text-muted-foreground">{item.description}</span>
              </div>
            {/each}
          </div>
        </div>
      </div>
    {/each}
  </div>
</Block>
