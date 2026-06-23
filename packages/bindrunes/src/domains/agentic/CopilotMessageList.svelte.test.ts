import { render } from "@testing-library/svelte";
import { describe, expect, it, vi } from "vitest";
import CopilotMessageList from "./CopilotMessageList.svelte";
import type { CopilotMessage, CopilotSuggestion } from "./types";

const mockMessages: CopilotMessage[] = [
	{ id: "1", content: "Hello", role: "user", timestamp: new Date() },
	{ id: "2", content: "Hi there", role: "agent", timestamp: new Date() },
];

const mockSuggestions: CopilotSuggestion[] = [
	{ id: "s1", title: "Suggestion 1", description: "Desc", risk: "low", actions: [] },
];

describe("CopilotMessageList", () => {
	it("renders messages", () => {
		const { getByText } = render(CopilotMessageList, {
			props: {
				messages: mockMessages,
				streamingContent: "",
				status: "connected",
				suggestions: [],
				mode: "item",
				onQuickAction: vi.fn(),
			},
		});
		expect(getByText("Hello")).toBeTruthy();
		expect(getByText("Hi there")).toBeTruthy();
	});

	it("renders empty state for item mode", () => {
		const { getByText } = render(CopilotMessageList, {
			props: {
				messages: [],
				streamingContent: "",
				status: "connected",
				suggestions: [],
				mode: "item",
				onQuickAction: vi.fn(),
			},
		});
		expect(getByText(/Como posso ajudar com este caso/)).toBeTruthy();
	});

	it("renders streaming content", () => {
		const { getByText } = render(CopilotMessageList, {
			props: {
				messages: [{ id: "1", content: "Hello", role: "user", timestamp: new Date() }],
				streamingContent: "Streaming response...",
				status: "connected",
				suggestions: [],
				mode: "item",
				onQuickAction: vi.fn(),
			},
		});
		expect(getByText("Streaming response...")).toBeTruthy();
	});

	it("renders quick actions in global mode when empty", () => {
		const { getByText } = render(CopilotMessageList, {
			props: {
				messages: [],
				streamingContent: "",
				status: "connected",
				suggestions: [],
				mode: "global",
				onQuickAction: vi.fn(),
			},
		});
		expect(getByText("Prazos da semana")).toBeTruthy();
		expect(getByText("Resumo de casos")).toBeTruthy();
		expect(getByText("Citações pendentes")).toBeTruthy();
	});

	it("renders suggestions when no messages", () => {
		const { getByText } = render(CopilotMessageList, {
			props: {
				messages: [],
				streamingContent: "",
				status: "connected",
				suggestions: mockSuggestions,
				mode: "item",
				onQuickAction: vi.fn(),
			},
		});
		expect(getByText("Suggestion 1")).toBeTruthy();
	});
});
