import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import TypingIndicator from "./TypingIndicator.svelte";

describe("TypingIndicator", () => {
	it("renders typing dots", () => {
		const { container } = render(TypingIndicator);
		expect(container.querySelectorAll(".animate-bounce").length).toBe(3);
	});

	it("applies class prop", () => {
		const { container } = render(TypingIndicator, { class: "my-typing" });
		expect(container.firstElementChild?.className).toContain("my-typing");
	});
});
