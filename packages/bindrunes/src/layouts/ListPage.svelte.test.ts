import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import ListPageHarness from "./__tests__/harness/ListPageHarness.svelte";

describe("ListPage", () => {
	it("renders without crashing", () => {
		const { container } = render(ListPageHarness);
		expect(container.firstElementChild).toBeInTheDocument();
	});

	it("displays title", () => {
		render(ListPageHarness, { props: { title: "Users" } });
		expect(screen.getByText("Users")).toBeInTheDocument();
	});

	it("displays description when provided", () => {
		render(ListPageHarness, { props: { description: "All registered users" } });
		expect(screen.getByText("All registered users")).toBeInTheDocument();
	});

	it("shows search input", () => {
		render(ListPageHarness);
		expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
	});

	it("custom search placeholder", () => {
		render(ListPageHarness, {
			props: { query: undefined },
		});
		expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
	});

	it("shows loading state", () => {
		render(ListPageHarness, {
			props: { query: { isLoading: true } },
		});
		expect(screen.queryByPlaceholderText("Search...")).not.toBeInTheDocument();
	});

	it("shows error state", () => {
		render(ListPageHarness, {
			props: {
				query: { isError: true, error: { message: "Failed to load" } },
			},
		});
		expect(screen.getByText("Error")).toBeInTheDocument();
		expect(screen.getByText("Failed to load")).toBeInTheDocument();
	});

	it("shows empty state when data is empty", () => {
		render(ListPageHarness, {
			props: { query: { data: [] } },
		});
		expect(screen.getByText("No results")).toBeInTheDocument();
	});

	it("renders children when no query provided", () => {
		render(ListPageHarness, {
			props: { childText: "Content" },
		});
		expect(screen.getByText("Content")).toBeInTheDocument();
	});
});
