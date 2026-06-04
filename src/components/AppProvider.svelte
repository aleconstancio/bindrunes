<script lang="ts">
	import { ModeWatcher } from 'mode-watcher';
	import { Toaster } from 'svelte-sonner';
	import { createTheme } from '../utils/createTheme.svelte';
	import { createAesthetic } from '../utils/createAesthetic.svelte';
	import { createDensity } from '../utils/createDensity.svelte';
	import { createPrefersTheme } from '../utils/createPrefersTheme.svelte';

	let {
		toasterPosition = 'bottom-right' as 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right',
		toasterDuration = 4000,
		toasterVisibleToasts = 5,
		themeDefault = undefined as string | undefined,
		aestheticDefault = undefined as string | undefined,
		densityDefault = undefined as string | undefined,
		respectPrefersColorScheme = true,
		children,
	}: {
		toasterPosition?: string;
		toasterDuration?: number;
		toasterVisibleToasts?: number;
		themeDefault?: string;
		aestheticDefault?: string;
		densityDefault?: string;
		respectPrefersColorScheme?: boolean;
		children?: import('svelte').Snippet;
	} = $props();

	const theme = createTheme({ default: (themeDefault ?? 'editorial') as any });
	const aesthetic = createAesthetic({ default: (aestheticDefault ?? 'editorial') as any });
	const density = createDensity({ default: (densityDefault ?? 'comfortable') as any });

	$effect(() => {
		if (respectPrefersColorScheme) {
			createPrefersTheme();
		}
	});
</script>

<ModeWatcher />
<Toaster
	richColors
	closeButton
	position={toasterPosition}
	duration={toasterDuration}
	visibleToasts={toasterVisibleToasts}
/>
{@render children?.()}
