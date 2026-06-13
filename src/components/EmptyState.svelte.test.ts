import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import EmptyState from "../../src/components/EmptyState.svelte";

describe("EmptyState", () => {
	it("renders title", () => {
		render(EmptyState, { props: { title: "No data" } });
		expect(screen.getByText("No data")).toBeInTheDocument();
	});

	it("renders description", () => {
		render(EmptyState, { props: { description: "Start by adding items" } });
		expect(screen.getByText("Start by adding items")).toBeInTheDocument();
	});

	it("renders without icon or action", () => {
		const { container } = render(EmptyState, { props: { title: "Empty" } });
		expect(container.firstElementChild).toBeInTheDocument();
	});

	it("renders title and description together", () => {
		render(EmptyState, {
			props: { title: "All done", description: "No items left to review" },
		});
		expect(screen.getByText("All done")).toBeInTheDocument();
		expect(screen.getByText("No items left to review")).toBeInTheDocument();
	});

	it("does not render description when not provided", () => {
		render(EmptyState, { props: { title: "Only title" } });
		expect(screen.getByText("Only title")).toBeInTheDocument();
		expect(screen.queryByText(/description/i)).not.toBeInTheDocument();
	});
});
