import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import ChatMessage from "./ChatMessage.svelte";

describe("ChatMessage", () => {
	it("renders user message", () => {
		render(ChatMessage, { content: "Hello", sender: "user" });
		expect(screen.getByText("Hello")).toBeInTheDocument();
	});

	it("renders assistant message", () => {
		render(ChatMessage, { content: "Hi there", sender: "assistant" });
		expect(screen.getByText("Hi there")).toBeInTheDocument();
	});

	it("renders timestamp", () => {
		render(ChatMessage, { content: "Hello", timestamp: "2 min ago" });
		expect(screen.getByText("2 min ago")).toBeInTheDocument();
	});

	it("applies class prop", () => {
		const { container } = render(ChatMessage, { content: "Hello", class: "my-msg" });
		expect(container.firstElementChild?.className).toContain("my-msg");
	});
});
