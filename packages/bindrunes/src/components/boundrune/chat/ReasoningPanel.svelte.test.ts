import { fireEvent, render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import ReasoningPanel from "./ReasoningPanel.svelte";

describe("ReasoningPanel", () => {
	it("renders reasoning steps", () => {
		const steps = [
			{ text: "Analyzing request...", confidence: 0.9 },
			{ text: "Searching files...", confidence: 0.85 },
		];
		render(ReasoningPanel, { props: { steps } });
		expect(screen.getByText("Analyzing request...")).toBeTruthy();
	});

	it("expands to show all steps", async () => {
		const steps = [
			{ text: "Step 1", confidence: 0.9 },
			{ text: "Step 2", confidence: 0.85 },
		];
		render(ReasoningPanel, { props: { steps, expanded: false } });
		await fireEvent.click(screen.getByText("Reasoning"));
		expect(screen.getByText("Step 1")).toBeTruthy();
		expect(screen.getByText("Step 2")).toBeTruthy();
	});
});
