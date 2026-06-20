import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../helpers/axe";
import DatePicker from "./DatePicker.svelte";

describe("DatePicker", () => {
	it("renders the root element", () => {
		const { container } = render(DatePicker);
		expect(container.firstElementChild).toBeInTheDocument();
	});

	it("renders with a label", () => {
		const { getByText } = render(DatePicker, {
			props: { label: "Pick a date" },
		});
		expect(getByText("Pick a date")).toBeTruthy();
	});

	it("a11y: has no violations", async () => {
		const { container } = render(DatePicker);
		await expectNoAxeViolations(container);
	});
});
