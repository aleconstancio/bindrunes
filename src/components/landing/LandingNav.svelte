<script lang="ts">
  import { onMount } from 'svelte';
  import { slide } from 'svelte/transition';
  import { Button, ThemeToggle } from 'bindrunes';
  import { Menu, X } from 'lucide-svelte';
  import { useLanding } from './landing-context.svelte';

  interface NavLogo {
    href: string;
    label: string;
    icon?: any;
  }

  interface NavLink {
    label: string;
    href: string;
  }

  interface NavCTA {
    label: string;
    href: string;
    variant?: 'primary' | 'outline';
  }

  interface Props {
    logo?: NavLogo;
    links: NavLink[];
    cta?: NavCTA;
    sectionIds?: string[];
    children?: any;
  }

  let { logo, links, cta, sectionIds = [], children }: Props = $props();

  const landing = useLanding();

  let observers: IntersectionObserver[] = [];

  onMount(() => {
    observers = sectionIds
      .map((id) => {
        const el = document.getElementById(id);
        if (!el) return null;
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              landing.activeSection = id;
            }
          },
          { rootMargin: '-40% 0px -45% 0px' },
        );
        observer.observe(el);
        return observer;
      })
      .filter(Boolean) as IntersectionObserver[];

    return () => observers.forEach((o) => o.disconnect());
  });
</script>

<nav class="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
  <div class="progress-bar"></div>
  <div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
    {#if logo}
      <a href={logo.href} class="flex items-center gap-2 no-underline">
        {#if logo.icon}
          <logo.icon size={22} class="text-primary" />
        {/if}
        <span class="text-lg font-bold text-foreground">{logo.label}</span>
      </a>
    {:else}
      <div></div>
    {/if}

    <div class="hidden items-center gap-6 md:flex">
      {#each links as link}
        <a
          href={link.href}
          class="text-sm font-medium transition-colors no-underline hover:text-foreground {landing.activeSection === link.href.replace('#', '') ? 'text-foreground' : 'text-muted-foreground'}"
        >
          {link.label}
        </a>
      {/each}
    </div>

    <div class="flex items-center gap-2">
      <div class="hidden sm:block">
        <ThemeToggle variant="icon" />
      </div>
      <button
        class="flex items-center justify-center rounded-lg p-2 transition-colors hover:bg-muted md:hidden"
        onclick={() => (landing.menuOpen = !landing.menuOpen)}
        aria-label="Menu"
      >
        {#if landing.menuOpen}
          <X size={20} class="text-foreground" />
        {:else}
          <Menu size={20} class="text-foreground" />
        {/if}
      </button>
      {#if cta}
        <Button variant={cta.variant ?? 'primary'} href={cta.href} class="text-sm">
          {cta.label}
        </Button>
      {/if}
    </div>
  </div>

  {#if landing.menuOpen}
    <div transition:slide={{ duration: 200 }} class="border-t border-border bg-background/95 backdrop-blur-lg px-6 py-5 md:hidden">
      <div class="flex flex-col gap-5">
        {#each links as link}
          <a
            href={link.href}
            class="text-left text-base font-medium no-underline transition-colors hover:text-foreground {landing.activeSection === link.href.replace('#', '') ? 'text-foreground' : 'text-muted-foreground'}"
            onclick={() => (landing.menuOpen = false)}
          >
            {link.label}
          </a>
        {/each}
        <div class="border-t border-border pt-4">
          <div class="flex items-center gap-3">
            <ThemeToggle variant="icon" />
            <span class="text-sm text-muted-foreground">Alternar tema</span>
          </div>
        </div>
      </div>
    </div>
  {/if}
</nav>

<style>
  .progress-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    background: oklch(0.55 0.18 240);
    transform-origin: left;
    scale: 0 1;
    animation: progress linear;
    animation-timeline: scroll(root);
  }

  @supports not (animation-timeline: scroll()) {
    .progress-bar {
      display: none;
    }
  }
</style>
