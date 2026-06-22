import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import SectionHeader from "./SectionHeader.svelte";

describe("SectionHeader", () => {
	it("renders without crashing", () => {
		const { container } = render(SectionHeader);
		expect(container.firstElementChild).toBeInTheDocument();
	});

	it("renders label", () => {
		render(SectionHeader, { label: "Section Title" });
		expect(screen.getByText("Section Title")).toBeInTheDocument();
	});

	it("renders with empty label", () => {
		const { container } = render(SectionHeader, { label: "" });
		expect(container.firstElementChild).toBeInTheDocument();
	});

	it("applies uppercase class to label", () => {
		const { container } = render(SectionHeader, { label: "Test" });
		const span = container.querySelector("span");
		expect(span?.className).toContain("uppercase");
	});
});
