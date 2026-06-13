import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import Label from "../../src/components/Label.svelte";

describe("Label", () => {
	it("renders label element", () => {
		const { container } = render(Label, { for: "email", slots: { children: "Email" } });
		const label = container.querySelector("label");
		expect(label).toBeInTheDocument();
	});

	it("sets htmlFor attribute", () => {
		const { container } = render(Label, { for: "email", slots: { children: "Email" } });
		const label = container.querySelector("label");
		expect(label).toHaveAttribute("for", "email");
	});
});
