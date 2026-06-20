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

function parseOklch(input: string): { lightness: number; chroma: number; hue: number } | null {
	const match = input.match(/^oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*\)$/);
	if (!match) return null;
	const l = parseFloat(match[1]);
	const c = parseFloat(match[2]);
	const h = parseFloat(match[3]);
	if (isNaN(l) || isNaN(c) || isNaN(h)) return null;
	if (l < 0 || l > 1 || c < 0 || c > 0.4 || h < 0 || h > 360) return null;
	return { lightness: l, chroma: c, hue: h };
}

let hue = $state(265);
let chroma = $state(0.1);
let lightness = $state(0.65);
let textValue = $state("oklch(0.65 0.1 265)");
let textError = $state(false);
let lastSource: "sliders" | "text" | "prop" = "prop";

const parsed = parseOklch(value);
if (parsed) {
	hue = parsed.hue;
	chroma = parsed.chroma;
	lightness = parsed.lightness;
	textValue = value;
}

function syncFromSliders() {
	const v = `oklch(${lightness} ${chroma} ${hue})`;
	textValue = v;
	textError = false;
	lastSource = "sliders";
	value = v;
	onChange?.(v);
}

function syncFromText() {
	const result = parseOklch(textValue);
	if (result) {
		hue = result.hue;
		chroma = result.chroma;
		lightness = result.lightness;
		textError = false;
		lastSource = "text";
		value = textValue;
		onChange?.(textValue);
	} else {
		textError = true;
	}
}

$effect(() => {
	if (lastSource !== "prop") return;
	const result = parseOklch(value);
	if (result) {
		hue = result.hue;
		chroma = result.chroma;
		lightness = result.lightness;
		textValue = value;
		textError = false;
	}
});

$effect(() => {
	void hue;
	void chroma;
	void lightness;
	if (lastSource === "sliders") {
		syncFromSliders();
	}
});
</script>

<div class="flex flex-col gap-4 {className}">
	<div
		class="w-full h-32 rounded-[--radius-lg] border border-border"
		style="background: oklch({lightness} {chroma} {hue})"
		role="img"
		aria-label="Color preview"
		data-lightness={lightness}
		data-chroma={chroma}
		data-hue={hue}
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
				oninput={syncFromSliders}
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
				oninput={syncFromSliders}
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
				oninput={syncFromSliders}
			/>
		</label>
	</div>

	<div>
		<input
			type="text"
			class="w-full px-3 py-2 bg-background border rounded-[--radius-md] text-body-md {textError
				? 'border-destructive'
				: 'border-border'}"
			bind:value={textValue}
			oninput={syncFromText}
			{disabled}
			aria-label="Color value"
			aria-invalid={textError || undefined}
			aria-describedby={textError ? 'colorpicker-error' : undefined}
		/>
		{#if textError}
			<p id="colorpicker-error" class="text-label-sm text-destructive mt-1">
				Invalid OKLCH format. Expected: oklch(L C H)
			</p>
		{/if}
	</div>
</div>
