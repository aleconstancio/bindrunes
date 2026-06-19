import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
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
});
