import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/svelte";
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

	it("renders filter selects", () => {
		render(FacetedSearch, { filters });
		expect(screen.getByText("Status")).toBeInTheDocument();
	});

	it("renders filter options", () => {
		render(FacetedSearch, { filters });
		expect(screen.getByText("Active")).toBeInTheDocument();
		expect(screen.getByText("Inactive")).toBeInTheDocument();
	});

	it("applies class prop", () => {
		const { container } = render(FacetedSearch, { filters, class: "my-search" });
		expect(container.firstElementChild?.className).toContain("my-search");
	});

	it("calls onFilterChange when filter changed", async () => {
		const fn = vi.fn();
		render(FacetedSearch, { filters, onFilterChange: fn });
		const select = screen.getByRole("combobox");
		await fireEvent.change(select, { target: { value: "active" } });
		expect(fn).toHaveBeenCalledWith("status", "active");
	});

	it("renders empty without filters", () => {
		render(FacetedSearch, { filters: [] });
		expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
	});
});
