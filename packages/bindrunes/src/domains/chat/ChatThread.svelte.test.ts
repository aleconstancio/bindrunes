import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import ChatThread from "./ChatThread.svelte";

describe("ChatThread", () => {
	it("renders without errors", () => {
		const { container } = render(ChatThread);
		expect(container).toBeTruthy();
	});

	it("renders with messages", () => {
		const { container } = render(ChatThread, {
			props: {
				messages: [
					{
						id: "1",
						content: "Hello!",
						sender: "user",
						timestamp: "10:00 AM",
					},
					{
						id: "2",
						content: "Hi there!",
						sender: "assistant",
						timestamp: "10:01 AM",
					},
				],
			},
		});
		expect(container).toBeTruthy();
	});

	it("renders empty thread", () => {
		const { container } = render(ChatThread, {
			props: { messages: [] },
		});
		expect(container).toBeTruthy();
	});
});
