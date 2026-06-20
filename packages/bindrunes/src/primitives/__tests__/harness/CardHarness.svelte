<script lang="ts">
import Card from "../../Card.svelte";

let { headerText = "", footerText = "", childrenText = "", ...rest } = $props();
</script>

<Card {...rest} header={hdr} footer={ftr} children={chd}>
	{#snippet hdr()}{headerText}{/snippet}
	{#snippet ftr()}{footerText}{/snippet}
	{#snippet chd()}{childrenText}{/snippet}
</Card>
