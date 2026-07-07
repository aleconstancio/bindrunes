<script lang="ts">
import TimelineItem from "../TimelineItem.svelte";

let { timestamp = "10:00", class: className = "" }: { timestamp?: string; class?: string } =
	$props();
</script>

<TimelineItem {timestamp} class={className}>
  {#snippet children()}Event content{/snippet}
</TimelineItem>
