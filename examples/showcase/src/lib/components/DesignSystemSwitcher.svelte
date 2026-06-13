<script lang="ts">
	import { Popover } from "bindrunes";
	import { createTheme, createAesthetic, createDensity } from "bindrunes";
	import { Palette } from "lucide-svelte";

	const themeState = createTheme({ default: "editorial" });
	const aestheticState = createAesthetic({ default: "editorial" });
	const densityState = createDensity({ default: "comfortable" });

	const themeColors: Record<string, string> = {
		editorial: "bg-indigo-400",
		dracula: "bg-purple-400",
		nord: "bg-blue-300",
		catppuccin: "bg-pink-300",
		"rose-pine": "bg-rose-300",
		github: "bg-green-500",
	};

	const aestheticIcons: Record<string, string> = {
		editorial: "\u2022",
		glass: "\u25E6",
		bento: "\u25A3",
		expressive: "\u2726",
	};

	const densityIcons: Record<string, string> = {
		compact: "\u2193",
		comfortable: "\u2195",
		spacious: "\u2191",
	};
</script>

<Popover side="bottom" align="end">
	{#snippet trigger()}
		<button
			type="button"
			class="inline-flex items-center justify-center h-8 w-8 rounded-[--radius-sm] text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
			title="Design system settings"
		>
			<Palette class="h-4 w-4" />
		</button>
	{/snippet}

	<div class="w-[260px] space-y-4">
		<!-- Theme -->
		<div>
			<p class="text-label-sm text-muted-foreground mb-2">Theme</p>
			<div class="grid grid-cols-3 gap-1.5">
				{#each themeState.themes as t}
					<button
						type="button"
						onclick={() => themeState.setTheme(t)}
						class="flex items-center gap-1.5 px-2 py-1.5 rounded-[--radius-sm] text-label-sm transition-colors cursor-pointer border {themeState.theme === t ? 'border-primary bg-muted text-foreground' : 'border-transparent text-muted-foreground hover:bg-muted hover:text-foreground'}"
					>
						<span class="h-2.5 w-2.5 rounded-full {themeColors[t]}"></span>
						<span class="truncate">{t}</span>
					</button>
				{/each}
			</div>
		</div>

		<!-- Aesthetic -->
		<div>
			<p class="text-label-sm text-muted-foreground mb-2">Aesthetic</p>
			<div class="grid grid-cols-2 gap-1.5">
				{#each aestheticState.aesthetics as a}
					<button
						type="button"
						onclick={() => aestheticState.setAesthetic(a)}
						class="flex items-center gap-2 px-2.5 py-1.5 rounded-[--radius-sm] text-label-sm transition-colors cursor-pointer border {aestheticState.aesthetic === a ? 'border-primary bg-muted text-foreground' : 'border-transparent text-muted-foreground hover:bg-muted hover:text-foreground'}"
					>
						<span class="text-base">{aestheticIcons[a]}</span>
						<span>{a}</span>
					</button>
				{/each}
			</div>
		</div>

		<!-- Density -->
		<div>
			<p class="text-label-sm text-muted-foreground mb-2">Density</p>
			<div class="flex gap-1.5">
				{#each densityState.densities as d}
					<button
						type="button"
						onclick={() => densityState.setDensity(d)}
						class="flex-1 flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-[--radius-sm] text-label-sm transition-colors cursor-pointer border {densityState.density === d ? 'border-primary bg-muted text-foreground' : 'border-transparent text-muted-foreground hover:bg-muted hover:text-foreground'}"
					>
						<span class="text-xs">{densityIcons[d]}</span>
						<span>{d}</span>
					</button>
				{/each}
			</div>
		</div>
	</div>
</Popover>
