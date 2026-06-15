import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import Switch from "./Switch.svelte";

describe("Switch", () => {
	it("renders label when provided", () => {
		render(Switch, { props: { label: "Notifications" } });
		expect(screen.getByText("Notifications")).toBeInTheDocument();
	});

	it("is unchecked by default", () => {
		const { container } = render(Switch);
		const root = container.querySelector('[role="switch"]');
		expect(root?.getAttribute("data-state")).toBe("unchecked");
	});

	it("toggles checked state on click", async () => {
		const { container } = render(Switch);
		const root = container.querySelector('[role="switch"]')!;
		await userEvent.click(root);
		expect(root.getAttribute("data-state")).toBe("checked");
	});

	it("does not toggle when disabled", async () => {
		const { container } = render(Switch, { props: { disabled: true, label: "Disabled" } });
		const root = container.querySelector('[role="switch"]')!;
		await userEvent.click(root);
		expect(root.getAttribute("data-state")).toBe("unchecked");
	});
});
