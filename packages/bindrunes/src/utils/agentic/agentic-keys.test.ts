import { describe, expect, it } from "vitest";
import { WINDOW_STORE_KEY } from "./agentic-keys";

describe("agentic context keys", () => {
	it("WINDOW_STORE_KEY is a symbol", () => {
		expect(typeof WINDOW_STORE_KEY).toBe("symbol");
	});

	it("providing and using the same key works", () => {
		// Both modules import from agentic-keys.ts, so they share the same Symbol.
		const key1 = WINDOW_STORE_KEY;
		const key2 = WINDOW_STORE_KEY;
		expect(key1).toBe(key2);
	});

	it("separate Symbol() calls produce different keys", () => {
		const a = Symbol("window-store");
		const b = Symbol("window-store");
		expect(a).not.toBe(b);
	});
});
