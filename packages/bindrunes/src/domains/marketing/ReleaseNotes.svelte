<script lang="ts">
import PageSection from "../../layouts/PageSection.svelte";
import Badge from "../../primitives/Badge.svelte";

interface ReleaseNote {
	version: string;
	date: string;
	added?: string[];
	changed?: string[];
	fixed?: string[];
	removed?: string[];
}

let {
	release = undefined as ReleaseNote | undefined,
	class: className = "",
}: {
	release?: ReleaseNote;
	class?: string;
} = $props();

const sectionConfig = {
	added: { label: "Added", variant: "success" as const },
	changed: { label: "Changed", variant: "primary" as const },
	fixed: { label: "Fixed", variant: "warning" as const },
	removed: { label: "Removed", variant: "default" as const },
};
</script>

{#if release}
  <PageSection reveal={false} size="md" spacing="compact" class={className}>
    <div class="space-y-4">
      <div class="flex items-center gap-3">
        <h3 class="text-title-2 text-foreground">v{release.version}</h3>
        <time class="text-mono-xs text-muted-foreground">{release.date}</time>
      </div>

      {#each Object.entries(sectionConfig) as [key, config]}
        {@const items = release[key as keyof ReleaseNote]}
        {#if Array.isArray(items) && items.length > 0}
          <div class="space-y-2">
            <Badge variant={config.variant} size="sm">{config.label}</Badge>
            <ul class="space-y-1 ml-1">
              {#each items as item}
                <li class="text-body-sm text-muted-foreground flex items-start gap-2">
                  <span class="text-muted-foreground/50 mt-1">•</span>
                  {item}
                </li>
              {/each}
            </ul>
          </div>
        {/if}
      {/each}
    </div>
  </PageSection>
{/if}
