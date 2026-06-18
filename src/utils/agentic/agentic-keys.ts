// src/utils/agentic/agentic-keys.ts
// Shared Symbol keys for agentic context wrappers.
// Both provideWindowStore and useWindowStore MUST import from here
// to ensure the same Symbol is used for setContext/getContext.

export const WINDOW_STORE_KEY = Symbol("window-store");
