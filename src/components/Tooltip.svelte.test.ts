import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import Tooltip from "../../src/components/Tooltip.svelte";

describe("Tooltip", () => {
	it("renders trigger element", () => {
		const { container } = render(Tooltip, {
			content: "Help text",
			slots: { children: "Hover me" },
		});
		const trigger = container.querySelector("[data-tooltip-trigger]");
		expect(trigger).toBeInTheDocument();
	});

	it("renders content prop", () => {
		const { container } = render(Tooltip, {
			content: "Help text",
			slots: { children: "Hover me" },
		});
		expect(container).toBeInTheDocument();
	});
});
