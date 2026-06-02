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
    data: any;
    options?: any;
    class?: string;
  } = $props();
</script>

<div class="w-full {className}">
  <Chart {type} {data} {options} />
</div>
