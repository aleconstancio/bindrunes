import { fireEvent, render, screen } from "@testing-library/svelte";
import { describe, expect, it, vi } from "vitest";
import OTPInput from "./OTPInput.svelte";

describe("OTPInput", () => {
	it("renders correct number of inputs", () => {
		render(OTPInput, { props: { length: 6 } });
		expect(screen.getAllByRole("textbox")).toHaveLength(6);
	});

	it("handles input", async () => {
		const onChange = vi.fn();
		render(OTPInput, { props: { length: 4, onChange } });
		const inputs = screen.getAllByRole("textbox");
		await fireEvent.input(inputs[0], { target: { value: "1" } });
		expect(onChange).toHaveBeenCalledWith("1***");
	});

	it("handles paste", async () => {
		const onChange = vi.fn();
		render(OTPInput, { props: { length: 4, onChange } });
		const inputs = screen.getAllByRole("textbox");
		await fireEvent.paste(inputs[0], { clipboardData: { getData: () => "1234" } });
		expect(onChange).toHaveBeenCalledWith("1234");
	});
});
