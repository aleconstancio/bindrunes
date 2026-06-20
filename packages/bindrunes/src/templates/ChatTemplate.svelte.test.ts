import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import ChatTemplate from "./ChatTemplate.svelte";

describe("ChatTemplate", () => {
	it("renders without errors", () => {
		const { container } = render(ChatTemplate);
		expect(container).toBeTruthy();
	});
});
