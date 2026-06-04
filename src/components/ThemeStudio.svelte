<script lang="ts">
	import { createThemeBuilder } from '../utils/createThemeBuilder.svelte';
	import { hexToOklch } from '../utils/colorConvert';
	import { createAesthetic } from '../utils/createAesthetic.svelte';
	import { createDensity } from '../utils/createDensity.svelte';
	import Card from './Card.svelte';
	import Button from './Button.svelte';
	import Input from './Input.svelte';
	import Badge from './Badge.svelte';
	import Alert from './Alert.svelte';
	import Switch from './Switch.svelte';

	type Tab = 'theme' | 'aesthetic' | 'density' | 'export';

	let {
		baseTheme = 'editorial',
		onchange = undefined as ((css: string) => void) | undefined,
	}: {
		baseTheme?: string;
		onchange?: (css: string) => void;
	} = $props();

	let activeTab = $state<Tab>('theme');
	let primaryHex = $state('#6B8AFF');
	let accentHex = $state('#8A6BFF');
	let destructiveHex = $state('#FF5555');
	let infoHex = $state('#5B8DEF');
	let radius = $state('0.5rem');

	let primary = $derived(hexToOklch(primaryHex));
	let accent = $derived(hexToOklch(accentHex));
	let destructive = $derived(hexToOklch(destructiveHex));

	let theme = $derived(createThemeBuilder({ primary, accent, destructive, radius }));
	let cssOutput = $derived(theme.toCSS('[data-theme="custom"]'));

	let copied = $state(false);

	const aesthetic = createAesthetic();
	const density = createDensity();

	function handleCopy() {
		navigator.clipboard.writeText(cssOutput);
		copied = true;
		setTimeout(() => { copied = false; }, 2000);
	}

	function handleApply() {
		theme.apply();
		onchange?.(cssOutput);
	}

	function applyPreset(preset: string) {
		const presets: Record<string, { primary: string; accent: string; destructive: string }> = {
			editorial: { primary: '#6B8AFF', accent: '#8A6BFF', destructive: '#FF5555' },
			dracula: { primary: '#BD93F9', accent: '#FF79C6', destructive: '#FF5555' },
			nord: { primary: '#81A1C1', accent: '#5E81AC', destructive: '#BF616A' },
			catppuccin: { primary: '#CBA6F7', accent: '#F5C2E7', destructive: '#F38BA8' },
			'rose-pine': { primary: '#EBBCBA', accent: '#D7827E', destructive: '#FF5555' },
			github: { primary: '#0969DA', accent: '#0550AE', destructive: '#CF222E' },
		};
		const p = presets[preset];
		if (p) {
			primaryHex = p.primary;
			accentHex = p.accent;
			destructiveHex = p.destructive;
		}
	}

	const tabs: { id: Tab; label: string }[] = [
		{ id: 'theme', label: 'Theme' },
		{ id: 'aesthetic', label: 'Aesthetic' },
		{ id: 'density', label: 'Density' },
		{ id: 'export', label: 'Export' },
	];
</script>

