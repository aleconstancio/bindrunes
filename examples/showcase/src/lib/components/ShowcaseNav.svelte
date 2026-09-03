<script lang="ts">
  import { Button, ThemeToggle } from "urupe-ui";
  import { Menu, X, ChevronDown } from "lucide-svelte";
  import { slide } from "svelte/transition";

  let {
    pathname = "/",
    children,
  }: {
    pathname?: string;
    children: import("svelte").Snippet;
  } = $props();

  let mobileOpen = $state(false);
  let openSection = $state<string | null>(null);

  const sections = [
    {
      label: "Demos",
      items: [
        { href: "/app", label: "App Shell" },
        { href: "/auth/login", label: "Auth" },
        { href: "/dashboard", label: "Dashboard" },
        { href: "/settings", label: "Settings" },
        { href: "/landing", label: "Landing" },
        { href: "/marketing/blog", label: "Marketing" },
        { href: "/portfolio", label: "Portfolio" },
        { href: "/data/list", label: "Data" },
        { href: "/ecommerce", label: "E-commerce" },
        { href: "/media", label: "Media" },
        { href: "/calendar", label: "Calendar" },
        { href: "/chat", label: "Chat" },
      ],
    },
    {
      label: "Design",
      items: [
        { href: "/themes", label: "Themes" },
        { href: "/aesthetics", label: "Aesthetics" },
        { href: "/components", label: "Components" },
        { href: "/playground", label: "Playground" },
      ],
    },
    {
      label: "Docs",
      items: [
        { href: "/docs/getting-started", label: "Getting Started" },
        { href: "/docs/architecture", label: "Architecture" },
        { href: "/docs/components", label: "Components" },
        { href: "/docs/composables", label: "Composables" },
        { href: "/docs/design-system", label: "Design System" },
        { href: "/docs/accessibility", label: "Accessibility" },
        { href: "/docs/security", label: "Security" },
        { href: "/docs/testing", label: "Testing" },
        { href: "/docs/agentic", label: "Agentic" },
        { href: "/docs/changelog", label: "Changelog" },
        { href: "/docs/contributing", label: "Contributing" },
      ],
    },
    {
      label: "Kit",
      items: [
        { href: "/kit/getting-started", label: "Getting Started" },
        { href: "/kit/full-stack", label: "Full-Stack" },
        { href: "/kit/auth", label: "Auth" },
        { href: "/kit/i18n", label: "i18n" },
        { href: "/kit/deployment", label: "Deployment" },
        { href: "/kit/api-reference", label: "API Reference" },
      ],
    },
    {
      label: "Migration",
      items: [
        { href: "/migration/shadcn-svelte", label: "shadcn-svelte" },
        { href: "/migration/bootstrap", label: "Bootstrap" },
        { href: "/migration/ant-design", label: "Ant Design" },
        { href: "/migration/material-ui", label: "Material UI" },
      ],
    },
    {
      label: "Blog",
      items: [
        { href: "/blog/why-bindrunes", label: "Why urupe-ui" },
        { href: "/blog/3-axis-design-system", label: "3-Axis Design" },
      ],
    },
  ];

  function isActive(href: string): boolean {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  }

  function closeMobile() {
    mobileOpen = false;
    openSection = null;
  }

  function toggleSection(label: string) {
    openSection = openSection === label ? null : label;
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === "Escape") closeMobile();
  }
</script>

<svelte:window onkeydown={handleKeydown} />

