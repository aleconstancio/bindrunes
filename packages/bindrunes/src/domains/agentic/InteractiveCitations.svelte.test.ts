import { fireEvent, render } from "@testing-library/svelte";
import { describe, expect, it, vi } from "vitest";
import InteractiveCitations from "./InteractiveCitations.svelte";

describe("InteractiveCitations", () => {
	it("renders plain text without citations", () => {
		const { getByText } = render(InteractiveCitations, {
			props: { text: "Hello world" },
		});
		expect(getByText("Hello world")).toBeTruthy();
	});

	it("renders citation buttons for source patterns", () => {
		const { getByText } = render(InteractiveCitations, {
			props: { text: "Check source:layer1:item-abc for details" },
		});
		expect(getByText("source:layer1:item-abc")).toBeTruthy();
	});

	it("calls onHighlightCitation when citation clicked", async () => {
		const onHighlight = vi.fn();
		const { getByText } = render(InteractiveCitations, {
			props: {
				text: "See source:publication:123 here",
				onHighlightCitation: onHighlight,
			},
		});
		await fireEvent.click(getByText("source:publication:123"));
		expect(onHighlight).toHaveBeenCalledWith("publication", "123");
	});

	it("renders mixed text and citations", () => {
		const { container, getByText } = render(InteractiveCitations, {
			props: { text: "Before source:dossier:abc After" },
		});
		const span = container.querySelector("span")!;
		expect(span.textContent).toContain("Before");
		expect(span.textContent).toContain("After");
		expect(getByText("source:dossier:abc")).toBeTruthy();
	});
});
