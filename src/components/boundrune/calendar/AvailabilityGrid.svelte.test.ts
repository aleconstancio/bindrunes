import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import AvailabilityGrid from "./AvailabilityGrid.svelte";

describe("AvailabilityGrid", () => {
	it("renders day headers", () => {
		render(AvailabilityGrid);
		expect(screen.getByText("Mon")).toBeInTheDocument();
		expect(screen.getByText("Fri")).toBeInTheDocument();
	});

	it("renders time labels", () => {
		render(AvailabilityGrid);
		expect(screen.getByText("9am")).toBeInTheDocument();
	});

	it("applies class prop", () => {
		const { container } = render(AvailabilityGrid, { class: "my-grid" });
		expect(container.firstElementChild?.className).toContain("my-grid");
	});
});
