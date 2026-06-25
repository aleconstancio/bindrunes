<script lang="ts">
import PageSection from "../../layouts/PageSection.svelte";

let {
	brand = "",
	year = new Date().getFullYear(),
	links = [] as { label: string; href: string }[],
	class: className = "",
}: {
	brand?: string;
	year?: number;
	links?: { label: string; href: string }[];
	class?: string;
} = $props();
</script>

<PageSection reveal={false} size="full" spacing="compact" class={className}>
  <div class="border-t border-border pt-6 pb-4">
    <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
      <p class="text-body-sm text-muted-foreground">
        © {year} {brand}. All rights reserved.
      </p>
      {#if links.length > 0}
        <div class="flex items-center gap-4">
          {#each links as link}
            <a
              href={link.href}
              class="text-body-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          {/each}
        </div>
      {/if}
    </div>
  </div>
</PageSection>
