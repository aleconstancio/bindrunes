import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import NumberInput from "./NumberInput.svelte";

describe("NumberInput", () => {
	it("renders with default value 0", () => {
		render(NumberInput);
		const input = screen.getByRole("spinbutton");
		expect(input).toHaveValue(0);
	});

	it("renders with custom value", () => {
		render(NumberInput, { value: 5 });
		const input = screen.getByRole("spinbutton");
		expect(input).toHaveValue(5);
	});

	it("increment button increases value", async () => {
		render(NumberInput, { value: 0, step: 1 });
		const increaseBtn = screen.getByRole("button", { name: "Increase value" });
		await userEvent.click(increaseBtn);
		const input = screen.getByRole("spinbutton");
		expect(input).toHaveValue(1);
	});

	it("decrement button decreases value", async () => {
		render(NumberInput, { value: 5, step: 1 });
		const decreaseBtn = screen.getByRole("button", { name: "Decrease value" });
		await userEvent.click(decreaseBtn);
		const input = screen.getByRole("spinbutton");
		expect(input).toHaveValue(4);
	});

	it("respects max limit", async () => {
		render(NumberInput, { value: 9, max: 10, step: 1 });
		const increaseBtn = screen.getByRole("button", { name: "Increase value" });
		await userEvent.click(increaseBtn);
		const input = screen.getByRole("spinbutton");
		expect(input).toHaveValue(10);
		await userEvent.click(increaseBtn);
		expect(input).toHaveValue(10);
	});

	it("respects min limit", async () => {
		render(NumberInput, { value: 1, min: 0, step: 1 });
		const decreaseBtn = screen.getByRole("button", { name: "Decrease value" });
		await userEvent.click(decreaseBtn);
		const input = screen.getByRole("spinbutton");
		expect(input).toHaveValue(0);
		await userEvent.click(decreaseBtn);
		expect(input).toHaveValue(0);
	});

	it("renders label when provided", () => {
		render(NumberInput, { label: "Quantity" });
		expect(screen.getByText("Quantity")).toBeInTheDocument();
	});

	it("disables buttons when disabled", () => {
		render(NumberInput, { disabled: true });
		expect(screen.getByRole("button", { name: "Increase value" })).toBeDisabled();
		expect(screen.getByRole("button", { name: "Decrease value" })).toBeDisabled();
	});

	it("size sm applies small classes", () => {
		render(NumberInput, { size: "sm" });
		const input = screen.getByRole("spinbutton");
		expect(input.className).toContain("h-8");
	});

	it("size md applies medium classes", () => {
		render(NumberInput, { size: "md" });
		const input = screen.getByRole("spinbutton");
		expect(input.className).toContain("h-10");
	});

	it("size lg applies large classes", () => {
		render(NumberInput, { size: "lg" });
		const input = screen.getByRole("spinbutton");
		expect(input.className).toContain("h-12");
	});

	it("does not render label when not provided", () => {
		const { container } = render(NumberInput);
		expect(container.querySelector("label")).not.toBeInTheDocument();
	});

	it("sets name on input", () => {
		render(NumberInput, { name: "qty" });
		const input = screen.getByRole("spinbutton");
		expect(input).toHaveAttribute("name", "qty");
	});

	it("sets min and max on input", () => {
		render(NumberInput, { min: 0, max: 100 });
		const input = screen.getByRole("spinbutton");
		expect(input).toHaveAttribute("min", "0");
		expect(input).toHaveAttribute("max", "100");
	});

	it("increment without max goes unbounded", async () => {
		render(NumberInput, { value: 999, step: 1 });
		const increaseBtn = screen.getByRole("button", { name: "Increase value" });
		await userEvent.click(increaseBtn);
		const input = screen.getByRole("spinbutton");
		expect(input).toHaveValue(1000);
	});

	it("decrement without min goes unbounded", async () => {
		render(NumberInput, { value: -999, step: 1 });
		const decreaseBtn = screen.getByRole("button", { name: "Decrease value" });
		await userEvent.click(decreaseBtn);
		const input = screen.getByRole("spinbutton");
		expect(input).toHaveValue(-1000);
	});

	it("applies custom class", () => {
		const { container } = render(NumberInput, { class: "my-num" });
		expect(container.firstElementChild?.className).toContain("my-num");
	});

	it("step=5 increments by 5", async () => {
		render(NumberInput, { value: 0, step: 5 });
		const increaseBtn = screen.getByRole("button", { name: "Increase value" });
		await userEvent.click(increaseBtn);
		const input = screen.getByRole("spinbutton");
		expect(input).toHaveValue(5);
	});
});
