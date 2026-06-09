<script lang="ts">
  import { onMount } from 'svelte';
  import type { Snippet } from 'svelte';
  import DynamicIcon from '../DynamicIcon.svelte';
  import { getGridClass } from './landing-utils';

  import type { Integration } from './landing-types';

  interface Props {
    title?: string;
    integrations: Integration[];
    columns?: 1 | 2 | 3;
    children?: Snippet;
    class?: string;
  }

  let { title, integrations, columns = 3, children, class: className = '' }: Props = $props();

  let visible = $state(false);
  let grid: HTMLElement;

  onMount(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          visible = true;
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(grid);
    return () => observer.disconnect();
  });

</script>

<div class="px-6 py-12 section-reveal {className}">
  {#if title}
    <h2 class="text-center text-display-3 text-foreground mb-10">{title}</h2>
  {/if}
  <div bind:this={grid} class="grid {getGridClass(columns)} gap-6">
    {#each integrations as integration, i}
      <div class="stagger-enter" style="--stagger-index: {i}">
      <svelte:element
        this={integration.href ? 'a' : 'div'}
        href={integration.href}
        class="flex items-start gap-4 rounded-[--radius] border border-border p-4 transition-all no-underline {integration.href ? 'hover:scale-[1.02] hover:shadow-xl' : ''}"
      >
        <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <DynamicIcon icon={integration.icon} size={20} class="text-title-1" />
        </div>
        <div>
          <h3 class="text-title-2 text-foreground">{integration.title}</h3>
          <p class="mt-1 text-body-sm text-muted-foreground">{integration.description}</p>
        </div>
      </svelte:element>
      </div>
    {/each}
  </div>

  {#if children}
    <div class="mt-8">
      {@render children()}
    </div>
  {/if}
</div>
