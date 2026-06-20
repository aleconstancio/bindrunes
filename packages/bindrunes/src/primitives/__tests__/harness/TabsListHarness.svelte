<script lang="ts">
import Tabs from "../../Tabs.svelte";
import TabsList from "../../TabsList.svelte";
import TabsTrigger from "../../TabsTrigger.svelte";

let { value = "tab1" } = $props();
</script>

<Tabs {value}>
	<TabsList>
		<TabsTrigger {value}>Tab 1</TabsTrigger>
	</TabsList>
</Tabs>
