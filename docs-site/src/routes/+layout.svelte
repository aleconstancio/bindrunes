<script lang="ts">
import "../app.css";
import { AppProvider } from "bindrunes";
import { page } from "$app/state";
import { docsNav, examplesNav, kitNav, migrationNav, type NavItem } from "$lib/navigation";

let { children } = $props();

let expandedSections = $state<Record<string, boolean>>({
	docs: true,
	kit: false,
	migration: false,
	examples: false,
});

function toggleSection(section: string) {
	expandedSections[section] = !expandedSections[section];
}

function isActive(href: string): boolean {
	return page.url.pathname === href || page.url.pathname.startsWith(href + "/");
}

function isActiveSection(items: NavItem[]): boolean {
	return items.some((item) => isActive(item.href));
}
</script>

<AppProvider>
  <div class="min-h-screen flex flex-col">
    <!-- Top bar -->
    <header class="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <div class="flex h-14 items-center px-4 lg:px-6">
        <a href="/" class="flex items-center gap-2 font-semibold text-foreground">
          <span class="text-lg">⬡</span>
          <span>bindrunes</span>
        </a>
        <nav class="ml-8 flex items-center gap-1 text-sm">
          <a
            href="/docs"
            class="px-3 py-1.5 rounded-md transition-colors {page.url.pathname.startsWith('/docs')
              ? 'bg-accent text-accent-foreground'
              : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'}"
          >
            Docs
          </a>
          <a
            href="/kit"
            class="px-3 py-1.5 rounded-md transition-colors {page.url.pathname.startsWith('/kit')
              ? 'bg-accent text-accent-foreground'
              : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'}"
          >
            Kit
          </a>
          <a
            href="/migration"
            class="px-3 py-1.5 rounded-md transition-colors {page.url.pathname.startsWith('/migration')
              ? 'bg-accent text-accent-foreground'
              : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'}"
          >
            Migration
          </a>
          <a
            href="/examples"
            class="px-3 py-1.5 rounded-md transition-colors {page.url.pathname.startsWith('/examples')
              ? 'bg-accent text-accent-foreground'
              : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'}"
          >
            Examples
          </a>
        </nav>
        <div class="ml-auto flex items-center gap-3">
          <a
            href="https://www.npmjs.com/package/bindrunes"
            target="_blank"
            rel="noopener noreferrer"
            class="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            npm
          </a>
          <a
            href="https://github.com/bindrunes/bindrunes"
            target="_blank"
            rel="noopener noreferrer"
            class="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </header>

    <div class="flex flex-1">
      <!-- Sidebar -->
      <aside class="hidden lg:block w-64 shrink-0 border-r border-border overflow-y-auto sticky top-14 h-[calc(100vh-3.5rem)]">
        <nav class="p-4 space-y-1">
          <!-- Docs section -->
          <div>
            <button
              onclick={() => toggleSection("docs")}
              class="flex items-center justify-between w-full px-2 py-1.5 text-sm font-semibold text-foreground rounded-md hover:bg-accent/50 transition-colors"
            >
              <span>Docs</span>
              <svg
                class="w-4 h-4 text-muted-foreground transition-transform {expandedSections.docs
                  ? 'rotate-90'
                  : ''}"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
            {#if expandedSections.docs}
              <div class="ml-2 mt-1 space-y-0.5 border-l border-border pl-3">
                {#each docsNav as item}
                  <a
                    href={item.href}
                    class="block px-2 py-1.5 text-sm rounded-md transition-colors {isActive(item.href)
                      ? 'bg-accent text-accent-foreground font-medium'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'}"
                  >
                    {item.label}
                  </a>
                {/each}
              </div>
            {/if}
          </div>

          <!-- Kit section -->
          <div>
            <button
              onclick={() => toggleSection("kit")}
              class="flex items-center justify-between w-full px-2 py-1.5 text-sm font-semibold text-foreground rounded-md hover:bg-accent/50 transition-colors"
            >
              <span>Kit</span>
              <svg
                class="w-4 h-4 text-muted-foreground transition-transform {expandedSections.kit
                  ? 'rotate-90'
                  : ''}"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
            {#if expandedSections.kit}
              <div class="ml-2 mt-1 space-y-0.5 border-l border-border pl-3">
                {#each kitNav as item}
                  <a
                    href={item.href}
                    class="block px-2 py-1.5 text-sm rounded-md transition-colors {isActive(item.href)
                      ? 'bg-accent text-accent-foreground font-medium'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'}"
                  >
                    {item.label}
                  </a>
                {/each}
              </div>
            {/if}
          </div>

          <!-- Migration section -->
          <div>
            <button
              onclick={() => toggleSection("migration")}
              class="flex items-center justify-between w-full px-2 py-1.5 text-sm font-semibold text-foreground rounded-md hover:bg-accent/50 transition-colors"
            >
              <span>Migration</span>
              <svg
                class="w-4 h-4 text-muted-foreground transition-transform {expandedSections.migration
                  ? 'rotate-90'
                  : ''}"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
            {#if expandedSections.migration}
              <div class="ml-2 mt-1 space-y-0.5 border-l border-border pl-3">
                {#each migrationNav as item}
                  <a
                    href={item.href}
                    class="block px-2 py-1.5 text-sm rounded-md transition-colors {isActive(item.href)
                      ? 'bg-accent text-accent-foreground font-medium'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'}"
                  >
                    {item.label}
                  </a>
                {/each}
              </div>
            {/if}
          </div>

          <!-- Examples section -->
          <div>
            <button
              onclick={() => toggleSection("examples")}
              class="flex items-center justify-between w-full px-2 py-1.5 text-sm font-semibold text-foreground rounded-md hover:bg-accent/50 transition-colors"
            >
              <span>Examples</span>
              <svg
                class="w-4 h-4 text-muted-foreground transition-transform {expandedSections.examples
                  ? 'rotate-90'
                  : ''}"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
            {#if expandedSections.examples}
              <div class="ml-2 mt-1 space-y-0.5 border-l border-border pl-3">
                {#each examplesNav as item}
                  <a
                    href={item.href}
                    class="block px-2 py-1.5 text-sm rounded-md transition-colors {isActive(item.href)
                      ? 'bg-accent text-accent-foreground font-medium'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'}"
                  >
                    {item.label}
                  </a>
                {/each}
              </div>
            {/if}
          </div>
        </nav>
      </aside>

      <!-- Main content -->
      <main class="flex-1 min-w-0 overflow-y-auto">
        {@render children()}
      </main>
    </div>
  </div>
</AppProvider>
