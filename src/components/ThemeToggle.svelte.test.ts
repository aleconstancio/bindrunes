import { fireEvent, render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import ThemeToggle from "./ThemeToggle.svelte";

describe("ThemeToggle", () => {
	it("renders a button", () => {
		render(ThemeToggle);
		const button = screen.getByRole("button");
		expect(button).toBeInTheDocument();
	});

	it("clicking does not throw", async () => {
		render(ThemeToggle);
		const button = screen.getByRole("button");
		await fireEvent.click(button);
		expect(button).toBeInTheDocument();
	});

	it("renders with icon variant", () => {
		render(ThemeToggle, { variant: "icon" });
		const button = screen.getByRole("button");
		expect(button).toBeInTheDocument();
	});

	it("clicking twice does not throw", async () => {
		render(ThemeToggle);
		const button = screen.getByRole("button");
		await fireEvent.click(button);
		await fireEvent.click(button);
		expect(button).toBeInTheDocument();
	});
});
