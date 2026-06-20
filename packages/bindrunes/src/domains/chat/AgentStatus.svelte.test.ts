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
		expect(screen.getByText("thinking")).toBeInTheDocument();
		expect(screen.getByText("1500")).toBeInTheDocument();
	});

	it("shows cancel button when onCancel provided", () => {
		const onCancel = vi.fn();
		render(AgentStatus, { props: { state: "executing", onCancel } });
		expect(screen.getByText("Stop")).toBeInTheDocument();
	});

	it("hides cancel button when state is idle", () => {
		const onCancel = vi.fn();
		render(AgentStatus, { props: { state: "idle", onCancel } });
		expect(screen.queryByText("Stop")).not.toBeInTheDocument();
	});

	it("calls onCancel when clicked", async () => {
		const onCancel = vi.fn();
		render(AgentStatus, { props: { state: "executing", onCancel } });
		await fireEvent.click(screen.getByText("Stop"));
		expect(onCancel).toHaveBeenCalled();
	});
});
