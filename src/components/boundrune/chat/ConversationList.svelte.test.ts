import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import ConversationList from "./ConversationList.svelte";

describe("ConversationList", () => {
	const conversations = [
		{ id: "1", name: "Alice", lastMessage: "Hello!", timestamp: "2m", unread: 2 },
		{ id: "2", name: "Bob", lastMessage: "Hey there", timestamp: "5m" },
	];

	it("renders conversations", () => {
		render(ConversationList, { conversations });
		expect(screen.getByText("Alice")).toBeInTheDocument();
		expect(screen.getByText("Bob")).toBeInTheDocument();
	});

	it("renders last messages", () => {
		render(ConversationList, { conversations });
		expect(screen.getByText("Hello!")).toBeInTheDocument();
		expect(screen.getByText("Hey there")).toBeInTheDocument();
	});

	it("renders unread badge", () => {
		render(ConversationList, { conversations });
		expect(screen.getByText("2")).toBeInTheDocument();
	});

	it("applies class prop", () => {
		const { container } = render(ConversationList, { conversations, class: "my-list" });
		expect(container.firstElementChild?.className).toContain("my-list");
	});
});
