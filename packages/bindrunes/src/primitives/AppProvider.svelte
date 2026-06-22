<script lang="ts">
import { ModeWatcher } from "mode-watcher";
import type { Snippet } from "svelte";
import { isBrowser } from "../utils/isBrowser";
import { type Aesthetic, useAesthetic } from "../utils/useAesthetic.svelte";
import { type Density, useDensity } from "../utils/useDensity.svelte";
import { type Theme, useTheme } from "../utils/useTheme.svelte";

let {
	themeDefault = undefined as Theme | undefined,
	aestheticDefault = undefined as Aesthetic | undefined,
	densityDefault = undefined as Density | undefined,
	children,
}: {
	themeDefault?: Theme;
	aestheticDefault?: Aesthetic;
	densityDefault?: Density;
	children?: Snippet;
} = $props();

// svelte-ignore state_referenced_locally
const _theme = useTheme({ default: themeDefault ?? "editorial" });
// svelte-ignore state_referenced_locally
const _aesthetic = useAesthetic({ default: aestheticDefault ?? "minimal" });
// svelte-ignore state_referenced_locally
const _density = useDensity({ default: densityDefault ?? "comfortable" });
</script>

{#if isBrowser}
  <ModeWatcher />
{/if}
{@render children?.()}
