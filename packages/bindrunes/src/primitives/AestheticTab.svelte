<script lang="ts">
import type { useAesthetic } from "../utils/useAesthetic";

let {
	aesthetic,
}: {
	aesthetic: ReturnType<typeof useAesthetic>;
} = $props();
</script>

<div>
	<span class="text-label-md block mb-2 text-muted-foreground">Form aesthetic</span>
	<div role="radiogroup" aria-label="Visual aesthetic" class="flex flex-col gap-2">
		{#each aesthetic.aesthetics as a}
			<button
				onclick={() => aesthetic.setAesthetic(a)}
				class="flex items-center gap-3 px-4 py-3 rounded-[--radius] border transition-colors cursor-pointer text-left"
				class:border-primary={aesthetic.aesthetic === a}
				class:border-border={aesthetic.aesthetic !== a}
				class:bg-muted={aesthetic.aesthetic === a}
			>
				<div
					class="h-4 w-4 rounded-[--radius-pill] border-2 flex items-center justify-center"
					class:border-primary={aesthetic.aesthetic === a}
					class:border-muted-foreground={aesthetic.aesthetic !== a}
				>
					{#if aesthetic.aesthetic === a}
						<div class="h-2 w-2 rounded-[--radius-pill] bg-primary"></div>
					{/if}
				</div>
				<div>
					<p class="text-label-md text-foreground">{a}</p>
					<p class="text-body-sm text-muted-foreground">
						{#if a === 'minimal'}
							Flat surfaces, hairline borders, snappy motion
						{:else if a === 'glass'}
							Translucent surfaces, ambient bloom
						{:else if a === 'bento'}
							Rounded corners, soft shadows
						{:else if a === 'expressive'}
							Dramatic shadows, gradient buttons
						{:else if a === 'neon'}
							Vivid glow effects, high-contrast accents
						{:else if a === 'brutalist'}
							Raw edges, monospace type, stark contrast
						{:else if a === 'organic'}
							Soft curves, earthy tones, gentle transitions
						{/if}
					</p>
				</div>
			</button>
		{/each}
	</div>
</div>
