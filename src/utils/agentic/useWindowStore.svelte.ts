import { useMetaContext } from "../createMetaContext.svelte";
import type { WindowStore } from "./createWindowStore.svelte";

const WINDOW_STORE_KEY = Symbol("window-store");

export function useWindowStore(): WindowStore {
	return useMetaContext(WINDOW_STORE_KEY);
}
