import { describe, expect, it } from "vitest";
import LandingNav from "./LandingNav.svelte";

describe("LandingNav", () => {
	it("can be imported", () => {
		expect(LandingNav).toBeDefined();
	});

	it("has expected props interface", () => {
		expect(typeof LandingNav).toBe("function");
	});
});
