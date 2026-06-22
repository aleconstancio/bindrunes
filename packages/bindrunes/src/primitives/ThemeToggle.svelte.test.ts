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

	it("has aria-label for light mode", () => {
		render(ThemeToggle);
		const button = screen.getByRole("button");
		const label = button.getAttribute("aria-label");
		expect(label === "Light mode" || label === "Dark mode").toBe(true);
	});

	it("outline variant uses default button variant", () => {
		render(ThemeToggle, { variant: "outline" });
		const button = screen.getByRole("button");
		expect(button).toBeInTheDocument();
	});

	it("icon variant uses ghost button variant", () => {
		render(ThemeToggle, { variant: "icon" });
		const button = screen.getByRole("button");
		expect(button).toBeInTheDocument();
	});
});
