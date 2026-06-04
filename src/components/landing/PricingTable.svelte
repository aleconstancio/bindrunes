<script lang="ts">
  import type { Snippet } from 'svelte';
  import { Card, Badge, Button } from 'bindrunes';
  import { Check } from 'lucide-svelte';
  import { useLanding } from './landing-context.svelte';

  interface Plan {
    name: string;
    monthly: number;
    annual: number;
    features: string[];
    cta: { label: string; href: string; variant?: 'primary' | 'outline' };
    highlight?: boolean;
    badge?: string;
  }

  interface Props {
    plans: Plan[];
    showToggle?: boolean;
    currency?: string;
    locale?: string;
    customCard?: Snippet<[Plan, { annual: boolean; format: (n: number) => string }]>;
    customFeature?: Snippet<[string, Plan]>;
    children?: Snippet;
  }

  let {
    plans,
    showToggle = true,
    currency = 'BRL',
    locale = 'pt-BR',
    customCard,
    customFeature,
    children,
  }: Props = $props();

  const landing = useLanding();

  const formatCurrency = (n: number) =>
    new Intl.NumberFormat(locale, { style: 'currency', currency }).format(n);
</script>

<div class="mx-auto max-w-6xl">
  {#if showToggle}
    <div class="flex items-center justify-center gap-3">
      <span class="text-sm font-medium {!landing.billingAnnual ? 'text-foreground' : 'text-muted-foreground'}">Mensal</span>
      <button
        role="switch"
        aria-checked={landing.billingAnnual}
        class="relative h-6 w-11 rounded-full transition-colors {landing.billingAnnual ? 'bg-primary' : 'bg-muted-foreground/30'}"
        onclick={() => (landing.billingAnnual = !landing.billingAnnual)}
        aria-label="Alternar para faturamento anual"
      >
        <span class="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-foreground transition-transform {landing.billingAnnual ? 'translate-x-5' : 'translate-x-0'}"></span>
      </button>
      <span class="text-sm font-medium {landing.billingAnnual ? 'text-foreground' : 'text-muted-foreground'}">Anual</span>
      {#if !landing.billingAnnual}
        <Badge variant="primary">Economize até 20%</Badge>
      {/if}
    </div>
  {/if}

  <div class="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3 items-start pricing-grid">
    {#each plans as plan}
      <div class="pricing-card-wrapper {plan.highlight ? 'highlight' : ''}">
        {#if customCard}
          {@render customCard(plan, { annual: landing.billingAnnual, format: formatCurrency })}
        {:else}
          <Card variant="glass" padding class="pricing-card-inner transition-all {plan.highlight ? 'pricing-highlight' : ''} {plan.highlight ? 'scale-[1.03] sm:scale-[1.05]' : 'hover:scale-[1.02] hover:shadow-xl'}">
            {#snippet children()}
              <div class="flex flex-col gap-6 pt-2 pricing-content">
                {#if plan.highlight}
                  <div class="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                    <div class="inline-flex items-center rounded-full border border-primary/30 bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary-foreground shadow-lg">
                      {plan.badge ?? 'Mais escolhido'}
                    </div>
                  </div>
                {/if}
                <div class="text-center pricing-name">
                  <p class="text-sm font-bold uppercase tracking-widest {plan.highlight ? 'text-primary' : 'text-muted-foreground'}">{plan.name}</p>
                </div>
                <div class="text-center pricing-price">
                  {#if landing.billingAnnual}
                    <p class="text-5xl font-extrabold text-foreground sm:text-6xl">{formatCurrency(plan.annual)}</p>
                    <p class="text-sm text-muted-foreground">por ano <span class="text-xs text-primary font-medium">(economize R$ {(plan.monthly * 12 - plan.annual).toLocaleString(locale)})</span></p>
                  {:else}
                    <p class="text-5xl font-extrabold text-foreground sm:text-6xl">{formatCurrency(plan.monthly)}</p>
                    <p class="text-sm text-muted-foreground">por mês</p>
                  {/if}
                </div>
                <ul class="space-y-3 pricing-features">
                  {#each plan.features as feature}
                    <li class="flex items-start gap-2 text-sm text-foreground">
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
</div>

{#if children}
  <div class="mt-8">
    {@render children()}
  </div>
{/if}

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
    border-radius: 1.25rem;
    position: relative;
  }

  :global(.pricing-highlight) {
    box-shadow: 0 0 30px oklch(0.55 0.18 240 / 0.15);
  }

  :global(.pricing-grid:has(.highlight) .pricing-card-wrapper:not(.highlight)) {
    opacity: 0.85;
    transition: opacity 0.3s;
  }

  :global(.pricing-grid:has(.highlight) .pricing-card-wrapper:not(.highlight):hover) {
    opacity: 1;
  }
</style>
