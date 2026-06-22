<script lang="ts">
import { createLandingState } from "../../../landing/landing-context.svelte";
import type { Plan } from "../../../landing/landing-types";
import PricingTable from "../../../landing/PricingTable.svelte";

let { plans, showToggle = true }: { plans: Plan[]; showToggle?: boolean } = $props();

createLandingState();
</script>

<PricingTable {plans} {showToggle} />
