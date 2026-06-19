<script lang="ts">
import { createLandingState } from "../../../landing/landing-context.svelte";
import type { Plan } from "../../../landing/landing-types";
import PricingTable from "../../../landing/PricingTable.svelte";

createLandingState();

let { plans = [] as Plan[], showToggle = true, currency = "BRL", locale = "pt-BR" } = $props();
</script>

<PricingTable {plans} {showToggle} {currency} {locale} />
