<script lang="ts">
import type { useDensity } from "../utils/useDensity.svelte";

let {
	density,
}: {
	density: ReturnType<typeof useDensity>;
} = $props();
</script>

<div>
	<span class="text-label-md block mb-2 text-muted-foreground">Content density</span>
	<div role="radiogroup" aria-label="Content density" class="flex flex-col gap-2">
		{#each density.densities as d}
			<button
				onclick={() => density.setDensity(d)}
				class="flex items-center gap-3 px-4 py-3 rounded-[--radius] border transition-colors cursor-pointer text-left"
				class:border-primary={density.density === d}
				class:border-border={density.density !== d}
				class:bg-muted={density.density === d}
			>
				<div
					class="h-4 w-4 rounded-[--radius-pill] border-2 flex items-center justify-center"
					class:border-primary={density.density === d}
					class:border-muted-foreground={density.density !== d}
				>
					{#if density.density === d}
						<div class="h-2 w-2 rounded-[--radius-pill] bg-primary"></div>
					{/if}
				</div>
				<div>
					<p class="text-label-md text-foreground">{d}</p>
					<p class="text-body-sm text-muted-foreground">
						{#if d === 'compact'}
							Tighter spacing for data-heavy UIs
						{:else if d === 'comfortable'}
							Balanced spacing — default
						{:else}
							Generous spacing for reading
						{/if}
					</p>
				</div>
			</button>
		{/each}
	</div>
</div>
