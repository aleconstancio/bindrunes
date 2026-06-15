<script lang="ts">
import "../app.css";
import { DemoLayout } from "bindrunes/scaffold";

let { children } = $props();
</script>

<DemoLayout
	title="bindrunes Landing Example"
	description="Landing page example built with bindrunes"
	shell="landing"
>
	{@render children()}
</DemoLayout>
