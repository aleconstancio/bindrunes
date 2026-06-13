<script lang="ts">
import { ModeWatcher } from "mode-watcher";
import { type Aesthetic, createAesthetic } from "../utils/createAesthetic.svelte";
import { createDensity, type Density } from "../utils/createDensity.svelte";
import { createTheme, type Theme } from "../utils/createTheme.svelte";

let {
	themeDefault = undefined as Theme | undefined,
	aestheticDefault = undefined as Aesthetic | undefined,
	densityDefault = undefined as Density | undefined,
	children,
}: {
	themeDefault?: Theme;
	aestheticDefault?: Aesthetic;
	densityDefault?: Density;
	children?: import("svelte").Snippet;
} = $props();

// svelte-ignore state_referenced_locally
const _theme = createTheme({ default: themeDefault ?? "editorial" });
// svelte-ignore state_referenced_locally
const _aesthetic = createAesthetic({ default: aestheticDefault ?? "editorial" });
// svelte-ignore state_referenced_locally
const _density = createDensity({ default: densityDefault ?? "comfortable" });
</script>

<ModeWatcher />
{@render children?.()}
