<script lang="ts">
import { createLandingState } from "./landing-context.svelte";
import type { Plan } from "./landing-types";

createLandingState();

let { plans = [] as Plan[], showToggle = true, currency = "BRL", locale = "pt-BR" } = $props();
</script>

<PricingTable {plans} {showToggle} {currency} {locale} />
