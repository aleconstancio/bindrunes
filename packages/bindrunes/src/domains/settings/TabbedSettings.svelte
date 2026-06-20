<script lang="ts">
import type { Snippet } from "svelte";
import Tabs from "../../primitives/Tabs.svelte";
import TabsContent from "../../primitives/TabsContent.svelte";
import TabsList from "../../primitives/TabsList.svelte";
import TabsTrigger from "../../primitives/TabsTrigger.svelte";
import Block from "../Block.svelte";

interface SettingsTab {
	id: string;
	label: string;
	icon?: Snippet;
}

let {
	tabs = [] as SettingsTab[],
	activeTab = $bindable(""),
	class: className = "",
	tabContent,
}: {
	tabs?: SettingsTab[];
	activeTab?: string;
	class?: string;
	tabContent?: Snippet<[SettingsTab]>;
} = $props();

if (!activeTab && tabs.length > 0) {
	const first = tabs[0];
	if (first) activeTab = first.id;
}
</script>

<Block size="lg" spacing="compact" class={className}>
  <Tabs bind:value={activeTab} orientation="vertical">
    <div class="flex flex-col lg:flex-row gap-8">
      <TabsList class="flex lg:flex-col gap-1 h-auto lg:w-48 shrink-0">
        {#each tabs as tab}
          <TabsTrigger value={tab.id} class="justify-start gap-2">
            {#if tab.icon}
              <span class="shrink-0">{@render tab.icon()}</span>
            {/if}
            {tab.label}
          </TabsTrigger>
        {/each}
      </TabsList>

      <div class="flex-1 min-w-0">
        {#each tabs as tab}
          <TabsContent value={tab.id}>
            {@render tabContent?.(tab)}
          </TabsContent>
        {/each}
      </div>
    </div>
  </Tabs>
</Block>