<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
	<!-- Controls -->
	<Card variant="glass" class="p-6 space-y-5">
		<div class="flex items-center gap-1 border-b border-border pb-3 mb-4">
			{#each tabs as tab}
				<button
					onclick={() => (activeTab = tab.id)}
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
			<div>
				<label class="text-label-md block mb-1.5 text-muted-foreground">Start from preset</label>
				<div class="flex flex-wrap gap-2">
					{#each ['editorial', 'dracula', 'nord', 'catppuccin', 'rose-pine', 'github'] as preset}
						<Button
							size="sm"
							variant={baseTheme === preset ? 'primary' : 'outline'}
							onclick={() => applyPreset(preset)}
						>
							{preset}
						</Button>
					{/each}
				</div>
			</div>

			<div>
				<label class="text-label-md block mb-1.5 text-muted-foreground">Primary Color</label>
				<div class="flex gap-2 items-center">
					<input type="color" bind:value={primaryHex} class="w-10 h-10 rounded cursor-pointer border-0 p-0" />
					<Input bind:value={primaryHex} class="flex-1 font-mono text-mono-sm" />
				</div>
			</div>

			<div>
				<label class="text-label-md block mb-1.5 text-muted-foreground">Accent Color</label>
				<div class="flex gap-2 items-center">
					<input type="color" bind:value={accentHex} class="w-10 h-10 rounded cursor-pointer border-0 p-0" />
					<Input bind:value={accentHex} class="flex-1 font-mono text-mono-sm" />
				</div>
			</div>

			<div>
				<label class="text-label-md block mb-1.5 text-muted-foreground">Destructive Color</label>
				<div class="flex gap-2 items-center">
					<input type="color" bind:value={destructiveHex} class="w-10 h-10 rounded cursor-pointer border-0 p-0" />
					<Input bind:value={destructiveHex} class="flex-1 font-mono text-mono-sm" />
				</div>
			</div>

			<div>
				<label class="text-label-md block mb-1.5 text-muted-foreground">Border Radius</label>
				<Input bind:value={radius} class="font-mono text-mono-sm" />
			</div>
		{/if}

		{#if activeTab === 'aesthetic'}
			<div>
				<label class="text-label-md block mb-2 text-muted-foreground">Form aesthetic</label>
				<div class="flex flex-col gap-2">
					{#each aesthetic.aesthetics as a}
						<button
							onclick={() => aesthetic.setAesthetic(a)}
							class="flex items-center gap-3 px-4 py-3 rounded-[--radius] border transition-colors cursor-pointer text-left"
							class:border-primary={aesthetic.aesthetic === a}
							class:border-border={aesthetic.aesthetic !== a}
							class:bg-muted={aesthetic.aesthetic === a}
						>
							<div
								class="h-4 w-4 rounded-full border-2 flex items-center justify-center"
								class:border-primary={aesthetic.aesthetic === a}
								class:border-muted-foreground={aesthetic.aesthetic !== a}
							>
								{#if aesthetic.aesthetic === a}
									<div class="h-2 w-2 rounded-full bg-primary"></div>
								{/if}
							</div>
							<div>
								<p class="text-label-md text-foreground">{a}</p>
								<p class="text-body-sm text-muted-foreground">
									{#if a === 'editorial'}
										Flat surfaces, hairline borders, snappy motion
									{:else if a === 'glass'}
										Translucent surfaces, ambient bloom
									{:else if a === 'bento'}
										Rounded corners, soft shadows
									{:else}
										Dramatic shadows, gradient buttons
									{/if}
								</p>
							</div>
						</button>
					{/each}
				</div>
			</div>
		{/if}

		{#if activeTab === 'density'}
			<div>
				<label class="text-label-md block mb-2 text-muted-foreground">Content density</label>
				<div class="flex flex-col gap-2">
					{#each density.densities as d}
						<button
							onclick={() => density.setDensity(d)}
							class="flex items-center gap-3 px-4 py-3 rounded-[--radius] border transition-colors cursor-pointer text-left"
							class:border-primary={density.density === d}
							class:border-border={density.density !== d}
							class:bg-muted={density.density === d}
						>
							<div
								class="h-4 w-4 rounded-full border-2 flex items-center justify-center"
								class:border-primary={density.density === d}
								class:border-muted-foreground={density.density !== d}
							>
								{#if density.density === d}
									<div class="h-2 w-2 rounded-full bg-primary"></div>
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
		{/if}

		{#if activeTab === 'export'}
			<div class="space-y-4">
				<label class="text-label-md block text-muted-foreground">Generated CSS</label>
				<pre
					class="p-3 rounded text-mono-sm overflow-auto max-h-[400px]"
					style="background: var(--muted); color: var(--foreground); font-family: var(--font-mono);"
				><code>{cssOutput}</code></pre>

				<div class="flex gap-2">
					<Button onclick={handleApply}>Apply Theme</Button>
					<Button variant="outline" onclick={handleCopy}>
						{copied ? 'Copied!' : 'Copy CSS'}
					</Button>
				</div>
			</div>
		{/if}
	</Card>

	<!-- Preview -->
	<div class="space-y-4">
		<Card variant="glass" class="p-6">
			<h3 class="text-title-1 mb-4" style="color: var(--foreground);">Preview</h3>
			<div class="space-y-3">
				<div class="flex flex-wrap gap-2">
					<Button>Primary</Button>
					<Button variant="secondary">Secondary</Button>
					<Button variant="outline">Outline</Button>
					<Button variant="destructive">Destructive</Button>
				</div>
				<Input label="Sample Input" placeholder="Type here..." />
				<div class="flex flex-wrap gap-2">
					<Badge>Default</Badge>
					<Badge variant="primary">Primary</Badge>
					<Badge variant="success">Success</Badge>
					<Badge variant="warning">Warning</Badge>
				</div>
				<Alert title="Alert Title" description="This is a sample alert with the generated theme." />
			</div>
		</Card>
	</div>
</div>
