<script lang="ts">
import Badge from "../../primitives/Badge.svelte";
import Card from "../../primitives/Card.svelte";
import { getGridClass } from "../../utils/grid";

interface Stat {
	label: string;
	value: string;
	change?: string;
	changeType?: "positive" | "negative" | "neutral";
	icon?: string;
}

let {
	stats = [] as Stat[],
	columns = 4,
	class: className = "",
}: {
	stats?: Stat[];
	columns?: 2 | 3 | 4;
	class?: string;
} = $props();

const changeColors: Record<string, string> = {
	positive: "text-success",
	negative: "text-destructive",
	neutral: "text-muted-foreground",
};
</script>

<div class="grid {getGridClass(columns)} gap-4 {className}">
  {#each stats as stat}
    <Card padding>
      <div class="space-y-2">
        <div class="flex items-center justify-between">
          <span class="text-body-sm text-muted-foreground">{stat.label}</span>
          {#if stat.icon}
            <span class="text-muted-foreground">{stat.icon}</span>
          {/if}
        </div>
        <div class="flex items-baseline gap-2">
          <span class="text-title-1 text-foreground">{stat.value}</span>
          {#if stat.change}
            <span class="text-mono-xs {changeColors[stat.changeType ?? 'neutral']}">
              {stat.change}
            </span>
          {/if}
        </div>
      </div>
    </Card>
  {/each}
</div>
