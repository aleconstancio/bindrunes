<script lang="ts">
import Tabs from "../../Tabs.svelte";
import TabsList from "../../TabsList.svelte";
import TabsTrigger from "../../TabsTrigger.svelte";

let { value = "tab1", disabled = false } = $props();
</script>

<Tabs {value}>
	<TabsList>
		<TabsTrigger {value} {disabled}>Tab 1</TabsTrigger>
	</TabsList>
</Tabs>
