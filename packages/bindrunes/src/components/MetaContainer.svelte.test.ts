import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../helpers/axe";
import MetaContainer from "./MetaContainer.svelte";

describe("MetaContainer", () => {
	it('default size sets data-size="2xl"', () => {
		const { container } = render(MetaContainer);
		expect(container.firstElementChild).toHaveAttribute("data-size", "2xl");
	});

	it('prose size sets data-size="prose"', () => {
		const { container } = render(MetaContainer, { props: { size: "prose" } });
		expect(container.firstElementChild).toHaveAttribute("data-size", "prose");
	});

	it('full width sets data-size="full"', () => {
		const { container } = render(MetaContainer, { props: { size: "full" } });
		expect(container.firstElementChild).toHaveAttribute("data-size", "full");
	});

	it("applies padding by default", () => {
		const { container } = render(MetaContainer);
		const el = container.firstElementChild;
		expect(el).toHaveClass("px-6");
	});

	it("removes padding when padding=false", () => {
		const { container } = render(MetaContainer, { props: { padding: false } });
		const el = container.firstElementChild;
		expect(el).not.toHaveClass("px-6");
	});

	it("applies custom class", () => {
		const { container } = render(MetaContainer, { class: "custom" });
		expect(container.firstElementChild).toHaveClass("custom");
	});

	it("has no a11y violations", async () => {
		const { container } = render(MetaContainer);
		await expectNoAxeViolations(container);
	});
});
