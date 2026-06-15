import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import SectionHeader from "./SectionHeader.svelte";

describe("SectionHeader", () => {
	it("renders the label text", () => {
		render(SectionHeader, { label: "Settings" });
		expect(screen.getByText("Settings")).toBeInTheDocument();
	});

	it("renders with empty label without crashing", () => {
		render(SectionHeader);
		const span = document.querySelector("span");
		expect(span).toBeInTheDocument();
	});

	it("renders the root element", () => {
		const { container } = render(SectionHeader, { label: "Title" });
		expect(container.firstElementChild).toBeInTheDocument();
	});
});
