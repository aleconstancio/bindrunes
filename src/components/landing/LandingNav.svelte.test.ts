import { describe, expect, it } from "vitest";
import LandingNav from "./LandingNav.svelte";

describe("LandingNav", () => {
	it("exports a Svelte component", () => {
		expect(LandingNav).toBeDefined();
	});

	it("is a function", () => {
		expect(typeof LandingNav).toBe("function");
	});
});
