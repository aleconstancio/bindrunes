<script lang="ts">
  import type { Snippet } from 'svelte';
  import { onMount } from 'svelte';

  interface Stat {
    value: number;
    label: string;
    suffix?: string;
    prefix?: string;
  }

  interface Props {
    stats: Stat[];
    columns?: 1 | 2 | 3 | 4;
    duration?: number;
    children?: Snippet;
  }

  let { stats, columns = 4, duration = 2000, children }: Props = $props();

  const gridClass = $derived(
    columns === 1 ? 'grid-cols-1'
      : columns === 2 ? 'grid-cols-1 sm:grid-cols-2'
      : columns === 4 ? 'grid-cols-2 sm:grid-cols-4'
      : 'grid-cols-2 sm:grid-cols-3'
  );

  let visible = $state(false);
  let element: HTMLElement;

  onMount(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          visible = true;
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(element);
    return () => observer.disconnect();
  });

  function animateValue(start: number, end: number, dur: number): Promise<number> {
    return new Promise((resolve) => {
      const startTime = performance.now();
      function update(currentTime: number) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / dur, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        resolve(Math.round(start + (end - start) * eased));
      }
      requestAnimationFrame(update);
    });
  }

  let displayValues = $state(stats.map(() => 0));

  $effect(() => {
    if (visible) {
      stats.forEach(async (stat, i) => {
        const val = await animateValue(0, stat.value, duration);
        displayValues[i] = val;
      });
    }
  });
</script>

<div bind:this={element} class="grid {gridClass} gap-8 px-6 py-12 section-reveal">
  {#each stats as stat, i}
    <div class="text-center">
      <p class="text-4xl font-extrabold text-foreground">
        {stat.prefix ?? ''}{displayValues[i].toLocaleString()}{stat.suffix ?? ''}
      </p>
      <p class="mt-2 text-sm font-medium text-muted-foreground">{stat.label}</p>
    </div>
  {/each}
</div>

{#if children}
  <div class="mt-8">
    {@render children()}
  </div>
{/if}
