import { fireEvent, render, screen } from "@testing-library/svelte";
import { describe, expect, it, vi } from "vitest";
import AgentStatus from "./AgentStatus.svelte";

describe("AgentStatus", () => {
	it("renders state and token usage", () => {
		render(AgentStatus, {
			props: {
				state: "thinking",
				tokenUsage: { prompt: 1000, completion: 500 },
			},
		});
		expect(screen.getByText("thinking")).toBeTruthy();
		expect(screen.getByText("1500")).toBeTruthy();
	});

	it("shows cancel button when on Cancel provided", () => {
		const onCancel = vi.fn();
		render(AgentStatus, { props: { state: "executing", onCancel } });
		expect(screen.getByText("Stop")).toBeTruthy();
	});

	it("calls onCancel when clicked", async () => {
		const onCancel = vi.fn();
		render(AgentStatus, { props: { state: "executing", onCancel } });
		await fireEvent.click(screen.getByText("Stop"));
		expect(onCancel).toHaveBeenCalled();
	});
});
