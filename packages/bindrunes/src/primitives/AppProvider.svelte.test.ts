import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import AppProviderHarness from "./__tests__/harness/AppProviderHarness.svelte";

describe("AppProvider", () => {
	it("renders without crashing", () => {
		const { container } = render(AppProviderHarness);
		expect(container).toBeDefined();
	});

	it("renders children", () => {
		render(AppProviderHarness, {
			props: { childText: "App content" },
		});
		expect(screen.getByText("App content")).toBeInTheDocument();
	});

	it("does not throw with custom theme defaults", () => {
		expect(() =>
			render(AppProviderHarness, {
				props: {
					themeDefault: "midnight",
					aestheticDefault: "neon",
					densityDefault: "compact",
					childText: "Content",
				},
			}),
		).not.toThrow();
	});
});
