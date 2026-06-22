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

	it("renders error message with name", () => {
		render(Switch, { props: { error: "Required", name: "toggle" } });
		expect(screen.getByText("Required")).toBeInTheDocument();
	});

	it("sets aria-describedby when error and name provided", () => {
		render(Switch, { props: { error: "Error", name: "sw" } });
		const root = document.querySelector('[role="switch"]');
		expect(root?.getAttribute("aria-describedby")).toBe("sw-error");
	});

	it("does not set aria-describedby without name", () => {
		render(Switch, { props: { error: "Error" } });
		const root = document.querySelector('[role="switch"]');
		expect(root?.getAttribute("aria-describedby")).toBeNull();
	});

	it("sets aria-invalid when error is present", () => {
		render(Switch, { props: { error: "Error" } });
		const root = document.querySelector('[role="switch"]');
		expect(root?.getAttribute("aria-invalid")).toBe("true");
	});

	it("does not set aria-invalid without error", () => {
		render(Switch);
		const root = document.querySelector('[role="switch"]');
		expect(root?.getAttribute("aria-invalid")).toBeNull();
	});

	it("does not render error text when not provided", () => {
		const { container } = render(Switch);
		expect(container.querySelector("p")).not.toBeInTheDocument();
	});

	it("does not render error when not provided", () => {
		const { container } = render(Switch);
		expect(container.querySelector("p")).not.toBeInTheDocument();
	});

	it("applies custom class", () => {
		const { container } = render(Switch, { props: { class: "my-switch" } });
		const label = container.querySelector("label");
		expect(label?.className).toContain("my-switch");
	});
});
