import { fireEvent, render } from "@testing-library/svelte";
import { describe, expect, it, vi } from "vitest";
import CopilotSuggestionCard from "./CopilotSuggestionCard.svelte";
import type { CopilotSuggestion } from "./types";

const mockSuggestion: CopilotSuggestion = {
	id: "s1",
	title: "Test Suggestion",
	description: "A test suggestion",
	risk: "medium",
	actions: [{ label: "Apply", tool: "apply_tool" }],
};

describe("CopilotSuggestionCard", () => {
	it("renders title and description", () => {
		const { getByText } = render(CopilotSuggestionCard, {
			props: { suggestion: mockSuggestion, onDismiss: vi.fn(), onAct: vi.fn() },
		});
		expect(getByText("Test Suggestion")).toBeTruthy();
		expect(getByText("A test suggestion")).toBeTruthy();
	});

	it("renders action buttons", () => {
		const { getByText } = render(CopilotSuggestionCard, {
			props: { suggestion: mockSuggestion, onDismiss: vi.fn(), onAct: vi.fn() },
		});
		expect(getByText("Apply")).toBeTruthy();
	});

	it("calls onDismiss when close clicked", async () => {
		const onDismiss = vi.fn();
		const { getByRole } = render(CopilotSuggestionCard, {
			props: { suggestion: mockSuggestion, onDismiss, onAct: vi.fn() },
		});
		await fireEvent.click(getByRole("button", { name: /dispensar/i }));
		expect(onDismiss).toHaveBeenCalledWith("s1");
	});

	it("calls onAct when action clicked", async () => {
		const onAct = vi.fn();
		const { getByText } = render(CopilotSuggestionCard, {
			props: { suggestion: mockSuggestion, onDismiss: vi.fn(), onAct },
		});
		await fireEvent.click(getByText("Apply"));
		expect(onAct).toHaveBeenCalledWith("s1", mockSuggestion.actions[0]);
	});
});
