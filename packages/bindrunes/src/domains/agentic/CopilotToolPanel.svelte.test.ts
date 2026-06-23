import { fireEvent, render } from "@testing-library/svelte";
import { describe, expect, it, vi } from "vitest";
import CopilotToolPanel from "./CopilotToolPanel.svelte";
import type { ToolCategory } from "./types";

const mockCategories: ToolCategory[] = [
	{
		id: "analysis",
		label: "Analise",
		tools: [{ id: "tool1", label: "Tool One", description: "Desc", params: {} }],
	},
];

describe("CopilotToolPanel", () => {
	it("renders category tabs", () => {
		const { getByText } = render(CopilotToolPanel, {
			props: {
				toolCategories: mockCategories,
				activeCategory: "analysis",
				status: "connected",
				onSelectCategory: vi.fn(),
				onSendToolCall: vi.fn(),
			},
		});
		expect(getByText("Analise")).toBeTruthy();
	});

	it("renders tools in active category", () => {
		const { getByText } = render(CopilotToolPanel, {
			props: {
				toolCategories: mockCategories,
				activeCategory: "analysis",
				status: "connected",
				onSelectCategory: vi.fn(),
				onSendToolCall: vi.fn(),
			},
		});
		expect(getByText("Tool One")).toBeTruthy();
		expect(getByText("Desc")).toBeTruthy();
	});

	it("calls onSelectCategory when tab clicked", async () => {
		const onSelect = vi.fn();
		const { getByText } = render(CopilotToolPanel, {
			props: {
				toolCategories: mockCategories,
				activeCategory: "other",
				status: "connected",
				onSelectCategory: onSelect,
				onSendToolCall: vi.fn(),
			},
		});
		await fireEvent.click(getByText("Analise"));
		expect(onSelect).toHaveBeenCalledWith("analysis");
	});
});
