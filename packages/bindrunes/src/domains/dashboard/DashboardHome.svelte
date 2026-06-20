<script lang="ts">
import type { Component, Snippet } from "svelte";
import MetricCard from "../../components/MetricCard.svelte";
import Card from "../../primitives/Card.svelte";
import Block from "../Block.svelte";

interface Stat {
	label: string;
	value: string;
	variant?: "default" | "success" | "warning" | "destructive";
	detail?: string;
}

let {
	title = "Dashboard",
	stats = [] as Stat[],
	recentActivity = undefined as Snippet | undefined,
	chart = undefined as Snippet | undefined,
	actions = undefined as Snippet | undefined,
	class: className = "",
}: {
	title?: string;
	stats?: Stat[];
	recentActivity?: Snippet;
	chart?: Snippet;
	actions?: Snippet;
	class?: string;
} = $props();
</script>

<Block size="full" spacing="compact" class={className}>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-title-1 text-foreground">{title}</h1>
      {#if actions}
        <div class="flex items-center gap-2">
          {@render actions()}
        </div>
      {/if}
    </div>

    {#if stats.length > 0}
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {#each stats as stat}
          <MetricCard
            label={stat.label}
            value={stat.value}
            variant={stat.variant}
            detail={stat.detail}
          />
        {/each}
      </div>
    {/if}

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {#if chart}
        <div class="lg:col-span-2">
          <Card padding>
            {@render chart()}
          </Card>
        </div>
      {/if}

      {#if recentActivity}
        <Card padding>
          <h3 class="text-title-3 text-foreground mb-4">Recent Activity</h3>
          {@render recentActivity()}
        </Card>
      {/if}
    </div>
  </div>
</Block>
