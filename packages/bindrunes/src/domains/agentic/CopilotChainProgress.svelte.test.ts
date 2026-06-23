import { fireEvent, render } from "@testing-library/svelte";
import { describe, expect, it, vi } from "vitest";
import CopilotChainProgress from "./CopilotChainProgress.svelte";
import type { CopilotChain } from "./types";

const runningChain: CopilotChain = {
	name: "Analysis Chain",
	status: "running",
	steps: [
		{ tool: "analyze", description: "Analyzing document", status: "done" },
		{ tool: "classify", description: "Classifying", status: "executing" },
	],
};

const waitingChain: CopilotChain = {
	name: "Draft Chain",
	status: "waiting_gate",
	steps: [{ tool: "draft", description: "Drafting", status: "done" }],
};

describe("CopilotChainProgress", () => {
	it("renders chain name when running", () => {
		const { getByText } = render(CopilotChainProgress, {
			props: { chain: runningChain, onContinue: vi.fn(), onCancel: vi.fn() },
		});
		expect(getByText(/Analysis Chain/)).toBeTruthy();
	});

	it("renders step descriptions", () => {
		const { getByText } = render(CopilotChainProgress, {
			props: { chain: runningChain, onContinue: vi.fn(), onCancel: vi.fn() },
		});
		expect(getByText("Analyzing document")).toBeTruthy();
		expect(getByText("Classifying")).toBeTruthy();
	});

	it("renders continue/cancel buttons when waiting_gate", () => {
		const { getByText } = render(CopilotChainProgress, {
			props: { chain: waitingChain, onContinue: vi.fn(), onCancel: vi.fn() },
		});
		expect(getByText("Continuar")).toBeTruthy();
		expect(getByText("Parar")).toBeTruthy();
	});

	it("calls onContinue when continue clicked", async () => {
		const onContinue = vi.fn();
		const { getByText } = render(CopilotChainProgress, {
			props: { chain: waitingChain, onContinue, onCancel: vi.fn() },
		});
		await fireEvent.click(getByText("Continuar"));
		expect(onContinue).toHaveBeenCalledWith("Draft Chain");
	});

	it("calls onCancel when cancel clicked", async () => {
		const onCancel = vi.fn();
		const { getByText } = render(CopilotChainProgress, {
			props: {
				chain: { name: "Draft Chain", status: "waiting_gate", steps: [] },
				onContinue: vi.fn(),
				onCancel,
			},
		});
		await fireEvent.click(getByText("Parar"));
		expect(onCancel).toHaveBeenCalledWith("Draft Chain");
	});

	it("renders nothing when status is idle", () => {
		const { container } = render(CopilotChainProgress, {
			props: {
				chain: { name: "", status: "idle", steps: [] },
				onContinue: vi.fn(),
				onCancel: vi.fn(),
			},
		});
		expect(container.innerHTML).toBe("<!---->");
	});
});
