<script lang="ts">
import type { Snippet } from "svelte";
import MetaContainer from "../../layouts/MetaContainer.svelte";

interface FooterColumn {
	title: string;
	links: { label: string; href: string }[];
}

let {
	columns = [] as FooterColumn[],
	copyright = "",
	socialLinks = [] as { label: string; href: string; icon?: string }[],
	class: className = "",
}: {
	columns?: FooterColumn[];
	copyright?: string;
	socialLinks?: { label: string; href: string; icon?: string }[];
	class?: string;
} = $props();
</script>

<footer class="border-t border-border bg-muted/50 {className}">
  <MetaContainer size="xl">
    <div class="py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
      {#each columns as column}
        <div class="space-y-4">
          <h4 class="text-label-md text-foreground font-semibold">{column.title}</h4>
          <ul class="space-y-2">
            {#each column.links as link}
              <li>
                <a
                  href={link.href}
                  class="text-body-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              </li>
            {/each}
          </ul>
        </div>
      {/each}
    </div>

    <div class="flex flex-col sm:flex-row items-center justify-between gap-4 py-6 border-t border-border">
      <p class="text-body-sm text-muted-foreground">{copyright}</p>
      {#if socialLinks.length > 0}
        <div class="flex items-center gap-4">
          {#each socialLinks as link}
            <a
              href={link.href}
              class="text-muted-foreground hover:text-foreground transition-colors"
              aria-label={link.label}
            >
              {#if link.icon}
                {@html link.icon}
              {:else}
                {link.label}
              {/if}
            </a>
          {/each}
        </div>
      {/if}
    </div>
  </MetaContainer>
</footer>
