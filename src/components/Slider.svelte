<script lang="ts">
	import { Slider as BitsSlider } from 'bits-ui';

	let {
		value = $bindable([50]),
		min = 0,
		max = 100,
		step = 1,
		class: className = '',
	}: {
		value?: number[];
		min?: number;
		max?: number;
		step?: number;
		class?: string;
	} = $props();
</script>

<BitsSlider.Root bind:value {min} {max} {step} class="relative flex w-full touch-none select-none items-center h-6 {className}">
	<BitsSlider.Range class="absolute h-2 rounded-full bg-primary" />
	{#each value as _, i}
		<BitsSlider.Thumb
			class="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
		/>
	{/each}
</BitsSlider.Root>
