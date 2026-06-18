import { describe, expect, it } from "vitest";
import { isBrowser } from "./isBrowser";

describe("isBrowser", () => {
	it("is a boolean", () => {
		expect(typeof isBrowser).toBe("boolean");
	});

	it("is true in jsdom", () => {
		expect(isBrowser).toBe(true);
	});
});
