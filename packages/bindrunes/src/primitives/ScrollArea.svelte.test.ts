import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import ScrollArea from "./ScrollArea.svelte";

describe("ScrollArea", () => {
	it("renders the scroll area viewport", () => {
		const { container } = render(ScrollArea);
		const viewport = container.querySelector("[data-scroll-area-viewport]");
		expect(viewport).toBeInTheDocument();
	});

	it("has overflow hidden on root", () => {
		const { container } = render(ScrollArea);
		const root = container.firstElementChild!;
		expect(root.className).toContain("overflow-hidden");
	});

	it("applies custom class", () => {
		const { container } = render(ScrollArea, { class: "custom" });
		expect(container.firstElementChild?.className).toContain("custom");
	});

	it("renders the root element", () => {
		const { container } = render(ScrollArea);
		expect(container.firstElementChild).toBeInTheDocument();
	});
});
