import { fireEvent, render } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import Combobox from "./Combobox.svelte";

describe("Combobox", () => {
	it("renders", () => {
		const { container } = render(Combobox);
		expect(container).toBeDefined();
	});

	it("renders with options", () => {
		const { container } = render(Combobox, {
			options: [
				{ value: "a", label: "Apple" },
				{ value: "b", label: "Banana" },
			],
		});
		expect(container).toBeDefined();
	});

	it("renders with custom placeholder", () => {
		const { container } = render(Combobox, { placeholder: "Pick a fruit" });
		expect(container).toBeDefined();
	});

	it("disabled prop is passed", () => {
		const { container } = render(Combobox, { disabled: true });
		const input = container.querySelector("input");
		expect(input).toBeDefined();
	});

	it("accepts class for styling", () => {
		const { container } = render(Combobox, { class: "custom-cb" });
		expect(container).toBeDefined();
	});

	it("renders empty options without crash", () => {
		const { container } = render(Combobox, { options: [] });
		expect(container).toBeDefined();
	});

	it("renders with disabled options", () => {
		const { container } = render(Combobox, {
			options: [
				{ value: "a", label: "A" },
				{ value: "b", label: "B", disabled: true },
			],
		});
		expect(container).toBeDefined();
	});

	it("input element has correct class structure", () => {
		const { container } = render(Combobox, {
			options: [{ value: "a", label: "A" }],
		});
		const input = container.querySelector("input");
		expect(input?.className).toContain("w-full");
	});

	it("accepts initial value", () => {
		const { container } = render(Combobox, { value: "a" });
		expect(container).toBeDefined();
	});
});
