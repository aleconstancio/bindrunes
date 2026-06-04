<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { Component } from 'svelte';
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

</script>

<div class="px-6 py-12 section-reveal {className}">
  {#if title}
    <h2 class="text-center text-display-3 text-foreground mb-10">{title}</h2>
  {/if}
  <div class="grid {getGridClass(columns)} gap-6">
    {#each integrations as integration}
      <svelte:element
        this={integration.href ? 'a' : 'div'}
        href={integration.href}
        class="flex items-start gap-4 rounded-[--radius] border border-border p-4 transition-all no-underline {integration.href ? 'hover:scale-[1.02] hover:shadow-xl' : ''}"
      >
        <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          {#if typeof integration.icon === 'string'}
            <span class="text-title-1">{integration.icon}</span>
          {:else}
            {@const Icon = integration.icon}
            <Icon size={20} />
          {/if}
        </div>
        <div>
          <h3 class="text-body-md font-bold text-foreground">{integration.title}</h3>
          <p class="mt-1 text-body-sm text-muted-foreground leading-relaxed">{integration.description}</p>
        </div>
      </svelte:element>
    {/each}
  </div>

  {#if children}
    <div class="mt-8">
      {@render children()}
    </div>
  {/if}
</div>