<header class="nav-topbar">
  <div class="nav-topbar-inner">
    <a href="/" class="nav-logo" onclick={closeMobile}>
      <span class="nav-logo-icon">⬡</span>
      <span class="nav-logo-text">urupe-ui</span>
    </a>

    <nav class="hidden lg:flex items-center gap-1">
      {#each sections as section}
        <div class="relative group">
          <button
            type="button"
            class="nav-link"
            onclick={() => toggleSection(section.label)}
          >
            {section.label}
            <ChevronDown size={14} class="opacity-50" />
          </button>
          {#if openSection === section.label}
            <div
              class="absolute top-full left-0 mt-1 w-56 py-1 rounded-lg border border-border bg-background/95 backdrop-blur-lg shadow-xl z-50"
              role="menu"
            >
              {#each section.items as item}
                <a
                  href={item.href}
                  class="block px-3 py-1.5 text-sm transition-colors {isActive(item.href)
                    ? 'text-primary bg-primary/10 font-medium'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'}"
                  role="menuitem"
                  onclick={() => (openSection = null)}
                >
                  {item.label}
                </a>
              {/each}
            </div>
          {/if}
        </div>
      {/each}
    </nav>

    <div class="flex items-center gap-2">
      <Button href="/docs/getting-started" variant="primary" size="sm">Get Started</Button>
      <Button href="https://github.com/aleconstancio/urupe-ui" variant="ghost" size="sm" target="_blank" rel="noopener noreferrer">GitHub</Button>
      <ThemeToggle />

      <button
        type="button"
        class="nav-hamburger"
        onclick={() => (mobileOpen = !mobileOpen)}
        aria-label={mobileOpen ? "Close menu" : "Open menu"}
        aria-expanded={mobileOpen}
      >
        {#if mobileOpen}
          <X size={20} />
        {:else}
          <Menu size={20} />
        {/if}
      </button>
    </div>
  </div>

  {#if mobileOpen}
    <div transition:slide={{ duration: 200 }} class="nav-mobile-menu lg:hidden">
      <div class="space-y-4">
        {#each sections as section}
          <div>
            <button
              type="button"
              class="flex items-center justify-between w-full text-sm font-semibold text-foreground"
              onclick={() => toggleSection(section.label)}
            >
              <span>{section.label}</span>
              <ChevronDown size={14} class="transition-transform {openSection === section.label ? 'rotate-180' : ''}" />
            </button>
            {#if openSection === section.label}
              <div transition:slide={{ duration: 150 }} class="mt-2 ml-2 space-y-1">
                {#each section.items as item}
                  <a
                    href={item.href}
                    class="block px-2 py-1.5 text-sm rounded-md transition-colors {isActive(item.href)
                      ? 'text-primary bg-primary/10 font-medium'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'}"
                    onclick={closeMobile}
                  >
                    {item.label}
                  </a>
                {/each}
              </div>
            {/if}
          </div>
        {/each}
      </div>
    </div>
  {/if}
</header>

{#if mobileOpen}
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    class="fixed inset-0 bg-black/50 z-40 lg:hidden"
    onclick={closeMobile}
  ></div>
{/if}

{@render children()}

<style>
  .nav-topbar {
    position: sticky;
    top: 0;
    z-index: 50;
    background-color: oklch(from var(--background) l c h / 0.88);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--border);
  }

  .nav-topbar-inner {
    max-width: 80rem;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1.5rem;
    height: 3.5rem;
  }

  .nav-logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    text-decoration: none;
  }

  .nav-logo-icon {
    font-size: 1.25rem;
  }

  .nav-logo-text {
    font-size: 1.125rem;
    font-weight: 700;
    color: var(--foreground);
  }

  .nav-link {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.375rem 0.75rem;
    border-radius: var(--radius-sm, 0.375rem);
    font-size: 0.8125rem;
    font-weight: 500;
    color: var(--muted-foreground);
    background: transparent;
    border: none;
    cursor: pointer;
    transition: all 150ms ease;
  }

  .nav-link:hover {
    color: var(--foreground);
    background: var(--muted);
  }

  .nav-hamburger {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    border-radius: var(--radius, 0.5rem);
    border: none;
    background: transparent;
    cursor: pointer;
    color: var(--muted-foreground);
    transition: all 150ms ease;
  }

  .nav-hamburger:hover {
    background: var(--muted);
    color: var(--foreground);
  }

  .nav-hamburger:focus-visible {
    outline: 2px solid var(--primary);
    outline-offset: 2px;
  }

  @media (min-width: 1024px) {
    .nav-hamburger {
      display: none;
    }
  }

  .nav-mobile-menu {
    border-top: 1px solid var(--border);
    background-color: oklch(from var(--background) l c h / 0.95);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    padding: 1.25rem 1.5rem;
  }
</style>
