<script lang="ts">
import type { Snippet } from "svelte";
import MetaContainer from "../../layouts/MetaContainer.svelte";

let {
	title = "",
	description = "",
	videoUrl = "",
	posterUrl = "",
	class: className = "",
}: {
	title?: string;
	description?: string;
	videoUrl?: string;
	posterUrl?: string;
	class?: string;
} = $props();
</script>

<div class="px-6 py-16 {className}">
  <MetaContainer size="lg">
    <div class="space-y-6">
      {#if title || description}
        <div class="text-center space-y-2">
          {#if title}
            <h2 class="text-display-3 text-foreground">{title}</h2>
          {/if}
          {#if description}
            <p class="text-body-lg text-muted-foreground max-w-2xl mx-auto">{description}</p>
          {/if}
        </div>
      {/if}

      <div class="relative rounded-[--radius-lg] overflow-hidden border border-border shadow-lg">
        {#if videoUrl}
          <video
            src={videoUrl}
            poster={posterUrl}
            controls
            class="w-full aspect-video object-cover"
            preload="metadata"
          >
            <track kind="captions" />
          </video>
        {:else if posterUrl}
          <img src={posterUrl} alt={title} class="w-full aspect-video object-cover" />
        {/if}
      </div>
    </div>
  </MetaContainer>
</div>
