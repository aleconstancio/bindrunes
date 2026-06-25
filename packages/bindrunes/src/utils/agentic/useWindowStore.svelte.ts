import { useMetaContext } from "../createMetaContext";
import { WINDOW_STORE_KEY } from "./agentic-keys";
import type { WindowStore } from "./createWindowStore.svelte";

export function useWindowStore(): WindowStore {
	return useMetaContext(WINDOW_STORE_KEY);
}
