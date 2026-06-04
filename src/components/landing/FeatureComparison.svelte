<script lang="ts">
  import type { Snippet } from 'svelte';
  import { Check, X } from 'lucide-svelte';
  import type { TFunction } from '../../shared-types';

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
    class?: string;
    t?: TFunction;
  }

  let { plans, features, children, class: className = '', t }: Props = $props();
</script>

<div class="overflow-x-auto px-6 py-12 section-reveal {className}">
  <table class="w-full border-collapse">
    <thead>
      <tr>
        <th class="text-left py-4 px-4 text-label-md text-muted-foreground">{t?.('landing.FeatureComparison.feature') ?? 'Recurso'}</th>
        {#each plans as plan}
          <th class="text-center py-4 px-4 text-label-md font-bold {plan.highlight ? 'text-primary' : 'text-foreground'}">
            {plan.name}
          </th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each features as feature}
        <tr class="border-t border-border">
          <td class="py-4 px-4 text-body-md text-foreground">{feature.name}</td>
          {#each plans as plan}
            <td class="text-center py-4 px-4">
              {#if typeof feature.plans[plan.name] === 'string'}
                <span class="text-body-md text-foreground">{feature.plans[plan.name]}</span>
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

  {#if children}
    <div class="mt-8">
      {@render children()}
    </div>
  {/if}
</div>
