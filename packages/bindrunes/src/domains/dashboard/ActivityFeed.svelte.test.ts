import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import ActivityFeed from "./ActivityFeed.svelte";

describe("ActivityFeed", () => {
	it("renders without errors", () => {
		const { container } = render(ActivityFeed);
		expect(container).toBeTruthy();
	});

	it("renders with activity items", () => {
		const { container } = render(ActivityFeed, {
			props: {
				items: [
					{
						id: "1",
						user: { name: "Alice" },
						action: "created",
						target: "Project Alpha",
						timestamp: "2 hours ago",
					},
				],
			},
		});
		expect(container).toBeTruthy();
	});

	it("renders with custom title", () => {
		const { container } = render(ActivityFeed, {
			props: { title: "Recent Changes" },
		});
		expect(container).toBeTruthy();
	});

	it("renders empty feed", () => {
		const { container } = render(ActivityFeed, {
			props: { items: [] },
		});
		expect(container).toBeTruthy();
	});
});
