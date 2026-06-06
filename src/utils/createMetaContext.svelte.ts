import { setContext, getContext } from 'svelte';

export function createMetaContext<T>(key: symbol, factory: () => T): T {
  const state = factory();
  setContext(key, state);
  return state;
}

export function useMetaContext<T>(key: symbol): T {
  return getContext<T>(key);
}
