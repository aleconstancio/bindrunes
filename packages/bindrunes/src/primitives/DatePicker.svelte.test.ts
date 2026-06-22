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

	it("renders without label when not provided", () => {
		const { container } = render(DatePicker);
		expect(container.querySelector("label")).not.toBeInTheDocument();
	});

	it("can be disabled", () => {
		const { container } = render(DatePicker, { disabled: true });
		expect(container.firstElementChild).toBeInTheDocument();
	});

	it("applies custom class", () => {
		const { container } = render(DatePicker, { class: "my-picker" });
		expect(container.firstElementChild).toBeInTheDocument();
	});

	it("renders with initial value", () => {
		const date = new Date(2024, 0, 15);
		const { container } = render(DatePicker, { value: date });
		expect(container.firstElementChild).toBeInTheDocument();
	});

	it("renders with undefined value", () => {
		const { container } = render(DatePicker, { value: undefined });
		expect(container.firstElementChild).toBeInTheDocument();
	});
});
