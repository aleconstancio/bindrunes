<script lang="ts">
interface Props {
	length?: number;
	value?: string;
	onChange?: (value: string) => void;
	disabled?: boolean;
	class?: string;
}

let {
	length = 6,
	value = $bindable(""),
	onChange,
	disabled = false,
	class: className = "",
}: Props = $props();

let inputs: HTMLInputElement[] = $state([]);

function getDisplayValue(): string {
	let display = "";
	for (let i = 0; i < length; i++) {
		display += value[i] || "*";
	}
	return display;
}

function handleInput(index: number, e: Event) {
	const target = e.target as HTMLInputElement;
	const newValue = target.value;

	if (newValue.length > 1) {
		target.value = newValue[0];
	}

	const chars = value.split("");
	chars[index] = newValue;
	value = chars.join("").slice(0, length);
	onChange?.(getDisplayValue());

	if (newValue && index < length - 1) {
		inputs[index + 1]?.focus();
	}
}

function handleKeydown(index: number, e: KeyboardEvent) {
	if (e.key === "Backspace" && !value[index] && index > 0) {
		inputs[index - 1]?.focus();
	}
}

function handlePaste(e: ClipboardEvent) {
	e.preventDefault();
	const pasted = e.clipboardData?.getData("text") || "";
	value = pasted.slice(0, length);
	onChange?.(getDisplayValue());
	inputs[Math.min(pasted.length, length - 1)]?.focus();
}
</script>

<div class="flex gap-2 {className}">
	{#each Array(length) as _, i}
		<input
			type="text"
			maxlength="1"
			class="w-10 h-12 text-center text-title-2 bg-background border border-border rounded-[--radius-md]
			       focus:outline-none focus:ring-2 focus:ring-ring
			       {disabled ? 'opacity-50 cursor-not-allowed' : ''}"
			value={value[i] || ""}
			oninput={(e) => handleInput(i, e)}
			onkeydown={(e) => handleKeydown(i, e)}
			onpaste={handlePaste}
			{disabled}
			bind:this={inputs[i]}
			aria-label="OTP digit {i + 1}"
		/>
	{/each}
</div>
