import { fireEvent, render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import ToolCallDisplay from "./ToolCallDisplay.svelte";

describe("ToolCallDisplay", () => {
	it("renders tool name and status", () => {
		render(ToolCallDisplay, {
			props: { name: "search_files", status: "completed" },
		});
		expect(screen.getByText("search_files")).toBeTruthy();
		expect(screen.getByText("completed")).toBeTruthy();
	});

	it("expands to show arguments", async () => {
		render(ToolCallDisplay, {
			props: {
				name: "search_files",
				args: { query: "*.ts" },
				status: "completed",
			},
		});
		await fireEvent.click(screen.getByText("search_files"));
		expect(screen.getByText((content, _element) => content.includes("*.ts"))).toBeTruthy();
	});

	it("expands to show result", async () => {
		render(ToolCallDisplay, {
			props: {
				name: "search_files",
				args: { query: "*.ts" },
				result: { count: 5 },
				status: "completed",
			},
		});
		await fireEvent.click(screen.getByText("search_files"));
		expect(screen.getByText((content) => content.includes("count"))).toBeTruthy();
		expect(screen.getByText((content) => content.includes("5"))).toBeTruthy();
	});

	it("shows error state", () => {
		render(ToolCallDisplay, {
			props: { name: "failed_tool", status: "error" },
		});
		expect(screen.getByText("error")).toBeTruthy();
	});
});
