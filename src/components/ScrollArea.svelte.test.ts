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
});
