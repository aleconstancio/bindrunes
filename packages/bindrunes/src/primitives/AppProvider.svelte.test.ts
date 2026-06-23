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

	it("does not render wrapper div when no scoped overrides", () => {
		const { container } = render(AppProviderHarness, {
			props: { childText: "No scope" },
		});
		const wrapper = container.querySelector("div[data-theme]");
		expect(wrapper).toBeNull();
	});

	it("renders wrapper div with data-theme when theme override is set", () => {
		const { container } = render(AppProviderHarness, {
			props: { theme: "midnight", childText: "Themed" },
		});
		const wrapper = container.querySelector("div[data-theme='midnight']");
		expect(wrapper).toBeInTheDocument();
		expect(screen.getByText("Themed")).toBeInTheDocument();
	});

	it("renders wrapper div with data-aesthetic when aesthetic override is set", () => {
		const { container } = render(AppProviderHarness, {
			props: { aesthetic: "neon", childText: "Styled" },
		});
		const wrapper = container.querySelector("div[data-aesthetic='neon']");
		expect(wrapper).toBeInTheDocument();
		expect(screen.getByText("Styled")).toBeInTheDocument();
	});

	it("renders wrapper div with data-density when density override is set", () => {
		const { container } = render(AppProviderHarness, {
			props: { density: "compact", childText: "Dense" },
		});
		const wrapper = container.querySelector("div[data-density='compact']");
		expect(wrapper).toBeInTheDocument();
		expect(screen.getByText("Dense")).toBeInTheDocument();
	});

	it("renders wrapper div with multiple data attributes when multiple overrides are set", () => {
		const { container } = render(AppProviderHarness, {
			props: {
				theme: "midnight",
				aesthetic: "neon",
				density: "compact",
				childText: "All overrides",
			},
		});
		const wrapper = container.querySelector(
			"div[data-theme='midnight'][data-aesthetic='neon'][data-density='compact']",
		);
		expect(wrapper).toBeInTheDocument();
		expect(screen.getByText("All overrides")).toBeInTheDocument();
	});
});
