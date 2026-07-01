<script lang="ts">
import "../app.css";
import "../app-docs.css";
import { AppProvider } from "bindrunes";
import { page } from "$app/state";
import { blogNav, docsNav, examplesNav, kitNav, migrationNav, type NavItem } from "$lib/navigation";

let { children } = $props();

let expandedSections = $state<Record<string, boolean>>({
	docs: true,
	kit: false,
	migration: false,
	blog: false,
	examples: false,
});

function toggleSection(section: string) {
	expandedSections[section] = !expandedSections[section];
}

function isActive(href: string): boolean {
	return page.url.pathname === href || page.url.pathname.startsWith(`${href}/`);
}

function isActiveSection(items: NavItem[]): boolean {
	return items.some((item) => isActive(item.href));
}
</script>

<AppProvider themeDefault="editorial" aestheticDefault="minimal" densityDefault="comfortable">
  <div class="min-h-screen flex flex-col">
    <!-- Header -->
    <header class="docs-header sticky top-0 z-50">
      <div class="flex h-14 items-center px-4 lg:px-6 max-w-screen-2xl mx-auto">
        <a href="/" class="flex items-center gap-2.5 font-semibold text-foreground no-underline mr-8">
          <span class="text-lg">⬡</span>
          <span>bindrunes</span>
        </a>
        <nav class="flex items-center gap-1">
          {#each [
            { href: "/docs", label: "Docs" },
            { href: "/kit", label: "Kit" },
            { href: "/migration", label: "Migration" },
            { href: "/examples", label: "Examples" },
            { href: "/blog/why-bindrunes", label: "Blog" },
          ] as nav}
            <a
              href={nav.href}
              class="docs-header-link"
              class:active={page.url.pathname.startsWith(nav.href)}
            >
              {nav.label}
            </a>
          {/each}
        </nav>
        <div class="ml-auto flex items-center gap-3">
          <a href="https://www.npmjs.com/package/bindrunes" target="_blank" rel="noopener noreferrer" class="docs-header-link">npm</a>
          <a href="https://github.com/aleconstancio/bindrunes" target="_blank" rel="noopener noreferrer" class="docs-header-link">GitHub</a>
        </div>
      </div>
    </header>

    <div class="flex flex-1 max-w-screen-2xl mx-auto w-full">
      <!-- Sidebar -->
      <aside class="docs-sidebar hidden lg:block w-64 shrink-0 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto">
        <nav class="p-4 space-y-4">
          {#each [
            { key: "docs", label: "Docs", items: docsNav },
            { key: "kit", label: "Kit", items: kitNav },
            { key: "migration", label: "Migration", items: migrationNav },
            { key: "blog", label: "Blog", items: blogNav },
            { key: "examples", label: "Examples", items: examplesNav },
          ] as section}
            <div>
              <button
                onclick={() => toggleSection(section.key)}
                class="flex items-center justify-between w-full px-2 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground rounded-md hover:text-foreground transition-colors"
              >
                <span>{section.label}</span>
                <svg class="w-3.5 h-3.5 transition-transform {expandedSections[section.key] ? 'rotate-90' : ''}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
              {#if expandedSections[section.key]}
                <div class="mt-1 ml-1 space-y-0.5">
                  {#each section.items as item}
                    <a
                      href={item.href}
                      class="docs-sidebar-link"
                      class:active={isActive(item.href)}
                    >
                      {item.label}
                    </a>
                  {/each}
                </div>
              {/if}
            </div>
          {/each}
        </nav>
      </aside>

      <!-- Main content -->
      <main class="docs-content flex-1 min-w-0">
        {@render children()}
      </main>
    </div>
  </div>
</AppProvider>
