import { fireEvent, render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import MemoryDisplay from "./MemoryDisplay.svelte";

describe("MemoryDisplay", () => {
	it("renders memory layers", () => {
		const working = [{ id: "1", preview: "Current context", tokens: 100 }];
		const episodic = [{ id: "2", preview: "Past conversation", tokens: 200 }];
		const semantic = [{ id: "3", preview: "Documentation", tokens: 150 }];
		render(MemoryDisplay, { props: { working, episodic, semantic } });
		expect(screen.getByText("Working Memory")).toBeTruthy();
		expect(screen.getByText("Episodic Memory")).toBeTruthy();
		expect(screen.getByText("Semantic Memory")).toBeTruthy();
	});

	it("selects memory item", async () => {
		const working = [{ id: "1", preview: "Context", tokens: 100 }];
		const onSelect = vi.fn();
		render(MemoryDisplay, { props: { working, onSelect } });
		await fireEvent.click(screen.getByText("Context"));
		expect(onSelect).toHaveBeenCalledWith(working[0]);
	});
});
