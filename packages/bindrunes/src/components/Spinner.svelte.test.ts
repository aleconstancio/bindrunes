import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import Spinner from "./Spinner.svelte";

describe("Spinner", () => {
	it("renders an svg element", () => {
		const { container } = render(Spinner);
		expect(container.querySelector("svg")).toBeInTheDocument();
	});

	it("default md size sets data-size", () => {
		const { container } = render(Spinner);
		expect(container.querySelector("svg")).toHaveAttribute("data-size", "md");
	});

	it("sm size sets data-size", () => {
		const { container } = render(Spinner, { props: { size: "sm" } });
		expect(container.querySelector("svg")).toHaveAttribute("data-size", "sm");
	});

	it("lg size sets data-size", () => {
		const { container } = render(Spinner, { props: { size: "lg" } });
		expect(container.querySelector("svg")).toHaveAttribute("data-size", "lg");
	});

	it("applies custom class", () => {
		const { container } = render(Spinner, { class: "my-spinner" });
		const svg = container.querySelector("svg");
		expect(svg?.getAttribute("class")).toContain("my-spinner");
	});
});
