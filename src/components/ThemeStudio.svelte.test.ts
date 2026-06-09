import { fireEvent, render, screen } from "@testing-library/svelte";
import { tick } from "svelte";
import { beforeEach, describe, expect, it, vi } from "vitest";
import ComposableHarness from "../ComposableHarness.svelte";
import ThemeStudio from "./ThemeStudio.svelte";

describe("ThemeStudio", () => {
	beforeEach(() => {
		localStorage.clear();
		document.documentElement.removeAttribute("data-aesthetic");
		// Stub clipboard
		(navigator as any).clipboard = { writeText: vi.fn() };
	});

	it("renders all four tab buttons", () => {
		render(ThemeStudio);
		expect(screen.getByText("Theme")).toBeInTheDocument();
		expect(screen.getByText("Aesthetic")).toBeInTheDocument();
		expect(screen.getByText("Density")).toBeInTheDocument();
		expect(screen.getByText("Export")).toBeInTheDocument();
	});

	it("starts on the Theme tab", () => {
		render(ThemeStudio);
		expect(screen.getByText("Start from preset")).toBeInTheDocument();
	});

	it("switches to Aesthetic tab", async () => {
		render(ThemeStudio);
		await fireEvent.click(screen.getByText("Aesthetic"));
		await tick();
		expect(screen.getByText("Form aesthetic")).toBeInTheDocument();
	});

	it("switches to Density tab", async () => {
		render(ThemeStudio);
		await fireEvent.click(screen.getByText("Density"));
		await tick();
		expect(screen.getByText("Content density")).toBeInTheDocument();
	});

	it("switches to Export tab and shows Apply Theme", async () => {
		render(ThemeStudio);
		await fireEvent.click(screen.getByText("Export"));
		await tick();
		expect(screen.getByText("Apply Theme")).toBeInTheDocument();
		expect(screen.getByText("Copy CSS")).toBeInTheDocument();
	});

	it("calls onchange when Apply Theme is clicked", async () => {
		const onchange = vi.fn();
		render(ThemeStudio, { onchange });
		await fireEvent.click(screen.getByText("Export"));
		await tick();
		await fireEvent.click(screen.getByText("Apply Theme"));
		expect(onchange).toHaveBeenCalled();
		expect(typeof onchange.mock.calls[0][0]).toBe("string");
	});

	it("clicking a preset switches the active preset button", async () => {
		render(ThemeStudio);
		await fireEvent.click(screen.getByText("dracula"));
		await tick();
		// Should still be on the Theme tab
		expect(screen.getByText("Start from preset")).toBeInTheDocument();
	});

	it("renders Preview pane", () => {
		render(ThemeStudio);
		expect(screen.getByText("Preview")).toBeInTheDocument();
	});
});
