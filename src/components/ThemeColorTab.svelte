<script lang="ts">
	import Button from './Button.svelte';
	import Input from './Input.svelte';

	let {
		baseTheme = 'editorial',
		primaryHex = '#6B8AFF',
		accentHex = '#8A6BFF',
		destructiveHex = '#FF5555',
		radius = '0.5rem',
		onpreset,
	}: {
		baseTheme?: string;
		primaryHex?: string;
		accentHex?: string;
		destructiveHex?: string;
		radius?: string;
		onpreset?: (preset: string) => void;
	} = $props();
</script>

<div>
	<label class="text-label-md block mb-1.5 text-muted-foreground">Start from preset</label>
	<div class="flex flex-wrap gap-2">
		{#each ['editorial', 'dracula', 'nord', 'catppuccin', 'rose-pine', 'github'] as preset}
			<Button
				size="sm"
				variant={baseTheme === preset ? 'primary' : 'outline'}
				onclick={() => onpreset?.(preset)}
			>
				{preset}
			</Button>
		{/each}
	</div>
</div>

<div>
	<label for="color-primary" class="text-label-md block mb-1.5 text-muted-foreground">Primary Color</label>
	<div class="flex gap-2 items-center">
		<input id="color-primary" type="color" bind:value={primaryHex} class="w-10 h-10 rounded cursor-pointer border-0 p-0" />
		<Input bind:value={primaryHex} class="flex-1 font-mono text-mono-sm" />
	</div>
</div>

<div>
	<label for="color-accent" class="text-label-md block mb-1.5 text-muted-foreground">Accent Color</label>
	<div class="flex gap-2 items-center">
		<input id="color-accent" type="color" bind:value={accentHex} class="w-10 h-10 rounded cursor-pointer border-0 p-0" />
		<Input bind:value={accentHex} class="flex-1 font-mono text-mono-sm" />
	</div>
</div>

<div>
	<label for="color-destructive" class="text-label-md block mb-1.5 text-muted-foreground">Destructive Color</label>
	<div class="flex gap-2 items-center">
		<input id="color-destructive" type="color" bind:value={destructiveHex} class="w-10 h-10 rounded cursor-pointer border-0 p-0" />
		<Input bind:value={destructiveHex} class="flex-1 font-mono text-mono-sm" />
	</div>
</div>

<div>
	<label class="text-label-md block mb-1.5 text-muted-foreground">Border Radius</label>
	<Input bind:value={radius} class="font-mono text-mono-sm" />
</div>
