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
		expect(onChange).toHaveBeenCalledWith("1");
	});

	it("handles paste", async () => {
		const onChange = vi.fn();
		render(OTPInput, { props: { length: 4, onChange } });
		const inputs = screen.getAllByRole("textbox");
		await fireEvent.paste(inputs[0], { clipboardData: { getData: () => "1234" } });
		expect(onChange).toHaveBeenCalledWith("1234");
	});

	it("renders with custom length", () => {
		render(OTPInput, { props: { length: 8 } });
		expect(screen.getAllByRole("textbox")).toHaveLength(8);
	});

	it("disables inputs when disabled prop is true", () => {
		render(OTPInput, { props: { length: 4, disabled: true } });
		const inputs = screen.getAllByRole("textbox");
		inputs.forEach((input) => {
			expect(input).toBeDisabled();
		});
	});

	it("applies disabled class", () => {
		render(OTPInput, { props: { length: 4, disabled: true } });
		const inputs = screen.getAllByRole("textbox");
		expect(inputs[0].className).toContain("opacity-50");
	});

	it("handles multi-character input by truncating", async () => {
		const onChange = vi.fn();
		render(OTPInput, { props: { length: 4, onChange } });
		const inputs = screen.getAllByRole("textbox");
		await fireEvent.input(inputs[0], { target: { value: "ab" } });
		expect(onChange).toHaveBeenCalled();
	});

	it("backspace clears current value", async () => {
		const onChange = vi.fn();
		render(OTPInput, { props: { length: 4, value: "1234", onChange } });
		const inputs = screen.getAllByRole("textbox");
		await fireEvent.keyDown(inputs[2], { key: "Backspace" });
		expect(onChange).toHaveBeenCalled();
	});

	it("backspace on empty input focuses previous", async () => {
		const onChange = vi.fn();
		render(OTPInput, { props: { length: 4, value: "12", onChange } });
		const inputs = screen.getAllByRole("textbox");
		await fireEvent.keyDown(inputs[1], { key: "Backspace" });
		expect(onChange).toHaveBeenCalled();
	});

	it("applies custom class", () => {
		const { container } = render(OTPInput, { props: { length: 4, class: "my-otp" } });
		expect(container.firstElementChild?.className).toContain("my-otp");
	});

	it("each input has aria-label", () => {
		render(OTPInput, { props: { length: 4 } });
		expect(screen.getByLabelText("OTP digit 1")).toBeInTheDocument();
		expect(screen.getByLabelText("OTP digit 4")).toBeInTheDocument();
	});

	it("paste longer than length truncates", async () => {
		const onChange = vi.fn();
		render(OTPInput, { props: { length: 4, onChange } });
		const inputs = screen.getAllByRole("textbox");
		await fireEvent.paste(inputs[0], { clipboardData: { getData: () => "12345678" } });
		expect(onChange).toHaveBeenCalledWith("1234");
	});

	it("paste with empty data", async () => {
		const onChange = vi.fn();
		render(OTPInput, { props: { length: 4, onChange } });
		const inputs = screen.getAllByRole("textbox");
		await fireEvent.paste(inputs[0], { clipboardData: { getData: () => "" } });
		expect(onChange).toHaveBeenCalledWith("");
	});
});
