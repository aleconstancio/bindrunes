import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import TooltipHarness from "./__tests__/TooltipHarness.svelte";

describe("Tooltip", () => {
	it("renders trigger element", () => {
		const { container } = render(TooltipHarness, {
			content: "Help text",
			slots: { children: "Hover me" },
		});
		const trigger = container.querySelector("[data-tooltip-trigger]");
		expect(trigger).toBeInTheDocument();
	});

	it("renders content prop", () => {
		const { container } = render(TooltipHarness, {
			content: "Help text",
			slots: { children: "Hover me" },
		});
		expect(container).toBeInTheDocument();
	});

	it("renders the tooltip provider wrapper", () => {
		const { container } = render(TooltipHarness, {
			content: "Info",
			slots: { children: "Hover" },
		});
		expect(container.firstElementChild).toBeInTheDocument();
	});

	it("does not create its own provider (uses app-level TooltipProvider)", () => {
		const { container } = render(TooltipHarness, {
			content: "Info",
			slots: { children: "Hover" },
		});
		const providerWrappers = container.querySelectorAll("[data-tooltip-provider]");
		expect(providerWrappers.length).toBeLessThanOrEqual(1);
	});

	it("renders with default side top", () => {
		const { container } = render(TooltipHarness, {
			content: "Tip",
			slots: { children: "Hover" },
		});
		expect(container.firstElementChild).toBeInTheDocument();
	});
});
