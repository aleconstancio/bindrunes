import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../helpers/axe";
import LabelHarness from "./__tests__/harness/LabelHarness.svelte";

describe("Label", () => {
	it("renders without crashing", () => {
		const { container } = render(LabelHarness);
		expect(container.firstElementChild).toBeInTheDocument();
	});

	it("renders children content", () => {
		render(LabelHarness, { props: { text: "Email" } });
		expect(screen.getByText("Email")).toBeInTheDocument();
	});

	it("for attribute is set on label element", () => {
		const { container } = render(LabelHarness, { props: { forEl: "email-input" } });
		const label = container.querySelector("label");
		expect(label).toHaveAttribute("for", "email-input");
	});

	it("a11y: has no violations", async () => {
		const { container } = render(LabelHarness, { props: { text: "Name" } });
		await expectNoAxeViolations(container);
	});
});
