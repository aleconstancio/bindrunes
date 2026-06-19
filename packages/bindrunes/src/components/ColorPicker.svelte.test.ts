import { fireEvent, render, screen } from "@testing-library/svelte";
import { describe, expect, it, vi } from "vitest";
import { expectNoAxeViolations } from "../helpers/axe";
import ColorPicker from "./ColorPicker.svelte";

describe("ColorPicker", () => {
	it("renders with default color", () => {
		render(ColorPicker);
		expect(screen.getByRole("textbox")).toBeTruthy();
		expect(screen.getByRole("img", { name: "Color preview" })).toBeTruthy();
	});

	it("calls onChange when text input is updated with valid OKLCH", async () => {
		const onChange = vi.fn();
		render(ColorPicker, { props: { value: "oklch(0.65 0.1 265)", onChange } });
		const input = screen.getByRole("textbox");
		await fireEvent.input(input, { target: { value: "oklch(0.7 0.15 300)" } });
		expect(onChange).toHaveBeenCalledWith("oklch(0.7 0.15 300)");
	});

	it("does not call onChange on mount", () => {
		const onChange = vi.fn();
		render(ColorPicker, { props: { value: "oklch(0.65 0.1 265)", onChange } });
		expect(onChange).not.toBeCalled();
	});

	it("syncs sliders when value prop changes externally", async () => {
		const { rerender } = render(ColorPicker, {
			props: { value: "oklch(0.5 0.2 180)" },
		});
		const input = screen.getByRole("textbox") as HTMLInputElement;
		expect(input.value).toBe("oklch(0.5 0.2 180)");

		await rerender({ value: "oklch(0.8 0.05 90)" });
		expect(input.value).toBe("oklch(0.8 0.05 90)");
	});

	it("slider interaction updates text input", async () => {
		render(ColorPicker, { props: { value: "oklch(0.65 0.1 265)" } });
		const sliders = screen.getAllByRole("slider");
		const hueSlider = sliders[0];

		await fireEvent.input(hueSlider, { target: { value: "120" } });
		const textInput = screen.getByRole("textbox") as HTMLInputElement;
		expect(textInput.value).toContain("120");
	});

	it("preview reflects current values via data attributes", () => {
		render(ColorPicker, { props: { value: "oklch(0.5 0.2 180)" } });
		const preview = screen.getByRole("img", { name: "Color preview" });
		expect(preview).toHaveAttribute("data-lightness", "0.5");
		expect(preview).toHaveAttribute("data-chroma", "0.2");
		expect(preview).toHaveAttribute("data-hue", "180");
	});

	it("shows error for invalid OKLCH format", async () => {
		render(ColorPicker, { props: { value: "oklch(0.65 0.1 265)" } });
		const input = screen.getByRole("textbox");
		await fireEvent.input(input, { target: { value: "not-a-color" } });
		expect(screen.getByText("Invalid OKLCH format. Expected: oklch(L C H)")).toBeTruthy();
		expect(input).toHaveAttribute("aria-invalid", "true");
	});

	it("disables all inputs when disabled prop is true", () => {
		render(ColorPicker, { props: { value: "oklch(0.65 0.1 265)", disabled: true } });
		const textbox = screen.getByRole("textbox");
		const sliders = screen.getAllByRole("slider");
		expect(textbox).toBeDisabled();
		for (const slider of sliders) {
			expect(slider).toBeDisabled();
		}
	});

	it("applies custom class", () => {
		const { container } = render(ColorPicker, {
			props: { value: "oklch(0.65 0.1 265)", class: "my-picker" },
		});
		expect(container.firstElementChild?.className).toContain("my-picker");
	});

	it("a11y: color picker has no violations", async () => {
		const { container } = render(ColorPicker, {
			props: { value: "oklch(0.65 0.1 265)" },
		});
		await expectNoAxeViolations(container);
	});
});
