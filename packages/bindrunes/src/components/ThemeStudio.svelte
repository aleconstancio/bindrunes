<script lang="ts">
import { hexToOklch } from "../utils/colorConvert";
import { createThemeBuilder } from "../utils/createThemeBuilder";
import { useAesthetic } from "../utils/useAesthetic.svelte";
import { useDensity } from "../utils/useDensity.svelte";
import AestheticTab from "./AestheticTab.svelte";
import Card from "./Card.svelte";
import DensityTab from "./DensityTab.svelte";
import ExportTab from "./ExportTab.svelte";
import ThemeColorTab from "./ThemeColorTab.svelte";
import ThemePreview from "./ThemePreview.svelte";

type Tab = "theme" | "aesthetic" | "density" | "export";

let {
	baseTheme = "editorial",
	onchange = undefined as ((css: string) => void) | undefined,
}: {
	baseTheme?: string;
	onchange?: (css: string) => void;
} = $props();

let activeTab = $state<Tab>("theme");
let primaryHex = $state("#6B8AFF");
let accentHex = $state("#8A6BFF");
let destructiveHex = $state("#FF5555");
let radius = $state("0.5rem");

let primary = $derived(hexToOklch(primaryHex));
let accent = $derived(hexToOklch(accentHex));
let destructive = $derived(hexToOklch(destructiveHex));

let theme = $derived(createThemeBuilder({ primary, accent, destructive, radius }));
let cssOutput = $derived(theme.toCSS('[data-theme="custom"]'));

let copied = $state(false);

const aesthetic = useAesthetic();
const density = useDensity();

function handleCopy() {
	navigator.clipboard.writeText(cssOutput);
	copied = true;
	setTimeout(() => {
		copied = false;
	}, 2000);
}

function handleApply() {
	theme.apply();
	onchange?.(cssOutput);
}

function applyPreset(preset: string) {
	const presets: Record<string, { primary: string; accent: string; destructive: string }> = {
		editorial: { primary: "#6B8AFF", accent: "#8A6BFF", destructive: "#FF5555" },
		dracula: { primary: "#BD93F9", accent: "#FF79C6", destructive: "#FF5555" },
		nord: { primary: "#81A1C1", accent: "#5E81AC", destructive: "#BF616A" },
		catppuccin: { primary: "#CBA6F7", accent: "#F5C2E7", destructive: "#F38BA8" },
		"rose-pine": { primary: "#EBBCBA", accent: "#D7827E", destructive: "#FF5555" },
		github: { primary: "#0969DA", accent: "#0550AE", destructive: "#CF222E" },
	};
	const p = presets[preset];
	if (p) {
		primaryHex = p.primary;
		accentHex = p.accent;
		destructiveHex = p.destructive;
	}
}

const tabs: { id: Tab; label: string }[] = [
	{ id: "theme", label: "Theme" },
	{ id: "aesthetic", label: "Aesthetic" },
	{ id: "density", label: "Density" },
	{ id: "export", label: "Export" },
];

function handleTabKeydown(e: KeyboardEvent, index: number) {
	if (e.key === "ArrowRight") {
		e.preventDefault();
		const next = (index + 1) % tabs.length;
		activeTab = tabs[next].id;
		(e.target as HTMLElement).parentElement?.children[next]?.querySelector("button")?.focus();
	} else if (e.key === "ArrowLeft") {
		e.preventDefault();
		const prev = (index - 1 + tabs.length) % tabs.length;
		activeTab = tabs[prev].id;
		(e.target as HTMLElement).parentElement?.children[prev]?.querySelector("button")?.focus();
	}
}
</script>

<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
	<Card variant="glass" class="p-6 space-y-5">
		<div role="tablist" class="flex items-center gap-1 border-b border-border pb-3 mb-4">
			{#each tabs as tab, index}
				<button
					role="tab"
					id="tab-{tab.id}"
					aria-selected={activeTab === tab.id}
					aria-controls="tabpanel-{tab.id}"
					tabindex={activeTab === tab.id ? 0 : -1}
					onclick={() => (activeTab = tab.id)}
					onkeydown={(e) => handleTabKeydown(e, index)}
					class="px-3 py-1.5 rounded-[--radius-sm] text-label-md transition-colors cursor-pointer"
					class:bg-primary={activeTab === tab.id}
					class:text-primary-foreground={activeTab === tab.id}
					class:text-muted-foreground={activeTab !== tab.id}
				>
					{tab.label}
				</button>
			{/each}
		</div>

		{#if activeTab === 'theme'}
			<div role="tabpanel" id="tabpanel-theme" aria-labelledby="tab-theme">
				<ThemeColorTab {baseTheme} bind:primaryHex bind:accentHex bind:destructiveHex bind:radius onpreset={applyPreset} />
			</div>
		{:else if activeTab === 'aesthetic'}
			<div role="tabpanel" id="tabpanel-aesthetic" aria-labelledby="tab-aesthetic">
				<AestheticTab {aesthetic} />
			</div>
		{:else if activeTab === 'density'}
			<div role="tabpanel" id="tabpanel-density" aria-labelledby="tab-density">
				<DensityTab {density} />
			</div>
		{:else if activeTab === 'export'}
			<div role="tabpanel" id="tabpanel-export" aria-labelledby="tab-export">
				<ExportTab {cssOutput} {copied} oncopy={handleCopy} onapply={handleApply} />
			</div>
		{/if}
	</Card>

	<ThemePreview />
</div>
