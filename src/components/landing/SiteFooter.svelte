<script lang="ts">
  import type { Component } from 'svelte';
  import type { Snippet } from 'svelte';
  import type { TFunction } from '../../shared-types';

  import type { FooterLink } from './landing-types';

  interface Props {
    logo?: { label: string; icon?: Component | string };
    links?: FooterLink[];
    copyright?: string;
    bottomLinks?: FooterLink[];
    children?: Snippet;
    class?: string;
    t?: TFunction;
  }

  let {
    logo,
    links = [],
    copyright,
    bottomLinks = [],
    children,
    class: className = '',
    t,
  }: Props = $props();

  const year = new Date().getFullYear();
</script>

<footer class="border-t border-border px-6 py-12 {className}">
  <div class="mx-auto max-w-6xl">
    <div class="flex flex-col items-center gap-8 sm:flex-row sm:justify-between">
      {#if logo}
        <div class="flex items-center gap-2">
          {#if logo.icon}
            {#if typeof logo.icon === 'string'}
              <span class="text-title-1">{logo.icon}</span>
            {:else}
              {@const Icon = logo.icon}
              <Icon size={22} class="text-primary" />
            {/if}
          {/if}
          <span class="text-title-1 font-bold text-foreground">{logo.label}</span>
        </div>
      {/if}
      {#if links.length > 0}
        <nav class="flex flex-wrap items-center justify-center gap-6" aria-label="Links">
          {#each links as link}
            <a
              href={link.href}
              class="text-label-md text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          {/each}
        </nav>
      {/if}
    </div>
    <div class="mt-8 flex flex-col items-center gap-4 border-t border-border pt-8 sm:flex-row sm:justify-between">
      <p class="text-body-sm text-muted-foreground">
        {copyright ?? `\u00a9 ${year}. ${t?.('landing.SiteFooter.allRightsReserved') ?? 'Todos os direitos reservados.'}`}
      </p>
      {#if bottomLinks.length > 0}
        <nav class="flex flex-wrap items-center gap-4" aria-label={t?.('landing.SiteFooter.legalLinks') ?? 'Links legais'}>
          {#each bottomLinks as link}
            <a
              href={link.href}
              class="text-body-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          {/each}
        </nav>
      {/if}
    </div>
    {#if children}
      <div class="mt-8">
        {@render children()}
      </div>
    {/if}
  </div>
</footer>
