import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import Timeline from "./Timeline.svelte";

describe("Timeline", () => {
	it("renders without crashing", () => {
		const { container } = render(Timeline, { items: [] });
		expect(container).toBeDefined();
	});

	it("renders items", () => {
		render(Timeline, {
			items: [
				{ title: "Step 1", description: "First step" },
				{ title: "Step 2", description: "Second step" },
			],
		});
		expect(screen.getByText("Step 1")).toBeInTheDocument();
		expect(screen.getByText("Step 2")).toBeInTheDocument();
	});

	it("renders descriptions", () => {
		render(Timeline, {
			items: [{ title: "Event", description: "Details here" }],
		});
		expect(screen.getByText("Details here")).toBeInTheDocument();
	});
});
