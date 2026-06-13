import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import Spinner from "../../src/components/Spinner.svelte";

describe("Spinner", () => {
	it("renders an svg element", () => {
		const { container } = render(Spinner);
		expect(container.querySelector("svg")).toBeInTheDocument();
	});

	it("renders with default md size", () => {
		const { container } = render(Spinner);
		const cls = container.querySelector("svg")?.getAttribute("class") ?? "";
		expect(cls).toContain("h-6");
	});

	it("sm size applies h-4", () => {
		const { container } = render(Spinner, { props: { size: "sm" } });
		const cls = container.querySelector("svg")?.getAttribute("class") ?? "";
		expect(cls).toContain("h-4");
	});

	it("lg size applies h-10", () => {
		const { container } = render(Spinner, { props: { size: "lg" } });
		const cls = container.querySelector("svg")?.getAttribute("class") ?? "";
		expect(cls).toContain("h-10");
	});
});
