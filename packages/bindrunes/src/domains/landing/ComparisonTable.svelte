<script lang="ts">
import { Check, X } from "lucide-svelte";
import MetaContainer from "../../layouts/MetaContainer.svelte";

interface Feature {
	name: string;
	yours: boolean | string;
	competitor1: boolean | string;
	competitor2: boolean | string;
}

let {
	title = "Why choose us?",
	yoursLabel = "Us",
	competitor1Label = "Competitor A",
	competitor2Label = "Competitor B",
	features = [] as Feature[],
	class: className = "",
}: {
	title?: string;
	yoursLabel?: string;
	competitor1Label?: string;
	competitor2Label?: string;
	features?: Feature[];
	class?: string;
} = $props();

function renderValue(val: boolean | string) {
	if (val === true) return '<span class="text-success">✓</span>';
	if (val === false) return '<span class="text-destructive">✗</span>';
	return `<span class="text-foreground">${val}</span>`;
}
</script>

<div class="px-6 py-16 {className}">
  <MetaContainer size="lg">
    <div class="space-y-8">
      {#if title}
        <h2 class="text-display-3 text-foreground text-center">{title}</h2>
      {/if}

      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-border">
              <th class="text-left py-3 px-4 text-label-md text-muted-foreground font-medium">Feature</th>
              <th class="text-center py-3 px-4 text-label-md text-primary font-medium">{yoursLabel}</th>
              <th class="text-center py-3 px-4 text-label-md text-muted-foreground font-medium">{competitor1Label}</th>
              <th class="text-center py-3 px-4 text-label-md text-muted-foreground font-medium">{competitor2Label}</th>
            </tr>
          </thead>
          <tbody>
            {#each features as feature}
              <tr class="border-b border-border last:border-0">
                <td class="py-3 px-4 text-body-md text-foreground">{feature.name}</td>
                <td class="py-3 px-4 text-center">{@html renderValue(feature.yours)}</td>
                <td class="py-3 px-4 text-center">{@html renderValue(feature.competitor1)}</td>
                <td class="py-3 px-4 text-center">{@html renderValue(feature.competitor2)}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  </MetaContainer>
</div>
