<script lang="ts">
  import type { Snippet } from 'svelte';
  import { Check, X } from 'lucide-svelte';

  interface Feature {
    name: string;
    plans: Record<string, boolean | string>;
  }

  interface Plan {
    name: string;
    highlight?: boolean;
  }

  interface Props {
    plans: Plan[];
    features: Feature[];
    children?: Snippet;
  }

  let { plans, features, children }: Props = $props();
</script>

<div class="overflow-x-auto px-6 py-12 section-reveal">
  <table class="w-full border-collapse">
    <thead>
      <tr>
        <th class="text-left py-4 px-4 text-sm font-medium text-muted-foreground">Recurso</th>
        {#each plans as plan}
          <th class="text-center py-4 px-4 text-sm font-bold {plan.highlight ? 'text-primary' : 'text-foreground'}">
            {plan.name}
          </th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each features as feature}
        <tr class="border-t border-border">
          <td class="py-4 px-4 text-sm text-foreground">{feature.name}</td>
          {#each plans as plan}
            <td class="text-center py-4 px-4">
              {#if typeof feature.plans[plan.name] === 'string'}
                <span class="text-sm text-foreground">{feature.plans[plan.name]}</span>
              {:else if feature.plans[plan.name]}
                <Check size={18} class="mx-auto text-success" />
              {:else}
                <X size={18} class="mx-auto text-muted-foreground/50" />
              {/if}
            </td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</div>

{#if children}
  <div class="mt-8">
    {@render children()}
  </div>
{/if}
