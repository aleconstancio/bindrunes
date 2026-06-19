import { useMetaContext } from "../createMetaContext.svelte";
import { WINDOW_STORE_KEY } from "./agentic-keys";
import type { WindowStore } from "./createWindowStore.svelte";

export function useWindowStore(): WindowStore {
	return useMetaContext(WINDOW_STORE_KEY);
}
