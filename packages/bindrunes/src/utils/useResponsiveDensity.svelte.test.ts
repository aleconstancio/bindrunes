import { describe, expect, it } from "vitest";
import { mountComposable } from "../helpers/test-wrapper.svelte";
import { useResponsiveDensity } from "./useResponsiveDensity.svelte";

describe("useResponsiveDensity", () => {
	it("returns default density", async () => {
		const density = await mountComposable(() => useResponsiveDensity());
		expect(["compact", "comfortable", "spacious"]).toContain(density.current);
	});

	it("exposes boolean helpers", async () => {
		const density = await mountComposable(() => useResponsiveDensity());
		expect(typeof density.isCompact).toBe("boolean");
		expect(typeof density.isComfortable).toBe("boolean");
		expect(typeof density.isSpacious).toBe("boolean");
	});

	it("accepts custom breakpoints", async () => {
		const density = await mountComposable(() =>
			useResponsiveDensity({
				breakpoints: {
					compact: "(max-width: 480px)",
					spacious: "(min-width: 1400px)",
				},
			}),
		);
		expect(["compact", "comfortable", "spacious"]).toContain(density.current);
	});
});
