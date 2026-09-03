<script lang="ts">
import "../app.css";
import { DemoLayout } from "urupe-ui/playground";

let { children } = $props();
</script>

<DemoLayout
	title="urupe-ui Landing Example"
	description="Landing page example built with urupe-ui"
	shell="landing"
>
	{@render children()}
</DemoLayout>
