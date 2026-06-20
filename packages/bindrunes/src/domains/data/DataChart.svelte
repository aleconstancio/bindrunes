<script lang="ts">
import { onMount } from "svelte";

type ChartType = "line" | "bar" | "doughnut" | "radar" | "scatter";

let {
	type = "line" as ChartType,
	data,
	options = {},
	class: className = "",
}: {
	type?: ChartType;
	data: Record<string, unknown>;
	options?: Record<string, unknown>;
	class?: string;
} = $props();

let chartJs: typeof import("chart.js") | null = $state(null);
let chartComponent: ReturnType<typeof import("svelte-chartjs")> | null = $state(null);
let loadError = $state<string | null>(null);

onMount(async () => {
	try {
		chartJs = await import("chart.js");
		const { Chart: ChartJS } = chartJs;
		ChartJS.register(
			chartJs.CategoryScale,
			chartJs.LinearScale,
			chartJs.PointElement,
			chartJs.LineElement,
			chartJs.BarElement,
			chartJs.ArcElement,
			chartJs.RadialLinearScale,
			chartJs.Tooltip,
			chartJs.Legend,
			chartJs.Filler,
		);
		chartComponent = await import("svelte-chartjs");
	} catch {
		loadError =
			"chart.js is not installed. Add it as a dependency: bun add chart.js svelte-chartjs";
	}
});
</script>

<div class="w-full {className}">
  {#if loadError}
    <p class="text-body-sm text-destructive p-4 rounded-[--radius] border border-destructive bg-destructive-soft">
      {loadError}
    </p>
  {:else if chartComponent && chartJs}
    <svelte:component this={chartComponent.default} {type} {data} {options} />
  {:else}
    <div class="animate-pulse h-48 rounded-[--radius] bg-muted"></div>
  {/if}
</div>
