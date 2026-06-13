import { fireEvent, render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import ThemeToggle from "../../src/components/ThemeToggle.svelte";

describe("ThemeToggle", () => {
	it("renders a button", () => {
		const { container } = render(ThemeToggle);
		const button = container.querySelector("button");
		expect(button).toBeInTheDocument();
	});

	it("renders without crashing", () => {
		const { container } = render(ThemeToggle);
		expect(container).toBeInTheDocument();
	});

	it("clicking the toggle button does not throw", async () => {
		const { container } = render(ThemeToggle);
		const button = container.querySelector("button")!;
		await fireEvent.click(button);
		expect(button).toBeInTheDocument();
	});

	it("clicking the button twice does not throw", async () => {
		const { container } = render(ThemeToggle);
		const button = container.querySelector("button")!;
		await fireEvent.click(button);
		await fireEvent.click(button);
		expect(button).toBeInTheDocument();
	});
});
