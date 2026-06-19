<script lang="ts">
interface Props {
	value?: string;
	onChange?: (value: string) => void;
	disabled?: boolean;
	class?: string;
}

let {
	value = $bindable("oklch(0.65 0.1 265)"),
	onChange,
	disabled = false,
	class: className = "",
}: Props = $props();

let hue = $state(265);
let chroma = $state(0.1);
let lightness = $state(0.65);

$effect(() => {
	const v = `oklch(${lightness} ${chroma} ${hue})`;
	value = v;
	onChange?.(v);
});
</script>

<div class="flex flex-col gap-4 {className}">
	<div
		class="w-full h-32 rounded-[--radius-lg] border border-border"
		style:background="oklch({lightness} {chroma} {hue})"
	></div>

	<div class="space-y-2">
		<label class="text-label-sm text-muted-foreground">
			Hue: {hue}
			<input
				type="range"
				min="0"
				max="360"
				bind:value={hue}
				class="w-full"
				{disabled}
			/>
		</label>

		<label class="text-label-sm text-muted-foreground">
			Chroma: {chroma.toFixed(2)}
			<input
				type="range"
				min="0"
				max="0.4"
				step="0.01"
				bind:value={chroma}
				class="w-full"
				{disabled}
			/>
		</label>

		<label class="text-label-sm text-muted-foreground">
			Lightness: {lightness.toFixed(2)}
			<input
				type="range"
				min="0"
				max="1"
				step="0.01"
				bind:value={lightness}
				class="w-full"
				{disabled}
			/>
		</label>
	</div>

	<input
		type="text"
		class="w-full px-3 py-2 bg-background border border-border rounded-[--radius-md] text-body-md"
		bind:value
		oninput={() => onChange?.(value)}
		{disabled}
		aria-label="Color value"
	/>
</div>
