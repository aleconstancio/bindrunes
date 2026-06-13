import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import FacetedSearch from "./FacetedSearch.svelte";

describe("FacetedSearch", () => {
	const filters = [
		{
			key: "status",
			label: "Status",
			options: [
				{ label: "Active", value: "active" },
				{ label: "Inactive", value: "inactive" },
			],
		},
	];

	it("renders search input", () => {
		render(FacetedSearch);
		expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
	});

	it("renders custom placeholder", () => {
		render(FacetedSearch, { searchPlaceholder: "Filter..." });
		expect(screen.getByPlaceholderText("Filter...")).toBeInTheDocument();
	});

	it("renders filter wrapper", () => {
		const { container } = render(FacetedSearch, { filters });
		const wrapper = container.querySelector(".flex");
		expect(wrapper).toBeInTheDocument();
	});

	it("applies class prop", () => {
		const { container } = render(FacetedSearch, { filters, class: "my-search" });
		expect(container.firstElementChild?.className).toContain("my-search");
	});

	it("renders empty without filters", () => {
		render(FacetedSearch, { filters: [] });
		expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
	});
});
