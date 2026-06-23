import { fireEvent, render } from "@testing-library/svelte";
import { describe, expect, it, vi } from "vitest";
import CopilotInput from "./CopilotInput.svelte";

describe("CopilotInput", () => {
	it("renders input field", () => {
		const { getByRole } = render(CopilotInput, {
			props: { status: "connected", mode: "item", onSend: vi.fn() },
		});
		expect(getByRole("textbox")).toBeTruthy();
	});

	it("disables input when disconnected", () => {
		const { getByRole } = render(CopilotInput, {
			props: { status: "disconnected", mode: "item", onSend: vi.fn() },
		});
		expect(getByRole("textbox")).toBeDisabled();
	});

	it("calls onSend with input value", async () => {
		const onSend = vi.fn();
		const { getByRole } = render(CopilotInput, {
			props: { status: "connected", mode: "item", onSend },
		});
		const input = getByRole("textbox");
		await fireEvent.input(input, { target: { value: "hello" } });
		await fireEvent.submit(input.closest("form")!);
		expect(onSend).toHaveBeenCalledWith("hello");
	});

	it("applies class prop", () => {
		const { container } = render(CopilotInput, {
			props: { status: "connected", mode: "item", onSend: vi.fn(), class: "my-class" },
		});
		expect(container.firstElementChild?.className).toContain("my-class");
	});
});
