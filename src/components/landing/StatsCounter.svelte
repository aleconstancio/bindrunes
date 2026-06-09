<script lang="ts">
import type { Snippet } from "svelte";
import { onMount } from "svelte";
import { getGridClass } from "./landing-utils";

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
	class?: string;
}

let { stats, columns = 4, duration = 2000, children, class: className = "" }: Props = $props();

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
		{ threshold: 0.3 },
	);
	observer.observe(element);
	return () => observer.disconnect();
});

function animateValue(
	start: number,
	end: number,
	dur: number,
	onFrame?: (value: number) => void,
): Promise<number> {
	return new Promise((resolve) => {
		const startTime = performance.now();
		function update(currentTime: number) {
			const elapsed = currentTime - startTime;
			const progress = Math.min(elapsed / dur, 1);
			const eased = 1 - (1 - progress) ** 3;
			const current = Math.round(start + (end - start) * eased);
			onFrame?.(current);
			if (progress < 1) {
				requestAnimationFrame(update);
			} else {
				resolve(current);
			}
		}
		requestAnimationFrame(update);
	});
}

let displayValues = $state(stats.map(() => 0));
let cancelled = $state(false);

$effect(() => {
	if (visible) {
		cancelled = false;
		stats.forEach(async (stat, i) => {
			await animateValue(0, stat.value, duration, (val) => {
				if (cancelled) return;
				displayValues[i] = val;
			});
		});
	}
	return () => {
		cancelled = true;
	};
});
</script>

<div bind:this={element} class="grid {getGridClass(columns)} gap-8 px-6 py-12 section-reveal {className}">
  {#each stats as stat, i}
    <div class="stagger-enter text-center" style="--stagger-index: {i}">
      <p class="text-display-2 text-foreground">
        {stat.prefix ?? ''}{displayValues[i].toLocaleString()}{stat.suffix ?? ''}
      </p>
      <p class="mt-2 text-label-md text-muted-foreground">{stat.label}</p>
    </div>
  {/each}

  {#if children}
    <div class="mt-8">
      {@render children()}
    </div>
  {/if}
</div>
