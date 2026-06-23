import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import ChatInput from "./ChatInput.svelte";

describe("ChatInput", () => {
	it("renders without errors", () => {
		const { container } = render(ChatInput);
		expect(container).toBeTruthy();
	});

	it("renders with custom placeholder", () => {
		const { container } = render(ChatInput, {
			props: { placeholder: "Ask me anything..." },
		});
		expect(container).toBeTruthy();
	});

	it("renders disabled state", () => {
		const { container } = render(ChatInput, {
			props: { disabled: true },
		});
		expect(container).toBeTruthy();
	});

	it("renders with onSend callback", () => {
		const { container } = render(ChatInput, {
			props: { onSend: () => {} },
		});
		expect(container).toBeTruthy();
	});
});
