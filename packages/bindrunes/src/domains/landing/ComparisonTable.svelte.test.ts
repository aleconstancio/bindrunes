import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import ComparisonTable from "./ComparisonTable.svelte";

const features = [
	{ name: "Feature A", yours: true, competitor1: false, competitor2: true },
	{ name: "Feature B", yours: "Unlimited", competitor1: "10/mo", competitor2: "5/mo" },
];

describe("ComparisonTable", () => {
	it("renders without errors", () => {
		const { container } = render(ComparisonTable);
		expect(container).toBeTruthy();
	});

	it("renders title", () => {
		render(ComparisonTable, { title: "Compare Plans" });
		expect(screen.getByText("Compare Plans")).toBeInTheDocument();
	});

	it("renders default title", () => {
		render(ComparisonTable);
		expect(screen.getByText("Why choose us?")).toBeInTheDocument();
	});

	it("renders feature names", () => {
		render(ComparisonTable, { features });
		expect(screen.getByText("Feature A")).toBeInTheDocument();
		expect(screen.getByText("Feature B")).toBeInTheDocument();
	});

	it("renders column labels", () => {
		render(ComparisonTable, { features });
		expect(screen.getByText("Us")).toBeInTheDocument();
		expect(screen.getByText("Competitor A")).toBeInTheDocument();
		expect(screen.getByText("Competitor B")).toBeInTheDocument();
	});

	it("renders custom column labels", () => {
		render(ComparisonTable, {
			features,
			yoursLabel: "Ours",
			competitor1Label: "Them",
			competitor2Label: "Other",
		});
		expect(screen.getByText("Ours")).toBeInTheDocument();
		expect(screen.getByText("Them")).toBeInTheDocument();
		expect(screen.getByText("Other")).toBeInTheDocument();
	});

	it("renders string feature values", () => {
		render(ComparisonTable, { features });
		expect(screen.getByText("Unlimited")).toBeInTheDocument();
		expect(screen.getByText("10/mo")).toBeInTheDocument();
	});

	it("applies class prop", () => {
		const { container } = render(ComparisonTable, { class: "compare-class" });
		expect(container.firstElementChild?.className).toContain("compare-class");
	});
});
