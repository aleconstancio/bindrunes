import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import CopilotStreamIndicator from "./CopilotStreamIndicator.svelte";

describe("CopilotStreamIndicator", () => {
	it("renders three bouncing dots", () => {
		const { container } = render(CopilotStreamIndicator);
		expect(container.querySelectorAll(".animate-bounce").length).toBe(3);
	});

	it("renders thinking text", () => {
		const { getByText } = render(CopilotStreamIndicator);
		expect(getByText("Pensando...")).toBeTruthy();
	});

	it("applies class prop", () => {
		const { container } = render(CopilotStreamIndicator, { class: "my-class" });
		expect(container.firstElementChild?.className).toContain("my-class");
	});
});
