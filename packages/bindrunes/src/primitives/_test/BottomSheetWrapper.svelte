<script lang="ts">
import BottomSheet from "./BottomSheet.svelte";
</script>

<BottomSheet open={$$props.open} title={$$props.title}>
  {#snippet children()}Sheet content{/snippet}
</BottomSheet>
