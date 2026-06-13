import { fireEvent, render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import Collapsible from "../../src/components/Collapsible.svelte";

describe("Collapsible", () => {
	it("renders without crashing", () => {
		const { container } = render(Collapsible);
		expect(container).toBeInTheDocument();
	});

	it("renders disabled state", () => {
		const { container } = render(Collapsible, { props: { disabled: true } });
		expect(container).toBeInTheDocument();
	});

	it("applies custom class", () => {
		const { container } = render(Collapsible, { props: { class: "custom" } });
		expect(container.querySelector(".custom")).toBeInTheDocument();
	});

	it("has data-state attribute on the root", () => {
		const { container } = render(Collapsible);
		const root = container.querySelector("[data-state]");
		expect(root).toBeInTheDocument();
	});

	it("clicking the trigger toggles the collapsible", async () => {
		const { container } = render(Collapsible);
		const trigger = container.querySelector("button")!;
		await fireEvent.click(trigger);
		expect(container).toBeInTheDocument();
	});
});
