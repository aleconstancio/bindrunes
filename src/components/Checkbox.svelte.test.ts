import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import Checkbox from "./Checkbox.svelte";

describe("Checkbox", () => {
	it("renders label when provided", () => {
		render(Checkbox, { props: { label: "Agree" } });
		expect(screen.getByText("Agree")).toBeInTheDocument();
	});

	it("is unchecked by default", () => {
		const { container } = render(Checkbox);
		const root = container.querySelector('[role="checkbox"]');
		expect(root?.getAttribute("data-state")).toBe("unchecked");
	});

	it("toggles checked state on click", async () => {
		const { container } = render(Checkbox);
		const root = container.querySelector('[role="checkbox"]')!;
		await userEvent.click(root);
		expect(root.getAttribute("data-state")).toBe("checked");
	});

	it("does not toggle when disabled", async () => {
		const { container } = render(Checkbox, { props: { disabled: true } });
		const root = container.querySelector('[role="checkbox"]')!;
		await userEvent.click(root);
		expect(root.getAttribute("data-state")).toBe("unchecked");
	});

	it("passes name via hidden input", () => {
		const { container } = render(Checkbox, { props: { name: "terms" } });
		const hiddenInput = container.querySelector('input[type="hidden"][name="terms"]');
		expect(hiddenInput).toBeInTheDocument();
	});

	it("renders error with role alert", () => {
		render(Checkbox, { props: { name: "terms", error: "Required" } });
		const errorEl = screen.getByText("Required");
		expect(errorEl).toBeInTheDocument();
		expect(errorEl.getAttribute("role")).toBe("alert");
	});
});
