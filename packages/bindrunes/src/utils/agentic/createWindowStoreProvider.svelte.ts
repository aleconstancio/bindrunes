import { createMetaContext } from "../createMetaContext.svelte";
import { WINDOW_STORE_KEY } from "./agentic-keys";
import { createWindowStore, type WindowStore } from "./createWindowStore.svelte";

export function provideWindowStore(options?: Parameters<typeof createWindowStore>[0]): WindowStore {
	return createMetaContext(WINDOW_STORE_KEY, () => createWindowStore(options));
}
