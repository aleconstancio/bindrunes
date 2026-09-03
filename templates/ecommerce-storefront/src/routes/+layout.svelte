<script lang="ts">
import "../app.css";
import { AppProvider } from "urupe-ui";

let { children } = $props();
</script>

<AppProvider>
  {@render children()}
</AppProvider>
