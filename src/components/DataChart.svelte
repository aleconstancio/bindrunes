<script lang="ts">
  import { Chart } from 'svelte-chartjs';
  import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    RadialLinearScale,
    Tooltip,
    Legend,
    Filler,
  } from 'chart.js';
  import type { ChartData, ChartOptions } from 'chart.js';
  ChartJS.register(
    CategoryScale, LinearScale, PointElement, LineElement,
    BarElement, ArcElement, RadialLinearScale, Tooltip, Legend, Filler
  );

  type ChartType = 'line' | 'bar' | 'doughnut' | 'radar' | 'scatter';

  let {
    type = 'line' as ChartType,
    data,
    options = {},
    class: className = '',
  }: {
    type?: ChartType;
    data: ChartData<'line' | 'bar' | 'doughnut' | 'radar' | 'scatter', (number | [number, number] | import('chart.js').Point | import('chart.js').BubbleDataPoint)[], unknown>;
    options?: ChartOptions<'line' | 'bar' | 'doughnut' | 'radar' | 'scatter'>;
    class?: string;
  } = $props();
</script>

<div class="w-full {className}">
  <Chart {type} {data} {options} />
</div>
