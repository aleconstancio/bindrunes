<script lang="ts">
import type { Snippet } from "svelte";
import type { TFunction } from "../../shared-types";
import { useLanding } from "./landing-context.svelte";

import type { Plan } from "./landing-types";

interface Props {
	plans: Plan[];
	showToggle?: boolean;
	currency?: string;
	locale?: string;
	customCard?: Snippet<[Plan, { annual: boolean; format: (n: number) => string }]>;
	customFeature?: Snippet<[string, Plan]>;
	children?: Snippet;
	class?: string;
	t?: TFunction;
}

let {
	plans,
	showToggle = true,
	currency = "BRL",
	locale = "pt-BR",
	customCard,
	customFeature,
	children,
	class: className = "",
	t,
}: Props = $props();

const landing = useLanding();

let billingAnnual = $state(landing.billingAnnual);
$effect(() => {
	landing.setBillingAnnual(billingAnnual);
});

const _formatCurrency = (n: number) =>
	new Intl.NumberFormat(locale, { style: "currency", currency }).format(n);
</script>

<MetaContainer size="xl" class={className}>
  {#if showToggle}
    <div class="flex items-center justify-center gap-3">
      <span class="text-label-md {!billingAnnual ? 'text-foreground' : 'text-muted-foreground'}">{t?.('landing.PricingTable.monthly') ?? 'Mensal'}</span>
      <Switch bind:checked={billingAnnual} />
      <span class="text-label-md {billingAnnual ? 'text-foreground' : 'text-muted-foreground'}">{t?.('landing.PricingTable.annual') ?? 'Anual'}</span>
      {#if !billingAnnual}
        <Badge variant="primary">{t?.('landing.PricingTable.saveUpTo') ?? 'Economize até 20%'}</Badge>
      {/if}
    </div>
  {/if}

  <div class="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 items-start pricing-grid">
    {#each plans as plan}
      <div class="pricing-card-wrapper {plan.highlight ? 'highlight' : ''}">
        {#if customCard}
          {@render customCard(plan, { annual: billingAnnual, format: formatCurrency })}
        {:else}
          <Card variant="glass" padding class="pricing-card-inner transition-all {plan.highlight ? 'pricing-highlight' : ''} {plan.highlight ? 'scale-[1.03] sm:scale-[1.05]' : 'hover:scale-[1.02] hover:shadow-xl'}">
            {#snippet children()}
              <div class="flex flex-col gap-6 pt-2 pricing-content">
                {#if plan.highlight}
                  <div class="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                    <div class="inline-flex items-center rounded-full border border-primary/30 bg-primary px-3 py-1 text-mono-xs uppercase text-primary-foreground shadow-lg">
                      {plan.badge ?? (t?.('landing.PricingTable.mostChosen') ?? 'Mais escolhido')}
                    </div>
                  </div>
                {/if}
                <div class="text-center pricing-name">
                  <p class="text-label-md uppercase tracking-widest {plan.highlight ? 'text-primary' : 'text-muted-foreground'}">{plan.name}</p>
                </div>
                <div class="text-center pricing-price">
                  {#if billingAnnual}
                    <p class="text-display-2 text-foreground sm:text-display-1">{formatCurrency(plan.annual)}</p>
                    <p class="text-body-md text-muted-foreground">{t?.('landing.PricingTable.perYear') ?? 'por ano'} <span class="text-body-sm text-primary font-medium">({t?.('landing.PricingTable.save') ?? 'economize R$ '}{(plan.monthly * 12 - plan.annual).toLocaleString(locale)})</span></p>
                  {:else}
                    <p class="text-display-2 text-foreground sm:text-display-1">{formatCurrency(plan.monthly)}</p>
                    <p class="text-body-md text-muted-foreground">{t?.('landing.PricingTable.perMonth') ?? 'por mês'}</p>
                  {/if}
                </div>
                <ul class="space-y-3 pricing-features">
                  {#each plan.features as feature}
                    <li class="flex items-start gap-2 text-body-md text-foreground">
                      {#if customFeature}
                        {@render customFeature(feature, plan)}
                      {:else}
                        <Check size={16} class="mt-0.5 shrink-0 text-primary" />
                        <span>{feature}</span>
                      {/if}
                    </li>
                  {/each}
                </ul>
                <div class="mt-auto pt-4 pricing-cta">
                  <Button variant={plan.cta.variant === 'primary' ? 'primary' : 'outline'} fullWidth href={plan.cta.href}>{plan.cta.label}</Button>
                </div>
              </div>
            {/snippet}
          </Card>
        {/if}
      </div>
    {/each}
  </div>

  {#if children}
    <div class="mt-8">
      {@render children()}
    </div>
  {/if}
</MetaContainer>

<style>
  :global(.pricing-grid) {
    display: grid;
    grid-template-rows: 1fr;
  }

  :global(.pricing-content) {
    display: grid;
    grid-template-rows: auto auto 1fr auto;
    gap: 1.5rem;
  }

  @supports (grid-template-rows: subgrid) {
    :global(.pricing-grid) {
      grid-template-rows: repeat(3, auto auto 1fr auto);
    }

    :global(.pricing-card-wrapper) {
      display: grid;
      grid-row: span 4;
      grid-template-rows: subgrid;
    }

    :global(.pricing-card-inner) {
      height: 100%;
    }

    :global(.pricing-content) {
      display: contents;
    }

    :global(.pricing-name),
    :global(.pricing-price),
    :global(.pricing-features),
    :global(.pricing-cta) {
      grid-row: auto / span 1;
    }
  }

  :global(.pricing-card-inner) {
    border-radius: var(--radius-lg);
    position: relative;
  }

  :global(.pricing-highlight) {
    box-shadow: var(--shadow-glow-primary);
  }

  :global(.pricing-grid:has(.highlight) .pricing-card-wrapper:not(.highlight)) {
    opacity: 0.85;
    transition: opacity var(--duration-fluid);
  }

  :global(.pricing-grid:has(.highlight) .pricing-card-wrapper:not(.highlight):hover) {
    opacity: 1;
  }
</style>
