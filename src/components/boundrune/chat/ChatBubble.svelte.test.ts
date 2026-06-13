import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import ChatBubble from "./ChatBubble.svelte";

describe("ChatBubble", () => {
	it("renders user message", () => {
		render(ChatBubble, { content: "Hello", sender: "user" });
		expect(screen.getByText("Hello")).toBeInTheDocument();
	});

	it("renders assistant message", () => {
		render(ChatBubble, { content: "Hi there", sender: "assistant" });
		expect(screen.getByText("Hi there")).toBeInTheDocument();
	});

	it("applies class prop", () => {
		const { container } = render(ChatBubble, { content: "Hello", class: "my-bubble" });
		expect(container.firstElementChild?.className).toContain("my-bubble");
	});
});
