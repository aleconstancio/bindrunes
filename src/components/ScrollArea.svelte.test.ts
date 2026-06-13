import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import ScrollArea from "../../src/components/ScrollArea.svelte";

describe("ScrollArea", () => {
	it("renders without crashing", () => {
		const { container } = render(ScrollArea);
		expect(container).toBeInTheDocument();
	});

	it("applies custom class", () => {
		const { container } = render(ScrollArea, { props: { class: "custom" } });
		expect(container.querySelector(".custom")).toBeInTheDocument();
	});

	it("has overflow hidden on root", () => {
		const { container } = render(ScrollArea);
		const root = container.firstElementChild!;
		expect(root.className).toContain("overflow-hidden");
	});

	it("renders the scroll area viewport", () => {
		const { container } = render(ScrollArea);
		const viewport = container.querySelector("[data-scroll-area-viewport]");
		expect(viewport).toBeInTheDocument();
	});
});
