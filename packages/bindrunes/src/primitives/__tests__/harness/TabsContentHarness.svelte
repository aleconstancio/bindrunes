<script lang="ts">
import Tabs from "../../Tabs.svelte";
import TabsContent from "../../TabsContent.svelte";
import TabsList from "../../TabsList.svelte";
import TabsTrigger from "../../TabsTrigger.svelte";

let { value = "tab1" } = $props();
</script>

<Tabs {value}>
	<TabsList>
		<TabsTrigger {value}>Tab 1</TabsTrigger>
	</TabsList>
	<TabsContent {value}>Content for {value}</TabsContent>
</Tabs>
