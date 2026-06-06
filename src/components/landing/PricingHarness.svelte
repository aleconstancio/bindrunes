<script lang="ts">
	import { setContext } from 'svelte';
	import PricingTable from './PricingTable.svelte';
	import { createLandingState } from './landing-context.svelte';
	import type { Plan } from './landing-types';

	const state = createLandingState();
	// @ts-expect-error: useLanding uses a Symbol key
	setContext(Symbol('landing'), state);

	let {
		plans = [] as Plan[],
		showToggle = true,
		currency = 'BRL',
		locale = 'pt-BR',
	} = $props();
</script>

<PricingTable {plans} {showToggle} {currency} {locale} />
