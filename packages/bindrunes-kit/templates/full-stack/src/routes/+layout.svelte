<script lang="ts">
import "../app.css";
import { AppProvider } from "bindrunes";
let { children } = $props();
</script>

<AppProvider>
  {@render children()}
</AppProvider>
