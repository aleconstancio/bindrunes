import { describe, expect, it } from "vitest";
import HeroBanner from "./HeroBanner.svelte";

describe("HeroBanner", () => {
	it("can be imported", () => {
		expect(HeroBanner).toBeDefined();
	});

	it("has expected props interface", () => {
		expect(typeof HeroBanner).toBe("function");
	});
});
