<script lang="ts">
  import type { Component } from 'svelte';
  import type { Snippet } from 'svelte';

  interface FooterLink {
    label: string;
    href: string;
  }

  interface Props {
    logo?: { label: string; icon?: Component };
    links?: FooterLink[];
    copyright?: string;
    bottomLinks?: FooterLink[];
    children?: Snippet;
  }

  let {
    logo,
    links = [],
    copyright,
    bottomLinks = [],
    children,
  }: Props = $props();

  const year = new Date().getFullYear();
</script>

<footer class="border-t border-border px-6 py-12">
  <div class="mx-auto max-w-6xl">
    <div class="flex flex-col items-center gap-8 sm:flex-row sm:justify-between">
      {#if logo}
        <div class="flex items-center gap-2">
          {#if logo.icon}
            <logo.icon size={22} class="text-primary" />
          {/if}
          <span class="text-lg font-bold text-foreground">{logo.label}</span>
        </div>
      {/if}
      {#if links.length > 0}
        <nav class="flex flex-wrap items-center justify-center gap-6">
          {#each links as link}
            <a
              href={link.href}
              class="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          {/each}
        </nav>
      {/if}
    </div>
    <div class="mt-8 flex flex-col items-center gap-4 border-t border-border pt-8 sm:flex-row sm:justify-between">
      <p class="text-xs text-muted-foreground">
        {copyright ?? `\u00a9 ${year}. Todos os direitos reservados.`}
      </p>
      {#if bottomLinks.length > 0}
        <nav class="flex flex-wrap items-center gap-4">
          {#each bottomLinks as link}
            <a
              href={link.href}
              class="text-xs text-muted-foreground transition-colors hover:text-foreground"
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
