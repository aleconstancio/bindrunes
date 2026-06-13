import { getContext, setContext } from "svelte";

export function createMetaContext<T>(key: symbol, factory: () => T): T {
	const state = factory();
	setContext(key, state);
	return state;
}

export function useMetaContext<T>(key: symbol): T {
	const ctx = getContext<T>(key);
	if (ctx === undefined) {
		throw new Error(
			"useMetaContext: no context found for the given key. Ensure createMetaContext was called in a parent component.",
		);
	}
	return ctx;
}
