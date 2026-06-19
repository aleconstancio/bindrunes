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
		expect(screen.getByText((content, element) => content.includes("*.ts"))).toBeTruthy();
	});

	it("shows error state", () => {
		render(ToolCallDisplay, {
			props: { name: "failed_tool", status: "error" },
		});
		expect(screen.getByText("error")).toBeTruthy();
	});
});
