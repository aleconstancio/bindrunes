<script lang="ts">
import type { Snippet } from "svelte";
import ScrollArea from "../../primitives/ScrollArea.svelte";

interface DocSection {
	id: string;
	title: string;
	children?: DocSection[];
}

let {
	sections = [] as DocSection[],
	activeId = $bindable(""),
	class: className = "",
	navigation = undefined as Snippet | undefined,
	children,
}: {
	sections?: DocSection[];
	activeId?: string;
	class?: string;
	navigation?: Snippet;
	children?: Snippet;
} = $props();
</script>

<div class="flex min-h-screen {className}">
  <!-- Sidebar -->
  <aside class="hidden lg:block w-64 shrink-0 border-r border-border bg-background">
    <ScrollArea class="h-full py-6 px-4">
      {#if navigation}
        {@render navigation()}
      {:else}
        <nav class="space-y-1">
          {#each sections as section}
            <button
              type="button"
              class="w-full text-left rounded-[--radius] px-3 py-1.5 text-body-sm transition-colors
                     {activeId === section.id ? 'bg-muted text-foreground font-medium' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}"
              onclick={() => activeId = section.id}
            >
              {section.title}
            </button>
          {/each}
        </nav>
      {/if}
    </ScrollArea>
  </aside>

  <!-- Content -->
  <main class="flex-1 min-w-0 p-8 max-w-3xl">
    {@render children?.()}
  </main>
</div>
