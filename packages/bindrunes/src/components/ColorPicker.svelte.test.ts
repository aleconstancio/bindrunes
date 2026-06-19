import { fireEvent, render, screen } from "@testing-library/svelte";
import { describe, expect, it, vi } from "vitest";
import ColorPicker from "./ColorPicker.svelte";

describe("ColorPicker", () => {
	it("renders with default color", () => {
		render(ColorPicker, { props: { value: "oklch(0.65 0.1 265)" } });
		expect(screen.getByRole("textbox")).toBeTruthy();
	});

	it("calls onChange when color changes", async () => {
		const onChange = vi.fn();
		render(ColorPicker, { props: { value: "oklch(0.65 0.1 265)", onChange } });
		const input = screen.getByRole("textbox");
		await fireEvent.input(input, { target: { value: "oklch(0.7 0.15 300)" } });
		expect(onChange).toHaveBeenCalledWith("oklch(0.7 0.15 300)");
	});
});
