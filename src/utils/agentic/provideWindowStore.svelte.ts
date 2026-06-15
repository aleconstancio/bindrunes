import { createMetaContext } from "../createMetaContext.svelte";
import { createWindowStore, type WindowStore } from "./createWindowStore.svelte";

const WINDOW_STORE_KEY = Symbol("window-store");

export function provideWindowStore(options?: Parameters<typeof createWindowStore>[0]): WindowStore {
	return createMetaContext(WINDOW_STORE_KEY, () => createWindowStore(options));
}
