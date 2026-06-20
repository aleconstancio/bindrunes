import { fireEvent, render, screen } from "@testing-library/svelte";
import { describe, expect, it, vi } from "vitest";
import AgentChatPage from "./AgentChatPage.svelte";

describe("AgentChatPage", () => {
	it("renders chat interface with agent components", () => {
		const messages = [{ id: "1", content: "Hello", sender: "user" as const }];
		const toolCalls = [{ id: "1", name: "search", status: "completed" as const }];
		const reasoningSteps = [{ text: "Analyzing..." }];
		const memory = {
			working: [{ id: "1", preview: "Context", tokens: 100 }],
			episodic: [],
			semantic: [],
		};

		render(AgentChatPage, {
			props: {
				messages,
				toolCalls,
				reasoningSteps,
				memory,
			},
		});

		expect(screen.getByText("Hello")).toBeTruthy();
		expect(screen.getByText("search")).toBeTruthy();
		expect(screen.getByText("Reasoning")).toBeTruthy();
	});

	it("forwards onSendMessage to ChatInput", async () => {
		const onSendMessage = vi.fn();
		render(AgentChatPage, { props: { onSendMessage } });

		const textarea = screen.getByPlaceholderText("Type a message...");
		await fireEvent.input(textarea, { target: { value: "Test message" } });
		await fireEvent.keyDown(textarea, { key: "Enter" });

		expect(onSendMessage).toHaveBeenCalledWith("Test message");
	});

	it("forwards onCancel to AgentStatus", async () => {
		const onCancel = vi.fn();
		render(AgentChatPage, {
			props: { agentState: "executing", onCancel },
		});

		const stopButton = screen.getByText("Stop");
		await fireEvent.click(stopButton);

		expect(onCancel).toHaveBeenCalled();
	});

	it("renders without errors when no props are provided", () => {
		render(AgentChatPage);
		expect(screen.getByText("Status")).toBeTruthy();
	});

	it("hides tool calls section when toolCalls is empty", () => {
		render(AgentChatPage, { props: { toolCalls: [] } });
		expect(screen.queryByText("Tool Calls")).not.toBeInTheDocument();
	});

	it("hides reasoning section when reasoningSteps is empty", () => {
		render(AgentChatPage, { props: { reasoningSteps: [] } });
		expect(screen.queryByText("Reasoning")).not.toBeInTheDocument();
	});

	it("hides memory section when all memory arrays are empty", () => {
		render(AgentChatPage, {
			props: { memory: { working: [], episodic: [], semantic: [] } },
		});
		expect(screen.queryByText("Memory")).not.toBeInTheDocument();
	});
});
