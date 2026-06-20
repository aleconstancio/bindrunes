<script lang="ts">
import MetaContainer from "../../MetaContainer.svelte";

interface Badge {
	label: string;
	icon?: string;
	description?: string;
}

let {
	title = "Trusted & Secure",
	badges = [] as Badge[],
	class: className = "",
}: {
	title?: string;
	badges?: Badge[];
	class?: string;
} = $props();
</script>

<div class="px-6 py-12 {className}">
  <MetaContainer size="lg">
    <div class="text-center space-y-8">
      {#if title}
        <h2 class="text-title-1 text-foreground">{title}</h2>
      {/if}

      <div class="flex flex-wrap items-center justify-center gap-8">
        {#each badges as badge}
          <div class="flex flex-col items-center gap-2 text-center">
            {#if badge.icon}
              <div class="w-12 h-12 flex items-center justify-center rounded-lg bg-muted">
                <span class="text-2xl">{badge.icon}</span>
              </div>
            {/if}
            <span class="text-label-md text-foreground font-medium">{badge.label}</span>
            {#if badge.description}
              <span class="text-body-sm text-muted-foreground max-w-[200px]">{badge.description}</span>
            {/if}
          </div>
        {/each}
      </div>
    </div>
  </MetaContainer>
</div>
