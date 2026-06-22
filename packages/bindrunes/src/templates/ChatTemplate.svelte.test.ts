import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import ChatTemplate from "./ChatTemplate.svelte";

describe("ChatTemplate", () => {
	it("renders without errors", () => {
		const { container } = render(ChatTemplate);
		expect(container).toBeTruthy();
	});

	it("renders default title", () => {
		const { container } = render(ChatTemplate);
		expect(container.textContent).toContain("Chat");
	});

	it("renders custom title", () => {
		const { container } = render(ChatTemplate, { props: { title: "Support Chat" } });
		expect(container.textContent).toContain("Support Chat");
	});

	it("applies class prop", () => {
		const { container } = render(ChatTemplate, { props: { class: "chat-class" } });
		expect(container.firstElementChild?.className).toContain("chat-class");
	});
});
