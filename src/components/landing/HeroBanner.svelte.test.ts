import { describe, expect, it } from "vitest";
import HeroBanner from "./HeroBanner.svelte";

describe("HeroBanner", () => {
	it("exports a Svelte component", () => {
		expect(HeroBanner).toBeDefined();
	});

	it("is a function", () => {
		expect(typeof HeroBanner).toBe("function");
	});
});
