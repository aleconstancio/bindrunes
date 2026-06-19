import { fireEvent, render, screen } from "@testing-library/svelte";
import { describe, expect, it, vi } from "vitest";
import CommandPalette from "./CommandPalette.svelte";

describe("CommandPalette", () => {
	it("renders with placeholder text", () => {
		render(CommandPalette, { props: { placeholder: "Search...", open: true } });
		expect(screen.getByPlaceholderText("Search...")).toBeTruthy();
	});

	it("opens on Cmd+K", async () => {
		render(CommandPalette, { props: { open: false } });
		await fireEvent.keyDown(document, { key: "k", metaKey: true });
		expect(screen.getByRole("dialog")).toBeTruthy();
	});

	it("filters items based on search", async () => {
		const items = [
			{ id: "1", label: "Copy", keywords: ["copy"] },
			{ id: "2", label: "Paste", keywords: ["paste"] },
		];
		render(CommandPalette, { props: { items, open: true } });
		await fireEvent.input(screen.getByRole("combobox"), { target: { value: "copy" } });
		expect(screen.getByText("Copy")).toBeTruthy();
		expect(screen.queryByText("Paste")).toBeNull();
	});

	it("navigates down with ArrowDown", async () => {
		const items = [
			{ id: "1", label: "Copy" },
			{ id: "2", label: "Paste" },
		];
		render(CommandPalette, { props: { items, open: true } });
		const input = screen.getByRole("combobox");
		await fireEvent.keyDown(input, { key: "ArrowDown" });
		const buttons = screen
			.getAllByRole("button")
			.filter((b) => b.textContent?.trim() === "Copy" || b.textContent?.trim() === "Paste");
		expect(buttons[1].className).toContain("bg-accent");
	});

	it("navigates up with ArrowUp", async () => {
		const items = [
			{ id: "1", label: "Copy" },
			{ id: "2", label: "Paste" },
		];
		render(CommandPalette, { props: { items, open: true } });
		const input = screen.getByRole("combobox");
		await fireEvent.keyDown(input, { key: "ArrowDown" });
		await fireEvent.keyDown(input, { key: "ArrowUp" });
		const buttons = screen
			.getAllByRole("button")
			.filter((b) => b.textContent?.trim() === "Copy" || b.textContent?.trim() === "Paste");
		expect(buttons[0].className).toContain("bg-accent");
	});

	it("selects item on Enter", async () => {
		let selected: { id: string; label: string } | null = null;
		const items = [
			{ id: "1", label: "Copy" },
			{ id: "2", label: "Paste" },
		];
		render(CommandPalette, {
			props: {
				items,
				open: true,
				onSelect: (item: { id: string; label: string }) => {
					selected = item;
				},
			},
		});
		const input = screen.getByRole("combobox");
		await fireEvent.keyDown(input, { key: "Enter" });
		expect(selected).toEqual({ id: "1", label: "Copy" });
	});

	it("closes on Escape", async () => {
		render(CommandPalette, { props: { open: true } });
		const input = screen.getByRole("combobox");
		await fireEvent.keyDown(input, { key: "Escape" });
		expect(screen.queryByRole("dialog")).toBeNull();
	});

	it("closes on overlay click", async () => {
		render(CommandPalette, { props: { open: true } });
		const overlay = screen.getByTestId("command-palette-overlay");
		expect(overlay).toBeTruthy();
		await fireEvent.click(overlay);
		expect(screen.queryByRole("dialog")).toBeNull();
	});

	it("has accessible dialog label", () => {
		render(CommandPalette, { props: { open: true } });
		const dialog = screen.getByRole("dialog");
		expect(dialog).toHaveAttribute("aria-label", "Command palette");
	});

	it("auto-focuses input on open", async () => {
		vi.useFakeTimers();
		render(CommandPalette, { props: { open: true } });
		vi.advanceTimersByTime(50);
		const input = screen.getByRole("combobox");
		expect(input).toBe(document.activeElement);
		vi.useRealTimers();
	});
});
