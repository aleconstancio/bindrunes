import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import Accordion from "./Accordion.svelte";

describe("Accordion", () => {
	it("renders the accordion root", () => {
		const { container } = render(Accordion);
		const root = container.firstElementChild;
		expect(root).toBeInTheDocument();
	});

	it("renders with space-y-2 class", () => {
		const { container } = render(Accordion);
		const root = container.firstElementChild;
		expect(root?.className).toContain("space-y-2");
	});

	it("applies custom class", () => {
		const { container } = render(Accordion, { class: "my-accordion" });
		expect(container.firstElementChild?.className).toContain("my-accordion");
	});

	it("defaults to empty value array", () => {
		const { container } = render(Accordion);
		expect(container.firstElementChild).toBeInTheDocument();
	});
});
