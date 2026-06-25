<script lang="ts">
import { ModeWatcher } from "mode-watcher";
import type { Snippet } from "svelte";
import { isBrowser } from "../utils/isBrowser";
import { type Aesthetic, useAesthetic } from "../utils/useAesthetic";
import { type Density, useDensity } from "../utils/useDensity.svelte";
import { type Theme, useTheme } from "../utils/useTheme.svelte";

let {
	themeDefault = undefined as Theme | undefined,
	aestheticDefault = undefined as Aesthetic | undefined,
	densityDefault = undefined as Density | undefined,
	theme = undefined as Theme | undefined,
	aesthetic = undefined as Aesthetic | undefined,
	density = undefined as Density | undefined,
	children,
}: {
	themeDefault?: Theme;
	aestheticDefault?: Aesthetic;
	densityDefault?: Density;
	theme?: Theme;
	aesthetic?: Aesthetic;
	density?: Density;
	children?: Snippet;
} = $props();

// svelte-ignore state_referenced_locally
const _theme = useTheme({ default: themeDefault ?? "editorial" });
// svelte-ignore state_referenced_locally
const _aesthetic = useAesthetic({ default: aestheticDefault ?? "minimal" });
// svelte-ignore state_referenced_locally
const _density = useDensity({ default: densityDefault ?? "comfortable" });

const hasScope = $derived(!!theme || !!aesthetic || !!density);
</script>

{#if isBrowser}
  <ModeWatcher />
{/if}
{#if hasScope}
  <div
    data-theme={theme}
    data-aesthetic={aesthetic}
    data-density={density}
  >
    {@render children?.()}
  </div>
{:else}
  {@render children?.()}
{/if}
