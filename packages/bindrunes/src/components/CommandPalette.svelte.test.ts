import { fireEvent, render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
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
});
